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
import { DeleteOutlined, EditOutlined, CalculatorOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import OrderStatus from '@/pages/_utils/orderStatus';
import { Button, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, history, useAccess, useIntl, dropByCacheKey } from 'umi';
import { ReceiptType, SourceOrderType } from '.';
import OrderQuery from './orderQuery';
import { SourceOrderTypeSelect } from './receiptType';
import { InstructionCallBackStatus, InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import InInstructionOrderStatus from './inInstructionOrderStatus';
import InInstructionOrderItemGrid from './inInstructionOrderItemGrid';
import { Allotment } from 'allotment';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';
import ImportPublic from '@/components/importPublic';

const Options = (props: ICellRendererParams & any) => {
	const { data, onRefresh, updateRoute, updatePermissionName, deletePermissionName, verifyPermissionName, cancelVerifyPermissionName } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		InInstructionOrderDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	const handleCallBack = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		InInstructionOrderCallBackAsync({ id })
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

			<Access accessible={access[deletePermissionName]}>
				<DeleteConfirm title='确定回写源系统?' onConfirm={() => handleCallBack(data.id)}>
					<Button size={'small'} icon={<CalculatorOutlined />} type={'link'} title={'回写源系统'} />
				</DeleteConfirm>
			</Access>

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
		receiveCompletedPermissionName
	} = props;


	const onReceiveCompleted = (params: any) => {
		InInstructionOrderReceiveCompleted({ id: selectedRow?.id }).then(() => {
			onRefresh();
		});
	}

	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
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
									onClick={() => {
										history.push({ pathname: `${createRoute}` });
									}}
								>{`${createBtnName}`}</Button>
							</Access>,

							<Access key='importPermissionName' accessible={access[importPermissionName]}>
								<ImportPublic onAfterSubmit={onRefresh} title="期初入库单据导入" downUrl="/api/wms/in-instruction-order/get-template" uploadUrl="/api/wms/in-instruction-order/import" />
							</Access>,

							<Access accessible={!!access[verifyPermissionName] && selectedRow?.orderStatus == 5}>
								<Button
									onClick={() => {
										InInstructionOrderSubmitAsync({ id: selectedRow?.id }).then(() => {
											onRefresh();
										});
									}}
								>
									提交
								</Button>
							</Access>,

							<Access accessible={!!access[verifyPermissionName] && selectedRow?.orderStatus == 10}>
								<Button
									onClick={() => {
										InInstructionOrderVerifyAsync({ id: selectedRow?.id }).then(() => {
											onRefresh();
										});
									}}
								>
									审核
								</Button>
							</Access>,

							<Access accessible={!!access[cancelVerifyPermissionName] && selectedRow?.orderStatus == 15 && selectedRow?.asnStatus < 30}>
								<Button
									onClick={() => {
										InInstructionOrderCancelVerifyAsync({ id: selectedRow.id }).then(() => {
											onRefresh();
										});
									}}
								>
									反审核
								</Button>
							</Access>,

							<Access accessible={!!access[receiveCompletedPermissionName] && selectedRow?.asnStatus < 30 && selectedRow?.orderStatus === 15}>
								<Button onClick={onReceiveCompleted}>
									收货完成
								</Button>
							</Access>,
						];
					}}
				>
					<AgGridColumn field={'select'} checkboxSelection headerName={''} width={40} />
					<AgGridColumn field={'orderNo'} headerName={'入库单号'} width={120} />
					<AgGridColumn field={'sourceOrderNo'} headerName={'来源单据'} width={100} />
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
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} hide />
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={120} />
					<AgGridColumn field={'sourceOrderProvider'} headerName={'来源系统'} width={120} />
					<AgGridColumn field={'sender.id'} headerName={intl.formatMessage({ id: 'WMS:SenderId' })} width={100} hide />
					<AgGridColumn field={'sender.name'} headerName={intl.formatMessage({ id: 'WMS:SenderName' })} width={100} />
					<AgGridColumn field={'sender.contact'} headerName={intl.formatMessage({ id: 'WMS:SenderContact' })} width={100} />
					<AgGridColumn field={'sender.tel'} headerName={intl.formatMessage({ id: 'WMS:SenderTel' })} width={100} />
					<AgGridColumn field={'sender.address'} headerName={intl.formatMessage({ id: 'WMS:SenderAddress' })} width={100} />
					<AgGridColumn field={'expectedArriveTime'} headerName={intl.formatMessage({ id: 'WMS:ExpectedArriveTime' })} width={120} type={'dateTimeColumn'} />

					<AgGridColumn field={'callBackStatus'} headerName={'回传ERP'} width={80} cellRenderer={InstructionCallBackStatus} searchComponent={InstructionCallBackStatusSelect} />
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
						cellRendererParams={{ onRefresh, updateRoute, updatePermissionName, deletePermissionName, verifyPermissionName, cancelVerifyPermissionName }}
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
