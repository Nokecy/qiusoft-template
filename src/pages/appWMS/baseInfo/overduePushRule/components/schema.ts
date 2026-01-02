import { ISchema } from '@formily/react'

export const formId: string = "Wms.OverduePushRule";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
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
      "1lw16007b95": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 3
        },
        "x-designable-id": "1lw16007b95",
        "properties": {
          "mrdr9ieavgm": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "mrdr9ieavgm",
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
                "x-designable-id": "3mnw4pxvwjr",
                "x-index": 0
              }
            },
            "x-index": 0
          },
          "x988uim9jpp": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "x988uim9jpp",
            "properties": {
              "lastDays": {
                "type": "number",
                "title": "剩余天数",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "min": 1,
                  "placeholder": "请输入剩余天数"
                },
                "x-decorator-props": {},
                "name": "lastDays",
                "required": true,
                "x-designable-id": "qflbz63w6a8",
                "x-index": 0
              }
            },
            "x-index": 1
          },
          "n8xztnujm87": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "n8xztnujm87",
            "properties": {
              "intervalDays": {
                "type": "number",
                "title": "推送间隔",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "min": 1,
                  "placeholder": "请输入推送间隔"
                },
                "x-decorator-props": {},
                "name": "intervalDays",
                "required": true,
                "x-designable-id": "vvupmulumh2",
                "x-index": 0
              }
            },
            "x-index": 2
          },
          "31l5blq522o": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "x-designable-id": "31l5blq522o",
            "properties": {
              "handlerCodeValue": {
                "type": "string",
                "title": "抄送人",
                "x-decorator": "FormItem",
                "x-component": "XUserSelect",
                "x-validator": [],
                "x-component-props": {
                  "mode": "multiple"
                },
                "x-decorator-props": {},
                "name": "handlerCodeValue",
                "required": true,
                "x-designable-id": "f5wrj87i8ku",
                "x-index": 0
              }
            },
            "x-index": 3
          }
        },
        "x-index": 0
      }
    },
    "x-designable-id": "fdywibfa27p"
  }
}