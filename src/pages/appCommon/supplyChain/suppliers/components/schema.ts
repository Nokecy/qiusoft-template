import { ISchema } from '@formily/react';

export const formId: string = "Common.Suppliers";

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
            "title": "供应商编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入供应商编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "供应商名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入供应商名称"
            },
            "required": true
          },
          "abbName": {
            "type": "string",
            "title": "供应商简称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入供应商简称"
            },
            "required": true
          },
          "address": {
            "type": "string",
            "title": "地址",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入地址",
              "rows": 2
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          },
          "tel": {
            "type": "string",
            "title": "联系电话",
            "x-decorator": "FormItem",
            "x-component": "Input", 
            "x-component-props": {
              "placeholder": "请输入联系电话"
            }
          },
          "vendorCode": {
            "type": "string",
            "title": "供应商代码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入供应商代码"
            }
          },
          "memo": {
            "type": "string",
            "title": "备注",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入备注",
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
}