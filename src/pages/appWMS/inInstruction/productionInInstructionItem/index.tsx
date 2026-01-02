import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { Button, message, } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import { ProductionInInstructionItem } from '@/services/wmsPermission';
import { ProductionInInstructionItemGetListAsync, ProductionInInstructionItemCreateInInstructionAsync } from '@/services/wms/ProductionInInstructionItem';
import { sumBy } from 'lodash';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from "@/components/deleteConfirm";

const ProductionInInstructionItemPage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const [data, setData] = useState([]);

	const handleDelete = (sourceOrderNo: any, api: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		ProductionInInstructionItemCreateInInstructionAsync({ sourceOrderNo: sourceOrderNo })
			.then(() => {
				onRefresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<AgGridPlus
			gridRef={gridRef}
			headerTitle={'生产入库列表'}
			gridKey='appWMS.inInstruction.productionInInstructionItem'
			rowSelection={'single'}
			rowMultiSelectWithClick={true}
			request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
				let data: any = await ProductionInInstructionItemGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				setData(data.items);
				return requestData;
			}}
			pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.quantity! * 1) }]}
			toolBarRender={gridApi => {
				const selectRows = gridApi?.getSelectedRows();
				const selectIds = selectRows?.map(x => x.sourceOrderNo);
				return [
					selectRows && selectRows!.length > 0 ? (
						<Access accessible={access[ProductionInInstructionItem.CreateInInstruction]}>
							<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(selectIds![0], gridApi)}>
								<Button type={'primary'} danger icon={<CarOutlined />} title={"集合入库"}>
									集合入库
								</Button>
							</DeleteConfirm>
						</Access>
					) : null,
				];
			}}
		>
			<AgGridColumn field={'workshopCode'} headerName={"车间"} width={150} />
			<AgGridColumn field={'warehouse.code'} headerName={"库房编码"} width={120} />
			<AgGridColumn field={'warehouse.name'} headerName={"库房名称"} width={120} />
			<AgGridColumn field={'sourceOrderNo'} headerName={"任务令"} width={180} />
			<AgGridColumn field={'materialCode'} headerName={"物料编码"} width={120} />
			<AgGridColumn field={'traceId'} headerName={"LPN"} width={180} />
			<AgGridColumn field={'quantity'} headerName={"数量"} width={100} hideInSearch={true} />
			<AgGridColumn field={'isCallBack'} headerName={"回传"} width={150} />
			<AgGridColumn field={'callBackInInstructionOrderNo'} headerName={"入库指令号"} width={150} />
			<AgGridColumn field={'callBackTime'} headerName={"回传时间"} width={180} type={'dateTimeColumn'} />
		</AgGridPlus>
	);
};

export default ProductionInInstructionItemPage;

export const routeProps = {
	name: '流水入库明细',
};