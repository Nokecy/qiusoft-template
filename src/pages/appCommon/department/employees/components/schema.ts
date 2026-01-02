import { ISchema } from '@formily/react';

export const formId: string = "Common.Employees";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 18,
    "labelWidth": "120px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "grid": {
        "type": "void",
        "x-component": "FormGrid",
        "x-component-props": {
          "maxColumns": 2,
          "strictAutoFit": true
        },
        "properties": {
          // 基本信息分组
          "basicInfoTitle": {
            "type": "void",
            "x-component": "FormGrid",
            "x-component-props": {
              "maxColumns": 1
            },
            "x-decorator": "FormItem",
            "x-decorator-props": {
              "gridSpan": 2,
              "asterisk": false,
              "feedbackLayout": "none"
            },
            "properties": {
              "basicInfoDivider": {
                "type": "void",
                "x-component": "div",
                "x-component-props": {
                  "style": {
                    "fontSize": "16px",
                    "fontWeight": "600",
                    "marginBottom": "16px",
                    "paddingBottom": "8px",
                    "borderBottom": "1px solid #e8e8e8"
                  },
                  "children": "基本信息"
                }
              }
            }
          },
          "code": {
            "type": "string",
            "title": "工号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入工号",
              "maxLength": 50
            },
            "required": true,
            "x-validator": [
              {
                "required": true,
                "message": "请输入工号"
              },
              {
                "pattern": "^[A-Za-z0-9_-]+$",
                "message": "工号只能包含字母、数字、下划线和短横线"
              }
            ]
          },
          "name": {
            "type": "string",
            "title": "姓名",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入姓名",
              "maxLength": 50
            },
            "required": true,
            "x-validator": {
              "required": true,
              "message": "请输入姓名"
            }
          },
          "sex": {
            "type": "number",
            "title": "性别",
            "x-decorator": "FormItem",
            "x-component": "Radio.Group",
            "x-component-props": {
              "optionType": "button",
              "buttonStyle": "solid"
            },
            "enum": [
              { "label": "男", "value": 1 },
              { "label": "女", "value": 0 }
            ]
          },
          "birthday": {
            "type": "string",
            "title": "出生日期",
            "x-decorator": "FormItem",
            "x-component": "DatePicker",
            "x-component-props": {
              "placeholder": "请选择出生日期",
              "format": "YYYY-MM-DD"
            }
          },
          "idCode": {
            "type": "string",
            "title": "身份证号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入身份证号",
              "maxLength": 18
            },
            "x-validator": {
              "pattern": "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
              "message": "请输入正确的身份证号码"
            }
          },
          "marriage": {
            "type": "string",
            "title": "婚姻状态",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择婚姻状态",
              "allowClear": true
            },
            "enum": [
              { "label": "未婚", "value": "Single" },
              { "label": "已婚", "value": "Married" },
              { "label": "离异", "value": "Divorced" },
              { "label": "丧偶", "value": "Widowed" }
            ]
          },
          "status": {
            "type": "string",
            "title": "员工状态",
            "x-decorator": "FormItem",
            "x-component": "Radio.Group",
            "x-component-props": {
              "optionType": "button"
            },
            "default": "1",
            "enum": [
              { "label": "在职", "value": "1" },
              { "label": "离职", "value": "0" }
            ]
          },
          "avatarBlobName": {
            "type": "string",
            "title": "头像文件ID",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入头像文件ID"
            },
            "x-decorator-props": {
              "tooltip": "先上传图片获取文件ID，然后在此输入",
              "gridSpan": 2
            }
          },

          // 联系方式分组
          "contactInfoTitle": {
            "type": "void",
            "x-component": "FormGrid",
            "x-component-props": {
              "maxColumns": 1
            },
            "x-decorator": "FormItem",
            "x-decorator-props": {
              "gridSpan": 2,
              "asterisk": false,
              "feedbackLayout": "none"
            },
            "properties": {
              "contactInfoDivider": {
                "type": "void",
                "x-component": "div",
                "x-component-props": {
                  "style": {
                    "fontSize": "16px",
                    "fontWeight": "600",
                    "marginTop": "16px",
                    "marginBottom": "16px",
                    "paddingBottom": "8px",
                    "borderBottom": "1px solid #e8e8e8"
                  },
                  "children": "联系方式"
                }
              }
            }
          },
          "mobile": {
            "type": "string",
            "title": "手机号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入手机号",
              "maxLength": 11
            },
            "x-validator": {
              "pattern": "^1[3-9]\\d{9}$",
              "message": "请输入正确的手机号码"
            }
          },
          "tel": {
            "type": "string",
            "title": "联系电话",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入联系电话"
            }
          },
          "email": {
            "type": "string",
            "title": "邮箱",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入邮箱"
            },
            "x-validator": {
              "format": "email",
              "message": "请输入正确的邮箱地址"
            }
          },
          "address": {
            "type": "string",
            "title": "联系地址",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入联系地址",
              "rows": 2,
              "maxLength": 200,
              "showCount": true
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          },

          // 工作信息分组
          "workInfoTitle": {
            "type": "void",
            "x-component": "FormGrid",
            "x-component-props": {
              "maxColumns": 1
            },
            "x-decorator": "FormItem",
            "x-decorator-props": {
              "gridSpan": 2,
              "asterisk": false,
              "feedbackLayout": "none"
            },
            "properties": {
              "workInfoDivider": {
                "type": "void",
                "x-component": "div",
                "x-component-props": {
                  "style": {
                    "fontSize": "16px",
                    "fontWeight": "600",
                    "marginTop": "16px",
                    "marginBottom": "16px",
                    "paddingBottom": "8px",
                    "borderBottom": "1px solid #e8e8e8"
                  },
                  "children": "工作信息"
                }
              }
            }
          },
          "departCode": {
            "type": "string",
            "title": "所属部门",
            "x-decorator": "FormItem",
            "x-component": "DepartmentSelect",
            "x-component-props": {
              "placeholder": "请选择所属部门",
              "useCode": true
            }
          },
          "hireDate": {
            "type": "string",
            "title": "入职日期",
            "x-decorator": "FormItem",
            "x-component": "DatePicker",
            "x-component-props": {
              "placeholder": "请选择入职日期",
              "format": "YYYY-MM-DD"
            }
          },

          // 紧急联系人分组
          "emergencyContactTitle": {
            "type": "void",
            "x-component": "FormGrid",
            "x-component-props": {
              "maxColumns": 1
            },
            "x-decorator": "FormItem",
            "x-decorator-props": {
              "gridSpan": 2,
              "asterisk": false,
              "feedbackLayout": "none"
            },
            "properties": {
              "emergencyContactDivider": {
                "type": "void",
                "x-component": "div",
                "x-component-props": {
                  "style": {
                    "fontSize": "16px",
                    "fontWeight": "600",
                    "marginTop": "16px",
                    "marginBottom": "16px",
                    "paddingBottom": "8px",
                    "borderBottom": "1px solid #e8e8e8"
                  },
                  "children": "紧急联系人"
                }
              }
            }
          },
          "contactMan": {
            "type": "string",
            "title": "联系人姓名",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入紧急联系人姓名"
            }
          },
          "contactTel": {
            "type": "string",
            "title": "联系人电话",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入紧急联系人电话"
            },
            "x-validator": {
              "pattern": "^1[3-9]\\d{9}$|^(\\d{3,4}-)?\\d{7,8}$",
              "message": "请输入正确的电话号码"
            }
          }
        }
      }
    }
  }
}
