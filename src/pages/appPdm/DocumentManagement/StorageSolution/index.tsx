import { AgGridPlus } from '@/components/agGrid';
import {
  StorageSolutionGetListAsync,
  StorageSolutionDeleteAsync,
  StorageSolutionActivateAsync,
  StorageSolutionDeactivateAsync,
  StorageSolutionSetAsDefaultAsync,
  StorageSolutionPerformHealthCheckAsync,
} from '@/services/pdm/StorageSolution';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  StopOutlined,
  StarOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import StorageSolutionFormDialog from './components/StorageSolutionFormDialog';
import dayjs from 'dayjs';

// 存储类型枚举
const storageTypeEnum = [
  { label: '本地文件系统', value: 1, color: '#1890ff' },
  { label: '阿里云OSS', value: 2, color: '#52c41a' },
  { label: 'Azure Blob', value: 3, color: '#13c2c2' },
  { label: 'AWS S3', value: 4, color: '#faad14' },
  { label: 'MinIO', value: 5, color: '#722ed1' },
  { label: 'FTP', value: 6, color: '#eb2f96' },
  { label: '网络共享文件夹', value: 7, color: '#2f54eb' },
];

// 健康状态枚举
const healthStatusEnum = [
  { label: '健康', value: 0, color: '#52c41a' },
  { label: '警告', value: 1, color: '#faad14' },
  { label: '异常', value: 2, color: '#ff4d4f' },
  { label: '未知', value: 3, color: '#d9d9d9' },
];

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = true; // TODO: 添加权限判断
  const canDelete = true;

  const handleDelete = (id: any) => {
    const hide = message.loading('正在删除,请稍后', 0);
    return StorageSolutionDeleteAsync({ id })
      .then(() => {
        message.success('删除成功');
        onRefresh();
      })
      .catch((error: any) => {
        message.error(error?.message || '删除失败');
      })
      .finally(() => hide());
  };

  const handleActivate = async (id: any) => {
    const hide = message.loading('正在激活,请稍后', 0);
    try {
      await StorageSolutionActivateAsync({ id });
      message.success('激活成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '激活失败,请重试');
    } finally {
      hide();
    }
  };

  const handleDeactivate = async (id: any) => {
    const hide = message.loading('正在停用,请稍后', 0);
    try {
      await StorageSolutionDeactivateAsync({ id });
      message.success('停用成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '停用失败,请重试');
    } finally {
      hide();
    }
  };

  const handleSetAsDefault = async (id: any) => {
    const hide = message.loading('正在设置默认方案,请稍后', 0);
    try {
      await StorageSolutionSetAsDefaultAsync({ id });
      message.success('设置成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '设置失败,请重试');
    } finally {
      hide();
    }
  };

  const handleHealthCheck = async (id: any) => {
    const hide = message.loading('正在执行健康检查,请稍后', 0);
    try {
      const result = await StorageSolutionPerformHealthCheckAsync({ id });
      hide();
      if (result.isHealthy) {
        message.success('健康检查通过');
      } else {
        message.warning(`健康检查失败: ${result.message || '未知错误'}`);
      }
      onRefresh();
    } catch (error: any) {
      hide();
      message.error(error?.message || '健康检查失败,请重试');
    }
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <StorageSolutionFormDialog
          title={'编辑存储方案'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>

      {!data.isDefault && data.isActive && (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定设置为默认存储方案?" onConfirm={() => handleSetAsDefault(data.id)}>
            <Button size={'small'} icon={<StarOutlined />} type={'link'} title="设为默认" />
          </DeleteConfirm>
        </Access>
      )}

      {data.isActive ? (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定停用该存储方案?" onConfirm={() => handleDeactivate(data.id)}>
            <Button size={'small'} icon={<StopOutlined />} type={'link'} title="停用" />
          </DeleteConfirm>
        </Access>
      ) : (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定激活该存储方案?" onConfirm={() => handleActivate(data.id)}>
            <Button size={'small'} icon={<CheckCircleOutlined />} type={'link'} title="激活" />
          </DeleteConfirm>
        </Access>
      )}

      <Access accessible={canUpdate}>
        <Button
          size={'small'}
          icon={<SafetyOutlined />}
          type={'link'}
          title="健康检查"
          onClick={() => handleHealthCheck(data.id)}
        />
      </Access>

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const StorageSolutionPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = true; // TODO: 添加权限判断

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 业务字段列定义
  const businessColumns = [
    { headerName: '方案编码', field: 'solutionCode', width: 150 },
    { headerName: '方案名称', field: 'solutionName', width: 200 },
    {
      headerName: '存储类型',
      field: 'providerType',
      width: 150,
      valueEnum: storageTypeEnum,
    },
    {
      headerName: '是否默认',
      field: 'isDefault',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => (
        params.value ? <Tag color="#faad14" icon={<StarOutlined />}>默认</Tag> : <span>-</span>
      ),
    },
    {
      headerName: '是否激活',
      field: 'isActive',
      width: 100,
      valueEnum: [
        { label: '激活', value: true, color: '#52c41a' },
        { label: '停用', value: false, color: '#d9d9d9' },
      ],
      cellRenderer: (params: any) => (
        <Tag color={params.value ? '#52c41a' : '#d9d9d9'}>
          {params.value ? '激活' : '停用'}
        </Tag>
      ),
    },
    {
      headerName: '健康状态',
      field: 'healthStatus',
      width: 120,
      valueEnum: healthStatusEnum,
    },
    {
      headerName: '已用空间(GB)',
      field: 'usedSpace',
      width: 130,
      hideInSearch: true,
      cellRenderer: (params: any) => {
        if (params.value == null) return '-';
        return (params.value / (1024 * 1024 * 1024)).toFixed(2);
      },
    },
    {
      headerName: '总空间(GB)',
      field: 'totalSpace',
      width: 130,
      hideInSearch: true,
      cellRenderer: (params: any) => {
        if (params.value == null) return '-';
        return (params.value / (1024 * 1024 * 1024)).toFixed(2);
      },
    },
    {
      headerName: '使用率(%)',
      field: 'usagePercentage',
      width: 110,
      hideInSearch: true,
      cellRenderer: (params: any) => {
        if (params.value == null) return '-';
        const percentage = params.value.toFixed(1);
        let color = '#52c41a';
        if (params.value >= 90) color = '#ff4d4f';
        else if (params.value >= 75) color = '#faad14';
        return <Tag color={color}>{percentage}%</Tag>;
      },
    },
    { headerName: '端点地址', field: 'endpoint', width: 250 },
    { headerName: '存储桶名称', field: 'bucketName', width: 150 },
    { headerName: '区域', field: 'region', width: 150 },
    { headerName: '描述', field: 'description', width: 200 },
    {
      headerName: '最后检查时间',
      field: 'lastHealthCheckAt',
      width: 160,
      hideInSearch: true,
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      headerName: '创建人',
      field: 'creator',
      width: 120,
      hideInSearch: true,
    },
    {
      headerName: '创建时间',
      field: 'creationTime',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-',
    },
  ];

  // 操作列定义
  const operationColumn = {
    headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
    field: 'action',
    width: 250,
    pinned: 'right',
    filter: false,
    sortable: false,
    cellRenderer: Options,
    cellRendererParams: { onRefresh },
  };

  // 完整的列定义（业务字段 + 操作列）
  const columnDefs = [...businessColumns, operationColumn];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'存储服务'}
      gridKey="appPdm.DocumentManagement.StorageSolution"
      request={async (params: any) => {
        const data = await StorageSolutionGetListAsync({
          Filter: params?.filter,
          SkipCount: params!.skipCount,
          MaxResultCount: params!.maxResultCount,
          Sorting: params!.sorter!,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      toolBarRender={() => [
        <Access key="create" accessible={canCreate}>
          <StorageSolutionFormDialog
            title={'新建存储方案'}
            onAfterSubmit={onRefresh}
            buttonProps={{ icon: <PlusOutlined />, type: 'primary' }}
          >
            新建
          </StorageSolutionFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default StorageSolutionPage;

export const routeProps = {
  name: '存储方案',
};
