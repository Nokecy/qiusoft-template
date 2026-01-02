import { ISchema } from '@formily/react';

export const formId: string = "SmartErp.DeliveryMen";

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
          "maxColumns": 3,
          "strictAutoFit": true
        },
        "properties": {
          "workNo": {
            "type": "string",
            "title": "工号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入工号",
              "maxLength": 50
            },
            "required": true
          },
          "code": {
            "type": "string",
            "title": "编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入编码",
              "maxLength": 50
            },
            "required": true
          },
          "name": {
            "type": "string",
            "title": "姓名",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入姓名",
              "maxLength": 50
            },
            "required": true
          },
          "showName": {
            "type": "string",
            "title": "显示姓名",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入显示姓名",
              "maxLength": 50
            },
            "required": true
          },
          "title": {
            "type": "string",
            "title": "职位",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入职位",
              "maxLength": 50
            }
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
              { "label": "男", "value": "1" },
              { "label": "女", "value": "0" }
            ]
          },
          "departCode": {
            "type": "string",
            "title": "部门编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入部门编码",
              "maxLength": 50
            }
          },
          "group": {
            "type": "string",
            "title": "分组",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入分组",
              "maxLength": 50
            }
          },
          "mobile": {
            "type": "string",
            "title": "手机号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": "phone",
            "x-component-props": {
              "placeholder": "请输入手机号",
              "maxLength": 20
            }
          },
          "idCard": {
            "type": "string",
            "title": "身份证号码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": "idcard",
            "x-component-props": {
              "placeholder": "请输入身份证号码",
              "maxLength": 20
            }
          },
          "email": {
            "type": "string",
            "title": "邮箱",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": "email",
            "x-component-props": {
              "placeholder": "请输入邮箱",
              "maxLength": 100
            }
          },
          "tel": {
            "type": "string",
            "title": "电话",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入电话",
              "maxLength": 50
            }
          },
          "fax": {
            "type": "string",
            "title": "传真",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入传真",
              "maxLength": 50
            }
          },
          "address": {
            "type": "string",
            "title": "联系地址",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入联系地址",
              "maxLength": 200
            }
          },
          "orgCode": {
            "type": "string",
            "title": "组织",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入组织",
              "maxLength": 50
            }
          },
          "memo": {
            "type": "string",
            "title": "备注",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入备注",
              "maxLength": 500,
              "rows": 3
            },
            "x-decorator-props": {
              "gridSpan": 3
            }
          }
        }
      }
    }
  }
};