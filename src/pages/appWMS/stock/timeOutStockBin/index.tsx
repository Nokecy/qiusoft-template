import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef } from 'react';
import { useAccess, useIntl, Access } from 'umi';
import ShipmentOrderProfileDrawer from '../stockBin/components/profileDrawer';
import { StockBinInfoGetTimeOutListAsync } from '@/services/wms/StockBinInfo';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DayCom from '../stockBin/components/dayCompany';
import { IsOpenSelect, IsRoHS } from '../stockBin/components/select';
import QualityStatusSelect, { QualityStatus } from '../stockBin/components/qualityStatus';
import { StockBin } from '@/services/wmsPermission';
import LPNdelay from './LPNdelay';

const TimeOutStockBin: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();


	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await StockBinInfoGetTimeOutListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });

					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				headerTitle={'库位列表'}
				rowSelection={'multiple'}
				gridKey="appWMS.stock.TimeOutStockBin"
				rowMultiSelectWithClick={true}
				toolBarRender={gridApi => {
					const selectRows = gridApi?.getSelectedRows();
					return [
						selectRows && selectRows!.length > 0 ? <Access accessible={access[StockBin.Default]}>
							<LPNdelay selectRows={selectRows} buttonProps={{}} onAfterSubmit={() => { }} >LPN批量延期</LPNdelay>
						</Access> : null,
					];
				}}
			>
				<AgGridColumn field='wareHouse.code' headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={120} cellRenderer={ShipmentOrderProfileDrawer}></AgGridColumn>
				<AgGridColumn field='wareHouse.name' headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={160}></AgGridColumn>
				<AgGridColumn field='warehouseZoneCode' headerName={intl.formatMessage({ id: 'WMS:WarehouseZoneCode' })} width={120}></AgGridColumn>
				<AgGridColumn field='wareHouseLocationCode' headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150}></AgGridColumn>
				<AgGridColumn field='traceId' headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150}></AgGridColumn>
				<AgGridColumn field='traceId' headerName={'箱号'} width={150}></AgGridColumn>
				<AgGridColumn field='materialItem.code' headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120}></AgGridColumn>
				<AgGridColumn field='materialItem.outCode' headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120}></AgGridColumn>
				<AgGridColumn field='materialItem.description' headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })} width={120}></AgGridColumn>
				<AgGridColumn field='businessLotNumber' headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })} width={120}></AgGridColumn>
				<AgGridColumn field='acProperty' headerName={intl.formatMessage({ id: 'WMS:AcProperty' })} width={120}></AgGridColumn>
				<AgGridColumn field='realRightCode' headerName={intl.formatMessage({ id: 'WMS:RealRightCode' })} width={120}></AgGridColumn>

				<AgGridColumn field='qty' headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100} hideInSearch={true}></AgGridColumn>
				<AgGridColumn field='availableQuantity' headerName={intl.formatMessage({ id: 'WMS:AvailableQuantity' })} width={100} hideInSearch={true}></AgGridColumn>
				<AgGridColumn field='putDate' headerName={intl.formatMessage({ id: 'WMS:PutDate' })} type={'dateTimeColumn'} width={180}></AgGridColumn>
				<AgGridColumn field='productionDate' headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })} type={'dateTimeColumn'} width={180}></AgGridColumn>
				{/* 入库日期 */}
				<AgGridColumn field='expiryDate' headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })} type={'dateColumn'} width={180}></AgGridColumn>
				<AgGridColumn field='putDate' hideInSearch headerName={'库龄'} width={100} cellRenderer={DayCom}></AgGridColumn>
				{/* 库龄 (按入库日期格式化) */}
				<AgGridColumn field={'isOpen'} headerName={intl.formatMessage({ id: 'WMS:IsOpen' })} width={80} type={'bool'} searchComponent={IsOpenSelect}></AgGridColumn>
				<AgGridColumn field={'qualityStatus'} headerName={intl.formatMessage({ id: 'WMS:QualityStatus' })} width={100} cellRenderer={QualityStatus} searchComponent={QualityStatusSelect}></AgGridColumn>
				<AgGridColumn field={'isRoHS'} headerName={intl.formatMessage({ id: 'WMS:IsRoHS' })} width={100} type={'bool'} searchComponent={IsRoHS} />
				<AgGridColumn field="creator" headerName="创建人" width={90} />
				<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
				<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
				<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
			</AgGridPlus>
		</>
	);
};

export default TimeOutStockBin;

export const routeProps = {
	name: '超期库存列表',
};