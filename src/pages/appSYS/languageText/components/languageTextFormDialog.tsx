import { LanguageTextGetAsync, LanguageTextUpdateAsync } from '@/services/openApi/LanguageText';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import { useFormSchema, useSchemaField } from "umi";
import React, { } from "react";
import { formId, formSchema } from "./schema";

const LanguageTextFormDialog = (props: any) => {
    const { resourceName, cultureName, name, baseCultureName, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (name) {
                    let workcenter = await LanguageTextGetAsync({ resourceName, cultureName, name, baseCultureName });
                    form.setInitialValues(workcenter);
                }
            })
        }
    };

    const portalId = `languageText${name}`


    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={async () => {
            console.log(schema);
            let formDialog = FormDialog({ title: title, width: 560 }, portalId, () => {
                return (
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>)
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    return LanguageTextUpdateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default LanguageTextFormDialog