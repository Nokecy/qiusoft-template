import { WorkflowRunnerExecuteWorkflow } from '@/services/workflow/WorkflowRunner';
import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Input, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { useIntl } from 'umi';

const WorkflowGoBackDialog = (props: any) => {
	const { workflowInfo, buttonProps, onConfirm } = props;
	const intl = useIntl();

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					FormItem,
					FormGrid,
					Checkbox,
					Space,
					Input,
				},
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(form => { });
		},
	};

	const onExecute = (workflowExecuteInfo: any) => {
		return WorkflowRunnerExecuteWorkflow(workflowExecuteInfo);
	};

	if (!workflowInfo?.workflowInstanceId||!workflowInfo?.workflowDefinitionId) {
		return null;
	}

	const PortalId = `worklfowExecute`;

	return (
		<FormDialog.Portal id={PortalId}>
			<Button
				type={'default'}
				danger
				onClick={() => {
					let formDialog = FormDialog({ title: '退回上一步', width: 480 }, PortalId, form => {
						return (
							<FormLayout labelWidth={80}>
								<SchemaField>
									<SchemaField.String
										required
										title={'处理意见'}
										name={'message'}
										x-decorator='FormItem'
										x-component={'Input.TextArea'}
										x-component-props={{ placeholder: '请输入处理意见,不输入默认显示空' }}
									/>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							return onExecute({ ...workflowInfo, ...values, ExecuteType: 15 }).then(() => {
								next(payload);
								if (onConfirm) onConfirm();
							});
						})
						.open(formProps);
				}}
				{...buttonProps}
			>
				退回上一步
			</Button>
		</FormDialog.Portal>
	);
};

export default WorkflowGoBackDialog;
