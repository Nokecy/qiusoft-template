import { LocationType, PickType } from '@/pages/appWMS/baseInfo/_utils';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
// import {
// 	StockBinBoxInfoGetBoxTypeByTraceListAsync,
// 	StockBinBoxInfoGetListAsync,
// } from '@/services/wms/StockBinBoxInfo';
import React, { useEffect, useState } from 'react';
import { useIntl, useAccess } from 'umi';
import { sumBy } from 'lodash';
import { IsOpenSelect, LocationTypeSelect } from './select';
// import { StockBinSNInfoGetListAsync } from '@/services/wms/StockBinSNInfo';
import { PickTaskItemGetListAsync } from '@/services/wms/PickTaskItem';
import { PreRegisteredModel } from '@/pages/appWMS/outInstruction/_utils/preRegisteredModel';
import { PickStatus } from '@/pages/appWMS/outInstruction/_utils';
import { StockBinBoxInfoGetBoxTypeByTraceListAsync, StockBinBoxInfoGetListAsync } from '@/services/wms/StockBinBoxInfo';
import { StockBinSnInfoGetListAsync } from '@/services/wms/StockBinSnInfo';

const StockBinBoxinfoPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState();

	return (
		<>
			<AgGridPlus
				params={{ traceId: props?.data?.traceId }}
				gridKey='appWMS.stock.stockBin.Boxinfo'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let filter = `parentTraceId = ${params?.traceId}`;

					let data: any = await StockBinBoxInfoGetListAsync({
						Filter: filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				
				search={false}
				pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
				headerTitle={'载具下层箱列表'}
				toolBarRender={gridApi => {
					return [];
				}}
			>
				<AgGridColumn
					field={'wareHouse.code'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })}
					width={120}
					hideInSearch={true}
					pinned
					hide
				></AgGridColumn>
				<AgGridColumn
					field={'wareHouse.name'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })}
					width={220}
					hideInSearch={true}
					pinned
				></AgGridColumn>
				<AgGridColumn
					field={'warehouseZoneCode'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })}
					width={120}
					hideInSearch={true}
					pinned
				></AgGridColumn>
				<AgGridColumn
					field={'warehouseZoneType'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneType' })}
					width={120}
					hideInSearch={true}
					pinned
					cellRenderer={LocationType}
					searchComponent={LocationTypeSelect}
				></AgGridColumn>
				<AgGridColumn
					field={'wareHouseLocationCode'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })}
					hideInSearch={true}
					width={150}
					pinned
				></AgGridColumn>
				<AgGridColumn
					field={'parentTraceId'}
					headerName={intl.formatMessage({ id: 'WMS:ParentTraceId' })}
					hideInSearch={true}
					width={140}
				></AgGridColumn>
				<AgGridColumn
					field={'contractNo'}
					headerName={'合同号'}
					width={180}
					hideInSearch={true}
				></AgGridColumn>
				<AgGridColumn
					field={'taskOrder'}
					headerName={'任务令'}
					width={180}
					hideInSearch={true}
				></AgGridColumn>
				<AgGridColumn
					field={'boxNumber'}
					headerName={intl.formatMessage({ id: 'WMS:BoxNumber' })}
					hideInSearch={true}
					width={150}
				></AgGridColumn>
				<AgGridColumn
					field={'materialItem.code'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })}
					hideInSearch={true}
					width={120}
					pinned
				></AgGridColumn>
				<AgGridColumn
					field={'materialItem.outCode'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })}
					hideInSearch={true}
					width={120}
				></AgGridColumn>
				<AgGridColumn
					field={'materialItem.description'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })}
					hideInSearch={true}
					width={120}
				></AgGridColumn>
				<AgGridColumn
					field={'internalLotNumber'}
					headerName={intl.formatMessage({ id: 'WMS:InternalLotNumber' })}
					hideInSearch={true}
					width={100}
				></AgGridColumn>
				<AgGridColumn
					field={'businessLotNumber'}
					headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })}
					hideInSearch={true}
					width={150}
				></AgGridColumn>
				<AgGridColumn
					field={'putDate'}
					headerName={intl.formatMessage({ id: 'WMS:PutDate' })}
					hideInSearch={true}
					width={120}
					type={'dateColumn'}
				></AgGridColumn>
				<AgGridColumn
					field={'productionDate'}
					headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })}
					hideInSearch={true}
					width={120}
					type={'dateColumn'}
				></AgGridColumn>
				<AgGridColumn
					field={'expiryDate'}
					headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })}
					hideInSearch={true}
					width={120}
					type={'dateColumn'}
				></AgGridColumn>
				<AgGridColumn
					field={'qty'}
					headerName={intl.formatMessage({ id: 'WMS:Qty' })}
					width={100}

					hideInSearch={true}
				></AgGridColumn>
				<AgGridColumn
					field={'isOpen'}
					headerName={intl.formatMessage({ id: 'WMS:IsOpen' })}
					hideInSearch={true}
					width={120}
					type={'bool'}
					searchComponent={IsOpenSelect}
				></AgGridColumn>
				<AgGridColumn
					field={'takeBox'}
					headerName={intl.formatMessage({ id: 'WMS:TakeBox' })}
					hideInSearch={true}
					width={220}
					type={'bool'}
					searchComponent={IsOpenSelect}
				></AgGridColumn>
				<AgGridColumn
					field={'openTime'}
					headerName={intl.formatMessage({ id: 'WMS:OpenTime' })}
					hideInSearch={true}
					width={220}
					type={'dateTimeColumn'}
				></AgGridColumn>
				<AgGridColumn field="creator" headerName="创建人" width={90} />
				<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
				<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
				<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
			</AgGridPlus>
		</>
	);
};

const StockBinBoxTypePage: React.FC<any> = (props: any) => {
	const intl = useIntl();

	return (
		<>
			<AgGridPlus
				
				search={false}
				params={{ traceId: props?.data?.traceId }}
				gridKey='appWMS.stock.stockBin.BoxType'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let filter = `parentTraceId = ${params?.traceId}`;
					let data = await StockBinBoxInfoGetBoxTypeByTraceListAsync({
						Filter: filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data, total: data.length };
					return requestData;
				}}
				headerTitle={'LPN箱包规列表'}
				toolBarRender={gridApi => {
					return [];
				}}
			>
				<AgGridColumn
					field={'traceId'}
					headerName={intl.formatMessage({ id: 'WMS:TraceId' })}
					width={180}
					hideInSearch={true}
					queryField={'parentTraceId'}
				></AgGridColumn>
				<AgGridColumn
					field={'materialCode'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })}
					width={100}
					hideInSearch={true}
					queryField={'materialItem.code'}
				></AgGridColumn>
				<AgGridColumn
					field={'materialOutCode'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })}
					width={100}
					hideInSearch={true}
					queryField={'materialItem.outCode'}
				></AgGridColumn>
				<AgGridColumn
					field={'contractNo'}
					headerName={'合同号'}
					width={150}
					hideInSearch={true}
				></AgGridColumn>
				<AgGridColumn
					field={'taskOrder'}
					headerName={'任务令'}
					width={150}
					hideInSearch={true}
				></AgGridColumn>
				<AgGridColumn
					field={'boxType'}
					headerName={'包规'}
					width={100}
					hideInSearch={true}

				></AgGridColumn>
				<AgGridColumn
					field={'quantity'}
					headerName={'箱数'}
					width={100}
					hideInSearch={true}
				></AgGridColumn>
				<AgGridColumn
					field={'test'}
					headerName={''}
					flex={1}
					hideInSearch={true}

				></AgGridColumn>
			</AgGridPlus>
		</>
	);
};

const StockBinSNInfoPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState([]);

	return (
		<>
			<AgGridPlus
				
				search={false}
				params={{ traceId: props?.data?.traceId }}
				gridKey='appWMS.stock.stockBin.SNInfo'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let filter = `parentTraceId = ${params?.traceId}`;
					let data: any = await StockBinSnInfoGetListAsync({
						Filter: filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				pinnedBottomRowData={[{ qty: '总计：' + sumBy(data, (x: any) => x.qty! * 1) }]}
				headerTitle={'LPN SN列表'}
			>
				<AgGridColumn
					field={'warehouse.code'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })}
					hideInSearch={true}
					width={120}
					pinned
					hide
				></AgGridColumn>
				<AgGridColumn
					field={'warehouseZoneCode'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })}
					hideInSearch={true}
					width={120}
				></AgGridColumn>
				<AgGridColumn
					field={'warehouseZoneType'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneType' })}
					hideInSearch={true}
					width={120}
					cellRenderer={LocationType}
				></AgGridColumn>
				<AgGridColumn
					field={'warehouseLocation.type'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationType' })}
					hideInSearch={true}
					width={120}
					cellRenderer={LocationType}
				></AgGridColumn>
				<AgGridColumn
					field={'wareHouseLocationCode'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })}
					hideInSearch={true}
					width={150}
				></AgGridColumn>
				<AgGridColumn
					field={'warehouseLocation.name'}
					headerName={intl.formatMessage({ id: 'WMS:WarehouseLocationName' })}
					hideInSearch={true}
					width={150}
					hide
				></AgGridColumn>
				<AgGridColumn
					field={'serialNumber'}
					headerName={intl.formatMessage({ id: 'WMS:SerialNumber' })}
					width={150}
					hideInSearch={true}
					initialSort={'desc'}
				></AgGridColumn>
				<AgGridColumn
					field={'boxNumber'}
					headerName={intl.formatMessage({ id: 'WMS:BoxNumber' })}
					hideInSearch={true}
					width={150}
				></AgGridColumn>
				<AgGridColumn
					field={'lotNumber'}
					headerName={intl.formatMessage({ id: 'WMS:LotNumber' })}
					hideInSearch={true}
					width={150}
				></AgGridColumn>
				<AgGridColumn
					field={'parentTraceId'}
					headerName={intl.formatMessage({ id: 'WMS:ParentTraceId' })}
					hideInSearch={true}
					width={130}
				></AgGridColumn>
				<AgGridColumn
					field={'businessLotNumber'}
					headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })}
					hideInSearch={true}
					width={140}
				></AgGridColumn>
				<AgGridColumn
					field={'putDate'}
					headerName={intl.formatMessage({ id: 'WMS:PutDate' })}
					width={120}
					hideInSearch={true}
					type={'dateColumn'}
				></AgGridColumn>
				<AgGridColumn
					field={'productionDate'}
					headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })}
					hideInSearch={true}
					width={120}
					type={'dateColumn'}
				></AgGridColumn>
				<AgGridColumn
					field={'expiryDate'}
					headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })}
					hideInSearch={true}
					width={120}
					type={'dateColumn'}
				></AgGridColumn>
				<AgGridColumn
					field={'qty'}
					headerName={intl.formatMessage({ id: 'WMS:Qty' })}
					width={100}

					hideInSearch={true}
				></AgGridColumn>
				<AgGridColumn field="creator" headerName="创建人" width={90} />
				<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
				<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
				<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
			</AgGridPlus>
		</>
	);
};

const PickTaskItemPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<>
			<AgGridPlus
				initParams={{
					pickItemStatus: 10,
				}}
				
				search={false}
				gridKey='appWMS.stock.stockBin.TaskItem'
				style={{ minHeight: 300 }}
				headerTitle={'已预占任务'}
				rowSelection={'multiple'}
				params={{ traceId: props?.data?.traceId }}
				pageSizeOptions={[10, 20, 50, 100, 200, 500, 1000, 10000]}
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let filter = `pickItemStatus = 10,traceId  =* ${params?.traceId}`;
					let data: any = await PickTaskItemGetListAsync({
						Filter: filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					// setData(data.items)
					return requestData;
				}}
			>
				<AgGridColumn
					field={'shipmentOrderNo'}
					headerName={intl.formatMessage({ id: 'WMS:ShipmentOrderNo' })}
					width={120}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'sourceOrderNo'}
					headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })}
					width={100}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'taskOrder'}
					headerName={intl.formatMessage({ id: 'WMS:TaskOrder' })}
					width={80}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'wareHouse.code'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })}
					width={80}
					initialHide
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'wareHouseName'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })}
					width={80}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'wareHouseZoneCode'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })}
					width={70}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'wareHouseLocationCode'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })}
					width={70}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'traceId'}
					headerName={intl.formatMessage({ id: 'WMS:TraceId' })}
					width={70}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'pickItemStatus'}
					headerName={intl.formatMessage({ id: 'WMS:PickItemStatus' })}
					width={80}
					cellRenderer={PickStatus}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'pickType'}
					headerName={intl.formatMessage({ id: 'WMS:PickType' })}
					width={80}
					cellRenderer={PickType}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'preRegisteredModel'}
					headerName={intl.formatMessage({ id: 'WMS:PreRegisteredModel' })}
					width={90}
					cellRenderer={PreRegisteredModel}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'materialItem.code'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })}
					width={80}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'materialItem.outCode'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })}
					width={90}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'materialItem.description'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })}
					width={100}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'wareHouseTeam.name'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseTeamName' })}
					width={70}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'assigneeName'}
					headerName={intl.formatMessage({ id: 'WMS:AssigneeName' })}
					width={70}
					hideInSearch={true}
					filter={false}
					sortable={false}
				/>
				<AgGridColumn
					field={'deliveryObject'}
					headerName={intl.formatMessage({ id: 'WMS:DeliveryObject' })}
					width={80}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'deliveryAddress'}
					headerName={intl.formatMessage({ id: 'WMS:DeliveryAddress' })}
					width={80}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'qty'}
					headerName={intl.formatMessage({ id: 'WMS:Qty' })}
					width={80}
					hideInSearch={true}

				/>
				<AgGridColumn
					field={'needStartTime'}
					headerName={intl.formatMessage({ id: 'WMS:NeedStartTime' })}
					width={140}
					type={'dateTimeColumn'}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'actualStartTime'}
					headerName={intl.formatMessage({ id: 'WMS:ActualStartTime' })}
					width={140}
					type={'dateTimeColumn'}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'finishTime'}
					headerName={intl.formatMessage({ id: 'WMS:FinishTime' })}
					width={140}
					type={'dateTimeColumn'}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'remark'}
					headerName={intl.formatMessage({ id: 'WMS:Remark' })}
					width={100}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'creationTime'}
					headerName={intl.formatMessage({ id: 'WMS:CreationTime' })}
					width={140}
					type={'dateTimeColumn'}
					initialSort={'desc'}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'lastModificationTime'}
					headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })}
					width={170}
					type={'dateTimeColumn'}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'creator'}
					headerName={intl.formatMessage({ id: 'WMS:Creator' })}
					width={80}
					hideInSearch={true}
				/>
				<AgGridColumn
					field={'lastModifier'}
					headerName={intl.formatMessage({ id: 'WMS:LastModifier' })}
					width={80}
					hideInSearch={true}
				/>
				<AgGridColumn field="creator" headerName="创建人" width={90} />
				<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
				<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
				<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
			</AgGridPlus>
		</>
	);
};

export default StockBinBoxinfoPage;
export { StockBinBoxTypePage, StockBinSNInfoPage, PickTaskItemPage };
