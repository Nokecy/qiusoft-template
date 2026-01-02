import { ISchema } from '@formily/react'

export const formId: string = "appWorkflow.taskOverdueWarningSetting";

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: "none",
  // shallow: true
}

export const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "95px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "z0bwjbgx6ue": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 1
        },
        "x-designable-id": "z0bwjbgx6ue",
        "x-index": 0,
        "properties": {
          "msprwdieokc": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "msprwdieokc",
            "x-index": 0,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:workflowName,label:workflowDisplayName}": {
                "type": "string",
                "title": "任务名称",
                "x-decorator": "FormItem",
                "x-component": "ProcessTypeConfigSelect",
                "x-validator": [],
                "x-component-props": {
                  "labelInValue": true
                },
                "x-decorator-props": {},
                "name": "{value:workflowName,label:workflowDisplayName}",
                "x-designable-id": "2zvrztq21vb",
                "x-index": 0
              }
            }
          },
          "21xi2j9h0nh": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "21xi2j9h0nh",
            "x-index": 1,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "overdueDurationHours": {
                "type": "number",
                "title": "超期时长(小时)",
                "x-decorator": "FormItem",
                "x-component": "NumberPicker",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入超期时长(小时)"
                },
                "x-decorator-props": {},
                "name": "overdueDurationHours",
                "x-designable-id": "up4ca26cmsv",
                "x-index": 0
              }
            }
          },
          "avti8xv54qh": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "avti8xv54qh",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 3
            },
            "properties": {
              "handlerCodeValue": {
                "type": "string",
                "title": "抄送人",
                "x-decorator": "FormItem",
                "x-component": "XUserSelect",
                "x-validator": [],
                "x-component-props": {
                  "mode": "multiple",
                  "showId": "id",
                  "record": true
                },
                "x-decorator-props": {},
                "x-designable-id": "0bpl8rclxhe",
                "x-index": 0,
                "name": "handlerCodeValue"
              }
            }
          }
        }
      }
    },
    "x-designable-id": "bw3c50g1ffc"
  }
}