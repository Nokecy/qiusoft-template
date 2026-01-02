import { ISchema } from '@formily/react'

export const formId: string = "WMS.base.materialItemManageSetting.two";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "110px",
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
            "x-component-props": {},
            "properties": {
              "{value:materialItemId,label:materialItemCode}": {
                "type": "string",
                "title": "物料选择器",
                "x-decorator": "FormItem",
                "x-component": "MaterailItemSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:materialItemId,label:materialItemCode}",
                "required": true,
                "x-designable-id": "xncgub3pl1d",
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
              "{value:managerId,label:managerName}": {
                "type": "string",
                "title": "原管理员",
                "x-decorator": "FormItem",
                "x-component": "WarehouseManSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "required": true,
                "x-designable-id": "9yavp3siiad",
                "x-index": 0,
                "name": "{value:managerId,label:managerName}"
              }
            }
          },
          "7aoic968rdu": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "7aoic968rdu",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:toManagerId,label:toManagerName}": {
                "type": "string",
                "title": "替换管理员",
                "x-decorator": "FormItem",
                "x-component": "WarehouseManSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "required": true,
                "x-designable-id": "v8rz5k5is4s",
                "x-index": 0,
                "name": "{value:toManagerId,label:toManagerName}"
              }
            }
          },
          "yqx6fssdsrf": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "yqx6fssdsrf",
            "properties": {
              "{value:materialItemCategoryId,label:materialItemCategoryName}": {
                "type": "string",
                "title": "物料分类",
                "x-decorator": "FormItem",
                "x-component": "MaterialItemCategorySelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:materialItemCategoryId,label:materialItemCategoryName}",
                "x-designable-id": "rbklirrtcdm",
                "x-index": 0
              }
            },
            "x-index": 4
          },
          "40j10yw1jgi": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "40j10yw1jgi",
            "properties": {
              "{value:realRightInfoId,label:realRightInfoName}": {
                "type": "string",
                "title": "物权信息",
                "x-decorator": "FormItem",
                "x-component": "RealRightNameSelect",
                "x-validator": [],
                "x-component-props": {
                  "showId":true
                },
                "x-decorator-props": {},
                "name": "{value:realRightInfoId,label:realRightInfoName}",
                "x-designable-id": "1xh7dw7rq88",
                "x-index": 0
              }
            },
            "x-index": 5
          }
        }
      }
    },
    "x-designable-id": "poha2t53eua"
  }
}