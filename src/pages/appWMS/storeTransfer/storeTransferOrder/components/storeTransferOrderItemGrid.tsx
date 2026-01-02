import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { StoreTransferOrderItemGetListAsync } from '@/services/wms/StoreTransferOrderItem';
import { StoreTransferTaskItemGetListAsync, StoreTransferTaskItemPutAsync } from '@/services/wms/StoreTransferTaskItem';
import { Button, Tabs } from 'antd';
import React, { useRef } from 'react';
import { useAccess, useIntl, Access } from 'umi';
import FormDialog from './pickLPN';
import { StoreTransferOrder } from '@/services/wmsPermission';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';

const StoreTransferOrderItemGrid = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const { data } = props;
	const gridRef = useRef<GridRef>();
	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const taskGridRef = useRef<GridRef>();
	const onTaskRefresh = () => {
		gridRef.current?.onRefresh();
	};
	return (
		<Tabs
			defaultActiveKey='1'
			style={{
				height: '100%',
				backgroundColor: '#fff',
				paddingLeft: 10,
				paddingRight: 10,
				marginTop: 10,
			}}
		>
			<Tabs.TabPane tab='调拨明细列表' key='1' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					search={false}
					gridRef={gridRef}
					gridKey='appWMS.storeTransfer.storeTransferOrder.storeTransferOrderItemGrid.item'
					params={{ orderId: data?.id }}
					rowSelection={'single'}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						if (!params?.orderId) return { success: true, data: [], total: 0 };
						let filter = params?.orderId ? `storeTransferOrderId = ${params?.orderId}` : ``;
						let asnBox = await StoreTransferOrderItemGetListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: asnBox.items!, total: asnBox.totalCount };
						return requestData;
					}}
					toolBarRender={gridApi => {
						const selectRows: any = gridApi?.getSelectedRows();
						return [
							selectRows?.length === 1 && (
								<Access accessible={access[StoreTransferOrder.Create]}>
									<FormDialog picktask={{ ...selectRows[0], wareHouseId: data?.sourceWarehouseId }} title={'分配LPN'} onAfterSubmit={onRefresh}>
										分配LPN
									</FormDialog>
								</Access>
							),
						];
					}}
				>
					<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={180} />
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
					<AgGridColumn field={'materialItem.descript'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={120} />
					<AgGridColumn field={'quantity'} headerName={'调拨数量'} width={120} hideInSearch={true} />
					<AgGridColumn field={'pickQuantity'} headerName={'下架数量'} width={120} hideInSearch={true} />
					<AgGridColumn field={'putQuantity'} headerName={'上架数量'} width={120} hideInSearch={true} />
					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={100} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={100} />
				</AgGridPlus>
			</Tabs.TabPane>

			<Tabs.TabPane tab='调拨任务列表' key='2' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					gridRef={taskGridRef}
					search={false}
					gridKey='appWMS.storeTransfer.storeTransferOrder.storeTransferOrderItemGrid.tsak'
					rowSelection={'single'}
					params={{ orderNo: data?.orderNo }}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let filter = params?.orderNo ? `StoreTransferOrderNo = ${params?.orderNo}` : undefined;
						let asnBox = await StoreTransferTaskItemGetListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: asnBox.items!, total: asnBox.totalCount };
						return requestData;
					}}
					toolBarRender={gridApi => {
						const selectRows: any = gridApi?.getSelectedRows();
						return [
							<Access accessible={access[StoreTransferOrder.Default]}>
								<Button
									title={'手动分配'}
									onClick={() => {
										StoreTransferTaskItemPutAsync({
											traceId: selectRows[0].traceId,
											localtionCode: selectRows[0].localtionCode,
										}).then(res => {
											onTaskRefresh();
										});
									}}
								>
									手动下架
								</Button>
							</Access>,
						];
					}}
				>
					<AgGridColumn field={'storeTransferOrderNo'} headerName={'调拨单号'} width={180} />
					<AgGridColumn field={'materialItem.code'} headerName={"物料编码"} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={"物料外码"} width={120} />
					<AgGridColumn field={'sourceWarehouseLocationCode'} headerName={'库位'} width={200} />
					<AgGridColumn field={'sourceTraceId'} headerName={'载具(LPN)'} width={200} />
					<AgGridColumn field={'quantity'} headerName={'调拨数量'} width={120} hideInSearch={true} />
					<AgGridColumn field={'pickQuantity'} headerName={'下架数量'} width={120} hideInSearch={true} />
					<AgGridColumn field={'putQuantity'} headerName={'上架数量'} width={120} hideInSearch={true} />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
				</AgGridPlus>
			</Tabs.TabPane>
		</Tabs>
	);
};

export default StoreTransferOrderItemGrid;
