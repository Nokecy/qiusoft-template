import { WarehouseZoneCreateAsync, WarehouseZoneGetAsync, WarehouseZoneUpdateAsync } from '@/services/wms/WarehouseZone';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';

const WareHouseZoneFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit, customerCode } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await WarehouseZoneGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            });

            // 监听库区类型变化，如果选择虚拟区则清空区域字段
            onFieldValueChange('type', (field) => {
                const form = field.form;
                if (field.value === 6) { // 虚拟区
                    form.setFieldState('{value:factoryZoneId,label:factoryZoneName}', state => {
                        state.value = null;
                    });
                }
            });
        }
    };
    const portalId = `WMS.base.warehouseZone${entityId}`
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

                    // 如果是虚拟区（type = 6），清空区域字段
                    if (values.type === 6) {
                        values.factoryZoneId = null;
                        values.factoryZoneName = null;
                    }

                    if (!values.id) {
                        return WarehouseZoneCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return WarehouseZoneUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default WareHouseZoneFormDialog
