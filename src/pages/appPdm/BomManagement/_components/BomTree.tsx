/**
 * BOM 树形结构组件 - 详情页面左侧导航
 * 优化版本：增强信息展示、搜索功能、右键菜单、交互效果
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Tree, Card, Button, Space, Divider, Spin, Empty, Tooltip, Input, Dropdown, Tag, message } from 'antd';
import type { MenuProps } from 'antd';
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  CopyOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  StopFilled,
  AppstoreOutlined,
  ToolOutlined,
  SettingOutlined,
  FileOutlined,
  GoldOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import type { BurnAbpPdmBomManagementBomsBomItemDto } from '@/services/pdm/typings';
import { fetchBomTree, countBomItems, buildTreeDataFromRecursive, collectAllItemsFromTree } from '../_utils/bomUtils';
import { expandAllKeys } from '../_utils/treeUtils';

interface BomTreeProps {
  bomId: string;
  version: string;
  onSelect: (item: BurnAbpPdmBomManagementBomsBomItemDto | null) => void;
  loading?: boolean;
  onDataLoaded?: (items: BurnAbpPdmBomManagementBomsBomItemDto[]) => void;
  onAdd?: (parentItem: BurnAbpPdmBomManagementBomsBomItemDto | null) => void;
  onDelete?: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  onEdit?: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  onRefresh?: () => void;
}

// 状态配置
const STATUS_CONFIG = {
  5: { icon: <CheckCircleFilled />, color: '#52c41a', label: '激活', bgColor: '#f6ffed' },
  0: { icon: <ClockCircleFilled />, color: '#faad14', label: '草稿', bgColor: '#fffbe6' },
  10: { icon: <StopFilled />, color: '#d9d9d9', label: '停用', bgColor: '#fafafa' },
} as const;

// 来源类型配置
const COME_FROM_TYPE_CONFIG: Record<number, { label: string; color: string }> = {
  1: { label: '采购', color: '#1890ff' },
  2: { label: '生产', color: '#52c41a' },
  3: { label: '虚拟', color: '#faad14' },
  4: { label: '委外', color: '#722ed1' },
  5: { label: '配送', color: '#13c2c2' },
  6: { label: '自研', color: '#eb2f96' },
  7: { label: '赠送', color: '#fa8c16' },
  8: { label: '模型', color: '#2f54eb' },
  9: { label: '租赁', color: '#52c41a' },
  10: { label: '借用', color: '#faad14' },
  11: { label: '回收', color: '#8c8c8c' },
  12: { label: '其他', color: '#595959' },
};

// 物料类型图标（根据编码前缀或其他规则判断）
const getMaterialIcon = (code: string) => {
  const prefix = code?.substring(0, 1)?.toUpperCase() || '';
  const iconMap: Record<string, React.ReactNode> = {
    'P': <AppstoreOutlined style={{ color: '#1890ff' }} />,  // 产品
    'A': <BranchesOutlined style={{ color: '#722ed1' }} />,  // 组件
    'C': <ToolOutlined style={{ color: '#13c2c2' }} />,      // 零件
    'M': <GoldOutlined style={{ color: '#fa8c16' }} />,      // 原材料
    'D': <FileOutlined style={{ color: '#8c8c8c' }} />,      // 文档
  };
  return iconMap[prefix] || <SettingOutlined style={{ color: '#595959' }} />;
};

// 高亮搜索关键词
const highlightText = (text: string, keyword: string) => {
  if (!keyword || !text) return text;
  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return text;
  const before = text.substring(0, index);
  const match = text.substring(index, index + keyword.length);
  const after = text.substring(index + keyword.length);
  return (
    <>
      {before}
      <span style={{ backgroundColor: '#ffc069', padding: '0 2px', borderRadius: 2 }}>{match}</span>
      {after}
    </>
  );
};

const BomTree: React.FC<BomTreeProps> = ({
  bomId,
  version,
  onSelect,
  loading = false,
  onDataLoaded,
  onAdd,
  onDelete,
  onEdit,
  onRefresh,
}) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [itemsMap, setItemsMap] = useState<Map<string, BurnAbpPdmBomManagementBomsBomItemDto>>(new Map());
  const [searchValue, setSearchValue] = useState('');
  const [contextMenuNode, setContextMenuNode] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);

  // 查找顶级父项（根节点）
  const findTopParent = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto | null): BurnAbpPdmBomManagementBomsBomItemDto | null => {
    if (!item) return null;

    // 如果没有父项ID，说明自己就是顶级父项
    if (!item.parentItemId) return item;

    // 递归查找父项
    let current = item;
    while (current.parentItemId) {
      const parent = itemsMap.get(String(current.parentItemId));
      if (!parent) break;
      current = parent;
    }

    return current;
  }, [itemsMap]);

  // 检查节点是否有子项
  const hasChildren = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto | null): boolean => {
    if (!item || !item.id) return false;

    // 检查是否有其他节点的parentItemId指向该节点
    return Array.from(itemsMap.values()).some(child => child.parentItemId === item.id);
  }, [itemsMap]);

  // 检查是否可以添加子项
  const canAddChild = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto | null): boolean => {
    if (!item) return true; // 根节点可以添加子项

    // 规则4：只有选中项本身是父项时才能添加子项（即该节点有children或者是根节点）
    const isRoot = !item.parentItemId;
    if (!isRoot && !hasChildren(item)) {
      return false; // 既不是根节点，也没有子项，不能添加子项
    }

    // 查找顶级父项
    const topParent = findTopParent(item);
    if (!topParent) return false;

    // 如果选中项自己就是顶级父项，可以添加子项
    if (item.id === topParent.id) return true;

    // 规则2：如果顶级父项来源是生产(2)、虚拟(3)、模型(8)，不能添加子项
    const topParentType = topParent.materialComeFromType;
    if (topParentType && [2, 3, 8].includes(topParentType)) {
      return false;
    }

    return true;
  }, [findTopParent, hasChildren]);

  // 判断是否为第一层节点（根节点）
  // 根节点的 parentItemId 为 null/undefined/0
  const isFirstLevelNode = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto | null): boolean => {
    if (!item) return false;
    // 只有 parentItemId 为 null/undefined/0 才是根节点
    return !item.parentItemId;
  }, []);

  // 检查是否可以添加同级（第一层节点不能添加同级）
  const canAddSibling = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto | null): boolean => {
    if (!item) return false;
    // 第一层节点不能添加同级
    if (isFirstLevelNode(item)) return false;
    return true;
  }, [isFirstLevelNode]);

  // 检查是否可以删除（第一层节点不能删除）
  const canDeleteItem = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto | null): boolean => {
    if (!item) return false;
    // 第一层节点不能删除
    if (isFirstLevelNode(item)) return false;
    return true;
  }, [isFirstLevelNode]);

  // 加载 BOM 树
  const loadTreeData = useCallback(async () => {
    if (!bomId || !version) return;

    setLocalLoading(true);
    try {
      const result = await fetchBomTree({
        bomId: Number(bomId),
        bomVersion: version,
      });

      if (result.success) {
        const { tree, map } = buildTreeDataFromRecursive(result.data);
        setTreeData(tree);
        setItemsMap(map);

        const allKeys = expandAllKeys(tree);
        setExpandedKeys(allKeys.slice(0, Math.min(10, allKeys.length)));

        const allItems = collectAllItemsFromTree(result.data);
        onDataLoaded?.(allItems);
      }
    } catch (error) {
      console.error('加载 BOM 树失败:', error);
    } finally {
      setLocalLoading(false);
    }
  }, [bomId, version, onDataLoaded]);

  useEffect(() => {
    if (bomId && version) {
      loadTreeData();
      setSelectedKeys([]);
      onSelect(null);
    }
  }, [bomId, version, loadTreeData, onSelect]);

  // 搜索过滤后的树数据
  const filteredTreeData = useMemo(() => {
    if (!searchValue) return treeData;

    const filterTree = (nodes: DataNode[]): DataNode[] => {
      return nodes
        .map((node) => {
          const item = itemsMap.get(node.key as string);
          const matchCode = item?.childMaterialCode?.toLowerCase().includes(searchValue.toLowerCase());
          const matchName = item?.childMaterialName?.toLowerCase().includes(searchValue.toLowerCase());
          const children = node.children ? filterTree(node.children as DataNode[]) : [];

          if (matchCode || matchName || children.length > 0) {
            return { ...node, children };
          }
          return null;
        })
        .filter(Boolean) as DataNode[];
    };

    return filterTree(treeData);
  }, [treeData, searchValue, itemsMap]);

  // 搜索时自动展开匹配节点
  useEffect(() => {
    if (searchValue) {
      const matchedKeys: React.Key[] = [];
      const findMatchedKeys = (nodes: DataNode[]) => {
        nodes.forEach((node) => {
          const item = itemsMap.get(node.key as string);
          const matchCode = item?.childMaterialCode?.toLowerCase().includes(searchValue.toLowerCase());
          const matchName = item?.childMaterialName?.toLowerCase().includes(searchValue.toLowerCase());
          if (matchCode || matchName) {
            matchedKeys.push(node.key);
          }
          if (node.children) {
            findMatchedKeys(node.children as DataNode[]);
          }
        });
      };
      findMatchedKeys(treeData);
      setExpandedKeys((prev) => [...new Set([...prev, ...matchedKeys])]);
    }
  }, [searchValue, treeData, itemsMap]);

  // 节点选中
  const handleSelect = useCallback((keys: React.Key[]) => {
    setSelectedKeys(keys);
    if (keys.length > 0) {
      const item = itemsMap.get(keys[0] as string);
      onSelect(item || null);
    } else {
      onSelect(null);
    }
  }, [itemsMap, onSelect]);

  // 复制到剪贴板
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    if (!text) {
      message.warning(`${label}为空`);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      message.success(`${label}已复制`);
    } catch (err) {
      // 降级方案：使用 execCommand
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      message.success(`${label}已复制`);
    }
  }, []);

  // 右键菜单
  const contextMenuItems: MenuProps['items'] = useMemo(() => {
    const childDisabled = !onAdd || !canAddChild(contextMenuNode);
    const siblingDisabled = !onAdd || !canAddSibling(contextMenuNode);
    const deleteDisabled = !onDelete || !canDeleteItem(contextMenuNode);

    return [
      {
        key: 'addChild',
        icon: <PlusOutlined />,
        label: '添加子项',
        disabled: childDisabled,
      },
      {
        key: 'addSibling',
        icon: <PlusOutlined />,
        label: '添加同级',
        disabled: siblingDisabled,
      },
      { type: 'divider' },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: '编辑',
        disabled: !onEdit,
      },
      {
        key: 'copy',
        icon: <CopyOutlined />,
        label: '复制',
        children: [
          { key: 'copyCode', label: '复制编码' },
          { key: 'copyName', label: '复制名称' },
          { key: 'copyDescription', label: '复制描述' },
          { type: 'divider' },
          { key: 'copyAll', label: '复制全部信息' },
        ],
      },
      { type: 'divider' },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: '删除',
        danger: true,
        disabled: deleteDisabled,
      },
    ];
  }, [onAdd, onEdit, onDelete, contextMenuNode, canAddChild, canAddSibling, canDeleteItem]);

  const handleContextMenuClick: MenuProps['onClick'] = useCallback(({ key }) => {
    if (!contextMenuNode) return;

    switch (key) {
      case 'addChild':
        onAdd?.(contextMenuNode);
        break;
      case 'addSibling':
        if (contextMenuNode.parentItemId) {
          const parentItem = itemsMap.get(String(contextMenuNode.parentItemId));
          onAdd?.(parentItem || null);
        } else {
          onAdd?.(null);
        }
        break;
      case 'edit':
        onEdit?.(contextMenuNode);
        break;
      case 'delete':
        onDelete?.(contextMenuNode);
        break;
      case 'copyCode':
        copyToClipboard(contextMenuNode.childMaterialCode || '', '物料编码');
        break;
      case 'copyName':
        copyToClipboard(contextMenuNode.childMaterialName || '', '物料名称');
        break;
      case 'copyDescription':
        copyToClipboard(contextMenuNode.childMaterialDescription || '', '物料描述');
        break;
      case 'copyAll':
        const allInfo = [
          `编码: ${contextMenuNode.childMaterialCode || ''}`,
          `名称: ${contextMenuNode.childMaterialName || ''}`,
          `描述: ${contextMenuNode.childMaterialDescription || ''}`,
          `数量: ${contextMenuNode.quantity || ''} ${contextMenuNode.unit || ''}`,
        ].join('\n');
        copyToClipboard(allInfo, '物料信息');
        break;
    }
    setContextMenuNode(null);
  }, [contextMenuNode, itemsMap, onAdd, onEdit, onDelete, copyToClipboard]);

  // 自定义节点渲染
  const renderTreeTitle = useCallback((node: DataNode) => {
    const item = itemsMap.get(node.key as string);
    if (!item) return node.title;

    const statusConfig = STATUS_CONFIG[item.activationStatus as keyof typeof STATUS_CONFIG] || STATUS_CONFIG[0];
    const icon = getMaterialIcon(item.childMaterialCode || '');
    const isSelected = selectedKeys.includes(node.key);

    return (
      <Dropdown
        menu={{ items: contextMenuItems, onClick: handleContextMenuClick }}
        trigger={['contextMenu']}
        onOpenChange={(open) => {
          if (open) setContextMenuNode(item);
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 8px',
            borderRadius: 4,
            borderLeft: `3px solid ${isSelected ? '#1890ff' : 'transparent'}`,
            background: isSelected ? '#e6f7ff' : 'transparent',
            transition: 'all 0.2s',
            minWidth: 0,
            flex: 1,
          }}
          className="bom-tree-node"
        >
          {/* 物料类型图标 */}
          <span style={{ flexShrink: 0 }}>{icon}</span>

          {/* 物料编码 */}
          <span
            style={{
              fontWeight: 600,
              fontSize: 13,
              fontFamily: 'Monaco, Consolas, monospace',
              color: '#262626',
              whiteSpace: 'nowrap',
            }}
          >
            {highlightText(item.childMaterialCode || '', searchValue)}
          </span>

          {/* 物料名称 + 描述 */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              overflow: 'hidden',
            }}
          >
            {/* 物料名称 */}
            <span
              style={{
                color: '#595959',
                fontSize: 13,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={item.childMaterialName}
            >
              {highlightText(item.childMaterialName || '', searchValue)}
            </span>
            {/* 物料描述 */}
            {item.childMaterialDescription && (
              <Tooltip title={item.childMaterialDescription} placement="topLeft">
                <span
                  style={{
                    color: '#8c8c8c',
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.2,
                  }}
                >
                  {item.childMaterialDescription}
                </span>
              </Tooltip>
            )}
          </div>

          {/* 来源类型标签 */}
          {item.materialComeFromType != null && COME_FROM_TYPE_CONFIG[item.materialComeFromType] && (
            <Tag
              color={COME_FROM_TYPE_CONFIG[item.materialComeFromType].color}
              style={{
                margin: 0,
                fontSize: 11,
                padding: '0 4px',
                height: 18,
                lineHeight: '18px',
                flexShrink: 0,
              }}
            >
              {COME_FROM_TYPE_CONFIG[item.materialComeFromType].label}
            </Tag>
          )}

          {/* 数量和单位 */}
          {item.quantity != null && (
            <Tag
              style={{
                margin: 0,
                fontSize: 12,
                padding: '0 6px',
                background: '#f5f5f5',
                border: 'none',
                flexShrink: 0,
              }}
            >
              ×{item.quantity} {item.unit || ''}
            </Tag>
          )}

          {/* 状态指示器 */}
          <Tooltip title={statusConfig.label}>
            <span style={{ color: statusConfig.color, flexShrink: 0 }}>
              {statusConfig.icon}
            </span>
          </Tooltip>
        </div>
      </Dropdown>
    );
  }, [itemsMap, selectedKeys, searchValue, contextMenuItems, handleContextMenuClick]);

  // 统计信息
  const statistics = useMemo(() => countBomItems(Array.from(itemsMap.values())), [itemsMap]);

  // 操作处理
  const handleAddItem = useCallback(() => {
    if (selectedKeys.length === 0) {
      onAdd?.(null);
    } else {
      const item = itemsMap.get(selectedKeys[0] as string);
      if (!canAddChild(item || null)) {
        // 判断具体的错误原因
        const isRoot = !item?.parentItemId;
        const hasChild = hasChildren(item || null);
        if (!isRoot && !hasChild) {
          message.warning('该节点不允许添加子项：只有父节点或根节点才能添加子项');
        } else {
          message.warning('该节点不允许添加子项：顶级父项来源为生产/虚拟/模型时，不能添加子项');
        }
        return;
      }
      onAdd?.(item || null);
    }
  }, [selectedKeys, itemsMap, onAdd, canAddChild, hasChildren]);

  const handleAddSibling = useCallback(() => {
    if (selectedKeys.length === 0) {
      onAdd?.(null);
    } else {
      const item = itemsMap.get(selectedKeys[0] as string);
      if (!canAddSibling(item || null)) {
        message.warning('根节点不能添加同级');
        return;
      }
      // 检查父节点是否在 itemsMap 中（第一层节点的父节点不在 itemsMap 中）
      const hasParentId = item?.parentItemId !== null && item?.parentItemId !== undefined && item?.parentItemId !== 0;
      const parentInMap = hasParentId ? itemsMap.has(String(item!.parentItemId)) : false;

      if (hasParentId && parentInMap) {
        // 有父节点且在 itemsMap 中，传递父节点
        const parentItem = itemsMap.get(String(item!.parentItemId));
        onAdd?.(parentItem || null);
      } else {
        // 第一层节点，父节点是 BOM 头记录，传递 null
        onAdd?.(null);
      }
    }
  }, [selectedKeys, itemsMap, onAdd, canAddSibling]);

  const handleDeleteItem = useCallback(() => {
    if (selectedKeys.length === 0) return;
    const item = itemsMap.get(selectedKeys[0] as string);
    if (!item) return;
    if (!canDeleteItem(item)) {
      message.warning('根节点不能删除');
      return;
    }
    onDelete?.(item);
  }, [selectedKeys, itemsMap, onDelete, canDeleteItem]);

  return (
    <Card
      title={
        <Space>
          <BranchesOutlined />
          <span>BOM结构</span>
        </Space>
      }
      size="small"
      style={{
        height: 'calc(100vh - 150px)',
        display: 'flex',
        flexDirection: 'column',
      }}
      styles={{
        body: {
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        },
      }}
      extra={
        <Space size={4}>
          <Tooltip title="展开全部">
            <Button
              size="small"
              type="text"
              icon={<PlusSquareOutlined />}
              onClick={() => setExpandedKeys(expandAllKeys(treeData))}
              disabled={treeData.length === 0}
            />
          </Tooltip>
          <Tooltip title="折叠全部">
            <Button
              size="small"
              type="text"
              icon={<MinusSquareOutlined />}
              onClick={() => setExpandedKeys([])}
              disabled={treeData.length === 0}
            />
          </Tooltip>
          <Tooltip title="刷新">
            <Button
              size="small"
              type="text"
              icon={<ReloadOutlined />}
              onClick={loadTreeData}
              loading={localLoading}
            />
          </Tooltip>
        </Space>
      }
    >
      <Spin spinning={localLoading || loading} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 搜索框 */}
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
          <Input
            placeholder="搜索物料编码/名称"
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            allowClear
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        {/* 紧凑统计信息条 */}
        {treeData.length > 0 && (
          <div
            style={{
              padding: '6px 12px',
              background: '#fafafa',
              borderBottom: '1px solid #f0f0f0',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <span>
              总计: <strong>{statistics.total}</strong>
            </span>
            <Divider type="vertical" style={{ margin: 0 }} />
            <span>
              层级: <strong>L{statistics.maxLevel}</strong>
            </span>
            <Divider type="vertical" style={{ margin: 0 }} />
            <Space size={8}>
              <span style={{ color: '#52c41a' }}>
                <CheckCircleFilled /> {statistics.active}
              </span>
              <span style={{ color: '#faad14' }}>
                <ClockCircleFilled /> {statistics.draft}
              </span>
              <span style={{ color: '#d9d9d9' }}>
                <StopFilled /> {statistics.inactive}
              </span>
            </Space>
          </div>
        )}

        {/* 树形结构 */}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 4px' }}>
          {filteredTreeData.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={searchValue ? '未找到匹配项' : '暂无数据'}
              style={{ marginTop: 40 }}
            />
          ) : (
            <Tree
              showLine={{ showLeafIcon: false }}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              onExpand={(keys) => setExpandedKeys(keys)}
              onSelect={handleSelect}
              treeData={filteredTreeData}
              titleRender={renderTreeTitle}
              blockNode
              style={{ background: 'transparent' }}
            />
          )}
        </div>

        {/* 底部工具栏 */}
        {treeData.length > 0 && (
          <div
            style={{
              padding: '8px 12px',
              borderTop: '1px solid #f0f0f0',
              background: '#fafafa',
            }}
          >
            <Space size={8} wrap>
              <Tooltip title={(() => {
                if (!onAdd) return '无添加权限';
                if (selectedKeys.length === 0) return '添加子项';
                const item = itemsMap.get(selectedKeys[0] as string);
                if (!canAddChild(item || null)) {
                  const isRoot = !item?.parentItemId;
                  const hasChild = hasChildren(item || null);
                  if (!isRoot && !hasChild) {
                    return '该节点不允许添加子项：只有父节点或根节点才能添加子项';
                  }
                  return '该节点不允许添加子项：顶级父项来源为生产/虚拟/模型时，不能添加子项';
                }
                return '添加子项';
              })()}>
                <Button
                  size="small"
                  type="primary"
                  ghost
                  icon={<PlusOutlined />}
                  onClick={handleAddItem}
                  disabled={
                    !onAdd ||
                    (selectedKeys.length > 0 && !canAddChild(itemsMap.get(selectedKeys[0] as string) || null))
                  }
                >
                  子项
                </Button>
              </Tooltip>
              <Tooltip title={
                !onAdd ? '无添加权限' :
                selectedKeys.length === 0 ? '请先选择节点' :
                !canAddSibling(itemsMap.get(selectedKeys[0] as string) || null)
                  ? '根节点不能添加同级'
                  : '添加同级项'
              }>
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={handleAddSibling}
                  disabled={
                    selectedKeys.length === 0 ||
                    !onAdd ||
                    !canAddSibling(itemsMap.get(selectedKeys[0] as string) || null)
                  }
                >
                  同级
                </Button>
              </Tooltip>
              <Tooltip title={
                selectedKeys.length === 0 ? '请先选择节点' :
                !onDelete ? '无删除权限' :
                !canDeleteItem(itemsMap.get(selectedKeys[0] as string) || null)
                  ? '根节点不能删除'
                  : '删除选中项'
              }>
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteItem}
                  disabled={
                    selectedKeys.length === 0 ||
                    !onDelete ||
                    !canDeleteItem(itemsMap.get(selectedKeys[0] as string) || null)
                  }
                >
                  删除
                </Button>
              </Tooltip>
            </Space>
          </div>
        )}
      </Spin>

      {/* 自定义样式 */}
      <style>{`
        .bom-tree-node:hover {
          background: #e6f7ff !important;
          border-left-color: #1890ff !important;
        }
        .ant-tree-node-content-wrapper {
          flex: 1;
          min-width: 0;
        }
        .ant-tree-title {
          flex: 1;
          min-width: 0;
        }
      `}</style>
    </Card>
  );
};

export default BomTree;
