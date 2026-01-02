import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { LotAttrGroupDeleteAsync, LotAttrGroupGetListAsync } from '@/services/wms/LotAttrGroup';
import { LotAttrItemGroup } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message,   Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import DeleteConfirm from "@/components/deleteConfirm";
import LotAttrGroupFormDialog from './components/formDialog';
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return LotAttrGroupDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[LotAttrItemGroup.Update]}>
				<LotAttrGroupFormDialog
					title={'编辑物料'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={access[LotAttrItemGroup.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const LotAttrGroupPage = (props: any) => {
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
				headerTitle={'批次属性组列表'}
				gridKey='appWMS.baseInfo.lotAttrGroup'
				request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
					let data = await LotAttrGroupGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={gridApi => {
					return [
						<Access accessible={access[LotAttrItemGroup.Create]}>
							<LotAttrGroupFormDialog title={'新增组'} onAfterSubmit={onRefresh}>
								新增组
							</LotAttrGroupFormDialog>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'name'} headerName={intl.formatMessage({ id: 'WMS:Name' })} width={120} />
				<AgGridColumn field={'isDefault'} headerName={intl.formatMessage({ id: 'WMS:IsDefault' })} width={120} type={'bool'} />
				<AgGridColumn field={'description'} headerName={intl.formatMessage({ id: 'WMS:Description' })} flex={1} />

				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />

				<AgGridColumn field={'action'} headerName={intl.formatMessage({ id: 'AbpUi:Actions' })} width={120} pinned={'right'} filter={false} sortable={false} cellRenderer={Options} cellRendererParams={{ onRefresh }} />
			</AgGridPlus>
		</>
	);
};

export default LotAttrGroupPage;

export const routeProps = {
	name: '批次属性组',
};