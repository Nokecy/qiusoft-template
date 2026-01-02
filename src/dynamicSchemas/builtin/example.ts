/**
 * 示例内置 Schema
 *
 * 此文件展示如何定义内置的动态表单 Schema
 * 实际使用时可以根据业务场景创建对应的 Schema 文件
 */
import type { DynamicSchemaDefinition } from '../types';

/**
 * 示例：用户基本信息表单
 */
const exampleUserForm: DynamicSchemaDefinition = {
  scenarioKey: 'example:user-info',
  label: '用户基本信息',
  description: '示例表单 - 用户基本信息录入',
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
  schema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入用户名',
        },
      },
      email: {
        type: 'string',
        title: '邮箱',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-validator': 'email',
        'x-component-props': {
          placeholder: '请输入邮箱地址',
        },
      },
      phone: {
        type: 'string',
        title: '手机号',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入手机号',
        },
      },
      department: {
        type: 'string',
        title: '部门',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          { label: '研发部', value: 'dev' },
          { label: '产品部', value: 'product' },
          { label: '运营部', value: 'operation' },
          { label: '市场部', value: 'marketing' },
        ],
        'x-component-props': {
          placeholder: '请选择部门',
        },
      },
    },
  },
};

/**
 * 示例：简单反馈表单
 */
const exampleFeedbackForm: DynamicSchemaDefinition = {
  scenarioKey: 'example:feedback',
  label: '用户反馈',
  description: '示例表单 - 用户反馈收集',
  form: {
    labelCol: 4,
    wrapperCol: 20,
  },
  schema: {
    type: 'object',
    properties: {
      feedbackType: {
        type: 'string',
        title: '反馈类型',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        enum: [
          { label: '功能建议', value: 'suggestion' },
          { label: 'Bug 报告', value: 'bug' },
          { label: '其他', value: 'other' },
        ],
      },
      content: {
        type: 'string',
        title: '反馈内容',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 4,
          placeholder: '请详细描述您的反馈...',
        },
      },
      contact: {
        type: 'string',
        title: '联系方式',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '选填，方便我们联系您',
        },
      },
    },
  },
};

/**
 * 导出所有 Schema 定义
 * 插件会自动扫描并聚合这些定义
 */
export const schemas: DynamicSchemaDefinition[] = [
  exampleUserForm,
  exampleFeedbackForm,
];
