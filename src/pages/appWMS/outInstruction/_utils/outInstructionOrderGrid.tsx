import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { DeliveryOrderStatus } from '@/pages/appWMS/outInstruction/_utils';
import { InstructionCallBackStatus, InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import { InstructionCallBackStatusEnum, instructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';
import OrderStatus from '@/pages/_utils/orderStatus';
import {
	OutInstructionOrderDeleteAsync,
	OutInstructionOrderGetListAsync,
	OutInstructionOrderCallBackAsync,
	OutInstructionOrderAllotAsync,
	OutInstructionOrderVerifyAsync,
	OutInstructionOrderCancelVerifyAsync,
	OutInstructionOrderManualShipmentAsync,
	OutInstructionOrderCancelDemandMergeAsync,
} from '@/services/wms/OutInstructionOrder';
import { DeleteOutlined, EditOutlined, CalculatorOutlined, BackwardOutlined, PlusOutlined, SendOutlined, AuditOutlined, CloseOutlined, CheckOutlined, ApiOutlined, CarOutlined } from '@ant-design/icons';
import { ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, history, closeTab, useAccess, useIntl, useRequest, dropByCacheKey, useMutation } from 'umi';
import OrderQuery, { OrderSelect } from './orderQuery';
import { Allotment } from 'allotment';
import OutInstructionOrderItemGrid from './outInstructionOrderItemGrid';
import UploadDialog from './outINstructionOrderUploadDialog';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import ChoseLpnModal from './choseLpnModal';
import PreLpnModal from './preLpnModal';
import DeleteConfirm from '@/components/deleteConfirm';

const Options = (props: ICellRendererParams & any) => {
	const { data, onRefresh, updateRoute, updatePermissionName, deletePermissionName, CancelDemandMergeName, verifyPermissionName, cancelVerifyPermissionName, showCallBackInToolbar, callBackPermissionName } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		if (onRefresh) {
			onRefresh();
		}
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return OutInstructionOrderDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	const handleCallBack = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return OutInstructionOrderCallBackAsync({ id })
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
				{/* 已经审核的不允许修改 */}
				{(data.orderStatus !== 15 && (
					<Button
						icon={<EditOutlined />}
						type={'link'}
						title={intl.formatMessage({ id: 'AbpUi:Edit' })}
						onClick={() => {
							dropByCacheKey(window.location.pathname);
							closeTab(updateRoute);
							history.push(`${updateRoute}?id=${data.id}`);
						}}
					/>
				)) || <span style={{ width: 32, display: 'inline-block' }}></span>}
			</Access>

			{/* 审核和反审核按钮已移动到标题栏 */}
			{/* 只有在不显示标题栏回写按钮时，才在操作列显示回写按钮，且只有回传错误时才可用 */}
			{!showCallBackInToolbar && (
				<Access accessible={access[callBackPermissionName]}>
					<DeleteConfirm title='确定回写源系统?' onConfirm={() => handleCallBack(data.id)}>
						<Button
							size={'small'}
							icon={<CalculatorOutlined />}
							type={'link'}
							title={'回写源系统'}
							disabled={data.callBackStatus !== InstructionCallBackStatusEnum.CallBackFailed}
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

const OutInstructionOrderGrid: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const [selectedRows, setSelectedRows] = useState<any>(undefined);

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
		deletePermissionName,
		allocationPermissionName,
		releasePickTaskPermissionName,
		deletePickTaskPermissionName,
		verifyPermissionName,
		cancelVerifyPermissionName,
		manualShipmentPermissionName,
		callBackPermissionName,
		showCallBackInToolbar
	} = props;

	const onSelectionChanged = (e: SelectionChangedEvent) => {
		let selectedRows = e.api.getSelectedRows();
		setSelectedRows(selectedRows);
	};

	const { loading, run: generalPickTask } = useRequest(OutInstructionOrderAllotAsync, {
		manual: true,
		onSuccess: () => {
			message.success('分配库位成功');
		},
	});

	const { isLoading, mutateAsync: manualShipment } = useMutation(
		(body: any) => {
			return OutInstructionOrderManualShipmentAsync(body);
		},
		{
			onSuccess: () => {
				onRefresh();
			},
		}
	);

	const onCallBack = () => {
		if (!selectedRows || selectedRows.length === 0) {
			message.warning('请先选择一条记录');
			return;
		}
		const hide = message.loading('正在回写源系统,请稍后', 0);
		return OutInstructionOrderCallBackAsync({ id: selectedRows[0].id })
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

	const onVerify = () => {
		if (!selectedRows || selectedRows.length === 0) {
			message.warning('请先选择一条记录');
			return;
		}
		return OutInstructionOrderVerifyAsync({ id: selectedRows[0].id }).then(() => {
			onRefresh();
		});
	}

	const onCancelVerify = () => {
		if (!selectedRows || selectedRows.length === 0) {
			message.warning('请先选择一条记录');
			return;
		}
		return OutInstructionOrderCancelVerifyAsync({ id: selectedRows[0].id }).then(() => {
			onRefresh();
		});
	}

	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
					headerTitle={girdHeaderTitle}
					gridKey='appWMS.outInstruction.headerTable'
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let filter = params?.filter ? `${params?.filter},orderType=${orderType}` : `orderType=${orderType}`;

						let data = await OutInstructionOrderGetListAsync({
							Filter: filter,
							Sorting: params!.sorter || 'creationTime desc',
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
					toolBarRender={() => {
						return [
							<Access accessible={!!(access[createPermissionName] && createBtnName)} key={createPermissionName}>
								<Button
									type={'primary'}
									icon={<PlusOutlined />}
									onClick={() => {
										dropByCacheKey(window.location.pathname);
										closeTab(createRoute);
										history.push({ pathname: createRoute });
									}}
								>
									{createBtnName}
								</Button>
							</Access>,
							<Access accessible={!!(access[cancelVerifyPermissionName] && selectedRows && selectedRows.length > 0 && selectedRows[0] && selectedRows[0]?.isCreateByOutInstructionDemand)}>
								<Button
									onClick={() => {
										OutInstructionOrderCancelDemandMergeAsync({ id: selectedRows[0]?.id }).then(() => {
											onRefresh();
										});
									}} >
									取消合并
								</Button>
							</Access>,

							// <Access accessible={access[createPermissionName]} key={'update'}>
							// 	<UploadDialog onAfterSubmit={onRefresh} />
							// </Access>,

							// selectedRow && selectedRow.deliveryStatus == 5 ? (
							// 	<Access accessible={access[allocationPermissionName]}>
							// 		<PreLpnModal
							// 			masterSelect={{
							// 				wareHouse: { code: selectedRow?.wareHouseCode },
							// 			}}
							// 			itemSelect={{ materialItem: selectedRow?.materialItem, quantity: selectedRow.quantity }}
							// 			otherGetListFunc={() => {
							// 				return OutInstructionOrderPreAllocationAsync({ id: selectedRow.id });
							// 			}}
							// 			otherSubmitFunc={(arr: any) => {
							// 				return OutInstructionOrderSavePreAllocationAsync(
							// 					{
							// 						orderId: selectedRow.id,
							// 						pickTasks: arr.map(i => {
							// 							delete i.id;
							// 							return i;
							// 						}),
							// 					}
							// 				).then(res => {
							// 					message.success('操作成功');
							// 					onRefresh();
							// 				});
							// 			}}
							// 			onAfterSubmit={() => {
							// 				onRefresh();
							// 			}}
							// 		>
							// 			预分配
							// 		</PreLpnModal>
							// 	</Access>
							// ) : null,
							selectedRows && selectedRows.length > 0 ? (
								<Access accessible={access[allocationPermissionName]} key={allocationPermissionName}>
									<DeleteConfirm title='确定分配库位?' onConfirm={() => {
										generalPickTask({
											orders: selectedRows.map((i: any) => {
												return { id: i.id, itemIds: i.items.map((j: any) => j.id) }
											}) || []
										}).then(() => {
											onRefresh();
										});
									}}>
										<Button
											loading={loading}
											icon={<ApiOutlined />}
										>
											分配
										</Button>
									</DeleteConfirm>
								</Access>
							) : null,

							<Access accessible={!!(!!access[manualShipmentPermissionName] && selectedRows && selectedRows.length > 0)} key={manualShipmentPermissionName}>
								<DeleteConfirm title='确定发运?' onConfirm={() => {
									manualShipment({ id: selectedRows[0]?.id }).then(() => {
										onRefresh();
									});
								}}>
									<Button
										loading={isLoading}
										icon={<CarOutlined />}
									>
										发运
									</Button>
								</DeleteConfirm>
							</Access>,

							// 审核按钮
							<Access accessible={!!access[verifyPermissionName] && !!selectedRows && selectedRows.length > 0 && (selectedRows[0].orderStatus === 5 || selectedRows[0].orderStatus === 10)}>
								<DeleteConfirm title='确定审核?' onConfirm={onVerify}>
									<Button 
										icon={<AuditOutlined />}
									>
										审核
									</Button>
								</DeleteConfirm>
							</Access>,
							
							// 反审核按钮
							<Access accessible={!!access[cancelVerifyPermissionName] && !!selectedRows && selectedRows.length > 0 && selectedRows[0].orderStatus === 15}>
								<DeleteConfirm title='确定反审核?' onConfirm={onCancelVerify}>
									<Button 
										icon={<CloseOutlined />}
									>
										反审核
									</Button>
								</DeleteConfirm>
							</Access>,

							// 条件显示回写按钮在标题栏 - 只有回传状态为错误时才可用
							...(showCallBackInToolbar ? [
								<Access key="callBackToolbar" accessible={!!access[callBackPermissionName] && !!selectedRows && selectedRows.length > 0}>
									<DeleteConfirm title="确定回写源系统?" onConfirm={onCallBack}>
										<Button
											icon={<CalculatorOutlined />}
											disabled={selectedRows?.[0]?.callBackStatus !== InstructionCallBackStatusEnum.CallBackFailed}
										>
											回写源系统
										</Button>
									</DeleteConfirm>
								</Access>
							] : []),
						];
					}}
					onSelectionChanged={onSelectionChanged}
					rowSelection={'multiple'}
				>
					<AgGridColumn field={'orderNo'} headerName={intl.formatMessage({ id: 'WMS:OrderNo' })} width={140} />
					<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={120} />
					<AgGridColumn field={'materialOutCode'} headerName={'物料编码'} width={120} hideInTable />
					<AgGridColumn field={'taskOrder'} headerName={'任务令'} width={120} />
					<AgGridColumn field={'orderStatus'} headerName={intl.formatMessage({ id: 'WMS:OrderStatus' })} width={80} cellRenderer={OrderStatus} searchComponent={OrderQuery} />
					<AgGridColumn field={'isReCheck'} headerName={'是否复核'} width={80} type={'bool'} />
					<AgGridColumn
						field={'deliveryStatus'}
						headerName={intl.formatMessage({ id: 'WMS:DeliveryStatus' })}
						width={80}
						cellRenderer={DeliveryOrderStatus}
						searchComponent={OrderSelect}
					/>
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} />
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={150} />

					<AgGridColumn field={'consignee.Id'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeId' })} width={120} hide />
					<AgGridColumn field={'consignee.name'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeName' })} width={80} />
					<AgGridColumn field={'consignee.contact'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeContact' })} width={80} />
					<AgGridColumn field={'consignee.tel'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeTel' })} width={120} />
					<AgGridColumn field={'consignee.address'} headerName={intl.formatMessage({ id: 'WMS:ConsigneeAddress' })} width={120} />

					<AgGridColumn field={'requiredStartTime'} headerName={'需求开始时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'requiredCompletedTime'} headerName={'要求完成时间'} width={150} type={'dateTimeColumn'} />

					<AgGridColumn field={'allowOverIssuance'} headerName={'是否允许超发'} width={100} type={'bool'} />
					<AgGridColumn field={'allowableOverIssuanceCoefficient'} headerName={'允许超发系数'} width={100} />
					<AgGridColumn field={'allowUnderIssuance'} headerName={'是否允许欠料'} width={100} type={'bool'} />
					<AgGridColumn field={'isAutoGenShortageOrderOnUnderIssuance'} headerName={'欠料发运是否自动生成欠料单'} width={100} type={'bool'} />

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

					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} width={120} />
					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={80} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={80} />

					<AgGridColumn
						field={'action'}
						headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
						width={120}
						pinned={'right'}
						filter={false}
						cellRenderer={Options}
						cellRendererParams={{
							updateRoute,
							updatePermissionName,
							deletePermissionName,
							onRefresh,
							verifyPermissionName,
							cancelVerifyPermissionName,
							showCallBackInToolbar,
							callBackPermissionName,
						}}
					/>
				</AgGridPlus>
			</Allotment.Pane>

			<Allotment.Pane snap>
				<OutInstructionOrderItemGrid
					data={selectedRows && selectedRows.length > 0 ? selectedRows[0] : {}}
					masterTableRefresh={onRefresh}
					allocationPermissionName={allocationPermissionName}
					releasePickTaskPermissionName={releasePickTaskPermissionName}
					deletePickTaskPermissionName={deletePickTaskPermissionName}
				/>
			</Allotment.Pane>
		</Allotment>
	);
};

export default OutInstructionOrderGrid;
