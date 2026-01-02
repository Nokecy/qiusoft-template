import {
	ProcessProcedureCreateAsync,
	ProcessProcedureGetAsync,
	ProcessProcedureUpdateAsync,
} from '@/services/pdm/ProcessProcedure';
import { FormDialog, FormLayout, FormGrid, Input, FormItem, NumberPicker, Switch, Select } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useSchemaField } from '@umijs/max';
import { Button, ButtonProps, message } from 'antd';
import React from 'react';
import WorkCenterSelect from '@/pages/appCommon/_utils/WorkCenterSelect';
import ProcessProcedureCategorySelect from '../../ProcessProcedureCategory/components/ProcessProcedureCategorySelect';
import { actionTypeOptions } from '../_enums/actionType';

interface ProcessProcedureFormDialogProps {
	title?: string;
	entityId?: number;
	onAfterSubmit?: () => void;
	buttonProps?: ButtonProps;
	children?: React.ReactNode;
}

const ProcessProcedureFormDialog: React.FC<ProcessProcedureFormDialogProps> = (props) => {
	const { title = '新建工序', entityId, onAfterSubmit, buttonProps, children } = props;

	const SchemaField = useSchemaField({
		FormItem,
		Input,
		FormLayout,
		FormGrid,
		NumberPicker,
		Switch,
		Select,
		WorkCenterSelect,
		ProcessProcedureCategorySelect,
	});

	const formProps = {
		effects: () => {
			onFormInit(async (form) => {
				if (entityId) {
					try {
						const data = await ProcessProcedureGetAsync({ id: entityId });
						form.setInitialValues({
							...data,
							'{value:processProcedureCategoryCode,label:processProcedureCategoryName}': {
								value: data.processProcedureCategoryCode,
								label: data.processProcedureCategoryName,
							},
							'{value:workCenterCode,label:workCenterName}': {
								value: data.workCenterCode,
								label: data.workCenterName,
							},
						});
					} catch (error) {
						message.error('加载数据失败');
						console.error(error);
					}
				}
			});
		},
	};

	const portalId = `ProcessProcedure${entityId || 'new'}`;

	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					const formDialog = FormDialog({ title, width: 960 }, portalId, () => {
						return (
							<FormLayout labelWidth={100} feedbackLayout="none">
								<SchemaField>
									<SchemaField.Void
										x-component="FormGrid"
										x-component-props={{ maxColumns: 4, minColumns: 1, strictAutoFit: true }}
									>
										<SchemaField.String
											title={'工序编码'}
											required
											name={'code'}
											x-decorator="FormItem"
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入工序编码', maxLength: 50 }}
										/>
										<SchemaField.String
											title={'工序名称'}
											required
											name={'name'}
											x-decorator="FormItem"
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入工序名称', maxLength: 100 }}
										/>
										<SchemaField.String
											title={'工序分类'}
											name={'{value:processProcedureCategoryCode,label:processProcedureCategoryName}'}
											x-decorator="FormItem"
											x-component={'ProcessProcedureCategorySelect'}
											x-component-props={{ placeholder: '请选择工序分类', useCode: true }}
										/>
										<SchemaField.String
											title={'工作中心'}
											name={'{value:workCenterCode,label:workCenterName}'}
											x-decorator="FormItem"
											x-component={'WorkCenterSelect'}
											x-component-props={{ placeholder: '请选择工作中心', useCode: true }}
										/>
										<SchemaField.Boolean
											title={'是否委外'}
											name={'isOutsourced'}
											x-decorator="FormItem"
											x-component={'Switch'}
											x-component-props={{ checkedChildren: '是', unCheckedChildren: '否' }}
										/>
										<SchemaField.String
											title={'执行动作'}
											required
											name={'actionType'}
											x-decorator="FormItem"
											x-component={'Select'}
											x-component-props={{
												placeholder: '请选择执行动作',
												options: actionTypeOptions,
												showSearch: true,
												optionFilterProp: 'label',
											}}
										/>
										<SchemaField.Boolean
											title={'是否入库工序'}
											name={'isInboundProcess'}
											x-decorator="FormItem"
											x-component={'Switch'}
											x-component-props={{ checkedChildren: '是', unCheckedChildren: '否' }}
										/>
										<SchemaField.Boolean
											title={'是否需要原材料'}
											name={'isNeedRawMaterial'}
											x-decorator="FormItem"
											x-component={'Switch'}
											x-component-props={{ checkedChildren: '是', unCheckedChildren: '否' }}
										/>
										<SchemaField.Number
											title={'固定合格数量'}
											name={'fixPassCount'}
											x-decorator="FormItem"
											x-component={'NumberPicker'}
											x-component-props={{ placeholder: '请输入固定合格数量', min: 0, precision: 0 }}
										/>
										<SchemaField.Number
											title={'失败报废数量'}
											name={'failScrapCount'}
											x-decorator="FormItem"
											x-component={'NumberPicker'}
											x-component-props={{ placeholder: '请输入失败报废数量', min: 0, precision: 0 }}
										/>
										<SchemaField.String
											title={'备注'}
											name={'memo'}
											x-decorator="FormItem"
											x-decorator-props={{ gridSpan: 4 }}
											x-component={'Input.TextArea'}
											x-component-props={{ placeholder: '请输入备注', maxLength: 500, rows: 3 }}
										/>
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							const values: any = payload.values;
							const dto: API.BurnAbpPdmProcessManagementProcessProceduresCreateUpdateProcessProcedureDto = {
								code: values.code,
								name: values.name,
								processProcedureCategoryCode: values.processProcedureCategoryCode,
								processProcedureCategoryName: values.processProcedureCategoryName,
								workCenterCode: values.workCenterCode,
								workCenterName: values.workCenterName,
								isOutsourced: values.isOutsourced,
								actionType: values.actionType,
								isInboundProcess: values.isInboundProcess,
								isNeedRawMaterial: values.isNeedRawMaterial,
								fixPassCount: values.fixPassCount,
								failScrapCount: values.failScrapCount,
								memo: values.memo,
							};

							if (!values.id) {
								return ProcessProcedureCreateAsync(dto)
									.then(() => {
										message.success('创建成功');
										if (onAfterSubmit) onAfterSubmit();
									})
									.then(() => next(payload))
									.catch((error) => {
										message.error('创建失败');
										console.error(error);
										throw error;
									});
							} else {
								return ProcessProcedureUpdateAsync({ id: values.id }, dto)
									.then(() => {
										message.success('更新成功');
										if (onAfterSubmit) onAfterSubmit();
									})
									.then(() => next(payload))
									.catch((error) => {
										message.error('更新失败');
										console.error(error);
										throw error;
									});
							}
						})
						.open(formProps);
				}}
				{...buttonProps}
			>
				{children || '新建'}
			</Button>
		</FormDialog.Portal>
	);
};

export default ProcessProcedureFormDialog;
