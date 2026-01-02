import { ISchema } from '@formily/react'

export const formId: string = "Wms.WareHouseLocation";

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
          "maxColumns": 3,
          "strictAutoFit": true
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
                "required": false,
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
          "quf6sspdqmk": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "quf6sspdqmk",
            "x-index": 4,
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
                "x-designable-id": "j473rkcwocw",
                "x-index": 0
              }
            }
          },
          "o7ghh63ohpe": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "o7ghh63ohpe",
            "x-index": 5,
            "properties": {
              "weight": {
                "type": "number",
                "title": "最大承重(kg)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入",
                  "min": 1
                },
                "x-decorator-props": {},
                "name": "weight",
                "required": false,
                "x-designable-id": "ezbq6mnygfu",
                "x-index": 0
              }
            }
          },
          "ufelh79lgaj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ufelh79lgaj",
            "x-index": 6,
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
                "required": false,
                "x-designable-id": "82x551uvvto",
                "x-index": 0
              }
            }
          },
          "6w9ta8hb2zf": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "6w9ta8hb2zf",
            "x-index": 7,
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
                "required": false,
                "x-designable-id": "4glyx7ktuus",
                "x-index": 0
              }
            }
          },
          "b43qsqpait3": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "b43qsqpait3",
            "x-index": 8,
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
                "required": false,
                "x-designable-id": "gloe13kvu2q",
                "x-index": 0
              }
            }
          },
          "isRoHs_column": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "isRoHs_column",
            "x-index": 9,
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
                "x-designable-id": "isRoHs_field",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "5dtnak3tfvn"
  }
}