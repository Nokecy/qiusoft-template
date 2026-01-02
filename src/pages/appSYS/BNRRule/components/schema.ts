import { ISchema } from '@formily/react'


export const formId: string = "Sys.BNRRule";

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
      "r75u45xwh9s": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "动态规则"
        },
        "x-designable-id": "r75u45xwh9s",
        "x-index": 0,
        "properties": {
          "pk6i57y9jo8": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "maxColumns": 3,
              "minColumns": 3,
              "strictAutoFit": true
            },
            "x-designable-id": "pk6i57y9jo8",
            "x-index": 0,
            "properties": {
              "nxxaz8gpxhd": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "nxxaz8gpxhd",
                "x-index": 0,
                "properties": {
                  "ruleName": {
                    "type": "string",
                    "title": "规则名称",
                    "x-decorator": "FormItem",
                    "x-component": "StaticRuleSelect",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请选择规则名称"
                    },
                    "x-decorator-props": {},
                    "name": "ruleName",
                    "required": true,
                    "x-designable-id": "a4vov9kv6wq",
                    "x-index": 0
                  }
                }
              },
              "026d8117yv8": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "026d8117yv8",
                "x-index": 1,
                "properties": {
                  "ruleDisplayName": {
                    "type": "string",
                    "title": "规则显示名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "自动带出",
                      "disabled": true
                    },
                    "x-decorator-props": {},
                    "name": "ruleDisplayName",
                    "x-designable-id": "z54lunl0d2s",
                    "x-index": 0
                  }
                }
              },
              "erkds8xe8hn": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "erkds8xe8hn",
                "x-index": 2
              },
              "3secw2mtlz9": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "3secw2mtlz9",
                "x-index": 3,
                "properties": {
                  "name": {
                    "type": "string",
                    "title": "名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请填写"
                    },
                    "x-decorator-props": {},
                    "name": "name",
                    "required": true,
                    "x-designable-id": "638aa5jzz3g",
                    "x-index": 0
                  }
                }
              },
              "s9bmddibwp1": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "s9bmddibwp1",
                "x-index": 4,
                "properties": {
                  "displayName": {
                    "type": "string",
                    "title": "显示名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请填写"
                    },
                    "x-decorator-props": {},
                    "name": "displayName",
                    "required": true,
                    "x-designable-id": "kvvyfdzxnt5",
                    "x-index": 0
                  }
                }
              },
              "i5dyo283qwl": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "i5dyo283qwl",
                "x-index": 5,
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
                    "default": false,
                    "x-designable-id": "9wlkt0gla29",
                    "x-index": 0
                  }
                }
              },
              "gjcs1u72z0a": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 3
                },
                "x-designable-id": "gjcs1u72z0a",
                "x-index": 6,
                "properties": {
                  "ruleDescription": {
                    "type": "string",
                    "title": "规则描述",
                    "x-decorator": "FormItem",
                    "x-component": "Input.TextArea",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请填写"
                    },
                    "x-decorator-props": {},
                    "name": "ruleDescription",
                    "x-designable-id": "aslvc9y12gv",
                    "x-index": 0
                  }
                }
              },
              "8luq3ux4h5y": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "8luq3ux4h5y",
                "x-index": 7,
                "properties": {
                  "numberStart": {
                    "type": "number",
                    "title": "序号的起始大小",
                    "x-decorator": "FormItem",
                    "x-component": "NumberPicker",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请填写"
                    },
                    "x-decorator-props": {},
                    "name": "numberStart",
                    "required": true,
                    "x-designable-id": "k6i69p1m946",
                    "x-index": 0
                  }
                }
              },
              "jdlgosdyiow": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "jdlgosdyiow",
                "x-index": 8,
                "properties": {
                  "numberIncrement": {
                    "type": "number",
                    "title": "序号递增的大小",
                    "x-decorator": "FormItem",
                    "x-component": "NumberPicker",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请填写"
                    },
                    "x-decorator-props": {},
                    "name": "numberIncrement",
                    "required": true,
                    "x-designable-id": "e1o8269bxjp",
                    "x-index": 0
                  }
                }
              },
              "hpku8oypp0u": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "hpku8oypp0u",
                "x-index": 9,
                "properties": {
                  "numberBinary": {
                    "type": "number",
                    "title": "序号进制",
                    "x-decorator": "FormItem",
                    "x-component": "NumberPicker",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请填写"
                    },
                    "x-decorator-props": {},
                    "name": "numberBinary",
                    "required": true,
                    "x-designable-id": "y24dgkq9wiy",
                    "x-index": 0
                  }
                }
              },
              "om9jfndbpzr": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 3
                },
                "x-designable-id": "om9jfndbpzr",
                "x-index": 10,
                "properties": {
                  "items": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": {
                      "gridKey": "appSYS.BNRRule.form"
                    },
                    "x-decorator-props": {},
                    "name": "items",
                    "title": "明细",
                    "x-designable-id": "soaswne8wuu",
                    "x-index": 0,
                    "items": {
                      "type": "object",
                      "x-designable-id": "j88htz8u7lu",
                      "x-validator": [],
                      "properties": {
                        "3jpw0fjyzn8": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "类型",
                            "width": 130
                          },
                          "x-designable-id": "3jpw0fjyzn8",
                          "x-index": 0,
                          "properties": {
                            "type": {
                              "x-decorator": "FormItem",
                              "x-component": "Select",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "请输入"
                              },
                              "x-decorator-props": {},
                              "name": "type",
                              "enum": [
                                {
                                  "children": [],
                                  "label": "文本",
                                  "value": 0
                                },
                                {
                                  "children": [],
                                  "label": "日期时间",
                                  "value": 1
                                },
                                {
                                  "children": [],
                                  "label": "年份",
                                  "value": 2
                                },
                                {
                                  "children": [],
                                  "label": "年月",
                                  "value": 3
                                },
                                {
                                  "children": [],
                                  "label": "年月日",
                                  "value": 4
                                },
                                {
                                  "children": [],
                                  "label": "年周",
                                  "value": 5
                                },
                                {
                                  "children": [],
                                  "label": "月份",
                                  "value": 6
                                },
                                {
                                  "children": [],
                                  "label": "天",
                                  "value": 7
                                },
                                {
                                  "children": [],
                                  "label": "序列号",
                                  "value": 8
                                },
                                {
                                  "children": [],
                                  "label": "属性",
                                  "value": 9
                                }
                              ],
                              "x-designable-id": "h4v7f0xwk17",
                              "x-index": 0
                            }
                          }
                        },
                        "lwlq1puep1r": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "内容",
                            "width": 200
                          },
                          "x-designable-id": "lwlq1puep1r",
                          "x-index": 1,
                          "properties": {
                            "content": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "请输入"
                              },
                              "x-decorator-props": {},
                              "name": "content",
                              "x-designable-id": "e5a88qkqlxd",
                              "x-index": 0,
                              "x-reactions": {
                                "dependencies": [
                                  {
                                    "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                                    "property": "value",
                                    "type": "any",
                                    "source": ".type",
                                    "name": "type"
                                  }
                                ],
                                "fulfill": {
                                  "state": {
                                    "visible": "{{$deps.type!== 9}}"
                                  }
                                }
                              }
                            },
                            "contentCopy": {
                              "title": "",
                              "x-decorator": "FormItem",
                              "x-component": "Select",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "contentCopy",
                              "x-reactions": {
                                "dependencies": [
                                  {
                                    "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                                    "property": "value",
                                    "type": "any",
                                    "source": ".type",
                                    "name": "type"
                                  }
                                ],
                                "fulfill": {
                                  "state": {
                                    "visible": "{{$deps.type === 9}}"
                                  }
                                }
                              },
                              "x-designable-id": "5hshl9nf0u5",
                              "x-index": 1
                            }
                          }
                        },
                        "3d3ncsac9w5": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "转换类型",
                            "width": 90
                          },
                          "x-designable-id": "3d3ncsac9w5",
                          "x-index": 2,
                          "properties": {
                            "wordConvert": {
                              "x-decorator": "FormItem",
                              "x-component": "Select",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "请输入"
                              },
                              "x-decorator-props": {},
                              "name": "wordConvert",
                              "enum": [
                                {
                                  "children": [],
                                  "label": "不转换",
                                  "value": 0
                                },
                                {
                                  "children": [],
                                  "label": "转大写",
                                  "value": 1
                                },
                                {
                                  "children": [],
                                  "label": "转小写",
                                  "value": 2
                                }
                              ],
                              "x-designable-id": "w39btbogusj",
                              "x-index": 0
                            }
                          }
                        },
                        "gqy762g1968": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "占位符",
                            "width": 110
                          },
                          "x-designable-id": "gqy762g1968",
                          "x-index": 3,
                          "properties": {
                            "placeholder": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "placeholder",
                              "x-designable-id": "mtbjf6fyf5x",
                              "x-index": 0
                            }
                          }
                        },
                        "aam8exzynf6": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "右分隔符",
                            "width": 110
                          },
                          "x-designable-id": "aam8exzynf6",
                          "x-index": 4,
                          "properties": {
                            "rightSeparator": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "rightSeparator",
                              "x-designable-id": "9enbwcgvw51",
                              "x-index": 0
                            }
                          }
                        },
                        "avx6ez683fk": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "左补位",
                            "width": 110,
                            "style": {
                              "display": "flex",
                              "flexDirection": "row"
                            }
                          },
                          "x-designable-id": "avx6ez683fk",
                          "x-index": 5,
                          "properties": {
                            "padLeft.leftPadChar": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "padLeft.leftPadChar",
                              "x-designable-id": "v54bfz1xibi",
                              "x-index": 0
                            }
                          }
                        },
                        "4jx47sje78w": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "左补位长度",
                            "width": 80,
                            "style": {
                              "display": "flex",
                              "flexDirection": "row"
                            }
                          },
                          "x-designable-id": "4jx47sje78w",
                          "x-index": 6,
                          "properties": {
                            "padLeft.totalLength": {
                              "type": "number",
                              "x-decorator": "FormItem",
                              "x-component": "NumberPicker",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "padLeft.totalLength",
                              "x-designable-id": "p3h31wm4f75",
                              "x-index": 0
                            }
                          }
                        },
                        "hgsth55lqxi": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "序号长度",
                            "width": 80
                          },
                          "x-designable-id": "hgsth55lqxi",
                          "x-index": 7,
                          "properties": {
                            "sequenceLength": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "sequenceLength",
                              "x-designable-id": "9z6xo2s7v6y",
                              "x-index": 0
                            }
                          }
                        },
                        "ifoqu2hlcvp": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "是否序号",
                            "width": 70
                          },
                          "x-designable-id": "ifoqu2hlcvp",
                          "x-index": 8,
                          "properties": {
                            "sequenceBasis": {
                              "type": "boolean",
                              "x-decorator": "FormItem",
                              "x-component": "Switch",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "sequenceBasis",
                              "x-designable-id": "x03xfksdut3",
                              "x-index": 0
                            }
                          }
                        },
                        "tubjzekspps": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "操作",
                            "width": 90,
                            "pinned": "right"
                          },
                          "x-designable-id": "tubjzekspps",
                          "x-index": 9,
                          "properties": {
                            "arhlsa66wtq": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-designable-id": "arhlsa66wtq",
                              "x-index": 0
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "vsfeqo2gmgy": {
                        "type": "void",
                        "title": "Addition",
                        "x-component": "ArrayTable.Addition",
                        "x-designable-id": "vsfeqo2gmgy",
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
    "x-designable-id": "8txk7l6se3a"
  }
}