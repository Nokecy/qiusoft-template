import { ISchema } from '@formily/react'

export const formId: string = "Wms.WareHouse";

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
      "ke8q70579ng": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "enum": [
          {
            "children": [],
            "label": "良品库",
            "value": 5
          },
          {
            "children": [],
            "label": "不良品库",
            "value": 10
          },
          {
            "children": [],
            "label": "黑名单库",
            "value": 15
          }
        ],
        "x-designable-id": "ke8q70579ng",
        "x-index": 0,
        "properties": {
          "zjhisv1yabe": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "zjhisv1yabe",
            "x-index": 0,
            "properties": {
              "code": {
                "type": "string",
                "title": "仓库编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入仓库编码"
                },
                "x-decorator-props": {},
                "name": "code",
                "required": true,
                "x-designable-id": "5me259koocs",
                "x-index": 0
              }
            }
          },
          "oigku7g9zi3": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "oigku7g9zi3",
            "x-index": 1,
            "properties": {
              "name": {
                "type": "string",
                "title": "仓库名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入仓库名称"
                },
                "x-decorator-props": {},
                "name": "name",
                "required": true,
                "x-designable-id": "1em3dtjj8m4",
                "x-index": 0
              }
            }
          },
          // "eb03a529dvg": {
          //   "type": "void",
          //   "x-component": "FormGrid.GridColumn",
          //   "x-designable-id": "eb03a529dvg",
          //   "x-index": 2,
          //   "properties": {
          //     "{value:factoryZoneId,label:factoryZoneName}": {
          //       "type": "string",
          //       "title": "厂区",
          //       "x-decorator": "FormItem",
          //       "x-component": "FactoryZoneSelect",
          //       "x-validator": [],
          //       "x-component-props": {},
          //       "x-decorator-props": {},
          //       "name": "{value:factoryZoneId,label:factoryZoneName}",
          //       "required": true,
          //       "x-designable-id": "3jdqpax2c8r",
          //       "x-index": 0
          //     }
          //   }
          // },
          "xd4dhl969n2": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xd4dhl969n2",
            "x-index": 3,
            "properties": {
              "wareHouseType": {
                "title": "仓库类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择仓库类型"
                },
                "x-decorator-props": {},
                "name": "wareHouseType",
                "enum": [
                  {
                    "children": [],
                    "label": "自有库",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "客户库",
                    "value": 10
                  },
                  {
                    "children": [],
                    "label": "WMI库",
                    "value": 15
                  }
                ],
                "x-designable-id": "fiiey7sk2to",
                "x-index": 0
              }
            }
          },
          "xvldw2wc900": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xvldw2wc900",
            "x-index": 4,
            "properties": {
              "warehousePropertyType": {
                "title": "属性类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择属性类型"
                },
                "x-decorator-props": {},
                "name": "warehousePropertyType",
                "x-designable-id": "p1mkuwwus76",
                "x-index": 0,
                "enum": [
                  {
                    "children": [],
                    "label": "良品库",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "不良品库",
                    "value": 10
                  },
                  {
                    "children": [],
                    "label": "黑名单库",
                    "value": 15
                  }
                ]
              }
            }
          },
          "7mtsv3h52un": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "7mtsv3h52un",
            "x-index": 5,
            "properties": {
              "contact": {
                "type": "string",
                "title": "联系人",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入联系人"
                },
                "x-decorator-props": {},
                "name": "contact",
                "x-designable-id": "r5bgbj4dcjm",
                "x-index": 0
              }
            }
          },
          "9psiwa4ekwi": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "9psiwa4ekwi",
            "x-index": 6,
            "properties": {
              "tel": {
                "type": "string",
                "title": "电话",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入电话"
                },
                "x-decorator-props": {},
                "name": "tel",
                "x-designable-id": "z80j7uhurkx",
                "x-index": 0
              }
            }
          },
          "tw67fyf9oqc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "tw67fyf9oqc",
            "x-index": 7,
            "x-validator": [],
            "x-component-props": {}
          },
          "0el7qhyq4y1": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "0el7qhyq4y1",
            "x-index": 8
          },
          "3x01vqaokew": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "3x01vqaokew",
            "x-index": 9,
            "properties": {
              "needRealRightCode": {
                "type": "boolean",
                "title": "需要物权",
                "x-decorator": "FormItem",
                "x-component": "Checkbox",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "needRealRightCode",
                "x-designable-id": "aqify0vem1t",
                "x-index": 0
              }
            }
          },
          "ac0yfo71sf0": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "ac0yfo71sf0",
            "x-index": 10,
            "properties": {
              "address": {
                "type": "string",
                "title": "地址",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入地址"
                },
                "x-decorator-props": {},
                "name": "address",
                "x-designable-id": "v6y2uw5klb4",
                "x-index": 0
              }
            }
          },
          "mjath4gi46o": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "mjath4gi46o",
            "x-index": 11,
            "properties": {
              "memo": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入备注"
                },
                "x-decorator-props": {},
                "name": "memo",
                "x-designable-id": "3b7w4tok1hc",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "ma9227e61f7"
  }
}