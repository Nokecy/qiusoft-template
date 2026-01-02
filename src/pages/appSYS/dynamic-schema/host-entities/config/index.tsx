import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  HostEntityGetAsync,
  HostEntityGetExtensionFieldsAsync,
  HostEntityRemoveExtensionFieldAsync,
  HostEntityRetryDdlAsync,
} from '@/services/openApi/HostEntity';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Descriptions, Card, Spin } from 'antd';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { HostEntityPermissions } from '../../_permissions';
import { fieldDataTypeEnum, fieldStatusEnum, indexTypeEnum, FieldStatus } from '../../_enums';
import dayjs from 'dayjs';
import ExtensionFieldFormDialog from './_components/FormDialog';

// 数据类型渲染器
const DataTypeRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const item = fieldDataTypeEnum.find((e) => e.value === value);
  if (!item) return value;
  return <Tag color={item.color}>{item.label}</Tag>;
};

// 字段状态渲染器
const FieldStatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const item = fieldStatusEnum.find((e) => e.value === value);
  if (!item) return value;
  return <Tag color={item.color}>{item.label}</Tag>;
};

// 索引类型渲染器
const IndexTypeRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  if (value === undefined || value === null) return '-';
  const item = indexTypeEnum.find((e) => e.value === value);
  if (!item) return value;
  return <Tag>{item.label}</Tag>;
};

// 操作列渲染
const Options = (
  props: ICellRendererParams & { onRefresh: () => void; hostEntityIdRef: React.MutableRefObject<string> }
) => {
  const { data, onRefresh, hostEntityIdRef } = props;
  const hostEntityId = hostEntityIdRef.current;
  const intl = useIntl();
  const access = useAccess();
  const canManageFields = !!(
    access && (access[HostEntityPermissions.ManageFields] ?? true)
  );

  // 删除字段
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await HostEntityRemoveExtensionFieldAsync({
        hostEntityId,
        fieldId: data.id,
      });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 重试DDL
  const handleRetryDdl = async () => {
    const hide = message.loading('正在重试...', 0);
    try {
      await HostEntityRetryDdlAsync({ hostEntityId, fieldId: data.id });
      message.success('重试成功');
      onRefresh();
    } catch (error) {
      message.error('重试失败');
    } finally {
      hide();
    }
  };

  return (
    <Space>
      <Access accessible={canManageFields}>
        <ExtensionFieldFormDialog
          title="编辑扩展字段"
          hostEntityId={hostEntityId}
          fieldId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ size: 'small', icon: <EditOutlined />, type: 'link', title: '编辑' }}
        />
      </Access>
      {data.status === FieldStatus.Failed && (
        <Access accessible={canManageFields}>
          <Button
            size="small"
            icon={<ReloadOutlined />}
            type="link"
            title="重试DDL"
            onClick={handleRetryDdl}
            style={{ color: '#faad14' }}
          />
        </Access>
      )}
      <Access accessible={canManageFields}>
        <DeleteConfirm title="确定删除该扩展字段?" onConfirm={handleDelete}>
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

// 当前页面的路由路径
const CURRENT_PAGE_PATH = '/appSYS/dynamic-schema/host-entities/config';

const HostEntityConfigPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canManageFields = !!(
    access && (access[HostEntityPermissions.ManageFields] ?? true)
  );

  // 使用 Hook 获取路由参数
  const { params, isActive } = useKeepAliveParams(CURRENT_PAGE_PATH, ['id']);
  const hostEntityId = params.id || '';

  // 使用 ref 存储最新的 hostEntityId，避免闭包问题
  const hostEntityIdRef = useRef<string>(hostEntityId);
  if (isActive && hostEntityId) {
    hostEntityIdRef.current = hostEntityId;
  }

  const [hostEntity, setHostEntity] =
    useState<API.BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionDto | null>(
      null
    );
  const [loading, setLoading] = useState(true);

  // 记录上一次的hostEntityId，用于检测变化
  const prevHostEntityIdRef = useRef<string | null>(null);

  // 加载宿主实体信息，支持KeepAlive模式
  useEffect(() => {
    // 只有当前路由匹配时才加载数据
    if (!isActive) return;

    // 首次加载或hostEntityId变化时重新加载
    if (hostEntityId && hostEntityId !== prevHostEntityIdRef.current) {
      prevHostEntityIdRef.current = hostEntityId;
      setLoading(true);
      // 重置状态
      setHostEntity(null);
      HostEntityGetAsync({ id: hostEntityId })
        .then((data) => {
          setHostEntity(data);
          // 刷新表格数据
          gridRef.current?.onRefresh();
        })
        .catch(() => {
          message.error('加载宿主实体信息失败');
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!hostEntityId) {
      setLoading(false);
    }
  }, [hostEntityId, isActive]);

  const onRefresh = () => gridRef.current?.onRefresh();

  // 返回列表
  const handleBack = () => {
    history.push('/appSYS/dynamic-schema/host-entities');
  };

  // 列定义
  const columnDefs: any = useMemo(
    () => [
      {
        field: 'name',
        headerName: '字段名称',
        width: 140,
      },
      {
        field: 'displayName',
        headerName: '显示名称',
        width: 140,
      },
      {
        field: 'dataType',
        headerName: '数据类型',
        width: 120,
        cellRenderer: DataTypeRenderer,
        valueEnum: fieldDataTypeEnum,
      },
      {
        field: 'physicalColumnName',
        headerName: '物理列名',
        width: 140,
        hideInSearch: true,
      },
      {
        field: 'maxLength',
        headerName: '最大长度',
        width: 100,
        hideInSearch: true,
      },
      {
        field: 'isRequired',
        headerName: '必填',
        width: 80,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? <Tag color="blue">是</Tag> : <Tag>否</Tag>,
      },
      {
        field: 'indexType',
        headerName: '索引类型',
        width: 100,
        hideInSearch: true,
        cellRenderer: IndexTypeRenderer,
      },
      {
        field: 'status',
        headerName: '状态',
        width: 100,
        hideInSearch: true,
        cellRenderer: FieldStatusRenderer,
      },
      {
        field: 'sortOrder',
        headerName: '排序',
        width: 80,
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
        cellRendererParams: { onRefresh, hostEntityIdRef },
      },
    ],
    [intl, onRefresh]
  );

  if (!hostEntityId) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p>缺少宿主实体ID参数</p>
          <Button type="primary" onClick={handleBack}>
            返回列表
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Spin spinning={loading}>
        <Card
          title={
            <Space>
              <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                返回
              </Button>
              <span>宿主实体配置 - 扩展字段管理</span>
            </Space>
          }
          style={{ marginBottom: 16 }}
        >
          {hostEntity && (
            <Descriptions column={3} size="small">
              <Descriptions.Item label="实体类型">
                {hostEntity.entityType}
              </Descriptions.Item>
              <Descriptions.Item label="显示名称">
                {hostEntity.displayName}
              </Descriptions.Item>
              <Descriptions.Item label="模块名称">
                {hostEntity.moduleName}
              </Descriptions.Item>
              <Descriptions.Item label="数据表">
                {hostEntity.tableName}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {hostEntity.isEnabled ? (
                  <Tag color="#52c41a">已启用</Tag>
                ) : (
                  <Tag color="#d9d9d9">已禁用</Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>
      </Spin>
      <div style={{ flex: 1, minHeight: 0 }}>
        <AgGridPlus
          gridRef={gridRef}
          headerTitle="扩展字段列表"
          gridKey="appSYS.dynamic-schema.host-entities.config"
          request={async (
            params?: { pageSize: number; current: number; [key: string]: any }
          ) => {
            // 使用 ref 获取最新的 hostEntityId，避免 KeepAlive 切换时闭包问题
            const currentHostEntityId = hostEntityIdRef.current;
            if (!currentHostEntityId) {
              return { success: true, data: [], total: 0 } as any;
            }
            const data = await HostEntityGetExtensionFieldsAsync({
              hostEntityId: currentHostEntityId,
              Filter: params?.filter,
              SkipCount: params?.skipCount,
              MaxResultCount: params?.maxResultCount,
              Sorting: params?.sorter,
            } as any);
            return {
              success: true,
              data: data.items || [],
              total: data.totalCount || 0,
            } as any;
          }}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
          columnDefs={columnDefs}
          toolBarRender={() => [
            <Access key="create" accessible={canManageFields}>
              <ExtensionFieldFormDialog
                title="新建扩展字段"
                hostEntityId={hostEntityId}
                onAfterSubmit={onRefresh}
                buttonProps={{ icon: <PlusOutlined />, title: '新建扩展字段' }}
              />
            </Access>,
          ]}
        />
      </div>
    </div>
  );
};

export default HostEntityConfigPage;

export const routeProps = {
  name: '宿主实体配置',
};
