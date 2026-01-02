/**
 * 分类属性相关的公共工具函数
 */

// 根据数据类型生成字段组件配置
export const getFieldComponent = (dataType: number) => {
  switch (dataType) {
    case 1: // String
      return { component: 'Input', props: {} };
    case 3: // Integer
      return { component: 'NumberPicker', props: { precision: 0 } };
    case 4: // Decimal
      return { component: 'NumberPicker', props: { precision: 2 } };
    case 5: // Boolean
      return { component: 'Switch', props: {} };
    case 6: // DateTime
      return { component: 'DatePicker', props: { showTime: true } };
    case 8: // Single Select
      return { component: 'Select', props: {} };
    case 9: // Multiple Select
      return { component: 'Select', props: { mode: 'multiple' } };
    default:
      return { component: 'Input', props: {} };
  }
};

// 获取字段类型
export const getFieldType = (dataType: number): string => {
  if (dataType === 3 || dataType === 4) return 'number';
  if (dataType === 5) return 'boolean';
  return 'string';
};

// 构造动态分类属性字段
export const buildAttributeFields = (
  categoryAttributes: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]
) => {
  if (!categoryAttributes || categoryAttributes.length === 0) {
    return {};
  }

  const fields: any = {};
  categoryAttributes.forEach((attr, index) => {
    const fieldConfig = getFieldComponent(attr.dataType || 1);
    
    // 处理组件属性
    let componentProps: any = {
      placeholder: attr.helpText || `请输入${attr.displayName || attr.attributeCode}`,
      ...fieldConfig.props,
    };
    
    // 处理选项(单选/多选)
    if (attr.dataType === 8 || attr.dataType === 9) {
      try {
        const options = attr.optionsJson ? JSON.parse(attr.optionsJson) : [];
        componentProps.options = options;
      } catch (e) {
        console.error('解析选项失败:', e);
        componentProps.options = [];
      }
    }
    
    fields[`attr_col_${index}`] = {
      type: 'void',
      'x-component': 'FormGrid.GridColumn',
      'x-component-props': { gridSpan: 1 },
      properties: {
        [`attr_${attr.attributeCode}`]: {
          type: getFieldType(attr.dataType || 1),
          title: attr.displayName || attr.attributeCode,
          required: attr.isRequired,
          'x-decorator': 'FormItem',
          'x-component': fieldConfig.component,
          'x-component-props': componentProps,
        },
      },
    };
  });
  
  return fields;
};

// 从表单值中提取属性值
export const extractAttributeValues = (formValues: any): any => {
  const attributeValues: any = {};
  Object.keys(formValues).forEach(key => {
    if (key.startsWith('attr_')) {
      attributeValues[key] = formValues[key];
    }
  });
  return attributeValues;
};

// 序列化属性值为 JSON
export const serializeAttributeValues = (formValues: any): string | null => {
  const attributeValues = extractAttributeValues(formValues);
  return Object.keys(attributeValues).length > 0 ? JSON.stringify(attributeValues) : null;
};

// 从 attributesJson 字符串解析属性值
export const parseAttributeValues = (attributesJson: string | null | undefined): any => {
  if (!attributesJson) return {};
  
  try {
    return JSON.parse(attributesJson);
  } catch (e) {
    console.error('解析属性值失败:', e);
    return {};
  }
};
