import { ISchema } from '@formily/react'

export const formId: string = "appWMS.inInstruction.boxItemFile";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none",
    "labelWidth": "90px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "u1mljydna0f": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 0
        },
        "x-designable-id": "u1mljydna0f",
        "x-index": 0,
        "properties": {
          "ri45mtr23rf": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "ri45mtr23rf",
            "x-index": 0,
            "properties": {
              "attachments": {
                "type": "string",
                "title": "文件上传",
                "x-decorator": "FormItem",
                "x-component": "UploadTableDraw",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "x-designable-id": "2jgrr318zit",
                "x-index": 0,
                "name": "attachments",
              }
            }
          }
        }
      }
    },
    "x-designable-id": "k93uj8rsr2u"
  }
}