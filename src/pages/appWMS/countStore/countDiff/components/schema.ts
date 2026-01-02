import { ISchema } from '@formily/react'

export const formId: string = "WMS.appWMSInStore.countDiff";

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
      "dfjizwsrtlk": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "minColumns": 3,
          "maxColumns": 3,
          "strictAutoFit": true
        },
        "x-designable-id": "dfjizwsrtlk",
        "x-index": 0,
        "properties": {
          "fejgp1rmd1p": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "fejgp1rmd1p",
            "x-index": 0,
            "properties": {
              "wareHouseCode": {
                "type": "string",
                "title": "库房编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "wareHouseCode",
                "x-pattern": "readPretty",
                "x-designable-id": "xexifsl5pa5",
                "x-index": 0
              }
            }
          },
          "t0dvz2k1v5c": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "t0dvz2k1v5c",
            "x-index": 1,
            "properties": {
              "wareHouseLocationCode": {
                "type": "string",
                "title": "库位编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "wareHouseLocationCode",
                "x-pattern": "readPretty",
                "x-designable-id": "hgj5vinpvjz",
                "x-index": 0
              }
            }
          },
          "tctpszxqvf7": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "tctpszxqvf7",
            "x-index": 2,
            "properties": {
              "materialOutCode": {
                "type": "string",
                "title": "物料编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "name": "materialOutCode",
                "x-designable-id": "sqcc9lo4xqv",
                "x-index": 0
              }
            }
          },
          "6slgvqtdps8": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "x-designable-id": "6slgvqtdps8",
            "x-index": 3,
            "properties": {
              "traceId": {
                "type": "string",
                "title": "Lpn",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "c3fcal44d9h",
                "x-index": 0,
                "name": "traceId"
              }
            }
          },
          "76nbf9i3a30": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "76nbf9i3a30",
            "x-index": 4,
            "properties": {
              "boxNumber": {
                "type": "string",
                "title": "箱号",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "gr2zmk5tzau",
                "x-index": 0,
                "name": "boxNumber"
              }
            }
          },
          "388x6p04cyw": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "388x6p04cyw",
            "x-index": 5
          },
          "mdm6en8skmx": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "mdm6en8skmx",
            "x-index": 6,
            "properties": {
              "systemIsRoHS": {
                "type": "string",
                "title": "系统是否环保",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "p84ox1wo41z",
                "x-index": 0,
                "name": "systemIsRoHS"
              }
            }
          },
          "4qvn2sf9i41": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "4qvn2sf9i41",
            "x-index": 7,
            "properties": {
              "systemAcProperty": {
                "type": "string",
                "title": "系统AC属性",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "09nmun0bdyp",
                "x-index": 0,
                "name": "systemAcProperty"
              }
            }
          },
          "5xyg9gpujtg": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "5xyg9gpujtg",
            "x-index": 8,
            "properties": {
              "systemRealRightCode": {
                "type": "string",
                "title": "系统物权",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "plgyfli58pu",
                "x-index": 0,
                "name": "systemRealRightCode"
              }
            }
          },
          "23ubz0qu7zs": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "23ubz0qu7zs",
            "x-index": 9,
            "properties": {
              "isRoHS": {
                "type": "string",
                "title": "是否环保",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "rt98kzo8mst",
                "x-index": 0,
                "name": "isRoHS"
              }
            }
          },
          "jedxlnskvfm": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "jedxlnskvfm",
            "x-index": 10,
            "properties": {
              "acProperty": {
                "type": "string",
                "title": "AC属性",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "kppwc700ffv",
                "x-index": 0,
                "name": "acProperty"
              }
            }
          },
          "jn76wb3vxpz": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "jn76wb3vxpz",
            "x-index": 11,
            "properties": {
              "realRightCode": {
                "type": "string",
                "title": "物权",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "qu3dkahjk33",
                "x-index": 0,
                "name": "realRightCode"
              }
            }
          },
          "xu588bzsrz9": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "xu588bzsrz9",
            "x-index": 12,
            "properties": {
              "replayIsRoHS": {
                "type": "string",
                "title": "复盘是否环保",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "wv64fpgkutl",
                "x-index": 0,
                "name": "replayIsRoHS"
              }
            }
          },
          "9ks9eu9jtlb": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "9ks9eu9jtlb",
            "x-index": 13,
            "properties": {
              "replayAcProperty": {
                "type": "string",
                "title": "复盘AC属性",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "ee2xz3zxabp",
                "x-index": 0,
                "name": "replayAcProperty"
              }
            }
          },
          "76w7w9vypur": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "76w7w9vypur",
            "x-index": 14,
            "properties": {
              "replayRealRightCode": {
                "type": "string",
                "title": "复盘物权",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "x-designable-id": "tf41jpqcx2q",
                "x-index": 0,
                "name": "replayRealRightCode"
              }
            }
          },
          "05jugakivl6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "05jugakivl6",
            "x-index": 15,
            "properties": {
              "n51fxbfomdu": {
                "type": "void",
                "x-component": "Card",
                "x-component-props": {
                  "title": "系统批次属性"
                },
                "x-designable-id": "n51fxbfomdu",
                "x-index": 0,
                "x-pattern": "readPretty",
                "properties": {
                  "n73pt01c7qs": {
                    "type": "void",
                    "x-component": "FormGrid",
                    "x-validator": [],
                    "x-component-props": {
                      "maxColumns": 4,
                      "minColumns": 4
                    },
                    "x-designable-id": "n73pt01c7qs",
                    "x-index": 0,
                    "properties": {
                      "9qz0ba2rty9": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "9qz0ba2rty9",
                        "x-index": 0,
                        "properties": {
                          "systemLotProperty.property1": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property1",
                            "x-designable-id": "hm2twxavfrt",
                            "x-index": 0
                          }
                        }
                      },
                      "rrhpuo311e8": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "rrhpuo311e8",
                        "x-index": 1,
                        "properties": {
                          "systemLotProperty.property2": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property2",
                            "x-designable-id": "s766vdydk9s",
                            "x-index": 0
                          }
                        }
                      },
                      "hmqf75m1nky": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "hmqf75m1nky",
                        "x-index": 2,
                        "properties": {
                          "systemLotProperty.property3": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property3",
                            "x-designable-id": "tbr4i423bqr",
                            "x-index": 0
                          }
                        }
                      },
                      "ho9xugbntiq": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "ho9xugbntiq",
                        "x-index": 3,
                        "properties": {
                          "systemLotProperty.property4": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property4",
                            "x-designable-id": "nfdt0p2j2cy",
                            "x-index": 0
                          }
                        }
                      },
                      "dveptjuu3zs": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "dveptjuu3zs",
                        "x-index": 4,
                        "properties": {
                          "systemLotProperty.property5": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property5",
                            "x-designable-id": "wscgbuw0jpg",
                            "x-index": 0
                          }
                        }
                      },
                      "qvmmi1ucotx": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "qvmmi1ucotx",
                        "x-index": 5,
                        "properties": {
                          "systemLotProperty.property6": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property6",
                            "x-designable-id": "qcrmlt3jp6b",
                            "x-index": 0
                          }
                        }
                      },
                      "ococxwbesf1": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "ococxwbesf1",
                        "x-index": 6,
                        "properties": {
                          "systemLotProperty.property7": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property7",
                            "x-designable-id": "pj6aahzk3xf",
                            "x-index": 0
                          }
                        }
                      },
                      "vqyhw6w6e6x": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "vqyhw6w6e6x",
                        "x-index": 7,
                        "properties": {
                          "systemLotProperty.property8": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property8",
                            "x-designable-id": "81ub6ffgrf4",
                            "x-index": 0
                          }
                        }
                      },
                      "ff2em76aso1": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "ff2em76aso1",
                        "x-index": 8,
                        "properties": {
                          "systemLotProperty.property9": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property9",
                            "x-designable-id": "giw1lco50ti",
                            "x-index": 0
                          }
                        }
                      },
                      "mqf86f5skq5": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "mqf86f5skq5",
                        "x-index": 9,
                        "properties": {
                          "systemLotProperty.property10": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property10",
                            "x-designable-id": "wo0vsjgf225",
                            "x-index": 0
                          }
                        }
                      },
                      "yzz637f4yev": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "yzz637f4yev",
                        "x-index": 10,
                        "properties": {
                          "systemLotProperty.property11": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property11",
                            "x-designable-id": "p3l2wfopedj",
                            "x-index": 0
                          }
                        }
                      },
                      "m3itrxqgll6": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "m3itrxqgll6",
                        "x-index": 11,
                        "properties": {
                          "systemLotProperty.property12": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "systemLotProperty.property12",
                            "x-designable-id": "6kvwp4e69ix",
                            "x-index": 0
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "epskei6hgwp": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "epskei6hgwp",
            "x-index": 16,
            "properties": {
              "mck32hi5upf": {
                "type": "void",
                "x-component": "Card",
                "x-component-props": {
                  "title": "批次属性"
                },
                "x-designable-id": "mck32hi5upf",
                "x-index": 0,
                "x-pattern": "readPretty",
                "properties": {
                  "bq0rb8or2us": {
                    "type": "void",
                    "x-component": "FormGrid",
                    "x-validator": [],
                    "x-component-props": {
                      "maxColumns": 4,
                      "minColumns": 4
                    },
                    "x-designable-id": "bq0rb8or2us",
                    "x-index": 0,
                    "properties": {
                      "1kyu8ipjfff": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "1kyu8ipjfff",
                        "x-index": 0,
                        "properties": {
                          "lotProperty.property1": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property1",
                            "x-designable-id": "wi3c3reazt0",
                            "x-index": 0
                          }
                        }
                      },
                      "khgbeafkbgh": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "khgbeafkbgh",
                        "x-index": 1,
                        "properties": {
                          "lotProperty.property2": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property2",
                            "x-designable-id": "jgl90cuinxq",
                            "x-index": 0
                          }
                        }
                      },
                      "fvjg0qq960m": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "fvjg0qq960m",
                        "x-index": 2,
                        "properties": {
                          "lotProperty.property3": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property3",
                            "x-designable-id": "iqg3namhpau",
                            "x-index": 0
                          }
                        }
                      },
                      "75un94woftt": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "75un94woftt",
                        "x-index": 3,
                        "properties": {
                          "lotProperty.property4": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property4",
                            "x-designable-id": "h3jjotmssls",
                            "x-index": 0
                          }
                        }
                      },
                      "p4fdutzjofa": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "p4fdutzjofa",
                        "x-index": 4,
                        "properties": {
                          "lotProperty.property5": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property5",
                            "x-designable-id": "tw34cf67ked",
                            "x-index": 0
                          }
                        }
                      },
                      "qp7l2pu3w21": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "qp7l2pu3w21",
                        "x-index": 5,
                        "properties": {
                          "lotProperty.property6": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property6",
                            "x-designable-id": "demfdw7w12z",
                            "x-index": 0
                          }
                        }
                      },
                      "sdkeastq9gk": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "sdkeastq9gk",
                        "x-index": 6,
                        "properties": {
                          "lotProperty.property7": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property7",
                            "x-designable-id": "ejs5jnsogk7",
                            "x-index": 0
                          }
                        }
                      },
                      "4gyw3oi0fx7": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "4gyw3oi0fx7",
                        "x-index": 7,
                        "properties": {
                          "lotProperty.property8": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property8",
                            "x-designable-id": "d3a1xf824mh",
                            "x-index": 0
                          }
                        }
                      },
                      "17o3d75cf8w": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "17o3d75cf8w",
                        "x-index": 8,
                        "properties": {
                          "lotProperty.property9": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property9",
                            "x-designable-id": "2e859ir2yx3",
                            "x-index": 0
                          }
                        }
                      },
                      "x82jpga7wb5": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "x82jpga7wb5",
                        "x-index": 9,
                        "properties": {
                          "lotProperty.property10": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property10",
                            "x-designable-id": "6021alluwbh",
                            "x-index": 0
                          }
                        }
                      },
                      "uj4ulp3eh1h": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "uj4ulp3eh1h",
                        "x-index": 10,
                        "properties": {
                          "lotProperty.property11": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property11",
                            "x-designable-id": "7itd8imaoqb",
                            "x-index": 0
                          }
                        }
                      },
                      "n2vd7afqk4p": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "n2vd7afqk4p",
                        "x-index": 11,
                        "properties": {
                          "lotProperty.property12": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "lotProperty.property12",
                            "x-designable-id": "q2ocx12rlyg",
                            "x-index": 0
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "ban2lgkcvq1": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "ban2lgkcvq1",
            "x-index": 17,
            "properties": {
              "359ph8srzt5": {
                "type": "void",
                "x-component": "Card",
                "x-component-props": {
                  "title": "复盘批次属性"
                },
                "x-designable-id": "359ph8srzt5",
                "x-index": 0,
                "x-pattern": "readPretty",
                "properties": {
                  "v5z8u4w0yo4": {
                    "type": "void",
                    "x-component": "FormGrid",
                    "x-validator": [],
                    "x-component-props": {
                      "maxColumns": 4,
                      "minColumns": 4
                    },
                    "x-designable-id": "v5z8u4w0yo4",
                    "x-index": 0,
                    "properties": {
                      "076jy6lttvt": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "076jy6lttvt",
                        "x-index": 0,
                        "properties": {
                          "replayLotProperty.property1": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property1",
                            "x-designable-id": "hymi1mwuh3w",
                            "x-index": 0
                          }
                        }
                      },
                      "gcpfbnc3g8z": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "gcpfbnc3g8z",
                        "x-index": 1,
                        "properties": {
                          "replayLotProperty.property2": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property2",
                            "x-designable-id": "13aeg42b9ep",
                            "x-index": 0
                          }
                        }
                      },
                      "bitnvfyap19": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "bitnvfyap19",
                        "x-index": 2,
                        "properties": {
                          "replayLotProperty.property3": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property3",
                            "x-designable-id": "mwudowywpmp",
                            "x-index": 0
                          }
                        }
                      },
                      "rinw63er7a0": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "rinw63er7a0",
                        "x-index": 3,
                        "properties": {
                          "replayLotProperty.property4": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property4",
                            "x-designable-id": "54a463zmix9",
                            "x-index": 0
                          }
                        }
                      },
                      "837h5m37e9i": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "837h5m37e9i",
                        "x-index": 4,
                        "properties": {
                          "replayLotProperty.property5": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property5",
                            "x-designable-id": "dh5gek2rgau",
                            "x-index": 0
                          }
                        }
                      },
                      "02wztqbxkbi": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "02wztqbxkbi",
                        "x-index": 5,
                        "properties": {
                          "replayLotProperty.property6": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property6",
                            "x-designable-id": "98tlocdzhn7",
                            "x-index": 0
                          }
                        }
                      },
                      "msjbt1fyks1": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "msjbt1fyks1",
                        "x-index": 6,
                        "properties": {
                          "replayLotProperty.property7": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property7",
                            "x-designable-id": "ijfe3qg4wts",
                            "x-index": 0
                          }
                        }
                      },
                      "xu99fh81x3z": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "xu99fh81x3z",
                        "x-index": 7,
                        "properties": {
                          "replayLotProperty.property8": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property8",
                            "x-designable-id": "3jgjenv4cml",
                            "x-index": 0
                          }
                        }
                      },
                      "054xbub00ze": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "054xbub00ze",
                        "x-index": 8,
                        "properties": {
                          "replayLotProperty.property9": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property9",
                            "x-designable-id": "qe55lfdgt3d",
                            "x-index": 0
                          }
                        }
                      },
                      "uk1m1qp6gh4": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "uk1m1qp6gh4",
                        "x-index": 9,
                        "properties": {
                          "replayLotProperty.property10": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property10",
                            "x-designable-id": "xddtupbegr4",
                            "x-index": 0
                          }
                        }
                      },
                      "7fdjyf83k6v": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "7fdjyf83k6v",
                        "x-index": 10,
                        "properties": {
                          "replayLotProperty.property11": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property11",
                            "x-designable-id": "ky9x07fim1p",
                            "x-index": 0
                          }
                        }
                      },
                      "r2kk9yi5ws8": {
                        "type": "void",
                        "x-component": "FormGrid.GridColumn",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-designable-id": "r2kk9yi5ws8",
                        "x-index": 11,
                        "properties": {
                          "replayLotProperty.property12": {
                            "type": "string",
                            "title": "",
                            "x-decorator": "FormItem",
                            "x-component": "Input",
                            "x-validator": [],
                            "x-component-props": {},
                            "x-decorator-props": {},
                            "name": "replayLotProperty.property12",
                            "x-designable-id": "mrfpjgn93ny",
                            "x-index": 0
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "74hmrxd4llm": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "74hmrxd4llm",
            "x-index": 18,
            "properties": {
              "differenceResolveType": {
                "title": "处理方式",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入处理方式"
                },
                "x-decorator-props": {},
                "required": true,
                "enum": [
                  {
                    "children": [],
                    "label": "不处理",
                    "value": 0
                  },
                  {
                    "children": [],
                    "label": "杂入杂出",
                    "value": 10
                  }
                ],
                "x-designable-id": "s6o2fcz5155",
                "x-index": 0,
                "name": "differenceResolveType"
              }
            }
          },
          "7yx8b671dk0": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "7yx8b671dk0",
            "x-index": 19,
            "properties": {
              "differencesInfo": {
                "type": "string",
                "title": "差异原因",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入描述"
                },
                "x-decorator-props": {},
                "name": "differencesInfo",
                "x-designable-id": "hqymewxnwyl",
                "x-index": 0,
                "required": true
              }
            }
          }
        }
      }
    },
    "x-designable-id": "8txk7l6se3a"
  }
}