/**
 * 动态表单生成工具
 * 根据实体字段定义生成 Formily Schema
 */

// 字段数据类型枚举（与后端 FieldDataType 对应）
export enum FieldDataType {
  String = 0,
  Int = 1,
  Long = 2,
  Decimal = 3,
  Boolean = 4,
  DateTime = 5,
  Guid = 6,
  Enum = 7,
  Json = 8,
  Text = 9,
  Binary = 10,
  Double = 11,
  Float = 12,
  Byte = 13,
  Short = 14,
  Reference = 15,
}

// 字段类型到 Formily 组件的映射
const fieldTypeToComponent: Record<number, { component: string; props?: any }> = {
  [FieldDataType.String]: { component: 'Input' },
  [FieldDataType.Int]: { component: 'NumberPicker', props: { precision: 0 } },
  [FieldDataType.Long]: { component: 'NumberPicker', props: { precision: 0 } },
  [FieldDataType.Decimal]: { component: 'NumberPicker', props: { precision: 2 } },
  [FieldDataType.Boolean]: { component: 'Switch' },
  [FieldDataType.DateTime]: { component: 'DatePicker', props: { showTime: true } },
  [FieldDataType.Guid]: { component: 'Input' },
  [FieldDataType.Enum]: { component: 'Select' },
  [FieldDataType.Json]: { component: 'Input.TextArea', props: { rows: 4 } },
  [FieldDataType.Text]: { component: 'Input.TextArea', props: { rows: 4 } },
  [FieldDataType.Binary]: { component: 'Input' },
  [FieldDataType.Double]: { component: 'NumberPicker', props: { precision: 4 } },
  [FieldDataType.Float]: { component: 'NumberPicker', props: { precision: 4 } },
  [FieldDataType.Byte]: { component: 'NumberPicker', props: { precision: 0, min: 0, max: 255 } },
  [FieldDataType.Short]: { component: 'NumberPicker', props: { precision: 0 } },
  [FieldDataType.Reference]: { component: 'Input' },
};

// 字段类型到 Formily type 的映射
const fieldTypeToFormilyType: Record<number, string> = {
  [FieldDataType.String]: 'string',
  [FieldDataType.Int]: 'number',
  [FieldDataType.Long]: 'number',
  [FieldDataType.Decimal]: 'number',
  [FieldDataType.Boolean]: 'boolean',
  [FieldDataType.DateTime]: 'string',
  [FieldDataType.Guid]: 'string',
  [FieldDataType.Enum]: 'number',
  [FieldDataType.Json]: 'string',
  [FieldDataType.Text]: 'string',
  [FieldDataType.Binary]: 'string',
  [FieldDataType.Double]: 'number',
  [FieldDataType.Float]: 'number',
  [FieldDataType.Byte]: 'number',
  [FieldDataType.Short]: 'number',
  [FieldDataType.Reference]: 'string',
};

interface FieldDefinition {
  name: string;
  displayName?: string;
  dataType: number;
  isRequired?: boolean;
  isVisible?: boolean;
  displayOrder?: number;
  defaultValue?: any;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  enumOptions?: Array<{ label: string; value: any }>;
}

/**
 * 根据实体字段生成 Formily Schema
 * @param fields 字段定义数组
 * @returns Formily Schema 对象
 */
export function generateFormilySchema(fields: FieldDefinition[]) {
  if (!fields || fields.length === 0) {
    return {
      type: 'object',
      properties: {},
    };
  }

  // 按 displayOrder 排序
  const sortedFields = [...fields].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
  );

  const properties: Record<string, any> = {};

  sortedFields.forEach((field) => {
    // 跳过不可见字段
    if (field.isVisible === false) return;

    const typeConfig = fieldTypeToComponent[field.dataType] || { component: 'Input' };
    const formilyType = fieldTypeToFormilyType[field.dataType] || 'string';

    const fieldSchema: any = {
      type: formilyType,
      title: field.displayName || field.name,
      'x-decorator': 'FormItem',
      'x-component': typeConfig.component,
    };

    // 添加组件属性
    if (typeConfig.props) {
      fieldSchema['x-component-props'] = { ...typeConfig.props };
    }

    // 必填验证
    if (field.isRequired) {
      fieldSchema.required = true;
    }

    // 字符串最大长度
    if (field.maxLength && field.dataType === FieldDataType.String) {
      fieldSchema['x-component-props'] = {
        ...fieldSchema['x-component-props'],
        maxLength: field.maxLength,
      };
    }

    // 数值范围
    if (field.minValue !== undefined || field.maxValue !== undefined) {
      fieldSchema['x-component-props'] = {
        ...fieldSchema['x-component-props'],
        min: field.minValue,
        max: field.maxValue,
      };
    }

    // 枚举选项
    if (field.dataType === FieldDataType.Enum && field.enumOptions) {
      fieldSchema.enum = field.enumOptions;
    }

    // 默认值
    if (field.defaultValue !== undefined) {
      fieldSchema.default = field.defaultValue;
    }

    properties[field.name] = fieldSchema;
  });

  return {
    type: 'object',
    properties: {
      formLayout: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          strictAutoFit: true,
        },
        properties,
      },
    },
  };
}

/**
 * 生成表单配置
 */
export function generateFormConfig() {
  return {
    labelCol: 6,
    wrapperCol: 18,
    feedbackLayout: 'none',
  };
}
