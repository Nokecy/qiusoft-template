import { ISchema } from '@formily/react'

export const formId: string = "Wms.MaterialItem";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none",
    "labelWidth": "90px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "pvb0b7otacu": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "基础信息"
        },
        "x-designable-id": "pvb0b7otacu",
        "x-index": 0,
        "properties": {
          "on3amo1v61e": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "maxColumns": 3
            },
            "x-designable-id": "on3amo1v61e",
            "x-index": 0,
            "properties": {
              "g2lvxs55ait": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "g2lvxs55ait",
                "x-index": 0,
                "properties": {
                  "code": {
                    "type": "string",
                    "title": "物料编码",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入物料编码"
                    },
                    "x-decorator-props": {},
                    "name": "code",
                    "required": true,
                    "x-designable-id": "e1c1wn1k49f",
                    "x-index": 0
                  }
                }
              },
              "cn0tke76cy1": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "cn0tke76cy1",
                "x-index": 1,
                "properties": {
                  "description": {
                    "type": "string",
                    "title": "物料描述",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入描述"
                    },
                    "x-decorator-props": {},
                    "name": "description",
                    "x-designable-id": "g9lkq3d5kip",
                    "x-index": 0
                  }
                }
              },
              "j3r925ihuvb": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "j3r925ihuvb",
                "x-index": 2,
                "properties": {
                  "specificationModel": {
                    "type": "string",
                    "title": "规格型号",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入规格型号"
                    },
                    "x-decorator-props": {},
                    "name": "specificationModel",
                    "x-designable-id": "8mvma3762yy",
                    "x-index": 0
                  }
                }
              },
              "y8367sy2s99": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "y8367sy2s99",
                "x-index": 3,
                "properties": {
                  "outCode": {
                    "type": "string",
                    "title": "物料外码",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入物料外码"
                    },
                    "x-decorator-props": {},
                    "name": "outCode",
                    "x-designable-id": "sizw098sbg1",
                    "x-index": 0
                  }
                }
              },
              "l1r61dqt98i": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "l1r61dqt98i",
                "x-index": 4,
                "properties": {
                  "materialItemCategoryId": {
                    "type": "string",
                    "title": "物料分类",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请输入"
                    },
                    "x-decorator-props": {},
                    "name": "materialItemCategoryId",
                    "x-designable-id": "b36jlu9zz1e",
                    "x-index": 0
                  }
                }
              },
              "6q9p1kleupg": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "6q9p1kleupg",
                "x-index": 5,
                "properties": {
                  "isExpensive": {
                    "type": "boolean",
                    "title": "贵重物品",
                    "x-decorator": "FormItem",
                    "x-component": "Switch",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "isExpensive",
                    "default": false,
                    "required": true,
                    "x-designable-id": "3ixly7w0poq",
                    "x-index": 0
                  }
                }
              },
              "mpc9ncw3mwt": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "mpc9ncw3mwt",
                "x-index": 6,
                "properties": {
                  "lotAttrEnable": {
                    "type": "boolean",
                    "title": "是否启用批次属性",
                    "x-decorator": "FormItem",
                    "x-component": "Switch",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "lotAttrEnable",
                    "default": false,
                    "required": true,
                    "x-designable-id": "gnogmgu8iqu",
                    "x-index": 0
                  }
                }
              },
              "llvf3zz0m5l": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "llvf3zz0m5l",
                "x-index": 7,
                "properties": {
                  "productionDateProviderType": {
                    "title": "生产日期提供者类型",
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "请选择生产日期提供者类型"
                    },
                    "x-decorator-props": {},
                    "name": "productionDateProviderType",
                    "enum": [
                      {
                        "children": [],
                        "label": "入库日期",
                        "value": 5
                      },
                      {
                        "children": [],
                        "label": "批次属性",
                        "value": 10
                      }
                    ],
                    "x-designable-id": "pngkb1ctz31",
                    "x-index": 0
                  }
                }
              },
              "xatfyj8ngfu": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "xatfyj8ngfu",
                "x-index": 8,
                "x-validator": [],
                "x-component-props": {},
                "properties": {
                  "productionDateAttrCode": {
                    "type": "string",
                    "title": "批次属性",
                    "x-decorator": "FormItem",
                    "x-component": "LotAttrItemSelect",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "productionDateAttrCode",
                    "x-designable-id": "zrve493hftv",
                    "x-index": 0
                  }
                }
              }
            }
          }
        }
      },
      "bsisgp8q846": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "物料仓储"
        },
        "x-designable-id": "bsisgp8q846",
        "x-index": 1,
        "properties": {
          "materialStoreSetting": {
            "type": "object",
            "x-validator": [],
            "name": "materialStoreSetting",
            "x-designable-id": "mq6zfmxmp3t",
            "x-index": 0,
            "properties": {
              "bi41xvnk3iq": {
                "type": "void",
                "x-component": "FormGrid",
                "x-validator": [],
                "x-component-props": {
                  "maxColumns": 3
                },
                "x-designable-id": "bi41xvnk3iq",
                "x-index": 0,
                "properties": {
                  "k76jd0dak61": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "k76jd0dak61",
                    "x-index": 0,
                    "properties": {
                      "preRegisteredModel": {
                        "title": "物料下架预占模式",
                        "x-decorator": "FormItem",
                        "x-component": "Select",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请选择预占模式"
                        },
                        "x-decorator-props": {},
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
                        "x-designable-id": "mihe1nmmpn5",
                        "x-index": 0,
                        "required": true
                      }
                    }
                  },
                  "abfl4n4k9zv": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "abfl4n4k9zv",
                    "x-index": 1,
                    "x-validator": [],
                    "x-component-props": {},
                    "properties": {
                      "takeBox": {
                        "type": "boolean",
                        "title": "是否可以拆箱",
                        "x-decorator": "FormItem",
                        "x-component": "Switch",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-decorator-props": {},
                        "name": "takeBox",
                        "default": false,
                        "x-designable-id": "as8jyzjwcru",
                        "x-index": 0
                      }
                    }
                  },
                  "9j8oxxeivbz": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "9j8oxxeivbz",
                    "x-index": 2,
                    "x-validator": [],
                    "x-component-props": {},
                    "properties": {
                      "pickType": {
                        "title": "出库方法",
                        "x-decorator": "FormItem",
                        "x-component": "Select",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请选择出库方法"
                        },
                        "x-decorator-props": {},
                        "name": "pickType",
                        "required": true,
                        "x-designable-id": "i6wn4ev6xa9",
                        "x-index": 0,
                        "enum": [
                          {
                            "children": [],
                            "label": "先进先出",
                            "value": 10
                          },
                          {
                            "children": [],
                            "label": "滚动发料",
                            "value": 20
                          },
                          {
                            "children": [],
                            "label": "按批次发料",
                            "value": 30
                          }
                        ]
                      }
                    }
                  },
                  "0udx6ge38vx": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "0udx6ge38vx",
                    "x-index": 3,
                    "properties": {
                      "loopType": {
                        "title": "滚动类型",
                        "x-decorator": "FormItem",
                        "x-component": "Select",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请选择滚动类型"
                        },
                        "x-decorator-props": {},
                        "name": "loopType",
                        "required": true,
                        "enum": [
                          {
                            "children": [],
                            "label": "批次",
                            "value": 10
                          },
                          {
                            "children": [],
                            "label": "箱号",
                            "value": 20
                          },
                          {
                            "children": [],
                            "label": "批次属性",
                            "value": 30
                          }
                        ],
                        "x-designable-id": "8cqscsowirg",
                        "x-index": 0
                      }
                    }
                  },
                  "3j44drok76z": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "3j44drok76z",
                    "x-index": 4,
                    "properties": {
                      "loopLotAttrName": {
                        "type": "string",
                        "title": "批次属性名称",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入批次属性名称"
                        },
                        "x-decorator-props": {},
                        "name": "loopLotAttrName",
                        "x-designable-id": "al5pde4dxlu",
                        "x-index": 0
                      }
                    }
                  },
                  "m7ntpmyse2v": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "m7ntpmyse2v",
                    "x-index": 5,
                    "properties": {
                      "loopTimes": {
                        "type": "number",
                        "title": "滚动次数",
                        "x-decorator": "FormItem",
                        "x-component": "NumberPicker",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入滚动次数"
                        },
                        "x-decorator-props": {},
                        "name": "loopTimes",
                        "x-designable-id": "m2zhb40q7cz",
                        "x-index": 0
                      }
                    }
                  },
                  "qxo0yb400h9": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "qxo0yb400h9",
                    "x-index": 6,
                    "properties": {
                      "max": {
                        "type": "number",
                        "title": "批次最大值",
                        "x-decorator": "FormItem",
                        "x-component": "NumberPicker",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入批次最大值"
                        },
                        "x-decorator-props": {},
                        "name": "max",
                        "x-designable-id": "ngsq3cic7wv",
                        "x-index": 0
                      }
                    }
                  },
                  "d33wd5mlrnm": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "d33wd5mlrnm",
                    "x-index": 7,
                    "properties": {
                      "loopNum": {
                        "type": "number",
                        "title": "每次滚动量",
                        "x-decorator": "FormItem",
                        "x-component": "NumberPicker",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入每次滚动量"
                        },
                        "x-decorator-props": {},
                        "name": "loopNum",
                        "x-designable-id": "ox1fqxfgtr3",
                        "x-index": 0
                      }
                    }
                  },
                  "5ruc71l6ont": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "5ruc71l6ont",
                    "x-index": 8,
                    "properties": {
                      "overdueWarningDays": {
                        "type": "string",
                        "title": "超期警告预警天数",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入超期预告天数"
                        },
                        "x-decorator-props": {},
                        "name": "overdueWarningDays",
                        "x-designable-id": "lx8f1aq17hb",
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
      "hc512r379zf": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "物料分类"
        },
        "x-designable-id": "hc512r379zf",
        "x-index": 2,
        "properties": {
          "materialItemCategory": {
            "type": "object",
            "x-validator": [],
            "name": "materialItemCategory",
            "x-designable-id": "lof69lf9y13",
            "x-index": 0,
            "properties": {
              "s1z1pshe97p": {
                "type": "void",
                "x-component": "FormGrid",
                "x-validator": [],
                "x-component-props": {
                  "maxColumns": 3
                },
                "x-designable-id": "s1z1pshe97p",
                "x-index": 0,
                "properties": {
                  "t4yo1zjxrre": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "t4yo1zjxrre",
                    "x-index": 0,
                    "properties": {
                      "code": {
                        "type": "string",
                        "title": "编码",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入物料编码"
                        },
                        "x-decorator-props": {},
                        "name": "code",
                        "x-designable-id": "u90qu9dydy1",
                        "x-index": 0
                      }
                    }
                  },
                  "oyhg4ntkvcb": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "oyhg4ntkvcb",
                    "x-index": 1,
                    "properties": {
                      "name": {
                        "type": "string",
                        "title": "物料分类名称",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入分类名称"
                        },
                        "x-decorator-props": {},
                        "name": "name",
                        "x-designable-id": "1pm58fuq8m7",
                        "x-index": 0
                      }
                    }
                  },
                  "hc91xwjyv9e": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "hc91xwjyv9e",
                    "x-index": 2,
                    "properties": {
                      "displayName": {
                        "type": "string",
                        "title": "物料分类显示名称",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "物料分类显示名称"
                        },
                        "x-decorator-props": {},
                        "name": "displayName",
                        "x-designable-id": "8vhbh4xja9x",
                        "x-index": 0
                      }
                    }
                  },
                  "qgkpgrnv7ai": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-designable-id": "qgkpgrnv7ai",
                    "x-index": 3,
                    "properties": {
                      "level": {
                        "type": "number",
                        "title": "等级",
                        "x-decorator": "FormItem",
                        "x-component": "NumberPicker",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入等级"
                        },
                        "x-decorator-props": {},
                        "name": "level",
                        "x-designable-id": "mls5qxiuiuo",
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
      "c6vaivzy04p": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "物料批次"
        },
        "x-designable-id": "c6vaivzy04p",
        "x-index": 3,
        "properties": {
          "lotAttrGroup": {
            "type": "object",
            "x-validator": [],
            "x-designable-id": "e1t81q2pn73",
            "x-index": 0,
            "name": "lotAttrGroup",
            "properties": {
              "610yk5t22bh": {
                "type": "void",
                "x-component": "FormGrid",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "610yk5t22bh",
                "x-index": 0,
                "properties": {
                  "0gkfkgfnuc6": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "0gkfkgfnuc6",
                    "x-index": 0,
                    "properties": {
                      "name": {
                        "type": "string",
                        "title": "批次名称",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入批次名称"
                        },
                        "x-decorator-props": {},
                        "name": "name",
                        "x-designable-id": "m45w23yqc9l",
                        "x-index": 0
                      }
                    }
                  },
                  "oax8deuptcg": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "oax8deuptcg",
                    "x-index": 1,
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
                        "x-designable-id": "uyp2xqr2mmr",
                        "x-index": 0
                      }
                    }
                  },
                  "fi96uwtn6r6": {
                    "type": "void",
                    "x-component": "FormGrid.GridColumn",
                    "x-designable-id": "fi96uwtn6r6",
                    "x-index": 2,
                    "properties": {
                      "description": {
                        "type": "string",
                        "title": "批次描述",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "请输入批次描述"
                        },
                        "x-decorator-props": {},
                        "name": "description",
                        "x-designable-id": "iuq31fzuraq",
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
    },
    "x-designable-id": "38t9iyq3wg8"
  }
}