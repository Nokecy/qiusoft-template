import { WorkflowRunnerRejectWorkflow } from '@/services/workflow/WorkflowRunner';
import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Input, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { useIntl, useAccess } from 'umi';

const WorkflowRejectDialog = (props: any) => {
	const { worklfowInfo, buttonProps, onConfirm } = props;
	const intl = useIntl();

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: { FormItem, FormGrid, Checkbox, Space, Input },
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(form => { });
		},
	};

	const onReject = (workflowExecuteInfo: any) => {
		return WorkflowRunnerRejectWorkflow(workflowExecuteInfo);
	};

	if (!worklfowInfo?.workflowInstanceId) {
		return null;
	}

	const PortalId = `worklfowReject`;
	const access = useAccess();
	return (
		<FormDialog.Portal id={PortalId}>
			<Button
				type={'default'}
				danger
				onClick={() => {
					let formDialog = FormDialog({ title: '拒绝', width: 480 }, PortalId, form => {
						return (
							<FormLayout labelWidth={80}>
								<SchemaField>
									<SchemaField.String
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
							return onReject({ ...worklfowInfo, executeInput: { ...values } }).then(() => {
								next(payload);
								if (onConfirm) onConfirm();
							});
						})
						.open(formProps);
				}}
				{...buttonProps}
			>
				拒绝
			</Button>
		</FormDialog.Portal>
	);
};

export default WorkflowRejectDialog;
