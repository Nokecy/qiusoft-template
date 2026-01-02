import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { StockBinSnInfoGetListAsync } from '@/services/wms/StockBinSnInfo';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { sumBy } from 'lodash';
import { DownOutlined } from '@ant-design/icons';
import { Button, Checkbox, Select } from 'antd';
import { downloadBlob } from '@/_utils';
import { useBoolean } from 'ahooks';

const StockBinSnInfoPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState([]);
	const [visible, { setTrue, setFalse }] = useBoolean(false);

	return (
		<>
			<AgGridPlus
				params={{ availableQuantityFilter: visible }}
				request={async (params: any) => {
					let data: any = await StockBinSnInfoGetListAsync({
						Filter: !params?.availableQuantityFilter ? `qty > 0 ${params.filter && `, ${params.filter}`}` : params?.filter,
						// Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
				headerTitle={'库位列表'}
				gridKey="appWMS.stock.stockBinSNInfo"
				toolBarRender={(gridApi, filter) => {
					const currentFilter = !visible ? `qty > 0 ${filter && `, ${filter}`}` : filter;
					return [
						<Checkbox
							onChange={e => {
								e.target.checked ? setTrue() : setFalse();
							}}
						>
							显示历史
						</Checkbox>,
						<Button
							icon={<DownOutlined />}
							onClick={() => {
								downloadBlob(
									`/api/wms/stock-bin-snInfo/export?filter=${currentFilter}`,
									'载具SN信息.xlsx'
								);
							}}
						>
							导出
						</Button>,
					];
				}}
			>
				<AgGridColumn
					field={'wareHouse.code'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })}
					width={120}
					pinned
				></AgGridColumn>
				<AgGridColumn
					field={'wareHouseLocationCode'}
					headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })}
					width={150}
					hideInSearch
					pinned
				></AgGridColumn>
				<AgGridColumn
					field={'materialItem.code'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })}
					width={120}
					pinned
				></AgGridColumn>
				<AgGridColumn
					field={'materialItem.outCode'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })}
					width={120}
				></AgGridColumn>
				<AgGridColumn
					field={'materialItem.description'}
					headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })}
					width={120}
					hideInSearch
				></AgGridColumn>
				<AgGridColumn field={'parentTraceId'} headerName={'载具号(LPN)'} width={130}></AgGridColumn>
				<AgGridColumn
					field={'boxNumber'}
					headerName={intl.formatMessage({ id: 'WMS:BoxNumber' })}
					width={150}
				></AgGridColumn>
				<AgGridColumn
					field={'serialNumber'}
					headerName={intl.formatMessage({ id: 'WMS:SerialNumber' })}
					width={150}
					initialSort={'desc'}
				></AgGridColumn>
				<AgGridColumn
					field={'qty'}
					headerName={intl.formatMessage({ id: 'WMS:Qty' })}
					
					hideInSearch
					flex={1}
				></AgGridColumn>
				<AgGridColumn field="creator" headerName="创建人" width={90} />
				<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
				<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
				<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
			</AgGridPlus>
		</>
	);
};

export default StockBinSnInfoPage;

export const routeProps = {
	name: 'LPN SN列表',
};