import { ISchema } from '@formily/react';

export const formId: string = 'sequenceType';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "feedbackLayout": "none",
    "labelWidth": "80px"
  },
  "schema": {
    "type": "object",
    "properties": {
      "9yqn1qmsasq": {
        "type": "void",
        "x-component": "FormGrid",
        "x-validator": [],
        "x-component-props": {
          "maxColumns": 2
        },
        "x-designable-id": "9yqn1qmsasq",
        "properties": {
          "12o1lsy9ek7": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "12o1lsy9ek7",
            "properties": {
              "code": {
                "type": "string",
                "title": "编码",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {
                  "placeholder": "请输入编码"
                },
                "x-decorator-props": {},
                "name": "code",
                "required": true,
                "x-designable-id": "ew93znw39eg",
                "x-index": 0
              }
            },
            "x-index": 0
          },
          "zo6i7c19p20": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {},
            "x-designable-id": "zo6i7c19p20",
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
                "x-designable-id": "33hrgknqkw3",
                "x-index": 0
              }
            },
            "x-index": 1
          },
          "ap6f61m7dh6": {
            "type": "void",
            "x-component": "FormGrid.GridColumn",
            "x-validator": [],
            "x-component-props": {
              "gridSpan": 2
            },
            "x-designable-id": "ap6f61m7dh6",
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
                "x-designable-id": "bl7lin25mu0",
                "x-index": 0
              }
            },
            "x-index": 2
          }
        },
        "x-index": 0
      }
    },
    "x-designable-id": "jh0vw5q2ebi"
  }
};
