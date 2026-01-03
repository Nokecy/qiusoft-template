import React from 'react';
import { history, closeTab, useModel } from 'umi';
import { Button, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { WorkflowItemGetByActivity } from '@/services/workflow/WorkflowItem';

const ExecuteWorkflowButton = ({ data }) => {
	const { initialState }: any = useModel('@@initialState');

	const execute = async () => {
		const row = data;
		const setting: any = await WorkflowItemGetByActivity({
			correlationId: data.id,
			activityId: data.activityId,
		});
		if (!setting?.formUrl) {
			message.warning('此流程数据已被删除或处理');
			return;
		}
		let url = `${setting?.formUrl}?definitionId=${row.workflowDefinitionId}&correlationId=${row.id}&workflowInstanceId=${data.workflowInstanceId}&activityId=${data.activityId}`;
		history.push(url);
	};

	return <Button size={'small'} icon={<FormOutlined />} disabled={initialState?.profile.name != data.assigneeName} type={'link'} title={'处理按钮'} onClick={execute} />;
};

export default ExecuteWorkflowButton;
