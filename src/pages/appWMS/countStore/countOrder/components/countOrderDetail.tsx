import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { Tabs, Tag } from 'antd';
import React, { useState } from 'react';
import { useAccess, useIntl } from 'umi';
import { CountOrderTaskItemDetailGetListAsync } from '@/services/wms/CountOrderTaskItemDetail';
import { CountOrderTaskItemGetListAsync } from '@/services/wms/CountOrderTaskItem';

const CountOrderDetail = (props: any) => {
	const { data, masterTableRefresh } = props;

	const intl = useIntl();
	const access = useAccess();

	const [tabKey, setTabKey] = useState('1');

	const DiffStatusTag_ = (value) => {
        switch (value) {
            case 5:
                return <Tag color={"blue"}>等待盘点</Tag>;
            case 10:
                return <Tag color={"orange"}>等待复盘</Tag>;
            case 15:
                return <Tag color={"yellow"}>等待确认差异信息</Tag>;
            case 20:
                return <Tag color={"green"}>完成</Tag>;
            default:
                return null;
        }

    }


	return (
		<Tabs
			style={{ height: '100%', backgroundColor: '#fff', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}
			activeKey={tabKey}
			onChange={key => {
				setTabKey(key);
			}}
		>
			<Tabs.TabPane tab='任务列表' key='1' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					headerTitle={'盘点任务查询'}
					gridKey="WMS.appWMSInStore.countOrder.TaskItem"
					search={false}
					params={{ data: data }}
					request={async (params: any) => {
						const orderNo = params?.data?.number;
						if (!orderNo) {
							return { success: true, data: [], total: 0 };
						}
						let data = await CountOrderTaskItemGetListAsync({
							Filter: `checkOrderNo = ${orderNo}`,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
				>
					<AgGridColumn field={'checkOrderNo'} headerName={"盘点清单号"} width={150} />
					<AgGridColumn field={'countTaskNo'} headerName={"盘点任务号"} width={150} />
					<AgGridColumn field={'warehouse.name'} headerName={'库房'} width={150} />
					<AgGridColumn field={'warehouseZoneCode'} headerName={"库区编码"} width={120} />
					<AgGridColumn field={'wareHouseLocationCode'} headerName={"库位编码"} width={150} />
					<AgGridColumn field={'material.code'} headerName={'物料编码'} width={120} />
					<AgGridColumn field={'material.outCode'} headerName={'物料外码'} width={120} />
					<AgGridColumn field={'material.description'} headerName={'物料描述'} width={140} />
					<AgGridColumn field={'itemType'} headerName={'物料ABC'} width={120} />
					<AgGridColumn field={'traceId'} headerName={"LPN"} width={150} />
					<AgGridColumn field={'needSerialNumber'} headerName={"是否需要盘点SN"} width={80} type={'bool'}/>
					<AgGridColumn field={'isOpen'} headerName={"是否开箱"} width={80} type={'bool'} />
					<AgGridColumn field={'systemQty'} headerName={"初盘库存"} width={120} hideInSearch={true} />
					<AgGridColumn field={'countQty'} headerName={"初盘数量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'diffQty'} headerName={"初盘差异数量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'countTime'} headerName={"初盘时间"} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'replaySystemQty'} headerName={"复盘系统量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'replayCountQty'} headerName={"复盘数量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'replayDiffQty'} headerName={"复盘差异量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'replayCountTime'} headerName={"复盘时间"} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'replayOperator'} headerName={"复盘人"} width={120} />
					<AgGridColumn field={'countTaskStatus'} headerName={"盘点任务状态"} width={120} cellRenderer={({ value }) => { return DiffStatusTag_(value) }} />
					<AgGridColumn field={'taskStatus'} headerName={"盘点状态描述"} width={120} />
				</AgGridPlus>
			</Tabs.TabPane>

			<Tabs.TabPane tab='任务箱明细' key='2' style={{ flex: 1, height: '100%' }}>
				<AgGridPlus
					headerTitle={'盘点任务明细'}
					gridKey="WMS.appWMSInStore.countOrder.TaskItemDetail"
					search={false}
					params={{ data: data }}
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						const orderNo = params?.data?.number;
						if (!orderNo) {
							return { success: true, data: [], total: 0 };
						}
						let data = await CountOrderTaskItemDetailGetListAsync({
							Filter: `checkOrderNo = ${orderNo}`,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
				>
					<AgGridColumn field={'checkOrderNo'} headerName={"盘点清单号"} width={150} />
					<AgGridColumn field={'countTaskNo'} headerName={"盘点任务号"} width={150} />
					<AgGridColumn field={'warehouse.code'} headerName={"库房编码"} hideInTable width={100} />
					<AgGridColumn field={'warehouse.name'} headerName={"库房名称"} hideInTable width={220} />
					<AgGridColumn field={'wareHouseLocationCode'} headerName={"库位编码"} width={100} />
					<AgGridColumn field={'materialItem.code'} headerName={"物料编码"} width={120} />
					<AgGridColumn field={'materialItem.outCode'} headerName={"物料外码"} width={120} />
					<AgGridColumn field={'materialItem.description'} headerName={'物料描述'} width={140} />
					<AgGridColumn field={'traceId'} headerName={"LPN"} width={120} />
					<AgGridColumn field={'boxNumber'} headerName={"箱号"} width={120} />
					<AgGridColumn field={'systemQty'} headerName={"系统数量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'countQty'} headerName={"盘点数量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'diffQty'} headerName={"差异量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'countTime'} headerName={"盘点时间"} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'replaySystemQty'} headerName={"复盘系统量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'replayCountQty'} headerName={"复盘量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'replayDiffQty'} headerName={"复盘差异量"} width={120} hideInSearch={true} />
					<AgGridColumn field={'replayCountTime'} headerName={"复盘时间"} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'replayOperator'} headerName={"复盘人"} width={120} />
					<AgGridColumn field={'differencesInfo'} headerName={"差异原因"} width={120} />
					<AgGridColumn field={'differencesUserName'} headerName={"差异用户名称"} width={120} />
					<AgGridColumn field={'differencesTime'} headerName={"差异维护时间"} width={120} type={'dateTimeColumn'} />
				</AgGridPlus>
			</Tabs.TabPane>
		</Tabs>
	);
};

export default CountOrderDetail;
