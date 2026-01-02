import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFieldInputValueChange, onFormInit, useEffectForm } from '@formily/core';
import { Button, message, } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useFormSchema, useSchemaField } from "umi";
import { ISchema } from '@formily/react'
import { BoxLotResolveRuleResolveAsync } from '@/services/wms/BoxLotResolveRule';
import { isArray } from 'lodash';

const formId: string = "appWms.verifyFormDialog";

const formSchema: { form: Record<string, any>, schema: ISchema } = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12,
    "labelWidth": "100px",
    "feedbackLayout": "none"
  },
  "schema": {
    "type": "object",
    "properties": {
      "barcode": {
        "type": "string",
        "title": "条码",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-validator": [],
        "x-component-props": {},
        "x-decorator-props": {},
        "required": true,
        "name": "barcode",
        "x-designable-id": "bmwl8ztv51p",
        "x-index": 0
      },
      "42r59t8x8fx": {
        "type": "void",
        "x-component": "Card",
        "x-component-props": {
          "title": "系统属性"
        },
        "x-pattern": "readPretty",
        "x-designable-id": "42r59t8x8fx",
        "x-index": 1,
        "properties": {
          "vaet7cnquoa": {
            "type": "void",
            "x-component": "FormGrid",
            "x-validator": [],
            "x-component-props": {
              "maxColumns": 3
            },
            "x-designable-id": "vaet7cnquoa",
            "x-index": 0,
            "properties": {
              "1h8z8vb5snn": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "1h8z8vb5snn",
                "x-index": 0,
                "properties": {
                  "batchNo": {
                    "type": "string",
                    "title": "BatchNo",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "batchNo",
                    "x-designable-id": "fd1un0fswyl",
                    "x-index": 0,
                    "x-pattern": "readPretty"
                  }
                }
              },
              "49efmp2xqpz": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "49efmp2xqpz",
                "x-index": 1,
                "properties": {
                  "dateCode": {
                    "type": "string",
                    "title": "DateCode",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "dateCode",
                    "x-designable-id": "nni126319y8",
                    "x-index": 0,
                    "x-pattern": "readPretty"
                  }
                }
              },
              "virdsz82n3h": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "virdsz82n3h",
                "x-index": 2,
                "properties": {
                  "lotNumber": {
                    "type": "string",
                    "title": "LotNumber",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "lotNumber",
                    "x-designable-id": "q53cwrx1cgh",
                    "x-index": 0,
                    "x-pattern": "readPretty"
                  }
                }
              },
              "108fj9q1cqj": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "108fj9q1cqj",
                "x-index": 3,
                "properties": {
                  "origin": {
                    "type": "string",
                    "title": "Origin",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "origin",
                    "x-designable-id": "49aq46rw5g0",
                    "x-index": 0,
                    "x-pattern": "readPretty"
                  }
                }
              },
              "ym0v03cdtpb": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-designable-id": "ym0v03cdtpb",
                "x-index": 4,
                "properties": {
                  "partNo": {
                    "type": "string",
                    "title": "PartNo",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "partNo",
                    "x-designable-id": "wh7w3z18s2r",
                    "x-index": 0,
                    "x-pattern": "readPretty"
                  }
                }
              },
              "zxl9soxylrr": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {},
                "x-designable-id": "zxl9soxylrr",
                "x-index": 5,
                "properties": {
                  "qty": {
                    "type": "string",
                    "title": "Qty",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "qty",
                    "x-designable-id": "q072s1p3410",
                    "x-index": 0,
                    "x-pattern": "readPretty"
                  }
                }
              },
              "cv0pzzuo1v3": {
                "type": "void",
                "x-component": "FormGrid.GridColumn",
                "x-validator": [],
                "x-component-props": {
                  "gridSpan": 3
                },
                "x-designable-id": "cv0pzzuo1v3",
                "properties": {
                  "extraProperties": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": { "gridKey": "appWMS.baseInfo.BoxLotResolveRule.components.verifyFormDialog.1" },
                    "x-decorator-props": {},
                    "name": "extraProperties",
                    "x-pattern": "readPretty",
                    "title": "扩展",
                    "x-designable-id": "gr5tb454nk3",
                    "items": {
                      "type": "object",
                      "x-designable-id": "ptjvoqkhdhl",
                      "properties": {
                        "flfma0ya3n1": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "属性名称"
                          },
                          "name": "",
                          "x-designable-id": "flfma0ya3n1",
                          "properties": {
                            "xname": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "xname",
                              "x-pattern": "readPretty",
                              "x-designable-id": "t589zwx95ku",
                              "x-index": 0
                            }
                          },
                          "x-index": 0
                        },
                        "xshjlttvkm9": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "属性值"
                          },
                          "name": "",
                          "x-designable-id": "xshjlttvkm9",
                          "properties": {
                            "xvalue": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {},
                              "x-decorator-props": {},
                              "name": "xvalue",
                              "x-pattern": "readPretty",
                              "x-designable-id": "rsljges2qxa",
                              "x-index": 0
                            }
                          },
                          "x-index": 1
                        }
                      }
                    },
                    "x-index": 0
                  }
                },
                "x-index": 6
              }
            }
          }
        }
      }
    },
    "x-designable-id": "kfe9rl5ewzr"
  }
}

const VerifyFormDialog = (props: any) => {
  const { datas, title, buttonProps, onAfterSubmit, entityId } = props;
  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});
  const formProps = {
    effects: () => {
      onFormInit(async (form) => { })

      onFieldInputValueChange('barcode', async (field, form) => {
        field.setComponentProps({
          onKeyDown: async (event) => {
            if (event.key === 'Enter') {
              try {
                const result = await BoxLotResolveRuleResolveAsync({
                  id: entityId,
                  barcode: field.value,
                })
                message.success('解析成功')

                let extraProperties: any = []

                if (result.extraProperties) {
                  extraProperties = Object.keys(result.extraProperties).map(key => {
                    if (result.extraProperties) {
                      return {
                        xname: key,
                        xvalue: result.extraProperties[key]
                      }
                    }
                  })
                }
                form.setValues({ ...result, extraProperties: extraProperties })
              } catch (error) {

              }
            }
          }
        });
      })
    }
  };

  const portalId = `appWms.verifyFormDialog${entityId}`
  return (<FormDialog.Portal id={portalId}>
    <Button onClick={() => {
      let formDialog1 = FormDialog({ title: title, width: 960, footer: null }, portalId, () => {
        return (
          <FormLayout {...schema.form}>
            <SchemaField schema={schema.schema}></SchemaField>
          </FormLayout>
        )
      });

      formDialog1
        .forConfirm((payload, next) => {
          let values: any = payload.values;
          if (onAfterSubmit) onAfterSubmit(); next(payload)
        })
        .open(formProps);
    }}
      {...buttonProps}
    >
      {props.children}
    </Button>
  </FormDialog.Portal>
  );
}

export default VerifyFormDialog