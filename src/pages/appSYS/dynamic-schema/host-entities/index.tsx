import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  HostEntityGetListAsync,
  HostEntityEnableAsync,
  HostEntityDisableAsync,
  HostEntityUnregisterAsync,
} from '@/services/openApi/HostEntity';
import {
  SettingOutlined,
  EditOutlined,
  CheckCircleOutlined,
  StopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { HostEntityPermissions } from '../_permissions';
import dayjs from 'dayjs';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const canManageFields = !!(access && (access[HostEntityPermissions.ManageFields] ?? true));
  const canManageSchema = !!(access && (access[HostEntityPermissions.ManageSchema] ?? true));
  const canEnable = !!(access && (access[HostEntityPermissions.Enable] ?? true));
  const canDisable = !!(access && (access[HostEntityPermissions.Disable] ?? true));
  const canUnregister = !!(access && (access[HostEntityPermissions.Unregister] ?? true));

  // 配置扩展字段
  const handleConfigFields = () => {
    history.push(`/appSYS/dynamic-schema/host-entities/config?id=${data.id}`);
  };

  // 设计表单
  const handleDesignForm = () => {
    history.push(`/appSYS/dynamic-schema/form-schemas/designer?hostEntityId=${data.id}`);
  };

  // 启用实体
  const handleEnable = async () => {
    const hide = message.loading('正在启用...', 0);
    try {
      await HostEntityEnableAsync({ id: data.id });
      message.success('启用成功');
      onRefresh();
    } catch (error) {
      message.error('启用失败');
    } finally {
      hide();
    }
  };

  // 禁用实体
  const handleDisable = async () => {
    const hide = message.loading('正在禁用...', 0);
    try {
      await HostEntityDisableAsync({ id: data.id });
      message.success('禁用成功');
      onRefresh();
    } catch (error) {
      message.error('禁用失败');
    } finally {
      hide();
    }
  };

  // 注销实体
  const handleUnregister = async () => {
    const hide = message.loading('正在注销...', 0);
    try {
      await HostEntityUnregisterAsync({ id: data.id });
      message.success('注销成功');
      onRefresh();
    } catch (error) {
      message.error('注销失败');
    } finally {
      hide();
    }
  };

  return (
    <Space>
      <Access accessible={canManageFields}>
        <Button
          size="small"
          icon={<SettingOutlined />}
          type="link"
          title="配置字段"
          onClick={handleConfigFields}
        />
      </Access>
      <Access accessible={canManageSchema}>
        <Button
          size="small"
          icon={<EditOutlined />}
          type="link"
          title="设计表单"
          onClick={handleDesignForm}
        />
      </Access>
      {data.isEnabled ? (
        <Access accessible={canDisable}>
          <DeleteConfirm title="确定禁用该宿主实体?" onConfirm={handleDisable}>
            <Button
              size="small"
              icon={<StopOutlined />}
              type="link"
              danger
              title="禁用"
            />
          </DeleteConfirm>
        </Access>
      ) : (
        <Access accessible={canEnable}>
          <Button
            size="small"
            icon={<CheckCircleOutlined />}
            type="link"
            title="启用"
            onClick={handleEnable}
          />
        </Access>
      )}
      <Access accessible={canUnregister}>
        <DeleteConfirm title="确定注销该宿主实体?" onConfirm={handleUnregister}>
          <Button
            size="small"
            icon={<DeleteOutlined />}
            type="link"
            danger
            title="注销"
          />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

// 状态渲染
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  return value ? (
    <Tag color="#52c41a">已启用</Tag>
  ) : (
    <Tag color="#d9d9d9">已禁用</Tag>
  );
};

const HostEntityListPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();

  const onRefresh = () => gridRef.current?.onRefresh();

  // 列定义
  const columnDefs: any = useMemo(
    () => [
      {
        field: 'entityType',
        headerName: '实体类型',
        width: 280,
        cellRenderer: ({ value, data }: any) => (
          <a
            onClick={() =>
              history.push(`/appSYS/dynamic-schema/host-entities/config?id=${data.id}`)
            }
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {value}
          </a>
        ),
      },
      {
        field: 'displayName',
        headerName: '显示名称',
        width: 160,
      },
      {
        field: 'moduleName',
        headerName: '模块名称',
        width: 140,
      },
      {
        field: 'tableName',
        headerName: '数据表',
        width: 180,
        hideInSearch: true,
      },
      {
        field: 'connectionStringName',
        headerName: '连接字符串',
        width: 140,
        hideInSearch: true,
      },
      {
        field: 'extensionFieldCount',
        headerName: '扩展字段数',
        width: 110,
        hideInSearch: true,
      },
      {
        field: 'isEnabled',
        headerName: '状态',
        width: 100,
        hideInSearch: true,
        cellRenderer: StatusRenderer,
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
        width: 180,
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
      headerTitle="宿主实体管理"
      gridKey="appSYS.dynamic-schema.host-entities"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await HostEntityGetListAsync({
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
    />
  );
};

export default HostEntityListPage;

export const routeProps = {
  name: '宿主实体管理',
};
