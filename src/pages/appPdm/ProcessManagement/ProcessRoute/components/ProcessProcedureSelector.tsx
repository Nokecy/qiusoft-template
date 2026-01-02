import React, { useRef } from 'react';
import { Modal } from 'antd';
import { AgGridPlus } from '@nokecy/qc-ui';
import { ProcessProcedureGetListAsync } from '@/services/pdm/ProcessProcedure';
import type { ColDef } from 'ag-grid-community';

interface ProcessProcedureSelectorProps {
  visible: boolean;
  onCancel: () => void;
  onSelect: (selectedRows: any[]) => void;
}

/**
 * 工序选择器对话框
 * 用于选择要添加到工艺路线中的工序
 */
const ProcessProcedureSelector: React.FC<ProcessProcedureSelectorProps> = ({
  visible,
  onCancel,
  onSelect,
}) => {
  const gridRef = useRef<any>();

  // 列定义
  const columnDefs: ColDef[] = [
    {
      field: 'code',
      headerName: '工序编码',
      width: 150,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'name',
      headerName: '工序名称',
      width: 200,
      filter: 'agTextColumnFilter',
    },
    {
      field: '{value:workCenterId,label:workCenterName}',
      headerName: '工作中心',
      width: 200,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => params.data?.workCenterName,
    },
    {
      field: 'processProcedureCategoryName',
      headerName: '工序分类',
      width: 150,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'memo',
      headerName: '备注',
      width: 200,
      filter: 'agTextColumnFilter',
      hideInSearch: true,
    },
  ];

  // 确认选择
  const handleOk = () => {
    const selectedRows = gridRef.current?.getSelectedRows() || [];
    if (selectedRows.length === 0) {
      return;
    }
    onSelect(selectedRows);
  };

  return (
    <Modal
      title="选择工序"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      width={1000}
      okText="确定"
      cancelText="取消"
    >
      <div style={{ height: '500px' }}>
        <AgGridPlus
          gridRef={gridRef}
          gridKey="process-procedure-selector"
          headerTitle="工序列表"
          request={async (params: any) => {
            const data = await ProcessProcedureGetListAsync({
              PageSize: params!.maxResultCount,
              Filter: params?.filter,
              MaxResultCount: params!.maxResultCount,
              SkipCount: params!.skipCount,
              Sorting: params!.sorter!,
            });
            return {
              success: true,
              data: data.items || [],
              total: data.totalCount || 0,
            };
          }}
          columnDefs={columnDefs}
          rowSelection="multiple"
          toolBarRender={false}
        />
      </div>
    </Modal>
  );
};

export default ProcessProcedureSelector;
