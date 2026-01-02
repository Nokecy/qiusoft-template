import { ISchema } from '@formily/react'

export const formId: string = "WMS.appWMSDelivery.saleOutInstruction";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "100px",
    "feedbackLayout": "terse"
  },
  "schema": {
    "type": "object",
    "properties": {
      "c2z4b6fbtev": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "基本信息"
        },
        "x-designable-id": "c2z4b6fbtev",
        "x-index": 0,
        "properties": {
          "1b86ysw7e4u": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "maxColumns": 4
            },
            "x-designable-id": "1b86ysw7e4u",
            "x-index": 0,
            "properties": {
              "ww1e89w2yse": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "ww1e89w2yse",
                "x-index": 0,
                "properties": {
                  "orderNo": {
                    "type": "string",
                    "title": "入库单号",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入入库单号"
                    },
                    "x-decorator-props": {},
                    "x-designable-id": "4271f2xxccv",
                    "x-index": 0,
                    "name": "orderNo",
                    "x-pattern": "readPretty"
                  }
                }
              },
              "myjygnfjwec": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "myjygnfjwec",
                "x-index": 1,
                "properties": {
                  "orderType": {
                    "title": "发货类型",
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请选择发货类型"
                    },
                    "x-decorator-props": {},
                    "enum": [
                      {
                        "children": [],
                        "label": "销售出库",
                        "value": 5
                      },
                      {
                        "children": [],
                        "label": "车间返工",
                        "value": 6
                      },
                      {
                        "children": [],
                        "label": "成品杂出",
                        "value": 7
                      },
                      {
                        "children": [],
                        "label": "生产领料",
                        "value": 10
                      },
                      {
                        "children": [],
                        "label": "原料杂出",
                        "value": 11
                      },
                      {
                        "children": [],
                        "label": "供应商退货",
                        "value": 15
                      }
                    ],
                    "x-designable-id": "ovw5f1segk4",
                    "x-index": 0,
                    "name": "orderType",
                    "x-pattern": "disabled"
                  }
                }
              },
              "w9sfd823zkr": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "w9sfd823zkr",
                "x-index": 2,
                "properties": {
                  "{value:wareHouseId,label:wareHouseName}": {
                    "type": "string",
                    "title": "出库仓库",
                    "x-decorator": "FormItem",
                    "x-component": "WarehouseSelect",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-designable-id": "a9ft0hcdpbt",
                    "x-index": 0,
                    "name": "{value:wareHouseId,label:wareHouseName}",
                    "required": true
                  }
                }
              },
              "kcf71r64xn5": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "kcf71r64xn5",
                "x-index": 3
              }
            }
          },
          "consignee": {
            "type": "object",
            "x-validator": [],
            "name": "consignee",
            "x-designable-id": "pubfdrtc8ef",
            "x-index": 1,
            "properties": {
              "yn6bk7ro0bl": {
                "type": "void",
                "x-component": "FormGrid",
                "x-validator": [],
                "x-component-props": {
                  "maxColumns": 4
                },
                "x-designable-id": "yn6bk7ro0bl",
                "x-index": 0,
                "properties": {
                  "vak0x8b6ldk": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "vak0x8b6ldk",
                    "x-index": 0,
                    "properties": {
                      "{value:id,label:name}": {
                        "type": "string",
                        "title": "客户选择",
                        "x-decorator": "FormItem",
                        "x-component": "XCustomerSelect",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-decorator-props": {},
                        "x-designable-id": "zgcu1xifhks",
                        "x-index": 0,
                        "required": false,
                        "name": "{value:id,label:name}"
                      }
                    }
                  },
                  "nscx837r7ky": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "nscx837r7ky",
                    "x-index": 1,
                    "properties": {
                      "contact": {
                        "type": "string",
                        "title": "客户联系人",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入客户联系人"
                        },
                        "x-decorator-props": {},
                        "x-designable-id": "nqpzaun6cwy",
                        "x-index": 0,
                        "name": "contact"
                      }
                    }
                  },
                  "a1g5meodq2p": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "a1g5meodq2p",
                    "x-index": 2,
                    "properties": {
                      "tel": {
                        "type": "string",
                        "title": "客户联系人电话",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入客户联系人"
                        },
                        "x-decorator-props": {},
                        "x-designable-id": "b788mmjjya5",
                        "x-index": 0,
                        "name": "tel"
                      }
                    }
                  },
                  "l5q7gtep7dk": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "l5q7gtep7dk",
                    "x-index": 3
                  },
                  "ep86ruk80q6": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {
                      "gridSpan": 4
                    },
                    "x-designable-id": "ep86ruk80q6",
                    "x-index": 4,
                    "properties": {
                      "address": {
                        "type": "string",
                        "title": "客户地址",
                        "x-decorator": "FormItem",
                        "x-component": "Input.TextArea",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-decorator-props": {},
                        "name": "address",
                        "x-designable-id": "rjz2enoo0oe",
                        "x-index": 0
                      }
                    }
                  }
                }
              },
              "kv0dnltox1c": {
                "type": "void",
                "x-component": "FormGrid",
                "x-validator": [],
                "x-component-props": {
                  "maxColumns": 4
                },
                "x-designable-id": "kv0dnltox1c",
                "x-index": 1,
                "properties": {
                  "dgyu2tssyky": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "dgyu2tssyky",
                    "x-index": 0,
                    "properties": {
                      "requiredCompletedTime": {
                        "type": "string",
                        "title": "要求交付日期",
                        "x-decorator": "FormItem",
                        "x-component": "DatePicker",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-decorator-props": {},
                        "x-designable-id": "syhrplq34jc",
                        "x-index": 0,
                        "name": "requiredCompletedTime",
                        "required": true
                      }
                    }
                  },
                  "j5w48d9m1br": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "j5w48d9m1br",
                    "x-index": 1,
                    "properties": {
                      "requiredStartTime": {
                        "type": "string",
                        "title": "预计交付日期",
                        "x-decorator": "FormItem",
                        "x-component": "DatePicker",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-decorator-props": {},
                        "x-designable-id": "4ze9rvonii2",
                        "x-index": 0,
                        "name": "requiredStartTime",
                        "required": true
                      }
                    }
                  },
                  "yksjc9zk5zi": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "yksjc9zk5zi",
                    "x-index": 2,
                    "properties": {
                      "isReCheck": {
                        "type": "boolean",
                        "title": "是否复核",
                        "x-decorator": "FormItem",
                        "x-component": "Switch",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-decorator-props": {},
                        "x-designable-id": "726mz3rw6i6",
                        "x-index": 0,
                        "name": "isReCheck"
                      }
                    }
                  },
                  "ms038v7s8iy": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "ms038v7s8iy",
                    "x-index": 3
                  },
                  "2fa1p2bl8qb": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {
                      "gridSpan": 4
                    },
                    "x-designable-id": "2fa1p2bl8qb",
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
                        "x-designable-id": "oh3rj1k151p",
                        "x-index": 0
                      }
                    },
                    "x-index": 4
                  }
                }
              }
            }
          },
          "items": {
            "type": "array",
            "x-decorator": "FormItem",
            "x-component": "ArrayTable",
            "x-validator": [],
            "x-component-props": { "gridKey": "appWMS.outInstruction.saleOutInstruction.components.schema.1" },
            "x-decorator-props": {},
            "name": "items",
            "x-designable-id": "4ik01w8nmdj",
            "x-index": 2,
            "items": {
              "type": "object",
              "x-validator": [],
              "x-designable-id": "ktz32mz0wm5",
              "properties": {
                "p0fp8bbrx40": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "源单据",
                    "width": 110
                  },
                  "x-designable-id": "p0fp8bbrx40",
                  "x-index": 0,
                  "properties": {
                    "sourceOrderNo": {
                      "type": "string",
                      "title": "",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {},
                      "x-decorator-props": {},
                      "name": "sourceOrderNo",
                      "x-designable-id": "xfnnwcmp89l",
                      "x-index": 0,
                      "x-pattern": "readPretty"
                    }
                  }
                },
                "xzdscypomm3": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "客户料号",
                    "width": 220
                  },
                  "x-designable-id": "xzdscypomm3",
                  "x-index": 1,
                  "properties": {
                    "{value:materialId,label:materialOutCode}": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "MaterailItemSelect",
                      "x-validator": [],
                      "x-component-props": {
                        "outCode":true
                      },
                      "x-decorator-props": {},
                      "name": "{value:materialId,label:materialOutCode}",
                      "x-designable-id": "seto02ht31t",
                      "x-index": 0
                    }
                  }
                },
                "vr9ghezybwd": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物料编码",
                    "width": 100
                  },
                  "x-designable-id": "vr9ghezybwd",
                  "x-index": 2,
                  "properties": {
                    "materialCode": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {},
                      "x-decorator-props": {},
                      "x-pattern": "readPretty",
                      "name": "materialCode",
                      "x-designable-id": "mbzj1dfv65h",
                      "x-index": 0
                    }
                  }
                },
                "g90khv062dq": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物料描述",
                    "width": 200
                  },
                  "x-designable-id": "g90khv062dq",
                  "x-index": 3,
                  "properties": {
                    "materialDescript": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {},
                      "x-decorator-props": {},
                      "name": "materialDescript",
                      "x-pattern": "readPretty",
                      "x-designable-id": "iaxxzuapevz",
                      "x-index": 0
                    }
                  }
                },
                "jzk0h35gjch": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物料版本",
                    "width": 120
                  },
                  "x-designable-id": "jzk0h35gjch",
                  "x-index": 4,
                  "properties": {
                    "version": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": "请输入物料版本"
                      },
                      "x-decorator-props": {},
                      "name": "version",
                      "x-designable-id": "45tdfbwacvs",
                      "x-index": 0
                    }
                  }
                },
                "fczpnzthco0": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物权",
                    "width": 120
                  },
                  "x-designable-id": "fczpnzthco0",
                  "x-index": 5,
                  "properties": {
                    "realRightCode": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": "请输入物料物权"
                      },
                      "x-decorator-props": {},
                      "name": "realRightCode",
                      "x-designable-id": "1jo4dbi8k9n",
                      "x-index": 0
                    }
                  }
                },
                "jlpbb3wg93c": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "AC属性",
                    "width": 110
                  },
                  "x-designable-id": "jlpbb3wg93c",
                  "x-index": 6,
                  "properties": {
                    "acProperty": {
                      "x-decorator": "FormItem",
                      "x-component": "Select",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": "请选择AC属性"
                      },
                      "x-decorator-props": {},
                      "name": "acProperty",
                      "x-designable-id": "pm6apxyqm6l",
                      "x-index": 0,
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
                      ]
                    }
                  }
                },
                "yht3gm29nx7": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "捡料方式",
                    "width": 120
                  },
                  "x-designable-id": "yht3gm29nx7",
                  "x-index": 7,
                  "properties": {
                    "pickType": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {},
                      "x-decorator-props": {},
                      "name": "pickType",
                      "x-pattern": "readPretty",
                      "x-designable-id": "ymm4muzdxtf",
                      "x-index": 0
                    }
                  }
                },
                "s3nui5t9405": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "数量",
                    "width": 90
                  },
                  "x-designable-id": "s3nui5t9405",
                  "x-index": 8,
                  "properties": {
                    "quantity": {
                      "type": "number",
                      "x-decorator": "FormItem",
                      "x-component": "NumberPicker",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": "请输入数量"
                      },
                      "x-decorator-props": {},
                      "name": "quantity",
                      "x-designable-id": "fr4jrxx4x3x",
                      "x-index": 0
                    }
                  }
                },
                "ag1sp9u57jj": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "操作"
                  },
                  "x-designable-id": "ag1sp9u57jj",
                  "x-index": 9,
                  "properties": {
                    "u22xm3u19xv": {
                      "type": "void",
                      "x-component": "ArrayTable.Remove",
                      "x-designable-id": "u22xm3u19xv",
                      "x-index": 0
                    }
                  }
                }
              }
            },
            "properties": {
              "ijrkjqzok5t": {
                "type": "void",
                "title": "Addition",
                "x-component": "ArrayTable.Addition",
                "x-designable-id": "ijrkjqzok5t",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "cgoi350deii"
  }
}