import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
// import { MaterialPutAwayGetListAsync } from '@/services/wms/MaterialPutAway';
import { sumBy } from 'lodash';
import React, { useRef, useState } from 'react';
import { useAccess, useIntl } from 'umi';

const MaterialPutAwayItemPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState([]);

	return (
		<>
			<AgGridPlus
				headerTitle={'物料上架记录'}
				// request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
				// 	let data: any = await MaterialPutAwayGetListAsync({
				// 		Filter: params?.filter,
				// 		Sorting: params!.sorter,
				// 		SkipCount: params!.skipCount,
				// 		MaxResultCount: params!.maxResultCount,
				// 	});
				// 	let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				// 	setData(data.items);
				// 	return requestData;
				// }}
				gridKey='appWMS.storeQuery.putAwayItem'
				pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
				toolBarRender={() => {
					return [];
				}}
			>
				<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={180} />
				<AgGridColumn field={'inInstructionOrderNo'} headerName='入库指令单号' width={150} />
				<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={180} />
				<AgGridColumn field={'sourceType'} headerName={intl.formatMessage({ id: 'WMS:SourceType' })} width={120} />
				<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={120} hide />
				<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={120} />
				<AgGridColumn field={'wareHouseLocation.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={120} />
				<AgGridColumn field={'wareHouseLocation.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationName' })} width={120} hide />
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
				<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={120} />
				<AgGridColumn field={'barCode'} headerName={intl.formatMessage({ id: 'WMS:BarCode' })} width={200} />
				<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch />

				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
			</AgGridPlus>
		</>
	);
};

export default MaterialPutAwayItemPage;
export const routeProps = {
	name: '上架记录',
};
