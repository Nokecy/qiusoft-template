import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { OutInspectionTaskGetListAsync, OutInspectionTaskGetAsync, OutInspectionTaskGetBoxListAsync } from '@/services/wms/OutInspectionTask';
import React, { useEffect, useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Tabs, Tag } from 'antd';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { OutInspectionProjectGetListAsync } from '@/services/wms/OutInspectionProject';
import { Allotment } from 'allotment';

const OutInspectonTaskPage = () => {
	const gridRef = useRef<GridRef>();
	const [selectedRow, setSelectedRow]: any = useState(undefined);
	const [tabKey, setTabKey] = useState('1');

	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
					initParams={{
						pickItemStatus: 10,
					}}
					headerTitle={'出库复核任务'}
					gridKey='appWMS.outInstruction.outInspectionTasks'
					onRowSelected={event => {
						if (event.node.isSelected()) {
							setSelectedRow(event.data);
						}
					}}
					rowSelection={'single'}
					request={async params => {
						let filter = params?.filter ? `${params?.filter}` : ``;
						let data: any = await OutInspectionTaskGetListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = {
							success: true,
							data: data.items!,
							total: data.totalCount,
						};
						return requestData;
					}}
				>
					<AgGridColumn field={'inspectionTaskNumber'} headerName={'任务单号'} width={130} pinned={'left'} />
					<AgGridColumn field={'workJobCode'} headerName={'任务令'} width={130} pinned={'left'} />
					<AgGridColumn field={'sourceOrderNumber'} headerName={'来源单号'} width={130} pinned={'left'} />
					<AgGridColumn field={'wareHouse.name'} headerName={'出库库房'} width={100} />
					<AgGridColumn field={'outInstructionOrderNumber'} headerName={'出库单号'} width={130} />
					<AgGridColumn field={'consignee'} headerName={'收货人'} width={130} />
					<AgGridColumn field={'consigneeTel'} headerName={'收货电话'} width={130} />
					<AgGridColumn field={'consigneeAddress'} headerName={'收货地址'} width={130} />
					<AgGridColumn field={'pickingTime'} headerName={'拣料日期'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'needShipmentTime'} headerName={'需求发运时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'needArrivalTime'} headerName={'需求到达时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn
						field={'outInstructionType'}
						headerName={'指令类型'}
						width={90}
						hideInSearch
						cellRenderer={({ value }) => {
							switch (value) {
								case 1:
									return <Tag color={'cyan'}>转库任务</Tag>;
								default:
									return '未知';
							}
						}}
					/>
					<AgGridColumn
						field={'taskStatus'}
						headerName={'状态'}
						width={90}
						hideInSearch
						pinned={'left'}
						cellRenderer={({ value }) => {
							switch (value) {
								case 15:
									return <Tag color={'blue'}>待复检</Tag>;
								case 16:
									return <Tag color={'warning'}>Qc退回</Tag>;
								case 20:
									return <Tag color={'purple'}>待QC确认</Tag>;
								case 25:
									return <Tag color={'success'}>复核完成</Tag>;
								default:
									return '未知';
							}
						}}
					/>
					<AgGridColumn field={'isCallBack'} headerName={'是否回写'} width={130} hideInSearch type={'bool'} />
					<AgGridColumn field={'openTime'} headerName={'复核开始时间'} width={130} type={'dateTimeColumn'} />
					<AgGridColumn field={'endTime'} headerName={'复核结束时间'} width={130} type={'dateTimeColumn'} />
					<AgGridColumn field={'memo'} headerName={'备注'} width={130} hideInSearch />
					<AgGridColumn field={'qcInspectionUser'} headerName={'QC复核人'} width={130} />
					<AgGridColumn field={'qcInspectionTime'} headerName={'QC复核时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'qcMemo'} headerName={'QC复核备注'} width={130} hideInSearch />
					<AgGridColumn field={'haveAttachment'} headerName={'是否有附件'} width={130} hideInSearch />
				</AgGridPlus>
			</Allotment.Pane>

			<Allotment.Pane snap>
				<Tabs
					style={{ height: '100%', background: '#fff', paddingLeft: 10, paddingRight: 10 }}
					activeKey={tabKey}
					onChange={key => {
						setTabKey(key);
					}}
				>
					<Tabs.TabPane tab='物料列表' key='1' style={{ height: '100%' }}>
						<AgGridPlus
							hideTool
							gridRef={gridRef}
												gridKey='appWMS.outInstruction.outInspectionTasks.materialList'
							params={{ id: selectedRow?.id }}
							request={async (params?: any) => {
								if (!params?.id) {
									return { success: true, data: [], total: 0 };
								}
								let data = await OutInspectionTaskGetAsync({ id: selectedRow.id });
								let requestData: any = { success: true, data: data.items!, total: 0 };
								return requestData;
							}}
						>
							<AgGridColumn field='materialCode' headerName='物料编码' width={120} hideInSearch />
							<AgGridColumn field='materialOutCode' headerName='物料外码' width={120} hideInSearch />
							<AgGridColumn field='materialDescription' headerName='物料描述' width={160} hideInSearch />
							<AgGridColumn field='quantity' headerName='数量' width={80} hideInSearch />
							<AgGridColumn field='inspectionQuantity' headerName='复核数量' width={80} hideInSearch />
							<AgGridColumn
								field={'taskStatus'}
								headerName={'状态'}
								width={90}
								hideInSearch
								cellRenderer={({ value }) => {
									switch (value) {
										case 15:
											return <Tag color={'blue'}>待复检</Tag>;
										case 16:
											return <Tag color={'warning'}>Qc退回</Tag>;
										case 20:
											return <Tag color={'purple'}>待QC确认</Tag>;
										case 25:
											return <Tag color={'success'}>复核完成</Tag>;
										default:
											return '未知';
									}
								}}
							/>
							<AgGridColumn field='memo' headerName='备注' width={120} flex={1} hideInSearch />
						</AgGridPlus>
					</Tabs.TabPane>

					<Tabs.TabPane tab='复核列表' key='2' style={{ height: '100%' }}>
						<AgGridPlus
							hideTool
							search={false}
							gridRef={gridRef}
							gridKey='appWMS.outInstruction.outInspectionTasks.BoxList'
							params={{ id: selectedRow?.id }}
							columnDefs={[
								{ field: "materialCode", headerName: "物料编码" },
								{ field: "materialOutCode", headerName: "物料外码" },
								{ field: "tracteID", headerName: "栈板号" },
								{ field: "businessLotNumber", headerName: "业务批次号" },
								{ field: "boxNumber", headerName: "箱号" },
								{ field: "quantity", headerName: "数量" },
								{ field: "dateCode", headerName: "DC" },
								{ field: "expiryDate", headerName: "超期时间", type: 'dateColumn' },
								{ field: "acProperty", headerName: "Ac属性", },
								{ field: "manufacturerName", headerName: "制造商", },
								{ field: "fufilRohsFlag", headerName: "环保", },
								{ field: "materialVersion", headerName: "物料版本", },
								{ field: "isExpensive", headerName: "贵重品", },
							]}
							request={async (params?: any) => {
								if (!params?.id) {
									return { success: true, data: [], total: 0 };
								}
								let data = await OutInspectionTaskGetBoxListAsync({ Filter: `outInspectionTaskId=${selectedRow.id}` });
								let requestData: any = { success: true, data: data.items!, total: data.totalCount };
								return requestData;
							}}
						>
						</AgGridPlus>
					</Tabs.TabPane>
				</Tabs>
			</Allotment.Pane>
		</Allotment>

	);
};

export default OutInspectonTaskPage;

export const routeProps = {
	name: '出库复核任务',
};
