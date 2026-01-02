import { ISchema } from '@formily/react';

export const formId: string = "Common.MaterialComFromInfos";

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
          "comFromCode": {
            "type": "string",
            "title": "来源编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入来源编码"
            },
            "required": true
          },
          "comFromName": {
            "type": "string", 
            "title": "来源名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入来源名称"
            },
            "required": true
          },
          "comeFromTypeCode": {
            "type": "number",
            "title": "来源类型",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择来源类型"
            },
            "enum": [
              { "label": "采购", "value": 1 },
              { "label": "生产", "value": 2 },
              { "label": "虚拟", "value": 3 },
              { "label": "外协", "value": 4 },
              { "label": "计划", "value": 5 },
              { "label": "费用", "value": 6 },
              { "label": "来料", "value": 7 },
              { "label": "模型", "value": 8 },
              { "label": "发货", "value": 9 },
              { "label": "特征", "value": 10 },
              { "label": "选配", "value": 11 },
              { "label": "选一", "value": 12 }
            ],
            "required": true
          },
          "comeFromTypeName": {
            "type": "string",
            "title": "来源类型名称", 
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "自动填充类型名称"
            },
            "x-pattern": "readPretty",
            "required": false
          }
        }
      }
    }
  }
}