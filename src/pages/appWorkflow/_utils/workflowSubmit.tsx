import { Form } from '@formily/core';
import { Submit } from '@formily/antd-v5';
import React from 'react';
import { useIntl } from 'umi';

interface CompleteProps {
	entityForm: Form;
	workflowInfo: any;
	buttonProps?: any;
	loading?: any;
	onConfirm?: any;
	onComplete: (formValues) => Promise<any>;
}

const WorkflowSubmit = (props: CompleteProps) => {
	const { workflowInfo, buttonProps, onComplete, entityForm, onConfirm, loading } = props;
	const intl = useIntl();

	if (workflowInfo.workflowInstanceId || !workflowInfo?.workflowDefinitionId) {
		return null;
	}

	return (
		<Submit
			type={'primary'}
			loading={loading}
			onSubmit={() => {
				return entityForm.submit().then((formValues: any) => {
					return onComplete(formValues).then(() => {
						if (onConfirm) onConfirm();
					});
				});
			}}
			{...buttonProps}
		>
			提交
		</Submit>
	);
};

export default WorkflowSubmit;
