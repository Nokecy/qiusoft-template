import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit, } from '@formily/core';
import { Button, } from "antd";
import React, { } from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import { OutInstructionDemandMergeRuleCreateAsync, OutInstructionDemandMergeRuleGetAsync, OutInstructionDemandMergeRuleUpdateAsync } from '@/services/wms/OutInstructionDemandMergeRule';
import { isArray } from 'lodash';

/**
 * 出库需求合并策略窗口
 * @param props 
 * @returns 
 */
const OutInstructionDemandMergeRuleFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await OutInstructionDemandMergeRuleGetAsync({ id: entityId });
                    const array: any[] = [1, 2, 4, 8, 16];
                    const functionArray: any[] = [];
                    const condition = workshiftsInfo.condition;
                    if (condition) {
                        array.map(x => {
                            if ((condition & x) == x) {
                                functionArray.push(x);
                            }
                        })
                    }
                    form.setInitialValues({ ...workshiftsInfo, condition: functionArray });
                }
            })

        }
    };
    const portalId = `appWMS.appOutInstruction.outInstructionDemandMergeRule${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 860, }, portalId, () => {
                return (
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    let condition = null
                    try {
                        if (values.condition && isArray(values.condition)) {
                            condition = values.condition.reduce((a, b) => a | b);
                        }
                    } catch (error) {
                        // 忽略条件处理错误
                    }

                    if (!values.id) {
                        return OutInstructionDemandMergeRuleCreateAsync({ ...values, condition }).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return OutInstructionDemandMergeRuleUpdateAsync({ id: values?.id }, { ...values, condition }).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    }
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

export default OutInstructionDemandMergeRuleFormDialog