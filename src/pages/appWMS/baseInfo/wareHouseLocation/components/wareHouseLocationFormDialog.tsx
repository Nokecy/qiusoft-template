import { WareHouseLocationCreateAsync, WareHouseLocationGetAsync, WareHouseLocationUpdateAsync } from '@/services/wms/WareHouseLocation';
import { WarehouseZoneGetAsync } from '@/services/wms/WarehouseZone';
import { FormDialog } from '@formily/antd-v5';
import { isField, onFieldInputValueChange, onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from "@/pages/_utils/editMode";

const WareHouseLocationFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});


    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let warehouseLocation = await WareHouseLocationGetAsync({ id: entityId });

                    // 设置库房字段的值和标签
                    if (warehouseLocation.wareHouseId && warehouseLocation.warehouse) {
                        form.setFieldState("{value:wareHouseId,label:wareHouseName}", state => {
                            state.value = {
                                value: warehouseLocation.wareHouseId,
                                label: `${warehouseLocation.warehouse.name}(${warehouseLocation.warehouse.code})`
                            };
                        });
                    }

                    // 设置库区字段的值和标签
                    if (warehouseLocation.warehouseZoneId && warehouseLocation.wareHouseZone) {
                        form.setFieldState("{value:warehouseZoneId,label:warehouseZoneCode}", state => {
                            state.value = {
                                value: warehouseLocation.warehouseZoneId,
                                label: `${warehouseLocation.wareHouseZone.code}${warehouseLocation.wareHouseZone.remark ? `(${warehouseLocation.wareHouseZone.remark})` : ''}`
                            };
                        });
                    }

                    // 设置其他字段
                    form.setInitialValues({
                        ...warehouseLocation,
                        wareHouseId: undefined, // 清除原始ID字段，使用上面设置的对象格式
                        warehouseZoneId: undefined // 清除原始ID字段，使用上面设置的对象格式
                    });

                    // 设置库区选择器的warehouseId参数
                    if (warehouseLocation.wareHouseId) {
                        const warehouseZoneField = form.query("{value:warehouseZoneId,label:warehouseZoneCode}").take();
                        if (isField(warehouseZoneField)) {
                            warehouseZoneField.setComponentProps({ warehouseId: warehouseLocation.wareHouseId });
                        }
                    }
                }
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

                const warehouseZoneField = field.query("{value:warehouseZoneId,label:warehouseZoneCode}").take();
                if (isField(warehouseZoneField)) {
                    // 清空库区选择
                    warehouseZoneField.setValue(null);
                    // 设置库房ID参数
                    warehouseZoneField.setComponentProps({ warehouseId: value });
                }
            })
        }
    };
    const portalId = `WMS.base.wareHouseLocation${entityId}`
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
                    if (!values.id) {
                        return WareHouseLocationCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return WareHouseLocationUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default WareHouseLocationFormDialog