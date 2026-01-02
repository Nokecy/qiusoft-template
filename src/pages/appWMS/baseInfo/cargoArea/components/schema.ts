import { ISchema } from '@formily/react'

export const formId: string = "Wms.CargoArea";

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
                  "placeholder": "请输入"
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
              "zoneClass": {
                "title": "类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择"
                },
                "x-decorator-props": {},
                "name": "zoneClass",
                "required": true,
                "enum": [
                  {
                    "children": [],
                    "label": "货台",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "交接区",
                    "value": 10
                  }
                ],
                "x-designable-id": "vre8kbhzd3m",
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
              "useType": {
                "title": "使用属性",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择"
                },
                "x-decorator-props": {},
                "name": "useType",
                "required": true,
                "enum": [
                  {
                    "children": [],
                    "label": "收货",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "发货",
                    "value": 10
                  }
                ],
                "x-designable-id": "q8svraajeeo",
                "x-index": 0
              }
            }
          },
          "xhmakf15zt6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xhmakf15zt6",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:factoryZoneId,label:factoryZoneName}": {
                "type": "string",
                "title": "厂区",
                "x-decorator": "FormItem",
                "x-component": "FactoryZoneSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:factoryZoneId,label:factoryZoneName}",
                "x-designable-id": "ymdkqtelz39",
                "x-index": 0,
                "required": true
              }
            }
          },
          "omv141y9poc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "omv141y9poc",
            "x-index": 4,
            "properties": {
              "address": {
                "type": "string",
                "title": "位置",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "address",
                "x-designable-id": "ubunby1ugck",
                "x-index": 0,
                "required": true
              }
            }
          },
          "nv734rlxcqt": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "nv734rlxcqt",
            "x-index": 5,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:warehouseTeamId,label:warehouseTeamName}": {
                "type": "string",
                "title": "仓库班组",
                "x-decorator": "FormItem",
                "x-component": "WareHouseTeamSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:warehouseTeamId,label:warehouseTeamName}",
                "x-designable-id": "zletinv7pez",
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
            "x-index": 6,
            "properties": {
              "memo": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "memo",
                "x-designable-id": "gp39m2f3mpp",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "o73flwi64kg"
  }
}