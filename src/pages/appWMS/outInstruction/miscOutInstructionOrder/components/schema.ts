import { ISchema } from '@formily/react'

export const formId: string = "WMS.appWMSDelivery.miscOutInstructionOrder";

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
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "1pbxjo4xmjd": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "基本信息"
        },
        "x-designable-id": "1pbxjo4xmjd",
        "x-index": 0,
        "properties": {
          "vsvk3r0xkih": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "maxColumns": 4
            },
            "x-designable-id": "vsvk3r0xkih",
            "x-index": 0,
            "properties": {
              "4y0cfiibwdc": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "4y0cfiibwdc",
                "x-index": 0,
                "properties": {
                  "orderNo": {
                    "type": "string",
                    "title": "发货单号",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "orderNo",
                    "x-pattern": "readPretty",
                    "x-designable-id": "kzs09pez8mw",
                    "x-index": 0
                  }
                }
              },
              "8ccfxxkxx4u": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "8ccfxxkxx4u",
                "x-index": 1,
                "properties": {
                  "orderType": {
                    "title": "发货类型",
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                    "x-validator": [],
                    "x-component-props": {},
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
                      },
                      {
                        "children": [],
                        "label": "转库出库",
                        "value": 20
                      }
                    ],
                    "x-designable-id": "ovw5f1segk4",
                    "x-index": 0,
                    "name": "orderType",
                    "x-pattern": "disabled"
                  }
                }
              },
              "td8ujuwo6d0": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "td8ujuwo6d0",
                "x-index": 2,
                "properties": {
                  "{value:wareHouseId,label:wareHouseName}": {
                    "type": "string",
                    "title": "发货仓库",
                    "x-decorator": "FormItem",
                    "x-component": "WarehouseSelect",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "{value:wareHouseId,label:wareHouseName}",
                    "required": true,
                    "x-designable-id": "kudg3p2zheg",
                    "x-index": 0
                  }
                }
              },
              "z8pd65ohent": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "z8pd65ohent",
                "x-index": 3,
                "properties": {
                  "shouldCallBack": {
                    "type": "boolean",
                    "title": "是否回传",
                    "x-decorator": "FormItem",
                    "x-component": "Switch",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "shouldCallBack",
                    "x-designable-id": "8quaqdgicno",
                    "x-index": 0
                  }
                }
              }
            }
          },
          "q5rc653j3kl": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "maxColumns": 4
            },
            "x-designable-id": "q5rc653j3kl",
            "x-index": 1,
            "properties": {
              "q84ezftdu26": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "q84ezftdu26",
                "x-index": 0,
                "properties": {
                  "name": {
                    "type": "string",
                    "title": "收货人名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入收货人名称"
                    },
                    "x-decorator-props": {},
                    "name": "name",
                    "x-designable-id": "ihcrxm4k3c2",
                    "x-index": 0
                  }
                }
              },
              "56fna0th0ig": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "56fna0th0ig",
                "x-index": 1,
                "properties": {
                  "contact": {
                    "type": "string",
                    "title": "收货联系人",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入联系人"
                    },
                    "x-decorator-props": {},
                    "name": "contact",
                    "x-designable-id": "qf107ogonsw",
                    "x-index": 0
                  }
                }
              },
              "kw96et32yf6": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "kw96et32yf6",
                "x-index": 2,
                "properties": {
                  "tel": {
                    "type": "string",
                    "title": "联系电话",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入联系电话"
                    },
                    "x-decorator-props": {},
                    "name": "tel",
                    "x-designable-id": "9y0x205mgjk",
                    "x-index": 0
                  }
                }
              },
              "pn6st1xp71z": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "pn6st1xp71z",
                "x-index": 3
              },
              "az6e1nyt2vd": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 4
                },
                "x-designable-id": "az6e1nyt2vd",
                "x-index": 4,
                "properties": {
                  "address": {
                    "type": "string",
                    "title": "收货地址",
                    "x-decorator": "FormItem",
                    "x-component": "Input.TextArea",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入收货地址"
                    },
                    "x-decorator-props": {},
                    "name": "address",
                    "x-designable-id": "averncg9nsy",
                    "x-index": 0
                  }
                }
              }
            }
          },
          "r0nvsp7obox": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "maxColumns": 4
            },
            "x-designable-id": "r0nvsp7obox",
            "x-index": 2,
            "properties": {
              "he3qrnjjviu": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "he3qrnjjviu",
                "x-index": 0,
                "properties": {
                  "requiredCompletedTime": {
                    "type": "string",
                    "title": "要求交付日期",
                    "x-decorator": "FormItem",
                    "x-component": "DatePicker",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入要求交付日期"
                    },
                    "x-decorator-props": {},
                    "name": "requiredCompletedTime",
                    "required": true,
                    "x-designable-id": "cbolutw2wjp",
                    "x-index": 0
                  }
                }
              },
              "w6xg610p73d": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "w6xg610p73d",
                "x-index": 1,
                "properties": {
                  "requiredStartTime": {
                    "type": "string",
                    "title": "预期交付日期",
                    "x-decorator": "FormItem",
                    "x-component": "DatePicker",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入预期交付日期"
                    },
                    "x-decorator-props": {},
                    "name": "requiredStartTime",
                    "required": true,
                    "x-designable-id": "fr6jn1erbdd",
                    "x-index": 0
                  }
                }
              },
              "y5e6rfq2ub8": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "y5e6rfq2ub8",
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
                    "name": "isReCheck",
                    "x-designable-id": "urb1sn4daaz",
                    "x-index": 0
                  }
                }
              },
              "quaerlozoxj": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "quaerlozoxj",
                "x-index": 3
              },
              "y3pnrj0adb8": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 4
                },
                "x-designable-id": "y3pnrj0adb8",
                "x-index": 4,
                "properties": {
                  "remark": {
                    "type": "string",
                    "title": "备注",
                    "x-decorator": "FormItem",
                    "x-component": "Input.TextArea",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入备注"
                    },
                    "x-decorator-props": {},
                    "name": "remark",
                    "x-designable-id": "68rocgx58x0",
                    "x-index": 0
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
            "x-component-props": { "gridKey": "appWMS.outInstruction.miscOutInstructionOrder.components.schema.1" },
            "x-decorator-props": {},
            "name": "items",
            "x-designable-id": "647b4jqgc3x",
            "x-index": 3,
            "items": {
              "type": "object",
              "x-designable-id": "1x1y3swyyln",
              "x-validator": [],
              "properties": {
                "wro0xwf4clq": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "源单据",
                    "width": 120
                  },
                  "x-designable-id": "wro0xwf4clq",
                  "x-index": 0,
                  "properties": {
                    "sourceOrderNo": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {},
                      "x-decorator-props": {},
                      "x-pattern": "readPretty",
                      "name": "sourceOrderNo",
                      "x-designable-id": "1yxsl60c1do",
                      "x-index": 0
                    }
                  }
                },
                "zglg7oostaw": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "客户料号",
                    "width": 220
                  },
                  "x-designable-id": "zglg7oostaw",
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
                      "x-designable-id": "6dmye5nntbz",
                      "x-index": 0
                    }
                  }
                },
                "oc09dtqu7gq": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物料编码",
                    "align": "left",
                    "width": 120
                  },
                  "x-designable-id": "oc09dtqu7gq",
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
                      "x-designable-id": "egwed0wjkm0",
                      "x-index": 0
                    }
                  }
                },
                "f7b2mown5i0": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物料描述",
                    "width": 220
                  },
                  "x-designable-id": "f7b2mown5i0",
                  "x-index": 3,
                  "properties": {
                    "materialDescript": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {},
                      "x-decorator-props": {},
                      "x-pattern": "readPretty",
                      "name": "materialDescript",
                      "x-designable-id": "h48nn3xste8",
                      "x-index": 0
                    }
                  }
                },
                "gbsre6bpj6q": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物料版本",
                    "width": 120
                  },
                  "x-designable-id": "gbsre6bpj6q",
                  "x-index": 4,
                  "properties": {
                    "version": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": "请输入版本"
                      },
                      "x-decorator-props": {},
                      "name": "version",
                      "x-pattern": "editable",
                      "x-designable-id": "2m6ecdhcfub",
                      "x-index": 0
                    }
                  }
                },
                "5qj5gypx024": {
                  "type": "string",
                  "title": "Input",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {},
                  "x-decorator-props": {},
                  "x-designable-id": "5qj5gypx024",
                  "x-index": 5
                },
                "k7erts5wvn4": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "物权",
                    "width": 120
                  },
                  "x-designable-id": "k7erts5wvn4",
                  "x-index": 6,
                  "properties": {
                    "realRightCode": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": "请输入物权"
                      },
                      "x-decorator-props": {},
                      "name": "realRightCode",
                      "x-designable-id": "xm3b8b3bie3",
                      "x-index": 0
                    }
                  }
                },
                "yiq3fdp09ct": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "AC属性",
                    "width": 130
                  },
                  "x-designable-id": "yiq3fdp09ct",
                  "x-index": 7,
                  "properties": {
                    "pruh6cexcxp": {
                      "x-decorator": "FormItem",
                      "x-component": "Select",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": "请选择AC属性"
                      },
                      "x-decorator-props": {},
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
                      "x-designable-id": "pruh6cexcxp",
                      "x-index": 0
                    }
                  }
                },
                "qe2n2zor3tc": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "捡料方式",
                    "width": 130
                  },
                  "x-designable-id": "qe2n2zor3tc",
                  "x-index": 8,
                  "properties": {
                    "pickType": {
                      "type": "string",
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {
                        "placeholder": ""
                      },
                      "x-decorator-props": {},
                      "name": "pickType",
                      "x-pattern": "readPretty",
                      "x-designable-id": "c7456l4u3t6",
                      "x-index": 0
                    }
                  }
                },
                "vpjpvir6jtd": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "数量",
                    "width": 100
                  },
                  "x-designable-id": "vpjpvir6jtd",
                  "x-index": 9,
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
                      "x-designable-id": "lyhfrqkn6u1",
                      "x-index": 0,
                      "name": "quantity"
                    }
                  }
                },
                "je1f6ggv14c": {
                  "type": "void",
                  "x-component": "ArrayTable.Column",
                  "x-component-props": {
                    "title": "操作",
                    "width": 80
                  },
                  "x-designable-id": "je1f6ggv14c",
                  "x-index": 10,
                  "properties": {
                    "t62kbvpp64s": {
                      "type": "void",
                      "x-component": "ArrayTable.Remove",
                      "x-designable-id": "t62kbvpp64s",
                      "x-index": 0
                    }
                  }
                }
              }
            },
            "properties": {
              "74m1u272teu": {
                "type": "void",
                "title": "Addition",
                "x-component": "ArrayTable.Addition",
                "x-designable-id": "74m1u272teu",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "cbv3dz4iqfq"
  }
}