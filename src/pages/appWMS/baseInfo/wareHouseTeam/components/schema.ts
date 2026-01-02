import { ISchema } from '@formily/react'

export const formId: string = "Wms.WarehouseTeam";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "80px",
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
          "maxColumns": 3
        },
        "x-designable-id": "y0j5i6j8jfx",
        "x-index": 0,
        "properties": {
          "negkgi9n8uw": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "negkgi9n8uw",
            "x-index": 0,
            "properties": {
              "code": {
                "type": "string",
                "title": "编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入编码"
                },
                "x-decorator-props": {},
                "name": "code",
                "required": true,
                "x-designable-id": "vs0d7ueknwc",
                "x-index": 0
              }
            }
          },
          "soytpf6limo": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "soytpf6limo",
            "x-index": 1,
            "properties": {
              "name": {
                "type": "string",
                "title": "名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入名称"
                },
                "x-decorator-props": {},
                "name": "name",
                "required": true,
                "x-designable-id": "rgmk6l4chs4",
                "x-index": 0
              }
            }
          },
          "7aoic968rdu": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "7aoic968rdu",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:leaderId,label:leaderName}": {
                "type": "string",
                "title": "库管员",
                "x-decorator": "FormItem",
                "x-component": "WarehouseManSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:leaderId,label:leaderName}",
                "required": false,
                "x-designable-id": "9oezajuuym4",
                "x-index": 0
              }
            }
          },
          "p1l405w8ybl": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "p1l405w8ybl",
            "x-index": 3,
            "properties": {
              "remark": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "remark",
                "x-designable-id": "vvugg7ghari",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "5an93o4pgg4"
  }
}