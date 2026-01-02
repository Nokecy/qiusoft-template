import { ISchema } from '@formily/react';

export const formId: string = "Common.CustomerContacts";

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
            "title": "联系人编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入联系人编码"
            },
            "required": true
          },
          "customerId": {
            "type": "number",
            "title": "客户ID",
            "x-decorator": "FormItem",
            "x-component": "InputNumber",
            "x-component-props": {
              "placeholder": "请输入客户ID"
            }
          },
          "customerCode": {
            "type": "string",
            "title": "客户编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入客户编码"
            }
          },
          "dtId": {
            "type": "string",
            "title": "DT编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入DT编码"
            }
          },
          "contactName": {
            "type": "string", 
            "title": "联系人姓名",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入联系人姓名"
            },
            "required": true
          },
          "sex": {
            "type": "string",
            "title": "性别",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择性别"
            },
            "enum": [
              { "label": "男", "value": "Male" },
              { "label": "女", "value": "Female" }
            ]
          },
          "birthday": {
            "type": "string",
            "title": "生日",
            "x-decorator": "FormItem",
            "x-component": "DatePicker",
            "x-component-props": {
              "placeholder": "请选择生日"
            }
          },
          "blood": {
            "type": "string",
            "title": "血型",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择血型"
            },
            "enum": [
              { "label": "A型", "value": "A" },
              { "label": "B型", "value": "B" },
              { "label": "AB型", "value": "AB" },
              { "label": "O型", "value": "O" }
            ]
          },
          "tel": {
            "type": "string",
            "title": "电话",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入电话"
            }
          },
          "fax": {
            "type": "string",
            "title": "传真",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入传真"
            }
          },
          "mobile": {
            "type": "string",
            "title": "手机",
            "x-decorator": "FormItem",
            "x-component": "Input", 
            "x-component-props": {
              "placeholder": "请输入手机"
            }
          },
          "email": {
            "type": "string",
            "title": "邮箱",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入邮箱"
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
              { "label": "激活", "value": "Active" },
              { "label": "禁用", "value": "Inactive" }
            ]
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