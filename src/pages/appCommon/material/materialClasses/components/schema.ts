import { ISchema } from '@formily/react';

export const formId: string = "Common.MaterialClasses";

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
          "parentId": {
            "type": "number",
            "title": "父级分类",
            "x-decorator": "FormItem",
            "x-component": "ParentMaterialClassSelect",
            "x-component-props": {
              "placeholder": "请选择父级分类",
              "allowClear": true,
              "useCode": false
            }
          },
          "code": {
            "type": "string",
            "title": "分类编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入分类编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "分类名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入分类名称"
            },
            "required": true
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