import { MaterialGetByCodeAsync } from '@/services/common/Material';
import { SaleOrderCreateBomItemAsync } from '@/services/smarterp/SaleOrder';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { useSchemaField } from 'umi';
import { Button, message } from 'antd';
import React from 'react';
import MaterialSelect from '@/pages/appCommon/_utils/MaterialSelect';

interface CreateFormDialogProps {
	entityId?: string;
	title: string;
	type: number;
	buttonProps?: any;
	selectRow?: any;
	onAfterSubmit?: () => void;
	children?: React.ReactNode;
}

const CreateFormDialog: React.FC<CreateFormDialogProps> = (props) => {
	const { entityId, title, type, buttonProps, selectRow, onAfterSubmit, children } = props;

	const SchemaField = useSchemaField({
		MaterialSelect: (props: any) => <MaterialSelect {...props} useCode={true} />
	});


	const getDisable = () => {
		if (!selectRow) {
			return true;
		}

		if (type === 0) {
			// 新增同级：只有当选中行有父级时才能新增同级
			return !selectRow.parentId;
		}

		if (type === 1) {
			// 新增下级：只有当选中行有父级且来源为生产时才禁用
			return selectRow.parentId && selectRow.comeFrom === '20';
		}
	};

	const portalId = `CreateBomItemDialog${type}${entityId || ''}`;

	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				disabled={getDisable()}
				onClick={() => {
					const formDialog = FormDialog(
						{ title: title, width: 1000 },
						portalId,
						(form) => (
							<FormLayout labelWidth={100} feedbackLayout={'none'}>
								<SchemaField>
									<SchemaField.Void
										x-component="FormGrid"
										x-component-props={{
											maxColumns: [1, 2, 3],
											minColumns: [1, 2, 2],
											columnGap: 16,
											rowGap: 16
										}}
									>
										{/* 第一行：物料基础信息 */}
										<SchemaField.String
											title="物料编码"
											required
											name="materialCode"
											x-decorator="FormItem"
											x-component="MaterialSelect"
											x-component-props={{
												placeholder: '请选择物料',
												useCode: true,
												enableLinkage: true,
												labelInValue: true
											}}
											x-decorator-props={{
												gridSpan: 1
											}}
										/>
										<SchemaField.String
											title="外部编码"
											required
											name="materialOutCode"
											x-decorator="FormItem"
											x-component="Input"
											x-read-pretty={true}
											x-decorator-props={{
												gridSpan: 1
											}}
										/>
										<SchemaField.String
											title="来源"
											required
											name="comeFrom"
											x-decorator="FormItem"
											x-component="Input"
											x-read-pretty={true}
											x-decorator-props={{
												gridSpan: 1
											}}
										/>

										{/* 第二行：物料描述 - 占满一行 */}
										<SchemaField.String
											title="物料描述"
											required
											name="materialDescription"
											x-decorator="FormItem"
											x-component="Input"
											x-read-pretty={true}
											x-decorator-props={{
												gridSpan: 3
											}}
										/>

										{/* 第三行：数量和单位 */}
										<SchemaField.Number
											title="单件用量"
											name="qty"
											x-decorator="FormItem"
											x-component="NumberPicker"
											x-component-props={{
												placeholder: '请输入用量',
												precision: 2,
												style: { width: '100%' }
											}}
											x-decorator-props={{
												gridSpan: 1
											}}
										/>
										<SchemaField.String
											title="单位"
											name="unitName"
											x-decorator="FormItem"
											x-component="Input"
											x-read-pretty={true}
											x-decorator-props={{
												gridSpan: 1
											}}
										/>

										{/* 第四行：备注 - 占满一行 */}
										<SchemaField.String
											title="备注"
											name="memo"
											x-decorator="FormItem"
											x-component="Input.TextArea"
											x-component-props={{
												placeholder: '请输入备注',
												autoSize: { minRows: 2, maxRows: 4 }
											}}
											x-decorator-props={{
												gridSpan: 3
											}}
										/>
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						)
					);

					formDialog
						.forConfirm((payload, next) => {
							const values: any = payload.values;

							if (!values.parentId) {
								message.error('此物料无法添加同级');
								return Promise.reject();
							}

							// 处理MaterialSelect的labelInValue格式
							const materialCode = typeof values.materialCode === 'object'
								? values.materialCode.value
								: values.materialCode;

							if (!materialCode) {
								message.error('请选择物料编码');
								return Promise.reject();
							}

							// 确保数据结构符合 CreateBomItemDto
							const createData = {
								saleOrderId: values.saleOrderId,
								saleOrderItemId: values.saleOrderItemId,
								parentId: values.parentId,
								parentMaterialCode: values.parentMaterialCode,
								materialCode: materialCode,
								materialOutCode: values.materialOutCode,
								materialDescription: values.materialDescription,
								unitName: values.unitName,
								comeFrom: values.comeFrom,
								qty: values.qty,
								memo: values.memo
							};

							return SaleOrderCreateBomItemAsync(createData).then(() => {
								if (onAfterSubmit) onAfterSubmit();
								next(payload);
							}).catch(error => {
								console.error('Create BOM item failed:', error);
								message.error('创建失败：' + (error.message || '未知错误'));
								return Promise.reject(error);
							});
						})
						.open({
							effects: () => {
								onFormInit(async (form) => {
									if (selectRow) {
										// 使用正确的字段名，与 SaleOrderItemWorkBomItemDto 一致
										let saleOrderId = selectRow.saleOrderId;
										let saleOrderItemId = selectRow.saleOrderItemId;

										let parentMaterialCode = selectRow.parentMaterialCode;
										let parentId = selectRow.parentId;
										if (type === 1) {
											// 新增下级时，父级信息来自当前选中行
											parentMaterialCode = selectRow.materialCode;
											parentId = selectRow.id;
										}
										form.setInitialValues({
											saleOrderId,
											saleOrderItemId,
											parentMaterialCode,
											parentId
										});
									}
								});

								onFieldValueChange('materialCode', (field, form) => {
									const fieldValue = field.value;

									if (fieldValue) {
										// MaterialSelect使用labelInValue返回{value, label}格式
										const materialCode = typeof fieldValue === 'object' ? fieldValue.value : fieldValue;

										if (materialCode) {
											MaterialGetByCodeAsync({ code: materialCode }).then(res => {
												form.setValuesIn('materialOutCode', res.outCode);
												form.setValuesIn('materialDescription', res.description);
												form.setValuesIn('comeFrom', res.comeFrom);
												form.setValuesIn('unitName', res.unitName);
											}).catch(error => {
												console.error('Failed to load material:', error);
											});
										}
									}
								});
							}
						});
				}}
				{...buttonProps}
			>
				{children}
			</Button>
		</FormDialog.Portal>
	);
};

export default CreateFormDialog;