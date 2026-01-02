import { ISchema } from '@formily/react'

export const formId: string = "appSYS.baseInfo.Customer";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "80px",
    "feedbackLayout": "terse"
  },
  "schema": {
    "type": "object",
    "properties": {
      "yfolbivfhry": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "yfolbivfhry",
        "properties": {
          "3hh9rptye1k": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "3hh9rptye1k",
            "properties": {
              "displayName": {
                "type": "string",
                "title": "名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "displayName",
                "x-designable-id": "llye16hpnrg",
                "x-index": 0
              }
            },
            "x-index": 0
          },
          "xohzzeclmnw": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "xohzzeclmnw",
            "properties": {
              "description": {
                "type": "string",
                "title": "描述",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "description",
                "x-designable-id": "o1iqlqne3iz",
                "x-index": 0
              }
            },
            "x-index": 1
          }
        },
        "x-index": 0
      }
    },
    "x-designable-id": "w713pkis5mb"
  }
}