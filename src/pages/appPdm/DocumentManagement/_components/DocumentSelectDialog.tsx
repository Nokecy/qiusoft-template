import { useMemo, useRef, useState } from 'react';
import { Modal, Button, Space, message } from 'antd';
import type { ColDef } from 'ag-grid-community';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { DocumentGetListAsync } from '@/services/pdm/Document';
import { formatVersionNumber } from '@/pages/appPdm/DocumentManagement/Document/_utils/documentStatus';

export interface DocumentSelectDialogProps {
  open?: boolean;
  visible?: boolean;
  title?: string;
  gridKey?: string;
  filter?: string;
  onCancel: () => void;
  onConfirm: (documents: any[]) => void;
}

const DocumentSelectDialog: React.FC<DocumentSelectDialogProps> = ({
  open,
  visible,
  title = '选择文档',
  gridKey = 'document-select-dialog',
  filter,
  onCancel,
  onConfirm,
}) => {
  const gridRef = useRef<GridRef>();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const isOpen = open ?? visible ?? false;

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: 'documentNumber', headerName: '文档编码', width: 150 },
      { field: 'documentName', headerName: '文档名称', width: 200 },
      { field: 'description', headerName: '文档描述', width: 200 },
      { field: 'documentTypeName', headerName: '文档类型', width: 120 },
      {
        field: 'currentVersion',
        headerName: '当前版本',
        width: 120,
        valueGetter: (params: any) => formatVersionNumber(params.data?.version, params.data?.revision),
      },
      {
        field: 'mainPartNumber',
        headerName: '物料编码',
        width: 150,
        valueGetter: (params: any) => params.data?.primaryPartLink?.partNumber || '',
      },
      {
        field: 'mainPartName',
        headerName: '物料名称',
        width: 180,
        valueGetter: (params: any) => params.data?.primaryPartLink?.partName || '',
      },
      {
        field: 'drawingNumber',
        headerName: '图号',
        width: 150,
        valueGetter: (params: any) => params.data?.primaryPartLink?.drawingNumber || '',
      },
    ],
    []
  );

  const handleConfirm = () => {
    if (selectedRows.length === 0) {
      message.warning('请选择文档');
      return;
    }
    onConfirm(selectedRows);
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      width={1400}
      style={{ top: 20 }}
      bodyStyle={{ height: 'calc(100vh - 200px)', overflow: 'hidden' }}
      footer={null}
      destroyOnClose
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <AgGridPlus
            gridRef={gridRef}
            gridKey={gridKey}
            headerTitle="文档列表"
            request={async (params: any) => {
              let mergedFilter = params?.filter;
              if (filter && mergedFilter) {
                mergedFilter = `${filter}, ${mergedFilter}`;
              } else if (filter) {
                mergedFilter = filter;
              }
              const data = await DocumentGetListAsync({
                Filter: mergedFilter,
                SkipCount: params?.skipCount,
                MaxResultCount: params?.maxResultCount,
                Sorting: params?.sorter,
              });
              return { success: true, data: data.items || [], total: data.totalCount || 0 };
            }}
            columnDefs={columnDefs}
            rowSelection="multiple"
            onSelectionChanged={(event: any) => {
              const selectedNodes = event.api.getSelectedNodes();
              setSelectedRows(selectedNodes.map((node: any) => node.data));
            }}
            style={{ height: '100%' }}
            paginationPageSize={20}
          />
        </div>
        <div style={{ marginTop: 16, padding: '12px 0', textAlign: 'right', borderTop: '1px solid #f0f0f0' }}>
          <Space>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={handleConfirm}>
              确定（已选{selectedRows.length}条）
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentSelectDialog;
