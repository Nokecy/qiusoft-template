/**
 * 标签管理 - 标签分类列表页面
 */

import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import LabelCategoryFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  LabelCategoryGetListAsync,
  LabelCategoryCreateAsync,
  LabelCategoryUpdateAsync,
  LabelCategoryDeleteAsync,
  LabelCategoryGetAsync,
} from '@/services/openApi/LabelCategory';
import { LabelCategory as LabelCategoryPermission } from '../../_permissions/labelManagement';

export const routeProps = {
  name: '标签分类',
};

/**
 * 标签分类列表
 */
const LabelCategoryPage = () => {
  const intl = useIntl();
  const gridRef = useRef<GridRef>();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 操作列渲染
  const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
      onRefresh();
    };

    const handleDelete = (id: any) => {
      const hide = message.loading('正在删除，请稍后', 0);
      return LabelCategoryDeleteAsync({ id })
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
        <Access accessible={!!access[LabelCategoryPermission.Update]}>
          <LabelCategoryFormDialog
            getRequest={LabelCategoryGetAsync}
            createRequest={LabelCategoryCreateAsync}
            updateRequest={LabelCategoryUpdateAsync}
            title="编辑标签分类"
            entityId={data.id}
            onAfterSubmit={() => {
              refresh();
            }}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>

        <Access accessible={!!access[LabelCategoryPermission.Delete]}>
          <DeleteConfirm title="确定删除此标签分类?" onConfirm={() => handleDelete(data.id)}>
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="link"
              danger
              title={intl.formatMessage({ id: 'AbpUi:Delete' })}
            />
          </DeleteConfirm>
        </Access>
      </Space>
    );
  };

  // 列定义
  const columnDefs: any = [
    {
      headerName: '编码',
      field: 'code',
      width: 150,
    },
    {
      headerName: '名称',
      field: 'name',
      width: 200,
    },
    {
      headerName: '备注',
      field: 'remark',
      width: 300,
      flex: 1,
    },
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
      headerTitle="标签分类列表"
      gridKey="label-management.label-category"
      request={async (params: any) => {
        const data = await LabelCategoryGetListAsync({
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
      toolBarRender={() => {
        return [
          <Access key="create" accessible={!!access[LabelCategoryPermission.Create]}>
            <LabelCategoryFormDialog
              createRequest={LabelCategoryCreateAsync}
              updateRequest={LabelCategoryUpdateAsync}
              title="新建标签分类"
              onAfterSubmit={onRefresh}
            >
              新建
            </LabelCategoryFormDialog>
          </Access>,
        ];
      }}
      columnDefs={columnDefs}
    />
  );
};

export default LabelCategoryPage;
