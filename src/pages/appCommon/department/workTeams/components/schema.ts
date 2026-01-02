import { ISchema } from '@formily/react';

export const formId: string = "Common.WorkTeams";

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
          "code": {
            "type": "string",
            "title": "班组编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入班组编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "班组名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入班组名称"
            },
            "required": true
          },
          "workCenterCode": {
            "type": "string",
            "title": "所属工作中心",
            "x-decorator": "FormItem",
            "x-component": "WorkCenterSelect",
            "x-component-props": {
              "placeholder": "请选择工作中心",
              "useCode": true,
              "allowClear": true
            }
          },
          "{value:teamLeadCode,label:teamLeadName}": {
            "type": "string", 
            "title": "班组长",
            "x-decorator": "FormItem",
            "x-component": "EmployeeSelect",
            "x-component-props": {
              "placeholder": "请选择班组长",
              "labelInValue": true,
              "allowClear": true
            }
          },
          "leadTel": {
            "type": "string",
            "title": "联系方式",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入联系方式"
            }
          },
          "memo": {
            "type": "string",
            "title": "备注",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入备注",
              "rows": 3
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          }
        }
      }
    }
  }
}