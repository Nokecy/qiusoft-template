import React, { useState, useCallback, useMemo } from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFormValidateFailed } from '@formily/core';
import { Button, message, Spin } from 'antd';
import { useFormSchema, useSchemaField } from '@umijs/max';
import { StandardFormDialogProps } from './types';

/**
 * 标准化FormDialog组件
 * 
 * 基于配置自动生成标准化的表单对话框，包含：
 * - 统一的表单结构和布局
 * - 自动的数据加载和提交逻辑
 * - 标准化的错误处理
 * - 可配置的API调用
 * - 灵活的Schema支持
 * - 性能优化和加载状态管理
 * 
 * @param props 组件属性
 */
const StandardFormDialog: React.FC<StandardFormDialogProps> = (props) => {
  const {
    schemaConfig,
    formId: directFormId,
    formSchema: directFormSchema,
    apiConfig,
    width = 800,
    entityId,
    title = '表单',
    buttonProps = { type: 'primary' },
    onAfterSubmit,
    children,
    portalIdPrefix = 'Standard',
    customInitializer,
    customSubmitHandler,
    useUnifiedErrorHandling = true
  } = props;
  
  // 组件状态
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 确定Schema配置
  const finalSchemaConfig = schemaConfig || {
    formId: directFormId!,
    ...directFormSchema!
  };

  const { formId, form: formConfig, schema: schemaDefinition } = finalSchemaConfig;

  // 使用Schema
  const schema = useFormSchema(formId, { form: formConfig, schema: schemaDefinition });
  const SchemaField = useSchemaField({});

  // 生成Portal ID
  const portalId = `${portalIdPrefix}.${formId}${entityId || ''}`;

  // 表单初始化回调
  const initializeForm = useCallback(async (form: any) => {
    if (entityId) {
      setLoading(true);
      try {
        if (customInitializer) {
          // 使用自定义初始化逻辑
          await customInitializer(form, entityId);
        } else if (apiConfig.get) {
          // 使用默认的数据加载逻辑
          const data = await apiConfig.get({ id: entityId });
          form.setInitialValues(data);
        } else {
          console.warn('编辑模式但未提供get API或自定义初始化函数');
        }
      } catch (error: any) {
        console.error('加载数据失败:', error);
        const errorMessage = error.response?.data?.error?.message || error.message || '加载数据失败';
        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  }, [entityId, customInitializer, apiConfig.get]);
  
  // 表单验证失败回调
  const handleValidationFailed = useCallback((form: any) => {
    const errors = form.errors;
    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      const fieldNames = errorFields.map(field => {
        // 尝试获取字段的显示名称
        const fieldSchema = form.getFieldState(field);
        return fieldSchema?.title || field;
      });
      message.error(`请检查表单错误：${fieldNames.join(', ')}`);
    }
  }, []);

  // 表单属性配置
  const formProps = useMemo(() => ({
    effects: () => {
      onFormInit(initializeForm);
      onFormValidateFailed(handleValidationFailed);
    }
  }), [initializeForm, handleValidationFailed]);

  // 提交处理函数
  const handleSubmit = useCallback(async (payload: any, next: any) => {
    setSubmitting(true);
    try {
      const values: any = payload.values;
      const isEdit = !!values.id || !!entityId;
      
      // FormDialog已经在内部处理了验证，无需手动调用validate
      // Formily的FormDialog.forConfirm会自动验证表单
      
      if (customSubmitHandler) {
        // 使用自定义提交逻辑
        await customSubmitHandler(values, isEdit);
      } else {
        // 使用默认的提交逻辑
        if (isEdit) {
          if (!apiConfig.update) {
            throw new Error('更新API未配置');
          }
          await apiConfig.update({ id: values.id || entityId }, values);
          message.success('更新成功');
        } else {
          if (!apiConfig.create) {
            throw new Error('创建API未配置');
          }
          await apiConfig.create(values);
          message.success('创建成功');
        }
      }
      
      // 调用成功回调
      if (onAfterSubmit) {
        onAfterSubmit();
      }
      
      // 关闭对话框
      next(payload);
    } catch (error: any) {
      console.error('提交失败:', error);
      
      if (useUnifiedErrorHandling) {
        // 使用统一错误处理
        const errorMessage = error.response?.data?.error?.message || 
                           error.message || 
                           '操作失败';
        message.error(`操作失败：${errorMessage}`);
      } else {
        // 使用简单错误处理
        message.error('操作失败：' + (error.message || '未知错误'));
      }
      
      // 不调用 next，阻止对话框关闭
    } finally {
      setSubmitting(false);
    }
  }, [entityId, customSubmitHandler, apiConfig, onAfterSubmit, useUnifiedErrorHandling]);

  // 点击处理函数
  const handleClick = useCallback(() => {
    const formDialog = FormDialog(
      { 
        title, 
        width,
        okButtonProps: { 
          loading: submitting,
          disabled: loading || submitting
        },
        cancelButtonProps: {
          disabled: submitting
        },
        closable: !submitting,
        maskClosable: !submitting
      }, 
      portalId, 
      () => (
        <div style={{ minHeight: 200, position: 'relative' }}>
          {loading && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}
            >
              <Spin tip="加载数据中..." />
            </div>
          )}
          <FormLayout {...schema.form}>
            <SchemaField schema={schema.schema} />
          </FormLayout>
        </div>
      )
    );

    formDialog
      .forConfirm(handleSubmit)
      .open(formProps);
  }, [title, width, portalId, schema, formProps, handleSubmit, loading, submitting]);

  return (
    <FormDialog.Portal id={portalId}>
      <Button onClick={handleClick} {...buttonProps}>
        {children}
      </Button>
    </FormDialog.Portal>
  );
};

/**
 * 错误边界组件
 */
class StandardFormDialogErrorBoundary extends React.Component<
  { children: React.ReactNode; title?: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('StandardFormDialog Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: '48px', color: '#ccc' }}>⚠</span>
          </div>
          <div style={{ marginBottom: 8, fontWeight: 'bold' }}>
            表单加载失败
          </div>
          <div style={{ color: '#999', marginBottom: 16 }}>
            表单组件发生错误，请稍后重试或联系技术支持。
          </div>
          <Button 
            type="primary" 
            onClick={() => this.setState({ hasError: false })}
          >
            重试
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 带错误边界的StandardFormDialog组件
 */
const StandardFormDialogWithErrorBoundary: React.FC<StandardFormDialogProps> = (props) => {
  return (
    <StandardFormDialogErrorBoundary title={props.title}>
      <StandardFormDialog {...props} />
    </StandardFormDialogErrorBoundary>
  );
};

export default StandardFormDialogWithErrorBoundary;