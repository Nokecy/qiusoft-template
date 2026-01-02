import React, { useMemo, useEffect } from 'react';
import { Card } from 'antd';
import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, FormGrid } from '@formily/antd-v5';
import PartSelect from '@/pages/appPdm/_utils/PartSelect';

/**
 * BasicInfoForm Schema Field
 * 使用 Formily 创建的 Schema 字段组件
 */
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
    PartSelect,
  },
});

interface BasicInfoFormProps {
  initialValues?: any; // 初始值
  onChange?: (values: any) => void; // 值变化回调
  readOnly?: boolean; // 只读模式
}

/**
 * 基础信息表单组件 - 工业紧凑风格
 * 使用 Formily 实现的工艺路线基本信息表单
 */
const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ initialValues = {}, onChange, readOnly = false }) => {
  // 创建 Formily 表单实例
  const form = useMemo(() => {
    const formInstance = createForm({
      initialValues,
      effects() {
        // 监听表单值变化
        onFieldReact('*', (field) => {
          if (onChange) {
            onChange(formInstance.values);
          }
        });
      },
    });
    return formInstance;
  }, []);

  // 当 initialValues 变化时，更新表单值
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      form.setInitialValues(initialValues);
      form.reset();
      // 手动触发 onChange 以确保父组件获取到加载后的值
      if (onChange) {
        onChange(form.values);
      }
    }
  }, [initialValues, form, onChange]);

  // 当 readOnly 变化时，设置表单模式
  useEffect(() => {
    if (readOnly) {
      form.setPattern('readPretty');
    } else {
      form.setPattern('editable');
    }
  }, [readOnly, form]);

  // 表单 Schema 定义 - 紧凑型网格布局
  const schema = {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 4,
          minColumns: 1,
          strictAutoFit: true,
        },
        properties: {
          code: {
            type: 'string',
            title: '工艺路线编码',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入编码',
              maxLength: 50,
            },
            'x-decorator-props': {
              gridSpan: 1,
            },
            'x-validator': [
              {
                required: true,
                message: '请输入工艺路线编码',
              },
            ],
          },
          name: {
            type: 'string',
            title: '工艺路线名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入名称',
              maxLength: 100,
            },
            'x-decorator-props': {
              gridSpan: 1,
            },
            'x-validator': [
              {
                required: true,
                message: '请输入工艺路线名称',
              },
            ],
          },
          version: {
            type: 'string',
            title: '版本',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入版本号',
              maxLength: 20,
            },
            'x-decorator-props': {
              gridSpan: 1,
            },
            'x-validator': [
              {
                required: true,
                message: '请输入版本号',
              },
            ],
          },
          materialCode: {
            type: 'string',
            title: '物料',
            'x-decorator': 'FormItem',
            'x-component': 'PartSelect',
            'x-component-props': {
              placeholder: '请选择物料',
              labelInValue: true,
              useCode: true,
            },
            'x-decorator-props': {
              gridSpan: 1,
            },
          },
          memo: {
            type: 'string',
            title: '备注',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              placeholder: '请输入备注',
              rows: 2,
              maxLength: 500,
            },
            'x-decorator-props': {
              gridSpan: 4,
            },
          },
        },
      },
    },
  };

  return (
    <Card title="基本信息" style={{ height: '100%' }}>
      <Form form={form} labelWidth={120} feedbackLayout="none">
        <SchemaField schema={schema} />
      </Form>
    </Card>
  );
};

export default BasicInfoForm;
