import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import {
	PickTaskItemGetListAsync,
	PickTaskItemManualAllocationAsync,
	PickTaskItemReleasePickTaskAsync,
} from '@/services/wms/PickTaskItem';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { PickStatus, PickType } from '@/pages/appWMS/outInstruction/_utils';
import { Button, message } from 'antd';
import { DownOutlined, CloseOutlined, ApiOutlined } from '@ant-design/icons';
import { PickTask } from '@/services/wmsPermission';
import PickTypeSelect from '../_utils/pickType';
import { downloadBlob } from '@/_utils';
import CustomerFormDialog from '@/pages/appWMS/outInstruction/pickTaskItem/components/checkUser';
import { PreRegisteredModel } from '../_utils/preRegisteredModel';
import PickTaskltemQuery from './components/pickTaskltemQuery';
import PreRegisteredModelSelect from '../_utils/preRegisteredModel';
import DownModal from './components/downModal';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import ChoseLpnModal from '../_utils/choseLpnModal';
import DeleteConfirm from '@/components/deleteConfirm';
const AssignMaterialAllocationPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const [maxResultCount, setMaxResultCount] = useState(200);
	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	// const reAllocation = (id: any) => {
	// 	const hide = message.loading('正在操作,请稍后', 0);
	// 	PickTaskItemReAllocationAsync({ id: id })
	// 		.then(() => {
	// 			onRefresh();
	// 		})
	// 		.finally(() => {
	// 			hide();
	// 		});
	// };

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		// PickTaskItemDeleteAsync({ ids: id })
		// 	.then(() => {
		// 		onRefresh();
		// 	})
		// 	.finally(() => {
		// 		hide();
		// 	});
	};

	const release = (selectData: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		// if (selectData.length > 20) {
		// 	message.error('释放预占最多不能超过20条数据！');
		// 	hide();
		// 	return;
		// }
		let ids = selectData.map(x => {
			return x.id;
		});
		PickTaskItemReleasePickTaskAsync(ids)
			.then(() => {
				onRefresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				initParams={{
					pickItemStatus: 10,
				}}
				headerTitle={'发料下架任务'}
				rowSelection={'multiple'}
				gridKey='appWMS.outInstruction.pickTaskItem'
				rowMultiSelectWithClick
				request={async params => {
					setMaxResultCount(params!.maxResultCount)
					let filter = params?.filter ? `${params?.filter}` : ``;
					let data: any = await PickTaskItemGetListAsync({
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
				toolBarRender={(gridApi: any, filter) => {
					const selectRows = gridApi?.getSelectedRows();
					return [
						// selectRows && selectRows!.length === 1 && selectRows![0].pickItemStatus < 20 ? (
						// 	<Access accessible={access[PickTask.Allocation]}>
						// 		<Button
						// 			type={'primary'}
						// 			onClick={() => {
						// 				reAllocation(selectRows[0].id!);
						// 			}}
						// 		>
						// 			重新分配
						// 		</Button>
						// 	</Access>
						// ) : null,
						selectRows && selectRows!.length === 1 && selectRows[0]?.pickItemStatus <= 5 ? (
							<Access accessible={access[PickTask['ManualAllocation']]}>
								<ChoseLpnModal
									masterSelect={{
										wareHouse: { code: selectRows[0]?.wareHouseCode },
									}}
									itemSelect={{ materialItem: selectRows[0]?.materialItem, quantity: selectRows[0].quantity }}
									otherSubmitFunc={items => {
										PickTaskItemManualAllocationAsync({ pickTaskId: selectRows[0].id, manualItems: items }).then(() => {
											message.success('操作成功');
											onRefresh();
										});
									}}
									type={'primary'}
								>
									手动分配
								</ChoseLpnModal>
							</Access>
						) : null,
						selectRows && selectRows!.length >= 1 && selectRows![0].pickItemStatus === 10 ? (
							<Access accessible={access[PickTask.AssignHandler]}>
								<CustomerFormDialog title='分配责任人' entityId={selectRows} onAfterSubmit={onRefresh} buttonProps={{ type: 'primary', icon: <ApiOutlined /> }}>
									分配责任人
								</CustomerFormDialog>
							</Access>
						) : null,
						selectRows && selectRows!.length >= 1 ? (
							<Access accessible={access[PickTask.ReleasePickTask]}>
								<Button
									type={'primary'}
									icon={<CloseOutlined />}
									onClick={() => {
										release(selectRows!);
									}}
								>
									释放预占
								</Button>
							</Access>
						) : null,
						selectRows && selectRows!.length === 1 && selectRows![0].preRegisteredModel === 10 ? (
							<Access accessible={true}>
								<DownModal picktask={selectRows[0]}>手工下架</DownModal>
							</Access>
						) : null,

						selectRows && selectRows!.length >= 1 && selectRows![0].pickItemStatus < 10 ? (
							<Access accessible={access[PickTask.Delete]}>
								<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(selectRows.map(x => x.id))}>
									<Button type={'primary'} danger title={intl.formatMessage({ id: 'AbpUi:Delete' })}>
										删除
									</Button>
								</DeleteConfirm>
							</Access>
						) : null,

						<Access accessible={access[PickTask.Export]} key={'Export'}>
							<Button
								icon={<DownOutlined />}
								onClick={() => {
									downloadBlob(`api/wms/shipment-allocation/export?filter=${filter}&MaxResultCount=${maxResultCount}`, '子库出库指令.xlsx');
								}}
							>
								导出
							</Button>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'outInstructionOrderNo'} headerName={intl.formatMessage({ id: 'WMS:ShipmentOrderNo' })} width={130} />
				<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={130} />
				<AgGridColumn field={'contractNo'} headerName={'合同号'} width={130} />
				<AgGridColumn field={'taskOrder'} headerName={intl.formatMessage({ id: 'WMS:TaskOrder' })} width={120} />
				<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} />
				<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={150} hideInSearch />
				<AgGridColumn field={'wareHouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={80} />
				<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150} />
				<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={100} />
				<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150} hideInSearch />

				<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150} />
				<AgGridColumn
					field={'pickItemStatus'}
					headerName={intl.formatMessage({ id: 'WMS:PickItemStatus' })}
					width={90}
					cellRenderer={PickStatus}
					searchComponent={PickTaskltemQuery}
				/>
				<AgGridColumn field={'qty'} headerName={'需求数量'} width={80} hideInSearch />
				<AgGridColumn field={'pickQty'} headerName={'捡料数量'} width={80} hideInSearch />

				<AgGridColumn field={'pickType'} headerName={intl.formatMessage({ id: 'WMS:PickType' })} width={90} cellRenderer={PickType} searchComponent={PickTypeSelect} hideInSearch />
				<AgGridColumn
					field={'preRegisteredModel'}
					headerName={intl.formatMessage({ id: 'WMS:PreRegisteredModel' })}
					width={90}
					cellRenderer={PreRegisteredModel}
					searchComponent={PreRegisteredModelSelect}
					hideInSearch
				/>
				<AgGridColumn field={'assigneeNameCopy'} headerName={intl.formatMessage({ id: 'WMS:AssigneeName' })}
					filter={false}
					sortable={false}
					cellRenderer={(params) => {
						return params.data.peoples
							?.filter((i) => i.assigneeName)
							.map((item) => item.assigneeName)
							.join('；')
					}}
					width={170} />
				<AgGridColumn field={'assigneeName'} headerName={intl.formatMessage({ id: 'WMS:AssigneeName' })}
					hideInTable={true}
					width={170} />
				<AgGridColumn field={'version'} headerName={'版本'} width={80} hideInSearch></AgGridColumn>
				<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={80}></AgGridColumn>
				<AgGridColumn field={'realRightCode'} headerName={'物权'} width={100}></AgGridColumn>
				<AgGridColumn field={'specifyProperty.sourceOrderNo'} headerName={'指定单号'} width={90} hideInSearch></AgGridColumn>
				<AgGridColumn field={'specifyProperty.dateCode'} headerName={'指定DC'} width={90} hideInSearch></AgGridColumn>
				<AgGridColumn field={'specifyProperty.lotNumber'} headerName={'指定批次'} width={90} hideInSearch></AgGridColumn>
				<AgGridColumn field={'specifyProperty.contractNo'} headerName={'指定合同号'} width={90} hideInSearch></AgGridColumn>
				<AgGridColumn field={'specifyProperty.taskOrderNo'} headerName={'指定任务令'} width={90} hideInSearch></AgGridColumn>
				<AgGridColumn field={'specifyProperty.boxNumber'} headerName={'指定箱号'} width={90} hideInSearch></AgGridColumn>
				<AgGridColumn field={'specifyProperty.serialNumber'} headerName={'指定序列号'} width={90} hideInSearch></AgGridColumn>
				<AgGridColumn field={'wareHouseTeam.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseTeamName' })} width={130} hideInSearch />

				<AgGridColumn field={'deliveryObject'} headerName={intl.formatMessage({ id: 'WMS:DeliveryObject' })} width={120} />
				<AgGridColumn field={'deliveryAddress'} headerName={intl.formatMessage({ id: 'WMS:DeliveryAddress' })} width={120} />

				<AgGridColumn field={'needStartTime'} headerName={intl.formatMessage({ id: 'WMS:NeedStartTime' })} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'actualStartTime'} headerName={intl.formatMessage({ id: 'WMS:ActualStartTime' })} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'finishTime'} headerName={intl.formatMessage({ id: 'WMS:FinishTime' })} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} width={100} />
				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={170} type={'dateTimeColumn'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={80} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={80} />
			</AgGridPlus>
		</>
	);
};

export default AssignMaterialAllocationPage;

export const routeProps = {
	name: '下架任务',
};
