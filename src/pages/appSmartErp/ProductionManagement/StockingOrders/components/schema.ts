import { ISchema } from '@formily/react'

export const formId: string = "stockingOrder";

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
        "x-index": 0,
        "properties": {
          "grid": {
            "type": "void",
            "x-component": "FormGrid",
            "x-component-props": {
              "strictAutoFit": true,
              "maxColumns": 4
            },
            "x-index": 0,
            "properties": {
              "col1": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-index": 0,
                "properties": {
                  "stockingOrderNo": {
                    "type": "string",
                    "title": "备货单号",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-component-props": {
                      "placeholder": "请输入备货单号"
                    },
                    "required": true,
                    "x-index": 0
                  }
                }
              },
              "col2": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-index": 1,
                "properties": {
                  "stockingOrderName": {
                    "type": "string",
                    "title": "备货计划名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-component-props": {
                      "placeholder": "请输入备货计划名称"
                    },
                    "x-index": 0
                  }
                }
              },
              "col3": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-index": 2,
                "properties": {
                  "startWeek": {
                    "type": "string",
                    "title": "开始周",
                    "x-decorator": "FormItem",
                    "x-component": "DatePicker",
                    "x-component-props": {
                      "picker": "week",
                      "placeholder": "请选择开始周",
                      "format": "YYYY-wo",
                      "allowClear": true
                    },
                    "x-index": 0
                  }
                }
              },
              "col4": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-index": 3,
                "properties": {
                  "customerCode": {
                    "type": "string",
                    "title": "客户",
                    "x-decorator": "FormItem",
                    "x-component": "CustomerSelect",
                    "x-component-props": {
                      "labelInValue": false,
                      "useCode": true,
                      "placeholder": "请选择客户"
                    },
                    "x-index": 0
                  }
                }
              },
              "col5": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-index": 4,
                "properties": {
                  "productionDate": {
                    "type": "string",
                    "title": "生产日期",
                    "x-decorator": "FormItem",
                    "x-component": "DatePicker",
                    "x-component-props": {
                      "format": "YYYY-MM-DD"
                    },
                    "x-index": 0
                  }
                }
              },
              "col6": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-component-props": {
                  "gridSpan": 4
                },
                "x-index": 5,
                "properties": {
                  "memo": {
                    "type": "string",
                    "title": "备注",
                    "x-decorator": "FormItem",
                    "x-component": "Input.TextArea",
                    "x-component-props": {
                      "rows": 3
                    },
                    "x-index": 0
                  }
                }
              },
              "col7": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-component-props": {
                  "gridSpan": 4
                },
                "x-index": 6,
                "properties": {
                  "items": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-component-props": {
                      "gridKey": "appSmartErp.ProductionManagement.StockingOrders.items"
                    },
                    "x-index": 0,
                    "items": {
                      "type": "object",
                      "properties": {
                        "col1": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "序号",
                            "width": 60,
                            "align": "center"
                          },
                          "x-index": 0,
                          "properties": {
                            "sort": {
                              "type": "void",
                              "x-component": "ArrayTable.Index",
                              "x-index": 0
                            }
                          }
                        },
                        "col2": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "物料编码",
                            "width": 140
                          },
                          "x-index": 1,
                          "properties": {
                            "{value:materialCode,label:materialName}": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "MaterialSelect",
                              "x-component-props": {
                                "labelInValue": true,
                                "useCode": true
                              },
                              "x-index": 0
                            }
                          }
                        },
                        "col3": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "物料外码",
                            "width": 120
                          },
                          "x-index": 2,
                          "properties": {
                            "materialOutCode": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-pattern": "readPretty",
                              "x-index": 0
                            }
                          }
                        },
                        "col4": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "物料描述",
                            "width": 150
                          },
                          "x-index": 3,
                          "properties": {
                            "materialDescription": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-pattern": "readPretty",
                              "x-index": 0
                            }
                          }
                        },
                        "col_attribute": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "特性",
                            "width": 90
                          },
                          "x-index": 4,
                          "properties": {
                            "attributes": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "AttributeFieldSelect",
                              "x-index": 0
                            }
                          }
                        },
                        "col5": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "单位",
                            "width": 70
                          },
                          "x-index": 5,
                          "properties": {
                            "unitName": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-pattern": "readPretty",
                              "x-index": 0
                            }
                          }
                        },
                        "col6": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "版本",
                            "width": 80
                          },
                          "x-index": 6,
                          "properties": {
                            "version": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "Input",
                              "x-index": 0
                            }
                          }
                        },
                        "col7": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "数量",
                            "width": 90
                          },
                          "x-index": 7,
                          "properties": {
                            "qty": {
                              "type": "number",
                              "x-decorator": "Editable",
                              "x-component": "NumberPicker",
                              "x-component-props": {
                                "min": 0
                              },
                              "required": true,
                              "x-index": 0
                            }
                          }
                        },
                        "col_productionDate": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "需求日期",
                            "width": 130
                          },
                          "x-index": 8,
                          "properties": {
                            "productionDate": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "DatePicker",
                              "x-component-props": {
                                "format": "YYYY-MM-DD"
                              },
                              "x-index": 0
                            }
                          }
                        },
                        "col8": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "备注",
                            "width": 150
                          },
                          "x-index": 9,
                          "properties": {
                            "memo": {
                              "type": "string",
                              "x-decorator": "Editable",
                              "x-component": "Input",
                              "x-index": 0
                            }
                          }
                        },
                        "col9": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "操作",
                            "width": 60,
                            "fixed": "right"
                          },
                          "x-index": 10,
                          "properties": {
                            "remove": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-index": 0
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "add": {
                        "type": "void",
                        "x-component": "ArrayTable.Addition",
                        "title": "添加明细",
                        "x-index": 0
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
