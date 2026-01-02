import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { Button, Tabs, message } from 'antd';
import { Allotment } from 'allotment';
import { StockBinInfoGetStockByWorkJobCodeAsync, StockBinInfoPickStockBinByWorkJobAsync } from '@/services/wms/StockBinInfo';
import { PickStockBinByWorkJob } from '@/services/wmsPermission';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import WorkJobStockBinPage from './components/workJobStockBinPage';
import DeleteConfirm from '@/components/deleteConfirm';
import { saveAs } from '@/_utils';

const PickStockBinByWorkJobPage = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const [selectedRow, setSelectedRow] = useState<any>(undefined);

	const handlePick = (workJobCode: any, api: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		StockBinInfoPickStockBinByWorkJobAsync({ workJobCode })
			.then((blob) => {
				saveAs(blob, `${workJobCode}条码.txt`)
				onRefresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
					headerTitle={'任务库存列表'}
					rowSelection='single'
					gridKey="appWMS.stock.pickStockBinByWorkJob"
					onRowSelected={event => {
						if (event.node.isSelected()) {
							setSelectedRow(event.data);
						}
					}}
					request={async (params, sort, filterModel) => {
						let data = await StockBinInfoGetStockByWorkJobCodeAsync({ TaskOrder: filterModel.taskOrder, WareHouseCode: filterModel.wareHouseCode, MaterialOutCode: filterModel.materialOutCode });
						let requestData: any = { success: true, data: data.items!, total: data?.items?.length };
						return requestData;
					}}
					toolBarRender={(gridApi, filter) => {
						const selectRows = gridApi?.getSelectedRows();
						const taskOrder = selectRows && selectRows?.length > 0 ? selectRows[0].taskOrder : undefined;
						return [
							selectRows && selectRows!.length > 0 ? <Access accessible={access[PickStockBinByWorkJob.Pick]}>
								<DeleteConfirm title='确定下架?' onConfirm={() => handlePick(taskOrder, gridApi)}>
									<Button type={'primary'} danger title={intl.formatMessage({ id: 'AbpUi:Delete' })}>
										下架
									</Button>
								</DeleteConfirm>
							</Access> : null
						];
					}}
				>
					<AgGridColumn field={'taskOrder'} headerName={"任务令"} width={150}></AgGridColumn>
					<AgGridColumn field={'wareHouseCode'} headerName={"库房编码"} width={120}></AgGridColumn>
					<AgGridColumn field={'wareHouseName'} headerName={"库房名称"} width={150} hideInSearch></AgGridColumn>
					<AgGridColumn field={'materialCode'} headerName={"物料编码"} width={150} hideInSearch></AgGridColumn>
					<AgGridColumn field={'materialOutCode'} headerName={"物料外码"} width={150} ></AgGridColumn>
					<AgGridColumn field={'materialDescription'} headerName={"物料描述"} flex={1} hideInSearch></AgGridColumn>
					<AgGridColumn field={'qty'} headerName={"数量"} width={150} hideInSearch></AgGridColumn>
				</AgGridPlus>
			</Allotment.Pane>
			<Allotment.Pane snap>
				<Tabs style={{ height: '100%', background: '#fff', paddingLeft: 10 }}>
					<Tabs.TabPane tab='库位库存列表' key='1' style={{ height: '100%' }}>
						<WorkJobStockBinPage workJobCode={!selectedRow ? undefined : selectedRow!.taskOrder} />
					</Tabs.TabPane>
				</Tabs>
			</Allotment.Pane>
		</Allotment>
	);
};

export default PickStockBinByWorkJobPage;

export const routeProps = {
	name: '任务令库位库存',
};
