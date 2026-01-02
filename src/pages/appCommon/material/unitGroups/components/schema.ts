import { ISchema } from '@formily/react';

export const formId: string = "Common.UnitGroups";

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
            "title": "单位组编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入单位组编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "单位组名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入单位组名称"
            },
            "required": true
          },
          "unitType": {
            "type": "number",
            "title": "单位类型",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择单位类型"
            },
            "enum": [
              { "label": "基本单位", "value": 0 },
              { "label": "重量单位", "value": 1 },
              { "label": "体积单位", "value": 2 }
            ],
            "required": true
          }
        }
      }
    }
  }
}