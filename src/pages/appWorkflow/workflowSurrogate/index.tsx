import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { WorkflowSurrogateDelete, WorkflowSurrogateGetList } from '@/services/workflow/WorkflowSurrogate';
import { WorkflowSurrogates } from '@/services/workflowPermission';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import FormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { onRefresh, data, api } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		WorkflowSurrogateDelete({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={!!access[WorkflowSurrogates.Update]}>
				<FormDialog
					buttonProps={{ size: 'small', type: 'link', icon: <EditOutlined style={{ fontSize: 14 }} />, title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
					entityId={data.id}
					onConfirm={refresh}
				/>
			</Access>

			<Access accessible={!!access[WorkflowSurrogates.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const WorkflowSurrogatePage = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
					let filter = params!.filter;
					let data = await WorkflowSurrogateGetList({ Filter: '', Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={api => {
					return [
						<Access accessible={!!access[WorkflowSurrogates.Create]}>
							<FormDialog onConfirm={onRefresh}>{'新增'}</FormDialog>
						</Access>,
					];
				}}
				headerTitle={'流程代理列表'}
			>
				<AgGridColumn field={'workflowDefinitionId'} headerName={'流程定义'} width={120} hide />
				<AgGridColumn field={'workflowName'} headerName={'流程定义名称'} flex={1} />
				<AgGridColumn field={'principalId'} headerName={'申请人ID'} width={150} hide />
				<AgGridColumn field={'principal'} headerName={'申请人'} />
				<AgGridColumn field={'trusteeId'} headerName={'代理人ID'} width={130} hide />
				<AgGridColumn field={'trustee'} headerName={'代理人'} width={120} />
				<AgGridColumn field={'startDate'} headerName={'开始时间'} width={120} type={'dateColumn'} />
				<AgGridColumn field={'endDate'} headerName={'结束时间'} width={120} type={'dateColumn'} />

				<AgGridColumn
					field={'action'}
					headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
					width={120}
					pinned={'right'}
					cellRenderer={Options}
					cellRendererParams={{ onRefresh }}
				/>
			</AgGridPlus>
		</>
	);
};

export default WorkflowSurrogatePage;
export const routeProps = {
	name: '流程代理列表',
};
