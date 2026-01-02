import { ISchema } from '@formily/react'

export const formId: string = "Wms.FactoryZone";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "80px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "y0j5i6j8jfx": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "x-designable-id": "y0j5i6j8jfx",
        "x-index": 0,
        "properties": {
          "negkgi9n8uw": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "negkgi9n8uw",
            "x-index": 0,
            "properties": {
              "code": {
                "type": "string",
                "title": "编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "code",
                "required": true,
                "x-designable-id": "vs0d7ueknwc",
                "x-index": 0
              }
            }
          },
          "soytpf6limo": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "soytpf6limo",
            "x-index": 1,
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
                "name": "name",
                "required": true,
                "x-designable-id": "rgmk6l4chs4",
                "x-index": 0
              }
            }
          },
          "2ebd6aig97y": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2ebd6aig97y",
            "x-index": 2,
            "properties": {
              "factoryType": {
                "type": "string",
                "title": "厂区类型",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "factoryType",
                "required": true,
                "x-designable-id": "n6jc0mqpab9",
                "x-index": 0
              }
            }
          },
          "p1l405w8ybl": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "x-designable-id": "p1l405w8ybl",
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
                "x-decorator-props": {},
                "name": "address",
                "x-designable-id": "4gt49buq65i",
                "x-index": 0
              }
            }
          },
          "942sfrxspoz": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "942sfrxspoz",
            "properties": {
              "{value:parentId,label:parentName}": {
                "type": "string",
                "title": "父级",
                "x-decorator": "FormItem",
                "x-component": "FactoryZoneSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:parentId,label:parentName}",
                "x-designable-id": "eqrfzex5p0h",
                "x-index": 0
              }
            },
            "x-index": 4
          },
          "2a8xlxdz31t": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2a8xlxdz31t",
            "properties": {
              "generateTreePath": {
                "type": "boolean",
                "title": "是否参与生成树路径",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "generateTreePath",
                "x-designable-id": "nv80wtnruho",
                "x-index": 0
              }
            },
            "x-index": 5
          },
          "8f7cfcfbgtw": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "8f7cfcfbgtw",
            "properties": {
              "memo": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "memo",
                "x-designable-id": "gp39m2f3mpp",
                "x-index": 0
              }
            },
            "x-index": 6
          }
        }
      }
    },
    "x-designable-id": "8g1gjco3rcx"
  }
}