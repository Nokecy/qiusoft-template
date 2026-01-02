import { AgGridPlus } from '@/components/agGrid';
import React, { useEffect, useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { Button, Tabs } from 'antd';
import { Allotment } from 'allotment';
import { downloadBlob } from '@/_utils';
import { CloudUploadOutlined, DownOutlined } from '@ant-design/icons';
import ShipmentOrderProfileDrawer from './components/profileDrawer';
import { StockBinInfoGetListAsync } from '@/services/wms/StockBinInfo';
import { StockBin } from '@/services/wmsPermission';
import MergetUploadDialog from './components/mergetUploadDialog';
import DayCom from './components/dayCompany';
import { sumBy } from 'lodash';
import { IsOpenSelect, IsRoHS, IsMakeOver } from './components/select';
import { warehouseZoneTypeEnum, WarehouseZoneTypeSelect, qualityStatusEnum, QualityStatusSelect } from '@/pages/appWMS/_utils';
import StockBinBoxinfoPage, { PickTaskItemPage, StockBinBoxTypePage, StockBinSNInfoPage } from './components';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { LotAttrItemGetListAsync } from '@/services/wms/LotAttrItem';
import ImportPublic from '@/components/importPublic';
import StockBinBoxLotInfo from './components/stockBinBoxLotInfo';
import { getExtendTableData } from '@/pages/_utils/editMode/itemConfiguration';

const StockBinPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const [data, setData] = useState([]);
	const [selectedRow, setSelectedRow] = useState(undefined);

	const extendData = getExtendTableData('WMS', 'StockBinInfo');

	// 基础列定义
	const getBaseColumnDefs = () => [
		{ field: "wareHouse.code", headerName: intl.formatMessage({ id: 'WMS:WareHouseCode' }), width: 100, cellRenderer: ShipmentOrderProfileDrawer },
		{ field: "wareHouse.name", headerName: intl.formatMessage({ id: 'WMS:WareHouseName' }), width: 150, hideInSearch: true },
		{ field: "warehouseZone.code", headerName: intl.formatMessage({ id: 'WMS:WareHouseZoneCode' }), width: 100 },
		{ field: "warehouseZone.type", headerName: intl.formatMessage({ id: 'WMS:WareHouseZoneType' }), width: 100, valueEnum: warehouseZoneTypeEnum },
		{ field: "wareHouseLocation.code", headerName: intl.formatMessage({ id: 'WMS:WareHouseLocationCode' }), width: 150 },
		{ field: "traceId", headerName: intl.formatMessage({ id: 'WMS:TraceId' }), width: 150 },
		{ field: "materialItem.outCode", headerName: intl.formatMessage({ id: 'WMS:MaterialItemOutCode' }), width: 120 },
		{ field: "materialItem.code", headerName: intl.formatMessage({ id: 'WMS:MaterialItemCode' }), width: 120 },
		{ field: "materialItem.description", headerName: intl.formatMessage({ id: 'WMS:MaterialItemDescript' }), width: 150, hideInSearch: true },
		{ field: "sourceOrderNo", headerName: "来源单号", width: 180 },
		{ field: "contractNo", headerName: "合同号", width: 180 },
		{ field: "taskOrder", headerName: "任务令", width: 180 },
		{ field: "version", headerName: "版本", width: 80 },
		{ field: "acProperty", headerName: "AC属性", width: 80 },
		// 动态批次属性列将插入到这里
		{ field: "realRightCode", headerName: "物权", width: 100 },
		{ field: "supplierCode", headerName: "供应商编码", width: 120 },
		{ field: "supplierName", headerName: "供应商名称", width: 180 },
		{ field: "customerCode", headerName: "客户编码", width: 120 },
		{ field: "customerName", headerName: "客户名称", width: 180 },
		{ field: "internalLotNumber", headerName: intl.formatMessage({ id: 'WMS:InternalLotNumber' }), width: 150 },
		{ field: "businessLotNumber", headerName: intl.formatMessage({ id: 'WMS:BusinessLotNumber' }), width: 140 },
		{ field: "putDate", headerName: intl.formatMessage({ id: 'WMS:PutDate' }), width: 100, type: "dateColumn", initialSort: "desc" },
		{ field: "productionDate", headerName: intl.formatMessage({ id: 'WMS:ProductionDate' }), width: 100, type: "dateColumn", initialSort: "desc" },
		{ field: "dateCode", headerName: intl.formatMessage({ id: 'WMS:DateCode' }), width: 80 },
		{ field: "putDate", headerName: "库龄(天)", width: 80, cellRenderer: DayCom, hideInSearch: true },
		{ field: "expiryDate", headerName: intl.formatMessage({ id: 'WMS:ExpiryDate' }), width: 100, type: "dateColumn", initialSort: "desc" },
		{ field: "expiryCount", headerName: intl.formatMessage({ id: 'WMS:ExpiryCount' }), width: 80, hideInSearch: true },
		{ field: "overdueWarningDate", headerName: intl.formatMessage({ id: 'WMS:OverdueWarningDate' }), width: 150, type: "dateColumn", initialSort: "desc" },
		{ field: "qty", headerName: intl.formatMessage({ id: 'WMS:Qty' }), width: 100, hideInSearch: true },
		{ field: "preRegisteredQuantity", headerName: intl.formatMessage({ id: 'WMS:PreRegisteredQuantity' }), width: 100, hideInSearch: true },
		{ field: "availableQuantity", headerName: intl.formatMessage({ id: 'WMS:AvailableQuantity' }), width: 100, hideInSearch: true },
		{ field: "isOpen", headerName: intl.formatMessage({ id: 'WMS:IsOpen' }), width: 80, type: "bool", searchComponent: IsOpenSelect },
		{ field: "openTime", headerName: intl.formatMessage({ id: 'WMS:OpenTime' }), width: 150, type: "dateTimeColumn", initialSort: "desc" },
		{ field: "qualityStatus", headerName: intl.formatMessage({ id: 'WMS:QualityStatus' }), width: 100, valueEnum: qualityStatusEnum, searchComponent: QualityStatusSelect },
		{ field: "isRoHS", headerName: intl.formatMessage({ id: 'WMS:IsRoHS' }), width: 100, type: "bool", searchComponent: IsRoHS },
		{ field: "isMakeOver", headerName: intl.formatMessage({ id: 'WMS:IsMakeOver' }), width: 100, type: "bool", searchComponent: IsMakeOver },
		{ field: "creator", headerName: "创建人", width: 90 },
		{ field: "creationTime", headerName: "创建时间", width: 140, type: "dateTimeColumn" },
		{ field: "lastModifier", headerName: "最后修改人", width: 90 },
		{ field: "lastModificationTime", headerName: "最后修改时间", width: 140, type: "dateTimeColumn" },
		...extendData
	];

	// 生成完整的列定义（包含动态批次属性列）
	const generateColumnDefs = (lotAttrItems: any[] = []) => {
		const baseColumns = getBaseColumnDefs();
		const acPropertyIndex = baseColumns.findIndex(col => col.field === "acProperty");
		
		if (acPropertyIndex === -1 || lotAttrItems.length === 0) {
			return baseColumns;
		}

		// 生成动态批次属性列
		const lotColumns = lotAttrItems.map((item: any) => {
			const field = item.field.replace(item.field[0], item.field[0].toLowerCase());
			return {
				field: `lotProperty.${field}`,
				headerName: item.label,
				width: 140,
				hideInSearch: true,
			};
		});

		// 插入动态列到AC属性后面
		return [
			...baseColumns.slice(0, acPropertyIndex + 1),
			...lotColumns,
			...baseColumns.slice(acPropertyIndex + 1)
		];
	};

	const [columnDefs, setColumnDefs] = useState(() => generateColumnDefs());

	useEffect(() => {
		LotAttrItemGetListAsync({}).then((res: any) => {
			const newColumnDefs = generateColumnDefs(res.items);
			setColumnDefs(newColumnDefs);
		});
	}, []);

	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
					gridKey="appWMS.stock.stockBin"
					onRowSelected={event => {
						if (event.node.isSelected()) {
							setSelectedRow(event.data);
						}
					}}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						const filter = params!.filter ? `${params!.filter},qty>0` : `qty>0`;
						let data: any = await StockBinInfoGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });

						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						setData(data.items);
						return requestData;
					}}
					headerTitle={'库位列表'}
					rowSelection={'multiple'}
					pinnedBottomRowData={[
						{
							qty: sumBy(data, (x: any) => x.qty! * 1),
							preRegisteredQuantity: sumBy(data, (x: any) => x.preRegisteredQuantity! * 1),
							availableQuantity: sumBy(data, (x: any) => x.availableQuantity! * 1),
						},
					]}
					toolBarRender={(gridApi, filter) => {
						return [
							<Access accessible={access[StockBin.Merge]} key={'Merge'}>
								<MergetUploadDialog onAfterSubmit={onRefresh} />
							</Access>,

							<Access accessible={access[StockBin.Switch]} key={'Switch'}>
								<ImportPublic onAfterSubmit={onRefresh} icon={<CloudUploadOutlined />} title='交换库位' downUrl='/api/wms/stock-bin/import-switch-location-template' uploadUrl='/api/wms/stock-bin/import-switch-location'>
									批量上传
								</ImportPublic>
							</Access>,

							<Button
								key={'download'}
								icon={<DownOutlined />}
								onClick={() => {
									downloadBlob(`/api/wms/stock-bin/export?filter=${filter}`, '库位列表信息.xlsx');
								}}
							>
								导出
							</Button>,
						];
					}}
					columnDefs={columnDefs}
				>
				</AgGridPlus>
			</Allotment.Pane>
			<Allotment.Pane snap>
				<Tabs style={{ height: '100%', background: '#fff' }}>
					<Tabs.TabPane tab='LPN箱列表' key='1' style={{ height: '100%' }}>
						<StockBinBoxinfoPage data={selectedRow} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='LPN箱包规列表' key='2' style={{ height: '100%' }}>
						<StockBinBoxTypePage data={selectedRow} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='LPN SN列表' key='3' style={{ height: '100%' }}>
						<StockBinSNInfoPage data={selectedRow} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='已预占任务列表' key='4' style={{ height: '100%' }}>
						<PickTaskItemPage data={selectedRow} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='LPN箱批次列表' key='5' style={{ height: '100%' }}>
						<StockBinBoxLotInfo data={selectedRow} />
					</Tabs.TabPane>
				</Tabs>
			</Allotment.Pane>
		</Allotment>
	);
};

export default StockBinPage;

export const routeProps = {
	name: '库位库存',
};
