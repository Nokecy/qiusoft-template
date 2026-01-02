import { ISchema } from '@formily/react'

export const formId: string = "Company";

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
    "wrapperWidth": "auto",
    "labelWidth": "75px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "0hyi4rvc7d6": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "x-designable-id": "0hyi4rvc7d6",
        "x-index": 0,
        "properties": {
          "uwf6c5g8bno": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "title": "",
            "required": false,
            "x-designable-id": "uwf6c5g8bno",
            "x-index": 0,
            "properties": {
              "code": {
                "type": "string",
                "title": "公司编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "code",
                "required": true,
                "x-designable-id": "okylndbykcf",
                "x-index": 0
              }
            }
          },
          "rfqyxzuso4m": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "rfqyxzuso4m",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "chinaName": {
                "type": "string",
                "title": "中文名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "chinaName",
                "required": true,
                "x-designable-id": "ep3somvzdxw",
                "x-index": 0
              }
            }
          },
          "sd95sw5idb0": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "sd95sw5idb0",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "englishName": {
                "type": "string",
                "title": "英文名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "englishName",
                "required": false,
                "x-designable-id": "vyzfrxl3rdh",
                "x-index": 0
              }
            }
          },
          "p24m5uknc5d": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "p24m5uknc5d",
            "x-index": 3,
            "properties": {
              "addr": {
                "type": "string",
                "title": "联系地址",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "addr",
                "x-designable-id": "fp2b4u950p3",
                "x-index": 0,
                "required": true
              }
            }
          },
          "bf21gjztjoe": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "bf21gjztjoe",
            "x-index": 4,
            "properties": {
              "invoiceAddr": {
                "type": "string",
                "title": "发票地址",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "invoiceAddr",
                "x-designable-id": "85cqhdxfd4y",
                "x-index": 0
              }
            }
          },
          "gxzj6klobrx": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "gxzj6klobrx",
            "x-index": 5,
            "properties": {
              "tel": {
                "type": "string",
                "title": "联系电话",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "tel",
                "x-designable-id": "fy805pxoivq",
                "x-index": 0,
                "required": false
              }
            }
          },
          "3aiugheonww": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "3aiugheonww",
            "x-index": 6,
            "properties": {
              "websit": {
                "type": "string",
                "title": "网址",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": "url",
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "websit",
                "x-designable-id": "bprmkvwuxzv",
                "x-index": 0
              }
            }
          },
          "9vdtwecn2a8": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "9vdtwecn2a8",
            "x-index": 7,
            "properties": {
              "email": {
                "type": "string",
                "title": "邮箱",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": "email",
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "email",
                "x-designable-id": "wy3o4llbfpu",
                "x-index": 0,
                "required": false
              }
            }
          }
        }
      }
    },
    "x-designable-id": "9zp7djr8snw"
  }
}