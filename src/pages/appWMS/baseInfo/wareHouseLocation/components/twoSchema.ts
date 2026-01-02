import { ISchema } from '@formily/react'

export const formId: string = "WMS.base.warehouseZone.two";

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
      "0zhl86l3g2t": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "x-designable-id": "0zhl86l3g2t",
        "x-index": 0,
        "properties": {
          "etfy9kiwr9x": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "etfy9kiwr9x",
            "x-index": 0,
            "properties": {
              "{value:wareHouseId,label:wareHouseName}": {
                "type": "string",
                "title": "仓库",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:wareHouseId,label:wareHouseName}",
                "required": true,
                "x-designable-id": "9j8syypvyrm",
                "x-index": 0
              }
            }
          },
          "agir6xk7njz": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "agir6xk7njz",
            "x-index": 1,
            "properties": {
              "{value:warehouseZoneId,label:warehouseZoneCode}": {
                "type": "string",
                "title": "库区",
                "x-decorator": "FormItem",
                "x-component": "WareHouseZoneSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:warehouseZoneId,label:warehouseZoneCode}",
                "required": true,
                "x-designable-id": "wqdfjui80ma",
                "x-index": 0
              }
            }
          },
          "ri279hy2qf1": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ri279hy2qf1",
            "x-index": 2,
            "properties": {
              "type": {
                "title": "类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择"
                },
                "x-decorator-props": {},
                "name": "type",
                "required": true,
                "enum": [
                  {
                    "children": [],
                    "label": "作业区",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "虚拟区",
                    "value": 6
                  },
                  {
                    "children": [],
                    "label": "存储区",
                    "value": 10
                  }
                ],
                "x-designable-id": "hhhxw1zuj9k",
                "x-index": 0
              }
            }
          },
          "vxc3sip0ezy": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "vxc3sip0ezy",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "usePriority": {
                "title": "优先级",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择优先级"
                },
                "x-decorator-props": {},
                "name": "usePriority",
                "required": true,
                "enum": [
                  {
                    "children": [],
                    "label": "低",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "中",
                    "value": 10
                  },
                  {
                    "children": [],
                    "label": "高",
                    "value": 15
                  }
                ],
                "x-designable-id": "f5o2uz200sm",
                "x-index": 0
              }
            }
          },
          "o7ghh63ohpe": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "o7ghh63ohpe",
            "x-index": 4,
            "properties": {
              "weight": {
                "type": "number",
                "title": "最大承重(kg)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "weight",
                "required": true,
                "x-designable-id": "ezbq6mnygfu",
                "x-index": 0
              }
            }
          },
          "ufelh79lgaj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ufelh79lgaj",
            "x-index": 5,
            "properties": {
              "lenght": {
                "type": "number",
                "title": "长(mm)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "lenght",
                "required": true,
                "x-designable-id": "82x551uvvto",
                "x-index": 0
              }
            }
          },
          "6w9ta8hb2zf": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "6w9ta8hb2zf",
            "x-index": 6,
            "properties": {
              "width": {
                "type": "number",
                "title": "宽(mm)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "width",
                "required": true,
                "x-designable-id": "4glyx7ktuus",
                "x-index": 0
              }
            }
          },
          "b43qsqpait3": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "b43qsqpait3",
            "x-index": 7,
            "properties": {
              "height": {
                "type": "number",
                "title": "高(mm)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "height",
                "required": true,
                "x-designable-id": "gloe13kvu2q",
                "x-index": 0
              }
            }
          },
          "isRoHs_column": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "isRoHs_column",
            "x-index": 8,
            "properties": {
              "isRoHs": {
                "type": "boolean",
                "title": "是否环保",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isRoHs",
                "required": false,
                "x-designable-id": "isRoHs_field_batch",
                "x-index": 0
              }
            }
          }
        }
      },
      "n1cw3btue3g": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 4
        },
        "x-designable-id": "n1cw3btue3g",
        "x-index": 1,
        "properties": {
          "o74ilmwllra": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "o74ilmwllra",
            "x-index": 0,
            "properties": {
              "startCode": {
                "type": "number",
                "title": "排编码",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "startCode",
                "required": true,
                "default": 1,
                "x-designable-id": "q6priw1du1e",
                "x-index": 0
              }
            }
          },
          "482jtb1q0v8": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "482jtb1q0v8",
            "x-index": 1,
            "properties": {
              "endCode": {
                "type": "number",
                "title": "至",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "endCode",
                "default": 1,
                "x-designable-id": "lyeu5vh70e5",
                "x-index": 0
              }
            }
          },
          "ubpf3qx5b5f": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ubpf3qx5b5f",
            "x-index": 2
          },
          "d8dk15q1j8y": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "d8dk15q1j8y",
            "x-index": 3
          },
          "i6n0k755r90": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "i6n0k755r90",
            "x-index": 4,
            "properties": {
              "startRow": {
                "type": "number",
                "title": "列编码",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "startRow",
                "required": true,
                "default": 1,
                "x-designable-id": "5j14ksgrmzp",
                "x-index": 0
              }
            }
          },
          "rj6j63r53dc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "rj6j63r53dc",
            "x-index": 5,
            "properties": {
              "endRow": {
                "type": "number",
                "title": "至",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "endRow",
                "default": 1,
                "x-designable-id": "yihrqkrxnfo",
                "x-index": 0
              }
            }
          },
          "zl983jw8s0r": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "zl983jw8s0r",
            "x-index": 6
          },
          "xxfcg1wqsf8": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xxfcg1wqsf8",
            "x-index": 7
          },
          "8as8awad318": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "8as8awad318",
            "x-index": 8,
            "properties": {
              "startLayer": {
                "type": "number",
                "title": "层编码",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "startLayer",
                "required": true,
                "default": 1,
                "x-designable-id": "1prl2mxnorr",
                "x-index": 0
              }
            }
          },
          "zujojsahf3p": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "zujojsahf3p",
            "x-index": 9,
            "properties": {
              "endLayer": {
                "type": "number",
                "title": "至",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "endLayer",
                "default": 1,
                "x-designable-id": "ryv4u7v31hu",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "pgb8qdvh9ip"
  }
}