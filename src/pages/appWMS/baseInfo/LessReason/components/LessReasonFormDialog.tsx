import { LessReasonCreateAsync, LessReasonGetAsync, LessReasonUpdateAsync } from '@/services/wms/LessReason';
import { ArrayItems, ArrayTable, Checkbox, DatePicker, Editable, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Radio, Select, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from "antd";
import React, { useMemo } from "react";

const LessReasonFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormTab, FormItem, FormGrid, DatePicker, Editable, Radio, Space, Input, Select, Checkbox, ArrayItems, ArrayTable, InputNumber
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await LessReasonGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };
    const portalId = `WMS.base.LessReason${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 960 }, portalId, () => {
                return (
                    <FormLayout labelWidth={80} feedbackLayout={'none'} shallow={false}>
                        <SchemaField>

                            <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>

                                <SchemaField.String title={"编码"} required name={"code"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入编码" }} />
                                <SchemaField.String title={"名称"} required name={"name"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入名称" }} />
                            </SchemaField.Void>

                        </SchemaField>
                    </FormLayout>
                    )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return LessReasonCreateAsync(values).then(() => { if(onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return LessReasonUpdateAsync({ id: values.id }, values).then(() => { if(onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default LessReasonFormDialog