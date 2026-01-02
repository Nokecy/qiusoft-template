import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit, } from '@formily/core';
import { Button, } from "antd";
import React, { } from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import { PrinterClientGetAsync, PrinterClientUpdateAsync } from "@/services/openApi/PrinterClient";

/**
 * 客户端表单窗口
 * @param props 
 * @returns 
 */
const PrinterClientFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await PrinterClientGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            })

        }
    };
    const portalId = `appSYS.baseInfo.PrinterClient${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 660, }, portalId, () => {
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
                       
                    } else {
                        return PrinterClientUpdateAsync({ id: values?.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default PrinterClientFormDialog