import { StoreTransferMapCreateAsync, StoreTransferMapUpdateAsync, StoreTransferMapGetAsync } from "@/services/wms/StoreTransferMap";
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from "@/pages/_utils/editMode";

const MaterialSettingByWarehouseDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await StoreTransferMapGetAsync({ id: entityId });
                    form.setInitialValuesIn('goodWarehouseId', workshiftsInfo.goodWarehouseId)
                    form.setInitialValuesIn('rejectWarehouseId', workshiftsInfo.rejectWarehouseId)
                    form.setInitialValuesIn('sourceWarehouseId', workshiftsInfo.sourceWarehouseId)
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };
    const portalId = `WMS.base.storeTransferMap${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 1080 }, portalId, () => {
                return (
                    <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                        <SchemaField schema={schema.schema} />
                    </FormLayoutMode>
                )
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return StoreTransferMapCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return StoreTransferMapUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default MaterialSettingByWarehouseDialog
