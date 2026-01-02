import { ISchema } from '@formily/react'

export const formId: string = "Wms.MaterialItemCategory";

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
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "properties": {
              "code": {
                "type": "string",
                "title": "编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入编码"
                },
                "x-decorator-props": {},
                "name": "code",
                "required": true,
                "x-designable-id": "o3t6if7zmt7",
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
            "x-component-props": {
              "gridSpan": 1
            },
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
                "x-designable-id": "rgmk6l4chs4",
                "x-index": 0
              }
            }
          },
          "xhmakf15zt6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xhmakf15zt6",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 1
            },
            "properties": {
              "displayName": {
                "type": "string",
                "title": "显示名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入显示名称"
                },
                "x-decorator-props": {},
                "name": "displayName",
                "x-designable-id": "28km4kgym8o",
                "x-index": 0
              }
            }
          },
          "mita9h8vtj7": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "mita9h8vtj7",
            "properties": {
              "parentId": {
                "type": "string",
                "title": "上级分类",
                "x-decorator": "FormItem",
                "x-component": "MaterialItemCategorySelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "parentId",
                "x-designable-id": "auoe2vm5pi6",
                "x-index": 0
              }
            },
            "x-index": 3
          },
          "uxqf7g6tf52": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "x-designable-id": "uxqf7g6tf52",
            "properties": {
              "displayName": {
                "type": "string",
                "title": "描述",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "displayName",
                "required": false,
                "x-designable-id": "k14w15md6w6",
                "x-index": 0
              }
            },
            "x-index": 4
          }
        }
      }
    },
    "x-designable-id": "zt0xpcqwsad"
  }
}