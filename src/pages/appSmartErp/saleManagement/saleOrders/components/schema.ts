import { ISchema } from '@formily/react'

export const formId: string = "saleOrder";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } ={
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none",
    "labelWidth": "80px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "basicInfo": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "基础信息"
        },
        "x-designable-id": "xuopj9lg7vc",
        "x-index": 0,
        "name": "basicInfo",
        "properties": {
          "ljpg00xs3ew": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "strictAutoFit": true,
              "maxColumns": 4
            },
            "x-designable-id": "ljpg00xs3ew",
            "x-index": 0,
            "properties": {
              "phnia0dimfw": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "phnia0dimfw",
                "x-index": 0,
                "properties": {
                  "orderNo": {
                    "type": "string",
                    "title": "合同号",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入销售单号"
                    },
                    "x-decorator-props": {},
                    "required": true,
                    "name": "orderNo",
                    "x-designable-id": "o33og8x33j2",
                    "x-index": 0
                  }
                }
              },
              "8qienrwugzi": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "8qienrwugzi",
                "x-index": 1,
                "properties": {
                  "releaseDate": {
                    "type": "string",
                    "title": "签订日期",
                    "x-decorator": "FormItem",
                    "x-component": "DatePicker",
                    "x-validator": [],
                    "x-component-props": {
                      "format": "YYYY-MM-DD"
                    },
                    "x-decorator-props": {},
                    "required": true,
                    "name": "releaseDate",
                    "default": "{{new Date().toISOString().split('T')[0]}}",
                    "x-designable-id": "pt2acrps5f7",
                    "x-index": 0
                  }
                }
              },
              "nivx7naoqw4": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "nivx7naoqw4",
                "x-index": 2,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "orderType": {
                    "title": "订单类型",
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入订单类型"
                    },
                    "x-decorator-props": {},
                    "required": true,
                    "name": "orderType",
                    "enum": [
                      {
                        "children": [],
                        "label": "普通订单",
                        "value": "10"
                      },
                      {
                        "children": [],
                        "label": "一揽子订单",
                        "value": "20"
                      },
                      {
                        "children": [],
                        "label": "维修订单",
                        "value": "30"
                      },
                      {
                        "children": [],
                        "label": "ATO模式",
                        "value": "40"
                      },
                      {
                        "children": [],
                        "label": "金额订单",
                        "value": "50"
                      },
                      {
                        "children": [],
                        "label": "内部订单",
                        "value": "60"
                      },
                      {
                        "children": [],
                        "label": "样品订单",
                        "value": "70"
                      }
                    ],
                    "default": "10",
                    "x-designable-id": "cxhkillvzfs",
                    "x-index": 0
                  }
                }
              },
              "2mwj5g3kde0": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "2mwj5g3kde0",
                "x-index": 3,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "{value:saleCode,label:saleName}": {
                    "type": "string",
                    "title": "销售员",
                    "x-decorator": "FormItem",
                    "x-component": "SaleManSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "required": false,
                    "x-designable-id": "stmo0o198sc",
                    "x-index": 0,
                    "name": "{value:saleCode,label:saleName}"
                  }
                }
              },
              "29i2ln5d9zs": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "29i2ln5d9zs",
                "x-index": 4,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "priceIsTax": {
                    "type": "string | number",
                    "title": "是否含税",
                    "x-decorator": "FormItem",
                    "x-component": "Radio.Group",
                    "enum": [
                      {
                        "children": [],
                        "label": "是",
                        "value": "1"
                      },
                      {
                        "children": [],
                        "label": "否",
                        "value": "0"
                      }
                    ],
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "required": true,
                    "name": "priceIsTax",
                    "default": "1",
                    "x-designable-id": "i3dmm1y399v",
                    "x-index": 0
                  }
                }
              },
              "c58l8rmkjtu": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "c58l8rmkjtu",
                "x-index": 5,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "{value:customerCode,label:customerAbb}": {
                    "type": "string",
                    "title": "客户编码",
                    "x-decorator": "FormItem",
                    "x-component": "CustomerSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": true,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "required": true,
                    "x-designable-id": "zzs1u1t9yyt",
                    "x-index": 0,
                    "name": "{value:customerCode,label:customerAbb}"
                  }
                }
              },
              "jeq5keejmm2": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "jeq5keejmm2",
                "x-index": 6,
                "properties": {
                  "customerName": {
                    "type": "string",
                    "title": "客户名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-pattern": "readPretty",
                    "x-designable-id": "30xh6fmmr7w",
                    "x-index": 0,
                    "name": "customerName"
                  }
                }
              },
              "l1lzqciur45": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "l1lzqciur45",
                "x-index": 7,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "{value:consigner,label:consigner}": {
                    "type": "string",
                    "title": "跟单员",
                    "x-decorator": "FormItem",
                    "x-component": "ConsignerSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": true,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "x-designable-id": "9urriip18bm",
                    "x-index": 0,
                    "name": "{value:consigner,label:consigner}"
                  }
                }
              },
              "jkzvizd6qkn": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "jkzvizd6qkn",
                "x-index": 8,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "{value:currencyCode,label:currencyAbb}": {
                    "type": "string",
                    "title": "货币",
                    "x-decorator": "FormItem",
                    "x-component": "CurrencySelect",
                    "x-validator": [],
                    "x-component-props": {
                      "labelInValue": true,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "required": true,
                    "x-designable-id": "cm3ovg47dm7",
                    "x-index": 0,
                    "name": "{value:currencyCode,label:currencyAbb}"
                  }
                }
              },
              "sxh8300r6g9": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "sxh8300r6g9",
                "x-index": 9,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "{value:invoiceCode,label:invoiceName}": {
                    "type": "string",
                    "title": "税率",
                    "x-decorator": "FormItem",
                    "x-component": "TaxRateSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": true,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "required": true,
                    "x-designable-id": "7hh48jy4uza",
                    "x-index": 0,
                    "name": "{value:invoiceCode,label:invoiceName}"
                  },
                  "invoiceRate": {
                    "type": "number",
                    "title": "税率",
                    "x-decorator": "FormItem",
                    "x-component": "NumberPicker",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-display": "hidden",
                    "name": "invoiceRate",
                    "x-designable-id": "gify5ipt1l9",
                    "x-index": 1
                  }
                }
              },
              "hmikchcrgyq": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "hmikchcrgyq",
                "x-index": 10,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "payMethod": {
                    "type": "string",
                    "title": "付款方式",
                    "x-decorator": "FormItem",
                    "x-component": "PaymentMethodSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": true,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "x-designable-id": "l98zr7b9jrh",
                    "x-index": 0,
                    "name": "payMethod"
                  }
                }
              },
              "301pn1xftqy": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "301pn1xftqy",
                "x-index": 11,
                "properties": {
                  "currencyRate": {
                    "type": "string",
                    "title": "汇率",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-designable-id": "d7lv6cpv1gf",
                    "x-index": 0,
                    "name": "currencyRate"
                  }
                }
              },
              "apzrpv2h8nw": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "apzrpv2h8nw",
                "x-index": 12
              },
              "ostxnhtazi0": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "ostxnhtazi0",
                "x-index": 13,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "{value:deliverMethodCode,label:deliverMethodName}": {
                    "type": "string",
                    "title": "交货方式",
                    "x-decorator": "FormItem",
                    "x-component": "DeliveryWaySelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": true,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "x-designable-id": "bx33ntfbmeq",
                    "x-index": 0,
                    "name": "{value:deliverMethodCode,label:deliverMethodName}"
                  }
                }
              },
              "wtwkimg1883": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "wtwkimg1883",
                "x-index": 14,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "reciver": {
                    "type": "string",
                    "title": "收货人",
                    "x-decorator": "FormItem",
                    "x-component": "CustomerContactSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": false,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "x-designable-id": "i0u62vkadhj",
                    "x-index": 0,
                    "name": "reciver"
                  }
                }
              },
              "w3kkp4hkxeh": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "w3kkp4hkxeh",
                "x-index": 15,
                "properties": {
                  "reciverTel": {
                    "type": "string",
                    "title": "收货人电话",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-designable-id": "3n39xs07ot3",
                    "x-index": 0,
                    "name": "reciverTel"
                  }
                }
              },
              "60lpwmotmvr": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "60lpwmotmvr",
                "x-index": 16,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "priceItems": {
                    "type": "string",
                    "title": "价格条款",
                    "x-decorator": "FormItem",
                    "x-component": "PriceClauseSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": false,
                      "useCode": true
                    },
                    "x-decorator-props": {},
                    "x-designable-id": "xzqmbsrrupf",
                    "x-index": 0,
                    "name": "priceItems"
                  }
                }
              },
              "zxh2k3bz3nz": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "zxh2k3bz3nz",
                "x-index": 17,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "businessType": {
                    "title": "交易方式",
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "选择交易方式",
                      "allowClear": true
                    },
                    "x-decorator-props": {},
                    "name": "businessType",
                    "enum": [
                      {
                        "children": [],
                        "label": "定金采购款到发货",
                        "value": "10"
                      },
                      {
                        "children": [],
                        "label": "定金采购货到付款",
                        "value": "20"
                      },
                      {
                        "children": [],
                        "label": "定金方式款到发货",
                        "value": "30"
                      },
                      {
                        "children": [],
                        "label": "定金方式货到付款",
                        "value": "40"
                      },
                      {
                        "children": [],
                        "label": "款到发货",
                        "value": "50"
                      },
                      {
                        "children": [],
                        "label": "货到付款",
                        "value": "60"
                      },
                      {
                        "children": [],
                        "label": "按月月结",
                        "value": "70"
                      },
                      {
                        "children": [],
                        "label": "按单月结",
                        "value": "80"
                      }
                    ],
                    "x-designable-id": "3aguxlym4qs",
                    "x-index": 0
                  }
                }
              },
              "1hs111hqvkz": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 4
                },
                "x-designable-id": "1hs111hqvkz",
                "x-index": 18,
                "properties": {
                  "deliveryAddress": {
                    "type": "string",
                    "title": "交货地址",
                    "x-decorator": "FormItem",
                    "x-component": "CustomerDeliveryAddressSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "allowClear": true,
                      "labelInValue": false
                    },
                    "x-decorator-props": {},
                    "x-designable-id": "piq82eg34ts",
                    "x-index": 0,
                    "name": "deliveryAddress"
                  }
                }
              },
              "yom36d9dw4b": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 4
                },
                "x-designable-id": "yom36d9dw4b",
                "x-index": 19,
                "properties": {
                  "memo": {
                    "type": "string",
                    "title": "备注",
                    "x-decorator": "FormItem",
                    "x-component": "Input.TextArea",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-designable-id": "6ost094rk8x",
                    "x-index": 0,
                    "name":"memo"
                  }
                }
              },
              "cer51apgxhe": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 4
                },
                "x-designable-id": "cer51apgxhe",
                "x-index": 20,
                "properties": {
                  "saleOrderItems": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": {
                      "gridKey": "appSmartErp.saleManagement.saleOrders.saleOrderItems"
                    },
                    "x-decorator-props": {},
                    "name": "saleOrderItems",
                    "x-designable-id": "ndyasoa5an7",
                    "x-index": 0,
                    "items": {
                      "type": "object",
                      "x-designable-id": "ykx0zmodbx6",
                      "properties": {
                        "o3ddb45ot7s": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "物料编码",
                            "width": 180
                          },
                          "x-designable-id": "o3ddb45ot7s",
                          "x-index": 0,
                          "properties": {
                            "{value:materialCode,label:materialOutCode}": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "MaterialSelect",
                              "x-validator": [],
                              "x-component-props": {
                                "labelInValue": true,
                                "useCode": true
                              },
                              "x-decorator-props": {},
                              "name": "{value:materialCode,label:materialOutCode}",
                              "x-designable-id": "7ok8igra9sf",
                              "x-index": 0
                            }
                          }
                        },
                        "uh3y48viep6": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "物料外码",
                            "width": 180
                          },
                          "x-designable-id": "uh3y48viep6",
                          "x-index": 1,
                          "properties": {
                            "materialOutCode": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "name": "materialOutCode",
                              "x-designable-id": "4fj35x8c8rm",
                              "x-index": 0
                            }
                          }
                        },
                        "48dtb749bir": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "物料描述",
                            "width": 150
                          },
                          "x-designable-id": "48dtb749bir",
                          "x-index": 2,
                          "properties": {
                            "materialDescription": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "x-designable-id": "jp4s0iebcek",
                              "x-index": 0,
                              "name": "materialDescription"
                            }
                          }
                        },
                        "ulufbahgnpi": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "特性",
                            "width": 100
                          },
                          "x-designable-id": "ulufbahgnpi",
                          "x-index": 3,
                          "properties": {
                            "attributes": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "AttributeFieldSelect",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-designable-id": "dk67lhlp5pe",
                              "x-index": 0,
                              "name": "attributes"
                            },
                            "itemBoms": {
                              "type": "string",
                              "title": "Input",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "itemBoms",
                              "x-pattern": "editable",
                              "x-display": "hidden",
                              "x-designable-id": "owqcwtr7hds",
                              "x-index": 1
                            }
                          }
                        },
                        "t8nj28laz61": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "版本",
                            "width": 80
                          },
                          "x-designable-id": "t8nj28laz61",
                          "x-index": 4,
                          "properties": {
                            "version": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "x-designable-id": "vhutq3i90bh",
                              "x-index": 0,
                              "name": "version"
                            }
                          }
                        },
                        "jf9wh33x54w": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "规格型号",
                            "width": 100
                          },
                          "x-designable-id": "jf9wh33x54w",
                          "x-index": 5,
                          "properties": {
                            "specificationModel": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "name": "specificationModel",
                              "x-designable-id": "hrz0veanooc",
                              "x-index": 0
                            }
                          }
                        },
                        "lria6qa5pjp": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "来源",
                            "width": 80
                          },
                          "x-designable-id": "lria6qa5pjp",
                          "x-index": 6,
                          "properties": {
                            "comeFrom": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "name": "comeFrom",
                              "x-designable-id": "vtrpee2i8ml",
                              "x-index": 0
                            }
                          }
                        },
                        "acvlhtne64a": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "数量",
                            "width": 120
                          },
                          "x-designable-id": "acvlhtne64a",
                          "x-index": 7,
                          "properties": {
                            "qty": {
                              "type": "number",
                              "x-decorator": "Editable",
                              "x-component": "NumberPicker",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "required": true,
                              "x-designable-id": "eebexspyr7m",
                              "x-index": 0,
                              "name": "qty"
                            }
                          }
                        },
                        "4di8cd0hecz": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "单位",
                            "width": 80
                          },
                          "x-designable-id": "4di8cd0hecz",
                          "x-index": 8,
                          "properties": {
                            "unitCode": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "UnitSelect",
                              "x-validator": [],
                              "x-component-props": {
                                "labelInValue": false,
                                "useCode": true
                              },
                              "x-decorator-props": {},
                              "name": "unitCode",
                              "x-designable-id": "iy4s168vdiy",
                              "x-index": 0
                            },
                            "unitName": {
                              "type": "string",
                              "title": "",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "unitName",
                              "x-display": "hidden",
                              "x-designable-id": "d42rx13zuoa",
                              "x-index": 1
                            }
                          }
                        },
                        "wovfsxkj5y1": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "运算",
                            "width": 80
                          },
                          "x-designable-id": "wovfsxkj5y1",
                          "x-index": 9,
                          "properties": {
                            "exchangeFlag": {
                              "x-decorator": "FormItem",
                              "x-component": "Select",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "exchangeFlag",
                              "x-pattern": "readPretty",
                              "enum": [
                                {
                                  "children": [],
                                  "label": "乘",
                                  "value": "0"
                                },
                                {
                                  "children": [],
                                  "label": "除",
                                  "value": "1"
                                }
                              ],
                              "x-designable-id": "ci7kw4oi0fm",
                              "x-index": 0
                            }
                          }
                        },
                        "sfdi5ecy6ty": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "转换率",
                            "width": 100
                          },
                          "x-designable-id": "sfdi5ecy6ty",
                          "x-index": 10,
                          "properties": {
                            "exchangeRate": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "name": "exchangeRate",
                              "x-designable-id": "255hqaybw3y",
                              "x-index": 0
                            }
                          }
                        },
                        "yoo3etktqxk": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "标准数量",
                            "width": 100
                          },
                          "x-designable-id": "yoo3etktqxk",
                          "x-index": 11,
                          "properties": {
                            "invQty": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "name": "invQty",
                              "x-designable-id": "8hidgbo7th9",
                              "x-index": 0
                            }
                          }
                        },
                        "ilyw10wm34r": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "标准单位",
                            "width": 100
                          },
                          "x-designable-id": "ilyw10wm34r",
                          "x-index": 12,
                          "properties": {
                            "saleUnitName": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-pattern": "readPretty",
                              "name": "saleUnitName",
                              "x-reactions": {
                                "dependencies": [
                                  ".unitName"
                                ],
                                "fulfill": {
                                  "state": {
                                    "value": "{{$deps[0]}}"
                                  }
                                }
                              },
                              "x-designable-id": "n80wgrr0jja",
                              "x-index": 0
                            },
                            "saleUnitCode": {
                              "type": "string",
                              "title": "",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "saleUnitCode",
                              "x-pattern": "readPretty",
                              "x-reactions": {
                                "dependencies": [
                                  ".unitCode"
                                ],
                                "fulfill": {
                                  "state": {
                                    "value": "{{$deps[0]}}"
                                  }
                                }
                              },
                              "x-display": "hidden",
                              "x-designable-id": "ryb0cjvril0",
                              "x-index": 1
                            }
                          }
                        },
                        "bwzbqzptvfj": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "单价",
                            "width": 120
                          },
                          "x-designable-id": "bwzbqzptvfj",
                          "x-index": 13,
                          "properties": {
                            "price": {
                              "type": "number",
                              "x-decorator": "Editable",
                              "x-component": "NumberPicker",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "required": true,
                              "x-designable-id": "7hp2qlouupz",
                              "x-index": 0,
                              "name": "price"
                            }
                          }
                        },
                        "srqo94he18q": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "出厂日期",
                            "width": 120
                          },
                          "x-designable-id": "srqo94he18q",
                          "x-index": 14,
                          "properties": {
                            "yieldDate": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "DatePicker",
                              "x-validator": [],
                              "x-component-props": {
                                "format": "YYYY-MM-DD"
                              },
                              "x-decorator-props": {},
                              "x-designable-id": "91hgun5plbo",
                              "x-index": 0,
                              "name": "yieldDate"
                            }
                          }
                        },
                        "mzeq0zzyzb5": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "交货日期",
                            "width": 120
                          },
                          "x-designable-id": "mzeq0zzyzb5",
                          "x-index": 15,
                          "properties": {
                            "deliveryDate": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "DatePicker",
                              "x-validator": [],
                              "x-component-props": {
                                "format": "YYYY-MM-DD"
                              },
                              "x-decorator-props": {},
                              "required": true,
                              "x-designable-id": "8lwaueytyqz",
                              "x-index": 0,
                              "name": "deliveryDate"
                            }
                          }
                        },
                        "2zueqrp4klh": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "交货地址",
                            "width": 150
                          },
                          "x-designable-id": "2zueqrp4klh",
                          "x-index": 16,
                          "properties": {
                            "deliveryAddress": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "deliveryAddress",
                              "x-designable-id": "h8y20jcepkr",
                              "x-index": 0
                            }
                          }
                        },
                        "w6ujrg4f5ag": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "金额",
                            "width": 110
                          },
                          "x-designable-id": "w6ujrg4f5ag",
                          "x-index": 17,
                          "properties": {
                            "amount": {
                              "type": "number",
                              "x-decorator": "Editable",
                              "x-component": "NumberPicker",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-designable-id": "ok3ld1qctft",
                              "x-index": 0,
                              "name": "amount",
                              "x-reactions": {
                                "dependencies": [
                                  ".qty",
                                  ".price"
                                ],
                                "fulfill": {
                                  "state": {
                                    "value": "{{$deps[0] * $deps[1]}}"
                                  }
                                }
                              }
                            }
                          }
                        },
                        "dgep8i8f6kx": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "税额",
                            "width": 100
                          },
                          "x-designable-id": "dgep8i8f6kx",
                          "x-index": 18,
                          "properties": {
                            "tax": {
                              "type": "number",
                              "x-decorator": "Editable",
                              "x-component": "NumberPicker",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-designable-id": "9k9w9v3q4ut",
                              "x-index": 0,
                              "name": "tax",
                              "x-reactions": {
                                "dependencies": [
                                  ".amount",
                                  "...invoiceRate"
                                ],
                                "fulfill": {
                                  "state": {
                                    "value": "{{$deps[0] * $deps[1]}}"
                                  }
                                }
                              }
                            }
                          }
                        },
                        "nqvkhj7fezp": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "税价合计",
                            "width": 110
                          },
                          "x-designable-id": "nqvkhj7fezp",
                          "x-index": 19,
                          "properties": {
                            "taxAmount": {
                              "type": "number",
                              "x-decorator": "Editable",
                              "x-component": "NumberPicker",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-designable-id": "nqfjwla2ked",
                              "x-index": 0,
                              "name": "taxAmount",
                              "x-reactions": {
                                "dependencies": [
                                  ".amount",
                                  ".tax"
                                ],
                                "fulfill": {
                                  "state": {
                                    "value": "{{$deps[0] + $deps[1]}}"
                                  }
                                }
                              }
                            }
                          }
                        },
                        "e0lmfyznb2i": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "备注"
                          },
                          "x-designable-id": "e0lmfyznb2i",
                          "x-index": 20,
                          "properties": {
                            "memo": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "x-designable-id": "homsrtz7y3a",
                              "x-index": 0,
                              "name": "memo"
                            }
                          }
                        },
                        "mln4i0gbcr2": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "操作",
                            "pinned": "right",
                            "width": 150
                          },
                          "x-designable-id": "mln4i0gbcr2",
                          "x-index": 21,
                          "properties": {
                            "xzgtoziimcu": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-designable-id": "xzgtoziimcu",
                              "x-index": 0
                            },
                            "a6scqtdirqp": {
                              "type": "void",
                              "x-component": "ArrayTable.Copy",
                              "x-designable-id": "a6scqtdirqp",
                              "x-index": 1
                            },
                            "oudjkqajb5r": {
                              "type": "string",
                              "x-component": "BomFieldSelect",
                              "x-validator": [],
                              "x-designable-id": "oudjkqajb5r",
                              "x-index": 2,
                              "x-component-props": {}
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "iajxrl2gazg": {
                        "type": "void",
                        "title": "Addition",
                        "x-component": "ArrayTable.Addition",
                        "x-designable-id": "iajxrl2gazg",
                        "x-index": 0,
                        "x-component-props": {}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "x-designable-id": "8duo4a520za"
  }
}
