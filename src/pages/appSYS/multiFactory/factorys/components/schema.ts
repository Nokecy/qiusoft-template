import { ISchema } from '@formily/react'

export const formId: string = "factorys";

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
                "title": "工厂编码",
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
              "name": {
                "type": "string",
                "title": "工厂名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "name",
                "required": true,
                "x-designable-id": "ep3somvzdxw",
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
            "x-index": 2,
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
                "required": true
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
              "address": {
                "type": "string",
                "title": "地址",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "address",
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
              "deliveryAddr": {
                "type": "string",
                "title": "送货地址",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "deliveryAddr",
                "x-designable-id": "85cqhdxfd4y",
                "x-index": 0
              }
            }
          },
          "3aiugheonww": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "3aiugheonww",
            "x-index": 5,
            "properties": {
              "memo": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {
                  "labelWidth": "75px"
                },
                "name": "memo",
                "x-designable-id": "pxq0xw9cxsd",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "jtbva44veyc"
  }
}