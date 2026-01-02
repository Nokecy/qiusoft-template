import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { MaterialPickItemGetUnBindListAsync } from '@/services/wms/MaterialPickItem';
import { GridApi } from 'ag-grid-community';
import { Button, Modal, Table, Tag, Transfer } from 'antd';
import React, { useState } from 'react';
import { useIntl, useRequest } from 'umi';

const BindItemDialog = (props: any) => {
	const { onSelected } = props;
	const [gridApi, setGridApi] = useState<GridApi | undefined>();
	const intl = useIntl();
	const [visible, setVisible] = useState(false);

	const onSubmit = () => {
		const rows = gridApi?.getSelectedRows();
		if (onSelected) onSelected(rows);
		setVisible(false);
	};

	const onCancel = () => {
		setVisible(false);
	};

	return (
		<>
			<Button
				type={'primary'}
				onClick={() => {
					setVisible(true);
				}}
			>
				绑定明细
			</Button>
			<Modal title={'绑定发货明细'} width={1200} bodyStyle={{ height: 500 }} destroyOnClose={true} open={visible} onCancel={onCancel} onOk={onSubmit}>
				<AgGridPlus
					headerTitle={'物料下架记录'}
					rowSelection={'multiple'}
					rowMultiSelectWithClick
					onGridReady={e => {
						setGridApi(e.api);
					}}
					request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
						let filter = params?.filter ? `${params?.filter}` : ``;
						let data = await MaterialPickItemGetUnBindListAsync({
							Filter: filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
					toolBarRender={() => {
						return [];
					}}
				>
					<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={150} />
					<AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} hideInTable width={120} />
					<AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} hideInTable width={220} />
					<AgGridColumn field={'wareHouseZoneCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={120} />
					<AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150} />
					<AgGridColumn field={'material.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={120} />
					<AgGridColumn field={'material.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120} />
					<AgGridColumn field={'material.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })} width={150} />
					<AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceID' })} width={140} />
					<AgGridColumn field={'newTraceID'} headerName={intl.formatMessage({ id: 'WMS:NewTraceID' })} width={150} />
					<AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch />

					<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={160} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={110} />
					<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={120} type={'dateTimeColumn'} />
					<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={110} />
				</AgGridPlus>
			</Modal>
		</>
	);
};

export default BindItemDialog;
