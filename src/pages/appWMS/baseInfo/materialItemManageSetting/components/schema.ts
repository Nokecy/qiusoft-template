import { ISchema } from '@formily/react'

export const formId: string = "WMS.base.supplier";

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
              "{value:managerId,label:managerName}": {
                "type": "string",
                "title": "管理员",
                "x-decorator": "FormItem",
                "x-component": "WarehouseManSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "9yavp3siiad",
                "x-index": 0,
                "name": "{value:managerId,label:managerName}",
                "required": true
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
              "{value:wareHouseId,label:wareHouseName}": {
                "type": "string",
                "title": "所属仓库",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "soofx4xaw4o",
                "x-index": 0,
                "name": "{value:wareHouseId,label:wareHouseName}",
                "required": false
              }
            }
          },
          "xhmakf15zt6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xhmakf15zt6",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:materialItemId,label:materialItemCode}": {
                "type": "string",
                "title": "物料",
                "x-decorator": "FormItem",
                "x-component": "MaterailItemSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:materialItemId,label:materialItemCode}",
                "x-designable-id": "xncgub3pl1d",
                "x-index": 0
              }
            }
          },
          "yqx6fssdsrf": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "yqx6fssdsrf",
            "x-index": 4,
            "properties": {
              "{value:warehouseTeamId,label:warehouseTeamName}": {
                "type": "string",
                "title": "所属班组",
                "x-decorator": "FormItem",
                "x-component": "WareHouseTeamSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "udlom20tvma",
                "x-index": 0,
                "name": "{value:warehouseTeamId,label:warehouseTeamName}"
              }
            }
          },
          "40j10yw1jgi": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "40j10yw1jgi",
            "x-index": 5
          }
        }
      }
    },
    "x-designable-id": "093qazfh6xf"
  }
}