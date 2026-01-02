import { ISchema } from '@formily/react'

export const formId: string = "Wms.InstructionConfig";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none",
    "labelWidth": "120px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "3vfrkpe8ahf": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3,
          "strictAutoFit": true
        },
        "x-designable-id": "3vfrkpe8ahf",
        "x-index": 0,
        "properties": {
          "379h10g01hi": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "379h10g01hi",
            "x-index": 0,
            "x-validator": [],
            "x-component-props": {},
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
                "enum": [
                  {
                    "children": [],
                    "label": "出库",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "入库",
                    "value": 10
                  }
                ],
                "required": true,
                "x-designable-id": "bvwgql94gcp",
                "x-index": 0
              }
            }
          },
          "lgg49rnvaxl": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "lgg49rnvaxl",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 5}}"
                }
              }
            },
            "properties": {
              "{value:providerCode,label:providerName}": {
                "type": "string",
                "title": "出库提供者选择器",
                "x-decorator": "FormItem",
                "x-component": "OutstructionConfigSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:providerCode,label:providerName}",
                "x-reactions": {
                  "dependencies": [
                    {
                      "property": "value",
                      "type": "any",
                      "source": "3vfrkpe8ahf.379h10g01hi.type",
                      "name": "type"
                    }
                  ],
                  "fulfill": {
                    "state": {
                      "required": "{{$form.values.type === 5}}"
                    }
                  }
                },
                "required": false,
                "x-designable-id": "wxk0035j3ya",
                "x-index": 0
              }
            }
          },
          "ug5pvtp5ijm": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "ug5pvtp5ijm",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 10}}"
                }
              }
            },
            "properties": {
              "{value:providerCodeCopy,label:providerNameCopy}": {
                "type": "string",
                "title": "入库提供者选择器",
                "x-decorator": "FormItem",
                "x-component": "InstructionConfigSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "8pg5drloeeq",
                "x-index": 0,
                "required": false,
                "name": "{value:providerCodeCopy,label:providerNameCopy}",
                "x-reactions": {
                  "dependencies": [
                    {
                      "property": "value",
                      "type": "any",
                      "source": "3vfrkpe8ahf.379h10g01hi.type",
                      "name": "type"
                    }
                  ],
                  "fulfill": {
                    "state": {
                      "required": "{{$form.values.type === 10}}"
                    }
                  }
                }
              }
            }
          },
          "hsxbyeo0vxi": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "hsxbyeo0vxi",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "isLessCloseAutoDistribution": {
                "type": "boolean",
                "title": "欠料交付",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "tooltip": "该类型单据是否允许欠料交付，即不完成订单就可以交付"
                },
                "name": "isLessCloseAutoDistribution",
                "default": false,
                "required": true,
                "x-designable-id": "zvgm5q6h10l",
                "x-index": 0
              }
            }
          },
          "jgvvcnb5ya2": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "jgvvcnb5ya2",
            "x-index": 4,
            "properties": {
              "isEnable": {
                "type": "boolean",
                "title": "是否启用",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isEnable",
                "default": true,
                "required": true,
                "enum": [],
                "x-designable-id": "26qj1u81ls4",
                "x-index": 0
              }
            }
          },
          "ungs0bok3n4": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "x-designable-id": "ungs0bok3n4",
            "x-index": 5,
            "properties": {
              "putAutoDistribution": {
                "type": "boolean",
                "title": "自动分发",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "tooltip": "分配失败时，新入库库存是否自动分配"
                },
                "name": "putAutoDistribution",
                "default": false,
                "required": true,
                "x-designable-id": "zazlttbo4o2",
                "x-index": 0
              }
            }
          },
          "iv6124ttdyt": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "iv6124ttdyt",
            "x-index": 6,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "isAuto": {
                "type": "boolean",
                "title": "自动指令",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "tooltip": "该类型单据是否自动分配分发任务"
                },
                "name": "isAuto",
                "required": true,
                "default": false,
                "x-designable-id": "oxj57hu4coq",
                "x-index": 0
              }
            }
          },
          "41c806cvj22": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "41c806cvj22",
            "x-index": 7,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "preRegisteredModel": {
                "title": "预占模式",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择"
                },
                "x-decorator-props": {
                  "tooltip": "指定出库单据的预占模式，可空"
                },
                "name": "preRegisteredModel",
                "enum": [
                  {
                    "children": [],
                    "label": "按LPN预占",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "按ITEM预占",
                    "value": 10
                  },
                  {
                    "children": [],
                    "label": "按批次预占",
                    "value": 15
                  }
                ],
                "required": false,
                "x-designable-id": "9750ubfld0o",
                "x-index": 0
              }
            }
          },
          "ysqstk25pbb": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "x-designable-id": "ysqstk25pbb",
            "x-index": 8,
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 5 || $form.values.type === 10}}"
                }
              }
            }
          },
          "cmer9may94h": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "x-designable-id": "cmer9may94h",
            "x-index": 9,
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 5 || $form.values.type === 10}}"
                }
              }
            }
          },
          "twuqefxg714": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "twuqefxg714",
            "x-index": 10,
            "properties": {
              "wareHouse": {
                "type": "string",
                "title": "生效库房选择",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "9t6xs2rvjyl",
                "x-index": 0,
                "name": "wareHouse"
              }
            }
          },
          "2o6zrem1zl5": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2o6zrem1zl5",
            "x-index": 11,
            "properties": {
              "allowOverIssuance": {
                "type": "boolean",
                "title": "是否允许超发",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "tooltip": "该类型单据是否允许超量出库"
                },
                "name": "allowOverIssuance",
                "x-designable-id": "5o3jniccrtc",
                "x-index": 0,
                "default": false
              }
            }
          },
          "3bm1ul0s4d8": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "3bm1ul0s4d8",
            "x-index": 12,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "boolean",
                  "source": "3vfrkpe8ahf.2o6zrem1zl5.allowOverIssuance",
                  "name": "allowOverIssuance"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.allowOverIssuance}}"
                }
              }
            },
            "properties": {
              "allowableOverIssuanceCoefficient": {
                "type": "number",
                "title": "允许超发系数",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "allowableOverIssuanceCoefficient",
                "x-designable-id": "4ns36xlfljh",
                "x-index": 0,
                "default": 0
              }
            }
          },
          "rv6ker57kjm": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "rv6ker57kjm",
            "x-index": 13,
            "properties": {
              "allowUnderIssuance": {
                "type": "boolean",
                "title": "是否允许欠料",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "allowUnderIssuance",
                "x-designable-id": "1idg4v7ucge",
                "x-index": 0,
                "default": false
              }
            }
          },
          "9hntmolpnpm": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "9hntmolpnpm",
            "x-index": 14,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "boolean",
                  "source": "3vfrkpe8ahf.rv6ker57kjm.allowUnderIssuance",
                  "name": "allowUnderIssuance"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.allowUnderIssuance}}"
                }
              }
            },
            "properties": {
              "isAutoGenShortageOrderOnUnderIssuance": {
                "type": "boolean",
                "title": "自动生成欠料单",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isAutoGenShortageOrderOnUnderIssuance",
                "x-designable-id": "8s7bv7mhrbq",
                "x-index": 0,
                "default": false
              }
            }
          },
          "7iyb0u8uucp": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "7iyb0u8uucp",
            "x-index": 15,
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 5}}"
                }
              }
            },
            "properties": {
              "generateOutInstructionDemand": {
                "type": "boolean",
                "title": "是否生成出库需求",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "tooltip": "该类型单据是否生成需求单，即不直接生成出库指令，而是由需求单合并后生成"
                },
                "name": "generateOutInstructionDemand",
                "x-designable-id": "3t1hg6aaeu0",
                "x-index": 0
              }
            }
          },
          "8nv5a4pew3z": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "8nv5a4pew3z",
            "x-index": 16,
            "x-validator": [],
            "x-component-props": {}
          },
          "xuce0oi91x6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "boolean",
                  "source": "3vfrkpe8ahf.2o6zrem1zl5.allowOverIssuance",
                  "name": "allowOverIssuance"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{!$form.values.allowOverIssuance}}"
                }
              }
            },
            "x-designable-id": "xuce0oi91x6",
            "x-index": 17
          },
          "kr23jjd33zb": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "boolean",
                  "source": "3vfrkpe8ahf.rv6ker57kjm.allowUnderIssuance",
                  "name": "allowUnderIssuance"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{!$form.values.allowUnderIssuance}}"
                }
              }
            },
            "x-designable-id": "kr23jjd33zb",
            "x-index": 18
          },
          "ga6v20dqjsh": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "x-designable-id": "ga6v20dqjsh",
            "x-index": 19,
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 5}}"
                }
              }
            },
            "properties": {
              "isTransferOutOrderAutoGenInOrder": {
                "type": "boolean",
                "title": "是否生成入库单",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "tooltip": "转库生成入库单，入库单提供者"
                },
                "x-designable-id": "65rjsxt3gt9",
                "x-index": 0,
                "default": false,
                "name": "isTransferOutOrderAutoGenInOrder"
              }
            }
          },
          "6z20pmmp2dz": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "6z20pmmp2dz",
            "x-index": 20,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 5}}"
                }
              }
            },
            "properties": {
              "{value:transferInOrderProviderDescribe,label:transferInOrderProviderName}": {
                "type": "string",
                "title": "入库单提供者",
                "x-decorator": "FormItem",
                "x-component": "InstructionConfigSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "htcoes1qsr0",
                "x-index": 0,
                "required": false,
                "name": "{value:transferInOrderProviderDescribe,label:transferInOrderProviderName}",
                "x-reactions": {
                  "dependencies": [
                    {
                      "property": "value",
                      "type": "boolean",
                      "source": "3vfrkpe8ahf.ga6v20dqjsh.isTransferOutOrderAutoGenInOrder",
                      "name": "isTransferOutOrderAutoGenInOrder"
                    }
                  ],
                  "fulfill": {
                    "state": {
                      "required": "{{$form.values.isTransferOutOrderAutoGenInOrder}}"
                    }
                  }
                }
              }
            }
          },
          "m0jpc2jukst": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "m0jpc2jukst",
            "x-index": 21,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "property": "value",
                  "type": "any",
                  "source": "3vfrkpe8ahf.379h10g01hi.type",
                  "name": "type"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$form.values.type === 5}}"
                }
              }
            }
          },
          "c1h78zs63kg": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "c1h78zs63kg",
            "x-index": 22,
            "properties": {
              "needCallBack": {
                "type": "boolean",
                "title": "是否需要回传",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "needCallBack",
                "x-designable-id": "qu946slxxyk",
                "x-index": 0
              }
            }
          },
          "c1h78zs63k2": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "c1h78zs63k2",
            "x-index": 23,
            "properties": {
              "validateSourceOrderNo": {
                "type": "boolean",
                "title": "是否验证来源订单",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "tooltip": "即出库单库存是否需要匹配原单号，如采购退货是否指定采购入库的库存进行出库"
                },
                "name": "validateSourceOrderNo",
                "x-designable-id": "qu946slxcyk2",
                "x-index": 0
              }
            }
          },
          "9w8ewhas5h3": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "9w8ewhas5h3",
            "x-index": 24,
            "properties": {
              "memo": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {
                  "labelWidth": "120px"
                },
                "name": "memo",
                "x-designable-id": "wtj16rtekij",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "eq9kwobk4o5"
  }
}