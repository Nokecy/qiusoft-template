import React, { useEffect, useState } from 'react';
import { Spin, Result, Button } from 'antd';
import { useKeepAliveParams } from '@/hooks';
import { WorkflowDefinitionEditor } from './components/workflowDefinitionEditor';
import { ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList } from '@/services/workflow/WorkflowDefinitions';

const WorkflowDesignerPage = (props: any) => {
	const { params, isActive, hasChanged } = useKeepAliveParams(
		'/appWorkflow/workflowDefinition/designer',
		['definitionId', 'workflowName']
	);

	const { definitionId: queryDefinitionId, workflowName } = params;

	const [definitionId, setDefinitionId] = useState<string | undefined>(
		queryDefinitionId as string | undefined
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 如果传入 workflowName，通过 API 获取 definitionId
	useEffect(() => {
		if (!isActive || !hasChanged) return;
		if (workflowName && !queryDefinitionId) {
			setLoading(true);
			setError(null);
			ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList({
				Page: 0,
				PageSize: 200,
				VersionOptions: 'Latest',
			})
				.then((res) => {
					const workflow = res?.items?.find(
						(item) => item.name === workflowName
					);
					if (workflow?.definitionId) {
						setDefinitionId(workflow.definitionId);
					} else {
						setError(`未找到工作流: ${workflowName}`);
					}
				})
				.catch((err) => {
					setError(`获取工作流失败: ${err.message || '未知错误'}`);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [isActive, hasChanged, workflowName, queryDefinitionId]);

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<Spin size="large" tip="加载工作流..." />
			</div>
		);
	}

	if (error) {
		return (
			<Result
				status="error"
				title="加载失败"
				subTitle={error}
				extra={
					<Button type="primary" onClick={() => window.history.back()}>
						返回
					</Button>
				}
			/>
		);
	}

	if (!definitionId) {
		return (
			<Result
				status="warning"
				title="缺少参数"
				subTitle="请提供 definitionId 或 workflowName 参数"
				extra={
					<Button type="primary" onClick={() => window.history.back()}>
						返回
					</Button>
				}
			/>
		);
	}

	return (
		<>
			<WorkflowDefinitionEditor definitionId={definitionId} />
		</>
	);
};

export default WorkflowDesignerPage;
export const routeProps = {
	name: '流程设计器',
};
