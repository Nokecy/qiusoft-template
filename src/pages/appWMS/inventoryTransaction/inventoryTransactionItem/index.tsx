import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { InventoryTransactionItemGetListAsync } from '@/services/wms/InventoryTransactionItem';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Allotment } from 'allotment';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import InventoryTransactionItemGrid from '../../inInstruction/_utils/inventoryTransactionItemGrid';
import { Tabs, Tag, Button } from 'antd';
import InventoryTransactionBoxLotItemPage from './components/InventoryTransactionBoxLotItem';
import { getExtendTableData } from '@/pages/_utils/editMode/itemConfiguration';
import { Select } from '@formily/antd-v5';
import { DownOutlined } from '@ant-design/icons';
import { downloadBlob } from '@/_utils';

const InventoryTransactionItemPage = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const [selectedRow, setSelectedRow] = useState<any>(undefined);
	const extendData = getExtendTableData('WMS', 'InventoryTransactionItem');

	const renderExtendData = () => extendData.map((item, index) => <AgGridColumn key={index} {...item} />);

	return (
		<>
			<Allotment vertical={true}>
				<Allotment.Pane>
					<AgGridPlus
						gridRef={gridRef}
						headerTitle={'库存交易记录'}
						gridKey="appWMS.inventoryTransaction.inventoryTransactionItem"
						rowSelection={'single'}
						rowMultiSelectWithClick={true}
						onRowSelected={event => {
							if (event.event) {
								setSelectedRow(event.data);
							}
						}}
						request={async (params?: any) => {
							let data = await InventoryTransactionItemGetListAsync({
								Filter: params.filter,
								Sorting: params!.sorter,
								SkipCount: params!.skipCount,
								MaxResultCount: params!.maxResultCount,
							});
							let requestData: any = { success: true, data: data.items!, total: data.totalCount };
							return requestData;
						}}
						toolBarRender={(gridApi, filter, _, paginationInfo) => {
							const { skipCount = 0, maxResultCount = 200 } = paginationInfo || {};
							return [
								<Button
									icon={<DownOutlined />}
									onClick={() => {
										downloadBlob(
											`api/wms/inventory-transaction-item/export-excel?filter=${filter || ''}&SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`,
											'库存交易记录.xlsx'
										);
									}}
								>
									导出
								</Button>,
							];
						}}
					>
						<AgGridColumn field={'select'} checkboxSelection headerName={''} width={40} hideInSearch />
						<AgGridColumn field={'transactionNumber'} headerName={'交易号'} width={150} />
						<AgGridColumn
							field={'transactionType'}
							headerName={'交易类型'}
							width={100}
							cellRenderer={({ value }) => {
								switch (value) {
									case 5:
										return <Tag color={'success'}>上架</Tag>;
									case 10:
										return <Tag color={'waring'}>转移</Tag>;
									case 15:
										return <Tag color={'error'}>调整</Tag>;
									case 20:
										return <Tag color={'cyan'}>下架</Tag>;
									default:
										return '未知';
								}
							}}
							searchComponent={Select}
							searchComponentProps={{
								options: [
									{ label: '上架', value: 5 },
									{ label: '转移', value: 10 },
									{ label: '调整', value: 15 },
									{ label: '下架', value: 20 },
								],
							}}
						/>
						<AgGridColumn
							field={'transactionCategory'}
							headerName={'交易方式'}
							width={100}
							cellRenderer={({ value }) => {
								switch (value) {
									case 0:
										return <Tag color="default">未指定</Tag>;
									case 10:
										return <Tag color="blue">期初入库</Tag>;
									case 11:
										return <Tag color="green">采购入库</Tag>;
									case 12:
										return <Tag color="cyan">客供入库</Tag>;
									case 13:
										return <Tag color="purple">退货入库</Tag>;
									case 14:
										return <Tag color="magenta">生产入库</Tag>;
									case 15:
										return <Tag color="gold">退料入库</Tag>;
									case 16:
										return <Tag color="lime">杂入入库</Tag>;
									case 17:
										return <Tag color="orange">转库入库</Tag>;
									case 18:
										return <Tag color="geekblue">服务退料入库</Tag>;
									case 30:
										return <Tag color="red">销售出库</Tag>;
									case 31:
										return <Tag color="volcano">采购退货</Tag>;
									case 32:
										return <Tag color="purple">生产退回</Tag>;
									case 33:
										return <Tag color="gray">领料出库</Tag>;
									case 34:
										return <Tag color="pink">客供退货</Tag>;
									case 35:
										return <Tag color="brown">杂出出库</Tag>;
									case 36:
										return <Tag color="yellow">转库出库</Tag>;
									case 37:
										return <Tag color="cyan">服务领料出库</Tag>;
									default:
										return '未知';
								}

							}}
							searchComponent={Select}
							searchComponentProps={{
								options: [
									{ label: '未指定', value: 0 },
									{ label: '期初入库', value: 10 },
									{ label: '采购入库', value: 11 },
									{ label: '客供入库', value: 12 },
									{ label: '退货入库', value: 13 },
									{ label: '生产入库', value: 14 },
									{ label: '退料入库', value: 15 },
									{ label: '杂入入库', value: 16 },
									{ label: '转库入库', value: 17 },
									{ label: '服务退料入库', value: 18 },
									{ label: '销售出库', value: 30 },
									{ label: '采购退货', value: 31 },
									{ label: '生产退回', value: 32 },
									{ label: '领料出库', value: 33 },
									{ label: '客供退货', value: 34 },
									{ label: '杂出出库', value: 35 },
									{ label: '转库出库', value: 36 },
									{ label: '服务领料出库', value: 37 },
								]
							}}
						/>
						<AgGridColumn field={'transactionTime'} headerName={'交易时间'} width={150} type={'dateTimeColumn'} />
						<AgGridColumn field={'instructionOrderNo'} headerName={'指令单号'} width={120} />
						<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={120} />
						<AgGridColumn field={'warehouseCode'} headerName={'库房编码'} width={100} />
						<AgGridColumn field={'warehouseName'} headerName={'库房名称'} width={150} />
						<AgGridColumn field={'warehouseLocationCode'} headerName={'交易库位'} width={100} />
						<AgGridColumn field={'materialCode'} headerName={'物料编码'} width={100} />
						<AgGridColumn field={'materialOutCode'} headerName={'物料外码'} width={100} />
						<AgGridColumn field={'materialDescription'} headerName={'物料描述'} width={100} />
						<AgGridColumn field={'transactionQuantity'} headerName={'交易数量'} width={160} />
						<AgGridColumn field={'sourceTraceId'} headerName={'来源LPN'} width={100} />
						<AgGridColumn field={'newTraceId'} headerName={'新LPN'} width={100} />
						<AgGridColumn field={'realRightCode'} headerName={'物权'} width={100} />
						<AgGridColumn field={'supplierName'} headerName={'供应商'} width={100} />
						<AgGridColumn field={'dateCode'} headerName={'日期编码'} width={100} />
						<AgGridColumn field={'sourceBoxNumber'} headerName={'来源箱号'} width={100} />
						<AgGridColumn field={'newBoxNumber'} headerName={'捡料箱号'} width={100} />
						<AgGridColumn field={'qualityInspectionNumber'} headerName={'质量检验单号'} width={150} />
						<AgGridColumn field={'startInspectionTime'} headerName={'开始检验时间'} width={150} type={'dateTimeColumn'} />
						<AgGridColumn field={'endInspectionTime'} headerName={'结束检验时间'} width={150} type={'dateTimeColumn'} />
						<AgGridColumn field={'inspectioner'} headerName={'检验人'} width={100} />
						<AgGridColumn field={'lotNo'} headerName={'批次号'} width={100} />
						<AgGridColumn field={'bussinsLotNumber'} headerName={'业务批次'} width={100} />
						<AgGridColumn field={'expiryDate'} headerName={'过期时间'} width={150} type={'dateTimeColumn'} />
						<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={100} />
						<AgGridColumn field={'takeBox'} headerName={'是否可拆箱'} width={100} type={'bool'} />
						<AgGridColumn field={'openTime'} headerName={'开箱时间'} width={150} type={'dateTimeColumn'} />
						<AgGridColumn field={'productionDate'} headerName={'生产时间'} width={150} type={'dateTimeColumn'} />
						<AgGridColumn field={'contractNo'} headerName={'合同号'} width={120} />
						<AgGridColumn field={'taskOrder'} headerName={'任务令'} width={120} />
						<AgGridColumn field={'isRoHS'} headerName={'是否环保'} width={100} type={'bool'} />
						<AgGridColumn field={'isMakeOver'} headerName={'是否维修件/翻新件'} width={100} type={'bool'} />
						<AgGridColumn
							field={'qualityStatus'}
							headerName={'质量状态'}
							width={100}
							cellRenderer={({ value }) => {
								switch (value) {
									case 5:
										return <Tag color={'warning'}>检验中</Tag>;
									case 10:
										return <Tag color={'success'}>合格</Tag>;
									case 20:
										return <Tag color={'error'}>不合格</Tag>;
									case undefined:
										return '';
									default:
										return '未知';
								}
							}}
						/>
						<AgGridColumn field={'operationCode'} headerName={'交易人工号'} width={100} />
						<AgGridColumn field={'operationName'} headerName={'交易人姓名'} width={100} />
						{
							renderExtendData()
						}
					</AgGridPlus>
				</Allotment.Pane>

				<Allotment.Pane snap>
					<Tabs style={{ height: '100%', background: '#fff' }}>
						<Tabs.TabPane tab='库存SN交易记录' key='1' style={{ height: '100%' }}>
							<InventoryTransactionItemGrid data={selectedRow}></InventoryTransactionItemGrid>
						</Tabs.TabPane>
						<Tabs.TabPane tab='库存交易批次记录' key='2' style={{ height: '100%' }}>
							<InventoryTransactionBoxLotItemPage data={selectedRow} />
						</Tabs.TabPane>
					</Tabs>
				</Allotment.Pane>
			</Allotment>
		</>
	);
};

export default InventoryTransactionItemPage;
export const routeProps = {
	name: '库存交易记录',
};
