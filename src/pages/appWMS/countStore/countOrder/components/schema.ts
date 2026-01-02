import { ISchema } from '@formily/react'

export const formId: string = "appWMS.appWMSInStore.countOrder";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "121px",
    "feedbackLayout": "none"
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
              "wareHouseId": {
                "type": "string",
                "title": "库房选择",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {
                  "labelInValue": false
                },
                "x-decorator-props": {},
                "x-designable-id": "yf6lguglitk",
                "x-index": 0,
                "name": "wareHouseId",
                "required": true
              }
            }
          },
          "soytpf6limo": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "soytpf6limo",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "remark": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入备注"
                },
                "x-decorator-props": {},
                "name": "remark",
                "x-designable-id": "eu60ljjjbjd",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "571nyuy1net"
  }
}