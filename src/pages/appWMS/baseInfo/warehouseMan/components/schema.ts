import { ISchema } from '@formily/react'

export const formId: string = "Wms.WarehouseMan";

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
          "soytpf6limo": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "soytpf6limo",
            "x-index": 0,
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
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "phoneTel": {
                "type": "string",
                "title": "电话",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "phoneTel",
                "required": false,
                "x-designable-id": "k14w15md6w6",
                "x-index": 0
              }
            }
          },
          "xhmakf15zt6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xhmakf15zt6",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {}
          },
          "omv141y9poc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "omv141y9poc",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:warehouseTeamId,label:warehouseTeamName}": {
                "type": "string",
                "title": "所属班组",
                "x-decorator": "FormItem",
                "x-component": "WareHouseTeamSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "required": true,
                "name": "{value:warehouseTeamId,label:warehouseTeamName}",
                "x-designable-id": "rh8gqgmskfp",
                "x-index": 0
              }
            }
          },
          "nv734rlxcqt": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "nv734rlxcqt",
            "x-index": 4,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:userId,label:userName}": {
                "type": "string",
                "title": "登录账户",
                "x-decorator": "FormItem",
                "x-component": "XUserSelect",
                "x-validator": [],
                "x-component-props": {
                  "showId": true
                },
                "x-decorator-props": {},
                "x-designable-id": "ygglomos17m",
                "x-index": 0,
                "required": true,
                "name": "{value:userId,label:userName}"
              }
            }
          },
          "2ebd6aig97y": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2ebd6aig97y",
            "x-index": 5,
            "x-validator": [],
            "x-component-props": {}
          },
          "p1l405w8ybl": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "p1l405w8ybl",
            "x-index": 6,
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
                "x-designable-id": "nwrw60ju6s8",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "093qazfh6xf"
  }
}