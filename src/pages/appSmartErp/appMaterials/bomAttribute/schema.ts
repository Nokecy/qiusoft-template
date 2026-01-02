import { ISchema } from '@formily/react'

export const formId: string = "bomAttribute";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

// 基础表单Schema（只保留物料选择字段）
export const baseFormSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none",
    "labelWidth": "100px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "operationArea": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "操作区"
        },
        "x-index": 0,
        "properties": {
          "formGrid": {
            "type": "void",
            "x-component": "FormGrid",
            "x-component-props": {
              "strictAutoFit": true,
              "maxColumns": 6,
              "minColumns": 1,
              "rowGap": 16,
              "columnGap": 16
            },
            "x-index": 0,
            "properties": {
              // 只保留物料编码选择
              "materialCodeColumn": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-component-props": {
                  "gridSpan": 2
                },
                "x-index": 0,
                "properties": {
                  "{label:materialCode,value:materialCode}": {
                    "type": "string",
                    "title": "物料编码",
                    "x-decorator": "FormItem",
                    "x-component": "MaterialSelect",
                    "x-component-props": {
                      "allowClear": true,
                      "useCode": true,
                      "placeholder": "请选择物料编码"
                    },
                    "required": true,
                    "x-index": 0
                  }
                }
              }
              // 动态特性字段将插入到这里
            }
          }
        }
      }
    }
  }
}

// 动态生成特性字段Schema的函数
export const generateAttributeFields = (attributeSchema: any[]) => {
  if (!attributeSchema || attributeSchema.length === 0) {
    return {};
  }

  const attributeFields: any = {};
  
  attributeSchema.forEach((attribute, index) => {
    const fieldKey = `attribute_${attribute.name}`;
    const columnKey = `${fieldKey}Column`;
    
    // 确定组件类型
    let component = 'Input';
    let componentProps: any = {
      placeholder: `请输入${attribute.displayName}`,
      style: { width: '100%' }
    };

    // 根据特性类型选择组件
    if (attribute.dataType === 1) {
      // 数字类型
      component = 'NumberPicker';
      componentProps = {
        ...componentProps,
        min: attribute.minValue,
        max: attribute.maxValue,
        precision: attribute.precision || 0
      };
    } else if (attribute.attributeValues && attribute.attributeValues.length > 0) {
      // 选择类型
      component = 'Select';
      componentProps = {
        ...componentProps,
        placeholder: `请选择${attribute.displayName}`,
        showSearch: true,
        allowClear: true
      };
    }

    attributeFields[columnKey] = {
      "type": "void",
      "x-component": "FormGrid.GridColumn",
      "x-index": 1 + index, // 从第1个位置开始插入特性字段（物料编码后）
      "properties": {
        [fieldKey]: {
          "type": attribute.dataType === 1 ? "number" : "string",
          "title": attribute.displayName,
          "x-decorator": "FormItem",
          "x-component": component,
          "x-component-props": componentProps,
          "required": attribute.required,
          "x-index": 0,
          ...(component === 'Select' && attribute.attributeValues ? {
            "enum": attribute.attributeValues.map((av: any) => ({
              "label": av.value,
              "value": av.value
            }))
          } : {})
        }
      }
    };
  });

  return attributeFields;
};

// 合并基础Schema和动态特性Schema
export const mergeSchemaWithAttributes = (attributeSchema: any[]) => {
  const mergedSchema = JSON.parse(JSON.stringify(baseFormSchema));
  const attributeFields = generateAttributeFields(attributeSchema);
  
  // 将特性字段合并到formGrid的properties中
  if (mergedSchema.schema.properties.operationArea.properties.formGrid.properties) {
    Object.assign(
      mergedSchema.schema.properties.operationArea.properties.formGrid.properties,
      attributeFields
    );
  }
  
  return mergedSchema;
};