import { WareHouseTeamCreateAsync, WareHouseTeamGetAsync, WareHouseTeamUpdateAsync } from '@/services/wms/WareHouseTeam';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';

const WarehouseTeamFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});


    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let entityInfo = await WareHouseTeamGetAsync({ id: entityId });
                    form.setInitialValues(entityInfo);
                }
            })
        }
    };
    const portalId = `WMS.base.wareHouseTeam${entityId}`
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
                    console.log('record values', values)
                    if (!values.id) {
                        return WareHouseTeamCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return WareHouseTeamUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default WarehouseTeamFormDialog