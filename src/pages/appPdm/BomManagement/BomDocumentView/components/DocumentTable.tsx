import React, { useMemo } from 'react';
import { AgGridPlus } from '@/components/agGrid';
import { Tag, Empty, Skeleton } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import type { API } from '@/services/typings';
import type { ColDef } from 'ag-grid-community';

interface DocumentTableProps {
    documents: API.BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto[];
    loading?: boolean;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, loading = false }) => {

    const columnDefs: ColDef[] = useMemo(
        () => [
            {
                headerName: '物料编号',
                field: 'partNumber',
                width: 150,
                pinned: 'left',
                cellRenderer: ({ value }: any) => <strong style={{ color: '#1890ff' }}>{value}</strong>,
            },
            {
                headerName: '物料名称',
                field: 'partName',
                width: 200,
            },
            {
                headerName: '文档编号',
                field: 'documentNumber',
                width: 150,
                cellRenderer: ({ value }: any) => <strong style={{ color: '#52c41a' }}>{value}</strong>,
            },
            {
                headerName: '文档名称',
                field: 'documentName',
                width: 200,
                flex: 1,
            },
            {
                headerName: '关联用途',
                field: 'usage',
                width: 120,
                cellRenderer: ({ value }: any) => {
                    const usageMap: Record<number, string> = {
                        10: '2D设计图纸',
                        20: '3D设计模型',
                        30: '作业指导书',
                        40: '检验计划',
                        50: '认证证书',
                        60: '安全数据表',
                        70: '包装规范',
                        80: '供应商文档',
                    };
                    return usageMap[value] || '-';
                },
            },
            {
                headerName: '主/次',
                field: 'isPrimary',
                width: 80,
                cellRenderer: ({ value }: any) =>
                    value ? <Tag color="blue">主要</Tag> : <Tag>次要</Tag>,
            },
        ],
        []
    );

    if (loading) {
        return (
            <div style={{ padding: 16 }}>
                <Skeleton active paragraph={{ rows: 8 }} />
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <div style={{ padding: 40 }}>
                <Empty
                    description={
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: 8, color: '#999', fontSize: 14 }}>该节点暂无关联文档</p>
                            <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>
                                <FileTextOutlined style={{ marginRight: 4 }} />
                                请从左侧BOM树选择其他节点查看
                            </p>
                        </div>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        );
    }

    return (
        <AgGridPlus
            columnDefs={columnDefs}
            rowData={documents}
            loading={loading}
            pagination
            paginationPageSize={20}
            domLayout="autoHeight"
        />
    );
};

export default DocumentTable;
