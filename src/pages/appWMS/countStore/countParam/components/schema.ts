import { ISchema } from '@formily/react'

export const formId: string = "`WMS.appWMSInStore.countParam";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none",
    "labelWidth": "100px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "twju3lnhb4w": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "x-designable-id": "twju3lnhb4w",
        "x-index": 0,
        "properties": {
          "ud9jz9om1ph": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ud9jz9om1ph",
            "x-index": 0,
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
                "x-designable-id": "y3na15i65p8",
                "x-index": 0,
                "required": true
              }
            }
          },
          "g3ps3h5hfkq": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "g3ps3h5hfkq",
            "x-index": 1,
            "properties": {
              "countType": {
                "title": "盘点类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择盘点类型"
                },
                "x-decorator-props": {},
                "name": "countType",
                "enum": [
                  {
                    "children": [],
                    "label": "指令盘点",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "循环盘点",
                    "value": 10
                  },
                  {
                    "children": [],
                    "label": "冻结盘点",
                    "value": 15
                  },
                  {
                    "children": [],
                    "label": "主动盘点",
                    "value": 20
                  },
                  {
                    "children": [],
                    "label": "退库盘点",
                    "value": 25
                  }
                ],
                "x-designable-id": "0mjselcp8nv",
                "x-index": 0,
                "required": true
              }
            }
          },
          "1jqkcxv1k2s": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "1jqkcxv1k2s",
            "x-index": 2,
            "properties": {
              "itemType": {
                "title": "物料ABC类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择物料类型",
                  "allowClear": true
                },
                "x-decorator-props": {},
                "name": "itemType",
                "enum": [
                  {
                    "children": [],
                    "label": "A",
                    "value": "A"
                  },
                  {
                    "children": [],
                    "label": "B",
                    "value": "B"
                  },
                  {
                    "children": [],
                    "label": "C",
                    "value": "C"
                  }
                ],
                "x-designable-id": "psaqri5s7kl",
                "x-index": 0,
                "required": false
              }
            }
          },
          "9sz0yosohkg": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "9sz0yosohkg",
            "x-index": 3,
            "properties": {
              "boxStatus": {
                "title": "箱状态",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择箱状态",
                  "allowClear": true
                },
                "x-decorator-props": {},
                "name": "boxStatus",
                "enum": [
                  {
                    "children": [],
                    "label": "全部",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "整箱",
                    "value": 10
                  },
                  {
                    "children": [],
                    "label": "开箱",
                    "value": 15
                  }
                ],
                "x-designable-id": "bras35zdw5z",
                "x-index": 0,
                "required": false
              }
            }
          },
          "iw2dm4p2knk": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "iw2dm4p2knk",
            "x-index": 4,
            "properties": {
              "countRate": {
                "type": "number",
                "title": "盘点比率",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "min": 0,
                  "placeholder": "请输入盘点比率"
                },
                "x-decorator-props": {},
                "name": "countRate",
                "x-designable-id": "e0934uv7klq",
                "x-index": 0
              }
            }
          },
          "4jtlkmgrawx": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "4jtlkmgrawx",
            "x-index": 5,
            "properties": {
              "countCycleDays": {
                "title": "盘点周期(天)",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择盘点周期(天)",
                  "allowClear": true
                },
                "x-decorator-props": {},
                "required": false,
                "name": "countCycleDays",
                "enum": [
                  {
                    "children": [],
                    "label": "30天",
                    "value": 30
                  },
                  {
                    "children": [],
                    "label": "60天",
                    "value": "60"
                  },
                  {
                    "children": [],
                    "label": "90天",
                    "value": "90"
                  }
                ],
                "x-designable-id": "io8admhz096",
                "x-index": 0
              }
            }
          },
          "k67hhzh7c9d": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "k67hhzh7c9d",
            "x-index": 6,
            "properties": {
              "goodsAgeDueTime": {
                "type": "number",
                "title": "库龄年限",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "min": 0,
                  "placeholder": "请输入库龄年限"
                },
                "x-decorator-props": {},
                "name": "goodsAgeDueTime",
                "x-designable-id": "ycjimngnin6",
                "x-index": 0
              }
            }
          },
          "2cnn0eri8zc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2cnn0eri8zc",
            "x-index": 7,
            "properties": {
              "highValueFlag": {
                "title": "贵重品",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择贵重品",
                  "allowClear": true
                },
                "x-decorator-props": {},
                "name": "highValueFlag",
                "x-designable-id": "dhnrnvu9zee",
                "x-index": 0,
                "enum": [
                  {
                    "children": [],
                    "label": "是",
                    "value": "是"
                  },
                  {
                    "children": [],
                    "label": "否",
                    "value": "否"
                  },
                  {
                    "children": [],
                    "label": "全部",
                    "value": "全部"
                  }
                ]
              }
            }
          },
          "d5svymzhv9c": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "d5svymzhv9c",
            "x-index": 8
          }
        }
      }
    },
    "x-designable-id": "4oiv8d6pegf"
  }
}