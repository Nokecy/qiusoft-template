import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { StockBinDelayGetListAsync } from '@/services/wms/StockBinDelay';
import React, { useRef } from 'react';
import { useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';

const StockBinDelayPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'库存延期记录'}
				gridKey="appWMS.stock.stockBinDelay"
				request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
					let data = await StockBinDelayGetListAsync({
						Filter: params?.filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
			>
				<AgGridColumn field='traceId' headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150}></AgGridColumn>
				<AgGridColumn field='materialItem.code' headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120}></AgGridColumn>
				<AgGridColumn field='materialItem.outCode' headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120}></AgGridColumn>
				<AgGridColumn field={'realRightCode'} headerName='物权编码' width={120} />
				<AgGridColumn field={'version'} headerName='物料版本' width={120} />
				<AgGridColumn field={'productionDate'} headerName='生产日期' width={120} type={'dateColumn'} />
				<AgGridColumn field={'beforeExpiryDate'} headerName='上次延期时间' width={120} type={'dateColumn'} />
				<AgGridColumn field={'newExpiryDate'} headerName='延期时间' width={120} type={'dateColumn'} />
				<AgGridColumn field={'expiryCount'} headerName='延期次数' width={120} />
				<AgGridColumn field={'delayMan'} headerName='延期人' width={120} />
				<AgGridColumn field={'delayTime'} headerName='延期操作时间' width={120} type={'dateTimeColumn'} />
			</AgGridPlus>
		</>
	);
};

export default StockBinDelayPage;

export const routeProps = {
	name: '库存延期记录',
};