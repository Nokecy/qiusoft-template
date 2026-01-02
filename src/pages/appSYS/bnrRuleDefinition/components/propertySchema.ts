import { ISchema } from '@formily/react';

export const propertyFormId: string = "Sys.BNRProperty";

export const propertyFormSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 16,
    "labelWidth": "120px",
    "feedbackLayout": "terse"
  },
  "schema": {
    "type": "object",
    "properties": {
      "card": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "属性定义"
        },
        "properties": {
          "grid": {
            "type": "void",
            "x-component": "FormGrid",
            "x-component-props": {
              "maxColumns": 1,
              "minColumns": 1,
              "strictAutoFit": true
            },
            "properties": {
              "col1": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "name": {
                    "type": "string",
                    "title": "属性名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-component-props": {
                      "placeholder": "请输入"
                    },
                    "required": true
                  }
                }
              },
              "col2": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "displayName": {
                    "type": "string",
                    "title": "显示名称",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-component-props": {
                      "placeholder": "请输入"
                    },
                    "required": true
                  }
                }
              },
              "col3": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "propertyType": {
                    "type": "number",
                    "title": "属性类型",
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                    "x-component-props": {
                      "placeholder": "请选择"
                    },
                    "enum": [
                      { "label": "字符串", "value": 0 },
                      { "label": "整数", "value": 1 },
                      { "label": "小数", "value": 2 },
                      { "label": "布尔", "value": 3 },
                      { "label": "日期时间", "value": 4 },
                      { "label": "枚举", "value": 5 }
                    ],
                    "required": true
                  }
                }
              },
              "col4": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "isRequired": {
                    "type": "boolean",
                    "title": "是否必填",
                    "x-decorator": "FormItem",
                    "x-component": "Switch"
                  }
                }
              },
              "col5": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "defaultValue": {
                    "type": "string",
                    "title": "默认值",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-component-props": {
                      "placeholder": "请输入"
                    }
                  }
                }
              },
              "col6": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "validationRegex": {
                    "type": "string",
                    "title": "验证正则",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-component-props": {
                      "placeholder": "请输入正则表达式"
                    }
                  }
                }
              },
              "col7": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "enumValues": {
                    "type": "string",
                    "title": "枚举值",
                    "x-decorator": "FormItem",
                    "x-component": "Input.TextArea",
                    "x-component-props": {
                      "placeholder": "请输入枚举值，逗号分隔",
                      "rows": 3
                    },
                    "x-reactions": {
                      "dependencies": ["propertyType"],
                      "fulfill": {
                        "state": {
                          "visible": "{{$deps[0] === 5}}"
                        }
                      }
                    }
                  }
                }
              },
              "col8": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "description": {
                    "type": "string",
                    "title": "描述",
                    "x-decorator": "FormItem",
                    "x-component": "Input.TextArea",
                    "x-component-props": {
                      "placeholder": "请输入",
                      "rows": 3
                    }
                  }
                }
              },
              "col9": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "properties": {
                  "displayOrder": {
                    "type": "number",
                    "title": "显示顺序",
                    "x-decorator": "FormItem",
                    "x-component": "NumberPicker",
                    "x-component-props": {
                      "placeholder": "请填写",
                      "precision": 0
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
