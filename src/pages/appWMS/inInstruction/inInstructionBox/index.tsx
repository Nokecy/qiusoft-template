import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef } from 'react';
import { useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { InInstructionOrderLpnItemGetListAsync } from '@/services/wms/InInstructionOrderLpnItem';

const InInstructionBoxPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<AgGridPlus
			gridRef={gridRef}
			headerTitle={'入库箱列表'}
			gridKey='appWMS.inInstruction.inInstructionBox'
			request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
				let data = await InInstructionOrderLpnItemGetListAsync({
					Filter: params?.filter,
					Sorting: params!.sorter,
					SkipCount: params!.skipCount,
					MaxResultCount: params!.maxResultCount
				});
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				return requestData;
			}}
		>
			<AgGridColumn field={'boxNumber'} headerName={'箱号'} width={150} />
			<AgGridColumn field={'traceId'} headerName={'LPN号'} width={180} />
			<AgGridColumn field={'inInstructionOrderNo'} headerName={'入库指令单号'} width={180} />
			<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={150} />
			<AgGridColumn field={'materialItem.code'} headerName={'物料编码'} width={150} />
			<AgGridColumn field={'materialItem.name'} headerName={'物料名称'} width={180} hideInSearch />
			<AgGridColumn field={'materialItem.category'} headerName={'物料分类'} width={120} hideInSearch />
			<AgGridColumn field={'quantity'} headerName={'每箱数量'} width={100} hideInSearch />
			<AgGridColumn field={'receiveQuantity'} headerName={'收货数量'} width={100} hideInSearch />
			<AgGridColumn field={'supplierCode'} headerName={'供应商编码'} width={120} hideInTable />
			<AgGridColumn field={'supplierName'} headerName={'供应商名称'} width={150} />
			<AgGridColumn field={'businessLotNumber'} headerName={'业务批次条码'} width={150} />
			<AgGridColumn field={'productionDate'} headerName={'生产日期'} width={120} type={'dateColumn'} />
			<AgGridColumn field={'dueDate'} headerName={'到期日期'} width={120} type={'dateColumn'} hideInSearch />
			<AgGridColumn field={'productionDateCode'} headerName={'生产日期Code'} width={120} hideInSearch />
			<AgGridColumn field={'psn'} headerName={'最小包装箱号'} width={150} />
			<AgGridColumn field={'minPacking'} headerName={'最小包装数'} width={100} hideInSearch />
			<AgGridColumn field={'printCount'} headerName={'打印次数'} width={100} hideInSearch />
			<AgGridColumn field={'manufacturerBrand'} headerName={'制造商品牌'} width={150} hideInSearch />
			<AgGridColumn field={'manufacturerName'} headerName={'制造商名称'} width={150} hideInSearch />
			<AgGridColumn field={'mfgPartNo'} headerName={'型号'} width={150} hideInSearch />
			<AgGridColumn field={'version'} headerName={'物料版本'} width={100} hideInSearch />
			<AgGridColumn field={'acProperty'} headerName={'AC属性'} width={100} hideInSearch />
			<AgGridColumn field={'actualProperty'} headerName={'实际物权'} width={120} hideInSearch />
			<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
			<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
			<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
			<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
		</AgGridPlus>
	);
};

export default InInstructionBoxPage;

export const routeProps = {
	name: '入库箱列表',
};
