import { ISchema } from '@formily/react'

export const formId: string = "Wms.MaterialItemLifeDay";

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
              },
              // "materialItemDescription": {
              //   "type": "string",
              //   "title": "物料描述",
              //   "x-decorator": "FormItem",
              //   "x-component": "Input",
              //   "x-pattern": "readPretty",
              //   "x-component-props": {
              //     "placeholder": "选择物料后自动显示描述"
              //   },
              //   "x-decorator-props": {},
              //   "name": "materialItemDescription",
              //   "x-designable-id": "material_desc_field",
              //   "x-index": 1,
              //   "x-reactions": [
              //     {
              //       "dependencies": ["{value:materialItemId,label:materialItemCode}"],
              //       "fulfill": {
              //         "state": {
              //           "value": "{{$deps[0] && $deps[0].data && $deps[0].data.description ? $deps[0].data.description : '暂无描述'}}"
              //         }
              //       }
              //     }
              //   ]
              // }
            }
          },
          "soytpf6limo": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "soytpf6limo",
            "x-index": 1,
            "properties": {
              "version": {
                "type": "string",
                "title": "物料版本",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "version",
                "required": false,
                "x-designable-id": "rgmk6l4chs4",
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
              "supplierCode": {
                "type": "string",
                "title": "供应商编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "supplierCode",
                "required": false,
                "x-designable-id": "k14w15md6w6",
                "x-index": 0
              }
            }
          },
          "xhmakf15zt6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "xhmakf15zt6",
            "x-index": 3,
            "properties": {
              "manufacturerName": {
                "type": "string",
                "title": "制造商名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "manufacturerName",
                "x-designable-id": "j9eyoithfbf",
                "x-index": 0
              }
            }
          },
          "omv141y9poc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "omv141y9poc",
            "x-index": 4,
            "properties": {
              "shelfLifeDays": {
                "type": "number",
                "title": "存储周期(天)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "shelfLifeDays",
                "required": true,
                "x-designable-id": "xzt0ig283nf",
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
              "maxinumShelfLifeDays": {
                "type": "number",
                "title": "最大存储周期(天)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入"
                },
                "x-decorator-props": {},
                "name": "maxinumShelfLifeDays",
                "required": true,
                "x-designable-id": "emswmcxeeyg",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "poha2t53eua"
  }
}