import { ISchema } from '@formily/react'

export const formId: string = "organizationInfo";

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
    "labelWidth": "100px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "dl412m63e7i": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "x-designable-id": "dl412m63e7i",
        "x-index": 0,
        "properties": {
          "wkiiss8clyf": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "wkiiss8clyf",
            "x-index": 0,
            "properties": {
              "name": {
                "type": "string",
                "title": "名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入组织机构名称"
                },
                "x-decorator-props": {},
                "name": "name",
                "x-designable-id": "cbqyivc9m3h",
                "x-index": 0,
                "required": true
              }
            }
          },
          "c3mve5tjjyc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "c3mve5tjjyc",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "parentCode": {
                "type": "string",
                "title": "上级组织",
                "x-decorator": "FormItem",
                "x-component": "SystemOrganizationSelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "parentCode",
                "x-designable-id": "oerihrsldvo",
                "x-index": 0
              }
            }
          },
          "g4td7q5saw6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "g4td7q5saw6",
            "x-index": 2,
            "properties": {
              "organizationType": {
                "title": "组织类型",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "required": true,
                "x-designable-id": "84rpfnjmou1",
                "x-index": 0,
                "enum": [
                  {
                    "children": [],
                    "label": "集团",
                    "value": "10"
                  },
                  {
                    "children": [],
                    "label": "公司",
                    "value": "20"
                  },
                  {
                    "children": [],
                    "label": "工厂",
                    "value": "30"
                  }
                ],
                "name": "organizationType"
              }
            }
          },
          "fbdo7resdpr": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "fbdo7resdpr",
            "x-index": 3,
            "properties": {
              "isPlan": {
                "type": "string | number",
                "title": "计划属性",
                "x-decorator": "FormItem",
                "x-component": "Radio.Group",
                "enum": [
                  {
                    "children": [],
                    "label": "是",
                    "value": "00"
                  },
                  {
                    "children": [],
                    "label": "否",
                    "value": "10"
                  }
                ],
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "isPlan",
                "required": true,
                "x-designable-id": "zdmodq67ryb",
                "x-index": 0
              }
            }
          },
          "u5xxmzz8z3l": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "u5xxmzz8z3l",
            "x-index": 4,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "companyCode": {
                "type": "string",
                "title": "公司编码",
                "x-decorator": "FormItem",
                "x-component": "SystemCompanySelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "companyCode",
                "x-designable-id": "355flia4y4g",
                "x-index": 0,
                "x-reactions": {
                  "dependencies": ["organizationType"],
                  "fulfill": {
                    "state": {
                      "required": "{{$deps[0] === '20'}}"
                    }
                  }
                }
              }
            }
          },
          "b83i6xc8l1i": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "b83i6xc8l1i",
            "x-index": 5,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "factoryCode": {
                "type": "string",
                "title": "工厂编码",
                "x-decorator": "FormItem",
                "x-component": "SystemFactorySelect",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "factoryCode",
                "x-designable-id": "wr3k35fgkyw",
                "x-index": 0,
                "x-reactions": {
                  "dependencies": ["organizationType"],
                  "fulfill": {
                    "state": {
                      "required": "{{$deps[0] === '30'}}"
                    }
                  }
                }
              }
            }
          },
          "t225zlwcl2n": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "t225zlwcl2n",
            "properties": {
              "organizationFunction": {
                "type": "Array<string | number>",
                "title": "组织职能",
                "x-decorator": "FormItem",
                "x-component": "Checkbox.Group",
                "enum": [
                  {
                    "children": [],
                    "label": "财务职能",
                    "value": 1
                  },
                  {
                    "children": [],
                    "label": "销售职能",
                    "value": 2
                  },
                  {
                    "children": [],
                    "label": "采购职能",
                    "value": 4
                  },
                  {
                    "children": [],
                    "label": "工厂职能",
                    "value": 8
                  },
                  {
                    "children": [],
                    "label": "研发职能",
                    "value": 16
                  }
                ],
                "x-validator": [],
                "x-decorator-props": {},
                "required": true,
                "name": "organizationFunction",
                "x-designable-id": "zuybkq8ymnj",
                "x-index": 0
              }
            },
            "x-index": 6
          },
          "0bzma87y2a1": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "0bzma87y2a1",
            "x-index": 7,
            "properties": {
              "r5sid0i6f7f": {
                "type": "string",
                "title": "备注",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "r5sid0i6f7f",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "9eadviqgmtb"
  }
}