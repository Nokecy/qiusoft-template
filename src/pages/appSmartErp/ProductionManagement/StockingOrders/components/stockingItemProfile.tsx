import { Descriptions, Drawer, Skeleton, Tabs, Tag, Button, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { AgGridPlus } from '@/components/agGrid';
import { flattenTreeDeep } from '@nokecy/qc-ui';
import { StockingOrderGetWorkBomItemsAsync } from '@/services/smarterp/StockingOrder';
import { useRequest } from 'umi';
import { downloadBlob } from '@/_utils';
import { DownloadOutlined, DeleteColumnOutlined } from '@ant-design/icons';
import StockingBomItemProfile from './stockingBomItemProfile';

function toTree(data) {
	if (!data || !Array.isArray(data)) return [];

	// 删除所有children,以防止多次调用
	data.forEach(function (item) {
		delete item.children;
		delete item.hierarchy;
	});

	// 将数据存储为以id为KEY的map索引数据列
	let map = {};
	data.forEach(function (item) {
		map[item.id] = item;
	});

	// 计算hierarchy路径
	function buildHierarchy(item, parentHierarchy = []) {
		const currentHierarchy = [...parentHierarchy, item.materialCode || item.id];
		item.hierarchy = currentHierarchy;
		return currentHierarchy;
	}

	let val = [];
	data.forEach(function (item) {
		// 以当前遍历项的parentId,去map对象中找到索引的id
		let parent = map[item.parentId];
		// 如果找到索引,说明此项不在顶级当中,需要把此项添加到对应的父级中
		if (parent) {
			item.parent = parent;
			// 构建hierarchy路径
			buildHierarchy(item, parent.hierarchy || [parent.materialCode || parent.id]);
			(parent.children || (parent.children = [])).push(item);
		} else {
			// 如果没有在map中找到对应的索引ID,直接把当前item添加到val结果集中,作为顶级
			buildHierarchy(item);
			val.push(item);
		}
	});
	return val;
}

const StockingItemProfile = (props: { content: any; attributes: any[]; stockingOrderId: number; stockingOrderItemId: number }) => {
	const { content, attributes, stockingOrderId, stockingOrderItemId } = props;
	const [visible, setVisible] = useState(false);

	// 使用接口获取BOM数据
	const { data: bomData, loading: bomLoading, run: getBomData } = useRequest(
		StockingOrderGetWorkBomItemsAsync,
		{
			manual: true,
		}
	);

	useEffect(() => {
		if (visible && stockingOrderId) {
			getBomData({ stockingOrderId });
		}
	}, [visible, stockingOrderId]);

	// 导出BOM
	const exportList = (id: number) => {
		const hideBatch = message.loading('正在导出备货单BOM,请稍后', 0);
		downloadBlob(`/api/smart-erp/stocking-order/export-stocking-bom-item/${id}`, '备货单BOM.xlsx').then(() => {
			hideBatch();
			message.success('导出成功');
		}).catch((error) => {
			hideBatch();
			console.error('导出备货单BOM失败:', error);
			message.error('导出失败，请联系管理员');
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
				width={1000}
				placement='right'
				closable={true}
				open={visible}
				onClose={() => {
					setVisible(false);
				}}
			>
				<Tabs>
					<Tabs.TabPane key={'0'} tab={'特性信息'}>
						<Descriptions title='特性信息'>
							{attributes && attributes.length > 0 ? (
								attributes.map((item, index) => {
									return <Descriptions.Item key={index} label={item.name}>{item.value}</Descriptions.Item>;
								})
							) : (
								<Descriptions.Item label="提示">暂无特性信息</Descriptions.Item>
							)}
						</Descriptions>
					</Tabs.TabPane>

					<Tabs.TabPane key={'1'} tab={'产品BOM'}>
						<Skeleton loading={bomLoading} active>
							<div style={{ height: '800px', marginTop: 5 }}>
								<AgGridPlus
									headerTitle="物料清单"
									gridKey="bom-tree-grid"
									dataSource={flattenTreeDeep(toTree(bomData || []) || [], 'children')}
									hidePagination={true}
									pagination={false}
									treeData={true}
									treeParentName={'parentId'}
									treeKeyName='id'
									animateRows={true}
									search={false}
									hideTool={true}
									getRowNodeId={(data: any) => data.id}
									suppressAnimateRows={true}
									getDataPath={data => {
										return data.hierarchy;
									}}
									autoGroupColumnDef={{
										headerName: '物料编码',
										field: 'materialCode',
										width: 200,
										pinned: 'left',
										cellRendererParams: {
											suppressCount: true,
										}
									}}
									columnDefs={[
										{
											field: 'materialOutCode',
											headerName: '外部编码',
											width: 120
										},
										{
											field: 'materialDescription',
											headerName: '物料描述',
											width: 300
										},
										{
											field: 'qty',
											headerName: '单件用量',
											width: 90,
											type: 'numericColumn',
											hideInSearch: true
										},
										{
											field: 'totalQty',
											headerName: '总用量',
											width: 90,
											type: 'numericColumn',
											hideInSearch: true
										},
										{
											field: 'unitName',
											headerName: '单位',
											width: 80
										},
										{
											field: 'memo',
											headerName: '备注',
											width: 150
										}
									]}
								/>
							</div>
						</Skeleton>
					</Tabs.TabPane>
				</Tabs>
			</Drawer>
		</>
	);
};

export default StockingItemProfile;
