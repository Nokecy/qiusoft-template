import { ISchema } from '@formily/react';
import { versionNumberStyleOptions } from '../_enums';

export const itemFormId: string = 'Pdm.CategoryLevelItem';

export const createItemFormSchema = (parentItemOptions: { label: string; value: string }[] = []): { form: Record<string, any>; schema: ISchema } => ({
  form: {
    labelCol: 6,
    wrapperCol: 16,
    labelWidth: '110px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          itemCode: {
            type: 'string',
            title: '候选项代码',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '如：1、10、001', maxLength: 32 },
          },
          itemName: {
            type: 'string',
            title: '候选项名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '如：生产主料、配件类', maxLength: 64 },
          },
          sortOrder: {
            type: 'number',
            title: '排序号',
            default: 0,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': { placeholder: '数字越小越靠前', min: 0, precision: 0, style: { width: '100%' } },
          },
          partNumberPrefix: {
            type: 'string',
            title: '物料号前缀',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '用于自动生成物料编号',
            },
            'x-component': 'Input',
            'x-component-props': { placeholder: '可选', maxLength: 32 },
          },
          allowedParentCodes: {
            type: 'array',
            title: '允许的父项',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '空表示允许所有父项；选择后仅允许与选中的父项组合',
              gridSpan: 2,
            },
            'x-component': 'Select',
            'x-component-props': {
              mode: 'multiple',
              placeholder: '空表示允许所有父项',
              options: parentItemOptions,
              allowClear: true,
            },
          },
          isCodeParticipant: {
            type: 'boolean',
            title: '参与编码',
            default: true,
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '是否参与物料编码生成时的编码拼接',
            },
            'x-component': 'Switch',
          },
          codeSeparator: {
            type: 'string',
            title: '编码分隔符',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '为空时继承模板的默认分隔符',
            },
            'x-component': 'Input',
            'x-component-props': { placeholder: '如: -, _, .', maxLength: 4, style: { width: 120 } },
          },
          isActive: {
            type: 'boolean',
            title: '是否启用',
            default: true,
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
          versionNumberStyle: {
            type: 'number',
            title: '版本号样式',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择',
              options: versionNumberStyleOptions,
              allowClear: true,
            },
          },
          allowCustomVersionNumber: {
            type: 'boolean',
            title: '允许自定义版本',
            default: false,
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '是否允许用户自定义版本号',
            },
            'x-component': 'Switch',
          },
          memo: {
            type: 'string',
            title: '备注',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component': 'Input.TextArea',
            'x-component-props': { rows: 2, placeholder: '可选', maxLength: 256 },
          },
        },
      },
    },
  },
});
