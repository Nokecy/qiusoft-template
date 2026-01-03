import { Button } from 'antd';
import { ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList } from '@/services/workflow/WorkflowDefinitions';
import React from 'react';
import { useIntl, history, dropByCacheKey } from 'umi';

interface CompleteProps {
	createRoute: string;
	workflowDefinitionName: string;
	refresh?: any;
	children?: any;
}

const CreateWorkflowButton = (props: CompleteProps) => {
	const { createRoute, workflowDefinitionName, children, refresh } = props;
	const intl = useIntl();

	return (
		<Button
			type={'primary'}
			onClick={async () => {
				let { items: data } = await ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList({});
				let row: any = data?.find(it => it.description == workflowDefinitionName);
				refresh && refresh()
				if (createRoute.indexOf("?") != -1) {
					history.push(`${createRoute}&definitionId=${row?.definitionId}`);
					return
				}
				///@ts-ignore
				history.push(`${createRoute}?definitionId=${row?.definitionId}`);
			}}
		>
			{children ? children : "新建"}
		</Button>
	);
};

export default CreateWorkflowButton;
