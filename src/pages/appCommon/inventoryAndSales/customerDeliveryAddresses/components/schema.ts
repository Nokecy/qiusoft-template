import { ISchema } from '@formily/react';
import { CustomerSelect } from '@/pages/appCommon/_utils';

export const formId: string = "SmartErp.CustomerDeliveryAddresses";

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
            "title": "编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入编码",
              "maxLength": 20
            },
            "required": true
          },
          "{value:customerId,label:customerName}": {
            "type": "number",
            "title": "客户",
            "x-decorator": "FormItem",
            "x-component": "CustomerSelect",
            "x-component-props": {
              "placeholder": "请选择客户",
              "labelInValue": true
            },
            "required": true
          },
          "address": {
            "type": "string",
            "title": "送货地址",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入送货地址",
              "maxLength": 300,
              "rows": 3
            },
            "x-decorator-props": {
              "gridSpan": 2
            },
            "required": true
          },
          "contactPerson": {
            "type": "string",
            "title": "联系人",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入联系人",
              "maxLength": 50
            }
          },
          "contactPhone": {
            "type": "string",
            "title": "联系电话",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入联系电话",
              "maxLength": 20
            }
          },
          "freightDays": {
            "type": "number",
            "title": "运费天数",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入运费天数",
              "min": 0,
              "precision": 0
            }
          },
          "isDefault": {
            "type": "boolean",
            "title": "设为默认地址",
            "x-decorator": "FormItem",
            "x-component": "Switch",
            "x-component-props": {
              "checkedChildren": "是",
              "unCheckedChildren": "否"
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
              "gridSpan": 2
            }
          }
        }
      }
    }
  }
};

export { CustomerSelect };