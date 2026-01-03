import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import WorkflowItemStatusRender from '@/pages/appWorkflow/_utils/workflowItemStatusRender';
import ViewDrawer from '@/pages/appWorkflow/workflowInstance/components/viewDrawer';
import { WorkflowItemGetList } from '@/services/workflow/WorkflowItem';
import React from 'react';
import { useAccess, useIntl } from 'umi';

const WorkflowItemPage = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<>
			<AgGridPlus
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let filter = params!.filter;
					let data = await WorkflowItemGetList({ Filter: '', Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={api => {
					return [];
				}}
				headerTitle={'工作任务列表'}
			>
				<AgGridColumn field={'workflowDefinitionId'} headerName={'流程定义ID'} width={130} hide />
				<AgGridColumn field={'title'} headerName={'任务主题'} width={150} flex={1} cellRenderer={ViewDrawer} cellRendererParams={{ isTask: true }} />
				<AgGridColumn field={'workflowName'} headerName={'流程名称'} width={150} />
				<AgGridColumn field={'workflowVersion'} headerName={'流程版本'} width={100} />
				<AgGridColumn field={'workflowInstanceId'} headerName={'实例ID'} width={100} hide />
				<AgGridColumn field={'correlationId'} headerName={'关联ID'} width={100} hide />
				<AgGridColumn field={'activityId'} headerName={'活动Id'} width={100} hide />
				<AgGridColumn field={'activityName'} headerName={'活动名称'} width={100} hide />
				<AgGridColumn field={'activityDisplayName'} headerName={'活动显示名称'} width={150} />
				<AgGridColumn field={'activityDescription'} headerName={'活动描述'} width={120} hide />
				<AgGridColumn field={'assigneeId'} headerName={'处理人ID'} width={80} hide />
				<AgGridColumn field={'assigneeName'} headerName={'处理人'} width={80} />
				<AgGridColumn field={'status'} headerName={'状态'} width={80} cellRenderer={WorkflowItemStatusRender} />

				<AgGridColumn field={'createTime'} headerName={'创建时间'} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'timeOutTime'} headerName={'超时时间'} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'completeTime'} headerName={'完成时间'} width={150} type={'dateTimeColumn'} />
			</AgGridPlus>
		</>
	);
};

export default WorkflowItemPage;
export const routeProps = {
	name: '任务项',
};
