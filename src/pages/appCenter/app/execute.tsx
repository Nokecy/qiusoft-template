/**
 * 应用数据工作流审批页
 * 路由: /appCenter/app/execute?correlationId={dataRowId}&definitionId={}&workflowInstanceId={}&activityId={}&workItemId={}
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, message, Spin, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { ToolBar } from '@/components';
import { DynamicApplicationGetAsync } from '@/services/openApi/DynamicApplication';
import { DynamicDataGetAsync } from '@/services/openApi/DynamicData';
import {
  DynamicDataWorkflowExecuteAsync,
  DynamicDataWorkflowGetApplicationInfoByTargetRowIdAsync,
} from '@/services/openApi/DynamicDataWorkflow';
import { FormilySchemaGetSchemaAsync } from '@/services/openApi/FormilySchema';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkItemAssignDialog from '@/pages/appWorkflow/_utils/workItemAssignDialog';
import { useWorkflow } from '@/hooks/useWorkflow';
import { generateFormilySchema, generateFormConfig } from '../_utils/formGenerator';
import type { AppInfo, EntityInfo } from '../_types';
import { useKeepAliveParams } from '@/hooks';

export const routeProps = {
  name: '应用数据审批',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const AppDataExecutePage: React.FC = () => {
  const { params } = useKeepAliveParams('/appCenter/app/execute', ['correlationId', 'definitionId', 'workflowInstanceId', 'activityId', 'workItemId']);
  const {
    correlationId: dataRowId,
    definitionId,
    workflowInstanceId,
    activityId,
    workItemId,
  } = params;

  // 创建 SchemaField
  const SchemaField = useSchemaField({});

  // 状态
  const [loading, setLoading] = useState(true);
  const [applicationName, setApplicationName] = useState<string>('');
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [primaryEntity, setPrimaryEntity] = useState<EntityInfo | null>(null);
  const [formSchema, setFormSchema] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);

  // 获取工作流信息
  const workflowInfo = useWorkflow(workflowInstanceId, activityId, dataRowId);

  // 创建表单实例
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    []
  );

  // 根据 correlationId 获取应用信息
  useEffect(() => {
    if (!dataRowId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // 第一步：根据 correlationId 获取应用基本信息
    DynamicDataWorkflowGetApplicationInfoByTargetRowIdAsync({ targetRowId: dataRowId })
      .then((appBaseInfo) => {
        if (!appBaseInfo?.applicationId) {
          message.error('无法获取应用信息');
          setLoading(false);
          return;
        }

        setApplicationName(appBaseInfo.applicationName || '');

        // 第二步：根据应用ID获取完整详情（包含实体和字段）
        return DynamicApplicationGetAsync({ id: appBaseInfo.applicationId })
          .then((appDetail) => {
            setAppInfo(appDetail as AppInfo);
            // 找到主实体 (role = 0 表示 Primary)
            const primary = appDetail.entities?.find((e: any) => e.role === 0);
            setPrimaryEntity(primary as EntityInfo);
          })
          .catch(() => {
            message.error('加载应用详情失败');
          });
      })
      .catch(() => {
        message.error('获取应用信息失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataRowId]);

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

  // 提交工作流审批
  const handleSubmit = async () => {
    try {
      await form.validate();
      const values = form.values;

      // 检查工作流输入
      if (!values.workflowInput) {
        message.error('请填写审批意见');
        return;
      }

      if (!appInfo?.id) {
        message.error('应用信息不存在');
        return;
      }

      const hide = message.loading('正在提交...', 0);
      try {
        await DynamicDataWorkflowExecuteAsync(
          {
            applicationId: appInfo.id,
            dataRowId: dataRowId,
          },
          {
            workflowInput: values.workflowInput,
          }
        );

        message.success('审批提交成功');
        handleBack();
      } finally {
        hide();
      }
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('审批提交失败');
    }
  };

  // 缺少必要参数
  if (!dataRowId) {
    return (
      <Card>
        <Empty
          description="缺少必要参数（数据ID）"
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
      {/* 工作流进度信息 */}
      <WorkflowInstanceInfo
        workflowInstanceId={workflowInstanceId as string}
        correlationData={{ ...form.values, activityId }}
        steps={[]}
        currentActivityName={workflowInfo.currentActivityName}
      />

      {/* 业务数据表单（只读） */}
      <Card
        title={`${appInfo.displayName || appInfo.name} - 数据详情`}
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

      {/* 工作流执行表单（审批意见） */}
      <WorkflowExecutionForm
        form={form}
        workflowInstanceId={workflowInstanceId as string}
        definitionId={definitionId as string}
        activityId={activityId as string}
        currentActivityName={workflowInfo.currentActivityName}
      />

      {/* 工作流关联列表（执行历史） */}
      <WorkflowExecutionCorrelationList
        hideSearch={true}
        workflowData={{
          correlationId: dataRowId as string,
          workflowDefinitionId: definitionId as string,
        }}
      />

      {/* 底部按钮栏 */}
      <ToolBar>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          返回
        </Button>
        <WorkItemAssignDialog workflowInfo={{ workItemId }} />
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </ToolBar>
    </div>
  );
};

export default AppDataExecutePage;
