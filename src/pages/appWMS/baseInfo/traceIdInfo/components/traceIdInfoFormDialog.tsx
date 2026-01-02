import { TraceIdMassProduction } from '@/services/wms/TraceId';
import { NumberPicker, ArrayItems, Checkbox, DatePicker, Editable, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Radio, Select, Space } from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from "antd";
import React, { useMemo } from "react";

const TraceIdInfoFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormTab, FormItem, FormGrid, DatePicker, Editable, Radio, Space, Input, Select, Checkbox, ArrayItems, NumberPicker, InputNumber
        },
    }), [])

    const formProps = {
        effects: () => {

        }
    };
    const portalId = `traceIdInfo${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 460 }, portalId, () => {
                return (
                    <FormLayout labelWidth={80} feedbackLayout={'none'} shallow={false}>
                        <SchemaField>

                            <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: 1 }}>
                                <SchemaField.String title={"生成数量"} required name={"number"} x-decorator="FormItem" x-component={"NumberPicker"}
                                    x-component-props={{ placeholder: "请输入生成数量" }} />
                            </SchemaField.Void>

                        </SchemaField>
                    </FormLayout>)
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    return TraceIdMassProduction({ number: values.number }, values)
                        .then((value) => {
                            if(onAfterSubmit) onAfterSubmit(value);
                            next(payload)
                        });
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

export default TraceIdInfoFormDialog