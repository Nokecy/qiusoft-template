import { ISchema } from '@formily/react'

export const formId: string = "appSettlement.BaseInfo.RecommendStrategy.item";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "110px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "mxm11maaduw": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "mxm11maaduw",
        "x-index": 0,
        "properties": {
          "x7l3d64rzmj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "x7l3d64rzmj",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "materialCodePrefix": {
                "type": "string",
                "title": "物料前缀",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入物料前缀"
                },
                "x-decorator-props": {},
                "name": "materialCodePrefix",
                "x-designable-id": "kcfxsiymxjj",
                "x-index": 0,
                "required": true
              }
            }
          }
        }
      }
    },
    "x-designable-id": "ud6ej57mzq1"
  }
}