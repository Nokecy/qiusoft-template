import { AgGridPlus } from '@/components/agGrid';
import { ProcessProcedureGetListAsync, ProcessProcedureDeleteAsync } from '@/services/pdm/ProcessProcedure';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import ProcessProcedureFormDialog from './components/ProcessProcedureFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProcessProcedurePermissions } from '@/pages/appPdm/_permissions';
import dayjs from 'dayjs';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
	const { data, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const canUpdate = !!(access && access[ProcessProcedurePermissions.Update]);
	const canDelete = !!(access && access[ProcessProcedurePermissions.Delete]);

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return ProcessProcedureDeleteAsync({ id })
			.then(() => {
				message.success('删除成功');
				onRefresh();
			})
			.catch((error) => {
				message.error('删除失败');
				console.error(error);
			})
			.finally(() => hide());
	};

	return (
		<Space>
			<Access accessible={!!canUpdate}>
				<ProcessProcedureFormDialog
					title={'编辑工序'}
					entityId={data.id}
					onAfterSubmit={onRefresh}
					buttonProps={{
						icon: <EditOutlined />,
						type: 'link',
						size: 'small',
						title: intl.formatMessage({ id: 'AbpUi:Edit' }),
					}}
				>{''}</ProcessProcedureFormDialog>
			</Access>

			<Access accessible={!!canDelete}>
				<DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
					<Button
						size={'small'}
						icon={<DeleteOutlined />}
						type={'link'}
						title={intl.formatMessage({ id: 'AbpUi:Delete' })}
					/>
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const ProcessProcedurePage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const canCreate = !!(access && access[ProcessProcedurePermissions.Create]);

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	// 列定义
	const columnDefs: any = useMemo(
		() => [
			{
				field: 'code',
				headerName: '工序编码',
				width: 150,
			},
			{
				field: 'name',
				headerName: '工序名称',
				width: 200,
			},
			{
				field: 'processProcedureCategoryCode',
				headerName: '工序分类编码',
				width: 150,
			},
			{
				field: 'processProcedureCategoryName',
				headerName: '工序分类名称',
				width: 150,
			},
			{
				field: 'workCenterCode',
				headerName: '工作中心编码',
				width: 150,
			},
			{
				field: 'workCenterName',
				headerName: '工作中心名称',
				width: 150,
			},
			{
				field: 'isOutsourced',
				headerName: '是否委外',
				width: 100,
				hideInSearch: true,
			},
			{
				field: 'actionType',
				headerName: '动作类型',
				width: 120,
				hideInSearch: true,
			},
			{
				field: 'isInboundProcess',
				headerName: '是否入库工序',
				width: 120,
				hideInSearch: true,
				cellRenderer: ({ value }: any) => (value ? '是' : '否'),
			},
			{
				field: 'isNeedRawMaterial',
				headerName: '是否需要原材料',
				width: 140,
				hideInSearch: true,
				cellRenderer: ({ value }: any) => (value ? '是' : '否'),
			},
			{
				field: 'fixPassCount',
				headerName: '固定合格数量',
				width: 120,
				hideInSearch: true,
			},
			{
				field: 'failScrapCount',
				headerName: '失败报废数量',
				width: 120,
				hideInSearch: true,
			},
			{
				field: 'memo',
				headerName: '备注',
				width: 200,
				hideInSearch: true,
			},
			{
				field: 'creationTime',
				headerName: '创建时间',
				width: 160,
				hideInSearch: true,
				initialSort: 'desc',
				cellRenderer: ({ value }: any) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'),
			},
			{
				field: 'lastModificationTime',
				headerName: '最后修改时间',
				width: 160,
				hideInSearch: true,
				cellRenderer: ({ value }: any) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'),
			},
			{
				field: 'action',
				headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
				width: 120,
				pinned: 'right',
				filter: false,
				sortable: false,
				cellRenderer: Options,
				cellRendererParams: { onRefresh },
			},
		],
		[intl, onRefresh]
	);

	return (
		<AgGridPlus
			gridRef={gridRef}
			headerTitle={'工序信息'}
			gridKey="appPdm.ProcessManagement.ProcessProcedure"
			request={async (params: any) => {
				const data = await ProcessProcedureGetListAsync({
					Filter: params?.filter,
					MaxResultCount: params!.maxResultCount,
					SkipCount: params!.skipCount,
					Sorting: params!.sorter!,
				});
				return {
					success: true,
					data: data.items || [],
					total: data.totalCount || 0,
				};
			}}
			rowSelection={'multiple'}
			rowMultiSelectWithClick={true}
			columnDefs={columnDefs}
			toolBarRender={() => [
				<Access key="create" accessible={!!canCreate}>
					<ProcessProcedureFormDialog
						title={'新建工序'}
						onAfterSubmit={onRefresh}
						buttonProps={{ icon: <PlusOutlined />, type: 'primary' }}
					>
						新建
					</ProcessProcedureFormDialog>
				</Access>,
			]}
		/>
	);
};

export default ProcessProcedurePage;

export const routeProps = {
	name: '工序信息管理',
};
