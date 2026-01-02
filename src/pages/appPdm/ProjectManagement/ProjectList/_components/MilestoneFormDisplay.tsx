import React, { useEffect, useState, useMemo } from 'react';
import { Card, Spin, Empty, Alert, Space, Tag, Button, message } from 'antd';
import { FileTextOutlined, SaveOutlined } from '@ant-design/icons';
import { observer } from '@formily/react';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import { ProjectFormGetAsync } from '@/services/pdm/ProjectForm';
import { ProjectMilestoneSubmitFormDataAsync, ProjectMilestoneGetFormDataAsync } from '@/services/pdm/ProjectMilestone';

interface MilestoneFormDisplayProps {
  milestones?: any[]; // 里程碑数组
  currentMilestoneId?: string; // 当前里程碑ID (来自Project.CurrentMilestoneId)
  value?: any; // 向后兼容: Formily会自动注入milestones数据
  readOnly?: boolean; // 是否只读，默认 true
}

/**
 * 里程碑关联表单展示组件
 * 展示当前进行中里程碑关联的表单
 * 参考: Part/form的动态表单实现
 *
 * 支持两种方式确定当前里程碑:
 * 1. 使用 currentMilestoneId 匹配 (优先,来自 Project.CurrentMilestoneId)
 * 2. 使用 status === 10 筛选 (回退,MilestoneStatus.InProgress)
 *
 * 使用 scenarioKey 而不是 formId 来加载动态表单
 *
 * 【新增功能】支持表单数据保存和回显:
 * - readOnly=false 时显示保存按钮
 * - 自动加载已提交的表单数据进行回显
 * - 保存时调用 ProjectMilestoneSubmitFormDataAsync API
 */
const MilestoneFormDisplay: React.FC<MilestoneFormDisplayProps> = observer((props) => {
  const { milestones: propMilestones, currentMilestoneId, value, readOnly = true } = props;

  // 优先使用 props.milestones,如果没有则使用 value (向后兼容)
  const milestones = Array.isArray(propMilestones) ? propMilestones : (Array.isArray(value) ? value : []);

  // 确定当前里程碑
  let currentMilestone: any = null;

  if (currentMilestoneId) {
    // 方式1: 使用 currentMilestoneId 匹配
    currentMilestone = milestones.find((m: any) => m?.id === currentMilestoneId);
  } else {
    // 方式2: 使用 status === 10 筛选,取第一个
    const inProgressMilestones = milestones.filter((m: any) => m?.status === 10);
    currentMilestone = inProgressMilestones[0];
  }

  // 【关键逻辑】获取当前里程碑关联表单的scenarioKey
  // 后端返回的 milestone.form 可能为 null (未包含导航属性)
  // 此时需要根据 milestone.formId 调用 ProjectFormGetAsync 获取表单实体
  const [scenarioKey, setScenarioKey] = useState<string | undefined>(undefined);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<Error | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadScenarioKey = async () => {
      if (!currentMilestone) {
        setScenarioKey(undefined);
        return;
      }

      // 方式1: 如果 form 对象存在且有 scenarioKey,直接使用
      if (currentMilestone.form?.scenarioKey) {
        setScenarioKey(currentMilestone.form.scenarioKey);
        return;
      }

      // 方式2: 如果 form 为 null 但有 formId,通过API查询表单实体
      if (currentMilestone.formId) {
        setFormLoading(true);
        setFormError(null);
        try {
          const formEntity = await ProjectFormGetAsync({ id: currentMilestone.formId });
          setScenarioKey(formEntity.scenarioKey);
        } catch (err: any) {
          setFormError(err);
        } finally {
          setFormLoading(false);
        }
        return;
      }

      // 方式3: 既没有 form 对象也没有 formId
      setScenarioKey(undefined);
    };

    loadScenarioKey();
  }, [currentMilestone]);

  // 获取动态Schema (使用从ProjectForm查询到的scenarioKey)
  const {
    schema: dynamicSchema,
    formConfig,
    source: schemaSource,
    loading: schemaLoading,
    error: schemaError,
  } = useDynamicSchema(scenarioKey || '');

  const SchemaField = useSchemaField();

  // 根据 readOnly prop 动态创建表单实例
  const formilyForm = useMemo(() => {
    const pattern = readOnly ? 'readPretty' : 'editable';
    return createForm({ pattern });
  }, [readOnly]);

  // 【新增】加载已提交的表单数据进行回显
  useEffect(() => {
    const loadFormData = async () => {
      if (!currentMilestone?.id || !scenarioKey || !dynamicSchema) {
        return;
      }

      setFormLoading(true);
      try {
        const formDataDto = await ProjectMilestoneGetFormDataAsync({ milestoneId: currentMilestone.id });

        // 注意：后端返回的字段名是 submittedFormData，不是 formData
        if (formDataDto.submittedFormData) {
          try {
            const parsedData = JSON.parse(formDataDto.submittedFormData);
            // 使用 setValues 而不是 setInitialValues，确保切换里程碑时能正确更新表单
            formilyForm.setValues(parsedData);
          } catch (parseError) {
            formilyForm.reset(); // 解析失败时清空表单
          }
        } else {
          formilyForm.reset(); // 没有表单数据时清空表单
        }
      } catch (err: any) {
        // 404 错误表示还没有提交过表单数据，清空表单
        if (err.status === 404) {
          formilyForm.reset();
        }
      } finally {
        setFormLoading(false);
      }
    };

    loadFormData();
  }, [currentMilestone?.id, scenarioKey, dynamicSchema, formilyForm]);

  // 【新增】保存表单数据
  const handleSave = async () => {
    try {
      setSaving(true);

      // 验证表单
      await formilyForm.validate();

      // 获取表单数据
      const formData = formilyForm.values;

      // 调用API提交
      await ProjectMilestoneSubmitFormDataAsync({
        milestoneId: currentMilestone.id,
        formData: JSON.stringify(formData),
      });

      message.success('表单数据已保存');
    } catch (err: any) {
      message.error('保存失败: ' + (err.message || '未知错误'));
    } finally {
      setSaving(false);
    }
  };

  // 如果没有进行中的里程碑,不显示
  if (!currentMilestone) {
    return null;
  }

  // 如果当前里程碑没有关联表单，不显示组件
  if (!scenarioKey) {
    return null;
  }

  // Schema 加载中或表单实体查询中
  if (schemaLoading || formLoading) {
    return (
      <Card
        title={
          <Space>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <span>里程碑关联表单</span>
            <Tag color="blue">{currentMilestone.milestoneName}</Tag>
          </Space>
        }
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" tip={formLoading ? '加载表单数据中...' : '加载表单配置中...'} />
        </div>
      </Card>
    );
  }

  // Schema 加载错误或表单实体查询错误
  if (schemaError || formError) {
    return (
      <Card
        title={
          <Space>
            <FileTextOutlined style={{ color: '#ff4d4f' }} />
            <span>里程碑关联表单</span>
            <Tag color="blue">{currentMilestone.milestoneName}</Tag>
          </Space>
        }
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        <Alert
          message={formError ? '表单信息查询失败' : '表单配置加载失败'}
          description={
            formError
              ? `无法获取表单信息: ${formError.message || '未知错误'}`
              : schemaError?.message || '无法加载表单配置'
          }
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card
      title={
        <div>
          <Space style={{ paddingTop: 8, paddingBottom: 4 }}>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <span>里程碑关联表单</span>
            <Tag color="blue">{currentMilestone.milestoneName}</Tag>
            {schemaSource === 'backend' && (
              <Tag color="green">动态</Tag>
            )}
            {currentMilestone.formSubmittedAt && (
              <Tag color="success">已提交</Tag>
            )}
          </Space>
          {/* 按钮区域 - 在标题下方 */}
          {!readOnly && (
            <div style={{ marginTop: 4, marginBottom: 8 }}>
              <Button
                type="primary"
                size="small"
                icon={<SaveOutlined />}
                onClick={handleSave}
                loading={saving}
              >
                保存表单
              </Button>
            </div>
          )}
        </div>
      }
      extra={null}
      style={{ marginTop: 16, marginBottom: 16 }}
    >
      {dynamicSchema ? (
        <FormProvider form={formilyForm}>
          <FormLayout {...formConfig}>
            <SchemaField schema={dynamicSchema} />
          </FormLayout>
        </FormProvider>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="表单Schema为空"
        />
      )}
    </Card>
  );
});

export default MilestoneFormDisplay;
