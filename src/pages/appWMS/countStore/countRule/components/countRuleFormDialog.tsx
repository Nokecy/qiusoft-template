import { CountRuleCreateAsync, CountRuleGetAsync, CountRuleUpdateAsync } from '@/services/wms/CountRule';
import { WareHouseGetAsync } from '@/services/wms/WareHouse';
import { ArrayItems, ArrayTable, Checkbox, DatePicker, Editable, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Select, Space } from '@formily/antd-v5';
import { onFieldInputValueChange, onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from "antd";
import React, { useMemo } from "react";
import { WareHouseSelect } from '@/pages/appWMS/baseInfo/_utils';
import CountParamSelect from '@/pages/appWMS/countStore/_utils/countParamSelect';

const CountRuleFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormTab, FormItem, FormGrid, DatePicker, Space, Input, Select, Checkbox, ArrayTable, InputNumber, WareHouseSelect, CountParamSelect
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo: any = await CountRuleGetAsync({ id: entityId });
                    workshiftsInfo.wareHouseId = workshiftsInfo.warehouse?.id;
                    workshiftsInfo.wareHouseName = workshiftsInfo.warehouse?.name;
                    form.setInitialValues(workshiftsInfo);
                }
            })
            onFieldInputValueChange("{value:wareHouseId,label:wareHouseName}", (field, form) => {
                const value = field.value;
                if (value?.value || value?.label || value?.code) {
                    form.setValuesIn("warehouse", { id: value.value, name: value.label, code: value.code });
                } else {
                    form.setValuesIn("warehouse", undefined);
                }
            })
        }
    };
    const portalId = `countRule${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 960 }, portalId, () => {
                return (
                    <FormLayout labelWidth={120} feedbackLayout={'none'} shallow={false}>
                        <SchemaField>

                            <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>
                                <SchemaField.String title={"盘点参数"} required name={"countParamId"} x-decorator="FormItem" x-component={"CountParamSelect"} x-component-props={{ placeholder: "请输入盘点参数" }} />
                                <SchemaField.String title={"盘点类型"} required name={"countType"} x-decorator="FormItem" x-component={"Select"} enum={[{ label: "指令盘点", value: 5 }, { label: "循环盘点", value: 10 }, { label: "冻结盘点", value: 15 }, { label: "主动盘点", value: 20 }, { label: "退库盘点", value: 25 }]} x-component-props={{ placeholder: "请输入盘点类型" }} />
                                <SchemaField.String title={"名称"} required name={"name"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入名称" }} />
                                <SchemaField.String title={"库房"} required name={"{value:wareHouseId,label:wareHouseName}"} x-decorator="FormItem" x-component={"WareHouseSelect"} x-component-props={{ placeholder: "请输入所属仓库" }} x-decorator-props={{ gridSpan: 4 }} />
                                <SchemaField.String title={"任务开始时间"} required name={"taskStartTime"} x-component={"DatePicker"} x-component-props={{ placeholder: "请输入任务开始时间" }} x-decorator="FormItem" />
                                <SchemaField.String title={"包含库区"} name={"zoneCode"} x-component={"Input"} x-component-props={{ placeholder: "请输入包含库区" }} x-decorator="FormItem" x-decorator-props={{ gridSpan: 4 }} />
                                <SchemaField.String title={"包含库位"} name={"locationCode"} x-component={"Input"} x-component-props={{ placeholder: "请输入包含库位" }} x-decorator="FormItem" x-decorator-props={{ gridSpan: 4 }} />
                                <SchemaField.String title={"包含物料"} name={"materialCode"} x-component={"Input"} x-component-props={{ placeholder: "请输入包含物料" }} x-decorator="FormItem" x-decorator-props={{ gridSpan: 4 }} />
                                <SchemaField.String title={"捡料完成下发任务"} name={"pickedSendOutTask"} x-decorator="FormItem" x-component={"Checkbox"} />
                                <SchemaField.String title={"启用"} name={"isActive"} x-decorator="FormItem" x-component={"Checkbox"} />
                                <SchemaField.String title={"描述"} name={"description"} x-decorator="FormItem" x-component={"Input.TextArea"} x-component-props={{ placeholder: "请输入描述" }} x-decorator-props={{ gridSpan: 4, labelCol: 2 }} />
                            </SchemaField.Void>
                        </SchemaField>
                    </FormLayout>)
            });

            formDialog1
                .forConfirm(async (payload, next) => {
                    let values: any = payload.values;
                    const {
                        wareHouseId,
                        wareHouseName,
                        warehouseId,
                        warehouseCode,
                        ...restValues
                    } = values || {};
                    const warehouseValue = values?.warehouse;
                    const warehouseFinalId = wareHouseId ?? warehouseValue?.id ?? warehouseId;
                    const warehouseFinalName = wareHouseName ?? warehouseValue?.name;
                    let warehouseFinalCode = warehouseValue?.code ?? warehouseCode;
                    let warehouseFinalResolvedName = warehouseFinalName;
                    if (!warehouseFinalCode && warehouseFinalId) {
                        const warehouseInfo = await WareHouseGetAsync({ id: warehouseFinalId });
                        warehouseFinalCode = warehouseInfo?.code;
                        warehouseFinalResolvedName = warehouseFinalResolvedName ?? warehouseInfo?.name;
                    }
                    const submitData = {
                        ...restValues,
                        warehouse: warehouseFinalId || warehouseFinalResolvedName || warehouseFinalCode
                            ? { id: warehouseFinalId, name: warehouseFinalResolvedName, code: warehouseFinalCode }
                            : undefined,
                    };

                    if (!submitData.id) {
                        return CountRuleCreateAsync(submitData).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return CountRuleUpdateAsync({ id: submitData.id }, submitData).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default CountRuleFormDialog
