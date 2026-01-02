import { ISchema } from '@formily/react'

export const formId: string = "appWMS.baseInfo.BoxLotResolveRule";

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
      "nkch4bkyr5k": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "x-designable-id": "nkch4bkyr5k",
        "x-index": 0,
        "properties": {
          "14ztr0ia6hq": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "14ztr0ia6hq",
            "x-index": 0,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "name": {
                "type": "string",
                "title": "名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "x-designable-id": "m9c4dhtw0bs",
                "x-index": 0,
                "name": "name",
                "required": true
              }
            }
          },
          "tbq5jn3ga9m": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "tbq5jn3ga9m",
            "x-index": 1,
            "properties": {
              "propertiesSplitChars": {
                "type": "string",
                "title": "属性分隔符",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "x-designable-id": "aym20hkc7ae",
                "x-index": 0,
                "name": "propertiesSplitChars",
                "required": true
              }
            }
          },
          "88r9d9144h1": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "88r9d9144h1",
            "x-index": 2,
            "properties": {
              "propertyResolveMode": {
                "title": "属性解析模式",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "propertyResolveMode",
                "enum": [
                  {
                    "children": [],
                    "label": "按排序",
                    "value": 0
                  },
                  {
                    "children": [],
                    "label": "按KeyName",
                    "value": 1
                  }
                ],
                "default": 0,
                "x-designable-id": "9ufz6geoe2v",
                "x-index": 0,
                "required": true
              }
            }
          },
          "1d4vijdezvc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "1d4vijdezvc",
            "x-index": 3,
            "properties": {
              "validLength": {
                "type": "boolean",
                "title": "是否校验长度",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "validLength",
                "x-designable-id": "f5nfasmlyol",
                "x-index": 0,
                "default": false
              }
            }
          },
          "7jlvqgk9tdr": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "7jlvqgk9tdr",
            "x-index": 4,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                  "property": "value",
                  "type": "boolean",
                  "source": "nkch4bkyr5k.1d4vijdezvc.validLength",
                  "name": "validLength"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$deps.validLength}}"
                }
              }
            },
            "properties": {
              "length": {
                "type": "number",
                "title": "长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "length",
                "x-designable-id": "ryrqmoe2re3",
                "x-index": 0,
                "required": true
              }
            }
          },
          "k9y45h06xon": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "k9y45h06xon",
            "x-index": 5,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "validPropertyLength": {
                "type": "boolean",
                "title": "是否校验属性长度",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "validPropertyLength",
                "x-designable-id": "mi744gbsbty",
                "x-index": 0,
                "default": false
              }
            }
          },
          "tl7yceh7pgr": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "tl7yceh7pgr",
            "x-index": 6,
            "x-validator": [],
            "x-component-props": {},
            "x-reactions": {
              "dependencies": [
                {
                  "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                  "property": "value",
                  "type": "boolean",
                  "source": "nkch4bkyr5k.k9y45h06xon.validPropertyLength",
                  "name": "validPropertyLength"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$deps.validPropertyLength}}"
                }
              }
            },
            "properties": {
              "propertyLength": {
                "type": "number",
                "title": "属性长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "propertyLength",
                "x-designable-id": "3u6cuo4s7is",
                "x-index": 0,
                "required": true
              }
            }
          },
          "yoxohcz4cib": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "yoxohcz4cib",
            "x-index": 7,
            "x-reactions": {
              "dependencies": [
                {
                  "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                  "property": "value",
                  "type": "any",
                  "source": "nkch4bkyr5k.88r9d9144h1.propertyResolveMode",
                  "name": "propertyResolveMode"
                }
              ],
              "fulfill": {
                "state": {
                  "visible": "{{$deps.propertyResolveMode === 1}}"
                }
              }
            },
            "properties": {
              "keyValueSplitChars": {
                "type": "string",
                "title": "键值分割符",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "keyValueSplitChars",
                "x-designable-id": "b0447slbeix",
                "x-index": 0,
                "required": true
              }
            }
          },
          "xi991wsw6wb": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "x-designable-id": "xi991wsw6wb",
            "x-index": 8,
            "properties": {
              "isEnabled": {
                "type": "boolean",
                "title": "是否启用",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "8ndb6glbh2b",
                "x-index": 0,
                "name": "isEnabled"
              }
            }
          },
          "6xibzd93ag9": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "6xibzd93ag9",
            "x-index": 9,
            "properties": {
              "remark": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "remark",
                "x-designable-id": "z6p0usud2um",
                "x-index": 0
              }
            }
          },
          "822wwt8abta": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "822wwt8abta",
            "x-index": 10,
            "properties": {
              "items": {
                "type": "array",
                "x-decorator": "FormItem",
                "x-component": "ArrayTable",
                "x-validator": [],
                "x-component-props": { "gridKey": "appWMS.baseInfo.BoxLotResolveRule.components.schema.1" },
                "x-decorator-props": {},
                "name": "items",
                "x-designable-id": "045e07dyp3r",
                "x-index": 0,
                "title": "属性明细",
                "required": true,
                "items": {
                  "type": "object",
                  "x-designable-id": "9x7zmost0ja",
                  "properties": {
                    "155b86clyjs": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "属性名",
                        "width": 140
                      },
                      "x-designable-id": "155b86clyjs",
                      "x-index": 0,
                      "properties": {
                        "propertyName": {
                          "type": "string",
                          "x-decorator": "FormItem",
                          "x-component": "Input",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请输入"
                          },
                          "x-decorator-props": {},
                          "name": "propertyName",
                          "x-designable-id": "joyp4kts150",
                          "x-index": 0,
                          "required": true
                        }
                      }
                    },
                    "cgpzj2qhsoa": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "序号",
                        "width": 140
                      },
                      "x-designable-id": "cgpzj2qhsoa",
                      "x-index": 1,
                      "properties": {
                        "index": {
                          "type": "number",
                          "x-decorator": "FormItem",
                          "x-component": "NumberPicker",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请输入"
                          },
                          "x-decorator-props": {},
                          "name": "index",
                          "x-designable-id": "gcb5wox48u5",
                          "x-index": 0,
                          "x-reactions": {
                            "dependencies": [
                              {
                                "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                                "property": "value",
                                "type": "any",
                                "source": "nkch4bkyr5k.88r9d9144h1.propertyResolveMode",
                                "name": "propertyResolveMode"
                              }
                            ],
                            "fulfill": {
                              "state": {
                                "required": "{{$deps.propertyResolveMode === 0}}"
                              }
                            }
                          }
                        }
                      }
                    },
                    "um0ymsxk5ze": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "键名",
                        "width": 140
                      },
                      "x-designable-id": "um0ymsxk5ze",
                      "x-index": 2,
                      "properties": {
                        "keyName": {
                          "type": "string",
                          "x-decorator": "FormItem",
                          "x-component": "Input",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请输入"
                          },
                          "x-decorator-props": {},
                          "name": "keyName",
                          "x-designable-id": "aslv6gc14wz",
                          "x-index": 0,
                          "x-reactions": {
                            "dependencies": [
                              {
                                "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                                "property": "value",
                                "type": "any",
                                "source": "nkch4bkyr5k.88r9d9144h1.propertyResolveMode",
                                "name": "propertyResolveMode"
                              }
                            ],
                            "fulfill": {
                              "state": {
                                "required": "{{$deps.propertyResolveMode === 1}}"
                              }
                            }
                          }
                        }
                      }
                    },
                    "ix88id2b5mq": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "属性解析模式",
                        "width": 140
                      },
                      "x-designable-id": "ix88id2b5mq",
                      "x-index": 3,
                      "properties": {
                        "valueResolveMode": {
                          "x-decorator": "FormItem",
                          "x-component": "Select",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请输入"
                          },
                          "x-decorator-props": {},
                          "name": "valueResolveMode",
                          "enum": [
                            {
                              "children": [],
                              "label": "无",
                              "value": 0
                            },
                            {
                              "children": [],
                              "label": "正则",
                              "value": 1
                            }
                          ],
                          "x-designable-id": "f8r7y6mkxa9",
                          "x-index": 0,
                          "default": 0
                        }
                      }
                    },
                    "isku1d3nxbi": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "正则表达式",
                        "width": 190
                      },
                      "x-designable-id": "isku1d3nxbi",
                      "x-index": 4,
                      "properties": {
                        "regexPattern": {
                          "type": "string",
                          "x-decorator": "FormItem",
                          "x-component": "Input",
                          "x-validator": [],
                          "x-component-props": {
                            "placeholder": "请输入"
                          },
                          "x-decorator-props": {},
                          "name": "regexPattern",
                          "x-designable-id": "u8kiyg5dmip",
                          "x-index": 0,
                          "x-reactions": {
                            "dependencies": [
                              {
                                "__DO_NOT_USE_THIS_PROPERTY_index__": 0,
                                "property": "value",
                                "type": "any",
                                "source": ".valueResolveMode",
                                "name": "valueResolveMode"
                              }
                            ],
                            "fulfill": {
                              "state": {
                                "required": "{{$deps.valueResolveMode === 1}}"
                              }
                            }
                          }
                        }
                      }
                    },
                    "kbvkqywo254": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "是否必填",
                        "width": 140
                      },
                      "x-designable-id": "kbvkqywo254",
                      "x-index": 5,
                      "properties": {
                        "isRequired": {
                          "type": "boolean",
                          "x-decorator": "FormItem",
                          "x-component": "Switch",
                          "x-validator": [],
                          "x-component-props": {},
                          "x-decorator-props": {},
                          "name": "isRequired",
                          "x-designable-id": "gk77hg5mrq1",
                          "x-index": 0
                        }
                      }
                    },
                    "m88859ofgjl": {
                      "type": "void",
                      "x-component": "ArrayTable.Column",
                      "x-component-props": {
                        "title": "操作",
                        "width": 100,
                        "pinned": "right"
                      },
                      "x-designable-id": "m88859ofgjl",
                      "x-index": 6,
                      "properties": {
                        "qn3w4gqb447": {
                          "type": "void",
                          "x-component": "ArrayTable.Remove",
                          "x-designable-id": "qn3w4gqb447",
                          "x-index": 0
                        }
                      }
                    }
                  }
                },
                "properties": {
                  "a3ep1jcdcqo": {
                    "type": "void",
                    "title": "Addition",
                    "x-component": "ArrayTable.Addition",
                    "x-designable-id": "a3ep1jcdcqo",
                    "x-index": 0
                  }
                }
              }
            }
          }
        }
      }
    },
    "x-designable-id": "sj9ycgnnm8o"
  }
}