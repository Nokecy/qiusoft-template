import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { publicTrim } from "@/components/public";
import { CountDiffReasonGetAsync, CountDiffReasonCreateAsync, CountDiffReasonUpdateAsync } from '@/services/wms/CountDiffReason';
import FormLayoutMode from '@/pages/_utils/editMode';
import { useFormSchema, useSchemaField } from "umi";

const CountDiffReasonDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;
    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});
    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await CountDiffReasonGetAsync({ id: entityId });
                    form.setInitialValues(publicTrim(workshiftsInfo));
                }
            })

        }
    };
    const portalId = `WMS.appWMSInStore.countDiffReason${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 960 }, portalId, (_e) => {
                return (
                    <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog1.close()}>
                        <SchemaField schema={schema.schema} />
                    </FormLayoutMode>
                )
            });
            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return CountDiffReasonCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return CountDiffReasonUpdateAsync({ id: values?.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default CountDiffReasonDialog