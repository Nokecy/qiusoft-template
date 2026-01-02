import { ISchema } from '@formily/react';

export const formId: string = "Common.WorkShops";

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
            "title": "车间编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入车间编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "车间名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入车间名称"
            },
            "required": true
          },
          "warehouseCode": {
            "type": "string",
            "title": "入库库房",
            "x-decorator": "FormItem",
            "x-component": "WarehouseSelect",
            "x-component-props": {
              "placeholder": "请选择入库库房",
              "useCode": true,
              "labelInValue": false
            }
          },
          "isOut": {
            "type": "boolean",
            "title": "是否为外协车间",
            "x-decorator": "FormItem",
            "x-component": "Switch",
            "x-component-props": {
              "checkedChildren": "是",
              "unCheckedChildren": "否"
            }
          },
          "workType": {
            "type": "string",
            "title": "车间类型",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择车间类型",
              "allowClear": true
            },
            "enum": [
              { "label": "我司车间", "value": "10" },
              { "label": "辅助部分", "value": "20" },
              { "label": "外协车间", "value": "30" }
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