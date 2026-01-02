import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl, history } from '@umijs/max';
import { Button, Space, Tabs, Tag, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import { OutInstructionDemandDeleteAsync, OutInstructionDemandMergeAsync, OutInstructionDemandReCallBackAsync } from '@/services/wms/OutInstructionDemand';
import { OutInstructionDemandItemGetListAsync } from '@/services/wms/OutInstructionDemandItem';
import { DemandCallBackStatus, DemandStatus, OrderTypeRenderStatus } from '../../_utils/orderTypeRender';
import confirmationButton from '@/pages/_utils/confirmationButton';
import { Allotment } from 'allotment';
import { PreRegisteredModel } from '@/pages/appWMS/outInstruction/_utils/preRegisteredModel';
import outInstructionDemandItem from '@/pages/appWMS/outInstruction/outInstructionDemand/components/outInstructionDemandItem';

/**
 * 出库需求列表
 * @returns
 */
const OutInstructionDemandItemPage = () => {
	const intl = useIntl();
	const gridRef = useRef<GridRef>();
	const access = useAccess();
	const [selectedRow, setSelectedRow] = useState<any>([]);

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const handleMerge = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return OutInstructionDemandMergeAsync({
			ids: selectedRow.map(i => {
				return i.id;
			}),
		})
			.then(() => {
				onRefresh();
				message.success('操作成功');
			})
			.finally(() => {
				hide();
			});
	};

	const workStatus = (props: any) => {
		const { value } = props;

		const renderStatus = (status: number) => {
			switch (status) {
				case 0:
					return <Tag color='red'>等待处理</Tag>;
				case 5:
					return <Tag color='orange'>部分下发</Tag>;
				case 10:
					return <Tag color='blue'>指令已下发</Tag>;
				case 11:
					return <Tag color='purple'>部分交付</Tag>;
				case 20:
					return <Tag color='green'>已交付</Tag>;
				default:
					return <Tag color='gray'>未知状态</Tag>;
			}
		};

		return renderStatus(value);
	};

	const columnDefs: any = [
		{
			headerName: '来源单号',
			field: 'sourceOrderNo',
			width: 130,
		},
		{
			headerName: '物料编码',
			field: 'materialCode',
			width: 110,
		},
		{
			headerName: '物料外码',
			field: 'materialOutCode',
			width: 110,
		},
		{
			headerName: '处理状态',
			field: 'status',
			width: 110,
			cellRenderer: workStatus,
		},
		{
			headerName: '明细回传状态',
			field: 'itemCallBackStatus',
			width: 110,
			cellRenderer: DemandCallBackStatus,
		},
		{
			headerName: '明细回传时间',
			field: 'itemCallBackTime',
			width: 140,
			type: 'dateTimeColumn',
		},
		{
			headerName: '明细回传消息',
			field: 'itemCallBackMessage',
			width: 200,
		},
		{
			headerName: '物料描述',
			field: 'materialDescription',
			width: 180,
		},
		{
			headerName: '物料版本',
			field: 'version',
			width: 100,
		},
		{
			headerName: '物权编码',
			field: 'realRightCode',
			width: 100,
		},
		{
			headerName: '物料下架预占模式',
			field: 'preRegisteredModel',
			width: 140,
			cellRenderer: PreRegisteredModel,
		},
		{
			headerName: 'AC属性',
			field: 'acProperty',
			width: 100,
		},
		{
			headerName: '销售合同号',
			field: 'contractNo',
			width: 110,
		},
		{
			headerName: '任务令',
			field: 'taskOrder',
			width: 100,
		},
		{
			headerName: '交付数量',
			field: 'quantity',
			width: 90,
		},
		{
			headerName: '分配数量',
			field: 'sharedQuantity',
			width: 90,
		},
		{
			headerName: '下架数量',
			field: 'pickQuantity',
			width: 90,
		},
		{
			headerName: '创建人',
			field: 'creator',
			width: 90,
		},
		{
			headerName: '创建时间',
			field: 'creationTime',
			width: 140,
			type: 'dateTimeColumn',
		},
		{
			headerName: '最后修改人',
			field: 'lastModifier',
			width: 90,
		},
		{
			headerName: '最后修改时间',
			field: 'lastModificationTime',
			width: 140,
			type: 'dateTimeColumn',
		},
		{
			headerName: '操作',
			field: '',
			width: 80,
			pinned: 'right',
			filter: false,
			cellRendererParams: { onRefresh },
		},
	];

	return (
		<>
			<Allotment vertical={true}>
				<Allotment.Pane>
					<AgGridPlus
						gridRef={gridRef}
						headerTitle='出库需求明细列表'
						gridKey='appWMS.appOutInstruction.outInstructionDemand'
						request={async (params: any) => {
							setSelectedRow([]);
							let data = await OutInstructionDemandItemGetListAsync({
								Filter: params?.filter,
								MaxResultCount: params!.maxResultCount,
								SkipCount: params!.skipCount,
								Sorting: params!.sorter!,
							});
							return { success: true, data: data.items!, total: data.totalCount };
						}}
						rowSelection={'multiple'}
						onRowSelected={event => {
							let selectedRows = event.api.getSelectedRows();
							setSelectedRow(selectedRows);
						}}
						toolBarRender={(gridApi, filter) => {
							return [];
						}}
						columnDefs={columnDefs}
					></AgGridPlus>
				</Allotment.Pane>
			</Allotment>
		</>
	);
};

export default OutInstructionDemandItemPage;
export const routeProps = {
	name: '出库需求明细',
};
