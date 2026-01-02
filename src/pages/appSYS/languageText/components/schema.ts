import { ISchema } from '@formily/react'

export const formId: string = "languageText";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  shallow: true
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
      "h1utz7808e8": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "h1utz7808e8",
        "properties": {
          "ol0rn6hk1hw": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "ol0rn6hk1hw",
            "properties": {
              "cultureName": {
                "type": "string",
                "title": "语言",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "name": "cultureName",
                "x-designable-id": "j0dpa6y2ase",
                "x-index": 0
              }
            },
            "x-index": 0
          },
          "sbd9m5wxfxi": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "sbd9m5wxfxi",
            "properties": {
              "resourceName": {
                "type": "string",
                "title": "资源名称",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "name": "resourceName",
                "x-designable-id": "xs4zqspvs8r",
                "x-index": 0
              }
            },
            "x-index": 1
          },
          "name": {
            "type": "string",
            "title": "键",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "name": "name",
            "x-pattern": "readPretty",
            "x-designable-id": "tzu01r4pozw",
            "x-index": 2
          },
          "ez6vositnv9": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "ez6vositnv9",
            "properties": {
              "baseValue": {
                "type": "string",
                "title": "基础值",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-pattern": "readPretty",
                "name": "baseValue",
                "x-designable-id": "oxl3h2rkwbk",
                "x-index": 0
              }
            },
            "x-index": 3
          },
          "p9dnbyglq1d": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "p9dnbyglq1d",
            "properties": {
              "value": {
                "type": "string",
                "title": "目标值",
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "value",
                "required": true,
                "x-designable-id": "j7y6t9ty32k",
                "x-index": 0
              }
            },
            "x-index": 4
          }
        },
        "x-index": 0
      }
    },
    "x-designable-id": "cf54z8ppz61"
  }
}