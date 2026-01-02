import { StockingOrderGetAsync } from '@/services/smarterp/StockingOrder';
import { Descriptions, Drawer, Skeleton, Button, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import StockingItemProfile from './stockingItemProfile';
import { AgGridPlus } from '@/components/agGrid';
import { downloadBlob } from '@/_utils';
import { DownloadOutlined, DeleteColumnOutlined, SettingOutlined } from '@ant-design/icons';
import StockingBomItemProfile from './stockingBomItemProfile';

const StockingOrderProfile = (props: any) => {
	const { content, stockingOrderId } = props;
	const [visible, setVisible] = useState(false);

	const { data: stockingOrder, loading, run: getStockingOrder } = useRequest(StockingOrderGetAsync, { manual: true });

	useEffect(() => {
		if (visible) {
			getStockingOrder({ id: stockingOrderId });
		}
	}, [visible]);

	// 导出BOM
	const exportList = (id: number) => {
		const hideBatch = message.loading('正在导出备货单BOM,请稍后', 0);
		downloadBlob(`/api/smart-erp/stocking-order/export-stocking-bom-item/${id}`, '备货单BOM.xlsx').then(() => {
			hideBatch();
			message.success('导出成功');
		}).catch((error) => {
			hideBatch();
			console.error('导出备货单BOM失败:', error);
			message.error('导出失败,请联系管理员');
		});
	};

	// 导出合并BOM
	const exportMergeList = (id: number) => {
		const hideBatch = message.loading('正在导出合并备货单BOM,请稍后', 0);
		downloadBlob(`/api/smart-erp/stocking-order/export-merge-stocking-bom-item/${id}`, '合并备货单BOM.xlsx').then(() => {
			hideBatch();
			message.success('导出成功');
		}).catch((error) => {
			hideBatch();
			console.error('导出合并备货单BOM失败:', error);
			message.error('导出失败,请联系管理员');
		});
	};

	return (
		<>
			<a
				onClick={() => {
					setVisible(true);
				}}
			>
				{content}
			</a>
			<Drawer
				width={1200}
				placement='right'
				closable={true}
				open={visible}
				onClose={() => {
					setVisible(false);
				}}
			>
				<Skeleton loading={loading} active>
					<Descriptions title='备货单信息'>
						<Descriptions.Item label='备货单号'>{stockingOrder?.stockingOrderNo}</Descriptions.Item>
						<Descriptions.Item label='备货计划名称'>{stockingOrder?.stockingOrderName}</Descriptions.Item>
						<Descriptions.Item label='开始周'>{stockingOrder?.startWeek}</Descriptions.Item>
						<Descriptions.Item label='客户编码'>{stockingOrder?.customerCode}</Descriptions.Item>
						<Descriptions.Item label='生产日期'>{stockingOrder?.productionDate}</Descriptions.Item>
						<Descriptions.Item label='备注'>{stockingOrder?.memo}</Descriptions.Item>
					</Descriptions>

					<AgGridPlus
						dataSource={stockingOrder?.items}
						gridKey="stocking-order-items"
						search={false}
						hideTool
						columnDefs={[
							{
								field: 'materialCode',
								headerName: '物料编码',
								width: 140,
								cellRenderer: ({ value, data }: any) => {
									return <StockingItemProfile content={value} attributes={data.attributes || []} stockingOrderId={stockingOrderId} stockingOrderItemId={data.id} />;
								}
							},
							{
								field: 'materialOutCode',
								headerName: '物料外码',
								width: 120
							},
							{
								field: 'materialDescription',
								headerName: '物料描述',
								width: 200
							},
							{
								field: 'unitName',
								headerName: '单位',
								width: 80
							},
							{
								field: 'version',
								headerName: '版本',
								width: 100
							},
							{
								field: 'qty',
								headerName: '数量',
								width: 100
							},
							{
								field: 'productionDate',
								headerName: '需求日期',
								width: 120,
								type: 'dateColumn'
							},
							{
								field: 'memo',
								headerName: '备注',
								width: 150
							},
							{
								field: 'options',
								headerName: '操作',
								pinned: 'right',
								width: 180,
								cellRenderer: ({ data }: any) => {
									return (
										<Space>
											<Button
												size="small"
												onClick={() => exportList(data.id)}
												icon={<DownloadOutlined />}
												title="导出BOM"
											/>
											<Button
												size="small"
												onClick={() => exportMergeList(data.id)}
												icon={<DeleteColumnOutlined />}
												title="导出合并BOM"
											/>
											<StockingBomItemProfile stockingOrderId={stockingOrderId} stockingOrderItemId={data.id} />
										</Space>
									);
								}
							}
						]}
					/>
				</Skeleton>
			</Drawer>
		</>
	);
};

export default StockingOrderProfile;
