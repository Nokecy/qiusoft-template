import { CountOrderTaskItemDetailDifferencesMaintainAsync } from '@/services/wms/CountOrderTaskItemDetail';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React, { } from "react";
import FormLayoutMode from '@/pages/_utils/editMode';
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";

const CountRuleFormDialog = (props: any) => {
    const { entityId, data, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (data) {
                    form.setInitialValues(data);
                }
            })
        }
    };

    const portalId = `WMS.appWMSInStore.countDiff${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 960 }, portalId, () => {
                return (
                    <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog1.close()}>
                        <SchemaField schema={schema.schema} />
                    </FormLayoutMode>
                )
            });
            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    return CountOrderTaskItemDetailDifferencesMaintainAsync({ ...values, id: entityId }).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default CountRuleFormDialog