import { FactoryZoneCreateAsync, FactoryZoneGetAsync, FactoryZoneUpdateAsync } from '@/services/wms/FactoryZone';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';

const FactoryZoneFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await FactoryZoneGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                    if(workshiftsInfo.parentId){
                        let workshiftsInfoFather = await FactoryZoneGetAsync({ id: workshiftsInfo.parentId });
                        form.setValuesIn('parentName', workshiftsInfoFather.name);
                    }
                }
            })
        }
    };
    const portalId = `WMS.base.factoryZone${entityId}`
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
                        return FactoryZoneCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return FactoryZoneUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default FactoryZoneFormDialog