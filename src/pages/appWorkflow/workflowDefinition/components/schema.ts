import { ISchema } from '@formily/react'

export const formId: string = "workflowDefinition";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "l0s7w0zdsj0": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "l0s7w0zdsj0",
        "x-index": 0,
        "properties": {
          "x76yi3wb604": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "x76yi3wb604",
            "x-index": 0,
            "properties": {
              "name": {
                "type": "string",
                "title": "名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入名称"
                },
                "x-decorator-props": {},
                "name": "name",
                "required": true,
                "x-designable-id": "mlv9dkukqyo",
                "x-index": 0
              }
            }
          },
          "2360ih8iy8v": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "2360ih8iy8v",
            "x-index": 1,
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
                "x-designable-id": "3nyjclcig1a",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "agv38u3j3l1"
  }
}