import React, { useState, useEffect } from 'react';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Tag, Badge } from 'antd';
import { ToolOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRef, useMemo } from 'react';
import { CalendarDateDefinitionGetManualAdjustmentHistoryAsync } from '@/services/openApi/CalendarDateDefinition';

interface AdjustmentHistoryProps {
  calendarDefinitionId: string;
}

const AdjustmentHistory: React.FC<AdjustmentHistoryProps> = ({ calendarDefinitionId }) => {
  const gridRef = useRef<GridRef>();

  const columnDefs: any = useMemo(
    () => [
      {
        headerName: '调整日期',
        field: 'date',
        width: 150,
        cellRenderer: ({ value }: any) => (value ? dayjs(value).format('YYYY-MM-DD') : '-'),
      },
      {
        headerName: '星期',
        field: 'date',
        width: 100,
        hideInSearch: true,
        cellRenderer: ({ value }: any) => (value ? dayjs(value).format('dddd') : '-'),
      },
      {
        headerName: '调整后状态',
        field: 'isWorkday',
        width: 120,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? (
            <Tag color="blue">工作日</Tag>
          ) : (
            <Tag color="default">休息日</Tag>
          ),
      },
      {
        headerName: '实际工时',
        field: 'actualWorkHours',
        width: 120,
        hideInSearch: true,
        cellRenderer: ({ value }: any) => (
          <span>
            <ClockCircleOutlined /> {value || 0} 小时
          </span>
        ),
      },
      {
        headerName: '调整备注',
        field: 'manualAdjustmentRemark',
        flex: 1,
        minWidth: 200,
        cellRenderer: ({ value }: any) => value || '-',
      },
      {
        headerName: '调整时间',
        field: 'manualAdjustmentTime',
        width: 180,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
      {
        headerName: '调整人',
        field: 'manualAdjustmentBy',
        width: 120,
        hideInSearch: true,
        cellRenderer: ({ value }: any) => value || '-',
      },
    ],
    []
  );

  return (
    <div style={{ height: 'calc(100vh - 300px)', minHeight: '400px' }}>
      <AgGridPlus
        gridRef={gridRef}
        gridKey="calendar-adjustment-history"
        headerTitle="手动调整历史记录"
        request={async () => {
          try {
            const data = await CalendarDateDefinitionGetManualAdjustmentHistoryAsync({
              calendarDefinitionId: calendarDefinitionId,
            });
            return {
              success: true,
              data: data || [],
              total: data?.length || 0,
            };
          } catch (error) {
            console.error('加载调整历史失败:', error);
            return { success: false, data: [], total: 0 };
          }
        }}
        columnDefs={columnDefs}
        pagination={false}
      />
    </div>
  );
};

export default AdjustmentHistory;
