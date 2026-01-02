/**
 * 动态数据详情页面
 * 根据 Formily Schema 动态渲染数据详情
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card,
  Button,
  Space,
  Spin,
  Result,
  Descriptions,
  Tabs,
  Table,
  Tag,
  Typography,
  Breadcrumb,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
  DownOutlined,
  UpOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link, useLocation, history, useAccess, useIntl } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, PreviewText } from '@formily/antd-v5';
import { useSchemaField } from 'umi';
import dayjs from 'dayjs';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DynamicDataGetAsync,
  DynamicDataDeleteAsync,
} from '@/services/openApi/DynamicData';
import { FormilySchemaGetSchemaAsync } from '@/services/openApi/FormilySchema';
import {
  DynamicApplicationGetListAsync,
  DynamicApplicationGetAsync,
} from '@/services/openApi/DynamicApplication';
import DataFormDialog from './_components/FormDialog';

const { Title, Text } = Typography;

// 当前页面的路由路径
const CURRENT_PAGE_PATH = '/appSYS/dynamic-schema/data/detail';

const DynamicDataDetailPage: React.FC = () => {
  const location = useLocation();
  const intl = useIntl();
  const access = useAccess();
  const { params, isActive, hasChanged } = useKeepAliveParams('/appSYS/dynamic-schema/data/detail');
  const canUpdate = !!(access && (access['DynamicSchema.DynamicData.Update'] ?? true));
  const canDelete = !!(access && (access['DynamicSchema.DynamicData.Delete'] ?? true));

  // 检查当前路由是否匹配本页面
  const isCurrentPage = location.pathname === CURRENT_PAGE_PATH;

  // 从URL获取参数，支持KeepAlive模式下参数变化
  // 只有当前路由匹配时才解析参数
  const { id, applicationName } = useMemo(() => {
    if (!isCurrentPage) {
      return { id: '', applicationName: '' };
    }
    return {
      id: (params.id as string) || '',
      applicationName: (params.applicationName as string) || '',
    };
  }, [params, isCurrentPage]);

  // 记录上一次的参数，用于检测变化
  const prevParamsRef = React.useRef<{ id: string; applicationName: string } | null>(null);

  // 状态
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [formSchema, setFormSchema] = useState<any>(null);
  const [appInfo, setAppInfo] = useState<any>(null);
  const [auditVisible, setAuditVisible] = useState(false);

  const SchemaField = useSchemaField({});

  // 创建只读表单实例
  const form = useMemo(
    () =>
      createForm({
        readPretty: true, // 只读模式
      }),
    []
  );

  // 加载数据，支持KeepAlive模式
  const loadData = useCallback(async () => {
    if (!id || !applicationName) return;

    setLoading(true);
    setError(null);
    // 重置状态
    setData(null);
    setFormSchema(null);
    setAppInfo(null);
    setAuditVisible(false);
    form.reset();

    try {
      // 并行加载数据、Schema 和应用信息
      const [dataResult, schemaResult, appListResult] = await Promise.all([
        DynamicDataGetAsync({ id, applicationName }),
        FormilySchemaGetSchemaAsync({ applicationName, scenarioKey: 'default' }),
        DynamicApplicationGetListAsync({ MaxResultCount: 1000 }),
      ]);

      // 设置数据
      setData(dataResult);

      // 设置 Schema
      if (schemaResult?.schema) {
        setFormSchema({
          form: schemaResult.form || { labelCol: 6, wrapperCol: 18 },
          schema: schemaResult.schema,
        });
      }

      // 获取应用详情
      const appFromList = appListResult.items?.find(
        (item: any) => item.name === applicationName
      );
      if (appFromList?.id) {
        const appDetail = await DynamicApplicationGetAsync({ id: appFromList.id });
        setAppInfo(appDetail);
      }

      // 合并数据到表单
      const formValues = {
        ...dataResult.data,
        ...dataResult.extraProperties,
      };
      form.setValues(formValues);
    } catch (err: any) {
      console.error('[DetailPage] 加载数据失败:', err);
      setError(err?.message || '加载数据失败');
    } finally {
      setLoading(false);
    }
  }, [id, applicationName, form]);

  // 监听URL参数变化，支持KeepAlive模式
  useEffect(() => {
    // 只有当前路由匹配且激活时才加载数据
    if (!isCurrentPage || !isActive) return;

    // 首次加载或参数变化时重新加载
    const prevParams = prevParamsRef.current;
    if (
      hasChanged &&
      (prevParams?.id !== id || prevParams?.applicationName !== applicationName)
    ) {
      prevParamsRef.current = { id, applicationName };
      if (id && applicationName) {
        loadData();
      } else {
        setLoading(false);
      }
    }
  }, [id, applicationName, loadData, isCurrentPage, isActive, hasChanged]);

  // 删除数据
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await DynamicDataDeleteAsync({ id, applicationName });
      message.success('删除成功');
      history.push(`/appSYS/dynamic-schema/data?applicationName=${applicationName}`);
    } catch (err: any) {
      message.error('删除失败: ' + (err?.message || '未知错误'));
    } finally {
      hide();
    }
  };

  // 刷新数据
  const handleRefresh = () => {
    loadData();
  };

  // 返回列表
  const handleBack = () => {
    history.push(`/appSYS/dynamic-schema/data?applicationName=${applicationName}`);
  };

  // 格式化日期
  const formatDate = (date: string | undefined) => {
    if (!date) return '-';
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  };

  // 获取子表列定义
  const getChildTableColumns = (tableName: string) => {
    // 从应用信息中找到对应的实体
    const entity = appInfo?.entities?.find(
      (e: any) => e.name === tableName || e.displayName === tableName
    );

    if (entity?.fields && entity.fields.length > 0) {
      return entity.fields
        .filter((field: any) => field.isVisible !== false)
        .map((field: any) => ({
          title: field.displayName || field.name,
          dataIndex: field.name,
          key: field.name,
          width: 150,
          render: (value: any) => {
            if (value === null || value === undefined) return '-';
            if (field.dataType === 5) {
              // DateTime
              return dayjs(value).format('YYYY-MM-DD HH:mm');
            }
            if (field.dataType === 4) {
              // Boolean
              return <Tag color={value ? 'green' : 'default'}>{value ? '是' : '否'}</Tag>;
            }
            return String(value);
          },
        }));
    }

    // 默认列
    return [
      { title: 'ID', dataIndex: 'id', key: 'id', width: 280 },
      {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime',
        width: 160,
        render: (v: string) => formatDate(v),
      },
    ];
  };

  // 缺少参数
  if (!id || !applicationName) {
    return (
      <Result
        status="warning"
        title="缺少必要参数"
        subTitle="请从数据列表中选择一条数据查看详情"
        extra={
          <Button type="primary" onClick={() => history.push('/appSYS/dynamic-schema/applications')}>
            返回应用列表
          </Button>
        }
      />
    );
  }

  // 加载中
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  // 加载错误
  if (error) {
    return (
      <Result
        status="error"
        title="加载失败"
        subTitle={error}
        extra={[
          <Button type="primary" key="retry" onClick={loadData}>
            重新加载
          </Button>,
          <Button key="back" onClick={handleBack}>
            返回列表
          </Button>,
        ]}
      />
    );
  }

  // 数据不存在
  if (!data) {
    return (
      <Result
        status="404"
        title="数据不存在"
        subTitle="您访问的数据可能已被删除"
        extra={
          <Button type="primary" onClick={handleBack}>
            返回列表
          </Button>
        }
      />
    );
  }

  // 是否有子表数据
  const hasChildren = data.children && Object.keys(data.children).length > 0;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 页面头部 */}
      <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space direction="vertical" size={4}>
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to="/">
                      <HomeOutlined /> 首页
                    </Link>
                  ),
                },
                { title: <Link to="/appSYS/dynamic-schema/applications">动态应用</Link> },
                {
                  title: (
                    <Link to={`/appSYS/dynamic-schema/data?applicationName=${applicationName}`}>
                      {appInfo?.displayName || applicationName}
                    </Link>
                  ),
                },
                { title: '详情' },
              ]}
            />
            <Title level={4} style={{ margin: 0 }}>
              数据详情
            </Title>
          </Space>
          <Space>
            {canUpdate && (
              <DataFormDialog
                title="编辑数据"
                entityId={id}
                applicationName={applicationName}
                onAfterSubmit={handleRefresh}
                buttonProps={{ icon: <EditOutlined /> }}
              >
                编辑
              </DataFormDialog>
            )}
            {canDelete && (
              <DeleteConfirm title="确定删除该数据?" onConfirm={handleDelete}>
                <Button danger icon={<DeleteOutlined />}>
                  删除
                </Button>
              </DeleteConfirm>
            )}
            <Button icon={<RollbackOutlined />} onClick={handleBack}>
              返回列表
            </Button>
          </Space>
        </div>
      </Card>

      {/* 主内容区 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* 基础信息卡片 */}
        <Card
          title="基础信息"
          bordered={false}
          style={{ marginBottom: 16 }}
        >
          {formSchema?.schema ? (
            <PreviewText.Placeholder value="-">
              <FormProvider form={form}>
                <FormLayout
                  labelCol={formSchema.form?.labelCol || 6}
                  wrapperCol={formSchema.form?.wrapperCol || 18}
                  labelAlign="right"
                >
                  <SchemaField schema={formSchema.schema} />
                </FormLayout>
              </FormProvider>
            </PreviewText.Placeholder>
          ) : (
            <Descriptions column={2} bordered size="small">
              {Object.entries({ ...data.data, ...data.extraProperties }).map(
                ([key, value]) => (
                  <Descriptions.Item label={key} key={key}>
                    {value !== null && value !== undefined ? String(value) : '-'}
                  </Descriptions.Item>
                )
              )}
            </Descriptions>
          )}
        </Card>

        {/* 审计信息卡片 */}
        <Card
          title="审计信息"
          bordered={false}
          style={{ marginBottom: 16 }}
          extra={
            <Button
              type="link"
              size="small"
              icon={auditVisible ? <UpOutlined /> : <DownOutlined />}
              onClick={() => setAuditVisible(!auditVisible)}
            >
              {auditVisible ? '收起' : '展开'}
            </Button>
          }
        >
          {auditVisible ? (
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="数据 ID">{data.id}</Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {formatDate(data.creationTime)}
              </Descriptions.Item>
              <Descriptions.Item label="创建人 ID">
                {data.creatorId || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="最后修改时间">
                {formatDate(data.lastModificationTime)}
              </Descriptions.Item>
              <Descriptions.Item label="最后修改人 ID">
                {data.lastModifierId || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="应用名称">{applicationName}</Descriptions.Item>
            </Descriptions>
          ) : (
            <Space>
              <Text type="secondary">
                创建时间: {formatDate(data.creationTime)}
              </Text>
              {data.lastModificationTime && (
                <Text type="secondary">
                  | 最后修改: {formatDate(data.lastModificationTime)}
                </Text>
              )}
            </Space>
          )}
        </Card>

        {/* 子表数据卡片 */}
        {hasChildren && (
          <Card title="关联数据" bordered={false}>
            <Tabs
              items={Object.entries(data.children).map(([tableName, tableData]) => {
                // 找到子表实体信息
                const entity = appInfo?.entities?.find(
                  (e: any) => e.name === tableName
                );
                const displayName = entity?.displayName || tableName;

                // 转换子表数据格式
                const formattedData = (tableData as any[]).map((item: any) => ({
                  id: item.id,
                  creationTime: item.creationTime,
                  ...item.data,
                  ...item.extraProperties,
                }));

                return {
                  key: tableName,
                  label: `${displayName} (${formattedData.length})`,
                  children: (
                    <Table
                      columns={getChildTableColumns(tableName)}
                      dataSource={formattedData}
                      rowKey="id"
                      size="small"
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `共 ${total} 条`,
                      }}
                      scroll={{ x: 'max-content' }}
                    />
                  ),
                };
              })}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default DynamicDataDetailPage;

export const routeProps = {
  name: '数据详情',
};
