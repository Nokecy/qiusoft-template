import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { PickTaskItemGetListAsync } from '@/services/wms/PickTaskItem';
import { OutInstructionOrderGetItemListAsync } from '@/services/wms/OutInstructionOrder';
import { LoadCheckRecordGetListAsync } from '@/services/wms/LoadCheckRecord';
import { Tabs } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAccess, useIntl, useModel } from 'umi';
import { sumBy } from 'lodash';
import PickItemStatus from './pickItemStatus';
import PickStatus from './pickStatus';
import PickTypeSelect, { PickType } from './pickType';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Space } from '@formily/antd-v5';
import OutInstructionAllocationBtn from './outInstructionAllocationBtn';
import OutInstructionManualAllocation from './outInstructionManualAllocationBtn';
import PickTaskReleaseBtn from './pickTaskReleaseBtn';
import PickTaskManualAllocationBtn from './pickTaskManualAllocationBtn';
import PickTaskDeleteBtn from './pickTaskDeleteBtn';
import { PreRegisteredModel } from './preRegisteredModel';
import { MaterialPickItemBoxDetailGetListAsync } from '@/services/wms/MaterialPickItemBoxDetail';
import OutInstructionTaskItemFileFormDialog from './outInstructionTaskItemFileFormDialog';
import { CloudUploadOutlined } from '@ant-design/icons';
import { InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import { instructionCallBackStatusEnum, InstructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';
import { OutInstructionOrderCallBackItemAsync } from '@/services/wms/OutInstructionOrder';
import { Button, message } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import DeleteConfirm from '@/components/deleteConfirm';
import OutInstructionDemandItemDialog from './outInstructionDemandItemDialog';

const OutInstructionOrderItemGrid = (props: any) => {
	const { data, allocationPermissionName, releasePickTaskPermissionName, deletePickTaskPermissionName, masterTableRefresh } = props;

	const gridRefOutInstruction = useRef<GridRef>();
	const gridRefPickTaskItem = useRef<GridRef>();
	const gridRefAsnItemCollection = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const [tabKey, setTabKey] = useState('1');
	const [outInstructionOrderItem, setOutInstructionOrderItem]: any = useState(undefined);
	const [pickTaskItem, setPickTaskItem]: any = useState(undefined);
	const { initialState } = useModel('@@initialState');

	let InOutInstructionOrderLpnItemAttachmentVisible = initialState?.configuration?.setting?.values
		? initialState?.configuration?.setting?.values['WMS.InOutInstructionOrderLpnItemAttachmentAllowTypes']
		: '3';

	const gridRefAsnItemCollectionOnRefresh = () => {
		gridRefAsnItemCollection.current?.onRefresh();
	};

	const reload = () => {
		gridRefOutInstruction.current?.onRefresh();
		gridRefPickTaskItem.current?.onRefresh();
		setOutInstructionOrderItem(undefined);
		setPickTaskItem(undefined);
		masterTableRefresh();
	};

	useEffect(() => {
		setPickTaskItem([]);
	}, [data?.id]);

	const Options = useMemo(() => {
		switch (tabKey) {
			case '1':
				return (
					<Space>
						{[
							<OutInstructionAllocationBtn outInstructionOrder={data} outInstructionOrderItem={outInstructionOrderItem} onSubmited={reload} />,

							Array.isArray(outInstructionOrderItem) && outInstructionOrderItem.length === 1 ? (
								<OutInstructionManualAllocation outInstructionOrder={data} outInstructionOrderItem={outInstructionOrderItem[0]} onSubmited={reload} />
							) : null,
						].map(i => i)}
					</Space>
				);
			case '2':
				return (
					<Space>
						{[
							<PickTaskReleaseBtn releasePickTaskPermissionName={releasePickTaskPermissionName} pickTaskItem={pickTaskItem} onSubmited={reload} />,

							<PickTaskManualAllocationBtn outInstructionOrder={data} pickTaskItem={pickTaskItem} onSubmited={reload} />,

							<PickTaskDeleteBtn deletePickTaskPermissionName={deletePickTaskPermissionName} pickTaskItem={pickTaskItem} onSubmited={reload} />,
						].map(i => i)}
					</Space>
				);
		}
	}, [tabKey, outInstructionOrderItem, outInstructionOrderItem?.id, pickTaskItem?.id]);

	return (
		<Tabs
			style={{ height: '100%', backgroundColor: '#fff', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}
			activeKey={tabKey}
			onChange={key => {
				setTabKey(key);
			}}
			tabBarExtraContent={Options}
		>
			<Tabs.TabPane tab='行信息列表' key='1' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					gridRef={gridRefOutInstruction}
					pagination={false}
					search={false}
					gridKey='appWMS.outInstruction.outInstructionOrder.hangItem'
					params={{ orderNo: data?.orderNo }}
					rowSelection={'multiple'}
					onSelectionChanged={e => {
						let selectedRows = e.api.getSelectedRows();
						setOutInstructionOrderItem(selectedRows);
					}}
					request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
						const orderNo = params?.orderNo || data?.orderNo;
						if (!orderNo) {
							return { success: true, data: [], total: 0 };
						}

						let filter = `shipmentOrder.orderNo = ${orderNo}`;
						let asnBox = await OutInstructionOrderGetItemListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: asnBox.items!, total: asnBox.totalCount };
						return requestData;
					}}
					pinnedBottomRowData={[{ quantity: sumBy(data, (x: any) => x.quantity! * 1), pickQuantity: sumBy(data, (x: any) => x.pickQuantity! * 1) }]}
				>
					<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={120} />
					<AgGridColumn field={'materialItem.specificationModel'} headerName={'原厂型号'} width={140} />
					<AgGridColumn field={'taskOrder'} headerName={'任务令'} width={120} />
					<AgGridColumn field={'pickItemStatus'} headerName={'下架状态'} width={120} cellRenderer={PickItemStatus} />
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
					<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={200} />
					<AgGridColumn
						field={'itemCallBackStatus'}
						headerName={'明细回传ERP'}
						width={120}
						valueEnum={instructionCallBackStatusEnum}
						searchComponent={InstructionCallBackStatusSelect}
					/>
					<AgGridColumn field={'version'} headerName={'版本'} width={80}></AgGridColumn>
					<AgGridColumn
						field={'assigneeName'}
						headerName={intl.formatMessage({ id: 'WMS:AssigneeName' })}
						filter={false}
						sortable={false}
						cellRenderer={params => {
							return params.data.peoples
								?.filter(i => i.assigneeName)
								.map(item => item.assigneeName)
								.join('；');
						}}
						width={170}
					/>
					<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={80}></AgGridColumn>
					<AgGridColumn field={'quantity'} headerName={'需求数量'} hideInSearch width={100} />
					<AgGridColumn field={'pickQuantity'} headerName={'下架数量'} hideInSearch width={100} />
					<AgGridColumn field={'shareQuantity'} headerName={'分配数量'} hideInSearch width={100} />
					<AgGridColumn field={'lackQuantity'} headerName={'欠料数量'} hideInSearch width={100} />
					<AgGridColumn field={'tallyQuantity'} headerName={'发运数量'} hideInSearch width={100} />
					<AgGridColumn field={'preRegisteredModel'} headerName={'预占模式'} hideInSearch width={100} cellRenderer={PreRegisteredModel} />
					<AgGridColumn field={'specifyProperty.sourceOrderNo'} headerName={'指定单号'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.dateCode'} headerName={'指定DC'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.lotNumber'} headerName={'指定批次'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.contractNo'} headerName={'指定合同号'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.taskOrderNo'} headerName={'指定任务令'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.boxNumber'} headerName={'指定箱号'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.serialNumber'} headerName={'指定序列号'} width={90}></AgGridColumn>
					<AgGridColumn
						field={'shipmentOrder.requiredCompletedTime'}
						headerName={intl.formatMessage({ id: 'WMS:ShipmentOrderRequiredDeliveryTime' })}
						width={120}
						type={'dateColumn'}
					/>
					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} />
					<AgGridColumn field={'itemCallBackMessage'} headerName={'明细回传信息'} width={200} />
					<AgGridColumn field={'itemCallBackTime'} headerName={'明细回传时间'} width={160} type={'dateTimeColumn'} />

					<AgGridColumn
						field={'itemCallBackAction'}
						headerName={'明细操作'}
						width={150}
						pinned={'right'}
						filter={false}
						cellRenderer={(params: any) => {
							const { data } = params;

							const handleItemCallBack = () => {
								const hide = message.loading('正在回写明细到源系统,请稍后', 0);
								return OutInstructionOrderCallBackItemAsync({ itemId: data.id })
									.then(() => {
										message.success('明细回写源系统成功');
										// 刷新主表格数据
										if (masterTableRefresh) {
											masterTableRefresh();
										}
										// 刷新当前表格
										gridRefOutInstruction.current?.onRefresh();
									})
									.catch(error => {
										message.error('明细回写源系统失败: ' + (error.message || error));
									})
									.finally(() => {
										hide();
									});
							};

							return (
								<Space size={0}>
									{data?.itemCallBackStatus === InstructionCallBackStatusEnum.MergeCallBack && (
										<OutInstructionDemandItemDialog data={data} />
									)}
									{data?.itemCallBackStatus === InstructionCallBackStatusEnum.CallBackFailed && (
										<DeleteConfirm title='确定回写此明细到源系统?' onConfirm={handleItemCallBack}>
											<Button size={'small'} icon={<CalculatorOutlined />} type={'link'} title={'回写明细'} />
										</DeleteConfirm>
									)}
								</Space>
							);
						}}
					/>

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
				</AgGridPlus>
			</Tabs.TabPane>

			<Tabs.TabPane tab='需求明细列表' key='2' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					search={false}
					gridRef={gridRefPickTaskItem}
					gridKey='appWMS.outInstruction.outInstructionOrder.TaskItem'
					params={{ orderNo: data?.orderNo }}
					onSelectionChanged={e => {
						let selectedRows = e.api.getSelectedRows();
						setPickTaskItem(selectedRows[0]);
					}}
					rowSelection={'single'}
					request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
						let pickTaskItem = await PickTaskItemGetListAsync({
							Filter: `outInstructionOrderNo = ${params?.orderNo}`,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: pickTaskItem.items!, total: pickTaskItem.totalCount };
						return requestData;
					}}
				>
					<AgGridColumn field={'outInstructionOrderNo'} headerName={intl.formatMessage({ id: 'WMS:ShipmentOrderNo' })} width={130} checkboxSelection />
					<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={130} />
					<AgGridColumn field={'materialItem.specificationModel'} headerName={'原厂型号'} width={140} />
					<AgGridColumn field={'taskOrder'} headerName={intl.formatMessage({ id: 'WMS:TaskOrder' })} width={120} />
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} />
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={150} />
					<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={80} hideInSearch />
					<AgGridColumn field={'pickQty'} headerName={'下架数量'} width={80} hideInSearch />
					<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150} />
					<AgGridColumn field={'pickItemStatus'} headerName={intl.formatMessage({ id: 'WMS:PickItemStatus' })} width={90} cellRenderer={PickStatus} />
					<AgGridColumn field={'pickType'} headerName={intl.formatMessage({ id: 'WMS:PickType' })} width={90} cellRenderer={PickType} searchComponent={PickTypeSelect} />
					<AgGridColumn field={'preRegisteredModel'} headerName={intl.formatMessage({ id: 'WMS:PreRegisteredModel' })} width={90} cellRenderer={PreRegisteredModel} />
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={100} />
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
					<AgGridColumn field={'wareHouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={80} />
					<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150} />
					<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={100} />
					<AgGridColumn field={'version'} headerName={'版本'} width={80}></AgGridColumn>
					<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={80}></AgGridColumn>
					<AgGridColumn field={'realRightCode'} headerName={'物权'} width={100}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.sourceOrderNo'} headerName={'指定单号'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.dateCode'} headerName={'指定DC'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.lotNumber'} headerName={'指定批次'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.contractNo'} headerName={'指定合同号'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.taskOrderNo'} headerName={'指定任务令'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.boxNumber'} headerName={'指定箱号'} width={90}></AgGridColumn>
					<AgGridColumn field={'specifyProperty.serialNumber'} headerName={'指定序列号'} width={90}></AgGridColumn>
					<AgGridColumn field={'wareHouseTeam.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseTeamName' })} width={130} />
					<AgGridColumn field={'assigneeName'} headerName={intl.formatMessage({ id: 'WMS:AssigneeName' })} width={70} />
					<AgGridColumn field={'deliveryObject'} headerName={intl.formatMessage({ id: 'WMS:DeliveryObject' })} width={120} />
					<AgGridColumn field={'deliveryAddress'} headerName={intl.formatMessage({ id: 'WMS:DeliveryAddress' })} width={80} />
					<AgGridColumn field={'needStartTime'} headerName={intl.formatMessage({ id: 'WMS:NeedStartTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'actualStartTime'} headerName={intl.formatMessage({ id: 'WMS:ActualStartTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'finishTime'} headerName={intl.formatMessage({ id: 'WMS:FinishTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} width={100} />
					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={170} type={'dateTimeColumn'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={80} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={80} />
				</AgGridPlus>
			</Tabs.TabPane>

			<Tabs.TabPane tab='装车明细' key='3' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					search={false}
					gridRef={gridRefPickTaskItem}
					gridKey='appWMS.outInstruction.outInstructionOrder.loadCheckItem'
					params={{ orderNo: data?.orderNo }}
					rowSelection={'single'}
					request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
						let loadCheckRecords = await LoadCheckRecordGetListAsync({
							Filter: `outInstructionOrderNo = ${params?.orderNo}`,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: loadCheckRecords.items!, total: loadCheckRecords.totalCount };
						return requestData;
					}}
				>
					<AgGridColumn field={'licensePlateNumber'} headerName={'车牌号'} width={120} />
					<AgGridColumn field={'sealCode'} headerName={'密封号'} width={130} />
					<AgGridColumn field={'outInstructionOrderNo'} headerName={'出库指令号'} width={130} />
					<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={130} />
					<AgGridColumn field={'deliveryOrderNo'} headerName={'送货单号'} width={120} />
					<AgGridColumn field={'contractNo'} headerName={'合同号'} width={120} />
					<AgGridColumn field={'traceId'} headerName={'载具号(LPN)'} width={120} />
					<AgGridColumn field={'boxNumber'} headerName={'箱号'} width={120} />
					<AgGridColumn field={'serialNumber'} headerName={'序列号(SN)'} width={120} />
					<AgGridColumn field={'quantity'} headerName={'数量'} width={80} hideInSearch={true} />
					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={170} type={'dateTimeColumn'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={80} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={80} />
				</AgGridPlus>
			</Tabs.TabPane>
			<Tabs.TabPane tab='箱明细' key='4' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					search={false}
					gridRef={gridRefAsnItemCollection}
					gridKey='appWMS.outInstruction.outInstructionOrder.BoxItem'
					params={{ orderNo: data?.orderNo }}
					rowSelection={'single'}
					request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
						let loadCheckRecords = await MaterialPickItemBoxDetailGetListAsync({
							Filter: `outInstructionOrderNo = ${params?.orderNo}`,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						loadCheckRecords?.items?.map((item: any) => {
							item.attachmentsNormal = item.attachments?.filter(i => i.attachmentType === 1);
							item.attachmentsAbnormal = item.attachments?.filter(i => i.attachmentType === 2);
							if (item.attachmentsAbnormal?.length > 0) {
								item.attachmentsAbnormalVisible = true;
							}
						});

						let requestData: any = { success: true, data: loadCheckRecords.items!, total: loadCheckRecords.totalCount };
						return requestData;
					}}
					getRowStyle={params => {
						if (params.data?.attachmentsAbnormalVisible) {
							return { background: '#ffccb3' };
						}
						return { background: '#fff' };
					}}
				>
					<AgGridColumn field={'materialCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} hideInSearch />
					<AgGridColumn field={'materialOutCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120} hideInSearch />
					<AgGridColumn field={'material.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120} hideInTable />
					<AgGridColumn field={'materialDescript'} headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })} width={500} hideInSearch />
					<AgGridColumn field={'wareHouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={120} />
					<AgGridColumn
						field={'attachmentsNormal'}
						headerName={'正常图片'}
						width={100}
						cellRenderer={(params: any) => {
							const { data } = params;

							if (InOutInstructionOrderLpnItemAttachmentVisible === '3' || InOutInstructionOrderLpnItemAttachmentVisible === '1') {
								return (
									<OutInstructionTaskItemFileFormDialog
										title={'附件上传'}
										entityId={data.id}
										data={data}
										type={1}
										onAfterSubmit={() => {
											gridRefAsnItemCollectionOnRefresh();
										}}
										buttonProps={{ icon: <CloudUploadOutlined />, type: 'link', headerName: '上传' }}
									/>
								);
							} else {
								return null;
							}
						}}
					/>
					<AgGridColumn
						field={'attachmentsAbnormal'}
						headerName={'异常图片'}
						width={100}
						cellRenderer={(params: any) => {
							const { data } = params;
							if (InOutInstructionOrderLpnItemAttachmentVisible === '3' || InOutInstructionOrderLpnItemAttachmentVisible === '2') {
								return (
									<OutInstructionTaskItemFileFormDialog
										title={'附件上传'}
										entityId={data.id}
										data={data}
										type={2}
										onAfterSubmit={() => {
											gridRefAsnItemCollectionOnRefresh();
										}}
										buttonProps={{ icon: <CloudUploadOutlined />, type: 'link', headerName: '上传' }}
									/>
								);
							} else {
								return null;
							}
						}}
					/>
					<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150} />
					<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150} />
					<AgGridColumn field={'contractNo'} headerName={'合同号'} width={150} />
					<AgGridColumn field={'taskOrder'} headerName={'任务令'} width={150} />
					<AgGridColumn field={'boxNumber'} headerName={intl.formatMessage({ id: 'WMS:BoxNumber' })} width={100} />
					<AgGridColumn field={'serialNumber'} headerName={intl.formatMessage({ id: 'WMS:SerialNumber' })} width={150} />
					<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100} type={'numericColumn'} hideInSearch />
				</AgGridPlus>
			</Tabs.TabPane>
		</Tabs>
	);
};

export default OutInstructionOrderItemGrid;
