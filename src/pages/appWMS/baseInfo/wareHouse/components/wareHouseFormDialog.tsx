import { FactoryZoneSelect } from "@/pages/appWMS/baseInfo/_utils";
import { WareHouseCreateAsync, WareHouseGetAsync, WareHouseUpdateAsync } from '@/services/wms/WareHouse';
import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Space, Select } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from "antd";
import React, { useMemo } from "react";
import WareHouseshadowSelect from "../../_utils/wareHouseshadowSelect"
import FormLayoutMode from "@/pages/_utils/editMode";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "@umijs/max";

const WareHouseFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});


    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo: any = await WareHouseGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };

    const portalId = `WMS.base.wareHouse${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 960 }, portalId, () => {
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
                        return WareHouseCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return WareHouseUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default WareHouseFormDialog