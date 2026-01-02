import React, { useState, useCallback, useEffect } from 'react';
import { Tree, Input, Spin, Empty } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { DocumentLibraryGetListAsync } from '@/services/pdm/DocumentLibrary';
import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';

const { Search } = Input;

interface LibraryTreeProps {
    /** 选中的库ID */
    selectedLibraryId?: string;
    /** 选中变化回调 */
    onSelect?: (libraryId: string, libraryData: any) => void;
    /** 样式 */
    style?: React.CSSProperties;
}

/** 文档库树形组件 */
const LibraryTree: React.FC<LibraryTreeProps> = ({
    selectedLibraryId,
    onSelect,
    style,
}) => {
    const [treeData, setTreeData] = useState<DataNode[]>([]);
    const [loading, setLoading] = useState(false);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [libraryMap, setLibraryMap] = useState<Map<string, any>>(new Map());

    // 构建树形数据
    const buildTreeData = useCallback((libraries: any[]): DataNode[] => {
        const map = new Map<string, any>();
        libraries.forEach(lib => map.set(lib.id, lib));
        setLibraryMap(map);

        // 构建父子关系
        const childrenMap = new Map<string, any[]>();
        libraries.forEach(lib => {
            const parentId = lib.parentLibraryId || 'root';
            if (!childrenMap.has(parentId)) {
                childrenMap.set(parentId, []);
            }
            childrenMap.get(parentId)!.push(lib);
        });

        // 递归构建树节点
        const buildNodes = (parentId: string): DataNode[] => {
            const children = childrenMap.get(parentId) || [];
            return children
                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map(lib => ({
                    key: lib.id,
                    title: lib.libraryName || lib.libraryCode,
                    icon: <FolderOutlined />,
                    children: buildNodes(lib.id),
                }));
        };

        return buildNodes('root');
    }, []);

    // 加载数据
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await DocumentLibraryGetListAsync({
                SkipCount: 0,
                MaxResultCount: 10000,
                Sorting: 'sortOrder',
            } as any);
            const data = buildTreeData(response.items || []);
            setTreeData(data);
            // 默认展开第一层
            if (data.length > 0) {
                setExpandedKeys(data.map(n => n.key));
            }
        } catch (error) {
            console.error('加载文档库失败:', error);
        } finally {
            setLoading(false);
        }
    }, [buildTreeData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // 搜索过滤
    const filterTree = useCallback((data: DataNode[], searchText: string): DataNode[] => {
        if (!searchText) return data;

        const filter = (nodes: DataNode[]): DataNode[] => {
            return nodes.reduce<DataNode[]>((acc, node) => {
                const title = String(node.title || '');
                const children = node.children ? filter(node.children) : [];
                if (title.toLowerCase().includes(searchText.toLowerCase()) || children.length > 0) {
                    acc.push({
                        ...node,
                        children: children.length > 0 ? children : node.children,
                    });
                }
                return acc;
            }, []);
        };

        return filter(data);
    }, []);

    const filteredData = filterTree(treeData, searchValue);

    const handleSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        if (selectedKeys.length > 0) {
            const key = selectedKeys[0] as string;
            const libraryData = libraryMap.get(key);
            onSelect?.(key, libraryData);
        }
    };

    const handleExpand: TreeProps['onExpand'] = (keys) => {
        setExpandedKeys(keys);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', ...style }}>
            <Search
                placeholder="搜索文档库..."
                allowClear
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ marginBottom: 8 }}
            />
            <Spin spinning={loading}>
                {filteredData.length > 0 ? (
                    <Tree
                        showIcon
                        treeData={filteredData}
                        expandedKeys={expandedKeys}
                        selectedKeys={selectedLibraryId ? [selectedLibraryId] : []}
                        onSelect={handleSelect}
                        onExpand={handleExpand}
                        style={{ flex: 1, overflow: 'auto' }}
                    />
                ) : (
                    <Empty description="暂无数据" />
                )}
            </Spin>
        </div>
    );
};

export default LibraryTree;
