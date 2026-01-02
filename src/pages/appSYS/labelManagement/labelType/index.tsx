/**
 * 标签管理 - 标签类型列表页面
 */

import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import LabelTypeFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  LabelTypeGetListAsync,
  LabelTypeCreateAsync,
  LabelTypeUpdateAsync,
  LabelTypeDeleteAsync,
  LabelTypeGetAsync,
} from '@/services/openApi/LabelType';
import { LabelType as LabelTypePermission } from '../../_permissions/labelManagement';

export const routeProps = {
  name: '标签类型',
};

const LabelTypePage = () => {
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
      return LabelTypeDeleteAsync({ id })
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
        <Access accessible={!!access[LabelTypePermission.Update]}>
          <LabelTypeFormDialog
            getRequest={LabelTypeGetAsync}
            createRequest={LabelTypeCreateAsync}
            updateRequest={LabelTypeUpdateAsync}
            title="编辑标签类型"
            entityId={data.id}
            onAfterSubmit={refresh}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>

        <Access accessible={!!access[LabelTypePermission.Delete]}>
          <DeleteConfirm title="确定删除此标签类型?" onConfirm={() => handleDelete(data.id)}>
            <Button size="small" icon={<DeleteOutlined />} type="link" danger />
          </DeleteConfirm>
        </Access>
      </Space>
    );
  };

  const columnDefs: any = [
    { headerName: '编码', field: 'code', width: 120 },
    { headerName: '名称', field: 'name', width: 150 },
    { headerName: '分类编码', field: 'categoryCode', width: 120 },
    { headerName: '分类名称', field: 'categoryName', width: 150 },
    { headerName: '默认打印模板', field: 'defaultPrintTemplateName', width: 180 },
    { headerName: '默认打印数量', field: 'defaultPrintQuantity', width: 120, hideInSearch: true },
    { headerName: '备注', field: 'remark', width: 200, flex: 1 },
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
      headerTitle="标签类型列表"
      gridKey="label-management.label-type"
      request={async (params: any) => {
        const data = await LabelTypeGetListAsync({
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
        <Access key="create" accessible={!!access[LabelTypePermission.Create]}>
          <LabelTypeFormDialog
            createRequest={LabelTypeCreateAsync}
            updateRequest={LabelTypeUpdateAsync}
            title="新建标签类型"
            onAfterSubmit={onRefresh}
          >
            新建
          </LabelTypeFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default LabelTypePage;
