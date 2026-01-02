import { Form } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldValueChange } from '@formily/core';
import { Spin, message, Button } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
// import { BomCalculationSuperBomAsync } from '@/services/smarterp/Bom'; // 已移至 AttributeField
import { MaterialGetByCodeAsync, MaterialGetMaterialAttributeListAsync } from '@/services/common/Material';
import { UnitGetByCodeAsync } from '@/services/common/Unit';
import { observable } from '@formily/reactive';
import { history } from 'umi';
import { WorkItemAssignDialog, WorkflowCompleteDialog, WorkflowGoBackDialog } from '@/pages/appWorkflow/_utils';
import { SaleOrderGetAsync, SaleOrderExecuteWorkflowAsync, SaleOrderUpdateAsync } from '@/services/smarterp/SaleOrder';
import { useFormSchema, useSchemaField, useQuery, useMutation, closeTab, useSearchParams, useMatch } from 'umi';
import { formId, formSchema } from './components/schema';
import useWorkflow from '@/hooks/useWorkflow';
import ToolBar from '@/components/toolBar';
// import { converAttributeToObject } from './components'; // 已移至 AttributeField
import { 
	CurrencySelect, 
	PaymentMethodSelect, 
	DeliveryWaySelect, 
	PriceClauseSelect,
	TaxRateSelect,
} from '@/pages/appCommon/_utils';
import {
	SaleManSelect
} from '@/pages/appSmartErp/_utils';
import {
	CustomerSelect,
	CustomerContactSelect,
	CustomerDeliveryAddressSelect,
	ConsignerSelect
} from '@/pages/appCommon/_utils';
import BomField from '@/pages/appSmartErp/_utils/bomField';
import AttributeField from '@/pages/appSmartErp/_utils/attributeField';
import { MaterialSelect, UnitSelect } from '@/pages/appCommon/_utils';

const executionRoute = '/appSmartErp/saleManagement/saleOrders/execution';

const SaleOrderExecutionPage = () => {
	let [searchParams] = useSearchParams();
	const definitionId = searchParams.get('definitionId');
	const workflowInstanceId = searchParams.get('workflowInstanceId');
	const activityId = searchParams.get('activityId');
	const correlationId = searchParams.get('correlationId');
	const workItemId = searchParams.get('workItemId');

	const match = useMatch(executionRoute);

	let [loading, setLoading] = useState(false);
	const workflowInfo = useWorkflow(activityId, correlationId);
	const schema = useFormSchema(formId, formSchema);
	const SchemaField = useSchemaField({
		CurrencySelect,
		PaymentMethodSelect,
		DeliveryWaySelect,
		PriceClauseSelect,
		TaxRateSelect,
		CustomerSelect,
		CustomerContactSelect,
		CustomerDeliveryAddressSelect,
		ConsignerSelect,
		SaleManSelect,
		BomFieldSelect: BomField,
		AttributeFieldSelect: AttributeField,
		MaterialSelect,
		UnitSelect
	});

	const $workflowInfo = useMemo(() => observable({ currentActivityName: '', executionActivityNames: [] }), []);

	const { data, isFetching, refetch } = useQuery(
		['getSaleOrder'],
		() => {
			//@ts-ignore
			return SaleOrderGetAsync({ id: correlationId });
		},
		{ enabled: false }
	);

	const { isLoading, mutateAsync: saleOrderExecute } = useMutation((body: any) => {
		return SaleOrderExecuteWorkflowAsync({ id: body.id }, body);
	}, {});

	const { isLoading: isUpdating, mutateAsync: saleOrderUpdate } = useMutation((body: any) => {
		return SaleOrderUpdateAsync({ id: body.id }, body);
	}, {});

	const form = useMemo(
		() =>
			createForm({
				initialValues: { workflowDefinitionId: definitionId, workflowInstanceId, activityId, correlationId },
				effects: () => {
					onFormInit(() => {
						if (correlationId) {
							refetch();
						}
					});

					// 物料选择联动 - 与create页面保持一致
					onFieldValueChange('saleOrderItems.*.{value:materialCode,label:materialOutCode}', async (field) => {
						const materialData = field.value;
						
						if (!materialData?.value) return;

						const fieldPath = field.address?.toString() || '';
						const indexMatch = fieldPath.match(/saleOrderItems\.(\d+)/);
						const currentIndex = indexMatch ? parseInt(indexMatch[1]) : 0;

						setLoading(true);

						try {
							const material = await MaterialGetByCodeAsync({ code: materialData.value });
							
							if (material) {
								// 使用正确的 Formily API 更新物料相关字段
								form.setValuesIn(`saleOrderItems.${currentIndex}.materialOutCode`, material.outCode);
								form.setValuesIn(`saleOrderItems.${currentIndex}.materialDescription`, material.description);
								form.setValuesIn(`saleOrderItems.${currentIndex}.specificationModel`, material.specificationModel);
								form.setValuesIn(`saleOrderItems.${currentIndex}.comeFrom`, material.comeFrom);
								form.setValuesIn(`saleOrderItems.${currentIndex}.unitCode`, material.unitCode);
								form.setValuesIn(`saleOrderItems.${currentIndex}.unitName`, material.unitName);
								if (material.salePrice !== undefined && material.salePrice !== null) {
									form.setValuesIn(`saleOrderItems.${currentIndex}.price`, material.salePrice);
								}
								
								
								// 延迟后自动触发特性按钮点击
								setTimeout(async () => {
									try {
										const attributeResponse = await MaterialGetMaterialAttributeListAsync({ 
											materialId: material.id 
										});
										
										const attributeSchema = attributeResponse.items || [];
										
										if (attributeSchema.length > 0) {
											// 物料有特性时，自动点击特性按钮
											const attributeButton = document.getElementById(`attribute${currentIndex}`);
											if (attributeButton) {
												attributeButton.click();
											}
										}
									} catch (attrError) {
										// 获取特性失败，不影响主流程
										console.warn('获取物料特性失败:', attrError);
									}
								}, 800); // 延迟800ms，确保字段更新完成
							}
							
						} catch (error) {
							message.error('获取物料信息失败');
						} finally {
							setLoading(false);
						}
					});

					onFieldValueChange('saleOrderItems.*.unitCode', async (field) => {
						const unitCode = field.value;
						if (!unitCode) return;

						try {
							const unit = await UnitGetByCodeAsync({ code: unitCode });
							
							field.query('.unitName').take().setState(state => (state.value = unit.name));
							field.query('.exchangeRate').take().setState(state => (state.value = unit.exchangeRate));
							field.query('.exchangeFlag').take().setState(state => (state.value = unit.exchangeFlag));
						} catch (error) {
							message.error('获取单位信息失败');
						}
					});

					// BOM 计算已移至 AttributeField 组件中，在特性选择完成时触发
				},
			}),
		[]
	);

	useEffect(() => {
		form.setValues(data);
	}, [data]);

	useEffect(() => {
		if (match) {
			refetch();
		}
	}, [match]);

	useEffect(() => {
		$workflowInfo.currentActivityName = workflowInfo.currentActivityName!;

		//@ts-ignore
		$workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map(x => x.activityName);
	}, [workflowInfo]);

	const handleSubmit = formValues => {
		return saleOrderExecute(formValues).then(() => {
			handleBack();
		});
	};

	const handleSave = () => {
		form.submit().then((formValues) => {
			return saleOrderUpdate(formValues).then(() => {
				message.success('保存成功');
			});
		}).catch((error) => {
			console.error('表单验证失败:', error);
		});
	};

	const handleBack = () => {
		closeTab(history.location.pathname);
		history.push('/appSmartErp/saleManagement/saleOrders');
	};

	return (
		<Spin spinning={isFetching || isLoading || isUpdating || loading} tip={'修改中'}>
			<Form form={form} {...schema.form}>
				<SchemaField schema={schema.schema} scope={{ $workflowInfo }}></SchemaField>
				<ToolBar>
					<Button type="primary" loading={isUpdating} onClick={handleSave}>
						保存
					</Button>

					<WorkflowCompleteDialog
						hideDialog={true}
						workflowInfo={{ workflowDefinitionId: definitionId, workflowInstanceId, activityId }}
						entityForm={form}
						onConfirm={handleBack}
						onComplete={handleSubmit}
					/>

					<WorkItemAssignDialog workflowInfo={{ workItemId }} entityForm={form} onConfirm={handleBack} />

					<WorkflowGoBackDialog
						workflowInfo={{ workflowDefinitionId: definitionId, workflowInstanceId, activityId }}
						entityForm={form}
						onConfirm={handleBack}
						onComplete={handleSubmit}
					/>
				</ToolBar>
			</Form>
		</Spin>
	);
};

export default SaleOrderExecutionPage;

export const routeProps = {
	name: '执行销售订单',
};
