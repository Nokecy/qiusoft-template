import {
	SaleOrderGetSaleBomItemListAsync,
	SaleOrderRemoveBomItemAsync,
} from '@/services/smarterp/SaleOrder';
import { DeleteFilled, EditFilled, LinkOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Popconfirm, Space, Tag } from 'antd';
import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { useRequest } from 'umi';
import { AgGridPlus } from '@/components/agGrid';
import { flattenTreeDeep } from '@nokecy/qc-ui';
import CreateFormDialog from './createBomItemDialog';
import UpdateFormDialog from './updateBomItemDialog';
// import { ComeFromEnum } from '../../../appMaterials/_utils';

const BomItemProfile = (props: any) => {
	const { index, itemId } = props;
	const [visible, setVisible] = useState(false);
	const [selectRow, setSelctRow] = useState<any>();
	const gridRef = useRef<any>();
	const apiRef = useRef<any>();
	const savedExpandStateRef = useRef<{expandedNodes: string[]}>({expandedNodes: []});
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	function toTree(data) {
		if (!data || !Array.isArray(data)) return [];

		// 删除 所有 children,以防止多次调用
		data.forEach(function (item) {
			delete item.children;
		});

		// 将数据存储为 以 id 为 KEY 的 map 索引数据列
		let map = {};
		data.forEach(function (item) {
			map[item.id] = item;
		});

		let val = [];
		data.forEach(function (item) {
			// 以当前遍历项，的pid,去map对象中找到索引的id
			let parent = map[item.parentId];
			// 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
			if (parent) {
				item.parent = parent;
				(parent.children || (parent.children = [])).push(item);
			} else {
				//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
				val.push(item);
			}
		});
		return val;
	}

	const { data, run, loading } = useRequest(
		id => {
			return SaleOrderGetSaleBomItemListAsync({ saleOrderItemId: id });
		},
		{
			manual: true,
		}
	);

	const showModal = async () => {
		setVisible(true);
		setIsFirstLoad(true); // 重置首次加载标记
		savedExpandStateRef.current = {expandedNodes: []}; // 清空之前的展开状态
		loadData();
	};

	const loadData = () => {
		run(itemId);
	};

	const handleDelete = id => {
		SaleOrderRemoveBomItemAsync({ bomItemId: id }).then(() => {
			handleRefresh();
		});
	};

	// 保存展开状态
	const saveExpandState = useCallback(() => {
		const api = apiRef.current;
		if (api) {
			const expandedNodes: string[] = [];
			api.forEachNode((node: any) => {
				if (node.group && node.expanded) {
					// 使用多种方式标识节点，确保能找到
					const nodeId = node.data?.materialCode || node.data?.id || node.key || node.id;
					if (nodeId) {
						expandedNodes.push(nodeId);
					}
				}
			});
			savedExpandStateRef.current = { expandedNodes };
		}
	}, []);

	// 恢复展开状态
	const restoreExpandState = useCallback(() => {
		const api = apiRef.current;
		if (api && savedExpandStateRef.current.expandedNodes) {
			api.forEachNode((node: any) => {
				if (node.group) {
					const nodeId = node.data?.materialCode || node.data?.id || node.key || node.id;
					if (nodeId && savedExpandStateRef.current.expandedNodes.includes(nodeId)) {
						api.setRowNodeExpanded(node, true);
					}
				}
			});
		}
	}, []);

	const handleRefresh = useCallback(() => {
		// 保存当前展开状态
		saveExpandState();

		// 保存当前选中状态
		const currentSelectedId = selectRow?.id;

		// 立即标记为非首次加载
		setIsFirstLoad(false);

		// 刷新数据
		loadData();

		// 延时恢复选中状态
		if (currentSelectedId) {
			setTimeout(() => {
				const api = apiRef.current;
				if (api) {
					api.forEachNode((node: any) => {
						if (node.data?.id === currentSelectedId) {
							node.setSelected(true);
							// 确保选中的行在用户视野内
							api.ensureNodeVisible(node, 'middle');
						}
					});
				}
			}, 300);
		}
	}, [saveExpandState, selectRow]);

	const handleSelectionChanged = useCallback((event: any) => {
		const selectedRows = event.api.getSelectedRows();
		const newSelectedRow = selectedRows.length > 0 ? selectedRows[0] : null;

		// 只在选中项真正改变时才更新状态，避免不必要的重新渲染
		setSelctRow(prevRow => {
			// 比较选中项的 id，如果相同则不更新
			const prevId = prevRow?.id;
			const newId = newSelectedRow?.id;

			if (prevId === newId) {
				return prevRow; // 返回之前的值，不触发状态更新
			}

			return newSelectedRow;
		});
	}, []);

	// 手动选中指定行的函数
	const selectRowById = useCallback((rowId: string) => {
		const api = apiRef.current;
		if (api) {
			// 先清空当前选中
			api.deselectAll();

			// 查找并选中指定的行
			api.forEachNode((node: any) => {
				if (node.data?.id === rowId) {
					node.setSelected(true);
					// 滚动到选中的行以确保用户可见
					api.ensureNodeVisible(node, 'middle');
					// 手动更新选中状态
					setSelctRow(node.data);
				}
			});
		}
	}, []);

	// 缓存树形数据处理，避免每次选择变化时重新计算
	const treeData = useMemo(() => {
		return toTree((data || [])) || [];
	}, [data]);

	// 缓存拍平后的数据，避免重新渲染
	const flattenedData = useMemo(() => {
		return flattenTreeDeep(treeData, 'children');
	}, [treeData]);

	// 监听数据变化，在数据更新后恢复展开状态
	useEffect(() => {
		if (flattenedData.length > 0 && apiRef.current) {
			setTimeout(() => {
				if (isFirstLoad) {
					// 首次加载，展开第一个节点
					const api = apiRef.current;
					if (api) {
						const firstRowNode = api.getDisplayedRowAtIndex(0);
						if (firstRowNode && firstRowNode.group) {
							api.setRowNodeExpanded(firstRowNode, true);
						}
					}
				} else {
					// 数据刷新，恢复之前的展开状态
					restoreExpandState();
				}
			}, 200);
		}
	}, [flattenedData, isFirstLoad, restoreExpandState]);

	// 来源枚举配置
	const comeFromEnum = [
		{ label: "采购", value: "10", color: "blue" },
		{ label: "生产", value: "20", color: "cyan" },
		{ label: "虚拟", value: "30", color: "geekblue" },
		{ label: "外协", value: "40", color: "orange" },
		{ label: "计划", value: "50", color: "processing" },
		{ label: "费用", value: "60", color: "purple" },
		{ label: "模型", value: "70", color: "success" },
		{ label: "模型", value: "80", color: "volcano" },
		{ label: "虚拟模型", value: "83", color: "volcano" },
		{ label: "特征", value: "90", color: "warning" },
		{ label: "选配", value: "A0", color: "yellow" },
		{ label: "选一", value: "B0", color: "magenta" }
	];

	const columnDefs = [
		{
			field: 'materialOutCode',
			headerName: '外部编码',
			width: 120
		},
		{
			field: 'materialDescription',
			headerName: '物料描述',
			width: 200,
			flex: 1
		},
		{
			field: 'comeFrom',
			headerName: '来源',
			width: 80,
			cellRenderer: ({ value }: any) => {
				const enumItem = comeFromEnum.find(item => item.value === value);
				return enumItem ? <Tag color={enumItem.color}>{enumItem.label}</Tag> : value;
			}
		},
		{
			field: 'qty',
			headerName: '单件用量',
			width: 90,
			type: 'numericColumn'
		},
		{
			field: 'totalQty',
			headerName: '订单用量',
			width: 90,
			type: 'numericColumn'
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
		},
		{
			field: 'options',
			headerName: '操作',
			width: 120,
			pinned: 'right',
			cellRenderer: ({ data }: any) => {
				const isDisabled = !data.parent;

				return (
					<Space size="small">
						{!isDisabled && (
							<UpdateFormDialog
								key={`edit-${data.id}`}
								title={'编辑'}
								entityId={data.id}
								rowData={data}
								onAfterSubmit={handleRefresh}
								onSelectRow={selectRowById}
								buttonProps={{
									icon: <EditFilled />,
									type: 'link',
									size: 'small',
									title: '编辑'
								}}
							/>
						)}
						{!isDisabled && (
							<Popconfirm
								title='确定删除?'
								onConfirm={() => handleDelete(data.id)}
								placement="topRight"
							>
								<Button
									size={'small'}
									icon={<DeleteFilled />}
									type={'link'}
									title={'删除'}
									danger
								/>
							</Popconfirm>
						)}
					</Space>
				);
			}
		}
	];

	return (
		<>
			<Button onClick={showModal} icon={<LinkOutlined />} title={'配置清单'} type='link' />
			<Drawer
				width={1200}
				placement='right'
				closable={true}
				onClose={() => {
					setVisible(false);
				}}
				open={visible}
				destroyOnClose
			>
				<AgGridPlus
					gridRef={gridRef}
					headerTitle='物料清单'
					gridKey="bom-item-tree"
					dataSource={flattenedData}
					loading={loading}
					search={false}
					columnDefs={columnDefs}
					treeData={true}
					treeParentName={'parentId'}
					treeKeyName='id'
					getDataPath={data => {
						return data.hierarchy;
					}}
					autoGroupColumnDef={{
						headerName: "物料编码",
						field: "materialCode",
						width: 200,
						pinned: 'left',
						cellRendererParams: {
							suppressCount: true,
						}
					}}
					rowSelection="single"
					suppressRowClickSelection={false}
					isRowSelectable={(params: any) => {
						// 根据业务规则控制行是否可选择
						const rowData = params.data;
						return !(rowData.parent?.comeFrom === '20' || rowData.comeFrom === '20');
					}}
					onSelectionChanged={handleSelectionChanged}
					onGridReady={(params: any) => {
						apiRef.current = params.api;
					}}
					getRowNodeId={(data: any) => data.id}
					suppressAnimateRows={true}
					toolBarRender={() => [
						<CreateFormDialog
							key="add-same-level"
							title={'新增同级'}
							onAfterSubmit={handleRefresh}
							selectRow={selectRow}
							type={0}
							buttonProps={{
								icon: <PlusOutlined />,
								type: 'primary'
							}}
						>
							新增同级
						</CreateFormDialog>,
						<CreateFormDialog
							key="add-sub-level"
							title={'新增下级'}
							onAfterSubmit={handleRefresh}
							selectRow={selectRow}
							type={1}
							buttonProps={{
								icon: <PlusOutlined />,
								type: 'primary'
							}}
						>
							新增下级
						</CreateFormDialog>
					]}
				/>
			</Drawer>
		</>
	);
};

export default BomItemProfile;

export const routeProps = {
	name: 'BOM项目资料',
};
