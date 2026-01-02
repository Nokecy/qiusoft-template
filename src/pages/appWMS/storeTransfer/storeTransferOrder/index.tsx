import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { StoreTransferOrderGetListAsync } from '@/services/wms/StoreTransferOrder';
import React, { useState, useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { Allotment } from 'allotment';
import StoreTransferOrderItemGrid from './components/storeTransferOrderItemGrid';
import { StoreTransferOrderStatus } from '@/pages/appWMS/_utils';
import { OrderStatus } from '@/pages/_utils';
import FormDialog from './components/FormDialog';
import StoreTransferOrderQuickCreate from './components/quickCreate/FormDialog';
import { StoreTransferOrder } from '@/services/wmsPermission';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import OrderStatusSelect from './components/orderStatusSelect';
import StoreTransferOrderStatusSelect from './components/StoreTransferOrderStatusSelect';

const StoreTransferOrderPage = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const gridRef = useRef<GridRef>();
	const [selectedRow, setSelectedRow] = useState(undefined);
	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};
	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
					headerTitle={`${'调拨单列表'}`}
					rowSelection={'single'}
					gridKey='appWMS.storeTransfer.storeTransferOrder'
					rowMultiSelectWithClick={true}
					onRowSelected={event => {
						if (event.node.isSelected()) {
							setSelectedRow(event.data);
						}
					}}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let filter = params?.filter;
						let data = await StoreTransferOrderGetListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
					toolBarRender={gridApi => {
						return [
							<Access accessible={access[StoreTransferOrder.Create]}>
								<FormDialog title={'新建'} onAfterSubmit={onRefresh}>
									新建
								</FormDialog>
							</Access>,
							<Access accessible={access[StoreTransferOrder.Create]}>
								<StoreTransferOrderQuickCreate title={'快速创建'} onAfterSubmit={onRefresh}>
									快速创建
								</StoreTransferOrderQuickCreate>
							</Access>,
						];
					}}
				>
					<AgGridColumn field={'orderNo'} headerName={'单据号'} width={150} />
					<AgGridColumn field={'orderStatus'} headerName={'单据状态'} width={100} cellRenderer={OrderStatus} searchComponent={OrderStatusSelect} />
					<AgGridColumn
						field={'transferOrderStatus'}
						headerName={'调拨状态'}
						width={100}
						cellRenderer={StoreTransferOrderStatus}
						searchComponent={StoreTransferOrderStatusSelect}
					/>
					<AgGridColumn field={'sourceWarehouse.name'} headerName={'原库房'} width={150} />
					<AgGridColumn field={'targetWarehouse.name'} headerName={'目标库房'} width={150} />
					<AgGridColumn field={'remark'} headerName={'备注'} flex={1} />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
				</AgGridPlus>
			</Allotment.Pane>

			<Allotment.Pane snap>
				<StoreTransferOrderItemGrid data={selectedRow} />
			</Allotment.Pane>
		</Allotment>
	);
};

export default StoreTransferOrderPage;
export const routeProps = {
	name: '调拨单管理',
};