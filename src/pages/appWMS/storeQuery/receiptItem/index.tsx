import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
// import { ReceiptCollectionItemGetListAsync } from '@/services/wms/ReceiptCollectionItem';
import { sumBy } from 'lodash';
import React, { useRef, useState } from 'react';
import { useAccess, useIntl } from 'umi';

const AsnItemCollectionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState([]);

	return (
		<>
			<AgGridPlus
				headerTitle={'收货采集记录'}
				// request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
				// 	let data: any = await ReceiptCollectionItemGetListAsync({
				// 		Filter: params?.filter,
				// 		Sorting: params!.sorter,
				// 		SkipCount: params!.skipCount,
				// 		MaxResultCount: params!.maxResultCount,
				// 	});
				// 	let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				// 	setData(data.items);
				// 	return requestData;
				// }}
				gridKey='appWMS.storeQuery.receiptItem'
				pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
				toolBarRender={() => {
					return [];
				}}
			>
				<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={150} />
				<AgGridColumn field={'inInstructionOrderNo'} headerName='入库指令单号' width={150} />
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
				<AgGridColumn field={'materialItem.descript'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150} />
				<AgGridColumn field={'batchNo'} headerName={intl.formatMessage({ id: 'WMS:BatchNo' })} width={150} />
				<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150} />
				<AgGridColumn field={'catonSnCode'} headerName={intl.formatMessage({ id: 'WMS:CatonSnCode' })} width={150} />
				<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch />

				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
			</AgGridPlus>
		</>
	);
};

export default AsnItemCollectionPage;
export const routeProps = {
	name: '收货信息',
};
