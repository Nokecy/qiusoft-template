import React, { useEffect, useRef, useState } from 'react';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { Button, Modal } from 'antd';
import { useIntl } from 'umi';
import { useBoolean } from 'ahooks';
import { GridApi } from 'ag-grid-community';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';

const TraceIdInfoFormDialog = (props: any) => {
	const gridRef = useRef<GridRef>();
	const { otherSubmitFunc, otherGetListFunc, buttonProps } = props;
	const intl = useIntl();
	const [gridApi, setGridApi] = useState<GridApi | undefined>();
	const [modalVisible, { setFalse: hide, setTrue: show }] = useBoolean();
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		if (modalVisible)
			otherGetListFunc().then(res => {
				res.items.forEach(it => {
					it.qty = 0;
				});
				setDataSource(res.items);
			});
	}, [modalVisible]);

	return (
		<>
			<Button onClick={show} {...buttonProps}>
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
				onOk={async () => {
					//存在用户点编辑后不失去焦点不能保存数据的问题,所以
					gridApi?.stopEditing();
					let ls: any = gridApi?.getSelectedRows();
					if (ls.length === 0) {
						await gridApi?.selectAll();
						ls = gridApi?.getSelectedRows();
					}
					if (otherSubmitFunc) {
						otherSubmitFunc(ls.map(({ materialId, traceId, qty }) => ({ materialId, traceId: traceId, quantity: Number(qty) })));
						hide();
						return;
					}
				}}
			>
				<AgGridPlus
					gridRef={gridRef}
					search={false}
					hideTool
					dataSource={dataSource}
					onGridReady={gridReadEvent => {
						setGridApi(gridReadEvent.api);
					}}
					getRowStyle={() => ({ minHeight: 50 })}
					style={{ height: 600 }}
					rowSelection={'multiple'}
				>
					<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
					<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={120} />
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={120} hide />
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={120} />
					<AgGridColumn field={'productionDate'} headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
					<AgGridColumn field={'expiryDate'} headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>

					<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceID' })} width={200} />
					<AgGridColumn field={'availableQuantity'} headerName={'LPN可用数量'} pinned='right' hideInSearch  width={100} />
					<AgGridColumn
						field={'qty'}
						headerName={'需求数量(请填写)'}
						hideInSearch
						
						width={150}
						editable
						pinned='right'
						cellStyle={({}) => {
							return { backgroundColor: '#20c77c' };
						}}
					></AgGridColumn>
				</AgGridPlus>
			</Modal>
		</>
	);
};

export default TraceIdInfoFormDialog;
