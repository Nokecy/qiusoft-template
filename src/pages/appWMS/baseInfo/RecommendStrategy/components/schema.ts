import { ISchema } from '@formily/react'

export const formId: string = "appSettlement.BaseInfo.RecommendStrategy";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "74px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "mxm11maaduw": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 4
        },
        "x-designable-id": "mxm11maaduw",
        "x-index": 0,
        "properties": {
          "32nfnrvat9k": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "32nfnrvat9k",
            "x-index": 0,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "properties": {
              "name": {
                "type": "string",
                "title": "策略名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入策略名称"
                },
                "x-decorator-props": {},
                "name": "name",
                "x-designable-id": "mxsvd1z43bl",
                "x-index": 0,
                "required": true
              }
            }
          },
          "x7l3d64rzmj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "x7l3d64rzmj",
            "x-index": 1,
            "properties": {
              "{value:providerName,label:providerDescription}": {
                "type": "string",
                "title": "策略项",
                "x-decorator": "FormItem",
                "x-component": "RecommendStrategyProviderSelect",
                "x-validator": [],
                "x-component-props": {
                  "style": {
                    "width": "inherit"
                  }
                },
                "x-decorator-props": {},
                "name": "{value:providerName,label:providerDescription}",
                "x-designable-id": "ao27ohqcyj6",
                "x-index": 0,
                "required": true
              }
            }
          },
          "vni0frzm8ar": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "vni0frzm8ar",
            "x-index": 2,
            "properties": {
              "materialRecommendType": {
                "title": "物料推荐类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请选择物料推荐类型",
                  "allowClear": true
                },
                "x-decorator-props": {},
                "name": "materialRecommendType",
                "enum": [
                  {
                    "children": [],
                    "label": "物料编码",
                    "value": 0
                  },
                  {
                    "children": [],
                    "label": "物料分类",
                    "value": 1
                  }
                ],
                "x-designable-id": "p9emhao4a68",
                "x-index": 0
              }
            }
          },
          "uoxzzo6k4na": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "uoxzzo6k4na",
            "x-index": 3,
            "properties": {
              "materialItemCategoryCodeArr": {
                "type": "string",
                "title": "物料分类",
                "x-decorator": "FormItem",
                "x-component": "MaterialItemCategorySelect",
                "x-validator": [],
                "x-component-props": {
                  "mode": "multiple"
                },
                "x-decorator-props": {},
                "x-designable-id": "115wrov7vfr",
                "x-index": 0,
                "name": "materialItemCategoryCodeArr",
                "required": true,
                "x-reactions": {
                  "dependencies": [
                    {
                      "property": "value",
                      "type": "any",
                      "source": "mxm11maaduw.vni0frzm8ar.materialRecommendType",
                      "name": "materialRecommendType"
                    }
                  ],
                  "fulfill": {
                    "state": {
                      "required": "{{$deps.materialRecommendType === 1}}"
                    }
                  }
                }
              }
            }
          },
          "fmxlhlhhmzt": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "fmxlhlhhmzt",
            "x-index": 4,
            "properties": {
              "{value:warehouseId,label:warehouseName}": {
                "type": "string",
                "title": "仓库",
                "x-decorator": "FormItem",
                "x-component": "WarehouseSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "80l3lnq3i5l",
                "x-index": 0,
                "name": "{value:warehouseId,label:warehouseName}",
                "required": true
              }
            }
          },
          "may25c5i44l": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "may25c5i44l",
            "x-index": 5,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "priorityLevel": {
                "type": "number",
                "title": "优先级",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入优先级"
                },
                "x-decorator-props": {},
                "name": "priorityLevel",
                "x-designable-id": "1ejrmy8ck2b",
                "x-index": 0
              }
            }
          },
          "5qzis8fqk6t": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "5qzis8fqk6t",
            "x-index": 6,
            "x-validator": [],
            "x-component-props": {}
          },
          "i3tsx47kylj": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 4
            },
            "title": "",
            "x-designable-id": "i3tsx47kylj",
            "x-index": 7,
            "properties": {
              "warehouseLocationCodeArr": {
                "type": "string",
                "title": "库位",
                "x-decorator": "FormItem",
                "x-component": "WareHouseLocationSelect",
                "x-validator": [],
                "x-component-props": {
                  "mode": "multiple"
                },
                "x-decorator-props": {},
                "name": "warehouseLocationCodeArr",
                "required": false,
                "x-designable-id": "wym80dumdox",
                "x-index": 0
              }
            }
          },
          "sodgf7m98fd": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 4
            },
            "x-designable-id": "sodgf7m98fd",
            "x-index": 8,
            "properties": {
              "warehouseZoneCodeArr": {
                "type": "string",
                "title": "库区",
                "x-decorator": "FormItem",
                "x-component": "WareHouseZoneSelect",
                "x-validator": [],
                "x-component-props": {
                  "warehouseId": "{{$form.values.warehouseId}}",
                  "mode": "multiple"
                },
                "x-decorator-props": {},
                "x-designable-id": "ln9zoja0t7n",
                "x-index": 0,
                "name": "warehouseZoneCodeArr",
                "required": false
              }
            }
          },
          "4wyt7wb6uzt": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 4
            },
            "x-designable-id": "4wyt7wb6uzt",
            "x-index": 9,
            "properties": {
              "description": {
                "type": "string",
                "title": "描述",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入描述"
                },
                "x-decorator-props": {},
                "name": "description",
                "x-designable-id": "bo4imdas4v3",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "8q270dh35p9"
  }
}