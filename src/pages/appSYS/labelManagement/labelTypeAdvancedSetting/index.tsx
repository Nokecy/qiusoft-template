/**
 * 标签管理 - 标签类型高级设置列表页面
 */

import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import LabelTypeAdvancedSettingFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  LabelTypeAdvancedSettingGetListAsync,
  LabelTypeAdvancedSettingCreateAsync,
  LabelTypeAdvancedSettingUpdateAsync,
  LabelTypeAdvancedSettingDeleteAsync,
  LabelTypeAdvancedSettingGetAsync,
} from '@/services/openApi/LabelTypeAdvancedSetting';
import { LabelTypeAdvancedSetting as LabelTypeAdvancedSettingPermission } from '../../_permissions/labelManagement';

export const routeProps = {
  name: '标签类型高级设置',
};

const LabelTypeAdvancedSettingPage = () => {
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
      return LabelTypeAdvancedSettingDeleteAsync({ id })
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
        <Access accessible={!!access[LabelTypeAdvancedSettingPermission.Update]}>
          <LabelTypeAdvancedSettingFormDialog
            getRequest={LabelTypeAdvancedSettingGetAsync}
            createRequest={LabelTypeAdvancedSettingCreateAsync}
            updateRequest={LabelTypeAdvancedSettingUpdateAsync}
            title="编辑标签类型高级设置"
            entityId={data.id}
            onAfterSubmit={refresh}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>

        <Access accessible={!!access[LabelTypeAdvancedSettingPermission.Delete]}>
          <DeleteConfirm title="确定删除此标签类型高级设置?" onConfirm={() => handleDelete(data.id)}>
            <Button size="small" icon={<DeleteOutlined />} type="link" danger />
          </DeleteConfirm>
        </Access>
      </Space>
    );
  };

  const columnDefs: any = [
    { headerName: '标签编码', field: 'labelCode', width: 150 },
    { headerName: '标签名称', field: 'labelName', width: 150 },
    { headerName: '排序', field: 'sort', width: 100, hideInSearch: true },
    { headerName: '提供商名称', field: 'providerName', width: 150 },
    { headerName: '提供商描述', field: 'providerDescribe', width: 200, flex: 1 },
    { headerName: '标签模板ID', field: 'labelTemplateId', width: 200 },
    { headerName: '标签模板名称', field: 'labelTemplateName', width: 150 },
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
      headerTitle="标签类型高级设置列表"
      gridKey="label-management.label-type-advanced-setting"
      request={async (params: any) => {
        const data = await LabelTypeAdvancedSettingGetListAsync({
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
        <Access key="create" accessible={!!access[LabelTypeAdvancedSettingPermission.Create]}>
          <LabelTypeAdvancedSettingFormDialog
            createRequest={LabelTypeAdvancedSettingCreateAsync}
            updateRequest={LabelTypeAdvancedSettingUpdateAsync}
            title="新建标签类型高级设置"
            onAfterSubmit={onRefresh}
          >
            新建
          </LabelTypeAdvancedSettingFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default LabelTypeAdvancedSettingPage;
