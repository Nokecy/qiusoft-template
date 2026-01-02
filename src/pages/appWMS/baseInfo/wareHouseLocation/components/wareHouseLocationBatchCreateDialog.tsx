import { WareHouseLocationBatchCreateAsync } from '@/services/wms/WareHouseLocation';
import { WarehouseZoneGetAsync } from '@/services/wms/WarehouseZone';
import { FormDialog } from '@formily/antd-v5';
import { isField, onFieldInputValueChange, onFormInit } from '@formily/core';
import { Button } from "antd";
import React, { } from "react";
import { formId, formSchema } from "./twoSchema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from "@/pages/_utils/editMode";

const WareHouseLocationBatchCreateDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                // form.setInitialValuesIn("[startCode,endCode]", [1, 1]);
                // form.setInitialValuesIn("[startRow,endRow]", [1, 1]);
                // form.setInitialValuesIn("[startLayer,endLayer]", [1, 1]);
            })

            onFieldInputValueChange("{value:warehouseZoneId,label:warehouseZoneCode}", async (field, form) => {
                let { value } = field.value || {};
                const typeField = field.query("type").take();
                const warehouseZone = await WarehouseZoneGetAsync({ id: value });

                if (isField(typeField)) {
                    typeField.setValue(warehouseZone.type);
                }

            })
            onFieldInputValueChange("{value:wareHouseId,label:wareHouseName}", async (field, form) => {
                let { value } = field.value || {};

                const warehouseZoneCode = field.query("{value:warehouseZoneId,label:warehouseZoneCode}").take();
                if (isField(warehouseZoneCode)) {
                    warehouseZoneCode.setComponentProps({ warehouseId: value })
                }
            })
        }
    };
    const portalId = `WMS.base.wareHouseLocationBatch${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 960 }, portalId, (form) => {
                return (
                    <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                        <SchemaField schema={schema.schema} />
                    </FormLayoutMode>
                )
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    return WareHouseLocationBatchCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default WareHouseLocationBatchCreateDialog