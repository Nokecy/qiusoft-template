import UserSelect from '@/pages/appSYS/users/components/userSelect';
import XUserSelect from '@/pages/appSYS/_utils/XUserSelect';
import { WorkflowUserActionGetActionListByActivity } from '@/services/workflow/WorkflowUserAction';
import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Input, Radio, Space } from '@formily/antd-v5';
import { Form, isField, onFormInit, onFieldValueChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'umi';

interface CompleteProps {
	hideDialog?: any;
	entityForm: Form;
	workflowInfo: any;
	buttonProps?: any;
	onConfirm: any;
	onComplete: (formValues) => Promise<any>;
}

const WorklfowCompleteDialog = (props: CompleteProps) => {
	const { workflowInfo, entityForm, buttonProps, onConfirm, onComplete } = props;
	const intl = useIntl();

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: { FormItem, FormGrid, Checkbox, Space, Input, Radio, UserSelect, XUserSelect },
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(form => {
				WorkflowUserActionGetActionListByActivity({
					workflowInstanceId: workflowInfo.workflowInstanceId,
					activityId: workflowInfo.activityId,
				}).then(actions => {
					form.setValuesIn('actions', actions);
					const nextActivityField = form.query('nextActivity').take();
					if (isField(nextActivityField)) {
						nextActivityField.setDataSource(
							actions.map(x => {
								return { label: x.action, value: x.action };
							})
						);
						if (actions.length === 1) {
							nextActivityField.setValue(actions[0].action);
						}
					}
				});
			});

			onFieldValueChange('nextActivity', (field, form) => {
				const actions = form.values.actions;
				const action = actions.find(x => x.action === field.value);
				if (action) {
					form.setValuesIn('actorSelectionMode', action.actorSelectionMode);
				}
			});
		},
	};

	const PortalId = `124354678`;

	const openDialog = formValues => {
		let formDialog = FormDialog({ title: '通过', width: 650 }, PortalId, form => {
			return (
				<FormLayout labelWidth={120} feedbackLayout='none'>
					<SchemaField>
						<SchemaField.String title={'操作'} required name={'nextActivity'} x-decorator='FormItem' x-component={'Radio.Group'} />

						<SchemaField.String
							title={'下一节点处理人'}
							required
							name={'nextAssignUser'}
							x-decorator='FormItem'
							x-component={'UserSelect'}
							x-component-props={{ showId: false, labelInValue: false }}
							x-reactions={field => {
								const actorSelectionMode = field.form.getValuesIn('actorSelectionMode');
								field.visible = actorSelectionMode == 5;
							}}
						/>

						<SchemaField.String
							title={'抄送人'}
							name={'copyToUsers'}
							x-decorator='FormItem'
							x-component={'XUserSelect'}
							x-component-props={{
								placeholder: '请选择抄送人',
								mode: 'multiple',
							}}
						/>

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
				let copyToUsers: any = null;
				if (values.copyToUsers) {
					copyToUsers = values.copyToUsers.map(item => item.children)
					delete values.copyToUsers;
				}
				if (onComplete) {
					return onComplete({ ...formValues, 
						workflowInput: { ...values, activityId: workflowInfo.activityId, copyToUsers: copyToUsers },
						executeInput: { ...values, copyToUsers: copyToUsers } }).then(() => {
						next(payload);
						if (onConfirm) onConfirm();
					});
				}
			})
			.open(formProps);
	};

	const [loading, setLoading] = useState(false);
	if (!workflowInfo?.workflowDefinitionId) {
		return null;
	}
	return (
		<FormDialog.Portal id={PortalId}>
			<Button
				loading={loading}
				type={'primary'}
				disabled={!workflowInfo.workflowInstanceId}
				onClick={() => {
					entityForm.submit().then((formValues: any) => {
						if (props.hideDialog) {
							WorkflowUserActionGetActionListByActivity({
								workflowInstanceId: workflowInfo.workflowInstanceId,
								activityId: workflowInfo.activityId,
							}).then(actions => {
								if (actions.length === 1 && actions[0].actorSelectionMode != 5) {
									let executeInput = {
										message: '',
										nextActivity: actions[0].action,
									};
									setLoading(true);
									onComplete({ ...formValues, executeInput: executeInput }).then(() => {
										if (onConfirm) onConfirm();
										setLoading(false);
									});
								} else {
									setTimeout(() => {
										openDialog(formValues);
									}, 300);
								}
							});
						} else {
							openDialog(formValues);
						}
					});
				}}
				{...buttonProps}
			>
				通过
			</Button>
		</FormDialog.Portal>
	);
};

export default WorklfowCompleteDialog;
