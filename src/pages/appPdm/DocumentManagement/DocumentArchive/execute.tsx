import { Button, Card, Spin, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useSchemaField, closeTab, history } from 'umi';
import { formId, executeFormSchema } from './components/schema';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import { createForm, onFormInit } from '@formily/core';
import { WorkItemAssignDialog } from '@/pages/appWorkflow/_utils';
import WorkflowExecutionList from '@/pages/appWorkflow/_utils/workflowExecutionList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import { pubGoBack } from '@/components/public';
import { DocumentArchiveGetAsync, DocumentArchiveExecuteWorkflowAsync } from '@/services/pdm/DocumentArchive';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import useWorkflow from '@/hooks/useWorkflow';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useKeepAliveParams } from '@/hooks';

/**
 * 文档归档工作流执行页面
 */
const ExecuteFormPage = (props: any) => {
	const { params } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentArchive/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
	const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;
	const $store = useMemo(() => observable({ currentActivityName: '' }), []);
	const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);
	const [current, setCurrent]: any = useState({});
	const [loading, setLoading] = useState(false);

	const schema = executeFormSchema;
	const SchemaField = useSchemaField();
	const $workflowInfo = useMemo(
		() =>
			observable({
				currentActivityName: '',
				executionActivityNames: [],
			}),
		[]
	);

	const form = useMemo(
		() =>
			createForm({
				effects: () => {
					onFormInit(async (form) => {
						if (correlationId) {
							setLoading(true);
							try {
								let values: any = await DocumentArchiveGetAsync({ id: correlationId });

								let index = 0;
								if (values.activityId) {
									values.activityId?.split(';').forEach((i, idx) => {
										if (i == activityId) {
											index = idx;
										}
									});
									values.activityId = values.activityId.split(';')[index];
									values.activityName = values.activityName.split(';')[index];
									values.assigneeName = values.assigneeName.split(';')[index];
									values.activityDisplayName = values.activityDisplayName.split(';')[index];
									values.activityDescription = values.activityDescription.split(';')[index];
								}

								// 将创建人和创建时间映射到发起人和发起时间字段
								if (values.creator) {
									values.initiatorName = values.creator;
								}
								if (values.creationTime) {
									values.initiationTime = values.creationTime;
								}

								// 设置文档编码默认值（使用归档信息中的文档编码）
								// 注意: docNo 字段在审批信息中, 但默认值来自归档信息
								// 这样在表单加载时, docNo 字段会自动填充归档信息中的文档编码

								form.setValues(values);
								setCurrent(values);
							} catch (error) {
								message.error('加载数据失败');
							} finally {
								setLoading(false);
							}
						}
					});
				},
			}),
		[]
	);

	/**
	 * 获取流程信息
	 */
	useEffect(() => {
		if (workflowInfo.executionLogs) {
			$workflowInfo.currentActivityName = workflowInfo.currentActivityName!;

			//@ts-ignore
			$workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map((x) => x.activityDisplayName);
		}
	}, [workflowInfo]);

	const handleSubmit = async () => {
		try {
			await form.validate();
			const values = form.values;

			// 检查工作流输入
			if (!values.workflowInput) {
				message.error('请填写审批意见');
				return;
			}

			// 检查必填字段
			if (!values.docNo) {
				message.error('请输入文档编码');
				return;
			}
			if (!values.storageLibraryId) {
				message.error('请选择存储库');
				return;
			}
			if (!values.recycleLibraryId) {
				message.error('请选择回收库');
				return;
			}
			if (!values.documentName) {
				message.error('请输入文档名称');
				return;
			}

			// 构建符合API要求的数据结构
			const submitData = {
				docNo: values.docNo,
				documentName: values.documentName,
				storageLibraryId: values.storageLibraryId,
				recycleLibraryId: values.recycleLibraryId,
				workflowInput: {
					...values.workflowInput,
					activityId,
				},
			};

			await DocumentArchiveExecuteWorkflowAsync({ id: correlationId }, submitData);
			message.success('审批提交成功');
			closeTab(history.location.pathname);
		} catch (error) {
			console.error('审批提交失败:', error);
			message.error('审批提交失败');
		}
	};

	return (
		<div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
			{/* 工作流进度信息 */}
			<WorkflowInstanceInfo
				workflowInstanceId={workflowInstanceId as string}
				correlationData={{ ...form.values, activityId }}
				steps={[]}
				currentActivityName={workflowInfo.currentActivityName}
			/>

			{/* 基本信息卡片 */}
			<Card title="归档信息" style={{ marginBottom: 16 }}>
				<Spin spinning={loading} tip="加载中...">
					<FormProvider form={form}>
						<FormLayout {...schema.form} previewTextPlaceholder={'无'}>
							<SchemaField schema={schema.schema} scope={{ $workflowInfo }}></SchemaField>
						</FormLayout>
					</FormProvider>
				</Spin>
			</Card>

			{/* 工作流执行表单(审批意见) */}
			<WorkflowExecutionForm
				form={form}
				workflowInstanceId={workflowInstanceId}
				definitionId={definitionId}
				activityId={activityId}
				currentActivityName={workflowInfo.currentActivityName}
			/>

			{/* 审批日志 */}
			<WorkflowExecutionList {...props} workflowInstanceId={workflowInstanceId} hideSearch={true} />

			{/* 底部按钮栏 */}
			<ToolBar>
				<Button
					onClick={() => {
						pubGoBack(true);
					}}
				>
					返回
				</Button>

				<WorkItemAssignDialog
					workflowInfo={{ workItemId }}
					entityForm={form}
					onConfirm={() => {
						closeTab(history.location.pathname);
					}}
				/>

				<Button type="primary" onClick={handleSubmit}>
					提交
				</Button>
			</ToolBar>
		</div>
	);
};

export default ExecuteFormPage;
export const routeProps = {
	name: '处理文档归档',
};
