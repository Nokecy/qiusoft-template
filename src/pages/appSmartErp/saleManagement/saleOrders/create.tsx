// import { BomCalculationSuperBomAsync } from '@/services/smarterp/Bom'; // 已移至 AttributeField
import { MaterialGetByCodeAsync, MaterialGetMaterialAttributeListAsync } from '@/services/common/Material';
import { SaleOrderCreateForWorkflowAsync } from '@/services/smarterp/SaleOrder';
import { UnitGetByCodeAsync } from '@/services/common/Unit';
import { CustomerGetByCodeAsync } from '@/services/common/Customer';
import { CustomerContactGetMainContactAsync } from '@/services/common/CustomerContact'; 
import { CurrencyGetByCodeAsync } from '@/services/common/Currency'; 
import { TaxRateGetByCodeAsync } from '@/services/common/TaxRate'; 
import { Form } from '@formily/antd-v5';
import { createForm, onFieldInputValueChange, onFieldValueChange, onFormSubmitValidateFailed } from '@formily/core';
import { Button, message, Spin } from 'antd';
import React, { useMemo, useState } from 'react';
import { history, useFormSchema, useSchemaField, useMutation, closeTab } from 'umi';
import { formId, formSchema } from './components/schema';
import ToolBar from '@/components/toolBar';
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

const SaleOrderCreatePage = () => {
	let [loading, setLoading] = useState(false);

	const schema = useFormSchema(formId, formSchema);
	const SchemaField = useSchemaField({
		CurrencySelect: (props: any) => <CurrencySelect {...props} useCode={true} />,
		PaymentMethodSelect: (props: any) => <PaymentMethodSelect {...props} useCode={true} />,
		DeliveryWaySelect: (props: any) => <DeliveryWaySelect {...props} useCode={true} />,
		PriceClauseSelect: (props: any) => <PriceClauseSelect {...props} useCode={true} />,
		TaxRateSelect: (props: any) => <TaxRateSelect {...props} useCode={true} />,
		CustomerSelect: (props: any) => <CustomerSelect {...props} useCode={true} />,
		CustomerContactSelect: (props: any) => <CustomerContactSelect {...props} useCode={true} />,
		CustomerDeliveryAddressSelect: (props: any) => <CustomerDeliveryAddressSelect {...props} useCode={true} />,
		ConsignerSelect: (props: any) => <ConsignerSelect {...props} useCode={true} />,
		SaleManSelect: (props: any) => <SaleManSelect {...props} useCode={true} />,
		BomFieldSelect: BomField,
		AttributeFieldSelect: AttributeField,
		MaterialSelect: (props: any) => <MaterialSelect {...props} useCode={true} />,
		UnitSelect: (props: any) => <UnitSelect {...props} useCode={true} />
	});

	const { isLoading, mutateAsync: createAsync } = useMutation((formValues: any) => {
		return SaleOrderCreateForWorkflowAsync(formValues);
	}, {});

	const handleSubmit = formValues => {
		return createAsync(formValues).then(() => {
			handleBack();
		});
	};

	const handleBack = () => {
		closeTab(history.location.pathname);
		history.push('/appSmartErp/saleManagement/saleOrders');
	};

	const form = useMemo(
		() =>
			createForm({
				initialValues: {
					releaseDate: new Date().toISOString().split('T')[0],
					priceIsTax: "1"
				},
				effects: () => {
					onFieldInputValueChange('{value:customerCode,label:customerAbb}', async (field, form) => {
						const customerId = field.value?.value;
						
						if (!customerId) return;

						try {
							// 获取客户详情
							const customer = await CustomerGetByCodeAsync({ code: customerId });
							
							// 设置客户名称
							form.setValuesIn('customerName', customer.name);
							
							// 获取客户主要联系人
							const mainContact = await CustomerContactGetMainContactAsync({ 
								customerCode: customerId 
							});
							
							if (mainContact) {
								form.setValuesIn('{label:reciver,value:reciverTel}', {
									label: mainContact.contactName,
									value: mainContact.tel
								});
							}
							
							// 如果客户有默认税率，获取税率信息
							if (customer.invoiceCode) {
								const taskRate = await TaxRateGetByCodeAsync({ 
									code: customer.invoiceCode 
								});
								
								form.setValuesIn('{value:invoiceCode,label:invoiceName}', {
									value: taskRate.code,
									label: taskRate.name
								});
								form.setValuesIn('invoiceRate', taskRate.rate);
							}
							
							// 如果客户有默认货币，获取货币信息
							if (customer.currencyCode) {
								const currency = await CurrencyGetByCodeAsync({ 
									code: customer.currencyCode 
								});
								
								form.setValuesIn('{value:currencyCode,label:currencyAbb}', {
									label: currency.name,
									value: currency.code
								});
								form.setValuesIn('currencyRate', currency.rate);
							}
							
							// 设置其他客户相关信息
							form.setValuesIn('priceIsTax', customer.priceIsTax || "1");
							if (customer.payMethod) form.setValuesIn('payMethod', customer.payMethod);
							if (customer.businessType) form.setValuesIn('businessType', customer.businessType);
							if (customer.earnestType) form.setValuesIn('earnestType', customer.earnestType);
							if (customer.earnest) form.setValuesIn('earnest', customer.earnest);
							if (customer.salesmanCode) form.setValuesIn('saleCode', customer.salesmanCode);
							if (customer.salesmanName) form.setValuesIn('saleName', customer.salesmanName);
							
						} catch (error) {
							message.error('获取客户信息失败');
							// 至少设置默认含税价格
							form.setValuesIn('priceIsTax', "1");
						}
					});

					// 物料选择联动 - 使用正确的字段路径
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

					// 税率选择联动
					onFieldValueChange('{value:invoiceCode,label:invoiceName}', async (field, form) => {
						const invoiceCode = field.value?.value;
						
						if (!invoiceCode) return;

						try {
							const taskRate = await TaxRateGetByCodeAsync({ code: invoiceCode });
							form.setValuesIn('invoiceRate', taskRate.rate);
						} catch (error) {
							message.error('获取税率信息失败');
						}
					});

					// 货币选择联动
					onFieldValueChange('{value:currencyCode,label:currencyAbb}', async (field, form) => {
						const currencyCode = field.value?.value;
						
						if (!currencyCode) return;

						try {
							const currency = await CurrencyGetByCodeAsync({ code: currencyCode });
							form.setValuesIn('currencyRate', currency.rate);
						} catch (error) {
							message.error('获取货币信息失败');
						}
					});

					onFormSubmitValidateFailed(() => {
						message.error('请完善必填信息')
					});

					// 单位选择联动
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

	return (
		<Spin spinning={isLoading || loading} tip={'加载中'}>
			<Form form={form} {...schema.form}>
				<SchemaField schema={schema.schema}></SchemaField>

				<ToolBar>
					<Button onClick={handleBack}>返回</Button>
					<Button type="primary" loading={isLoading} onClick={() => {
						form.submit().then((values) => {
							handleSubmit(values);
						}).catch((error) => {
							console.error('表单验证失败:', error);
						});
					}}>
						提交
					</Button>
				</ToolBar>
			</Form>
		</Spin>
	);
};

export default SaleOrderCreatePage;
export const routeProps = {
	name: '创建销售订单',
};
