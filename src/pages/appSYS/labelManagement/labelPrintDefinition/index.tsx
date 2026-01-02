/**
 * 标签管理 - 标签打印定义列表页面
 */

import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import LabelPrintDefinitionFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  LabelPrintDefinitionGetListAsync,
  LabelPrintDefinitionCreateAsync,
  LabelPrintDefinitionUpdateAsync,
  LabelPrintDefinitionDeleteAsync,
  LabelPrintDefinitionGetAsync,
} from '@/services/openApi/LabelPrintDefinition';
import { LabelPrintDefinition as LabelPrintDefinitionPermission } from '../../_permissions/labelManagement';

export const routeProps = {
  name: '标签打印定义',
};

const LabelPrintDefinitionPage = () => {
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

    const handleDelete = (id: any) => {
      const hide = message.loading('正在删除，请稍后', 0);
      return LabelPrintDefinitionDeleteAsync({ id })
        .then(() => {
          message.success('删除成功');
          refresh();
        })
        .catch((error) => {
          message.error('删除失败');
          console.error('删除失败:', error);
        })
        .finally(() => {
          hide();
        });
    };

    return (
      <Space>
        <Access accessible={!!access[LabelPrintDefinitionPermission.Update]}>
          <LabelPrintDefinitionFormDialog
            getRequest={LabelPrintDefinitionGetAsync}
            createRequest={LabelPrintDefinitionCreateAsync}
            updateRequest={LabelPrintDefinitionUpdateAsync}
            title="编辑标签打印定义"
            entityId={data.id}
            onAfterSubmit={refresh}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>

        <Access accessible={!!access[LabelPrintDefinitionPermission.Delete]}>
          <DeleteConfirm title="确定删除此标签打印定义?" onConfirm={() => handleDelete(data.id)}>
            <Button size="small" icon={<DeleteOutlined />} type="link" danger />
          </DeleteConfirm>
        </Access>
      </Space>
    );
  };

  const columnDefs: any = [
    { headerName: '功能编码', field: 'feature', width: 150 },
    { headerName: '功能名称', field: 'featureName', width: 150 },
    { headerName: '标签类型编码', field: 'labelTypeCode', width: 150 },
    { headerName: '标签类型名称', field: 'labelTypeName', width: 150 },
    { headerName: '顺序', field: 'order', width: 100, hideInSearch: true },
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
      width: 160,
      pinned: 'right',
      filter: false,
      cellRenderer: (props: any) => <Options {...props} />,
      cellRendererParams: { onRefresh },
    },
  ];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="标签打印定义列表"
      gridKey="label-management.label-print-definition"
      request={async (params: any) => {
        const data = await LabelPrintDefinitionGetListAsync({
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
        <Access key="create" accessible={!!access[LabelPrintDefinitionPermission.Create]}>
          <LabelPrintDefinitionFormDialog
            createRequest={LabelPrintDefinitionCreateAsync}
            updateRequest={LabelPrintDefinitionUpdateAsync}
            title="新建标签打印定义"
            onAfterSubmit={onRefresh}
          >
            新建
          </LabelPrintDefinitionFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default LabelPrintDefinitionPage;
