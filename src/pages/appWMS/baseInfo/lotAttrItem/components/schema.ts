import { ISchema } from '@formily/react'

export const formId: string = "Wms.LotAttrItem";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "102px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "zteu89ub6jt": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "minColumns": 0,
          "maxColumns": 3
        },
        "x-designable-id": "zteu89ub6jt",
        "x-index": 0,
        "properties": {
          "i6vjfkuskk6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "i6vjfkuskk6",
            "x-index": 0,
            "properties": {
              "field": {
                "title": "属性编码",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择属性"
                },
                "x-decorator-props": {},
                "name": "field",
                "enum": [
                  {
                    "children": [],
                    "label": "批次属性1",
                    "value": "Property1"
                  },
                  {
                    "children": [],
                    "label": "批次属性2",
                    "value": "Property2"
                  },
                  {
                    "children": [],
                    "label": "批次属性3",
                    "value": "Property3"
                  },
                  {
                    "children": [],
                    "label": "批次属性4",
                    "value": "Property4"
                  },
                  {
                    "children": [],
                    "label": "批次属性5",
                    "value": "Property5"
                  },
                  {
                    "children": [],
                    "label": "批次属性6",
                    "value": "Property6"
                  },
                  {
                    "children": [],
                    "label": "批次属性7",
                    "value": "Property7"
                  },
                  {
                    "children": [],
                    "label": "批次属性8",
                    "value": "Property8"
                  },
                  {
                    "children": [],
                    "label": "批次属性9",
                    "value": "Property9"
                  },
                  {
                    "children": [],
                    "label": "批次属性10",
                    "value": "Property10"
                  },
                  {
                    "children": [],
                    "label": "批次属性11",
                    "value": "Property11"
                  },
                  {
                    "children": [],
                    "label": "批次属性12",
                    "value": "Property12"
                  }
                ],
                "x-designable-id": "19x2e1msc25",
                "x-index": 0,
                "required": true
              }
            }
          },
          "s708l5aumas": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "s708l5aumas",
            "x-index": 1,
            "properties": {
              "label": {
                "type": "string",
                "title": "属性名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "label",
                "required": true,
                "x-designable-id": "x7xz4478g53",
                "x-index": 0
              }
            }
          },
          "qhqmevh0sy6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "qhqmevh0sy6",
            "x-index": 2,
            "properties": {
              "type": {
                "title": "类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "type",
                "enum": [
                  {
                    "children": [],
                    "label": "字符串",
                    "value": 0
                  },
                  {
                    "children": [],
                    "label": "数字",
                    "value": 1
                  },
                  {
                    "children": [],
                    "label": "日期",
                    "value": 2
                  }
                ],
                "required": true,
                "x-designable-id": "327thr0x116",
                "x-index": 0
              }
            }
          },
          "ac1dizgb2s6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ac1dizgb2s6",
            "x-index": 3,
            "properties": {
              "productionDateProviderName": {
                "title": "生产期解析规则",
                "x-decorator": "FormItem",
                "x-component": "ProductionDateProviderSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "productionDateProviderName",
                "x-designable-id": "epnw5b2iuur",
                "x-index": 0
              }
            }
          },
          "a6lucwny80z": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "a6lucwny80z",
            "x-index": 4,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "optionValues": {
                "title": "可用选项",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "mode": "multiple"
                },
                "x-decorator-props": {},
                "name": "optionValues",
                "x-designable-id": "46bttf56aly",
                "x-index": 0
              }
            }
          },
          "ocuasfo7ufo": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ocuasfo7ufo",
            "x-index": 5
          },
          "w7fapntoi4p": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "w7fapntoi4p",
            "x-index": 6,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "properties": {
              "lotAttrItemResolvers": {
                "type": "array",
                "x-decorator": "FormItem",
                "x-component": "ArrayTable",
                "x-validator": [],
                "x-component-props": { "gridKey": "appWMS.baseInfo.lotAttrItem.components.schema.1" },
                "x-decorator-props": {},
                "title": "数据解析列表",
                "name": "lotAttrItemResolvers",
                "x-designable-id": "hteu3jyyxz3",
                "x-index": 0,
                "items": {
                  "type": "object",
                  "x-designable-id": "0ogg5lbv7q9",
                  "properties": {
                    "1dsacfbnf2p": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "解析器",
                        "width": 300
                      },
                      "x-designable-id": "1dsacfbnf2p",
                      "x-index": 0,
                      "properties": {
                        "resolverProviderName": {
                          "x-decorator": "FormItem",
                          "x-component": "BarCodeResolverProviderSelect",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请填写"
                          },
                          "x-decorator-props": {},
                          "name": "resolverProviderName",
                          "x-designable-id": "totd92h98y7",
                          "x-index": 0
                        }
                      }
                    },
                    "833loc7ack6": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "属性"
                      },
                      "x-designable-id": "833loc7ack6",
                      "x-index": 1,
                      "properties": {
                        "propertyName": {
                          "type": "string",
                          "x-decorator": "FormItem",
                          "x-component": "Input",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请填写"
                          },
                          "x-decorator-props": {},
                          "name": "propertyName",
                          "x-designable-id": "imkb2thlodt",
                          "x-index": 0
                        }
                      }
                    },
                    "nodizxo910p": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "操作",
                        "width": 100,
                        "align": "left",
                        "pinned": "right"
                      },
                      "x-designable-id": "nodizxo910p",
                      "x-index": 2,
                      "properties": {
                        "5k7gcw3ui31": {
                          "type": "void",
                          "x-component": "ArrayTable.Remove",
                          "x-designable-id": "5k7gcw3ui31",
                          "x-index": 0
                        }
                      }
                    }
                  }
                },
                "properties": {
                  "qfettfpqtxe": {
                    "type": "void",
                    "title": "Addition",
                    "x-component": "ArrayTable.Addition",
                    "x-designable-id": "qfettfpqtxe",
                    "x-index": 0
                  }
                }
              }
            }
          }
        }
      }
    },
    "x-designable-id": "6ueitt5lzzh"
  }
}