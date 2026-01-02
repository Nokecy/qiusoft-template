import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { WorkflowCategoryDelete, WorkflowCategoryGetList } from '@/services/workflow/WorkflowCategory';
import { WorkflowCategory } from '@/services/workflowPermission';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import WorkflowCategoryFormDialog from './components/workflowCategoryFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		WorkflowCategoryDelete({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={!!access[WorkflowCategory.Update]}>
				<WorkflowCategoryFormDialog
					title={'编辑流程分类'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={!!access[WorkflowCategory.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const WorkflowCategorypage: React.FC<any> = (props: any) => {
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
				headerTitle={'流程分类列表'}
				request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
					let data = await WorkflowCategoryGetList({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={gridApi => {
					return [
						<Access accessible={!!access[WorkflowCategory.Create]}>
							<WorkflowCategoryFormDialog title={'新建流程分类'} onAfterSubmit={onRefresh}>
								{'新建流程分类'}
							</WorkflowCategoryFormDialog>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'name'} headerName={intl.formatMessage({ id: 'WMS:Name' })} width={150} />
				<AgGridColumn field={'sort'} headerName={intl.formatMessage({ id: 'WMS:Sort' })} width={150} />
				<AgGridColumn field={'description'} headerName={intl.formatMessage({ id: 'WMS:Description' })} flex={1} />
				<AgGridColumn
					field={'action'}
					headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
					width={120}
					pinned={'right'}
					filter={false}
					cellRenderer={Options}
					cellRendererParams={{ onRefresh }}
				/>
			</AgGridPlus>
		</>
	);
};

export default WorkflowCategorypage;
export const routeProps = {
	name: '流程分类列表',
};
