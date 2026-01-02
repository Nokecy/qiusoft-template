/**
 * 动态应用配置页面
 * 管理应用的实体、字段和关系定义
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card,
  Tree,
  Button,
  Space,
  Typography,
  Breadcrumb,
  Spin,
  Empty,
  Tabs,
  Table,
  Tag,
  Dropdown,
  message,
  Popconfirm,
  Tooltip,
} from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import type { ColumnsType } from 'antd/es/table';
import {
  HomeOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  DatabaseOutlined,
  FieldStringOutlined,
  LinkOutlined,
  ReloadOutlined,
  MoreOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  FormOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { Link, history, useAccess } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import {
  DynamicApplicationGetAsync,
  DynamicApplicationDeleteEntityAsync,
  DynamicApplicationDeleteFieldAsync,
} from '@/services/openApi/DynamicApplication';
import { DynamicApplicationPermissions } from '../../_permissions';
import EntityFormDialog from './_components/EntityFormDialog';
import FieldFormDialog from './_components/FieldFormDialog';
import RelationFormDialog from './_components/RelationFormDialog';

const { Title, Text } = Typography;

// 字段类型映射
const fieldTypeMap: Record<number, { text: string; color: string }> = {
  0: { text: 'String', color: 'blue' },
  1: { text: 'Int', color: 'green' },
  2: { text: 'Long', color: 'green' },
  3: { text: 'Decimal', color: 'orange' },
  4: { text: 'Boolean', color: 'purple' },
  5: { text: 'DateTime', color: 'cyan' },
  6: { text: 'Guid', color: 'magenta' },
  7: { text: 'Enum', color: 'gold' },
  8: { text: 'Json', color: 'lime' },
  9: { text: 'Text', color: 'blue' },
  10: { text: 'Binary', color: 'default' },
  11: { text: 'Double', color: 'orange' },
  12: { text: 'Float', color: 'orange' },
  13: { text: 'Byte', color: 'green' },
  14: { text: 'Short', color: 'green' },
  15: { text: 'Reference', color: 'red' },
};

// 实体角色映射
const entityRoleMap: Record<number, { text: string; color: string }> = {
  0: { text: '主表', color: 'blue' },      // Primary - 每个应用只能有一个
  1: { text: '从表', color: 'green' },     // Detail - 依附于主表
  2: { text: '子从表', color: 'orange' },  // SubDetail - 依附于从表
  3: { text: '关联表', color: 'purple' },  // Association - 多对多关系中间表
};

// 存储模式映射
const storageModeMap: Record<number, { text: string; color: string; description: string }> = {
  0: { text: '混合模式', color: 'blue', description: '常用字段物理列 + JSON ExtraProperties' },
  1: { text: '纯JSON', color: 'green', description: '所有字段存 JSON' },
  2: { text: '纯物理列', color: 'orange', description: '所有字段映射为物理列' },
};

// 当前页面的路由路径
const CURRENT_PAGE_PATH = '/appSYS/dynamic-schema/applications/config';

const ApplicationConfigPage: React.FC = () => {
  const access = useAccess();

  // 使用 Hook 获取路由参数
  const { params, isActive } = useKeepAliveParams(CURRENT_PAGE_PATH, ['id']);
  const applicationId = params.id || '';

  const canManage = !!(access && (access[DynamicApplicationPermissions.Manage] ?? true));

  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState<any>(null);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('fields');

  // 记录上一次的applicationId，用于检测变化
  const prevApplicationIdRef = React.useRef<string | null>(null);

  // 加载应用数据
  const loadAppData = useCallback(async () => {
    if (!applicationId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    // 重置状态
    setAppData(null);
    setSelectedEntity(null);
    setActiveTab('fields');

    try {
      const data = await DynamicApplicationGetAsync({ id: applicationId });
      setAppData(data);

      // 默认选中第一个实体
      if (data.entities && data.entities.length > 0) {
        setSelectedEntity(data.entities[0]);
      }
    } catch (error) {
      message.error('加载应用配置失败');
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  // 监听URL参数变化，支持KeepAlive模式
  useEffect(() => {
    // 只有当前路由匹配时才加载数据
    if (!isActive) return;

    // 首次加载或applicationId变化时重新加载
    if (applicationId !== prevApplicationIdRef.current) {
      prevApplicationIdRef.current = applicationId;
      if (applicationId) {
        loadAppData();
      } else {
        // 如果没有applicationId，设置loading为false
        setLoading(false);
      }
    }
  }, [applicationId, loadAppData, isActive]);

  // 构建实体树
  const entityTreeData = useMemo<DataNode[]>(() => {
    if (!appData?.entities) return [];

    return appData.entities.map((entity: any) => ({
      key: entity.id,
      title: (
        <Space>
          <DatabaseOutlined />
          <span>{entity.displayName || entity.name}</span>
          <Tag size="small" color={entityRoleMap[entity.role]?.color || 'default'}>
            {entityRoleMap[entity.role]?.text || entity.role}
          </Tag>
        </Space>
      ),
      entity,
    }));
  }, [appData]);

  // 选择实体
  const handleSelectEntity: TreeProps['onSelect'] = (selectedKeys, info) => {
    if (info.node) {
      setSelectedEntity((info.node as any).entity);
    }
  };

  // 删除实体
  const handleDeleteEntity = async (entityId: string) => {
    try {
      await DynamicApplicationDeleteEntityAsync({ applicationId, entityId });
      message.success('删除实体成功');
      loadAppData();
    } catch (error) {
      message.error('删除实体失败');
    }
  };

  // 删除字段
  const handleDeleteField = async (entityId: string, fieldId: string) => {
    try {
      await DynamicApplicationDeleteFieldAsync({ applicationId, entityId, fieldId });
      message.success('删除字段成功');
      loadAppData();
    } catch (error) {
      message.error('删除字段失败');
    }
  };

  // 字段列定义
  const fieldColumns: ColumnsType<any> = [
    {
      title: '字段名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text, record) => (
        <Space>
          <FieldStringOutlined />
          <Text strong>{text}</Text>
          {record.isRequired && <Tag color="red">必填</Tag>}
        </Space>
      ),
    },
    {
      title: '显示名称',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 120,
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 100,
      render: (type) => {
        const typeInfo = fieldTypeMap[type] || { text: type, color: 'default' };
        return <Tag color={typeInfo.color}>{typeInfo.text}</Tag>;
      },
    },
    {
      title: '长度',
      dataIndex: 'maxLength',
      key: 'maxLength',
      width: 80,
      render: (v) => v || '-',
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      width: 100,
      ellipsis: true,
      render: (v) => v || '-',
    },
    {
      title: '索引',
      dataIndex: 'indexType',
      key: 'indexType',
      width: 80,
      render: (type) => {
        if (!type || type === 0) return '-';
        const indexMap: Record<number, string> = {
          1: '普通',
          2: '唯一',
          3: '全文',
        };
        return <Tag>{indexMap[type] || type}</Tag>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) =>
        canManage && (
          <Space>
            <FieldFormDialog
              applicationId={applicationId}
              entityId={selectedEntity?.id}
              fieldData={record}
              onSuccess={loadAppData}
              trigger={
                <Button type="link" size="small" icon={<EditOutlined />} />
              }
            />
            <Popconfirm
              title="确定删除该字段?"
              onConfirm={() => handleDeleteField(selectedEntity?.id, record.id)}
            >
              <Button type="link" size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
    },
  ];

  // 根据实体ID获取实体显示名称
  const getEntityDisplayName = useCallback(
    (entityId: string) => {
      if (!appData?.entities) return entityId;
      const entity = appData.entities.find((e: any) => e.id === entityId);
      return entity?.displayName || entity?.name || entityId;
    },
    [appData]
  );

  // 关系列定义
  const relationColumns: ColumnsType<any> = [
    {
      title: '关系名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text) => (
        <Space>
          <LinkOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '源实体',
      dataIndex: 'sourceEntityId',
      key: 'sourceEntityId',
      width: 120,
      render: (entityId) => getEntityDisplayName(entityId),
    },
    {
      title: '目标实体',
      dataIndex: 'targetEntityId',
      key: 'targetEntityId',
      width: 120,
      render: (entityId) => getEntityDisplayName(entityId),
    },
    {
      title: '关系类型',
      dataIndex: 'relationType',
      key: 'relationType',
      width: 100,
      render: (type) => {
        const typeMap: Record<number, string> = {
          0: '一对一',
          1: '一对多',
          2: '多对多',
        };
        return <Tag>{typeMap[type] || type}</Tag>;
      },
    },
    {
      title: '级联删除',
      dataIndex: 'cascadeDeleteBehavior',
      key: 'cascadeDeleteBehavior',
      width: 100,
      render: (behavior) => {
        const behaviorMap: Record<number, string> = {
          0: '无操作',
          1: '级联',
          2: '设空',
          3: '限制',
        };
        return behaviorMap[behavior] || behavior;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ];

  // 没有应用 ID
  if (!applicationId) {
    return (
      <Card>
        <Empty description="请从应用列表选择一个应用进行配置">
          <Button type="primary" href="/appSYS/dynamic-schema/applications">
            返回应用列表
          </Button>
        </Empty>
      </Card>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Spin size="large" tip="加载应用配置..." />
      </div>
    );
  }

  if (!appData) {
    return (
      <Card>
        <Empty description="应用不存在或已被删除">
          <Button type="primary" href="/appSYS/dynamic-schema/applications">
            返回应用列表
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 页面标题 */}
      <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space direction="vertical" size={4}>
            <Breadcrumb
              items={[
                { title: <Link to="/"><HomeOutlined /> 首页</Link> },
                { title: <Link to="/appSYS/dynamic-schema/applications">动态应用</Link> },
                { title: appData.displayName || appData.name },
                { title: '配置' },
              ]}
            />
            <Title level={4} style={{ margin: 0 }}>
              <Space>
                <SettingOutlined />
                {appData.displayName || appData.name} - 应用配置
              </Space>
            </Title>
          </Space>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={loadAppData}>
              刷新
            </Button>
            <Button
              type="primary"
              icon={<AppstoreOutlined />}
              onClick={() =>
                history.push(`/appSYS/dynamic-schema/data?applicationName=${appData.name}`)
              }
            >
              数据管理
            </Button>
            {appData.workflowEnabled && appData.workflowName && (
              <Button
                icon={<ApartmentOutlined />}
                onClick={() =>
                  history.push(
                    `/appWorkflow/workflowDefinition/designer?workflowName=${appData.workflowName}`
                  )
                }
              >
                流程设计
              </Button>
            )}
            <Button
              icon={<FormOutlined />}
              onClick={() =>
                history.push(
                  `/appSYS/dynamic-schema/form-schemas/designer?applicationName=${appData.name}`
                )
              }
            >
              表单设计
            </Button>
            <Button
              icon={<SettingOutlined />}
              onClick={() =>
                history.push(
                  `/appSYS/dynamic-schema/schema-management?applicationName=${appData.name}`
                )
              }
            >
              高级管理
            </Button>
          </Space>
        </div>
      </Card>

      {/* 主内容区 */}
      <div style={{ flex: 1, display: 'flex', gap: 16, minHeight: 0 }}>
        {/* 左侧实体树 */}
        <Card
          style={{ width: 300, flexShrink: 0 }}
          title={
            <Space>
              <DatabaseOutlined />
              实体列表
            </Space>
          }
          extra={
            canManage && (
              <EntityFormDialog
                applicationId={applicationId}
                onSuccess={loadAppData}
                trigger={
                  <Button type="primary" size="small" icon={<PlusOutlined />}>
                    新建
                  </Button>
                }
              />
            )
          }
          bodyStyle={{ padding: 0 }}
        >
          {entityTreeData.length > 0 ? (
            <Tree
              showLine
              defaultExpandAll
              selectedKeys={selectedEntity ? [selectedEntity.id] : []}
              onSelect={handleSelectEntity}
              treeData={entityTreeData}
              style={{ padding: 16 }}
            />
          ) : (
            <Empty
              description="暂无实体"
              style={{ padding: 40 }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Card>

        {/* 右侧详情面板 */}
        <Card style={{ flex: 1, minWidth: 0 }} bodyStyle={{ height: '100%', overflow: 'auto' }}>
          {selectedEntity ? (
            <>
              {/* 实体基本信息 */}
              <div
                style={{
                  marginBottom: 16,
                  padding: 16,
                  background: '#fafafa',
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <Title level={5} style={{ margin: 0 }}>
                      <Space>
                        <DatabaseOutlined />
                        {selectedEntity.displayName || selectedEntity.name}
                      </Space>
                    </Title>
                    <Text type="secondary">标识: {selectedEntity.name}</Text>
                    <div style={{ marginTop: 8 }}>
                      <Space>
                        <Tag color={entityRoleMap[selectedEntity.role]?.color}>
                          {entityRoleMap[selectedEntity.role]?.text}
                        </Tag>
                        <Tooltip title={storageModeMap[selectedEntity.storageMode]?.description}>
                          <Tag color={storageModeMap[selectedEntity.storageMode]?.color}>
                            {storageModeMap[selectedEntity.storageMode]?.text || '未知'}
                          </Tag>
                        </Tooltip>
                        {selectedEntity.tableName && (
                          <Tag color="cyan">表: {selectedEntity.tableName}</Tag>
                        )}
                      </Space>
                    </div>
                    {selectedEntity.description && (
                      <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                        {selectedEntity.description}
                      </Text>
                    )}
                  </div>
                  {canManage && (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'edit',
                            label: '编辑实体',
                            icon: <EditOutlined />,
                          },
                          {
                            key: 'delete',
                            label: '删除实体',
                            icon: <DeleteOutlined />,
                            danger: true,
                            onClick: () => handleDeleteEntity(selectedEntity.id),
                          },
                        ],
                      }}
                    >
                      <Button icon={<MoreOutlined />} />
                    </Dropdown>
                  )}
                </div>
              </div>

              {/* 字段和关系 Tab */}
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: 'fields',
                    label: (
                      <Space>
                        <FieldStringOutlined />
                        字段 ({selectedEntity.fields?.length || 0})
                      </Space>
                    ),
                    children: (
                      <>
                        {canManage && (
                          <div style={{ marginBottom: 16 }}>
                            <FieldFormDialog
                              applicationId={applicationId}
                              entityId={selectedEntity.id}
                              onSuccess={loadAppData}
                              trigger={
                                <Button type="primary" icon={<PlusOutlined />}>
                                  新建字段
                                </Button>
                              }
                            />
                          </div>
                        )}
                        <Table
                          columns={fieldColumns}
                          dataSource={selectedEntity.fields || []}
                          rowKey="name"
                          size="small"
                          pagination={false}
                        />
                      </>
                    ),
                  },
                  {
                    key: 'relations',
                    label: (
                      <Space>
                        <LinkOutlined />
                        关系 (
                        {appData.relations?.filter(
                          (r: any) =>
                            r.sourceEntityId === selectedEntity.id ||
                            r.targetEntityId === selectedEntity.id
                        ).length || 0}
                        )
                      </Space>
                    ),
                    children: (
                      <>
                        {canManage && (
                          <div style={{ marginBottom: 16 }}>
                            <RelationFormDialog
                              applicationId={applicationId}
                              entities={appData.entities || []}
                              onSuccess={loadAppData}
                              trigger={
                                <Button type="primary" icon={<PlusOutlined />}>
                                  新建关系
                                </Button>
                              }
                            />
                          </div>
                        )}
                        <Table
                          columns={relationColumns}
                          dataSource={
                            appData.relations?.filter(
                              (r: any) =>
                                r.sourceEntityId === selectedEntity.id ||
                                r.targetEntityId === selectedEntity.id
                            ) || []
                          }
                          rowKey="id"
                          size="small"
                          pagination={false}
                        />
                      </>
                    ),
                  },
                ]}
              />
            </>
          ) : (
            <Empty description="请从左侧选择一个实体" style={{ marginTop: 100 }} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ApplicationConfigPage;

export const routeProps = {
  name: '应用配置',
};
