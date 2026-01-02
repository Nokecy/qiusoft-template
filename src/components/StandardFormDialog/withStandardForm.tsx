import React from 'react';
import StandardFormDialog from './StandardFormDialog';
import { StandardFormDialogProps, WithStandardFormConfig, ExternalSchemaConfig } from './types';

/**
 * 标准表单配置接口 - 向后兼容
 * @deprecated 请使用 WithStandardFormConfig 类型
 */
export type StandardFormConfig = WithStandardFormConfig

/**
 * 重新导出类型以保持向后兼容性
 */
export type { ExternalSchemaConfig, WithStandardFormConfig };

/**
 * 创建带有标准表单的高阶组件
 * 
 * 这个工厂函数创建一个标准化的表单对话框组件，包含：
 * - 支持外部Schema文件导入或自动Schema构建
 * - 标准的 API 调用逻辑
 * - 统一的错误处理
 * - 可配置的业务字段
 * 
 * @param config 标准表单配置
 * @returns 标准表单对话框组件
 * 
 * @example
 * // 使用businessFields（内部构建schema）
 * const FormDialog = withStandardForm({
 *   formId: 'Common.Materials',
 *   businessFields: {
 *     code: FieldCreators.input('物料编码', true),
 *     name: FieldCreators.input('物料名称', true)
 *   },
 *   apiConfig: { get: GetAsync, create: CreateAsync }
 * });
 * 
 * @example
 * // 使用外部schema文件
 * import { form, schema } from './schema';
 * const FormDialog = withStandardForm({
 *   formId: 'Common.Materials',
 *   externalSchema: { form, schema },
 *   apiConfig: { get: GetAsync, create: CreateAsync }
 * });
 */
export const withStandardForm = (config: WithStandardFormConfig) => {
  const {
    formId,
    businessFields,
    externalSchema,
    apiConfig,
    defaultDialogConfig = {},
    customHandlers = {}
  } = config;

  // 验证配置
  if (!externalSchema && !businessFields) {
    throw new Error(`withStandardForm: formId "${formId}" 必须提供 businessFields 或 externalSchema 其中之一`);
  }

  // 使用外部Schema或构建内部Schema
  let finalFormConfig: any;
  let finalFormSchema: any;

  if (externalSchema) {
    // 使用外部传入的schema配置
    finalFormConfig = externalSchema.form;
    finalFormSchema = externalSchema.schema;
    
    console.log(`✅ withStandardForm: ${formId} 使用外部Schema配置`);
  } else {
    // 构建表单 Schema（向后兼容）
    finalFormSchema = {
      type: 'object',
      properties: {
        // 系统字段
        id: {
          type: 'string',
          'x-component': 'Input',
          'x-display': 'hidden'
        },
        // 业务字段
        ...businessFields,
        // 审计字段（如果需要）
        creationTime: {
          type: 'string',
          title: '创建时间',
          'x-component': 'DatePicker',
          'x-component-props': {
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: true,
            disabled: true
          },
          'x-display': 'hidden'
        },
        lastModificationTime: {
          type: 'string',
          title: '最后修改时间',
          'x-component': 'DatePicker',
          'x-component-props': {
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: true,
            disabled: true
          },
          'x-display': 'hidden'
        }
      }
    };

    // 表单布局配置（向后兼容）
    finalFormConfig = {
      labelCol: 6,
      wrapperCol: 16,
      colon: false,
      layout: 'horizontal',
      // FormGrid 配置
      grid: {
        strictAutoFit: true,
        minColumns: 1,
        maxColumns: 2
      }
    };

    console.log(`✅ withStandardForm: ${formId} 使用内部构建Schema`);
  }

  // 创建标准表单组件
  const StandardFormComponent: React.FC<Partial<StandardFormDialogProps> & {
    entityId?: string;
    title?: string;
    onAfterSubmit?: () => void;
    children?: React.ReactNode;
    buttonProps?: any;
  }> = (props) => {
    const {
      entityId,
      title = defaultDialogConfig.title || '表单',
      width = defaultDialogConfig.width || 800,
      onAfterSubmit,
      children,
      buttonProps,
      ...restProps
    } = props;

    return (
      <StandardFormDialog
        schemaConfig={{
          formId,
          form: finalFormConfig,
          schema: finalFormSchema
        }}
        apiConfig={apiConfig}
        entityId={entityId}
        title={title}
        width={width}
        onAfterSubmit={onAfterSubmit}
        buttonProps={buttonProps}
        customInitializer={customHandlers.initializer}
        customSubmitHandler={customHandlers.submitHandler}
        {...restProps}
      >
        {children}
      </StandardFormDialog>
    );
  };

  // 设置组件显示名称
  StandardFormComponent.displayName = `withStandardForm(${formId})`;

  return StandardFormComponent;
};

/**
 * 字段创建器工具函数集合
 * 提供常用字段类型的快速创建方法
 */
export const FieldCreators = {
  /**
   * 输入框字段
   */
  input: (title: string, required: boolean = false, props: any = {}) => ({
    type: 'string',
    title,
    required,
    'x-component': 'Input',
    'x-component-props': {
      placeholder: `请输入${title}`,
      ...props
    }
  }),

  /**
   * 数字输入字段
   */
  number: (title: string, required: boolean = false, props: any = {}) => ({
    type: 'number',
    title,
    required,
    'x-component': 'NumberPicker',
    'x-component-props': {
      placeholder: `请输入${title}`,
      style: { width: '100%' },
      ...props
    }
  }),

  /**
   * 文本域字段
   */
  textarea: (title: string, required: boolean = false, props: any = {}) => ({
    type: 'string',
    title,
    required,
    'x-component': 'Input.TextArea',
    'x-component-props': {
      placeholder: `请输入${title}`,
      rows: 4,
      maxLength: 500,
      showCount: true,
      ...props
    }
  }),

  /**
   * 日期字段
   */
  date: (title: string, required: boolean = false, props: any = {}) => ({
    type: 'string',
    title,
    required,
    'x-component': 'DatePicker',
    'x-component-props': {
      placeholder: `请选择${title}`,
      style: { width: '100%' },
      format: 'YYYY-MM-DD',
      ...props
    }
  }),

  /**
   * 日期时间字段
   */
  datetime: (title: string, required: boolean = false, props: any = {}) => ({
    type: 'string',
    title,
    required,
    'x-component': 'DatePicker',
    'x-component-props': {
      placeholder: `请选择${title}`,
      style: { width: '100%' },
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      ...props
    }
  }),

  /**
   * 开关字段
   */
  switch: (title: string, defaultValue: boolean = false, props: any = {}) => ({
    type: 'boolean',
    title,
    default: defaultValue,
    'x-component': 'Switch',
    'x-component-props': props
  }),

  /**
   * 选择字段
   */
  select: (title: string, required: boolean = false, props: any = {}) => ({
    type: 'string',
    title,
    required,
    'x-component': 'Select',
    'x-component-props': {
      placeholder: `请选择${title}`,
      style: { width: '100%' },
      allowClear: true,
      ...props
    }
  }),

  /**
   * 隐藏字段
   */
  hidden: (defaultValue: any = undefined) => ({
    type: 'string',
    default: defaultValue,
    'x-component': 'Input',
    'x-display': 'hidden'
  })
};

/**
 * 创建选择字段
 */
export const createSelectField = (
  title: string, 
  options: Array<{ label: string; value: any; [key: string]: any }>, 
  config: { 
    required?: boolean; 
    multiple?: boolean; 
    allowClear?: boolean;
    showSearch?: boolean;
    placeholder?: string;
  } = {}
) => {
  const { 
    required = false, 
    multiple = false, 
    allowClear = true,
    showSearch = false,
    placeholder 
  } = config;

  return {
    type: multiple ? 'array' : typeof options[0]?.value,
    title,
    required,
    enum: options.map(opt => opt.value),
    'x-component': 'Select',
    'x-component-props': {
      placeholder: placeholder || `请选择${title}`,
      style: { width: '100%' },
      allowClear,
      showSearch,
      mode: multiple ? 'multiple' : undefined,
      options: options.map(opt => ({
        label: opt.label,
        value: opt.value
      }))
    }
  };
};

/**
 * 创建级联选择字段
 */
export const createCascaderField = (
  title: string,
  options: any[],
  config: {
    required?: boolean;
    changeOnSelect?: boolean;
    expandTrigger?: 'click' | 'hover';
    placeholder?: string;
  } = {}
) => {
  const {
    required = false,
    changeOnSelect = false,
    expandTrigger = 'click',
    placeholder
  } = config;

  return {
    type: 'array',
    title,
    required,
    'x-component': 'Cascader',
    'x-component-props': {
      placeholder: placeholder || `请选择${title}`,
      style: { width: '100%' },
      options,
      changeOnSelect,
      expandTrigger
    }
  };
};

export default withStandardForm;