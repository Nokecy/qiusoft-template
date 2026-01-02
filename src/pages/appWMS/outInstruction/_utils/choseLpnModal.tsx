import React, { useMemo, useRef, useState } from 'react';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { Button, Modal, message } from 'antd';
import { StockBinInfoGetListAsync } from '@/services/wms/StockBinInfo';
import { sumBy } from 'lodash';
import { useIntl } from 'umi';
import { useBoolean } from 'ahooks';
import { GridApi } from 'ag-grid-community';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { OutInstructionOrderManualAllocationAsync } from '@/services/wms/OutInstructionOrder';
import moment from 'dayjs';
import { LocationType } from '../../baseInfo/_utils';
import ShipmentOrderProfileDrawer from '../pickTaskItem/components/stockModal';

const TraceIdInfoFormDialog = (props: any) => {
	const gridRef = useRef<GridRef>();
	const { masterSelect, itemSelect, otherSubmitFunc, otherGetListFunc, buttonProps, onAfterSubmit } = props;
	const intl = useIntl();
	const [gridApi, setGridApi] = useState<GridApi | undefined>();
	const [modalVisible, { setFalse: hide, setTrue: show }] = useBoolean();
	const [data, setData] = useState([]);

	const onOk = () => {
		//存在用户点编辑后不失去焦点不能保存数据的问题,所以
		gridApi?.stopEditing();
		let ls: any = gridApi?.getSelectedRows();
		let arr = ls
			.filter(x => x.quantity > 0)
			.map((i: any) => {
				return { traceId: i.traceId, quantity: i.quantity };
			});

		if (otherSubmitFunc) {
			otherSubmitFunc(arr);
			hide();
			return;
		}
		OutInstructionOrderManualAllocationAsync(
			{
				outInstructionId: masterSelect.id,
				outInstructionItemId: itemSelect.id,
				manualItems: arr,
			}
		).then(value => {
			hide();
			if (onAfterSubmit) onAfterSubmit(value);
		});
	};

	return (
		<>
			<Button type={'primary'} onClick={show} {...buttonProps}>
				{props.children}
			</Button>
			<Modal
				width={1240}
				title={props.children}
				open={modalVisible}
				maskClosable={false}
				destroyOnClose
				onCancel={() => {
					hide();
				}}
				onOk={onOk}
			>
				<AgGridPlus
					headerTitle={'库位列表'}
					gridRef={gridRef}
					params={{ wareHouseCode: masterSelect?.wareHouse?.code, materialCode: itemSelect?.materialCode || itemSelect?.materialItem?.code }}
					request={async (params?: any) => {
						const filter = params!.filter
							? `${params!.filter},availableQuantity>0,wareHouse.code=${params.wareHouseCode},materialItem.code=${params.materialCode}`
							: `availableQuantity>0,wareHouse.code=${params.wareHouseCode},materialItem.code=${params.materialCode}`;
						let data: any = otherGetListFunc
							? await otherGetListFunc()
							: await StockBinInfoGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						setData(data.items);
						return requestData;
					}}
					onGridReady={gridReadEvent => {
						setGridApi(gridReadEvent.api);
					}}
					style={{ height: 600 }}
					rowSelection={'multiple'}
					onRowSelected={e => {
						if (e.node.isSelected()) {
							const needQuantity = itemSelect?.quantity - itemSelect.shareQuantity;
							const selectRows = e.api.getSelectedRows();
							const totalQuantity = sumBy(selectRows, x => x.quantity || 0);
							if (totalQuantity < needQuantity) {
								const qty = needQuantity - totalQuantity;
								e.node.updateData({ ...e.data, quantity: qty <= e.data.availableQuantity ? qty : e.data.availableQuantity });
							}
						} else {
							e.node.updateData({ ...e.data, quantity: 0 });
						}
					}}
					suppressRowClickSelection
					pinnedBottomRowData={[
						{
							qty: sumBy(data, (x: any) => x.qty! * 1),
							preRegisteredQuantity: sumBy(data, (x: any) => x.preRegisteredQuantity! * 1),
							quantity: itemSelect?.quantity - itemSelect.shareQuantity,
							availableQuantity: sumBy(data, (x: any) => x.availableQuantity),
						},
					]}
				>
					<AgGridColumn field={'checkBox'} headerName={''} width={40} checkboxSelection hideInSearch />
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} cellRenderer={ShipmentOrderProfileDrawer}></AgGridColumn>
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={150}></AgGridColumn>
					<AgGridColumn field={'warehouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={100}></AgGridColumn>
					<AgGridColumn field={'warehouseZoneType'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneType' })} width={100} cellRenderer={LocationType}></AgGridColumn>
					<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150}></AgGridColumn>
					<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150}></AgGridColumn>
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120}></AgGridColumn>
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120}></AgGridColumn>
					<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150}></AgGridColumn>
					<AgGridColumn field={'version'} headerName={'版本'} width={80}></AgGridColumn>
					<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={80}></AgGridColumn>
					<AgGridColumn field={'realRightCode'} headerName={'物权'} width={100}></AgGridColumn>
					<AgGridColumn field={'internalLotNumber'} headerName={intl.formatMessage({ id: 'WMS:InternalLotNumber' })} width={150}></AgGridColumn>
					<AgGridColumn field={'contractNo'} headerName={'合同号'} width={180}></AgGridColumn>
					<AgGridColumn field={'taskOrder'} headerName={'任务令'} width={180}></AgGridColumn>
					<AgGridColumn field={'businessLotNumber'} headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })} width={140}></AgGridColumn>
					<AgGridColumn field={'putDate'} headerName={intl.formatMessage({ id: 'WMS:PutDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
					<AgGridColumn field={'productionDate'} headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
					<AgGridColumn field={'dateCode'} headerName={intl.formatMessage({ id: 'WMS:DateCode' })} width={80}></AgGridColumn>
					<AgGridColumn field={'putDate'} hideInSearch headerName={'库龄(天)'} width={80} ></AgGridColumn>

					<AgGridColumn field={'expiryDate'} headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
					<AgGridColumn field={'expiryCount'} headerName={intl.formatMessage({ id: 'WMS:ExpiryCount' })} width={80}></AgGridColumn>
					<AgGridColumn
						field={'overdueWarningDate'}
						headerName={intl.formatMessage({ id: 'WMS:OverdueWarningDate' })}
						width={110}
						type={'dateColumn'}
						initialSort={'desc'}
					></AgGridColumn>
					<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch></AgGridColumn>
					<AgGridColumn
						field={'preRegisteredQuantity'}
						headerName={intl.formatMessage({ id: 'WMS:PreRegisteredQuantity' })}
						hideInSearch
						width={100}
						
					></AgGridColumn>

					<AgGridColumn field={'isOpen'} headerName={intl.formatMessage({ id: 'WMS:IsOpen' })} width={80} type={'bool'}></AgGridColumn>
					<AgGridColumn field={'openTime'} headerName={intl.formatMessage({ id: 'WMS:OpenTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'}></AgGridColumn>
					<AgGridColumn field={'qualityStatus'} headerName={intl.formatMessage({ id: 'WMS:QualityStatus' })} width={100}></AgGridColumn>
					<AgGridColumn field={'isRoHS'} headerName={intl.formatMessage({ id: 'WMS:IsRoHS' })} width={100} type={'bool'} />
					<AgGridColumn field={'isMakeOver'} headerName={intl.formatMessage({ id: 'WMS:IsMakeOver' })} width={100} type={'bool'} />
					<AgGridColumn
						field={'availableQuantity'}
						headerName={intl.formatMessage({ id: 'WMS:AvailableQuantity' })}
						hideInSearch
						width={100}
						
						cellStyle={{ color: '#f30' }}
						pinned='right'
					></AgGridColumn>
					<AgGridColumn
						field={'quantity'}
						headerName={'分配数量(请填写)'}
						hideInSearch
						
						width={150}
						onCellClicked={({ data }) => {
							if (moment(data.expiryDate).valueOf() < moment().valueOf()) {
								message.error('已超期');
							}
						}}
						editable={({ data }) => {
							return moment(data.expiryDate).valueOf() < moment().valueOf() ? false : true;
						}}
						pinned='right'
						cellStyle={({ data }) => {
							return moment(data.expiryDate).valueOf() < moment().valueOf() ? { backgroundColor: '#ccc' } : { backgroundColor: '#20c77c' };
						}}
					></AgGridColumn>
				</AgGridPlus>
			</Modal>
		</>
	);
};

export default TraceIdInfoFormDialog;
