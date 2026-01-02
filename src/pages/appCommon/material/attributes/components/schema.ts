import { ISchema } from '@formily/react';

export const formId: string = "Common.Attributes";

// 数据类型枚举
const dataTypeEnum = [
  { label: "文本", value: 0 },
  { label: "数字", value: 1 },
  { label: "日期", value: 2 },
  { label: "布尔", value: 3 },
  { label: "枚举", value: 4 }
];

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
          "name": {
            "type": "string",
            "title": "特性名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入特性名称"
            },
            "required": true
          },
          "displayName": {
            "type": "string", 
            "title": "显示名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入显示名称"
            },
            "required": true
          },
          "dataType": {
            "type": "number",
            "title": "数据类型",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择数据类型"
            },
            "enum": dataTypeEnum,
            "required": true
          },
          "unit": {
            "type": "string",
            "title": "单位",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入单位"
            }
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
          "defaultValue": {
            "type": "string",
            "title": "默认值",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入默认值"
            }
          },
          "isRequired": {
            "type": "boolean",
            "title": "是否必填",
            "x-decorator": "FormItem",
            "x-component": "Switch",
            "x-component-props": {
              "checkedChildren": "是",
              "unCheckedChildren": "否"
            }
          },
          "isEnabled": {
            "type": "boolean",
            "title": "是否启用",
            "x-decorator": "FormItem",
            "x-component": "Switch",
            "x-component-props": {
              "checkedChildren": "启用",
              "unCheckedChildren": "禁用"
            },
            "default": true
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