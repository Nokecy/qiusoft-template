import { LotAttrGroupCreateAsync, LotAttrGroupGetAsync, LotAttrGroupUpdateAsync } from '@/services/wms/LotAttrGroup';
import { ArrayTable, Checkbox, DatePicker, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Select, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from "antd";
import React, { useMemo } from "react";
import LotAttrItemSelect from "@/pages/appWMS/baseInfo/_utils/lotAttrItemSelect";

const LotAttrGroupFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormTab, FormItem, FormGrid, DatePicker, Space, Input, Select,
            ArrayTable, InputNumber, LotAttrItemSelect, Checkbox
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await LotAttrGroupGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };
    const portalId = `lotAttrGroup${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 1200 }, portalId, () => {
                return (
                    <FormLayout labelWidth={80} feedbackLayout={"none"} shallow={false}>
                        <SchemaField>

                            <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>

                                <SchemaField.String title={"批次编码"} required name={"name"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入编码" }} />
                                <SchemaField.String title={"是否默认"} name={"isDefault"} x-decorator="FormItem" x-component={"Checkbox"} />
                                <SchemaField.String title={"描述"} name={"description"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入名称" }} />

                                <SchemaField.Array required title="批次属性" name="items" x-component="ArrayTable" x-validator={[{ message: "交付明细必须填写" }]} x-decorator="FormItem"
                                    x-decorator-props={{ gridSpan: 4 }}
                                >
                                    <SchemaField.Object>
                                        <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ width: 150, title: '字段名称' }}>
                                            <SchemaField.String name={"id"} required x-decorator="FormItem" x-component="Input" x-hidden={true} />
                                            <SchemaField.String name={"{value:lotAttrItemId,label:lotAttrItemLabel}"} required x-decorator="FormItem" x-component="LotAttrItemSelect" x-component-props={{ labelInValue: true, placeholder: "请输入批次属性" }} />
                                        </SchemaField.Void>

                                        <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ width: 80, title: '是否必填', align: "center" }}>
                                            <SchemaField.String name={"flag"} x-component="Checkbox" x-decorator="FormItem" />
                                        </SchemaField.Void>

                                        <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '操作', dataIndex: 'operations', width: 50, fixed: 'right', }}>
                                            <SchemaField.Void x-component="ArrayTable.Remove" />
                                        </SchemaField.Void>

                                    </SchemaField.Object>

                                    <SchemaField.Void x-component="ArrayTable.Addition" x-component-props={{ type: "primary", block: false }} title="新增明细" />
                                </SchemaField.Array>
                            </SchemaField.Void>

                        </SchemaField>
                    </FormLayout>)
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return LotAttrGroupCreateAsync(values).then(() => { if(onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return LotAttrGroupUpdateAsync({ id: values.id }, values).then(() => { if(onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default LotAttrGroupFormDialog