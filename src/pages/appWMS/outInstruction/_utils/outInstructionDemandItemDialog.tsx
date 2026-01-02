import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { OutInstructionDemandItemGetItemsByOutInstructionOrderIdAndMaterialIdAsync } from '@/services/wms/OutInstructionDemandItem';
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { useIntl } from 'umi';
import { EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { instructionCallBackStatusEnum } from '@/pages/appWMS/_utils/instructionCallBackStatusEnum';
import { InstructionCallBackStatusSelect } from '@/pages/appWMS/_utils';

/**
 * 查看需求明细弹出框
 * @param props
 * @returns
 */
const OutInstructionDemandItemDialog = (props: any) => {
	const { data, buttonProps } = props;
	const intl = useIntl();
	const [visible, setVisible] = useState(false);
	const gridRef = useRef<GridRef>();

	const handleOpen = () => {
		setVisible(true);
	};

	const handleClose = () => {
		setVisible(false);
	};

	const handleRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<>
			<Button
				size={'small'}
				icon={<EyeOutlined />}
				type={'link'}
				title={'查看需求明细'}
				onClick={handleOpen}
				{...buttonProps}
			/>

			<Modal
				title="需求明细"
				open={visible}
				onCancel={handleClose}
				onOk={handleClose}
				width={1400}
				destroyOnClose
				styles={{
					body: {
						height: '600px',
						overflow: 'hidden',
					},
				}}
				footer={[
					<Button key="refresh" onClick={handleRefresh}>
						刷新
					</Button>,
					<Button key="close" type="primary" onClick={handleClose}>
						关闭
					</Button>,
				]}
			>
				<div style={{ height: '100%' }}>
					<AgGridPlus
						gridRef={gridRef}
						gridKey="appWMS.outInstruction.outInstructionDemandItem.dialog"
						search={false}
						pagination={true}
						request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
							if (!data?.shipmentOrderId || !data?.materialId) {
								return { success: true, data: [], total: 0 };
							}
							// 使用专门的接口查询出库指令和物料对应的需求明细
							const result = await OutInstructionDemandItemGetItemsByOutInstructionOrderIdAndMaterialIdAsync({
								outInstructionOrderId: data.shipmentOrderId,
								materialId: data.materialItem.id,
								sorting: params?.sorter,
								skipCount: params?.skipCount,
								maxResultCount: params?.maxResultCount,
							});

							return {
								success: true,
								data: result.items || [],
								total: result.totalCount || 0,
							};
						}}
					>
					<AgGridColumn
						field={'rowIndex'}
						headerName={'序号'}
						width={80}
						valueGetter="node.rowIndex + 1"
						hideInSearch
					/>
					<AgGridColumn
						field={'creationTime'}
						headerName={'创建日期'}
						width={180}
						type={'dateTimeColumn'}
						initialSort={'desc'}
					/>
					<AgGridColumn
						field={'sourceOrderNo'}
						headerName={'出入库指令号'}
						width={150}
					/>
					<AgGridColumn
						field={'materialCode'}
						headerName={'物料编码'}
						width={150}
					/>
					<AgGridColumn
						field={'materialOutCode'}
						headerName={'物料外码'}
						width={150}
					/>
					<AgGridColumn
						field={'materialDescription'}
						headerName={'物料描述'}
						width={250}
					/>
					<AgGridColumn
						field={'version'}
						headerName={'版本'}
						width={100}
					/>
					<AgGridColumn
						field={'quantity'}
						headerName={'需求数量'}
						width={120}
						hideInSearch
						type={'numericColumn'}
					/>
					<AgGridColumn
						field={'pickQuantity'}
						headerName={'下架数量'}
						width={120}
						hideInSearch
						type={'numericColumn'}
					/>
					<AgGridColumn
						field={'sharedQuantity'}
						headerName={'预占数量'}
						width={120}
						hideInSearch
						type={'numericColumn'}
					/>
					<AgGridColumn
						field={'itemCallBackStatus'}
						headerName={'明细回传状态'}
						width={140}
						valueEnum={instructionCallBackStatusEnum}
						searchComponent={InstructionCallBackStatusSelect}
					/>
					<AgGridColumn
						field={'itemCallBackTime'}
						headerName={'明细回传时间'}
						width={180}
						type={'dateTimeColumn'}
					/>
					<AgGridColumn
						field={'itemCallBackMessage'}
						headerName={'明细回传信息'}
						width={200}
					/>
					<AgGridColumn
						field={'contractNo'}
						headerName={'合同号'}
						width={150}
					/>
					<AgGridColumn
						field={'taskOrder'}
						headerName={'任务令'}
						width={150}
					/>
					<AgGridColumn
						field={'realRightCode'}
						headerName={'物权编码'}
						width={120}
					/>
					<AgGridColumn
						field={'acProperty'}
						headerName={'AC属性'}
						width={100}
					/>
					<AgGridColumn
						field={'creator'}
						headerName={intl.formatMessage({ id: 'WMS:Creator' })}
						width={120}
					/>
					<AgGridColumn
						field={'lastModifier'}
						headerName={intl.formatMessage({ id: 'WMS:LastModifier' })}
						width={120}
					/>
				</AgGridPlus>
				</div>
			</Modal>
		</>
	);
};

export default OutInstructionDemandItemDialog;
