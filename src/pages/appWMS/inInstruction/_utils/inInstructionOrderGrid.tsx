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
import { DeleteOutlined, EditOutlined, CalculatorOutlined, PlusOutlined, SendOutlined, AuditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import OrderStatus from '@/pages/_utils/orderStatus';
import { Button, message, Space } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { Access, useAccess, useIntl, dropByCacheKey, useLocation } from 'umi';
import { useSmartNavigation } from '@/components/smartNavigation';
import { ReceiptType, SourceOrderType } from '.';
import OrderQuery from './orderQuery';
import { SourceOrderTypeSelect } from './receiptType';
import { InstructionCallBackStatus, InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import { InstructionCallBackStatusEnum, instructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';
import InInstructionOrderStatus from './inInstructionOrderStatus';
import InInstructionOrderItemGrid from './inInstructionOrderItemGrid';
import { Allotment } from 'allotment';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';
import { Select } from '@formily/antd-v5';

const Options = (props: ICellRendererParams & any) => {
	const { data, onRefresh, updateRoute, updatePermissionName, deletePermissionName, verifyPermissionName, cancelVerifyPermissionName, showCallBackInToolbar, handleSmartNavigate } = props;
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
						handleSmartNavigate(updateRoute, { id: data.id });
					}}
				/>
			</Access>

			{/* 只有在不显示标题栏回写按钮时，才在操作列显示回写按钮 */}
			{!showCallBackInToolbar && (
				<Access accessible={access[deletePermissionName]}>
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

const InInstructionOrderGrid = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const location = useLocation();
	const [selectedRow, setSelectedRow] = useState<any>(undefined);
	const [filterAsnStatus, setfilterAsnStatus] = useState<any>(true);

	// 使用智能导航hook
	const smartNavigate = useSmartNavigation();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	// 包装smartNavigate为兼容的函数签名
	const handleSmartNavigate = (targetPath: string, newParams: Record<string, any> = {}) => {
		smartNavigate({
			targetPath,
			newParams,
			confirmTitle: '切换编辑记录确认',
			confirmContent: '当前正在编辑记录 {currentId}，是否要切换到编辑记录 {newId}？',
			okText: '是，切换',
			cancelText: '否，保持当前',
			debug: true
		});
	};

	// 多tab项目中的页面刷新方案 - 监听路径变化
	useEffect(() => {
		// 检查当前路径是否为列表页面（不是表单页面）
		const isListPage = location.pathname.includes('/appWMS/inInstruction/noOrderInInstruction') && 
						   !location.pathname.includes('/form');
		
		if (isListPage) {
			// 当切换到列表页面时延迟刷新，确保页面完全加载
			const timer = setTimeout(() => {
				onRefresh();
			}, 100);
			
			return () => clearTimeout(timer);
		}
	}, [location.pathname]); // 监听路径变化，当路径变化为列表页面时刷新

	const {
		createRoute,
		updateRoute,
		girdHeaderTitle,
		createBtnName,
		orderType,
		createPermissionName,
		updatePermissionName,
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
					headerTitle={`${girdHeaderTitle}`}
					gridKey='appWMS.inInstruction.headerTable'
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
							<Access key='createPermissionName' accessible={!!access[createPermissionName] && !!createBtnName}>
								<Button
									type={'primary'}
									icon={<PlusOutlined />}
									onClick={() => {
										handleSmartNavigate(createRoute);
									}}
								>{`${createBtnName}`}</Button>
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
					<AgGridColumn field={'sourceOrderNo'} headerName={'来源单据'} width={140} />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					
					<AgGridColumn field={'boxQuantity'} headerName={'箱数'} width={88} />

					<AgGridColumn
						field={'asnStatus'}
						headerName={intl.formatMessage({ id: 'WMS:AsnStatus' })}
						width={80}
						cellRenderer={ReceiptType}
						searchComponent={InInstructionOrderStatus}
					/>
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={100} />
					<AgGridColumn 
						field={'callBackStatus'} 
						headerName={'回传ERP'} 
						width={100} 
						valueEnum={instructionCallBackStatusEnum}
						searchComponent={InstructionCallBackStatusSelect} 
					/>

					<AgGridColumn field={'materialOutCode'} headerName={'物料编码'} width={120} hideInTable />

					<AgGridColumn field={'orderStatus'} headerName={intl.formatMessage({ id: 'WMS:OrderStatus' })} width={100} cellRenderer={OrderStatus} searchComponent={OrderQuery} />
					<AgGridColumn
						field={'sourceOrderType'}
						headerName={intl.formatMessage({ id: 'WMS:SourceOrderType' })}
						width={80}
						cellRenderer={SourceOrderType}
						searchComponent={SourceOrderTypeSelect}
					/>
					<AgGridColumn field={'warehouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} hide />
					<AgGridColumn field={'warehouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={120} />
					<AgGridColumn field={'sourceOrderProvider'} headerName={'来源系统'} width={140} />
					<AgGridColumn field={'sender.id'} headerName={intl.formatMessage({ id: 'WMS:SenderId' })} width={100} hide />
					<AgGridColumn field={'sender.name'} headerName={intl.formatMessage({ id: 'WMS:SenderName' })} width={100} />
					<AgGridColumn field={'sender.contact'} headerName={intl.formatMessage({ id: 'WMS:SenderContact' })} width={100} />
					<AgGridColumn field={'sender.tel'} headerName={intl.formatMessage({ id: 'WMS:SenderTel' })} width={100} />
					<AgGridColumn field={'sender.address'} headerName={intl.formatMessage({ id: 'WMS:SenderAddress' })} width={100} />
					<AgGridColumn field={'expectedArriveTime'} headerName={intl.formatMessage({ id: 'WMS:ExpectedArriveTime' })} width={120} type={'dateTimeColumn'} />


					<AgGridColumn field={'callBackError'} headerName={'回传错误信息'} width={100} />
					<AgGridColumn field={'startCallBackTime'} headerName={'开始回传时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'completedCallBackTime'} headerName={'完成回传时间'} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} />



					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />

					<AgGridColumn
						field={'action'}
						headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
						width={120}
						pinned={'right'}
						filter={false}
						cellRenderer={Options}
						cellRendererParams={{ onRefresh, updateRoute, updatePermissionName, deletePermissionName, verifyPermissionName, cancelVerifyPermissionName, showCallBackInToolbar, handleSmartNavigate }}
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

export default InInstructionOrderGrid;
