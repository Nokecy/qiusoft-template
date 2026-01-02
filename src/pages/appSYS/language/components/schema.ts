import { ISchema } from '@formily/react'

export const formId: string = "language";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "terse",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "100px",
    "feedbackLayout": "terse"
  },
  "schema": {
    "type": "object",
    "properties": {
      "grid": {
        "type": "void",
        "x-component": "FormGrid",
        "x-component-props": {
          "maxColumns": [1, 2, 3],
          "strictAutoFit": true
        },
        "properties": {
          "cultureName": {
            "type": "string",
            "title": "文化名称",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择文化名称",
              "showSearch": true,
              "filterOption": true
            },
            "required": true
          },
          "uiCultureName": {
            "type": "string",
            "title": "UI文化名称",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择UI文化名称",
              "showSearch": true,
              "filterOption": true
            },
            "required": true
          },
          "displayName": {
            "type": "string",
            "title": "显示名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "例如: 简体中文, English"
            }
          },
          "flagIcon": {
            "type": "string",
            "title": "国旗图标",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "图标代码或URL"
            }
          },
          "isEnabled": {
            "type": "boolean",
            "title": "是否启用",
            "x-decorator": "FormItem",
            "x-component": "Switch",
            "default": true
          }
        }
      }
    }
  }
}