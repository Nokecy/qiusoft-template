import { ISchema } from '@formily/react'

export const formId: string = "appSmartPark.appWMSInStore.countDiffReason";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "100px",
    "feedbackLayout": "terse",
    "wrapperWidth": "auto"
  },
  "schema": {
    "type": "object",
    "properties": {
      "y0j5i6j8jfx": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "y0j5i6j8jfx",
        "x-index": 0,
        "properties": {
          "negkgi9n8uw": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "negkgi9n8uw",
            "x-index": 0,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "reason": {
                "type": "string",
                "title": "盘点差异原因",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "reason",
                "required": true,
                "x-designable-id": "l46nos03c3z",
                "x-index": 0
              }
            }
          },
          "nbnt2hwvs8p": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "nbnt2hwvs8p",
            "x-index": 1,
            "properties": {
              "remark": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "remark",
                "x-designable-id": "2kmi45ia58k",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "3keidi2vpra"
  }
}