import { SaleOrderGetAsync } from '@/services/smarterp/SaleOrder';
import { downloadBlob } from '@/_utils';
import { DownloadOutlined, DeleteColumnOutlined } from '@ant-design/icons';
import { Button, Descriptions, Drawer, message, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import AttributeProfile from './attributeProfile';
import { AgGridPlus } from '@/components/agGrid';
import BomItemProfile from '@/pages/appSmartErp/_utils/bomField/bomItemProfile';

const SaleOrderProfile = (props: any) => {
	const { content, saleOrderId } = props;
	const [visible, setVisible] = useState(false);

	const { data: saleOrder, loading, run: getSaleOrder } = useRequest(SaleOrderGetAsync, { manual: true });

	useEffect(() => {
		if (visible) {
			getSaleOrder({ id: saleOrderId });
		}
	}, [visible]);

	const exportList = id => {
		const hideBatch = message.loading('正在导出销售BOM,请稍后', 0);
		downloadBlob(`/api/smart-erp/sale-order/export-sale-bom-item/${id}`, '销售BOM.xlsx').then(() => {
			hideBatch();
			message.success('导出成功');
		}).catch((error) => {
			hideBatch();
			console.error('导出销售BOM失败:', error);
			message.error('导出失败，请联系管理员');
		});
	};

	const exportMerageList = id => {
		const hideBatch = message.loading('正在导出合并销售BOM,请稍后', 0);
		downloadBlob(`/api/smart-erp/sale-order/export-merge-sale-bom-item/${id}`, '合并销售BOM.xlsx').then(() => {
			hideBatch();
			message.success('导出成功');
		}).catch((error) => {
			hideBatch();
			console.error('导出合并销售BOM失败:', error);
			message.error('导出失败，请联系管理员');
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
					<Descriptions title='订单信息'>
						<Descriptions.Item label='合同号'>{saleOrder?.orderNo}</Descriptions.Item>
						<Descriptions.Item label='签订日期'>{saleOrder?.releaseDate}</Descriptions.Item>
						<Descriptions.Item label='订单类型'>{saleOrder?.orderType}</Descriptions.Item>
						<Descriptions.Item label='销售员'>{saleOrder?.saleCode}</Descriptions.Item>
						<Descriptions.Item label='是否含税'>{saleOrder?.priceIsTax}</Descriptions.Item>
						<Descriptions.Item label='客户编码'>{saleOrder?.customerCode}</Descriptions.Item>
						<Descriptions.Item label='客户名称'>{saleOrder?.customerName}</Descriptions.Item>
						<Descriptions.Item label='跟单员'>{saleOrder?.consigner}</Descriptions.Item>
						<Descriptions.Item label='货币'>{saleOrder?.currencyAbb}</Descriptions.Item>
						<Descriptions.Item label='税率'>{saleOrder?.currencyRate}</Descriptions.Item>
						<Descriptions.Item label='结算方式'>{saleOrder?.settleMethodName}</Descriptions.Item>
						<Descriptions.Item label='汇率'>{saleOrder?.currencyRate}</Descriptions.Item>
						<Descriptions.Item label='交货地址'>{saleOrder?.deliverMethodName}</Descriptions.Item>
						<Descriptions.Item label='交货方式'>{saleOrder?.settleMethodName}</Descriptions.Item>
						<Descriptions.Item label='收货人'>{saleOrder?.reciver}</Descriptions.Item>
						<Descriptions.Item label='收货人电话'>{saleOrder?.reciverTel}</Descriptions.Item>
						<Descriptions.Item label='价格条款'>{saleOrder?.reciverFax}</Descriptions.Item>
						<Descriptions.Item label='交易方式'>{saleOrder?.businessType}</Descriptions.Item>
						<Descriptions.Item label='定金方式'>{saleOrder?.earnestType}</Descriptions.Item>
						<Descriptions.Item label='定金额度'>{saleOrder?.earnest}</Descriptions.Item>
						<Descriptions.Item label='备注'>{saleOrder?.memo}</Descriptions.Item>
					</Descriptions>

					<AgGridPlus 
						dataSource={saleOrder?.saleOrderItems} 
						gridKey="sale-order-items"
						search={false} 
						hideTool
						columnDefs={[
							{
								field: 'materialCode',
								headerName: '物料编码',
								width: 100,
								cellRenderer: ({ value, data }: any) => {
									return <AttributeProfile content={value} attributes={data.attributes!} itemId={data.id} />;
								}
							},
							{
								field: 'materialOutCode',
								headerName: '物料外码',
								width: 100
							},
							{
								field: 'materialDescription',
								headerName: '物料描述',
								width: 150
							},
							{
								field: 'specificationModel',
								headerName: '规格型号',
								width: 120
							},
							{
								field: 'qty',
								headerName: '数量',
								width: 100
							},
							{
								field: 'unitName',
								headerName: '单位',
								width: 100
							},
							{
								field: 'soi_UExchangeFlag',
								headerName: '运算',
								width: 50
							},
							{
								field: 'soi_ExchangeRate',
								headerName: '转换率',
								width: 80
							},
							{
								field: 'soi_InvQty',
								headerName: '标准数量',
								width: 100
							},
							{
								field: 'soi_SaleUID',
								headerName: '标准单位',
								width: 100
							},
							{
								field: 'price',
								headerName: '单价',
								width: 80
							},
							{
								field: 'deliveryDate',
								headerName: '交货日期',
								width: 120,
								type: 'dateColumn'
							},
							{
								field: 'deliveryAddr1',
								headerName: '交货地址',
								width: 120
							},
							{
								field: 'amount',
								headerName: '金额',
								width: 80
							},
							{
								field: 'tax',
								headerName: '税额',
								width: 80
							},
							{
								field: 'taxAmount',
								headerName: '税价合计',
								width: 100
							},
							{
								field: 'options',
								headerName: '操作',
								pinned: 'right',
								width: 160,
								cellRenderer: ({ data, rowIndex }: any) => {
									return (
										<Space>
											<Button
												onClick={() => {
													exportList(data.id);
												}}
												icon={<DownloadOutlined />}
												title={'导出销售'}
												type='link'
												size='small'
											/>

											<Button
												onClick={() => {
													exportMerageList(data.id);
												}}
												icon={<DeleteColumnOutlined />}
												title={'导出合并'}
												type='link'
												size='small'
											/>

											<BomItemProfile index={rowIndex} itemId={data.id} />
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

export default SaleOrderProfile;
