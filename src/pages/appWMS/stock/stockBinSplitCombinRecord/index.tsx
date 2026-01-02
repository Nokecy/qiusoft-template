import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Allotment } from 'allotment';
import React, { useRef, useState } from 'react';
import { Tag } from 'antd';
import { StockBinSplitCombinRecordGetListAsync, StockBinSplitCombinRecordGetAsync } from '@/services/wms/StockBinSplitCombinRecord';

import { useLocation } from 'umi';
const StockBinSplitCombinRecordPage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const [selectedRow, setSelectedRow] = useState<any>(undefined);

	const onSelectionChanged = (e: SelectionChangedEvent) => {
		let selectedRows = e.api.getSelectedRows();
		setSelectedRow(selectedRows[0]);
	};
	return (
		<>
			<Allotment vertical={true}>
				<Allotment.Pane>
					<AgGridPlus
						headerTitle={'库位拆合记录'}
						gridKey="appWMS.stock.stockBinSplitCombinRecord"
						gridRef={gridRef}
						request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
							let data = await StockBinSplitCombinRecordGetListAsync({
								Filter: params?.filter,
								Sorting: params!.sorter,
								SkipCount: params!.skipCount,
								MaxResultCount: params!.maxResultCount,
							});
							data.items?.forEach((i: any) => {
								i.isDefault = Boolean(i.isDefault);
							});
							let requestData: any = { success: true, data: data.items!, total: data.totalCount };
							return requestData;
						}}
						onSelectionChanged={onSelectionChanged}
						rowSelection={'single'}
					>
						<AgGridColumn field={'traceId'} headerName={'载具号'} width={150} />
						<AgGridColumn field={'contractNo'} headerName={'合同号'} width={150} />
						<AgGridColumn field={'workJobCode'} headerName={'任务令'} width={120} />
						<AgGridColumn field={'materialCode'} headerName={'物料编码'} width={120} />
						<AgGridColumn field={'materialOutCode'} headerName={'物料外码'} width={120} />
						<AgGridColumn field={'materialDescription'} headerName={'物料描述'} flex={1} />
						<AgGridColumn
							field={'recordType'}
							headerName={'类型'}
							width={120}
							cellRenderer={({ value }) => {
								switch (value) {
									case 5:
										return <Tag color='warning'>拆箱</Tag>;
									case 10:
										return <Tag color='success'>合箱</Tag>;
									default:
										return '未知';
								}
							}}
						/>
						<AgGridColumn field="creator" headerName="创建人" width={90} />
						<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
						<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
						<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
					</AgGridPlus>
				</Allotment.Pane>

				<Allotment.Pane snap>
					<AgGridPlus
						search={false}
						hideTool
						params={{ id: selectedRow?.id }}
						request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
							if (!params?.id) return { success: true, data: [], total: 0 };
							let data = await StockBinSplitCombinRecordGetAsync({ id: params?.id });
							let requestData: any = { success: true, data: data.items!, total: data.items?.length };
							return requestData;
						}}
					>

						<AgGridColumn field={'sourceTraceId'} headerName={'载具号'} width={150} />
						<AgGridColumn
							field={'recordType'}
							headerName={'类型'}
							width={120}
							cellRenderer={({ value }) => {
								switch (value) {
									case 5:
										return <Tag color='warning'>拆箱</Tag>;
									case 10:
										return <Tag color='success'>合箱</Tag>;
									default:
										return '未知';
								}
							}}
						/>
						<AgGridColumn field={'sourceBoxNumber'} headerName={'箱号'} width={150} />
						<AgGridColumn field={'newSourceBoxNumber'} headerName={'新的源箱号'} width={150} />
						<AgGridColumn field={'targetTraceId'} headerName={'目标载具号'} width={150} />
						<AgGridColumn field={'targetBoxNumber'} headerName={'目标箱号'} width={150} />
						<AgGridColumn field={'materialCode'} headerName={'物料编码'} width={150} />
						<AgGridColumn field={'materialOutCode'} headerName={'物料外码'} width={150} />
						<AgGridColumn field={'materialDescription'} headerName={'物料描述'} width={150} />
						<AgGridColumn field={'quantity'} headerName={'移动数量'} width={100} hideInSearch={true} />
						<AgGridColumn field="creator" headerName="创建人" width={90} />
						<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
						<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
						<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
					</AgGridPlus>
				</Allotment.Pane>
			</Allotment>
		</>
	);
};

export default StockBinSplitCombinRecordPage;
export const routeProps = {
	name: '库位拆合记录',
};
