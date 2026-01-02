import {
	ProcessProcedureCategoryCreateAsync,
	ProcessProcedureCategoryGetAsync,
	ProcessProcedureCategoryUpdateAsync,
} from '@/services/pdm/ProcessProcedureCategory';
import { FormDialog, FormLayout, FormGrid, Input, FormItem } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useSchemaField } from '@umijs/max';
import { Button, ButtonProps, message } from 'antd';
import React from 'react';

interface ProcessProcedureCategoryFormDialogProps {
	title?: string;
	entityId?: number;
	onAfterSubmit?: () => void;
	buttonProps?: ButtonProps;
	children?: React.ReactNode;
}

const ProcessProcedureCategoryFormDialog: React.FC<ProcessProcedureCategoryFormDialogProps> = (props) => {
	const { title = '新建工序分类', entityId, onAfterSubmit, buttonProps, children } = props;

	const SchemaField = useSchemaField({
		FormItem,
		Input,
		FormLayout,
		FormGrid,
	});

	const formProps = {
		effects: () => {
			onFormInit(async (form) => {
				if (entityId) {
					try {
						const data = await ProcessProcedureCategoryGetAsync({ id: entityId });
						form.setInitialValues(data);
					} catch (error) {
						message.error('加载数据失败');
						console.error(error);
					}
				}
			});
		},
	};

	const portalId = `ProcessProcedureCategory${entityId || 'new'}`;

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
											title={'工序分类编码'}
											required
											name={'code'}
											x-decorator="FormItem"
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入工序分类编码', maxLength: 50 }}
										/>
										<SchemaField.String
											title={'工序分类名称'}
											required
											name={'name'}
											x-decorator="FormItem"
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入工序分类名称', maxLength: 100 }}
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
							const dto: API.BurnAbpPdmProcessManagementProcessProcedureCategoriesCreateUpdateProcessProcedureCategoryDto =
							{
								code: values.code,
								name: values.name,
								memo: values.memo,
							};

							if (!values.id) {
								return ProcessProcedureCategoryCreateAsync(dto)
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
								return ProcessProcedureCategoryUpdateAsync({ id: values.id }, dto)
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

export default ProcessProcedureCategoryFormDialog;
