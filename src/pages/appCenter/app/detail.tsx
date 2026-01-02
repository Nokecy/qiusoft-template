/**
 * 应用数据详情页
 * 路由: /appCenter/app/detail?name={applicationName}&id={dataRowId}
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, message, Spin, Empty } from 'antd';
import { ArrowLeftOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { ToolBar } from '@/components';
import { DynamicApplicationGetListAsync, DynamicApplicationGetAsync } from '@/services/openApi/DynamicApplication';
import { DynamicDataGetAsync } from '@/services/openApi/DynamicData';
import { DynamicDataWorkflowSubmitAsync } from '@/services/openApi/DynamicDataWorkflow';
import { FormilySchemaGetSchemaAsync } from '@/services/openApi/FormilySchema';
import { WorkflowStatusTextRender } from '@/pages/appWorkflow/_utils/workflowStatusRender';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import { generateFormilySchema, generateFormConfig } from '../_utils/formGenerator';
import type { AppInfo, EntityInfo } from '../_types';

export const routeProps = {
  name: '应用数据详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const AppDataDetailPage: React.FC = () => {
  const { params } = useKeepAliveParams('/appCenter/app/detail');
  const { name: applicationName, id: dataRowId } = params as any;

  // 创建 SchemaField
  const SchemaField = useSchemaField({});

  // 状态
  const [loading, setLoading] = useState(true);
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [primaryEntity, setPrimaryEntity] = useState<EntityInfo | null>(null);
  const [formSchema, setFormSchema] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState<number | null>(null);
  const [workflowDefinitionId, setWorkflowDefinitionId] = useState<string>('');

  // 创建只读表单实例
  const form = useMemo(
    () => createForm({ readPretty: true }),
    []
  );

  // 加载应用信息
  useEffect(() => {
    if (!applicationName || !dataRowId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // 第一步：从列表中找到应用ID
    DynamicApplicationGetListAsync({ MaxResultCount: 1000 })
      .then((res) => {
        const appFromList = res.items?.find((item: any) => item.name === applicationName);

        if (!appFromList?.id) {
          message.error('应用不存在或已禁用');
          setLoading(false);
          return;
        }

        // 第二步：根据ID获取应用完整详情
        return DynamicApplicationGetAsync({ id: appFromList.id })
          .then((appDetail) => {
            setAppInfo(appDetail as AppInfo);
            // 保存工作流定义ID
            if (appDetail.workflowName) {
              setWorkflowDefinitionId(appDetail.workflowName);
            }
            // 找到主实体 (role = 0 表示 Primary)
            const primary = appDetail.entities?.find((e: any) => e.role === 0);
            setPrimaryEntity(primary as EntityInfo);
          })
          .catch(() => {
            message.error('加载应用详情失败');
          });
      })
      .catch(() => {
        message.error('加载应用列表失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicationName, dataRowId]);

  // 加载表单 Schema
  useEffect(() => {
    if (!applicationName || !primaryEntity) return;

    // 优先尝试获取已发布的 FormSchema
    FormilySchemaGetSchemaAsync({
      applicationName,
      scenarioKey: 'default',
    })
      .then((data) => {
        if (data?.schema) {
          // 使用设计器表单，转换为只读模式
          const readOnlySchema = makeSchemaReadOnly(data.schema);
          setFormSchema({
            form: data.form || generateFormConfig(),
            schema: readOnlySchema,
          });
        } else {
          // 降级：动态生成表单
          fallbackToGeneratedSchema();
        }
      })
      .catch(() => {
        // 出错时降级到动态生成
        fallbackToGeneratedSchema();
      });
  }, [applicationName, primaryEntity]);

  // 降级：根据实体字段动态生成表单
  const fallbackToGeneratedSchema = () => {
    if (primaryEntity?.fields && primaryEntity.fields.length > 0) {
      const generatedSchema = generateFormilySchema(primaryEntity.fields);
      // 转换为只读模式
      const readOnlySchema = makeSchemaReadOnly(generatedSchema);
      setFormSchema({
        form: generateFormConfig(),
        schema: readOnlySchema,
      });
    } else {
      setFormSchema({
        form: generateFormConfig(),
        schema: {
          type: 'object',
          properties: {},
        },
      });
    }
  };

  // 将 Schema 转换为只读模式
  const makeSchemaReadOnly = (schema: any): any => {
    if (!schema) return schema;

    const result = { ...schema };

    // 遍历所有属性，添加只读反应
    if (result.properties) {
      result.properties = Object.entries(result.properties).reduce(
        (acc, [key, value]: [string, any]) => {
          acc[key] = makeSchemaReadOnly(value);
          // 为非 void 类型字段添加只读
          if (value.type !== 'void' && value['x-component']) {
            acc[key] = {
              ...acc[key],
              'x-pattern': 'readPretty',
            };
          }
          return acc;
        },
        {} as Record<string, any>
      );
    }

    return result;
  };

  // 加载数据
  useEffect(() => {
    if (!dataRowId || !applicationName) return;

    setDataLoading(true);
    DynamicDataGetAsync({ id: dataRowId, applicationName })
      .then((data) => {
        const initialValues: Record<string, any> = {};
        // 主表数据
        if (data.data) {
          Object.assign(initialValues, data.data);
        }
        // 扩展属性
        if (data.extraProperties) {
          Object.assign(initialValues, data.extraProperties);
        }
        // 子表数据
        if (data.children) {
          Object.entries(data.children).forEach(([key, items]) => {
            initialValues[key] = (items as any[])?.map((item: any) => ({
              ...item.data,
              ...item.extraProperties,
            }));
          });
        }
        form.setInitialValues(initialValues);

        // 保存工作流状态
        setWorkflowStatus(data.workflowStatus ?? null);
      })
      .catch(() => {
        message.error('加载数据失败');
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [dataRowId, applicationName, form]);

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    if (applicationName) {
      history.push(`/appCenter/app?name=${applicationName}`);
    } else {
      history.push('/appCenter');
    }
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 编辑（跳转到表单页）
  const handleEdit = () => {
    // 这里可以跳转到表单编辑页面，如果有的话
    // 目前使用 FormDialog 方式编辑，所以这里先返回列表
    message.info('请在列表页面点击编辑按钮进行编辑');
    handleBack();
  };

  // 提交工作流
  const handleSubmit = async () => {
    if (!appInfo?.id) {
      message.error('应用信息不存在');
      return;
    }
    const hide = message.loading('正在提交...', 0);
    try {
      await DynamicDataWorkflowSubmitAsync({
        applicationId: appInfo.id,
        dataRowId: dataRowId,
      });
      message.success('提交成功');
      // 刷新数据
      window.location.reload();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 工作流状态判断
  const isWorkflowEnabled = appInfo?.workflowEnabled;
  // 草稿状态（未提交）：可编辑、可提交
  const isDraft = workflowStatus === undefined || workflowStatus === null || workflowStatus === 0;
  // 已拒绝：可编辑、可重新提交
  const isRejected = workflowStatus === 5;
  // 是否可以编辑
  const canEdit = !isWorkflowEnabled || isDraft || isRejected;
  // 是否可以提交
  const canSubmit = isWorkflowEnabled && (isDraft || isRejected);

  // 缺少必要参数
  if (!applicationName || !dataRowId) {
    return (
      <Card>
        <Empty
          description="缺少必要参数（应用名称或数据ID）"
          style={{ padding: '60px 0' }}
        >
          <Button type="primary" onClick={() => history.push('/appCenter')}>
            返回应用中心
          </Button>
        </Empty>
      </Card>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  if (!appInfo) {
    return (
      <Card>
        <Empty
          description="应用不存在或已被删除"
          style={{ padding: '60px 0' }}
        >
          <Button type="primary" onClick={() => history.push('/appCenter')}>
            返回应用中心
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      {/* 业务数据表单（只读） */}
      <Card
        title={`${appInfo.displayName || appInfo.name} - 数据详情`}
        extra={
          isWorkflowEnabled && workflowStatus !== null && (
            <WorkflowStatusTextRender value={workflowStatus} data={{}} />
          )
        }
        style={{ marginBottom: 16 }}
      >
        <Spin spinning={dataLoading || !formSchema} tip="加载中...">
          {formSchema && (
            <FormProvider form={form}>
              <FormLayout {...formLayout}>
                <SchemaField schema={formSchema.schema} />
              </FormLayout>
            </FormProvider>
          )}
        </Spin>
      </Card>

      {/* 工作流执行历史（仅当启用工作流时显示） */}
      {isWorkflowEnabled && (
        <WorkflowExecutionCorrelationList
          hideSearch={true}
          workflowData={{
            correlationId: dataRowId as string,
            workflowDefinitionId: workflowDefinitionId,
          }}
        />
      )}

      {/* 底部按钮栏 */}
      <ToolBar>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          返回
        </Button>
        {canEdit && (
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            编辑
          </Button>
        )}
        {canSubmit && (
          <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit}>
            提交审批
          </Button>
        )}
      </ToolBar>
    </div>
  );
};

export default AppDataDetailPage;
