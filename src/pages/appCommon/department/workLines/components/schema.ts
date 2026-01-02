import { ISchema } from '@formily/react';

export const formId: string = "Common.WorkLines";

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
            "title": "线体编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入线体编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "线体名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入线体名称"
            },
            "required": true
          },
          "workCode": {
            "type": "string",
            "title": "车间编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入车间编码"
            }
          },
          "workName": {
            "type": "string",
            "title": "车间名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入车间名称"
            }
          },
          "workTeamCode": {
            "type": "string",
            "title": "班组编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入班组编码"
            }
          },
          "workTeamName": {
            "type": "string",
            "title": "班组名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入班组名称"
            }
          },
          "startTime": {
            "type": "string",
            "title": "开始时间",
            "x-decorator": "FormItem",
            "x-component": "DatePicker",
            "x-component-props": {
              "placeholder": "请选择开始时间"
            }
          },
          "endTime": {
            "type": "string",
            "title": "结束时间",
            "x-decorator": "FormItem",
            "x-component": "DatePicker",
            "x-component-props": {
              "placeholder": "请选择结束时间"
            }
          },
          "stationNum": {
            "type": "number",
            "title": "工位数量",
            "x-decorator": "FormItem",
            "x-component": "InputNumber",
            "x-component-props": {
              "placeholder": "请输入工位数量",
              "min": 0
            }
          },
          "employNum": {
            "type": "number",
            "title": "人员数量",
            "x-decorator": "FormItem",
            "x-component": "InputNumber",
            "x-component-props": {
              "placeholder": "请输入人员数量",
              "min": 0
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