import { AgGridPlus } from '@/components/agGrid';
import {
	ProcessProcedureCategoryGetListAsync,
	ProcessProcedureCategoryDeleteAsync,
} from '@/services/pdm/ProcessProcedureCategory';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import ProcessProcedureCategoryFormDialog from './components/ProcessProcedureCategoryFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProcessProcedureCategoryPermissions } from '@/pages/appPdm/_permissions';
import dayjs from 'dayjs';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
	const { data, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const canUpdate = !!(access && access[ProcessProcedureCategoryPermissions.Update]);
	const canDelete = !!(access && access[ProcessProcedureCategoryPermissions.Delete]);

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return ProcessProcedureCategoryDeleteAsync({ id })
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
				<ProcessProcedureCategoryFormDialog
					title={'编辑工序分类'}
					entityId={data.id}
					onAfterSubmit={onRefresh}
					buttonProps={{
						icon: <EditOutlined />,
						type: 'link',
						size: 'small',
						title: intl.formatMessage({ id: 'AbpUi:Edit' }),
					}}
				>{''}</ProcessProcedureCategoryFormDialog>
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

const ProcessProcedureCategoryPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const canCreate = !!(access && access[ProcessProcedureCategoryPermissions.Create]);

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	// 列定义
	const columnDefs: any = useMemo(
		() => [
			{
				field: 'code',
				headerName: '工序分类编码',
				width: 180,
			},
			{
				field: 'name',
				headerName: '工序分类名称',
				width: 200,
			},
			{
				field: 'memo',
				headerName: '备注',
				width: 300,
				hideInSearch: true,
				flex: 1,
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
			headerTitle={'工序分类'}
			gridKey="appPdm.ProcessManagement.ProcessProcedureCategory"
			request={async (params: any) => {
				const data = await ProcessProcedureCategoryGetListAsync({
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
					<ProcessProcedureCategoryFormDialog
						title={'新建工序分类'}
						onAfterSubmit={onRefresh}
						buttonProps={{ icon: <PlusOutlined />, type: 'primary' }}
					>
						新建
					</ProcessProcedureCategoryFormDialog>
				</Access>,
			]}
		/>
	);
};

export default ProcessProcedureCategoryPage;

export const routeProps = {
	name: '工序分类管理',
};
