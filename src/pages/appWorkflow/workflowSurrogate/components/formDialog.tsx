import WorkflowDefinitionSelect from '@/pages/appWorkflow/_utils/workflowDefinitionSelect';
import UserSelect from '@/pages/appSYS/users/components/userSelect';
import { WorkflowSurrogateCreate, WorkflowSurrogateGet, WorkflowSurrogateUpdate } from '@/services/workflow/WorkflowSurrogate';
import { DatePicker, FormDialog, FormGrid, FormItem, FormLayout, Input, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { useIntl } from 'umi';

const SurrogateFormDialog = (props: any) => {
	const { entityId, buttonProps, onConfirm } = props;
	const intl = useIntl();

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					FormItem,
					FormGrid,
					Space,
					Input,
					WorkflowDefinitionSelect,
					UserSelect,
					DatePicker,
				},
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(form => {
				if (entityId) {
					WorkflowSurrogateGet({ id: entityId }).then(entity => {
						form.setInitialValues(entity);
					});
				}
			});
		},
	};

	const PortalId = `surrogate${entityId}`;

	return (
		<FormDialog.Portal id={PortalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog = FormDialog({ title: '新建流程代理', width: 720 }, PortalId, form => {
						return (
							<FormLayout labelWidth={80}>
								<SchemaField>
									<SchemaField.String
										title={'流程'}
										required
										name={'{value:workflowDefinitionId,label:workflowName}'}
										x-decorator='FormItem'
										x-component={'WorkflowDefinitionSelect'}
										x-component-props={{ placeholder: '流程', labelInValue: true }}
									/>

									<SchemaField.String
										title={'申请人'}
										required
										name={'{value:principalId,label:principal}'}
										x-decorator='FormItem'
										x-component={'UserSelect'}
										x-component-props={{ placeholder: '申请人', labelInValue: true }}
									/>

									<SchemaField.String
										title={'代理人'}
										required
										name={'{value:trusteeId,label:trustee}'}
										x-decorator='FormItem'
										x-component={'UserSelect'}
										x-component-props={{ placeholder: '代理人', labelInValue: true }}
									/>

									<SchemaField.String
										title={'开始时间'}
										required
										name={'startDate'}
										x-decorator='FormItem'
										x-component={'DatePicker'}
										x-component-props={{ placeholder: '开始时间' }}
									/>

									<SchemaField.String
										title={'结束时间'}
										required
										name={'endDate'}
										x-decorator='FormItem'
										x-component={'DatePicker'}
										x-component-props={{ placeholder: '结束时间' }}
									/>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!values.id) {
								return WorkflowSurrogateCreate(values).then(() => {
									next(payload);
									if (onConfirm) onConfirm();
								});
							} else {
								return WorkflowSurrogateUpdate({ id: values.id }, values).then(() => {
									next(payload);
									if (onConfirm) onConfirm();
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

export default SurrogateFormDialog;
