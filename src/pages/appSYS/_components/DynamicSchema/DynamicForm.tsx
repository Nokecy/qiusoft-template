import React, { useMemo, useEffect } from 'react';
import { createForm, Form as FormType } from '@formily/core';
import { Form, Submit } from '@formily/antd-v5';
import { Spin, Result } from 'antd';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

export interface DynamicFormProps {
  /** 场景标识 */
  scenarioKey: string;
  /** 初始值 */
  initialValues?: Record<string, any>;
  /** 提交回调 */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  /** 是否只读 */
  readOnly?: boolean;
  /** 自定义 form 实例 */
  form?: FormType;
  /** 额外的表单组件 */
  formWidgetComponents?: Record<string, React.ComponentType<any>>;
  /** 子元素（用于自定义按钮等） */
  children?: React.ReactNode;
  /** Loading 状态的占位内容 */
  loadingContent?: React.ReactNode;
  /** 错误状态的占位内容 */
  errorContent?: React.ReactNode;
  /** readPretty ??????? */
  previewTextPlaceholder?: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  scenarioKey,
  initialValues,
  onSubmit,
  readOnly = false,
  form: externalForm,
  formWidgetComponents,
  children,
  loadingContent,
  errorContent,
  previewTextPlaceholder,
}) => {
  // 获取动态 Schema
  const { schema, formConfig, loading, error } = useDynamicSchema(scenarioKey);

  // 创建 SchemaField
  const SchemaField = useSchemaField(formWidgetComponents);

  // 创建或使用外部 form 实例
  const form = useMemo(() => {
    return externalForm || createForm({
      readPretty: readOnly,
      initialValues,
    });
  }, [externalForm, readOnly]);

  // 当 initialValues 变化时更新表单
  useEffect(() => {
    if (initialValues && !externalForm) {
      form.setInitialValues(initialValues);
    }
  }, [initialValues, form, externalForm]);

  // 处理提交
  const handleSubmit = async (values: Record<string, any>) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  // Loading 状态
  if (loading) {
    return loadingContent || (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin tip="加载表单中..." />
      </div>
    );
  }

  // 错误状态
  if (error) {
    return errorContent || (
      <Result
        status="error"
        title="表单加载失败"
        subTitle={error.message}
      />
    );
  }

  return (
    <Form
      form={form}
      {...formConfig}
      onAutoSubmit={handleSubmit}
      previewTextPlaceholder={previewTextPlaceholder}
    >
      <SchemaField schema={schema} />
      {children || (
        <Submit block size="large">
          提交
        </Submit>
      )}
    </Form>
  );
};

export default DynamicForm;
