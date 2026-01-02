import { ISchema } from '@formily/react';

export const formId: string = "Common.AttributeGroups";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 18,
    "labelWidth": "120px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "grid": {
        "type": "void",
        "x-component": "FormGrid",
        "x-component-props": {
          "maxColumns": 2,
          "strictAutoFit": true
        },
        "properties": {
          "code": {
            "type": "string",
            "title": "特性组编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入特性组编码"
            },
            "required": true
          },
          "displayName": {
            "type": "string", 
            "title": "特性组名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入特性组名称"
            },
            "required": true
          },
          "description": {
            "type": "string",
            "title": "描述",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入描述",
              "rows": 4
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          },
          "sortOrder": {
            "type": "number",
            "title": "排序顺序",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入排序顺序",
              "min": 0,
              "precision": 0
            },
            "x-decorator-props": {
              "gridSpan": 1
            }
          }
        }
      }
    }
  }
}