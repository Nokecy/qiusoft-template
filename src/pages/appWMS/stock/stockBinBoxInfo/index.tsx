import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { StockBinBoxInfoGetListAsync } from '@/services/wms/StockBinBoxInfo';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Button } from 'antd';
import { downloadBlob } from '@/_utils';
import { DownOutlined } from '@ant-design/icons';
import { sumBy } from 'lodash';
import { IsOpenSelect } from '../stockBin/components/select';

const StockBinPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState();

	return (
		<>
			<AgGridPlus
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data: any = await StockBinBoxInfoGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
				headerTitle={'载具下层箱列表'}
				gridKey="appWMS.stock.stockBinBoxInfo"
				toolBarRender={(gridApi, filter) => {
					return [
						<Button
							icon={<DownOutlined />}
							onClick={() => {
								downloadBlob(`/api/wms/stock-bin-boxInfo/export?filter=${filter}`, '载具下层箱信息.xlsx');
							}}
						>
							导出
						</Button>,
					];
				}}
			>
				<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} pinned></AgGridColumn>
				<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={220} pinned hideInSearch></AgGridColumn>
				<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150} pinned></AgGridColumn>
				<AgGridColumn field={'parentTraceId'} headerName={intl.formatMessage({ id: 'WMS:ParentTraceId' })} width={140}></AgGridColumn>
				<AgGridColumn field={'boxNumber'} headerName={intl.formatMessage({ id: 'WMS:BoxNumber' })} width={150}></AgGridColumn>
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} pinned></AgGridColumn>
				<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120}></AgGridColumn>
				<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })} width={120} hideInSearch></AgGridColumn>
				<AgGridColumn field={'internalLotNumber'} headerName={intl.formatMessage({ id: 'WMS:InternalLotNumber' })} width={100}></AgGridColumn>
				<AgGridColumn field={'businessLotNumber'} headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })} width={120}></AgGridColumn>
				<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch></AgGridColumn>
				<AgGridColumn field={'isOpen'} headerName={intl.formatMessage({ id: 'WMS:IsOpen' })} width={80} type={'bool'} searchComponent={IsOpenSelect}></AgGridColumn>
				<AgGridColumn field={'takeBox'} headerName={intl.formatMessage({ id: 'WMS:TakeBox' })} width={80} type={'bool'} searchComponent={IsOpenSelect}></AgGridColumn>
				<AgGridColumn field={'openTime'} headerName={intl.formatMessage({ id: 'WMS:OpenTime' })} width={150} type={'dateTimeColumn'}></AgGridColumn>
				<AgGridColumn field="creator" headerName="创建人" width={90} />
				<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
				<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
				<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
			</AgGridPlus>
		</>
	);
};

export default StockBinPage;

export const routeProps = {
	name: '库位库存',
};