import { AgGridPlus } from '@/components/agGrid';
import type { AgGridPlusRef } from '@nokecy/qc-ui';
import React, { useRef, useMemo } from 'react';
import { ReleaseDocumentItemGetListAsync } from '@/services/pdm/ReleaseDocumentItem';
import {
  documentReleaseStatusEnum,
  recallStatusEnum,
} from '../DocumentRelease/_components/enums';
import type { ColDef } from 'ag-grid-community';

export const routeProps = {
  name: '文档发放查询',
};

const ReleaseDocumentItemList: React.FC = () => {
  const gridRef = useRef<AgGridPlusRef>(null);

  // 列定义
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: 'releaseNumber',
        headerName: '发文号',
        width: 150,
        pinned: 'left',
      },
      {
        field: 'releaseTitle',
        headerName: '发放标题',
        width: 200,
      },
      {
        field: 'documentNumber',
        headerName: '文档编号',
        width: 150,
      },
      {
        field: 'documentName',
        headerName: '文档名称',
        width: 200,
      },
      {
        field: 'releaseVersion',
        headerName: '发放版本号',
        width: 120,
        hideInSearch: true,
      },
      {
        field: 'recallVersion',
        headerName: '回收版本号',
        width: 120,
        hideInSearch: true,
      },
      {
        field: 'copies',
        headerName: '份数',
        width: 100,
        hideInSearch: true,
      },
      {
        field: 'isFirstRelease',
        headerName: '是否首发',
        width: 100,
        hideInSearch: true,
        cellRenderer: (params: any) => {
          return params.value ? '是' : '否';
        },
      },
      {
        field: 'releaseStatus',
        headerName: '发放状态',
        width: 120,
        valueEnum: documentReleaseStatusEnum,
      },
      {
        field: 'releaserName',
        headerName: '发放人',
        width: 120,
        hideInSearch: true,
      },
      {
        field: 'releasedAt',
        headerName: '发放时间',
        width: 160,
        hideInSearch: true,
      },
      {
        field: 'effectiveDate',
        headerName: '生效日期',
        width: 120,
        hideInSearch: true,
      },
      {
        field: 'requiresConfirmation',
        headerName: '是否需要确认',
        width: 120,
        hideInSearch: true,
        cellRenderer: (params: any) => {
          return params.value ? '是' : '否';
        },
      },
      {
        field: 'isRecalled',
        headerName: '是否已回收',
        width: 120,
        hideInSearch: true,
        cellRenderer: (params: any) => {
          return params.value ? '是' : '否';
        },
      },
      {
        field: 'recallStatus',
        headerName: '回收状态',
        width: 120,
        valueEnum: recallStatusEnum,
      },
      {
        field: 'expectedRecallDate',
        headerName: '预计回收时间',
        width: 120,
        hideInSearch: true,
      },
      {
        field: 'actualRecallDate',
        headerName: '实际回收日期',
        width: 120,
        hideInSearch: true,
      },
      {
        field: 'remarks',
        headerName: '备注',
        width: 200,
        hideInSearch: true,
      },
    ],
    []
  );

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="文档发放查询"
      gridKey="pdm-release-document-item"
      request={async (params) => {
        try {
          const data = await ReleaseDocumentItemGetListAsync({
            MaxResultCount: params.maxResultCount,
            SkipCount: params.skipCount,
            Filter: params.filter,
            Sorting: params.sorter,
            ReleaseStatus: params.ReleaseStatus,
            RecallStatus: params.RecallStatus,
          });
          return {
            success: true,
            data: data.items || [],
            total: data.totalCount || 0,
          };
        } catch (error) {
          console.error('获取列表失败:', error);
          return {
            success: false,
            data: [],
            total: 0,
          };
        }
      }}
      columnDefs={columnDefs}
    />
  );
};

export default ReleaseDocumentItemList;
