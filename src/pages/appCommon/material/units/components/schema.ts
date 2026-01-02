import { ISchema } from '@formily/react';

export const formId: string = "Common.Units";

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
          "code": {
            "type": "string",
            "title": "单位编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入单位编码"
            },
            "required": true
          },
          "name": {
            "type": "string", 
            "title": "单位名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入单位名称"
            },
            "required": true
          },
          "{value:unitGroupId,label:unitGroupCode}": {
            "type": "number",
            "title": "单位组",
            "x-decorator": "FormItem",
            "x-component": "UnitGroupSelect",
            "x-component-props": {
              "placeholder": "请选择单位组",
              "allowClear": true
            },
            "x-decorator-props": {
              "gridSpan": 1
            }
          },
          "isMainUnit": {
            "type": "boolean",
            "title": "是否主单位",
            "x-decorator": "FormItem",
            "x-component": "Switch",
            "x-component-props": {
              "checkedChildren": "是",
              "unCheckedChildren": "否"
            }
          },
          "exchangeRate": {
            "type": "number",
            "title": "转换率",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入转换率",
              "min": 0,
              "precision": 4,
              "step": 0.0001
            },
            "x-decorator-props": {
              "gridSpan": 1
            }
          },
          "exchangeFlag": {
            "type": "string",
            "title": "转换标志",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择转换标志"
            },
            "enum": [
              { "label": "乘以转换率", "value": "0" },
              { "label": "除以转换率", "value": "1" }
            ]
          },
          "sortOrder": {
            "type": "number",
            "title": "排序顺序",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入排序顺序",
              "min": 0,
              "precision": 0
            },
            "x-decorator-props": {
              "gridSpan": 1
            }
          }
        }
      }
    }
  }
}