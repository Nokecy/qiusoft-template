import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import type { API } from '@/services/typings';

interface BomRelationTableProps {
    request: (params: any) => Promise<API.BurnAbpPdmBomManagementBomsBomRelationViewDto[]>;
    params?: any;
    showLevel?: boolean;
}

const BomRelationTable: React.FC<BomRelationTableProps> = ({ request, params, showLevel }) => {
    const [dataSource, setDataSource] = useState<API.BurnAbpPdmBomManagementBomsBomRelationViewDto[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (!params || Object.keys(params).length === 0 || (!params.materialCode && !params.bomId)) {
                setDataSource([]);
                return;
            }

            setLoading(true);
            try {
                const data = await request(params);
                setDataSource(data || []);
            } catch (error) {
                console.error('加载BOM关联数据失败:', error);
                setDataSource([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [request, JSON.stringify(params)]);

    const columns = [
        <AgGridColumn key="materialCode" field="materialCode" headerName="物料编码" width={150} sortable filter />,
        <AgGridColumn key="materialDescription" field="materialDescription" headerName="物料描述" width={200} tooltipField="materialDescription" sortable filter />,
        <AgGridColumn key="drawingNumber" field="drawingNumber" headerName="图号" width={150} sortable filter />,
        <AgGridColumn
            key="version"
            field="version"
            headerName="版本"
            width={100}
            cellRenderer={(params: any) => params.value || '-'}
            sortable
            filter
        />,
        <AgGridColumn
            key="quantity"
            field="quantity"
            headerName="数量"
            width={100}
            cellRenderer={(params: any) => params.value ?? '-'}
            sortable
            filter
        />,
        <AgGridColumn key="unitOfMeasure" field="unitOfMeasure" headerName="单位" width={80} sortable filter />,
    ];

    if (showLevel) {
        columns.push(
            <AgGridColumn key="level" field="level" headerName="层级" width={80} sortable filter />
        );
    }

    return (
        <div className="ag-theme-balham" style={{ height: '100%', width: '100%' }}>
            <AgGridPlus
                dataSource={dataSource}
                style={{ height: 400 }} // 或者根据容器自适应
                search={false}
                hideTool={true}
                loading={loading}
                toolBarRender={() => []}
            >
                {columns}
            </AgGridPlus>
        </div>
    );
};

export default BomRelationTable;
