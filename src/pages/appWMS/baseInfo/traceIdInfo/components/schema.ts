import { ISchema } from '@formily/react'

export const formId: string = "appWMS.baseInfo.traceIdInfo";

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "80px",
    "feedbackLayout": "terse"
  },
  "schema": {
    "type": "object",
    "properties": {
      "number": {
        "type": "number",
        "title": "生成数量",
        "x-decorator": "FormItem",
        "x-component": "NumberPicker",
        "x-validator": [],
        "x-component-props": {
          "placeholder": "请填写"
        },
        "x-decorator-props": {},
        "name": "number",
        "required": true,
        "x-designable-id": "bq2gkzdin8y",
        "x-index": 0
      }
    },
    "x-designable-id": "nsz9vr7wwvg"
  }
}