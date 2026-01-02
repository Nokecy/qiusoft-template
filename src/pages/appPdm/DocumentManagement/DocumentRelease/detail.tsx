/**
 * 文档发放详情页
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, message, Spin, Tag, Space } from 'antd';
import { ArrowLeftOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { history, useAccess, Access, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import {
	DocumentReleaseGetAsync,
	DocumentReleaseSubmitAsync,
	DocumentReleaseExecuteAsync,
	DocumentReleaseCloseAsync
} from '@/services/pdm/DocumentRelease';
import { documentReleaseStatusEnum, recallStatusEnum, recipientConfirmationStatusEnum } from './_components/enums';
import { DocumentReleasePermissions } from './_permissions';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import type { API } from '@/services/typings';
import dayjs from 'dayjs';

export const routeProps = {
	name: '文档发放详情',
};

// 表单布局配置
const formLayout = {
	labelCol: 6,
	wrapperCol: 18,
	labelWidth: 120,
	feedbackLayout: 'none' as const,
};

const DocumentReleaseDetailPage: React.FC = () => {
	const { id, isActive, hasChanged } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentRelease/detail', ['id']);
	const access = useAccess();
	const SchemaField = useSchemaField({});

	const [loading, setLoading] = useState(false);
	const [recordId, setRecordId] = useState<string>();
	const [data, setData] = useState<API.BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto>();
	const documentGridRef = React.useRef<GridRef>();
	const recipientGridRef = React.useRef<GridRef>();

	// 创建只读表单实例
	const form = useMemo(() => createForm({ readPretty: true }), []);

	// 加载数据
	const loadData = useCallback(async (targetId: string) => {
		try {
			setLoading(true);
			const result = await DocumentReleaseGetAsync({ id: targetId });
			setData(result);

			// 获取状态标签文字
			const statusItem = documentReleaseStatusEnum.find(item => item.value === result.status);
			const statusLabel = statusItem?.label || '-';

			// 设置表单初始值
			const initialValues: any = {
				releaseNumber: result.releaseNumber || '-',
				status: statusLabel,
				title: result.title || '-',
				description: result.description || '-',
				approverCode: result.approverCode || '-',
				approverName: result.approverName || '-',
				approvedAt: result.approvedAt || '-',
				releasedAt: result.releasedAt || '-',
				closedAt: result.closedAt || '-',
				creator: result.creator || '-',
				creationTime: result.creationTime ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
				lastModificationTime: result.lastModificationTime ? dayjs(result.lastModificationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
			};

			form.setInitialValues(initialValues);
		} catch (error) {
			console.error('加载数据失败:', error);
			message.error('加载数据失败');
		} finally {
			setLoading(false);
		}
	}, [form]);

	useEffect(() => {
		if (!isActive || !hasChanged) return;
		if (id) {
			setRecordId(id);
			loadData(id);
		}
	}, [isActive, hasChanged, id, loadData]);

	const handleBack = () => {
		const currentPath = `${history.location.pathname}${history.location.search || ''}`;
		history.push('/appPdm/DocumentManagement/DocumentRelease');
		setTimeout(() => {
			closeTab(currentPath);
		}, 150);
	};

	const handleEdit = () => {
		if (recordId) {
			history.push(`/appPdm/DocumentManagement/DocumentRelease/form?id=${recordId}`);
		}
	};

	const handleSubmit = async () => {
		if (!recordId) return;
		try {
			setLoading(true);
			await DocumentReleaseSubmitAsync({ id: recordId });
			message.success('提交成功');
			loadData(recordId);
		} catch (error) {
			message.error('提交失败');
		} finally {
			setLoading(false);
		}
	};

	// 注意：审批和拒绝功能已移除，因为对应的 API 不存在
	// 请使用工作流执行页面进行审批操作

	const handleExecute = async () => {
		if (!recordId) return;
		try {
			setLoading(true);
			await DocumentReleaseExecuteAsync({ id: recordId });
			message.success('执行成功');
			loadData(recordId);
		} catch (error) {
			message.error('执行失败');
		} finally {
			setLoading(false);
		}
	};

	const handleClose = async () => {
		if (!recordId) return;
		try {
			setLoading(true);
			await DocumentReleaseCloseAsync({ id: recordId });
			message.success('关闭成功');
			loadData(recordId);
		} catch (error) {
			message.error('关闭失败');
		} finally {
			setLoading(false);
		}
	};

	// 获取状态标签
	const getStatusTag = (status?: number) => {
		const statusItem = documentReleaseStatusEnum.find(item => item.value === status);
		return statusItem ? <Tag color={statusItem.color}>{statusItem.label}</Tag> : '-';
	};

	const getRecallStatusTag = (status?: number) => {
		const statusItem = recallStatusEnum.find(item => item.value === status);
		return statusItem ? <Tag color={statusItem.color}>{statusItem.label}</Tag> : '-';
	};

	const getConfirmationStatusTag = (status?: number) => {
		const statusItem = recipientConfirmationStatusEnum.find(item => item.value === status);
		return statusItem ? <Tag color={statusItem.color}>{statusItem.label}</Tag> : '-';
	};

	// 表单 Schema 定义
	const schema: ISchema = useMemo(() => {
		return {
			type: 'object',
			properties: {
				grid: {
					type: 'void',
					'x-component': 'FormGrid',
					'x-component-props': { maxColumns: 4, strictAutoFit: true },
					properties: {
						// 基本信息
						dividerBasic: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 4 },
							properties: {
								divider: {
									type: 'void',
									'x-component': 'FormDivider',
									'x-component-props': {
										orientation: 'left',
										children: '基本信息',
									},
								},
							},
						},
						col1: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								releaseNumber: {
									type: 'string',
									title: '发文号',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col2: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								status: {
									type: 'number',
									title: '状态',
									'x-decorator': 'FormItem',
									'x-component': 'PreviewText',
									'x-content': data ? getStatusTag(data.status) : '-',
								},
							},
						},
						col3: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 4 },
							properties: {
								title: {
									type: 'string',
									title: '标题',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col4: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 4 },
							properties: {
								description: {
									type: 'string',
									title: '说明',
									'x-decorator': 'FormItem',
									'x-component': 'Input.TextArea',
									'x-component-props': { rows: 2 },
								},
							},
						},
						// 审批信息
						dividerApproval: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 4 },
							properties: {
								divider: {
									type: 'void',
									'x-component': 'FormDivider',
									'x-component-props': {
										orientation: 'left',
										children: '审批信息',
										style: { marginTop: 5, marginBottom: 5 },
									},
								},
							},
						},
						col5: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								approverCode: {
									type: 'string',
									title: '审批人编码',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col6: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								approverName: {
									type: 'string',
									title: '审批人姓名',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col7: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								approvedAt: {
									type: 'string',
									title: '审批时间',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						// 时间信息
						dividerTime: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 4 },
							properties: {
								divider: {
									type: 'void',
									'x-component': 'FormDivider',
									'x-component-props': {
										orientation: 'left',
										children: '时间信息',
										style: { marginTop: 5, marginBottom: 5 },
									},
								},
							},
						},
						col8: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								releasedAt: {
									type: 'string',
									title: '发放时间',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col9: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								closedAt: {
									type: 'string',
									title: '关闭时间',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col10: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								creator: {
									type: 'string',
									title: '创建人',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col11: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								creationTime: {
									type: 'string',
									title: '创建时间',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col12: {
							type: 'void',
							'x-component': 'FormGrid.GridColumn',
							'x-component-props': { gridSpan: 2 },
							properties: {
								lastModificationTime: {
									type: 'string',
									title: '修改时间',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
					},
				},
			},
		};
	}, [data]);

	// 文档列定义 (AG Grid)
	const documentColumnDefs = [
		{ field: 'documentNumber', headerName: '文档编码', width: 150 },
		{ field: 'documentName', headerName: '文档名称', width: 200 },
		{ field: 'copies', headerName: '份数', width: 80 },
		{
			field: 'isFirstRelease',
			headerName: '是否首发',
			width: 100,
			cellRenderer: (params: any) => params.value ? '是' : '否'
		},
		{ field: 'releaseVersion', headerName: '发放版本', width: 120 },
		{ field: 'recallVersion', headerName: '回收版本', width: 120 },
		{ field: 'effectiveDate', headerName: '生效日期', width: 150 },
		{
			field: 'requiresConfirmation',
			headerName: '需要确认',
			width: 100,
			cellRenderer: (params: any) => params.value ? '是' : '否'
		},
		{
			field: 'recallStatus',
			headerName: '回收状态',
			width: 100,
			cellRenderer: (params: any) => getRecallStatusTag(params.value)
		},
		{ field: 'expectedRecallDate', headerName: '预计回收时间', width: 180 },
		{
			field: 'nonRecallUsers',
			headerName: '不回收对象',
			width: 200,
			cellRenderer: (params: any) => {
				const users = params.value || [];
				if (!users.length) return '-';
				return users.map((u: any) => u.userName).join(', ');
			},
		},
		{ field: 'actualRecallDate', headerName: '实际回收时间', width: 180 },
		{ field: 'remarks', headerName: '备注', width: 200 },
	];

	// 接收人列定义 (AG Grid)
	const recipientColumnDefs = [
		{ field: 'recipientName', headerName: '接收人', width: 120 },
		{ field: 'departmentName', headerName: '部门', width: 150 },
		{
			field: 'confirmationStatus',
			headerName: '确认状态',
			width: 100,
			cellRenderer: (params: any) => getConfirmationStatusTag(params.value)
		},
		{ field: 'confirmedAt', headerName: '确认时间', width: 180 },
		{ field: 'confirmNote', headerName: '确认备注', width: 200 },
		{ field: 'rejectReason', headerName: '拒绝原因', width: 200 },
	];

	return (
		<div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
			<Spin spinning={loading}>
				{/* 工作流进度信息 */}
				{data?.workflowInstanceId && (
					<WorkflowInstanceInfo
						workflowInstanceId={data.workflowInstanceId}
						correlationData={{ creator: data.creator }}
					/>
				)}

				{/* 表单详情 */}
				{data && (
					<Card
						title={
							<Space>
								<span>文档发放详情</span>
								{getStatusTag(data.status)}
							</Space>
						}
					>
						<FormProvider form={form}>
							<FormLayout {...formLayout}>
								<SchemaField schema={schema} />
							</FormLayout>
						</FormProvider>
					</Card>
				)}

				{/* 发放文档 */}
				{data && (
					<Card title="发放文档" style={{ marginTop: 16 }}>
						<AgGridPlus
							gridRef={documentGridRef}
							dataSource={data.documents || []}
							columnDefs={documentColumnDefs}
							pagination={false}
							domLayout="autoHeight"
							toolBarRender={false}
							search={false}
						/>
					</Card>
				)}

				{/* 接收人 */}
				{data && (
					<Card title="接收人" style={{ marginTop: 16 }}>
						<AgGridPlus
							gridRef={recipientGridRef}
							dataSource={data.recipients || []}
							columnDefs={recipientColumnDefs}
							pagination={false}
							domLayout="autoHeight"
							toolBarRender={false}
							search={false}
						/>
					</Card>
				)}

				{/* 审批日志 */}
				{data?.workflowInstanceId && (
					<WorkflowExecutionCorrelationList
						hideSearch={true}
						workflowData={{
							correlationId: data.id as string,
							workflowDefinitionId: data.workflowDefinitionId || ''
						}}
					/>
				)}

				<ToolBar>
					<Button icon={<ArrowLeftOutlined />} onClick={handleBack}>返回</Button>
					<Access accessible={!!access[DocumentReleasePermissions.Update]}>
						<Button icon={<EditOutlined />} onClick={handleEdit}>编辑</Button>
					</Access>
					<Access accessible={!!access[DocumentReleasePermissions.Submit]}>
						<Button icon={<CheckOutlined />} onClick={handleSubmit}>提交审批</Button>
					</Access>
					{/* 审批和拒绝按钮已移除，请使用工作流执行页面进行审批操作 */}
					<Access accessible={!!access[DocumentReleasePermissions.Execute]}>
						<Button type="primary" icon={<CheckOutlined />} onClick={handleExecute}>执行发放</Button>
					</Access>
					<Access accessible={!!access[DocumentReleasePermissions.Close]}>
						<Button icon={<CloseOutlined />} onClick={handleClose}>关闭</Button>
					</Access>
				</ToolBar>
			</Spin>
		</div>
	);
};

export default DocumentReleaseDetailPage;
