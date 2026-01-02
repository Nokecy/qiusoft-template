import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { InInstructionOrderGetItemListAsync } from '@/services/wms/InInstructionOrder';
import { InInstructionOrderLpnItemGetListAsync, InInstructionOrderLpnItemGetSnListAsync } from '@/services/wms/InInstructionOrderLpnItem';
import { Button, Space, Tabs } from 'antd';
import React, { useRef } from 'react';
import { Access, serverUrl, useAccess, useIntl, useModel, useRequest } from 'umi';
import CreateBoxNoDialog from './createBoxNoDialog';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { OrderQcType } from '@/pages/_utils/orderStatus';
import ImportPublic from '@/components/importPublic';
import { StockBinBoxLotInfoGetListAsync } from '@/services/wms/StockBinBoxLotInfo';
import { InInstructionOrderLpnSubItemGetListAsync } from '@/services/wms/InInstructionOrderLpnSubItem';
import InInstructionTaskItemFileFormDialog from './inInstructionTaskItemFileFormDialog';
import { CloudUploadOutlined } from '@ant-design/icons';
import { InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import { instructionCallBackStatusEnum, InstructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';
import { InInstructionOrderCallBackItemAsync } from '@/services/wms/InInstructionOrder';
import { message } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import DeleteConfirm from '@/components/deleteConfirm';

const InInstructionOrderItemGrid = (props: any) => {
	const gridRef = useRef<GridRef>();
	const LPNBoxGridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const { initialState } = useModel("@@initialState");

	let InOutInstructionOrderLpnItemAttachmentVisible = initialState?.configuration?.setting?.values ? initialState?.configuration?.setting?.values['WMS.InOutInstructionOrderLpnItemAttachmentAllowTypes'] : '3'


	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};
	const LPNBoxOnRefresh = () => {
		LPNBoxGridRef.current?.onRefresh();
	};

	const { data, createBoxNoPermissionName, printBoxNoPermissionName } = props;


	// 入库指令明细列表打印箱条码
	const orderItemBoxNumberPrint = (orderItemId: string) => {
		const frameElement = window.open(`${serverUrl()}/devExpressReport/print?reportUrl=InOrderItemBoxBarcodePrint&OrderItemId=${orderItemId}`, '_blank');

		frameElement!.addEventListener('afterprint', function (e) {
			frameElement!.location.href = 'about:blank';
			frameElement!.close();
		});

		frameElement!.addEventListener('load', function (e) {
			if (frameElement!.document.contentType !== 'text/html') frameElement!.print();
		});
	};

	// 箱明细列表打印箱条码
	const boxNumberPrint = (code: string) => {
		const frameElement = window.open(`${serverUrl()}/devExpressReport/print?reportUrl=BoxBarcodePrint&code=${code}`, '_blank');

		frameElement!.addEventListener('afterprint', function (e) {
			frameElement!.location.href = 'about:blank';
			frameElement!.close();
		});

		frameElement!.addEventListener('load', function (e) {
			if (frameElement!.document.contentType !== 'text/html') frameElement!.print();
		});
	};

	return (
		<Tabs
			defaultActiveKey='1'
			style={{
				height: '100%',
				backgroundColor: '#fff',
				paddingLeft: 10,
				paddingRight: 10,
				marginTop: 10,
			}}
		>
			<Tabs.TabPane tab='入库指令明细列表' key='1' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					gridRef={gridRef}
					search={false}
					params={{ orderNo: data?.orderNo }}
					gridKey='appWMS.inInstruction.nInstructionOrderItem'
					headerTitle={'到货通知单列表'}
					rowSelection={'single'}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						if (!params?.orderNo) return { success: true, data: [], total: 0 };
						let filter = params?.orderNo ? `InInstructionOrder.OrderNo = ${params?.orderNo}` : `InInstructionOrder.OrderNo = ABC`;
						let asnBox = await InInstructionOrderGetItemListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: asnBox.items!, total: asnBox.totalCount };
						return requestData;
					}}
					toolBarRender={gridApi => {
						const selectRows = gridApi?.getSelectedRows();
						return [
							selectRows && selectRows?.length > 0 ? (
								<Access accessible={!!access[createBoxNoPermissionName]}>
									<CreateBoxNoDialog title={'生成箱条码'} data={selectRows[0]} orderNo={data?.orderNo} onAfterSubmit={onRefresh}>
										生成箱条码
									</CreateBoxNoDialog>
								</Access>
							) : null,

							selectRows && selectRows[0]?.businessLotNumber ? (
								<Space size={16}>
									<Button
										type={'primary'}
										onClick={() => {
											orderItemBoxNumberPrint(selectRows[0]!.id);
										}}
									>
										打印箱条码
									</Button>
								</Space>
							) : null,

							(data && data.sourceOrderType === 0) ? <Space size={16}>
								<ImportPublic onAfterSubmit={onRefresh} title="期初入库指令明细导入" downUrl="/api/wms/in-instruction-order/get-template-items" uploadUrl="/api/wms/in-instruction-order/import-items" />
							</Space> : null,
						];
					}}
				>
					<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={160} />
					<AgGridColumn field={'purchaseOrderCode'} headerName={'采购订单号'} width={140}></AgGridColumn>
					<AgGridColumn field={'materialItem.specificationModel'} headerName={'原厂型号'} width={140}></AgGridColumn>
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
					<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150} />
					
					<AgGridColumn 
						field={'itemCallBackStatus'} 
						headerName={'明细回传ERP'} 
						width={120} 
						valueEnum={instructionCallBackStatusEnum}
						searchComponent={InstructionCallBackStatusSelect} 
					/>
					<AgGridColumn field={'deliveryQty'} headerName={intl.formatMessage({ id: 'WMS:DeliveryQty' })} width={100} />
					<AgGridColumn field={'receiveQty'} headerName={intl.formatMessage({ id: 'WMS:ReceiveQty' })} width={100} />
					<AgGridColumn field={'putQty'} headerName={intl.formatMessage({ id: 'WMS:PutQty' })} width={100} />
					<AgGridColumn field={'minPackQty'} headerName={'最小包装数'} width={100} hideInSearch={true} />
					<AgGridColumn field={'version'} headerName={'版本'} width={80}></AgGridColumn>
					<AgGridColumn field={'businessLotNumber'} headerName={'批次条码'} width={160}></AgGridColumn>
					<AgGridColumn field={'qcType'} headerName={'质检类型'} width={100} cellRenderer={OrderQcType}></AgGridColumn>
					<AgGridColumn field={'qcBillNumber'} headerName={'质检单号'} width={100} />
					<AgGridColumn field={'actualProperty'} headerName={'实际物权'} width={100}></AgGridColumn>
					<AgGridColumn field={'fufilRohsFlag'} headerName={'环保属性'} width={100}></AgGridColumn>
					<AgGridColumn field={'supplierCode'} headerName={'供应商编码'} width={100}></AgGridColumn>
					<AgGridColumn field={'supplierName'} headerName={'供应商名称'} width={100}></AgGridColumn>
					<AgGridColumn field={'manufacturerBrand'} headerName={'制造商品牌'} width={100}></AgGridColumn>
					<AgGridColumn field={'manufacturerName'} headerName={'制造商名称'} width={100}></AgGridColumn>
					<AgGridColumn field={'mfgPartNo'} headerName={'型号'} width={100}></AgGridColumn>
					<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={80}></AgGridColumn>
					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} />

					<AgGridColumn
						field={'itemCallBackMessage'}
						headerName={'明细回传信息'}
						width={200}
					/>
					<AgGridColumn field={'itemCallBackTime'} headerName={'明细回传时间'} width={160} type={'dateTimeColumn'} />

					<AgGridColumn 
						field={'itemCallBackAction'} 
						headerName={'明细操作'} 
						width={100}
						pinned={'right'}
						filter={false}
						cellRenderer={(params: any) => {
							const { data } = params;
							// 只有在明细回传状态为失败时才显示回传按钮
							if (data?.itemCallBackStatus === InstructionCallBackStatusEnum.CallBackFailed) {
								const handleItemCallBack = () => {
									const hide = message.loading('正在回写明细到源系统,请稍后', 0);
									return InInstructionOrderCallBackItemAsync({ itemId: data.id })
										.then(() => {
											message.success('明细回写源系统成功');
											// 刷新当前表格
											gridRef.current?.onRefresh();
										})
										.catch((error) => {
											message.error('明细回写源系统失败: ' + (error.message || error));
										})
										.finally(() => {
											hide();
										});
								};

								return (
									<DeleteConfirm title='确定回写此明细到源系统?' onConfirm={handleItemCallBack}>
										<Button 
											size={'small'} 
											icon={<CalculatorOutlined />} 
											type={'link'} 
											title={'回写明细'} 
										/>
									</DeleteConfirm>
								);
							}
							return '';
						}}
					/>

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={100} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={100} />
				</AgGridPlus>
			</Tabs.TabPane>

			<Tabs.TabPane tab='箱明细列表' key='2' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					search={false}
					rowSelection={'single'}
					gridRef={LPNBoxGridRef}
					headerTitle={'箱明细'}
										gridKey='appWMS.inInstruction.InInstructionOrderBoxItem'
					params={{ orderNo: data?.orderNo }}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let filter = params?.orderNo ? `inInstructionOrderNo = ${params?.orderNo}` : `inInstructionOrderNo = ABC`;
						let asnBox = await InInstructionOrderLpnItemGetListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});

						asnBox?.items?.map((item: any) => {
							item.attachmentsNormal = item.attachments?.filter((i) => i.attachmentType === 1)
							item.attachmentsAbnormal = item.attachments?.filter((i) => i.attachmentType === 2)
							if (item.attachmentsAbnormal?.length > 0) {
								item.attachmentsAbnormalVisible = true
							}
						})

						let requestData: any = { success: true, data: asnBox.items!, total: asnBox.totalCount };
						return requestData;
					}}
					getRowStyle={(params) => {
						if (params.data?.attachmentsAbnormalVisible) {
							return { background: '#ffccb3' };
						}
						return { background: '#fff' };
					}}
					toolBarRender={gridApi => {
						const selectRows = gridApi?.getSelectedRows();
						return [
							selectRows && selectRows[0]?.boxNumber ? (
								<Space size={16}>
									<Button
										type={'primary'}
										onClick={() => {
											boxNumberPrint(selectRows[0]!.boxNumber);
										}}
									>
										打印箱条码
									</Button>
								</Space>
							) : null,
							(data && data.sourceOrderType === 0) ? <Space size={16}>
								<ImportPublic onAfterSubmit={onRefresh} title="期初入库箱明细导入" downUrl="/api/wms/inInstruction-detail-item/get-template" uploadUrl="/api/wms/inInstruction-detail-item/import" />
							</Space> : null,
						];
					}}
				>
					<AgGridColumn field={'inInstructionOrderNo'} headerName={'入库单号'} width={160} />
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
					<AgGridColumn field={'businessLotNumber'} headerName={'批次条码'} width={200}></AgGridColumn>
					<AgGridColumn field={'traceId'} headerName={'载具(LPN)'} width={180} />
					<AgGridColumn field={'boxNumber'} headerName={'箱条码'} width={180} />
					<AgGridColumn field={'psn'} headerName={"Psn"} width={180}></AgGridColumn>
					<AgGridColumn field={'quantity'} headerName={'每箱箱数量'} width={100} hideInSearch={true} />
					<AgGridColumn field={'attachmentsNormal'} headerName={'正常图片'} width={100}
						cellRenderer={
							(params: any) => {
								const { data } = params;
								if (InOutInstructionOrderLpnItemAttachmentVisible === '3' || InOutInstructionOrderLpnItemAttachmentVisible === '1') {
									return <InInstructionTaskItemFileFormDialog
										title={'附件上传'}
										entityId={data.id}
										data={data}
										type={1}
										onAfterSubmit={() => {
											LPNBoxOnRefresh();
										}}
										buttonProps={{ icon: <CloudUploadOutlined />, type: 'link', headerName: '上传' }}
									/>
								} else {
									return null
								}

							}
						}
					/>
					<AgGridColumn field={'attachmentsAbnormal'} headerName={'异常图片'} width={100}
						cellRenderer={
							(params: any) => {
								const { data } = params;
								if (InOutInstructionOrderLpnItemAttachmentVisible === '3' || InOutInstructionOrderLpnItemAttachmentVisible === '2') {
									return <InInstructionTaskItemFileFormDialog
										title={'附件上传'}
										entityId={data.id}
										data={data}
										type={2}
										onAfterSubmit={() => {
											LPNBoxOnRefresh();
										}}
										buttonProps={{ icon: <CloudUploadOutlined />, type: 'link', headerName: '上传' }}
									/>
								} else {
									return null
								}

							}
						}
					/>
					<AgGridColumn field={'receiveQty'} headerName={'收货数量'} width={100} />
					<AgGridColumn field={'printCount'} headerName={'打印次数'} width={80} />
					<AgGridColumn field={'qcType'} headerName={'质检类型'} width={80} cellRenderer={OrderQcType}></AgGridColumn>
					<AgGridColumn field={'qcBillNumber'} headerName={'质检单号'} width={160}></AgGridColumn>
					<AgGridColumn field={'actualProperty'} headerName={'实际物权'} width={100}></AgGridColumn>
					<AgGridColumn field={'fufilRohsFlag'} headerName={'环保属性'} width={100}></AgGridColumn>
					<AgGridColumn field={'supplierCode'} headerName={'供应商编码'} width={100}></AgGridColumn>
					<AgGridColumn field={'supplierName'} headerName={'供应商名称'} width={100}></AgGridColumn>
					<AgGridColumn field={'manufacturerBrand'} headerName={'制造商品牌'} width={100}></AgGridColumn>
					<AgGridColumn field={'manufacturerName'} headerName={'制造商名称'} width={100}></AgGridColumn>
					<AgGridColumn field={'mfgPartNo'} headerName={'型号'} width={100}></AgGridColumn>
					<AgGridColumn field={'mfgPartNo'} headerName={'型号'} width={100}></AgGridColumn>
					<AgGridColumn field={'productionDateCode'} headerName={'DC'} width={80} />
					<AgGridColumn field={'productionDate'} headerName={'生产日期'} width={120} type={'dateColumn'} />
					<AgGridColumn field={'dueDate'} headerName={'过期日期'} width={120} type={'dateColumn'} />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
				</AgGridPlus>
			</Tabs.TabPane>

			<Tabs.TabPane tab='SN列表' key='3' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					search={false}
					rowSelection={'single'}
					headerTitle={'箱(SN)明细'}
					gridKey='appWMS.inInstruction.InInstructionOrder.SNItem'
					params={{ orderNo: data?.orderNo }}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let filter = params?.orderNo ? `inInstructionOrderNo = ${params?.orderNo}` : `inInstructionOrderNo = ABC`;
						let asnBox = await InInstructionOrderLpnItemGetSnListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: asnBox.items!, total: asnBox.totalCount };
						return requestData;
					}}
					toolBarRender={gridApi => {
						const selectRows = gridApi?.getSelectedRows();
						return [
							selectRows && selectRows[0]?.boxNumber ? (
								<Space size={16}>
									<Button
										type={'primary'}
										onClick={() => {
											boxNumberPrint(selectRows[0]!.boxNumber);
										}}
									>
										打印箱条码
									</Button>
								</Space>
							) : null,
						];
					}}
				>
					<AgGridColumn field={'inInstructionOrderNo'} headerName={'入库单号'} width={180} />
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} />
					<AgGridColumn field={'traceId'} headerName={'载具(LPN)'} width={200} />
					<AgGridColumn field={'boxNumber'} headerName={'箱条码'} width={240} />
					<AgGridColumn field={'serialNumber'} headerName={'SN条码'} width={200} />
					<AgGridColumn field={'printNum'} headerName={'打印次数'} width={120} />
					<AgGridColumn field={'productionDate'} headerName={'生产日期'} width={120} />
					<AgGridColumn field={'dueDate'} headerName={'过期日期'} width={120} />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
				</AgGridPlus>
			</Tabs.TabPane>
			<Tabs.TabPane tab='LPN箱批次列表' key='4' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					gridRef={gridRef}
					headerTitle='LPN箱批次列表'
					search={false}
gridKey='appWMS.inInstruction.InInstructionOrder.LPNItem'
					rowSelection={'single'}
					params={{ orderNo: data?.orderNo }}
					request={async (params: any) => {
						let filter = params?.orderNo ? `inInstructionOrderNo = ${params?.orderNo}` : `inInstructionOrderNo = ABC`;
						let data = await InInstructionOrderLpnSubItemGetListAsync({
							PageSize: params!.maxResultCount,
							Filter: filter,
							MaxResultCount: params!.maxResultCount,
							SkipCount: params!.skipCount,
							Sorting: params!.sorter!
						});
						return {
							success: true,
							data: data.items!,
							total: data.totalCount,
						};
					}}
					toolBarRender={(gridApi, filter) => {
						return [];
					}}
					columnDefs={[

						{
							headerName: "入库指令单号",
							field: "inInstructionOrderNo",
							width: 150,
						},
						{
							headerName: "箱号",
							field: "boxNumber",
							width: 120,
						},
						{
							headerName: "物料编码",
							field: "materialCode",
							width: 150,
						},
						{
							headerName: "外部物料编码",
							field: "materialOutCode",
							width: 150,
						},
						{
							headerName: "制造商零件号",
							field: "mfgPartNo",
							width: 150,
						},
						{
							headerName: "生产日期代码",
							field: "productionDateCode",
							width: 150,
						},
						{
							headerName: "业务批次号",
							field: "businessLotNumber",
							width: 150,
						},
						{
							headerName: "数量",
							field: "quantity",
							width: 120,
							type: "numberColumn",
							calculateType: 'sum'
						},
						{
							headerName: "批次号",
							field: "batchNo",
							width: 150,
						},
						{
							headerName: "创建时间",
							field: "creationTime",
							width: 180,
							type: "dateTimeColumn",
						},
						{
							headerName: "最后修改时间",
							field: "lastModificationTime",
							width: 180,
							type: "dateTimeColumn",
						},
					]}
				>
				</AgGridPlus>

			</Tabs.TabPane>
		</Tabs>
	);
};

export default InInstructionOrderItemGrid;
