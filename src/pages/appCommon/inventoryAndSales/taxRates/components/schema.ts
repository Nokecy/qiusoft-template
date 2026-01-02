import { ISchema } from '@formily/react';

export const formId: string = "Common.TaxRates";

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
            "title": "税率代码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入税率代码",
              "maxLength": 20
            },
            "required": true
          },
          "name": {
            "type": "string",
            "title": "税率名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入税率名称",
              "maxLength": 50
            },
            "required": true
          },
          "rate": {
            "type": "number",
            "title": "税率",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入税率",
              "min": 0,
              "max": 1,
              "precision": 4,
              "step": 0.0001
            },
            "required": true
          },
          "status": {
            "type": "string",
            "title": "状态",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择状态"
            },
            "enum": [
              { "label": "启用", "value": "Active" },
              { "label": "禁用", "value": "Inactive" }
            ],
            "default": "Active"
          },
          "memo": {
            "type": "string",
            "title": "备注",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入备注信息",
              "maxLength": 500,
              "rows": 3
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          }
        }
      }
    }
  }
};