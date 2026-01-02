import { ISchema } from '@formily/react';

export const formId: string = "SmartErp.CustomerCreditRatings";

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
          "type": {
            "type": "string",
            "title": "参数类别",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择参数类别"
            },
            "enum": [
              { "label": "信誉额度控制", "value": "10" },
              { "label": "老王没给", "value": "20" },
              { "label": "预期天数控制", "value": "30" }
            ],
            "required": true
          },
          "rating": {
            "type": "number",
            "title": "超额百分比",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入超额百分比",
              "min": 0,
              "max": 100,
              "precision": 2
            },
            "required": true
          },
          "controlType": {
            "type": "string",
            "title": "处理方式",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择处理方式"
            },
            "enum": [
              { "label": "预警", "value": "10" },
              { "label": "严重预警", "value": "20" },
              { "label": "采取措施", "value": "30" },
              { "label": "停止做单送货", "value": "40" }
            ],
            "required": true
          },
          "prompt": {
            "type": "string",
            "title": "提示信息",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入提示信息",
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