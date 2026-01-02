import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { MaterialPickItemGetListAsync } from '@/services/wms/MaterialPickItem';
import { sumBy } from 'lodash';
import React, { useRef, useState } from 'react';
import { useAccess, useIntl } from 'umi';
import { OrderType } from '../../outInstruction/_utils/shipmentOrderTypeSelect';

const MaterialPickPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState([]);

	return (
		<>
			<AgGridPlus
				headerTitle={'物料下架记录'}
				gridKey='appWMS.storeQuery.materialPicking'
				request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
					let data: any = await MaterialPickItemGetListAsync({
						Filter: params?.filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
				toolBarRender={() => {
					return [];
				}}
			>
				<AgGridColumn field={'outInstructionOrderNo'} headerName='出库指令单号' width={150} />
				<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={150} />
				<AgGridColumn field={'deliveryOrderNo'} headerName={'送货单号'} width={150} />
				<AgGridColumn field={'asnOrderNo'} headerName={'预约单号'} width={150} />
				<AgGridColumn field={'contractNo'} headerName={'合同号'} width={150} />
				<AgGridColumn field={'taskOrder'} headerName={'任务令'} width={150} />
				<AgGridColumn field={'status'} headerName={'状态'} width={150} />
				<AgGridColumn field={'orderType'} headerName={intl.formatMessage({ id: 'WMS:SourceType' })} width={120} cellRenderer={OrderType} searchComponent={OrderType} />
				<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={120} />
				<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={220} />
				<AgGridColumn field={'wareHouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={120} />
				<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150} />
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} />
				<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120} />
				<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })} width={150} />
				<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={140} />
				<AgGridColumn field={'newTraceID'} headerName={intl.formatMessage({ id: 'WMS:NewTraceID' })} width={150} />
				<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch />
				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={160} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={110} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={120} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={110} />
			</AgGridPlus>
		</>
	);
};

export default MaterialPickPage;
export const routeProps = {
	name: '下架记录',
};