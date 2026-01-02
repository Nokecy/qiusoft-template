/**
 * 宿主实体配置 - 扩展字段表单Schema定义
 * 布局与应用配置保持一致
 */
import { ISchema } from '@formily/react';
import { fieldDataTypeEnum, indexTypeEnum, FieldDataType } from '../../../_enums';

export const formId: string = 'ExtensionField';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 18,
    feedbackLayout: 'none',
    labelWidth: '80px',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          strictAutoFit: true,
        },
        properties: {
          // 第一行：字段名称、显示名称
          name: {
            type: 'string',
            title: '字段名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '如: orderNo, productName',
            },
            'x-validator': [
              { required: true, message: '请输入字段名称' },
              {
                pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                message: '只能包含字母、数字和下划线，且以字母开头',
              },
            ],
          },
          displayName: {
            type: 'string',
            title: '显示名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '如: 订单编号, 产品名称',
            },
          },
          // 第二行：数据类型、索引类型
          dataType: {
            type: 'number',
            title: '数据类型',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: fieldDataTypeEnum.map((item) => ({
              label: item.label,
              value: item.value,
            })),
            'x-component-props': {
              placeholder: '请选择数据类型',
            },
          },
          indexType: {
            type: 'number',
            title: '索引类型',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: indexTypeEnum.map((item) => ({
              label: item.label,
              value: item.value,
            })),
            'x-component-props': {
              placeholder: '请选择索引类型',
              allowClear: true,
            },
          },
          // 第三行（条件显示）：最大长度（字符串类型显示）
          maxLength: {
            type: 'number',
            title: '最大长度',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '字符串最大长度',
              min: 1,
              max: 4000,
              style: { width: '100%' },
            },
            'x-reactions': {
              dependencies: ['dataType'],
              fulfill: {
                state: {
                  visible: `{{$deps[0] === ${FieldDataType.String}}}`,
                },
              },
            },
          },
          // 占位（字符串类型时与maxLength同行）
          _placeholder1: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'FormItem',
            'x-reactions': {
              dependencies: ['dataType'],
              fulfill: {
                state: {
                  visible: `{{$deps[0] === ${FieldDataType.String}}}`,
                },
              },
            },
          },
          // 第三行（条件显示）：精度、小数位数（Decimal类型显示）
          precision: {
            type: 'number',
            title: '精度',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '总位数',
              min: 1,
              max: 38,
              style: { width: '100%' },
            },
            'x-reactions': {
              dependencies: ['dataType'],
              fulfill: {
                state: {
                  visible: `{{$deps[0] === ${FieldDataType.Decimal}}}`,
                },
              },
            },
          },
          scale: {
            type: 'number',
            title: '小数位数',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '小数位数',
              min: 0,
              max: 10,
              style: { width: '100%' },
            },
            'x-reactions': {
              dependencies: ['dataType'],
              fulfill: {
                state: {
                  visible: `{{$deps[0] === ${FieldDataType.Decimal}}}`,
                },
              },
            },
          },
          // 第四行：默认值、排序
          defaultValue: {
            type: 'string',
            title: '默认值',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '字段默认值',
            },
          },
          sortOrder: {
            type: 'number',
            title: '排序',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '排序顺序',
              min: 0,
              style: { width: '100%' },
            },
            default: 0,
          },
          // 第五行：是否必填（独占一行，使用span控制）
          isRequired: {
            type: 'boolean',
            title: '是否必填',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: false,
          },
          // 占位
          _placeholder2: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'FormItem',
          },
          // 第六行：字段描述（跨两列）
          description: {
            type: 'string',
            title: '字段描述',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component': 'Input.TextArea',
            'x-component-props': {
              placeholder: '字段描述信息',
              rows: 2,
            },
          },
        },
      },
    },
  },
};
