import { ISchema } from '@formily/react'

export const formId: string = "appMMS.baseInfo.PickTaskAgent";

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
      "nkch4bkyr5k": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 2
        },
        "x-designable-id": "nkch4bkyr5k",
        "x-index": 0,
        "properties": {
          "14ztr0ia6hq": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "14ztr0ia6hq",
            "x-index": 0,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "{value:principalId,label:principalName}": {
                "type": "string",
                "title": "委托人",
                "x-decorator": "FormItem",
                "x-component": "XUserSelect",
                "x-validator": [],
                "x-component-props": {
                  "showId":true
                },
                "x-decorator-props": {},
                "x-designable-id": "p6z8airpz6m",
                "x-index": 0,
                "name": "{value:principalId,label:principalName}",
                "required": true
              }
            }
          },
          "8wzaisib98d": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "8wzaisib98d",
            "x-index": 1,
            "properties": {
              "{value:agentId,label:agentName}": {
                "type": "string",
                "title": "代理人",
                "x-decorator": "FormItem",
                "x-component": "XUserSelect",
                "x-validator": [],
                "x-component-props": {
                  "showId":true
                },
                "x-decorator-props": {},
                "x-designable-id": "aflxpsql17d",
                "x-index": 0,
                "name": "{value:agentId,label:agentName}",
                "required": true
              }
            }
          },
          "3qvzvtdva93": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "3qvzvtdva93",
            "x-index": 2,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "startTime": {
                "type": "string",
                "title": "开始时间",
                "x-decorator": "FormItem",
                "x-component": "DatePicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "startTime",
                "required": true,
                "x-designable-id": "v8ew1wllhuw",
                "x-index": 0
              }
            }
          },
          "97wx3afkvv8": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-designable-id": "97wx3afkvv8",
            "x-index": 3,
            "x-validator": [],
            "x-component-props": {},
            "properties": {
              "endTime": {
                "type": "string",
                "title": "结束时间",
                "x-decorator": "FormItem",
                "x-component": "DatePicker",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                "name": "endTime",
                "required": true,
                "x-designable-id": "5eb172qe7yi",
                "x-index": 0
              }
            }
          }
        }
      }
    },
    "x-designable-id": "pdx2to6oo8z"
  }
}