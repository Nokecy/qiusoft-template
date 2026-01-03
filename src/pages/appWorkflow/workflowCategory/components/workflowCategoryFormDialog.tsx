import { WorkflowCategoryCreate, WorkflowCategoryGet, WorkflowCategoryUpdate } from '@/services/workflow/WorkflowCategory';
import { ArrayItems, ArrayTable, Checkbox, DatePicker, Editable, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Radio, Select, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from 'antd';
import React, { useMemo } from 'react';

const WorkflowCategoryFormDialog = (props: any) => {
	const { entityId, title, buttonProps, onAfterSubmit } = props;

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					FormTab,
					FormItem,
					FormGrid,
					DatePicker,
					Editable,
					Radio,
					Space,
					Input,
					Select,
					Checkbox,
					ArrayItems,
					ArrayTable,
					InputNumber,
				},
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(async form => {
				if (entityId) {
					let workshiftsInfo = await WorkflowCategoryGet({ id: entityId });
					form.setInitialValues(workshiftsInfo);
				}
			});
		},
	};
	const portalId = `workflowCategory${entityId}`;
	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog1 = FormDialog({ title: title, width: 960 }, portalId, () => {
						return (
							<FormLayout labelWidth={80} feedbackLayout={'none'} shallow={false}>
								<SchemaField>
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>
										<SchemaField.String title={'名称'} required name={'name'} x-decorator='FormItem' x-component={'Input'} x-component-props={{ placeholder: '请输入名称' }} />
										<SchemaField.String
											title={'排序'}
											required
											name={'sort'}
											x-decorator='FormItem'
											x-component={'InputNumber'}
											x-component-props={{ placeholder: '请输入排序', min: 1 }}
										/>
										<SchemaField.String
											title={'备注'}
											name={'description'}
											x-component={'Input.TextArea'}
											x-component-props={{ placeholder: '请输入备注' }}
											x-decorator='FormItem'
											x-decorator-props={{ gridSpan: 4 }}
										/>
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog1
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!values.id) {
								return WorkflowCategoryCreate(values).then(() => {
									if (onAfterSubmit) onAfterSubmit();
									next(payload);
								});
							} else {
								return WorkflowCategoryUpdate({ id: values.id }, values).then(() => {
									if (onAfterSubmit) onAfterSubmit();
									next(payload);
								});
							}
						})
						.open(formProps);
				}}
				{...buttonProps}
			>
				{props.children}
			</Button>
		</FormDialog.Portal>
	);
};

export default WorkflowCategoryFormDialog;
