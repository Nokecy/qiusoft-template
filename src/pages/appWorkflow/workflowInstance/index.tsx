import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import ViewDrawer from '@/pages/appWorkflow/workflowInstance/components/viewDrawer';
import { StatusQuery } from '@/pages/appWorkflow/_utils/workflowStatusRender';
import { GetElsaWorkflowsApiEndpointsWorkflowInstancesListList } from '@/services/workflow/WorkflowInstances';
import { WorkflowRunnerReviveWorkflow } from '@/services/workflow/WorkflowRunner';
import { WorkflowInstances } from '@/services/workflowPermission';
import { EditOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { GridApi } from 'ag-grid-community';
import { Button, Tag, message } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, useRequest } from 'umi';

const WorkflowInstancePage = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const { data, run: blukRetry } = useRequest(WorkflowRunnerReviveWorkflow, { manual: true });

	const retry = (api: GridApi) => {
		const selectRows = api.getSelectedRows();
		if (selectRows.length <= 0) {
			message.error('请选择行');
		}

		const hide = message.loading('正在操作,请稍后', 0);
		let workflowInstanceIds = selectRows.map(x => x.id);
		blukRetry({ workflowInstaneId: workflowInstanceIds[0] })
			.then(onRefresh)
			.finally(() => {
				hide();
			});
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				request={async (params: any, sort: any, filter: any) => {
					let page = params!.skipCount === 0 ? 0 : params!.skipCount / params!.maxResultCount;
					let data = await GetElsaWorkflowsApiEndpointsWorkflowInstancesListList({
						orderBy: params?.sort,
						page: page,
						pageSize: params!.maxResultCount,
						subStatus: filter.subStatus,
						searchTerm: filter?.name,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				rowSelection={'single'}
				toolBarRender={api => {
					return [
						<Access accessible={!!access[WorkflowInstances.Default]}>
							<Button icon={<EditOutlined />} type={'primary'} title={'重试'} onClick={() => { retry(api!); }}>
								重试
							</Button>
						</Access>,
					];
				}}
				headerTitle={'流程实例列表'}
			>
				<AgGridColumn field={'name'} headerName={'流程名称'} flex={1} cellRenderer={ViewDrawer} />
				<AgGridColumn field={'version'} headerName={'实例版本'} width={100} hideInSearch />
				<AgGridColumn field={'subStatus'} headerName={'实例状态'} width={100} cellRenderer={(params: any) => {
					switch (params.value) {
						case "Executing":
							return <Tag color={'success'}>执行中</Tag>;
						case "Suspended":
							return (
								<Tag color={'orange'} style={{ color: '#fac03d' }}>
									人工处理
								</Tag>
							);
						case "Finished":
							return <Tag color={'success'}>完成</Tag>;
						case "Suspended":
							return <Tag color={'error'}>已驳回</Tag>;
						case "Canceled":
							return <Tag color={'error'}>取消</Tag>;
						case "Faulted":
							return <Tag color={'error'}>错误</Tag>;
						default:
							return <Tag color={'success'}>{params.value}</Tag>;
					}
				}} searchComponent={StatusQuery} />
				<AgGridColumn field={'createdAt'} headerName={'创建时间'} width={150} type={'dateTimeColumn'} initialSort={'desc'} hideInSearch />
				<AgGridColumn field={'updatedAt'} headerName={'最后执行时间'} width={150} type={'dateTimeColumn'} hideInSearch />
				<AgGridColumn field={'finishedAt'} headerName={'完成时间'} width={150} type={'dateTimeColumn'} hideInSearch />
			</AgGridPlus>
		</>
	);
};

export default WorkflowInstancePage;
export const routeProps = {
	name: '流程实例列表',
};
