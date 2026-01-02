import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DynamicApplicationGetListAsync,
  DynamicApplicationDeleteAsync,
} from '@/services/openApi/DynamicApplication';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Switch } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { DynamicApplicationPermissions } from '../_permissions';
import dayjs from 'dayjs';
import ApplicationFormDialog from './_components/FormDialog';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = !!(access && (access[DynamicApplicationPermissions.Update] ?? true));
  const canDelete = !!(access && (access[DynamicApplicationPermissions.Delete] ?? true));
  const canManage = !!(access && (access[DynamicApplicationPermissions.Manage] ?? true));

  // 删除应用
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await DynamicApplicationDeleteAsync({ id: data.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 配置应用（跳转到实体管理）
  const handleConfig = () => {
    history.push(`/appSYS/dynamic-schema/applications/config?id=${data.id}`);
  };

  // 数据管理
  const handleDataManage = () => {
    history.push(`/appSYS/dynamic-schema/data?applicationName=${data.name}`);
  };

  return (
    <Space>
      <Access accessible={canManage}>
        <Button
          size="small"
          icon={<DatabaseOutlined />}
          type="link"
          title="数据管理"
          onClick={handleDataManage}
        />
      </Access>
      <Access accessible={canManage}>
        <Button
          size="small"
          icon={<SettingOutlined />}
          type="link"
          title="配置"
          onClick={handleConfig}
        />
      </Access>
      <Access accessible={canUpdate}>
        <ApplicationFormDialog
          title="编辑应用"
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ size: 'small', icon: <EditOutlined />, type: 'link', title: '编辑' }}
        />
      </Access>
      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除该应用?" onConfirm={handleDelete}>
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

const DynamicApplicationListPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[DynamicApplicationPermissions.Create] ?? true));

  const onRefresh = () => gridRef.current?.onRefresh();

  // 列定义
  const columnDefs: any = useMemo(
    () => [
      {
        field: 'name',
        headerName: '应用标识',
        width: 160,
      },
      {
        field: 'displayName',
        headerName: '显示名称',
        width: 180,
      },
      {
        field: 'description',
        headerName: '描述',
        width: 240,
        hideInSearch: true,
      },
      {
        field: 'icon',
        headerName: '图标',
        width: 100,
        hideInSearch: true,
      },
      {
        field: 'entityCount',
        headerName: '实体数',
        width: 100,
        hideInSearch: true,
      },
      {
        field: 'displayOrder',
        headerName: '排序',
        width: 80,
        hideInSearch: true,
      },
      {
        field: 'isEnabled',
        headerName: '启用状态',
        width: 100,
        hideInSearch: true,
        cellRenderer: ({ value }: any) => (
          <Switch checked={value} disabled size="small" />
        ),
      },
      {
        field: 'workflowEnabled',
        headerName: '启用工作流',
        width: 110,
        hideInSearch: true,
        cellRenderer: ({ value }: any) => (
          <Switch checked={value} disabled size="small" />
        ),
      },
      {
        field: 'workflowName',
        headerName: '工作流名称',
        width: 150,
        hideInSearch: true,
      },
      {
        field: 'creationTime',
        headerName: '创建时间',
        width: 160,
        hideInSearch: true,
        initialSort: 'desc',
        cellRenderer: ({ value }: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
      },
      {
        field: 'action',
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        width: 140,
        pinned: 'right',
        filter: false,
        sortable: false,
        cellRenderer: Options,
        cellRendererParams: { onRefresh },
      },
    ],
    [intl, onRefresh]
  );

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="动态应用管理"
      gridKey="appSYS.dynamic-schema.applications"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await DynamicApplicationGetListAsync({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection="multiple"
      rowMultiSelectWithClick={true}
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Access key="create" accessible={canCreate}>
          <ApplicationFormDialog
            title="创建应用"
            onAfterSubmit={onRefresh}
            buttonProps={{ icon: <PlusOutlined /> }}
          >
            新建应用
          </ApplicationFormDialog>
        </Access>,
      ]}
    />
  );
};

export default DynamicApplicationListPage;

export const routeProps = {
  name: '应用管理',
};
