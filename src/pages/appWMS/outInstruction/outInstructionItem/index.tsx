import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { OutInstructionOrderGetItemListAsync } from '@/services/wms/OutInstructionOrder';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { PickItemStatus } from '@/pages/appWMS/outInstruction/_utils';
import orderltemQuery, { OrderQuery } from './components/orderltemQuery';
import { sumBy } from 'lodash';
import { PickItemStatusSelect } from '../_utils/pickItemStatus';
import OrderStatus from '@/pages/_utils/orderStatus';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { downloadBlob } from '@/_utils';
import { InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import { instructionCallBackStatusEnum, InstructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';

const OutInstructionOrderItemPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const Select = orderltemQuery;
	const [data, setData] = useState([]);
	const gridRef = useRef<GridRef>();
	return (
		<>
			<AgGridPlus
				headerTitle={'出库指令列表'}
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let filter = params?.filter ? `${params?.filter}` : ``;
					let data: any = await OutInstructionOrderGetItemListAsync({
						Filter: filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					setData(data.items);
					return requestData;
				}}
				gridRef={gridRef}
				gridKey='appWMS.outInstruction.outInstructionItem'
				rowSelection={'single'}
				pinnedBottomRowData={[{ quantity: sumBy(data, (x: any) => x.quantity! * 1), pickQuantity: sumBy(data, (x: any) => x.pickQuantity! * 1) }]}
				toolBarRender={(girdApi, filter) => {
					return [
						<Access accessible={true}  >
							<Button icon={<DownOutlined />} onClick={() => {
								downloadBlob(`/api/wms/out-instruction/export-item?filter=${filter}`, "出库指令明细.xlsx")
							}}>导出</Button>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'shipmentOrder.orderNo'} headerName={'出库指令号'} width={150} />
				<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={150} />
				<AgGridColumn field={'shipmentOrder.orderStatus'} headerName={'指令状态'} width={120} cellRenderer={OrderStatus} hideInSearch />
				<AgGridColumn field={'pickItemStatus'} headerName={'下架状态'} width={120} cellRenderer={PickItemStatus} searchComponent={PickItemStatusSelect} />
				<AgGridColumn field={'shipmentOrder.callBackStatus'} headerName={'回传状态'} width={100}
					valueEnum={[
						{ label: "不回传", value: 5, color: '#d9d9d9' },
						{ label: "合并回传", value: 6, color: '#91d5ff' },
						{ label: "等待回传", value: 10, color: '#108ee9' },
						{ label: "回传中", value: 15, color: '#2f54eb' },
						{ label: "回传完成", value: 20, color: '#52c41a' },
						{ label: "回传失败", value: 25, color: '#f5222d' }
					]}
				/>
				<AgGridColumn field={'shipmentOrder.orderType'} headerName={'指令类型'} width={100}
					valueEnum={[
						{ label: "销售出库", value: 5, color: "#108ee9" },
						{ label: "车间维修", value: 6, color: "#2db7f5" },
						{ label: "生产领料", value: 10, color: "#87d068" },
						{ label: "杂出", value: 11, color: "#faad14" },
						{ label: "采购退货", value: 15, color: "#f50" },
						{ label: "客供退货", value: 16, color: "#269182" },
						{ label: "转库出库", value: 20, color: "#1890ff" }
					]}
				/>
				<AgGridColumn field={'shipmentOrder.startCallBackTime'} headerName={'开始回传时间'} width={80} type={'dateTimeColumn'} />
				<AgGridColumn field={'shipmentOrder.completedCallBackTime'} headerName={'完成回传时间'} width={80} type={'dateTimeColumn'} />
				<AgGridColumn field={'shipmentOrder.wareHouse.code'} headerName={'库房编码'} width={100} />
				<AgGridColumn field={'shipmentOrder.wareHouse.name'} headerName={'库房名称'} width={200} hideInSearch />
				<AgGridColumn field={'materialCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
				<AgGridColumn field={'materialOutCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
				<AgGridColumn field={'materialDescript'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150} hideInSearch />
				<AgGridColumn 
					field={'itemCallBackStatus'} 
					headerName={'明细回传ERP'} 
					width={120} 
					valueEnum={instructionCallBackStatusEnum}
					searchComponent={InstructionCallBackStatusSelect} 
				/>
				<AgGridColumn field={'quantity'} headerName={'需求数量'} hideInSearch width={120} />
				<AgGridColumn field={'pickQuantity'} headerName={'下架数量'} hideInSearch width={120} />
				<AgGridColumn field={'specifyProperty.sourceOrderNo'} headerName={'指定单号'} width={90}></AgGridColumn>
				<AgGridColumn field={'specifyProperty.dateCode'} headerName={'指定DC'} width={90}></AgGridColumn>
				<AgGridColumn field={'specifyProperty.lotNumber'} headerName={'指定批次'} width={90}></AgGridColumn>
				<AgGridColumn field={'specifyProperty.contractNo'} headerName={'指定合同号'} width={90}></AgGridColumn>
				<AgGridColumn field={'specifyProperty.taskOrderNo'} headerName={'指定任务令'} width={90}></AgGridColumn>
				<AgGridColumn field={'specifyProperty.boxNumber'} headerName={'指定箱号'} width={90}></AgGridColumn>
				<AgGridColumn
					field={'shipmentOrder.requiredCompletedTime'}
					headerName={intl.formatMessage({ id: 'WMS:ShipmentOrderRequiredDeliveryTime' })}
					width={120}
					type={'dateColumn'}
				/>
				<AgGridColumn field={'shipmentOrder.consignee.address'} headerName={intl.formatMessage({ id: 'WMS:ShipmentOrderConsigneeAddress' })} width={120} />
				<AgGridColumn field={'shipmentOrder.remark'} headerName={'单据备注'} />
				<AgGridColumn field={'remark'} headerName={'明细备注'} />
				<AgGridColumn 
					field={'itemCallBackMessage'} 
					headerName={'明细回传信息'} 
					width={200}
				/>
				<AgGridColumn field={'itemCallBackTime'} headerName={'明细回传时间'} width={160} type={'dateTimeColumn'} />

				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
			</AgGridPlus>
		</>
	);
};

export default OutInstructionOrderItemPage;
export const routeProps = {
	name: '出库指令查询',
};