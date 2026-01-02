import { TenantCreateAsync, TenantUpdateAsync } from '@/services/openApi/Tenant';
import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React, { useMemo } from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";

const TenantFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);
    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {

                }
            })
        }
    };

    const portalId = `tenant${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 1100, }, portalId, () => {
                return (<>
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>
                </>)
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    return TenantCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit() }).then(() => { next(payload) });
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

export default TenantFormDialog