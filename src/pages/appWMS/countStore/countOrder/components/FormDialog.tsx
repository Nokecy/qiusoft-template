import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, } from "antd";
import React from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import { publicTrim } from "@/components/public";
import { CountOrderCreateAsync, CountOrderGetAsync, CountOrderUpdateAsync } from '@/services/wms/CountOrder';

const CountOrderMloadDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await CountOrderGetAsync({ id: entityId });
                    form.setInitialValues(  publicTrim(workshiftsInfo));
                }
            })

        }
    };
    const portalId = `appWMS.appWMSInStore.countOrder${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 760, }, portalId, () => {
                return (

                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return CountOrderCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return CountOrderUpdateAsync({ id: values?.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default CountOrderMloadDialog