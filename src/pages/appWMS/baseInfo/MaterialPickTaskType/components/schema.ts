import { ISchema } from '@formily/react'

export const formId: string = "Wms.MaterialPickTaskType";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "90px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "jeg7784sse0": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "jeg7784sse0",
        "x-index": 0,
        "properties": {
          "gudjn2rrwk5": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "gudjn2rrwk5",
            "x-index": 0,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "type": {
                "type": "string",
                "title": "类型",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "type",
                "required": true,
                "x-designable-id": "s0rhpujkhy0",
                "x-index": 0
              }
            }
          },
          "xq3q93vwyfj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xq3q93vwyfj",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "name": {
                "type": "string",
                "title": "名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "name",
                "required": true,
                "x-designable-id": "yzm2bxcvrok",
                "x-index": 0
              }
            }
          },
          "6a1061um6zp": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "6a1061um6zp",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "isEnabled": {
                "type": "boolean",
                "title": "是否启用",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isEnabled",
                "x-designable-id": "0vsw8xi9e58",
                "x-index": 0
              }
            }
          },
          "z934rf69sf7": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "z934rf69sf7",
            "x-index": 3,
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
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "remark",
                "x-designable-id": "gw41xflzcgh",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "q975m3mp4n8"
  }
}