import { ISchema } from '@formily/react';

export const formId: string = "Common.Materials";

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
            "title": "物料编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入物料编码"
            },
            "required": true
          },
          "outCode": {
            "type": "string",
            "title": "物料外码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入物料外码"
            }
          },
          "{value:classCode,label:classCodeName}": {
            "type": "string",
            "title": "物料分类",
            "x-decorator": "FormItem",
            "x-component": "MaterialClassSelect",
            "x-component-props": {
              "placeholder": "请选择物料分类",
              "labelInValue": true
            }
          },
          "{value:unitCode,label:unitName}": {
            "type": "string",
            "title": "基本单位",
            "x-decorator": "FormItem",
            "x-component": "UnitSelect",
            "x-component-props": {
              "placeholder": "请选择基本单位",
              "labelInValue": true
            }
          },
          "{value:comeFrom,label:comeFromName}": {
            "type": "string",
            "title": "来源",
            "x-decorator": "FormItem",
            "x-component": "MaterialComFromSelect",
            "x-component-props": {
              "placeholder": "请选择来源",
              "labelInValue": true
            }
          },
          "specificationModel": {
            "type": "string",
            "title": "规格型号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入规格型号"
            }
          },
          "outSpecification": {
            "type": "string",
            "title": "对外规格型号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入对外规格型号"
            }
          },
          "description": {
            "type": "string",
            "title": "物料描述",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入物料描述",
              "rows": 2
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          },
          "outDescription": {
            "type": "string",
            "title": "对外描述",
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
            "x-component-props": {
              "placeholder": "请输入对外描述",
              "rows": 2
            },
            "x-decorator-props": {
              "gridSpan": 2
            }
          },
          "engDescription": {
            "type": "string",
            "title": "英文描述",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入英文描述"
            }
          },
          "outEngDescription": {
            "type": "string",
            "title": "对外英文描述",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入对外英文描述"
            }
          },
          "craftRouteCode": {
            "type": "string",
            "title": "工艺路线编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入工艺路线编码"
            }
          },
          "ct": {
            "type": "number",
            "title": "节拍",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入节拍",
              "min": 0,
              "precision": 2
            }
          },
          "colorCode": {
            "type": "string",
            "title": "颜色代码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入颜色代码"
            }
          },
          "materialPropertyCode": {
            "type": "string",
            "title": "材质编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入材质编码"
            }
          },
          "length": {
            "type": "number",
            "title": "长度(mm)",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入长度",
              "min": 0,
              "precision": 2
            }
          },
          "width": {
            "type": "number",
            "title": "宽度(mm)",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入宽度",
              "min": 0,
              "precision": 2
            }
          },
          "thickness": {
            "type": "number",
            "title": "厚度(mm)",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入厚度",
              "min": 0,
              "precision": 2
            }
          },
          "area": {
            "type": "number",
            "title": "面积",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
              "placeholder": "请输入面积",
              "min": 0,
              "precision": 4
            }
          },
          "effectStatus": {
            "type": "number",
            "title": "生效状态",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择生效状态"
            },
            "enum": [
              { "label": "草稿", "value": 1 },
              { "label": "审核中", "value": 5 },
              { "label": "生效", "value": 10 },
              { "label": "失效", "value": 15 }
            ]
          },
          "status": {
            "type": "number",
            "title": "状态",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择状态"
            },
            "enum": [
              { "label": "正常", "value": 1 },
              { "label": "停用", "value": 4 },
              { "label": "淘汰", "value": 6 }
            ]
          }
        }
      }
    }
  }
}