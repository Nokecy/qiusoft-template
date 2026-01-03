import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import WorkflowItemStatusRender from '@/pages/appWorkflow/_utils/workflowItemStatusRender';
import { WorkflowDefinitionSettingGetByDefinitionId } from '@/services/workflow/WorkflowDefinitionSetting';
import { WorkflowItemGetSelfList } from '@/services/workflow/WorkflowItem';
import { WorkflowItems } from '@/services/workflowPermission';
import { FormOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Space, Tag } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Access, dropByCacheKey, history, useAccess, useIntl, useMatch } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';

const executeWorkflow = async data => {
	const row = data;
	let formUrl = data.formUrl;
	if (!formUrl) {
		const setting = await WorkflowDefinitionSettingGetByDefinitionId({ definitionId: row.workflowDefinitionId });
		formUrl = setting.defaultForm;
	}
	if (!formUrl?.startsWith('/')) {
		setTimeout(() => {
			dropByCacheKey('/appWorkflow/workflowForm/customerForm')
			history.push(
				`/appWorkflow/workflowForm/customerForm?workItemId=${row.id}&definitionId=${row.workflowDefinitionId}&workflowInstanceId=${data.workflowInstanceId}&formName=${formUrl}&correlationId=${row.correlationId}&activityId=${data.activityId}`
			);
		}, 200);
	} else {
		setTimeout(() => {
			dropByCacheKey(formUrl)
			history.push(
				`${formUrl}?workItemId=${row.id}&definitionId=${row.workflowDefinitionId}&correlationId=${row.correlationId}&workflowInstanceId=${data.workflowInstanceId}&activityId=${data.activityId}`
			);
		}, 200);
	}
};

const Status = ({ data }) => {
	switch (data.type) {
		case 0:
			return <Tag color={"blue"}>正常任务</Tag>;
		case 1:
			return <Tag color={"green"}>退回任务</Tag>;
		default:
			return <Tag color={"pink"}>无</Tag>;
	}
}

const Options = (props: ICellRendererParams) => {
	const { data, api } = props;
	const intl = useIntl();
	const access = useAccess();

	return (
		<Space>
			<Access accessible={!!access[WorkflowItems.Default]}>
				<Button size={'small'} icon={<FormOutlined />} type={'link'} title={'办理'} onClick={executeWorkflow.bind(null, data)} />
			</Access>
		</Space>
	);
};

const WorkflowItemPage = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const match = useMatch('/appworkflow/workflowself/doing');
	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	useEffect(() => {
		if (match) {
			onRefresh();
		}
	}, [match]);
	/**
	 * 检查任务状态 定时器
	 */

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				gridKey='appWorkflow.WorkflowSelf.doing'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let filter = params!.filter ? `(${params!.filter}),(status=0)` : '(status = 0)';
					let data = await WorkflowItemGetSelfList({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={api => {
					return [];
				}}
				headerTitle={'工作任务列表'}
			>
				<AgGridColumn field={'workflowDefinitionId'} headerName={'流程定义ID'} width={130} hide />
				<AgGridColumn field={'title'} headerName={'任务主题'} width={360} cellRenderer={({ value, data }) => {
					return <a onClick={() => executeWorkflow(data)}>{value}</a>;
				}} />
				<AgGridColumn field={'workflowName'} headerName={'流程名称'} width={150} hide />
				<AgGridColumn field={'workflowVersion'} headerName={'流程版本'} width={120} hide />
				<AgGridColumn field={'workflowInstanceId'} headerName={'实例ID'} width={120} hide />
				<AgGridColumn field={'correlationId'} headerName={'关联ID'} width={120} hide />
				<AgGridColumn field={'activityId'} headerName={'活动Id'} width={120} hide />
				<AgGridColumn field={'activityName'} headerName={'活动名称'} width={120} hide />
				<AgGridColumn field={'activityDisplayName'} headerName={'活动名称'} width={150} />
				<AgGridColumn field={'activityDescription'} headerName={'活动描述'} width={120} hide />
				<AgGridColumn field={'assigneeId'} headerName={'处理人ID'} width={100} hide />
				<AgGridColumn field={'type'} headerName={'任务类型'} width={100} cellRenderer={Status} />

				<AgGridColumn field={'assigneeName'} headerName={'处理人'} width={100} />
				<AgGridColumn field={'status'} headerName={'状态'} width={120} cellRenderer={WorkflowItemStatusRender} hide />

				<AgGridColumn field={'createTime'} headerName={'创建时间'} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'timeOutTime'} headerName={'超时时间'} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'completeTime'} headerName={'完成时间'} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'timeoutNotifyInterval'} headerName={'任务超时通知时间间隔(分钟)'} width={150} />
				<AgGridColumn field={'nextTimeoutNotifyTime'} headerName={'下次任务超时通知时间'} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastUrgingNotifyTime'} headerName={'最后催办时间'} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'urgingNotifyCount'} headerName={'催办次数'} width={150} />

				<AgGridColumn field={'action'} headerName={intl.formatMessage({ id: 'AbpUi:Actions' })} width={80} pinned={'right'} cellRenderer={Options} />
			</AgGridPlus>
		</>
	);
};

export default WorkflowItemPage;
export const routeProps = {
	name: '待办事宜',
};
