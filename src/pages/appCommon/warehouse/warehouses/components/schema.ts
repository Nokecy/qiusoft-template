import { ISchema } from '@formily/react';

export const formId: string = "Common.Warehouses";

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
            "title": "库房编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入库房编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "库房名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入库房名称"
            },
            "required": true
          },
          "address": {
            "type": "string",
            "title": "库房地址",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入库房地址",
              "rows": 2
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          },
          "contact": {
            "type": "string",
            "title": "库房联系人",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入库房联系人"
            }
          },
          "tel": {
            "type": "string",
            "title": "联系人电话",
            "x-decorator": "FormItem",
            "x-component": "Input", 
            "x-component-props": {
              "placeholder": "请输入联系人电话"
            }
          },
          "memo": {
            "type": "string",
            "title": "备注信息",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入备注信息",
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