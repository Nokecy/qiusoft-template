import { ISchema } from '@formily/react'

export const formId: string = "tenant";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
    "form": {
      "labelCol": 6,
      "wrapperCol": 12,
      "labelWidth": "120px",
      "feedbackLayout": "none"
    },
    "schema": {
      "type": "object",
      "properties": {
        "dzqiegp04na": {
          "type": "void",
          "x-component": "FormGrid",
          "x-validator": [],
          "x-component-props": {
            "maxColumns": 1
          },
          "x-designable-id": "dzqiegp04na",
          "properties": {
            "5k6q21ki3gb": {
              "type": "void",
              "x-component": "FormGrid.GridColumn",
              "x-designable-id": "5k6q21ki3gb",
              "properties": {
                "name": {
                  "type": "string",
                  "title": "租户名称",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    "placeholder": "请输入租户名称"
                  },
                  "x-decorator-props": {},
                  "name": "name",
                  "required": true,
                  "x-designable-id": "6lb6o991pnr",
                  "x-index": 0
                }
              },
              "x-index": 0
            },
            "tjm82m8fv7a": {
              "type": "void",
              "x-component": "FormGrid.GridColumn",
              "x-designable-id": "tjm82m8fv7a",
              "properties": {
                "adminEmailAddress": {
                  "type": "string",
                  "title": "管理员邮箱",
                  "x-decorator": "FormItem",
                  "x-component": "Input",
                  "x-validator": [],
                  "x-component-props": {
                    "placeholder": "请输入管理员邮箱"
                  },
                  "x-decorator-props": {},
                  "name": "adminEmailAddress",
                  "required": true,
                  "x-designable-id": "qz07ps13gnz",
                  "x-index": 0
                }
              },
              "x-index": 1
            },
            "lc4bq3ji50h": {
              "type": "void",
              "x-component": "FormGrid.GridColumn",
              "x-validator": [],
              "x-component-props": {},
              "x-designable-id": "lc4bq3ji50h",
              "properties": {
                "adminPassword": {
                  "title": "管理员密码",
                  "x-decorator": "FormItem",
                  "x-component": "Password",
                  "x-validator": [],
                  "x-component-props": {
                    "placeholder": "请输入管理员密码"
                  },
                  "x-decorator-props": {},
                  "name": "adminPassword",
                  "required": true,
                  "x-designable-id": "nke6mdtigcw",
                  "x-index": 0
                }
              },
              "x-index": 2
            }
          },
          "x-index": 0
        }
      },
      "x-designable-id": "l92mlvsql36"
    }
  }