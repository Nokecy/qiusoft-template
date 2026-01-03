import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Input, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { useIntl } from 'umi';
import UserSelect from '@/pages/appSYS/users/components/userSelect';
import { WorkflowItemAssign } from '@/services/workflow/WorkflowItem';

const WorkItemAssignDialog = (props: any) => {
	const { workflowInfo = {}, buttonProps, onConfirm } = props;
	const { workItemId } = workflowInfo;
	const intl = useIntl();

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: { FormItem, FormGrid, Checkbox, Space, Input, UserSelect, },
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(form => { });
		},
	};

	const onExecute = ({ workItemId, assignId, assignName }: any) => {
		return WorkflowItemAssign({ workItemId, assignId, assignName });
	};

	if (!workItemId) {
		return null;
	}

	const PortalId = `workItemAssignAsync`;

	return (
		<FormDialog.Portal id={PortalId}>
			<Button
				type={'default'}
				onClick={() => {
					let formDialog = FormDialog({ title: '转处理人', width: 760 }, PortalId, form => {
						return (
							<FormLayout labelWidth={100}>
								<SchemaField>
									<SchemaField.String
										required
										title={'转给处理人'}
										name={'handlerCodeValue'}
										x-decorator='FormItem'
										x-component={'UserSelect'}
										x-component-props={{ placeholder: '请输入EC处理人', labelInValue: true, showId: false }}
									/>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let { handlerCodeValue }: any = payload.values;
							return onExecute({ workItemId: workItemId, assignId: handlerCodeValue.value, assignName: handlerCodeValue.label }).then(() => {
								next(payload);
								if (onConfirm) onConfirm();
							});
						})
						.open(formProps);
				}}
				{...buttonProps}
			>
				转处理人
			</Button>
		</FormDialog.Portal>
	);
};

export default WorkItemAssignDialog;
