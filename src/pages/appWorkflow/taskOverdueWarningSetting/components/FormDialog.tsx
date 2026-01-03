import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { publicTrim } from "@/components/public";
import FormLayoutMode from '@/pages/_utils/editMode';
import { TaskOverdueWarningSettingCreate, TaskOverdueWarningSettingGet, TaskOverdueWarningSettingUpdate } from '@/services/workflow/TaskOverdueWarningSetting';
import { useFormSchema, useSchemaField } from "umi";

const BusinessTypeDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;
    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await TaskOverdueWarningSettingGet({ id: entityId });
                    let handlerCodeValueArr: any = []
                    workshiftsInfo?.recipients?.map((item) => {
                        handlerCodeValueArr.push({
                            children: item.name,
                            value: item.userId,
                            key: item.userId,
                            label: item.name,
                            realId: item.id,
                        })
                    })
                    form.setInitialValuesIn('handlerCodeValue', handlerCodeValueArr)
                    form.setInitialValues(publicTrim(workshiftsInfo));
                }
            })
        },
    };
    const portalId = `appWorkflow.taskOverdueWarningSetting2.${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 760 }, portalId, (_e) => {
                return (
                    <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog1.close()}>
                        <SchemaField schema={schema.schema} />
                    </FormLayoutMode>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    let recipientsArr: any = []
                    values.handlerCodeValue.map((item) => {
                        recipientsArr.push(
                            values.id ?
                                {
                                    name: item.children,
                                    id: item.realId,
                                    userId: item.value
                                } : {
                                    name: item.children,
                                    userId: item.value
                                }
                        )
                    })
                    let body = {
                        overdueDurationHours: values.overdueDurationHours || null,
                        workflowDisplayName: values.workflowDisplayName || null,
                        workflowName: values.workflowName || null,
                        recipients: recipientsArr
                    }
                    if (!values.id) {
                        return TaskOverdueWarningSettingCreate(body).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return TaskOverdueWarningSettingUpdate({ id: values?.id }, body).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default BusinessTypeDialog