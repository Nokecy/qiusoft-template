import { ISchema } from '@formily/react'

export const formId: string = "Wms.OutInspectionScheme";

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
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "properties": {
              "name": {
                "type": "string",
                "title": "检验编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "name",
                "required": true,
                "x-designable-id": "x7xz4478g53",
                "x-index": 0
              }
            }
          },
          "s708l5aumas": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "s708l5aumas",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "isDefault": {
                "type": "boolean",
                "title": "是否默认",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isDefault",
                "x-designable-id": "t8tplhlkuwj",
                "x-index": 0
              }
            }
          },
          "gtu5kfh5w1r": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "gtu5kfh5w1r",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "properties": {
              "description": {
                "type": "string",
                "title": "描述",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "description",
                "x-designable-id": "sw1i6qxv83y",
                "x-index": 0
              }
            }
          },
          "w7fapntoi4p": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "w7fapntoi4p",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "properties": {
              "items": {
                "type": "array",
                "x-decorator": "FormItem",
                "x-component": "ArrayTable",
                "x-validator": [],
                "x-component-props": { "gridKey": "appWMS.baseInfo.outInspectionScheme.items" },
                "x-decorator-props": {},
                "title": "检验属性",
                "name": "items",
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
                        "title": "字段名称",
                        "width": 300
                      },
                      "x-designable-id": "1dsacfbnf2p",
                      "x-index": 0,
                      "properties": {
                        "{value:outInspectionProjectId,label:name}": {
                          "x-decorator": "FormItem",
                          "x-component": "OutInspectionSchemeItemSelect",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请填写",
                            "labelInValue": true
                          },
                          "x-decorator-props": {},
                          "name": "{value:outInspectionProjectId,label:name}",
                          "x-designable-id": "totd92h98y7",
                          "x-index": 0
                        }
                      }
                    },
                    "833loc7ack6": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "是否必填"
                      },
                      "x-designable-id": "833loc7ack6",
                      "x-index": 1,
                      "properties": {
                        "isEnable": {
                          "type": "boolean",
                          "x-decorator": "FormItem",
                          "x-component": "Switch",
                          "x-validator": [],
                          "x-component-props": {},
                          "x-decorator-props": {},
                          "name": "isEnable",
                          "x-designable-id": "5lzouo3qty5",
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
    "x-designable-id": "ttmfr6nueca"
  }
}
