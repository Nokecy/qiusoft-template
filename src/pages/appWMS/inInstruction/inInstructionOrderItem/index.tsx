import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { InInstructionOrderGetItemListAsync } from '@/services/wms/InInstructionOrder';
import { sumBy } from 'lodash';
import React, { useRef, useState } from 'react';
import { useAccess, useIntl, Access } from 'umi';
import { ReceiptType, InInstructionOrderStatusSelect, SourceOrderType } from '../_utils';
import { Button } from 'antd';
import { DownOutlined } from "@ant-design/icons"
import { downloadBlob } from '@/_utils';
import { SourceOrderTypeSelect } from '../_utils/receiptType';
import { InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';
import { instructionCallBackStatusEnum, InstructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';

const InInstructionOrderItemPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const [data, setData] = useState([]);

	return (
		<>
			<AgGridPlus
				headerTitle={'到货通知单列表'}
				gridKey='appWMS.inInstruction.inInstructionOrderItem'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data: any = await InInstructionOrderGetItemListAsync({
						Filter: params?.filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = {
						success: true,
						data: data.items!,
						total: data.totalCount,
					};
					setData(data.items);
					return requestData;
				}}
				pinnedBottomRowData={[
					{
						deliveryQty: sumBy(data, (x: any) => x.deliveryQty! * 1),
						receiveQty: sumBy(data, (x: any) => x.deliveryQty! * 1),
						putQty: sumBy(data, (x: any) => x.putQty! * 1),
					},
				]}
				toolBarRender={(girdApi, filter) => {
					return [
						<Access accessible={true}  >
							<Button icon={<DownOutlined />} onClick={() => {
								downloadBlob(`/api/wms/in-instruction-order/export-item-list?filter=${filter}`, "入库指令明细.xlsx")
							}}>导出</Button>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'inInstructionOrder.orderNo'} headerName={'入库单号'} width={180} />
				<AgGridColumn field={'inInstructionOrder.sourceOrderType'} headerName={'指令类型'} width={100}
					cellRenderer={SourceOrderType}
					searchComponent={SourceOrderTypeSelect} />
				<AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={180} />
				<AgGridColumn field={'inInstructionOrder.asnStatus'} headerName={'状态'} width={120} cellRenderer={ReceiptType} searchComponent={InInstructionOrderStatusSelect} />
				<AgGridColumn field={'inInstructionOrder.warehouse.code'} headerName={'库房编码'} width={120} />
				<AgGridColumn field={'inInstructionOrder.warehouse.name'} headerName={'库房名称'} width={120} />
				<AgGridColumn field={'inInstructionOrder.callBackStatus'} headerName={'回传状态'} width={100}
					valueEnum={[
						{ label: "不回传", value: 5, color: '#d9d9d9' },
						// { label: "合并回传", value: 6, color: '#91d5ff' },
						{ label: "等待回传", value: 10, color: '#108ee9' },
						{ label: "回传中", value: 15, color: '#2f54eb' },
						{ label: "回传完成", value: 20, color: '#52c41a' },
						// { label: "回传失败", value: 25, color: '#f5222d' }
					]
					}
				/>
				<AgGridColumn field={'inInstructionOrder.sender.name'} headerName={'入库人'} width={150} />
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} />
				<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} />
				<AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150} />
				<AgGridColumn 
					field={'itemCallBackStatus'} 
					headerName={'明细回传ERP'} 
					width={120} 
					valueEnum={instructionCallBackStatusEnum}
					searchComponent={InstructionCallBackStatusSelect} 
				/>
				<AgGridColumn field={'deliveryQty'} headerName={'入库数量'} width={80} hideInSearch />
				<AgGridColumn field={'receiveQty'} headerName={'接收数量'} width={80} hideInSearch />
				<AgGridColumn field={'putQty'} headerName={'上架数量'} width={80} hideInSearch />
				<AgGridColumn field={'inInstructionOrder.startCallBackTime'} headerName={'开始回传时间'} width={80} type={'dateTimeColumn'} />
				<AgGridColumn field={'inInstructionOrder.completedCallBackTime'} headerName={'完成回传时间'} width={80} type={'dateTimeColumn'} />
				<AgGridColumn field={'inInstructionOrder.remark'} headerName={'单据备注'} width={160} />
				<AgGridColumn field={'remark'} headerName={'明细备注'} width={160} />
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

export default InInstructionOrderItemPage;
export const routeProps = {
	name: '入库指令明细',
};
