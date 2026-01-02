// import { MaterialItemWarehouseInfoGetAsync, } from '@/services/wms/MaterialItemWarehouseInfo';
import { ArrayItems, ArrayTable, Checkbox, DatePicker, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, NumberPicker, Radio, Select, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from "antd";
import React, { useMemo, useState } from "react";
import { TraceSelect } from '@/pages/appWMS/baseInfo/_utils';
import { StoreTransferOrderItemAssignStockTaskAsync } from '@/services/wms/StoreTransferOrderItem';

const MaterialItemLocationSettingFormDialog = (props: any) => {
    const { entityId, title, buttonProps, picktask } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormLayout, FormItem, FormGrid, FormTab, DatePicker, NumberPicker, TraceSelect,
            Radio, Space, Input, Select, Checkbox, ArrayItems, InputNumber, ArrayTable
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    // MaterialItemWarehouseInfoGetAsync({ id: entityId }).then((setting: any) => {
                    //     form.setInitialValues({ ...setting });
                    // })
                }
            })


        }
    };
    const portalId = `pickLPN${entityId}`
    return (
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 960, okButtonProps: { style: { background: '#20c77c' } }, okText: '保存', cancelText: '取消' }, portalId, (form) => {
                return (<>
                    <FormLayout labelWidth={100} feedbackLayout={'none'} shallow={false}>
                        <SchemaField>
                            <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: 3 }}>
                                <SchemaField.Array title={"LPN列表"} required x-decorator="FormItem" x-component="ArrayTable" name={"stockBinInfoDtos"} x-component-props={{
                                    style: {
                                        minHeight: 500
                                    }
                                }} x-decorator-props={{ gridSpan: 4, labelCol: 2, wrapperCol: 22 }}>
                                    <SchemaField.Object x-validator={[]}>

                                        <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: "LPN栈板号", width: 200 }} x-index={0}>
                                            <SchemaField.String name="traceId" x-decorator="FormItem" x-component="TraceSelect" x-index={0} x-component-props={{
                                                placeholder: "请输入LPN栈板号", labelInValue: false, afterOnChange: (res) => {
                                                    let arr = form.getValuesIn('arr')||[]
                                                    let t = arr?.filter(i => i.traceId != res.traceId)
                                                    t.push(res)
                                                    form.setValues({arr:t})
                                                }, params: {
                                                    materialId: picktask.materialItem?.id, wareHouseId: picktask.wareHouseId
                                                }
                                            }} />
                                        </SchemaField.Void>
                                        <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: "分配数量", width: 150 }} x-index={1}>
                                            <SchemaField.String name="qty" x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: "请输入分配数量" }} />
                                        </SchemaField.Void>

                                        <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: "操作", width: 50 }}>
                                            <SchemaField.Void x-component="ArrayTable.Remove" />
                                        </SchemaField.Void>

                                    </SchemaField.Object>

                                    <SchemaField.Void title="Addition" x-component="ArrayTable.Addition" />
                                </SchemaField.Array>

                            </SchemaField.Void>
                        </SchemaField>
                    </FormLayout>
                </>)
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                   
                    let param = { ...picktask, materialItem: picktask?.materialItem, stockBinInfoDtos:  values.stockBinInfoDtos.map(i => {
                        i.materialId = picktask?.materialItem?.id
                        i.materialCode = picktask?.materialItem?.code
                        i.materialName = picktask?.materialItem?.Name;
                        let t = values.arr.find(it=>it.traceId===i.traceId)
                        //从载具读取信息
                        return {...t,...i}
                    }) }

                    return StoreTransferOrderItemAssignStockTaskAsync(param).then(res => {
                        next(payload)
                    })
                })
                .open(formProps);
        }}
            {...buttonProps}
        >
            {props.children}
        </Button>
    );
}

export default MaterialItemLocationSettingFormDialog