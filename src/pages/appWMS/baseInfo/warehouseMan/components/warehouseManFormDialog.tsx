import { WarehouseManCreateAsync, WarehouseManGetAsync, WarehouseManUpdateAsync } from '@/services/wms/WarehouseMan';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';

const WarehouseManFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await WarehouseManGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };
    const portalId = `WMS.base.warehouseMan${entityId}`
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
                    if (!values.id) {
                        return WarehouseManCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return WarehouseManUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default WarehouseManFormDialog