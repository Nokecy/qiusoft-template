import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef } from 'react';
import { useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { InInstructionOrderLpnItemGetSnListAsync } from '@/services/wms/InInstructionOrderLpnItem';

const InInstructionSNPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<AgGridPlus
			gridRef={gridRef}
			headerTitle={'入库SN列表'}
			gridKey='appWMS.inInstruction.inInstructionSN'
			request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
				let data = await InInstructionOrderLpnItemGetSnListAsync({
					Filter: params?.filter,
					Sorting: params!.sorter,
					SkipCount: params!.skipCount,
					MaxResultCount: params!.maxResultCount
				});
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				return requestData;
			}}
		>
			<AgGridColumn field={'serialNumber'} headerName={'序列号'} width={180} />
			<AgGridColumn field={'boxNumber'} headerName={'箱号'} width={150} />
			<AgGridColumn field={'traceId'} headerName={'LPN号'} width={180} />
			<AgGridColumn field={'inInstructionOrderNo'} headerName={'入库指令单号'} width={180} />
			<AgGridColumn field={'materialItem.code'} headerName={'物料编码'} width={150} />
			<AgGridColumn field={'materialItem.name'} headerName={'物料名称'} width={180} hideInSearch />
			<AgGridColumn field={'materialItem.category'} headerName={'物料分类'} width={120} hideInSearch />
			<AgGridColumn field={'productionDate'} headerName={'生产日期'} width={120} type={'dateColumn'} />
			<AgGridColumn field={'dueDate'} headerName={'到期日期'} width={120} type={'dateColumn'} hideInSearch />
			<AgGridColumn field={'printNum'} headerName={'打印次数'} width={100} hideInSearch />
			<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
			<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
			<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
			<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
		</AgGridPlus>
	);
};

export default InInstructionSNPage;

export const routeProps = {
	name: '入库SN列表',
};
