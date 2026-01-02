import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef } from 'react';
import { useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { InInstructionOrderLpnSubItemGetListAsync } from '@/services/wms/InInstructionOrderLpnSubItem';

const InInstructionBatchPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<AgGridPlus
			gridRef={gridRef}
			headerTitle={'入库批次列表'}
			gridKey='appWMS.inInstruction.inInstructionBatch'
			request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
				let data = await InInstructionOrderLpnSubItemGetListAsync({
					Filter: params?.filter,
					Sorting: params!.sorter,
					SkipCount: params!.skipCount,
					MaxResultCount: params!.maxResultCount
				});
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				return requestData;
			}}
		>
			<AgGridColumn field={'inInstructionOrderNo'} headerName={'入库指令单号'} width={180} />
			<AgGridColumn field={'boxNumber'} headerName={'箱号'} width={150} />
			<AgGridColumn field={'batchNo'} headerName={'批次'} width={150} />
			<AgGridColumn field={'businessLotNumber'} headerName={'业务批次条码'} width={150} />
			<AgGridColumn field={'materialCode'} headerName={'物料内码'} width={150} />
			<AgGridColumn field={'materialOutCode'} headerName={'物料外码'} width={150} />
			<AgGridColumn field={'mfgPartNo'} headerName={'型号'} width={150} hideInSearch />
			<AgGridColumn field={'productionDateCode'} headerName={'生产日期Code'} width={120} />
			<AgGridColumn field={'quantity'} headerName={'数量'} width={100} hideInSearch />
			<AgGridColumn field={'origin'} headerName={'产地'} width={120} />
			<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
			<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
			<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
			<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
		</AgGridPlus>
	);
};

export default InInstructionBatchPage;

export const routeProps = {
	name: '入库批次列表',
};
