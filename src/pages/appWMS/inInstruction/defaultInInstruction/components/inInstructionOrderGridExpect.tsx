import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import {
	InInstructionOrderDeleteAsync,
	InInstructionOrderGetListAsync,
	InInstructionOrderCallBackAsync,
	InInstructionOrderVerifyAsync,
	InInstructionOrderSubmitAsync,
	InInstructionOrderCancelVerifyAsync,
	InInstructionOrderReceiveCompleted
} from '@/services/wms/InInstructionOrder';
import { DeleteOutlined, EditOutlined, CalculatorOutlined, PlusOutlined, SendOutlined, AuditOutlined, CloseOutlined, CheckOutlined, ImportOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import OrderStatus from '@/pages/_utils/orderStatus';
import { Button, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, history, useAccess, useIntl, dropByCacheKey } from 'umi';
import { InstructionCallBackStatus, InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import { InstructionCallBackStatusEnum, instructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';
import { Allotment } from 'allotment';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';
import ImportPublic from '@/components/importPublic';
import { ReceiptType, SourceOrderType } from '../../_utils';
import InInstructionOrderStatus from '../../_utils/inInstructionOrderStatus';
import { SourceOrderTypeSelect } from '../../_utils/receiptType';
import InInstructionOrderItemGrid from '../../_utils/inInstructionOrderItemGrid';
import OrderQuery from '../../_utils/orderQuery';

const Options = (props: ICellRendererParams & any) => {
	const { data, onRefresh, updateRoute, updatePermissionName, deletePermissionName, verifyPermissionName, cancelVerifyPermissionName, showCallBackInToolbar, callBackPermissionName } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return InInstructionOrderDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	const handleCallBack = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return InInstructionOrderCallBackAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[updatePermissionName]}>
				<Button
					icon={<EditOutlined />}
					type={'link'}
					title={intl.formatMessage({ id: 'AbpUi:Edit' })}
					onClick={() => {
						history.push(`${updateRoute}?id=${data.id}`);
					}}
				/>
			</Access>

			{/* 只有在不显示标题栏回写按钮时，才在操作列显示回写按钮，且只有回传错误时才可用 */}
			{!showCallBackInToolbar && (
				<Access accessible={access[callBackPermissionName]}>
					<DeleteConfirm title='确定回写源系统?' onConfirm={() => handleCallBack(data.id)}>
						<Button 
							size={'small'} 
							icon={<CalculatorOutlined />} 
							type={'link'} 
							title={'回写源系统'} 
							disabled={data.callBackStatus !== InstructionCallBackStatusEnum.CallBackError}
						/>
					</DeleteConfirm>
				</Access>
			)}

			<Access accessible={access[deletePermissionName]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const InInstructionOrderGridExpect = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const [selectedRow, setSelectedRow] = useState<any>(undefined);

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const {
		createRoute,
		updateRoute,
		girdHeaderTitle,
		createBtnName,
		orderType,
		createPermissionName,
		updatePermissionName,
		importPermissionName,
		deletePermissionName,
		createBoxNoPermissionName,
		printBoxNoPermissionName,
		verifyPermissionName,
		cancelVerifyPermissionName,
		receiveCompletedPermissionName,
		callBackPermissionName,
		showCallBackInToolbar
	} = props;


	const onReceiveCompleted = (params: any) => {
		InInstructionOrderReceiveCompleted({ id: selectedRow?.id }).then(() => {
			onRefresh();
		});
	}

	const onCallBack = () => {
		if (!selectedRow) {
			message.warning('请先选择一条记录');
			return;
		}
		const hide = message.loading('正在回写源系统,请稍后', 0);
		return InInstructionOrderCallBackAsync({ id: selectedRow.id })
			.then(() => {
				message.success('回写源系统成功');
				onRefresh();
			})
			.catch((error) => {
				message.error('回写源系统失败: ' + (error.message || error));
			})
			.finally(() => {
				hide();
			});
	}

	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
					gridKey='appWMS.inInstruction.defaultInInstruction.inInstructionOrderGridExpect'
					headerTitle={`${girdHeaderTitle}`}
					rowSelection={'single'}
					rowMultiSelectWithClick={true}
					onRowSelected={event => {
						if (event.node.isSelected()) {
							setSelectedRow(event.data);
						}
					}}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let filter = params?.filter ? `${params?.filter},sourceOrderType=${orderType}` : `sourceOrderType=${orderType}`;
						let data = await InInstructionOrderGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
					toolBarRender={() => {
						return [
							<Access key='createPermissionName' accessible={access[createPermissionName]}>
								<Button
									type={'primary'}
									icon={<PlusOutlined />}
									onClick={() => {
										history.push({ pathname: `${createRoute}` });
									}}
								>{`${createBtnName}`}</Button>
							</Access>,

							<Access key='importPermissionName' accessible={access[importPermissionName]}>
								<ImportPublic onAfterSubmit={onRefresh} title="期初入库单据导入" downUrl="/api/wms/in-instruction-order/get-template" uploadUrl="/api/wms/in-instruction-order/import" />
							</Access>,

							<Access accessible={!!access[verifyPermissionName] && selectedRow?.orderStatus == 5}>
								<DeleteConfirm title="确定提交?" onConfirm={() => {
									InInstructionOrderSubmitAsync({ id: selectedRow?.id }).then(() => {
										onRefresh();
									});
								}}>
									<Button icon={<SendOutlined />}>
										提交
									</Button>
								</DeleteConfirm>
							</Access>,

							<Access accessible={!!access[verifyPermissionName] && selectedRow?.orderStatus == 10}>
								<DeleteConfirm title="确定审核?" onConfirm={() => {
									InInstructionOrderVerifyAsync({ id: selectedRow?.id }).then(() => {
										onRefresh();
									});
								}}>
									<Button icon={<AuditOutlined />}>
										审核
									</Button>
								</DeleteConfirm>
							</Access>,

							<Access accessible={!!access[cancelVerifyPermissionName] && selectedRow?.orderStatus == 15 && selectedRow?.asnStatus < 30}>
								<DeleteConfirm title="确定反审核?" onConfirm={() => {
									InInstructionOrderCancelVerifyAsync({ id: selectedRow.id }).then(() => {
										onRefresh();
									});
								}}>
									<Button icon={<CloseOutlined />}>
										反审核
									</Button>
								</DeleteConfirm>
							</Access>,

							<Access accessible={!!access[receiveCompletedPermissionName] && selectedRow?.asnStatus < 30 && selectedRow?.orderStatus === 15}>
								<DeleteConfirm title="确定收货完成?" onConfirm={onReceiveCompleted}>
									<Button icon={<CheckOutlined />}>
										收货完成
									</Button>
								</DeleteConfirm>
							</Access>,

							// 条件显示回写按钮在标题栏 - 只有回传状态为错误时才可用
							...(showCallBackInToolbar ? [
								<Access key="callBackToolbar" accessible={!!access[callBackPermissionName] && !!selectedRow}>
									<DeleteConfirm title="确定回写源系统?" onConfirm={onCallBack}>
										<Button 
											icon={<CalculatorOutlined />}
											disabled={selectedRow?.callBackStatus !== InstructionCallBackStatusEnum.CallBackError}
										>
											回写源系统
										</Button>
									</DeleteConfirm>
								</Access>
							] : []),
						];
					}}
				>
					<AgGridColumn field={'select'} checkboxSelection headerName={''} width={40} hideInSearch />
					<AgGridColumn field={'orderNo'} headerName={'入库单号'} width={120} />
					{/* <AgGridColumn field={'sourceOrderNo'} headerName={'来源单据'} width={100} /> */}
					<AgGridColumn field={'materialOutCode'} headerName={'物料编码'} width={120} hideInTable />
					<AgGridColumn field={'orderStatus'} headerName={intl.formatMessage({ id: 'WMS:OrderStatus' })} width={100} cellRenderer={OrderStatus} searchComponent={OrderQuery} />
					<AgGridColumn
						field={'asnStatus'}
						headerName={intl.formatMessage({ id: 'WMS:AsnStatus' })}
						width={80}
						cellRenderer={ReceiptType}
						searchComponent={InInstructionOrderStatus}
					/>
					<AgGridColumn
						field={'sourceOrderType'}
						headerName={intl.formatMessage({ id: 'WMS:SourceOrderType' })}
						width={80}
						cellRenderer={SourceOrderType}
						searchComponent={SourceOrderTypeSelect}
					/>
					<AgGridColumn field={'warehouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} hide />
					<AgGridColumn field={'warehouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={120} />
					<AgGridColumn field={'sourceOrderProvider'} headerName={'来源系统'} width={120} />
					{/* <AgGridColumn field={'sender.id'} headerName={intl.formatMessage({ id: 'WMS:SenderId' })} width={100} hide />
					<AgGridColumn field={'sender.name'} headerName={intl.formatMessage({ id: 'WMS:SenderName' })} width={100} />
					<AgGridColumn field={'sender.contact'} headerName={intl.formatMessage({ id: 'WMS:SenderContact' })} width={100} />
					<AgGridColumn field={'sender.tel'} headerName={intl.formatMessage({ id: 'WMS:SenderTel' })} width={100} />
					<AgGridColumn field={'sender.address'} headerName={intl.formatMessage({ id: 'WMS:SenderAddress' })} width={100} /> */}
					<AgGridColumn field={'expectedArriveTime'} headerName={intl.formatMessage({ id: 'WMS:ExpectedArriveTime' })} width={120} type={'dateTimeColumn'} />

					<AgGridColumn 
						field={'callBackStatus'} 
						headerName={'回传ERP'} 
						width={100} 
						valueEnum={instructionCallBackStatusEnum}
						searchComponent={InstructionCallBackStatusSelect} 
					/>
					<AgGridColumn field={'callBackError'} headerName={'回传错误信息'} width={100} />
					<AgGridColumn field={'startCallBackTime'} headerName={'开始回传时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'completedCallBackTime'} headerName={'完成回传时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />

					<AgGridColumn
						field={'action'}
						headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
						width={120}
						pinned={'right'}
						filter={false}
						cellRenderer={Options}
						cellRendererParams={{ onRefresh, updateRoute, updatePermissionName, deletePermissionName, verifyPermissionName, cancelVerifyPermissionName, showCallBackInToolbar, callBackPermissionName }}
					/>
				</AgGridPlus>
			</Allotment.Pane>

			<Allotment.Pane snap>
				<InInstructionOrderItemGrid
					data={selectedRow}
					createBoxNoPermissionName={createBoxNoPermissionName}
					printBoxNoPermissionName={printBoxNoPermissionName}
				></InInstructionOrderItemGrid>
			</Allotment.Pane>
		</Allotment>
	);
};

export default InInstructionOrderGridExpect;
