import { ISchema } from '@formily/react'

export const formId: string = "appWMS.appOutInstruction.outInstructionDemandMergeRule";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "108px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "jeg7784sse0": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "jeg7784sse0",
        "x-index": 0,
        "properties": {
          "g5hplwts66z": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "g5hplwts66z",
            "x-index": 0,
            "properties": {
              "orderType": {
                "title": "出库类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择"
                },
                "x-decorator-props": {},
                "name": "orderType",
                "enum": [
                  {
                    "children": [],
                    "label": "销售出库",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "车间维修",
                    "value": 6
                  },
                  {
                    "children": [],
                    "label": "生产领料",
                    "value": 10
                  },
                  {
                    "children": [],
                    "label": "杂出",
                    "value": 11
                  },
                  {
                    "children": [],
                    "label": "服务领料出库",
                    "value": 12
                  },
                  {
                    "children": [],
                    "label": "采购退货",
                    "value": 15
                  },
                  {
                    "children": [],
                    "label": "客供退货",
                    "value": 16
                  },
                  {
                    "children": [],
                    "label": "转库出库",
                    "value": 20
                  }
                ],
                "required": true,
                "x-designable-id": "lz82flqflg6",
                "x-index": 0
              }
            }
          },
          "gudjn2rrwk5": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "gudjn2rrwk5",
            "x-index": 1,
            "properties": {
              "timePeriodMinute": {
                "type": "number",
                "title": " 时间间隔(分钟",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写"
                },
                "x-decorator-props": {},
                "name": "timePeriodMinute",
                "required": true,
                "x-designable-id": "auuito6abyq",
                "x-index": 0
              }
            }
          },
          "xq3q93vwyfj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xq3q93vwyfj",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "quantityThreshold": {
                "type": "number",
                "title": "合并阈值",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写",
                  "min": 0
                },
                "x-decorator-props": {},
                "name": "quantityThreshold",
                "required": true,
                "x-designable-id": "abt024smtxt",
                "x-index": 0,
                "default": 0
              }
            }
          },
          "2sdeh3k3il5": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2sdeh3k3il5",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "mergeMode": {
                "title": "合并模式",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择"
                },
                "x-decorator-props": {},
                "name": "mergeMode",
                "enum": [
                  {
                    "children": [],
                    "label": "需求时间",
                    "value": 0
                  },
                  {
                    "children": [],
                    "label": "自然时间",
                    "value": 1
                  }
                ],
                "x-designable-id": "e4za058et3o",
                "x-index": 0,
                "required": true
              }
            }
          },
          "6a1061um6zp": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "6a1061um6zp",
            "x-index": 4,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "maxMergeCount": {
                "type": "number",
                "title": "最大合并数",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请填写",
                  "min": 0
                },
                "x-decorator-props": {},
                "name": "maxMergeCount",
                "required": false,
                "x-designable-id": "w58jxpl6v6k",
                "x-index": 0,
              }
            }
          },
          "z934rf69sf7": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "z934rf69sf7",
            "x-index": 5,
            "properties": {
              "{value:providerName,label:providerDisplayName}": {
                "type": "string",
                "title": "提供者",
                "x-decorator": "FormItem",
                "x-component": "OutstructionConfigSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:providerName,label:providerDisplayName}",
                "x-designable-id": "vi5xq268x9c",
                "x-index": 0
              }
            }
          },
          "tn9wep4tmzd": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "tn9wep4tmzd",
            "x-index": 6,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              " {value:warehouseCode,label:warehouseName}": {
                "type": "string",
                "title": "库房",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {
                  "labelInValue": true,
                  "code": true
                },
                "x-decorator-props": {},
                "name": " {value:warehouseCode,label:warehouseName}",
                "x-designable-id": "w4bx9qzvmas",
                "x-index": 0
              }
            }
          },
          "saah7bgc7em": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "saah7bgc7em",
            "x-index": 7,
            "properties": {
              "{value:taskTypeCode,label:taskType}": {
                "type": "string",
                "title": "下架任务类型",
                "x-decorator": "FormItem",
                "x-component": "MaterialPickTaskTypeSelect",
                "x-validator": [],
                "x-component-props": {
                  "labelInValue": true,
                  "code": true
                },
                "x-decorator-props": {},
                "name": "{value:taskTypeCode,label:taskType}",
                "x-designable-id": "eb4xr1o4tpw",
                "x-index": 0
              }
            }
          },
          "hqzweaxs3gu": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "hqzweaxs3gu",
            "x-index": 8,
            "properties": {
              "condition": {
                "type": "Array<string | number>",
                "title": "类型分组条件",
                "x-decorator": "FormItem",
                "x-component": "Checkbox.Group",
                "enum": [
                  {
                    "children": [],
                    "label": "交付对象",
                    "value": 1
                  },
                  {
                    "children": [],
                    "label": "加工件",
                    "value": 2
                  }
                ],
                "x-validator": [],
                "x-decorator-props": {},
                "name": "condition",
                "x-designable-id": "95q7syoi6w7",
                "x-index": 0
              }
            }
          },
          "1p5jsitqn4m": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "1p5jsitqn4m",
            "x-index": 9,
            "properties": {
              "isEnabled": {
                "type": "boolean",
                "title": "是否启用",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isEnabled",
                "x-designable-id": "0vsw8xi9e58",
                "x-index": 0
              }
            }
          },
          "e72htfag23s": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "e72htfag23s",
            "x-index": 10,
            "properties": {
              "exclusionTimePeriods": {
                "type": "array",
                "x-decorator": "FormItem",
                "x-component": "ArrayTable",
                "x-validator": [],
                "x-component-props": { "gridKey": "appWMS.outInstruction.outInstructionDemandMergeRule.components.schema.1" },
                "x-decorator-props": {},
                "name": "exclusionTimePeriods",
                "title": "排除时间",
                "x-designable-id": "t6jwa3e96i1",
                "x-index": 0,
                "items": {
                  "type": "object",
                  "x-designable-id": "ogupewi2adj",
                  "properties": {
                    "t1po6xklgb5": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "开始时间"
                      },
                      "x-designable-id": "t1po6xklgb5",
                      "x-index": 0,
                      "properties": {
                        "startTime": {
                          "type": "string",
                          "x-decorator": "FormItem",
                          "x-component": "TimePicker",
                          "x-designable-id": "sqxf6ayftc8",
                          "x-index": 0,
                          "x-validator": [],
                          "x-component-props": {},
                          "x-decorator-props": {},
                          "name": "startTime"
                        }
                      }
                    },
                    "7qao0lht1mo": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "结束时间"
                      },
                      "x-designable-id": "7qao0lht1mo",
                      "x-index": 1,
                      "properties": {
                        "endTime": {
                          "type": "string",
                          "x-decorator": "FormItem",
                          "x-component": "TimePicker",
                          "x-validator": [],
                          "x-component-props": {},
                          "x-decorator-props": {},
                          "x-designable-id": "74ir3qpg68x",
                          "x-index": 0,
                          "name": "endTime"
                        }
                      }
                    },
                    "t607hroyprk": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "操作"
                      },
                      "x-designable-id": "t607hroyprk",
                      "x-index": 2,
                      "properties": {
                        "3vydirxv8os": {
                          "type": "void",
                          "x-component": "ArrayTable.Remove",
                          "x-designable-id": "3vydirxv8os",
                          "x-index": 0
                        },
                        "ry42n3v568m": {
                          "type": "void",
                          "x-component": "ArrayTable.Copy",
                          "x-designable-id": "ry42n3v568m",
                          "x-index": 1
                        },
                        "m0qetoffhvf": {
                          "type": "void",
                          "x-component": "ArrayTable.MoveDown",
                          "x-designable-id": "m0qetoffhvf",
                          "x-index": 2
                        },
                        "gkt8xzpukhk": {
                          "type": "void",
                          "x-component": "ArrayTable.MoveUp",
                          "x-designable-id": "gkt8xzpukhk",
                          "x-index": 3
                        }
                      }
                    }
                  }
                },
                "properties": {
                  "l2xh377p0i6": {
                    "type": "void",
                    "title": "Addition",
                    "x-component": "ArrayTable.Addition",
                    "x-designable-id": "l2xh377p0i6",
                    "x-index": 0,
                    "x-component-props": {}
                  }
                }
              }
            }
          }
        }
      }
    },
    "x-designable-id": "5yq67f79miy"
  }
}