import { AgGridPlus } from '@/components/agGrid';
import { StockGetListAsync } from '@/services/wms/Stock';
import { downloadBlob } from '@/_utils';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import { sumBy } from 'lodash';
import { LotAttrItemGetListAsync } from '@/services/wms/LotAttrItem';

const StockPage = (props: any) => {
	const intl = useIntl();
	const [data, setData] = useState([]);
	const [cols, setCols] = useState([]);

	useEffect(() => {
		LotAttrItemGetListAsync({}).then((res: any) => {
			setCols(res.items);
		});
	}, [0]);

	return (
		<>
			<AgGridPlus
				gridKey="appWMS.stock.stock"
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data: any = await StockGetListAsync({
						Filter: params?.filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				pinnedBottomRowData={[
					{
						qty: sumBy(data, (x: any) => x.qty! * 1),
						preRegisteredQuantity: sumBy(data, (x: any) => x.preRegisteredQuantity! * 1),
						availableQuantity: sumBy(data, (x: any) => x.availableQuantity! * 1),
					},
				]}
				headerTitle={'ITEM库存记录'}
				toolBarRender={(gridApi, filter) => {
					return [
						<Button
							icon={<DownOutlined />}
							onClick={() => {
								downloadBlob(`/api/wms/stock/export?filter=${filter}`, 'ITEM库存信息.xlsx');
							}}
						>
							导出
						</Button>,
					];
				}}
				columnDefs={[
					{
						field: 'wareHouse.code',
						headerName: intl.formatMessage({ id: 'WMS:WareHouseCode' }),
						width: 80
					},
					{
						field: 'wareHouse.name',
						headerName: intl.formatMessage({ id: 'WMS:WareHouseName' }),
						width: 150
					},
					{
						field: 'materialItem.code',
						headerName: intl.formatMessage({ id: 'WMS:MaterialItemCode' }),
						width: 100,
						hideInSearch: false
					},
					{
						field: 'materialItem.outCode',
						headerName: intl.formatMessage({ id: 'WMS:MaterialItemOutCode' }),
						width: 100
					},
					{
						field: 'materialItem.description',
						headerName: intl.formatMessage({ id: 'WMS:MaterialItemDescript' }),
						flex: 1
					},
					{
						field: 'version',
						headerName: '版本',
						width: 60
					},
					{
						field: 'acProperty',
						headerName: 'AC属性',
						width: 80
					},
					...cols.map((item: any) => ({
						field: `preDefine${item.field}`,
						headerName: item?.label,
						type: item?.type,
						width: 120
					})),
					{
						field: 'realRightCode',
						headerName: '物权',
						width: 100
					},
					{
						field: 'preRegisteredQuantity',
						headerName: intl.formatMessage({ id: 'WMS:PreRegisteredQuantity' }),
						width: 120,
						hideInSearch: true
					},
					{
						field: 'availableQuantity',
						headerName: intl.formatMessage({ id: 'WMS:AvailableQuantity' }),
						width: 120,
						hideInSearch: true
					},
					{
						field: 'qty',
						headerName: intl.formatMessage({ id: 'WMS:Qty' }),
						width: 100,
						hideInSearch: true
					},
					{
						field: 'creator',
						headerName: '创建人',
						width: 90
					},
					{
						field: 'creationTime',
						headerName: '创建时间',
						width: 140,
						type: 'dateTimeColumn'
					},
					{
						field: 'lastModifier',
						headerName: '最后修改人',
						width: 90
					},
					{
						field: 'lastModificationTime',
						headerName: '最后修改时间',
						width: 140,
						type: 'dateTimeColumn'
					}
				]}
			>
			</AgGridPlus>
		</>
	);
};

export default StockPage;

export const routeProps = {
	name: 'ITEM库存',
};