import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { Button, Card, message, Select, Tabs } from 'antd';
import { StockBinInfoGetListAsync, StockBinInfoPickStockBinAsync } from '@/services/wms/StockBinInfo';
import { PickByStockBin } from '@/services/wmsPermission';
import QualityStatusSelect, { QualityStatus } from '../stockBin/components/qualityStatus';
import { sumBy } from 'lodash';
import { IsOpenSelect, IsRoHS, LocationTypeSelect, IsMakeOver } from '../stockBin/components/select';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';

const PickByStockbInPage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const [data, setData] = useState([]);

	const handleDelete = (traceIds: any, api: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		StockBinInfoPickStockBinAsync(traceIds)
			.then(() => {
				onRefresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'库位列表'}
				gridKey="appWMS.stock.PickByStockBin"
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					const filter = params!.filter ? `${params!.filter},qty>0` : `qty>0`;
					let data: any = await StockBinInfoGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				rowSelection={'multiple'}
				rowMultiSelectWithClick
				pinnedBottomRowData={[
					{
						qty: sumBy(data, (x: any) => x.qty! * 1),
						preRegisteredQuantity: sumBy(data, (x: any) => x.preRegisteredQuantity! * 1),
						availableQuantity: sumBy(data, (x: any) => x.availableQuantity! * 1),
					},
				]}
				// rowMultiSelectWithClick={true}
				toolBarRender={gridApi => {
					const selectRows = gridApi?.getSelectedRows();
					const selectIds = selectRows?.map(x => x.id);
					return [
						selectRows && selectRows!.length > 0 ? (
							<Access accessible={access[PickByStockBin.Default]}>
								<DeleteConfirm title='确定下架?' onConfirm={() => handleDelete(selectIds, gridApi)}>
									<Button type={'primary'} danger title={intl.formatMessage({ id: 'AbpUi:Delete' })}>
										下架
									</Button>
								</DeleteConfirm>
							</Access>
						) : null,
					];
				}}
			>
				<AgGridColumn field={'select'} headerName={''} width={60} />
				<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100}></AgGridColumn>
				<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={150}></AgGridColumn>
				<AgGridColumn field={'warehouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={100}></AgGridColumn>
				<AgGridColumn
					field={'warehouseZoneType'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneType' })}
					width={100}
					cellRenderer={'LocationType'}
					searchComponent={LocationTypeSelect}
				></AgGridColumn>
				<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150}></AgGridColumn>
				<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150}></AgGridColumn>
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120}></AgGridColumn>
				<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120}></AgGridColumn>
				<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150}></AgGridColumn>
				<AgGridColumn field={'version'} headerName={'版本'} width={80}></AgGridColumn>
				<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={80}></AgGridColumn>
				<AgGridColumn field={'realRightCode'} headerName={'物权'} width={100}></AgGridColumn>
				<AgGridColumn field={'internalLotNumber'} headerName={intl.formatMessage({ id: 'WMS:InternalLotNumber' })} width={150}></AgGridColumn>
				<AgGridColumn field={'contractNo'} headerName={'合同号'} width={180}></AgGridColumn>
				<AgGridColumn field={'taskOrder'} headerName={'任务令'} width={180}></AgGridColumn>
				<AgGridColumn field={'businessLotNumber'} headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })} width={140}></AgGridColumn>
				<AgGridColumn field={'putDate'} headerName={intl.formatMessage({ id: 'WMS:PutDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
				<AgGridColumn field={'productionDate'} headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
				<AgGridColumn field={'dateCode'} headerName={intl.formatMessage({ id: 'WMS:DateCode' })} width={80}></AgGridColumn>
				<AgGridColumn field={'putDate'} hideInSearch headerName={'库龄(天)'} width={80} cellRenderer={'day'}></AgGridColumn>

				<AgGridColumn field={'expiryDate'} headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
				<AgGridColumn field={'expiryCount'} headerName={intl.formatMessage({ id: 'WMS:ExpiryCount' })} width={80}></AgGridColumn>
				<AgGridColumn
					field={'overdueWarningDate'}
					headerName={intl.formatMessage({ id: 'WMS:OverdueWarningDate' })}
					width={110}
					type={'dateColumn'}
					initialSort={'desc'}
				></AgGridColumn>
				<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch></AgGridColumn>
				<AgGridColumn
					field={'preRegisteredQuantity'}
					headerName={intl.formatMessage({ id: 'WMS:PreRegisteredQuantity' })}
					hideInSearch
					width={100}
					
				></AgGridColumn>
				<AgGridColumn field={'availableQuantity'} headerName={intl.formatMessage({ id: 'WMS:AvailableQuantity' })} hideInSearch width={100} ></AgGridColumn>
				<AgGridColumn field={'isOpen'} headerName={intl.formatMessage({ id: 'WMS:IsOpen' })} width={80} type={'bool'} searchComponent={IsOpenSelect}></AgGridColumn>
				<AgGridColumn field={'openTime'} headerName={intl.formatMessage({ id: 'WMS:OpenTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'}></AgGridColumn>
				<AgGridColumn
					field={'qualityStatus'}
					headerName={intl.formatMessage({ id: 'WMS:QualityStatus' })}
					width={100}
					cellRenderer={QualityStatus}
					searchComponent={QualityStatusSelect}
				></AgGridColumn>
				<AgGridColumn field={'isRoHS'} headerName={intl.formatMessage({ id: 'WMS:IsRoHS' })} width={100} type={'bool'} searchComponent={IsRoHS} />
				<AgGridColumn field={'isMakeOver'} headerName={intl.formatMessage({ id: 'WMS:IsMakeOver' })} width={100} type={'bool'} searchComponent={IsMakeOver} />
				<AgGridColumn field="creator" headerName="创建人" width={90} />
				<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
				<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
				<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
			</AgGridPlus>
		</>
	);
};

export default PickByStockbInPage;

export const routeProps = {
	name: '库位下架',
};
