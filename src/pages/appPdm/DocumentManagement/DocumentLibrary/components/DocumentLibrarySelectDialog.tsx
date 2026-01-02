import React from 'react';
import { Modal, message, Tag } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { useRef, useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { DocumentLibraryGetListAsync } from '@/services/pdm/DocumentLibrary';

// 文档库类型枚举
enum DocumentLibraryType {
    Storage = 1,  // 存储库
    Recycle = 2,  // 回收库
}

// 从扁平列表构建带hierarchy的数据（参考文档库列表页面实现）
const buildFlatDataWithHierarchy = (flatList: any[], libraryType?: number) => {
    if (!flatList || flatList.length === 0) {
        return [];
    }

    // 先过滤数据
    let filteredList = flatList.filter((item: any) => item.isActive === true);
    if (libraryType !== undefined) {
        filteredList = filteredList.filter((item: any) => item.libraryType === libraryType);
    }

    // 建立 id -> item 映射
    const itemMap = new Map<string, any>();
    filteredList.forEach(item => {
        itemMap.set(item.id, { ...item });
    });

    // 建立 parentId -> children 映射
    const childrenMap = new Map<string, any[]>();
    filteredList.forEach(item => {
        const parentId = item.parentLibraryId || 'root';
        if (!childrenMap.has(parentId)) {
            childrenMap.set(parentId, []);
        }
        const mappedItem = itemMap.get(item.id);
        if (mappedItem) {
            childrenMap.get(parentId)!.push(mappedItem);
        }
    });

    // 递归构建 hierarchy
    const result: any[] = [];
    const buildHierarchy = (parentId: string | null, parentPath: string[]) => {
        const children = childrenMap.get(parentId || 'root') || [];
        // 按 sortOrder 排序
        children.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        children.forEach(item => {
            const currentPath = [...parentPath, item.libraryName || item.libraryCode || String(item.id)];
            const newItem = {
                ...item,
                _hierarchy: currentPath
            };
            result.push(newItem);
            buildHierarchy(item.id, currentPath);
        });
    };

    buildHierarchy(null, []);
    return result;
};

interface DocumentLibrarySelectDialogProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (library: any) => void;
    libraryType?: DocumentLibraryType; // 可选的文档库类型筛选
    title?: string;
}

const DocumentLibrarySelectDialog: React.FC<DocumentLibrarySelectDialogProps> = ({
    visible,
    onCancel,
    onConfirm,
    libraryType,
    title,
}) => {
    const gridRef = useRef<AgGridReact>(null);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    // 当弹窗关闭时清空选中状态
    useEffect(() => {
        if (!visible) {
            setSelectedRows([]);
        }
    }, [visible]);

    // 列定义
    const columnDefs: ColDef[] = useMemo(() => [
        {
            field: 'libraryCode',
            headerName: '库编码',
            width: 150,
        },
        {
            field: 'libraryType',
            headerName: '类型',
            width: 100,
            cellRenderer: (params: any) => {
                const typeMap: Record<number, { label: string; color: string }> = {
                    1: { label: '存储库', color: 'blue' },
                    2: { label: '回收库', color: 'orange' },
                };
                const config = typeMap[params.value];
                return config ? (
                    <Tag color={config.color}>{config.label}</Tag>
                ) : '-';
            }
        },
        {
            field: 'isActive',
            headerName: '状态',
            width: 80,
            cellRenderer: (params: any) => (
                <Tag color={params.value ? '#52c41a' : '#d9d9d9'}>
                    {params.value ? '启用' : '禁用'}
                </Tag>
            )
        },
        {
            field: 'description',
            headerName: '描述',
            width: 200,
        },
    ], []);

    const handleConfirm = () => {
        if (selectedRows.length === 0) {
            message.warning('请选择一个文档库');
            return;
        }

        onConfirm(selectedRows[0]); // 单选模式，只返回第一个选中的
        onCancel();
    };

    // 获取弹窗标题
    const getTitle = () => {
        if (title) return title;
        if (libraryType === DocumentLibraryType.Storage) return '选择存储库';
        if (libraryType === DocumentLibraryType.Recycle) return '选择回收库';
        return '选择文档库';
    };

    return (
        <Modal
            title={getTitle()}
            open={visible}
            onCancel={onCancel}
            onOk={handleConfirm}
            width={1200}
            destroyOnClose
            style={{ top: 30 }}
            styles={{ body: { height: 650, padding: '16px' } }}
        >
            <style>
                {`
                    .document-library-select-dialog .ant-input-affix-wrapper,
                    .document-library-select-dialog .qc-grid-search-input {
                        width: 150px !important;
                        max-width: 150px !important;
                    }
                `}
            </style>
            <div className="document-library-select-dialog" style={{ height: '100%' }}>
                <AgGridPlus
                    gridRef={gridRef}
                    gridKey="document-library-select-dialog"
                    treeData={true}
                    getDataPath={(data) => data._hierarchy}
                    autoGroupColumnDef={{
                        headerName: '库名称',
                        minWidth: 280,
                        cellRendererParams: {
                            suppressCount: true,
                            checkbox: true,
                            innerRenderer: (params: any) => params.data?.libraryName || params.data?.libraryCode || '-'
                        }
                    }}
                    groupDefaultExpanded={-1}
                    request={async (params: any) => {
                        const data = await DocumentLibraryGetListAsync({
                            Filter: params?.filter,
                            SkipCount: 0,
                            MaxResultCount: 10000,
                            Sorting: params?.sorter || 'sortOrder',
                        });

                        const flatData = buildFlatDataWithHierarchy(data.items || [], libraryType);
                        return {
                            success: true,
                            data: flatData,
                            total: flatData.length,
                        };
                    }}
                    columnDefs={columnDefs}
                    rowSelection="single"
                    onSelectionChanged={(event: any) => {
                        const selectedNodes = event.api.getSelectedNodes();
                        setSelectedRows(selectedNodes.map((node: any) => node.data));
                    }}
                />
            </div>
        </Modal>
    );
};

export default DocumentLibrarySelectDialog;
