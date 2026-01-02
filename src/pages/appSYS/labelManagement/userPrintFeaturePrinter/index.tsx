/**
 * 标签管理 - 用户打印功能打印机设置列表页面
 */

import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import UserPrintFeaturePrinterFormDialog from './components/formDialog';
import { EditOutlined } from '@ant-design/icons';
import {
  UserPrintFeaturePrinterGetListAsync,
  UserPrintFeaturePrinterSetAsync,
  UserPrintFeaturePrinterGetAsync,
} from '@/services/openApi/UserPrintFeaturePrinter';
import { UserPrintFeaturePrinter as UserPrintFeaturePrinterPermission } from '../../_permissions/labelManagement';

export const routeProps = {
  name: '用户打印功能打印机设置',
};

const UserPrintFeaturePrinterPage = () => {
  const intl = useIntl();
  const gridRef = useRef<GridRef>();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data, onRefresh } = props;

    const refresh = () => {
      onRefresh();
    };

    return (
      <Space>
        <Access accessible={!!access[UserPrintFeaturePrinterPermission.Set]}>
          <UserPrintFeaturePrinterFormDialog
            getRequest={UserPrintFeaturePrinterGetAsync}
            setRequest={UserPrintFeaturePrinterSetAsync}
            title="编辑打印机设置"
            entityId={data.id}
            onAfterSubmit={refresh}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>
      </Space>
    );
  };

  const columnDefs: any = [
    { headerName: '用户名', field: 'userName', width: 150 },
    { headerName: '功能点代码', field: 'printerFeatureCode', width: 250 },
    { headerName: '打印客户端', field: 'printerClientDisplayName', width: 180 },
    { headerName: '打印机名称', field: 'printerName', width: 180, flex: 1 },
    {
      headerName: '创建时间',
      field: 'creationTime',
      width: 180,
      type: 'dateTimeColumn',
      hideInSearch: true,
      initialSort: 'desc',
    },
    {
      headerName: '最后修改时间',
      field: 'lastModificationTime',
      width: 180,
      type: 'dateTimeColumn',
      hideInSearch: true,
    },
    {
      headerName: '操作',
      field: '',
      width: 100,
      pinned: 'right',
      filter: false,
      cellRenderer: (props: any) => <Options {...props} />,
      cellRendererParams: { onRefresh },
    },
  ];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="用户打印功能打印机设置列表"
      gridKey="label-management.user-print-feature-printer"
      request={async (params: any) => {
        const data = await UserPrintFeaturePrinterGetListAsync({
          PageSize: params!.maxResultCount,
          Filter: params?.filter,
          MaxResultCount: params!.maxResultCount,
          SkipCount: params!.skipCount,
          Sorting: params!.sorter!,
        });
        return {
          success: true,
          data: data.items!,
          total: data.totalCount,
        };
      }}
      toolBarRender={() => [
        <Access key="set" accessible={!!access[UserPrintFeaturePrinterPermission.Set]}>
          <UserPrintFeaturePrinterFormDialog
            setRequest={UserPrintFeaturePrinterSetAsync}
            title="新建打印机设置"
            onAfterSubmit={onRefresh}
          >
            新建
          </UserPrintFeaturePrinterFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default UserPrintFeaturePrinterPage;
