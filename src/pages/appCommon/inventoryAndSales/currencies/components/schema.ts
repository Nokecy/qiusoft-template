import { ISchema } from '@formily/react';

export const formId: string = "Common.Currencies";

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
            "title": "货币代码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入货币代码，如：CNY、USD",
              "maxLength": 10
            },
            "required": true
          },
          "name": {
            "type": "string",
            "title": "货币名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入货币名称",
              "maxLength": 50
            },
            "required": true
          },
          "nameEN": {
            "type": "string",
            "title": "英文名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入英文名称",
              "maxLength": 100
            }
          },
          "rate": {
            "type": "number",
            "title": "汇率",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入汇率",
              "min": 0,
              "precision": 6,
              "step": 0.000001
            }
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