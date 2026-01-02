import { ISchema } from '@formily/react';

export const formId: string = "Common.PartnerMaterials";

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
          "type": {
            "type": "string",
            "title": "类型",
            "x-decorator": "FormItem",
            "x-component": "Select",
            "x-component-props": {
              "placeholder": "请选择类型"
            },
            "enum": [
              { "label": "客户", "value": "Customer" },
              { "label": "供应商", "value": "Supplier" }
            ],
            "required": true
          },
          "{value:customerCode,label:customerName}": {
            "type": "string",
            "title": "客户",
            "x-decorator": "FormItem",
            "x-component": "CustomerSelect",
            "x-component-props": {
              "placeholder": "请选择客户",
              "useCode": true,
              "allowClear": true
            },
            "x-reactions": {
              "dependencies": ["type"],
              "fulfill": {
                "state": {
                  "visible": "{{$deps[0] === 'Customer'}}"
                }
              }
            }
          },
          "{value:supplierCode,label:supplierName}": {
            "type": "string",
            "title": "供应商",
            "x-decorator": "FormItem",
            "x-component": "SupplierSelect",
            "x-component-props": {
              "placeholder": "请选择供应商",
              "useCode": true,
              "allowClear": true
            },
            "x-reactions": {
              "dependencies": ["type"],
              "fulfill": {
                "state": {
                  "visible": "{{$deps[0] === 'Supplier'}}"
                }
              }
            }
          },
          "materialCode": {
            "type": "string",
            "title": "物料编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入物料编码"
            },
            "required": true
          },
          "materialOutCode": {
            "type": "string",
            "title": "物料外部编码",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入物料外部编码"
            },
            "required": true
          },
          "materialDescription": {
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
          "materialSpecificationModel": {
            "type": "string",
            "title": "物料规格型号",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入物料规格型号"
            }
          },
          "unitName": {
            "type": "string",
            "title": "单位名称",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入单位名称"
            }
          }
        }
      }
    }
  }
}