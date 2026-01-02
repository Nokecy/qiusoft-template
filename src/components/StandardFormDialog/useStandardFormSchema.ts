import { useMemo } from 'react';
import { ISchema } from '@formily/react';
import { FormSchemaConfig } from './types';

/**
 * 标准表单Schema Hook
 * 
 * 提供便捷的Schema创建和管理功能
 */
export const useStandardFormSchema = (
  formId: string,
  businessSchema: Record<string, any>,
  formConfig?: Record<string, any>
): FormSchemaConfig => {
  return useMemo(() => {
    const defaultFormConfig = {
      labelCol: 6,
      wrapperCol: 18,
      labelWidth: "120px",
      feedbackLayout: "none"
    };

    const finalFormConfig = { ...defaultFormConfig, ...formConfig };

    const schema: ISchema = {
      type: "object",
      properties: businessSchema
    };

    return {
      formId,
      form: finalFormConfig,
      schema
    };
  }, [formId, businessSchema, formConfig]);
};

/**
 * 创建标准Grid Schema的工具函数
 */
export const createGridSchema = (
  properties: Record<string, any>,
  maxColumns: number = 2,
  strictAutoFit: boolean = true
): Record<string, any> => {
  return {
    grid: {
      type: "void",
      "x-component": "FormGrid",
      "x-component-props": {
        maxColumns,
        strictAutoFit
      },
      properties
    }
  };
};

/**
 * 创建表单字段的工具函数
 */
export const createFormField = (
  title: string,
  component: string = 'Input',
  options?: {
    type?: string;
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    rows?: number;
    gridSpan?: number;
    componentProps?: Record<string, any>;
    decoratorProps?: Record<string, any>;
  }
) => {
  const {
    type = 'string',
    required = false,
    placeholder,
    maxLength,
    rows,
    gridSpan = 1,
    componentProps = {},
    decoratorProps = {}
  } = options || {};

  const field: any = {
    type,
    title,
    "x-decorator": "FormItem",
    "x-component": component,
    "x-component-props": {
      placeholder: placeholder || `请输入${title}`,
      ...componentProps
    },
    "x-decorator-props": {
      gridSpan,
      ...decoratorProps
    }
  };

  if (required) {
    field.required = true;
  }

  if (maxLength) {
    field["x-component-props"].maxLength = maxLength;
  }

  if (rows && (component === 'Input.TextArea' || component === 'TextArea')) {
    field["x-component-props"].rows = rows;
  }

  return field;
};

/**
 * 创建选择字段的工具函数
 */
export const createSelectField = (
  title: string,
  options: Array<{ label: string; value: any }>,
  fieldOptions?: {
    required?: boolean;
    placeholder?: string;
    gridSpan?: number;
    mode?: 'multiple' | 'tags';
  }
) => {
  const {
    required = false,
    placeholder,
    gridSpan = 1,
    mode
  } = fieldOptions || {};

  return createFormField(title, 'Select', {
    required,
    placeholder: placeholder || `请选择${title}`,
    gridSpan,
    componentProps: {
      options,
      mode
    }
  });
};

/**
 * 快速创建常用字段的工具函数集合
 */
export const FieldCreators = {
  /**
   * 创建输入框字段
   */
  input: (title: string, required: boolean = false, gridSpan: number = 1) =>
    createFormField(title, 'Input', { required, gridSpan }),

  /**
   * 创建文本域字段
   */
  textarea: (title: string, rows: number = 3, gridSpan: number = 2) =>
    createFormField(title, 'Input.TextArea', { rows, gridSpan }),

  /**
   * 创建数字输入框字段
   */
  number: (title: string, required: boolean = false, gridSpan: number = 1) =>
    createFormField(title, 'NumberPicker', { type: 'number', required, gridSpan }),

  /**
   * 创建选择框字段
   */
  select: (title: string, options: Array<{ label: string; value: any }>, required: boolean = false) =>
    createSelectField(title, options, { required }),

  /**
   * 创建日期字段
   */
  date: (title: string, required: boolean = false, gridSpan: number = 1) =>
    createFormField(title, 'DatePicker', { required, gridSpan }),

  /**
   * 创建日期时间字段
   */
  datetime: (title: string, required: boolean = false, gridSpan: number = 1) =>
    createFormField(title, 'DatePicker', { 
      required, 
      gridSpan, 
      componentProps: { showTime: true } 
    })
};