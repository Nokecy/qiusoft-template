import { Descriptions, Drawer, Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { SaleOrderGetSaleBomItemListAsync } from '@/services/smarterp/SaleOrder';
import { AgGridPlus } from '@/components/agGrid';
import { flattenTreeDeep } from '@nokecy/qc-ui';

function toTree(data) {
	// 删除 所有 children,以防止多次调用
	data.forEach(function (item) {
		delete item.children;
	});

	// 将数据存储为 以 id 为 KEY 的 map 索引数据列
	let map = {};
	data.forEach(function (item) {
		map[item.id] = item;
	});
	//        console.log(map);
	let val = [];
	data.forEach(function (item) {
		// 以当前遍历项，的pid,去map对象中找到索引的id
		let parent = map[item.parentId];
		// 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
		if (parent) {
			(parent.children || (parent.children = [])).push(item);
		} else {
			//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
			val.push(item);
		}
	});
	return val;
}

const AttributeProfile = (props: { content: any; attributes: any[]; itemId?: any }) => {
	const { content, attributes, itemId } = props;
	const [visible, setVisible] = useState(false);

	const { data, run, loading } = useRequest(
		id => {
			return SaleOrderGetSaleBomItemListAsync({ saleOrderItemId: id });
		},
		{
			manual: true,
		}
	);

	useEffect(() => {
		if (visible) {
			run(itemId);
		}
	}, [visible]);

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
							{attributes.map(item => {
								// eslint-disable-next-line react/jsx-key
								return <Descriptions.Item label={item.name}>{item.value}</Descriptions.Item>;
							})}
						</Descriptions>
					</Tabs.TabPane>

					<Tabs.TabPane key={'1'} tab={'产品BOM'}>
						<div style={{ height: '800px', marginTop: 5 }}>
							<AgGridPlus
								headerTitle="物料清单"
								gridKey="bom-tree-grid"
								dataSource={flattenTreeDeep(toTree(data || []) || [], 'children')}
								loading={loading}
								hidePagination={true}
								pagination={false}
								treeData={true}
								treeParentName={'parentId'}
								treeKeyName='id'
								getDataPath={data => {
									return data.hierarchy;
								}}
								animateRows={true}
								search={false}
								autoGroupColumnDef={{
									headerName: '物料编码',
									field: 'materialCode',
									width: 200,
								}}
								columnDefs={[
									{
										field: 'materialDescription',
										headerName: '物料描述',
										width: 300
									},
									{
										field: 'comeFrom',
										headerName: '来源',
										width: 80,
										cellRenderer: ({ value }) => {
											switch (value) {
												case "10":
													return <Tag color={"blue"}>采购</Tag>
												case "20":
													return <Tag color={"cyan"}>生产</Tag>
												case "30":
													return <Tag color={"geekblue"}>虚拟</Tag>
												case "40":
													return <Tag color={"orange"}>外协</Tag>
												case "50":
													return <Tag color={"processing"}>计划</Tag>
												case "60":
													return <Tag color={"purple"}>费用</Tag>
												case "70":
													return <Tag color={"success"}>模型</Tag>
												case "80":
													return <Tag color={"volcano"}>模型</Tag>
												case "83":
													return <Tag color={"volcano"}>虚拟模型</Tag>
												case "90":
													return <Tag color={"warning"}>特征</Tag>
												case "A0":
													return <Tag color={"yellow"}>选配</Tag>
												case "B0":
													return <Tag color={"magenta"}>选一</Tag>
												default:
													return value;
											}
										}
									},
									{
										field: 'qty',
										headerName: '单件用量',
										width: 80,
										hideInSearch: true
									},
									{
										field: 'totalQty',
										headerName: '订单用量',
										width: 80,
										hideInSearch: true
									},
									{
										field: 'memo',
										headerName: '备注',
										width: 200
									}
								]}
							/>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</Drawer>
		</>
	);
};

export default AttributeProfile;
