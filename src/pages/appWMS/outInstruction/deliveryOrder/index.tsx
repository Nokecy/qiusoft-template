import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { DeliveryOrderDeleteAsync, DeliveryOrderGetListAsync } from '@/services/wms/DeliveryOrder';
import { MaterialPickItemGetBindListAsync } from '@/services/wms/MaterialPickItem';
import { DeliveryOrder } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl, useNavigate, history, closeTab, dropByCacheKey } from 'umi';
import deliveryOrderQuery from './components/deliveryOrderQuery';
import ExportButton from './components/exportButton';
import DeleteConfirm from "@/components/deleteConfirm";
import { deliveryOrderStatusEnum, DeliveryOrderStatusSelect, pickSourceTypeEnum } from '@/pages/appWMS/_utils';
const Options = (props: any) => {
	const { data, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = onRefresh;

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		DeliveryOrderDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[DeliveryOrder.Delete]}>
				<Button
					size={'small'}
					icon={<EditOutlined />}
					type={'link'}
					title={intl.formatMessage({ id: 'AbpUi:Edit' })}
					onClick={() => {
						dropByCacheKey(window.location.pathname)
						closeTab(`/appWMS/outInstruction/deliveryOrder/form`);
						history.push(`/appWMS/outInstruction/deliveryOrder/form?id=${data.id}`);
					}}
				/>
			</Access>
			{/* ↑↑的按钮没有编辑api暂时先写这样,目前只有显示没有功能 */}
			<Access accessible={access[DeliveryOrder.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const DeliveryOrderPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const [asnOrderNo, setAsnOrderNo] = useState<any>();
	const navigate = useNavigate();
	const Select = deliveryOrderQuery;
	const gridRef = useRef<GridRef>();
	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<div style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column' }}>
			<div style={{ flex: 1 }}>
				<AgGridPlus
					gridRef={gridRef}
					toolBarRender={gridApi => {
						const selectedRows = gridApi?.getSelectedRows();
						const isSelected = selectedRows && selectedRows?.length > 0 ? true : false;
						return [
							<Access accessible={access[DeliveryOrder.Create]}>
								<Button
									type={'primary'}
									icon={<PlusOutlined />}
									onClick={() => {
										navigate({ pathname: '/appWMS/outInstruction/deliveryOrder/form' });
									}}
								>
									新增送货单
								</Button>
							</Access>,

							<Access accessible={access[DeliveryOrder.CreateByTraceId]}>
								<Button
									type={'primary'}
									icon={<PlusOutlined />}
									onClick={() => {
										navigate({ pathname: '/appWMS/outInstruction/deliveryOrder/createByTraceId' });
									}}
								>
									LPN送货
								</Button>
							</Access>,

							<Access accessible={isSelected && access[DeliveryOrder.Create]}>
								<ExportButton deliveryOrderNo={selectedRows && selectedRows!.length > 0 ? selectedRows![0].orderNo : undefined} />
							</Access>,
						];
					}}
					headerTitle={'送货单列表'}
					rowSelection={'single'}
					gridKey='appWMS.outInstruction.deliveryOrder'
					onRowSelected={e => {
						if (e.node.isSelected()) {
							setAsnOrderNo(e.data.asnOrderNo);
						} else if (e.data.asnOrderNo === asnOrderNo) {
							setAsnOrderNo(undefined);
						}
					}}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let data = await DeliveryOrderGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
				>
					<AgGridColumn field='orderNo' headerName={intl.formatMessage({ id: 'WMS:OrderNo' })} width={150}></AgGridColumn>
					<AgGridColumn field='asnOrderNo' headerName={intl.formatMessage({ id: 'WMS:AsnOrderNo' })} width={150}></AgGridColumn>
					<AgGridColumn field='orderStatus' headerName={intl.formatMessage({ id: 'WMS:OrderStatus' })} width={100} valueEnum={deliveryOrderStatusEnum} searchComponent={DeliveryOrderStatusSelect}></AgGridColumn>
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} hideInTable width={120} />
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} hideInTable width={160} />
					<AgGridColumn field={'wareHouseCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} hideInSearch width={120} />
					<AgGridColumn field={'wareHouseName'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} hideInSearch width={160} />
					<AgGridColumn field={'consignee.Id'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeId' })} width={120} hide />
					<AgGridColumn field={'consignee.name'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeName' })} width={120} />
					<AgGridColumn field={'consignee.contact'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeContact' })} width={150} />
					<AgGridColumn field={'consignee.tel'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeTel' })} width={120} />
					<AgGridColumn field={'consignee.address'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeAddress' })} width={120} />

					<AgGridColumn field='remark' headerName={intl.formatMessage({ id: 'WMS:Remark' })} width={100}></AgGridColumn>

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />

					<AgGridColumn field={'action'} headerName={intl.formatMessage({ id: 'AbpUi:Actions' })} width={120} pinned={'right'} filter={false} sortable={false} cellRenderer={Options} cellRendererParams={{ onRefresh }} />
				</AgGridPlus>
			</div>

			<div style={{ flex: 1 }}>
				<AgGridPlus
					headerTitle={'送货LPN记录'}
					params={{ asnOrderNo: asnOrderNo }}
					gridKey='appWMS.outInstruction.deliveryOrder.pickItem'
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						if (params?.asnOrderNo) {
							let data = await MaterialPickItemGetBindListAsync({ asnOrderNo: params?.asnOrderNo });
							let requestData: any = { success: true, data: data.items!, total: data.totalCount };
							return requestData;
						}
						return { success: true, data: [], total: 0 };
					}}
					search={false}
					toolBarRender={() => {
						return [];
					}}
				>
					<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={150} />
					<AgGridColumn field={'sourceType'} headerName={intl.formatMessage({ id: 'WMS:SourceType' })} width={120} valueEnum={pickSourceTypeEnum} />
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} hideInTable width={120} />
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} hideInTable width={160} />
					<AgGridColumn field={'wareHouseCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} hideInSearch width={120} />
					<AgGridColumn field={'wareHouseName'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} hideInSearch width={160} />
					<AgGridColumn field={'wareHouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={120} />
					<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150} />
					<AgGridColumn field={'material.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} />
					<AgGridColumn field={'materialOutCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120} />
					<AgGridColumn field={'material.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })} width={150} />
					<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceID' })} width={140} />
					<AgGridColumn field={'newTraceID'} headerName={intl.formatMessage({ id: 'WMS:NewTraceID' })} width={150} />
					<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100} hideInSearch />
					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={160} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={110} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={110} />
				</AgGridPlus>
			</div>
		</div>
	);
};

export default DeliveryOrderPage;

export const routeProps = {
	name: '送货单',
};