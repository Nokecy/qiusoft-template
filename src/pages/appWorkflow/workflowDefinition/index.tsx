import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList, ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteDelete } from '@/services/workflow/WorkflowDefinitions';
import { WorkflowDefinitions } from '@/services/workflowPermission';
import { DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, history, useAccess, useIntl } from 'umi';
import WorkflowDefinitionFormDialog from './components/workflowDefinitionFormDialog';
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
		ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteDelete({ definitionId: id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={!!access[WorkflowDefinitions.Update]}>
				<Button
					icon={<DragOutlined />}
					type={'link'}
					title={'编辑'}
					onClick={() => {
						history.push({ pathname: `/appWorkflow/workflowDefinition/designer`, search: `?definitionId=${data.definitionId}` });
					}}
				/>
			</Access>

			<Access accessible={!!access[WorkflowDefinitions.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.definitionId)}>
					<Button icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const WorkflowDefinitionPage = (props: any) => {
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
					let page = params!.skipCount === 0 ? 0 : params!.skipCount / params!.maxResultCount;
					let data = await ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList({
						OrderBy: params?.sort,
						Page: page,
						VersionOptions: "Latest",
						PageSize: params!.maxResultCount,
						SearchTerm: params?.SearchTerm,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={api => {
					return [
						<Access accessible={!!access[WorkflowDefinitions.Create]}>
							<WorkflowDefinitionFormDialog onAfterSubmit={onRefresh}>新建</WorkflowDefinitionFormDialog>
						</Access>,
					];
				}}
				headerTitle={'流程定义列表'}
			>
				<AgGridColumn field={'definitionId'} headerName={'定义标识'} width={120} hide />
				<AgGridColumn field={'name'} headerName={'名称'} flex={1} />
				<AgGridColumn field={'description'} headerName={'描述'} width={200} />
				<AgGridColumn field={'version'} headerName={'版本'} width={100} />
				<AgGridColumn field={'isPublished'} headerName={'发布'} width={60} type={'bool'} />
				<AgGridColumn field={'isLatest'} headerName={'最后版本'} width={100} type={'bool'} />

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

export default WorkflowDefinitionPage;
export const routeProps = {
	name: '流程定义列表',
};
