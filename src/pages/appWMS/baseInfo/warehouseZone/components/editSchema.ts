import { ISchema } from '@formily/react'

export const formId: string = "WMS.base.warehouseZone.edit";

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
                "title": "库区编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入编码"
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
              "type": {
                "title": "库区类别",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择类别"
                },
                "x-decorator-props": {},
                "name": "type",
                "enum": [
                  {
                    "children": [],
                    "label": "作业区",
                    "value": 5
                  },
                  {
                    "children": [],
                    "label": "虚拟区",
                    "value": 6
                  },
                  {
                    "children": [],
                    "label": "存储区",
                    "value": 10
                  }
                ],
                "x-designable-id": "b7d4xnbbh05",
                "x-index": 0,
                "required": true
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
                "title": "仓库",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "r5wju7yck4o",
                "x-index": 0,
                "name": "{value:wareHouseId,label:wareHouseName}",
                "required": true
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
              "{value:warehouseTeamId,label:warehouseTeamName}": {
                "type": "string",
                "title": "管理班组",
                "x-decorator": "FormItem",
                "x-component": "WareHouseTeamSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "{value:warehouseTeamId,label:warehouseTeamName}",
                "x-designable-id": "o3cy8mh2b26",
                "x-index": 0
              }
            }
          },
          "omv141y9poc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "omv141y9poc",
            "x-index": 4,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "acProperty": {
                "title": "AC属性",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择属性"
                },
                "x-decorator-props": {},
                "name": "acProperty",
                "enum": [
                  {
                    "children": [],
                    "label": "A",
                    "value": "A"
                  },
                  {
                    "children": [],
                    "label": "B",
                    "value": "B"
                  },
                  {
                    "children": [],
                    "label": "C",
                    "value": "C"
                  }
                ],
                "x-designable-id": "kuqac5d0jqp",
                "x-index": 0
              }
            }
          },
          "nv734rlxcqt": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "nv734rlxcqt",
            "x-index": 5,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "isRoHS": {
                "type": "boolean",
                "title": "是否环保",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isRoHS",
                "default": false,
                "x-designable-id": "3wa0mhutz6i",
                "x-index": 0
              }
            }
          },
          "2ebd6aig97y": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "2ebd6aig97y",
            "x-index": 6,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "isMakeOver": {
                "type": "boolean",
                "title": "是否翻新件",
                "x-decorator": "FormItem",
                "x-component": "Switch",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isMakeOver",
                "default": false,
                "x-designable-id": "002lgliybn9",
                "x-index": 0
              }
            }
          },
          "p1l405w8ybl": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "x-designable-id": "p1l405w8ybl",
            "x-index": 7
          },
          "lmtsfk7fq2i": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "lmtsfk7fq2i",
            "properties": {
              "remark": {
                "type": "string",
                "title": "描述",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "remark",
                "x-designable-id": "bpyqy9dild8",
                "x-index": 0
              }
            },
            "x-index": 8
          }
        }
      }
    },
    "x-designable-id": "du66gogqh0n"
  }
}