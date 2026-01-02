import { ISchema } from '@formily/react'

export const formId: string = "Wms.StoreTransferMap";

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
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:sourceWarehouseId,label:sourceWarehouseName}": {
                "type": "string",
                "title": "原库房",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:sourceWarehouseId,label:sourceWarehouseName}",
                "required": true,
                "x-designable-id": "2yyiv7oxyqk",
                "x-index": 0
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
              "{value:rejectWarehouseId,label:rejectWarehouseName}": {
                "type": "string",
                "title": "调拨不良品库",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {
                  "Filter": "isReject=true"
                },
                "x-decorator-props": {},
                "name": "{value:rejectWarehouseId,label:rejectWarehouseName}",
                "required": true,
                "x-designable-id": "ioa2hqkwcfb",
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
              "{value:goodWarehouseId,label:goodWarehouseName}": {
                "type": "string",
                "title": "调拨良品库",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:goodWarehouseId,label:goodWarehouseName}",
                "required": true,
                "x-designable-id": "wqom0prcwg6",
                "x-index": 0
              }
            }
          },
          "lmtsfk7fq2i": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "lmtsfk7fq2i",
            "x-index": 3,
            "properties": {
              "note": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "note",
                "x-designable-id": "bpyqy9dild8",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "ct9datwat8m"
  }
}