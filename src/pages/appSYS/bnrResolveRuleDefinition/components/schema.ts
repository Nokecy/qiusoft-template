import { ISchema } from '@formily/react';

export const formId: string = 'barCodeResolveRule';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "90px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "rf8c1hhm76q": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3,
          "strictAutoFit": true
        },
        "x-designable-id": "rf8c1hhm76q",
        "x-index": 0,
        "properties": {
          "3z4d92urvpl": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "3z4d92urvpl",
            "x-index": 0,
            "properties": {
              "name": {
                "type": "string",
                "title": "名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入名称"
                },
                "x-decorator-props": {},
                "name": "name",
                "required": true,
                "x-designable-id": "geo89v5cgcx",
                "x-index": 0
              }
            }
          },
          "zdbzrj0w266": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "x-designable-id": "zdbzrj0w266",
            "x-index": 1,
            "properties": {
              "description": {
                "type": "string",
                "title": "描述",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入描述"
                },
                "x-decorator-props": {},
                "name": "description",
                "required": false,
                "x-designable-id": "ed4ht7jkyc3",
                "x-index": 0
              }
            }
          },
          "w04khgcb74n": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "w04khgcb74n",
            "x-index": 2,
            "properties": {
              "length": {
                "type": "number",
                "title": "条码长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入长度"
                },
                "x-decorator-props": {},
                "name": "length",
                "required": true,
                "x-designable-id": "jhr1h5hntd0",
                "x-index": 0
              }
            }
          },
          "5lfz54j4qor": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "x-designable-id": "5lfz54j4qor",
            "x-index": 3,
            "properties": {
              "{value:barCodeType,label:barCodeTypeName}": {
                "type": "string",
                "title": "序列类型",
                "x-decorator": "FormItem",
                "x-component": "BnrSequenceTypeSelect",
                "x-validator": [],
                "x-component-props": {
                  "labelInValue": true
                },
                "x-decorator-props": {},
                "name": "{value:barCodeType,label:barCodeTypeName}",
                "required": true,
                "x-designable-id": "bwha7e96e5x",
                "x-index": 0
              }
            }
          },
          "tz5tfemif1e": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "tz5tfemif1e",
            "x-index": 4,
            "properties": {
              "expression": {
                "type": "string",
                "title": "表达式",
                "x-decorator": "FormItem",
                "x-component": "FormilyRegexEditor",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入正则表达式",
                  "height": "120px",
                  "showComplexity": true,
                  "showTester": true,
                  "showVisualization": true,
                  "defaultActiveTab": "editor"
                },
                "x-decorator-props": {},
                "name": "expression",
                "required": true,
                "x-designable-id": "7qheqa31m2v",
                "x-index": 0
              }
            }
          },
          "d3gp5pinv55": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "d3gp5pinv55",
            "x-index": 5,
            "properties": {
              "fixedItemCode": {
                "type": "string",
                "title": "固定编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入固定编码"
                },
                "x-decorator-props": {},
                "x-designable-id": "9m6qz2o5zv5",
                "x-index": 0,
                "name": "fixedItemCode"
              }
            }
          },
          "4ozgxpw5jip": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "4ozgxpw5jip",
            "x-index": 6,
            "properties": {
              "itemCodePrefix": {
                "type": "string",
                "title": "编码前缀",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "itemCodePrefix",
                "x-designable-id": "qt6mgtiikhv",
                "x-index": 0
              }
            }
          },
          "2i2jm0faxkb": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2i2jm0faxkb",
            "x-index": 7,
            "properties": {
              "itemStart": {
                "type": "number",
                "title": "编码位置",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入编码位置"
                },
                "x-decorator-props": {},
                "x-designable-id": "cg78n0idw0l",
                "x-index": 0,
                "name": "itemStart"
              }
            }
          },
          "msgmzkgxgy9": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "msgmzkgxgy9",
            "x-index": 8,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "properties": {
              "itemLength": {
                "type": "number",
                "title": "编码长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入编码长度"
                },
                "x-decorator-props": {},
                "x-designable-id": "jbkdjn5z72e",
                "x-index": 0,
                "name": "itemLength"
              }
            }
          },
          "hd0zh58caq7": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "hd0zh58caq7",
            "x-index": 9,
            "properties": {
              "snStart": {
                "type": "number",
                "title": "SN位置",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入SN位置"
                },
                "x-decorator-props": {},
                "x-designable-id": "zclcd61duk4",
                "x-index": 0,
                "name": "snStart"
              }
            }
          },
          "xaxvzqpxqhj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xaxvzqpxqhj",
            "x-index": 10,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "properties": {
              "snLength": {
                "type": "number",
                "title": "SN长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入SN长度"
                },
                "x-decorator-props": {},
                "x-designable-id": "q1dcilstdze",
                "x-index": 0,
                "name": "snLength"
              }
            }
          },
          "9melemage3t": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "9melemage3t",
            "x-index": 11,
            "properties": {
              "versionStart": {
                "type": "number",
                "title": "版本位置",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入版本位置"
                },
                "x-decorator-props": {},
                "x-designable-id": "1ydoryac5et",
                "x-index": 0,
                "name": "versionStart"
              }
            }
          },
          "oucyfwezvgu": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "oucyfwezvgu",
            "x-index": 12,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "properties": {
              "versionLength": {
                "type": "number",
                "title": "版本长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入版本长度"
                },
                "x-decorator-props": {},
                "x-designable-id": "dy2wy6ftdyj",
                "x-index": 0,
                "name": "versionLength"
              }
            }
          },
          "1a6rxo26qim": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "1a6rxo26qim",
            "x-index": 13,
            "properties": {
              "supplierStart": {
                "type": "number",
                "title": "供应商位置",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入供应商位置"
                },
                "x-decorator-props": {},
                "x-designable-id": "xl3hwd4z2ir",
                "x-index": 0,
                "name": "supplierStart"
              }
            }
          },
          "0ip18ipd59c": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "0ip18ipd59c",
            "x-index": 14,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "properties": {
              "supplierLength": {
                "type": "number",
                "title": "供应商长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入供应商长度"
                },
                "x-decorator-props": {},
                "x-designable-id": "cyeb348co2f",
                "x-index": 0,
                "name": "supplierLength"
              }
            }
          },
          "awtopi10ufe": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "awtopi10ufe",
            "x-index": 15,
            "properties": {
              "quantityStart": {
                "type": "number",
                "title": "数量位置",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "quantityStart",
                "x-designable-id": "4hwyxyl5oxy",
                "x-index": 0
              }
            }
          },
          "kwzucek81zq": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "x-designable-id": "kwzucek81zq",
            "x-index": 16,
            "properties": {
              "quantityLength": {
                "type": "number",
                "title": "数量长度",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "quantityLength",
                "x-designable-id": "kqsf7193n0n",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "xe0ikoe20v5"
  }
};
