import { WareHouseSelect, MaterailItemSelect, ContactInfoSelect } from "@/pages/appWMS/baseInfo/_utils";
import { DeliveryOrderCreateAsync, DeliveryOrderGetAsync } from "@/services/wms/DeliveryOrder";
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { ToolBar } from '@/components';
import { ArrayTable, DatePicker, Form, FormGrid, FormItem, FormLayout, Input, NumberPicker, PreviewText, Select, Space, Submit } from '@formily/antd-v5';
import { createForm, onFormInit } from "@formily/core";
import { createSchemaField } from '@formily/react';
import { Button, Spin } from "antd";
import React, { useMemo, useState } from "react";
import { history, dropByCacheKey } from "umi";
import { ShipmentOrderTypeSelect } from "@/pages/appWMS/outInstruction/_utils";
import BindItemDialog from "./components/bindItemDialog";
import _, { groupBy, sumBy } from "lodash";
import { pubGoBack } from "@/components/public";
import { useKeepAliveParams } from '@/hooks';

const ShipmentOrderForm = (props: any) => {
    const query = useKeepAliveParams('/appWMS/outInstruction/deliveryOrder/form');
    const { id } = query;

    const handleSubmit = () => {
        return form.submit((values) => {
            if (id) {
                // return DeliveryOrderUpdateAsync({ id }, values);
            } else {
                return DeliveryOrderCreateAsync(values);
            }
        }).then(() => { pubGoBack() }, () => { });
    }

    const form = useMemo(() => createForm({
        effects: () => {
            onFormInit(async (form) => {
                if (id) {
                    DeliveryOrderGetAsync({ id: id as string }).then((saleOrder) => {
                        form.setInitialValues(saleOrder);
                    })
                }
            })
        },
    }), []);

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            Input, NumberPicker, DatePicker, Select, ProCard, FormItem, FormGrid, ArrayTable, Space, PreviewText, FormLayout,
            WareHouseSelect, MaterailItemSelect, ShipmentOrderTypeSelect, ContactInfoSelect
        },
    }), []);

    const onContactChange = (item) => {
        form.setInitialValuesIn("consignee.name", item.name);
        form.setInitialValuesIn("consignee.contact", item.contact);
        form.setInitialValuesIn("consignee.tel", item.tel);
        form.setInitialValuesIn("consignee.address", item.address);
    }

    const onSelected = (rows: API.BurnAbpWMSMaterialPickingItemDto[]) => {
        const result = groupBy(rows, (x) => x.outInstructionOrderItemId!)
        const items = Object.keys(result).map((key) => {
            const item = result[key];
            return { ...item[0], quantity: sumBy(item, "qty") }
        })

        form.setValuesIn("items", items);
        form.setValuesIn("bindPickItems", rows.map(x => x.id));
    }

    const onLPNSelected = (rows: API.BurnAbpWMSMaterialPickingItemDto[]) => {
        const result = groupBy(rows, (x) => x.materialId!)
        const items = Object.keys(result).map((key) => {
            const item = result[key];
            return { ...item[0], quantity: sumBy(item, "qty") }
        })

        form.setValuesIn("items", items);
        form.setValuesIn("traceIds", rows.map(x => x.traceId));
    }

    return (<PageContainer fixHeader={true} header={{ title: "送货单", subTitle: "创建送货单" }}>
        <Form form={form} layout={"horizontal"} labelWidth={110} feedbackLayout={"terse"} previewTextPlaceholder={"无"}>

            <SchemaField>
                <SchemaField.Void x-component="ProCard" x-component-props={{ title: "基本信息", collapsible: false, headerBordered: true }}>

                    <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: [1, 4], strictAutoFit: true }}>
                        <SchemaField.String title={"库房"} required name={"{value:wareHouseId,label:wareHouseName}"} x-decorator="FormItem" x-component={"WareHouseSelect"} x-component-props={{ placeholder: "请输入库房" }} />

                        <SchemaField.String title={"送货ASN"} required name={"asnOrderNo"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入送货ASN" }} />

                        <SchemaField.Object name={"consignee"}>
                            <SchemaField.String name={"id"} title={"收货人ID"} x-decorator="FormItem" x-component="ContactInfoSelect" x-component-props={{ placeholder: "请输入收货人", type: 10 }} />

                            <SchemaField.String name={"name"} title={"收货人名称"} x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: "请输入收货人名称" }} />

                            <SchemaField.String name={"contact"} title={"收货联系人"} x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: "请输入联系人" }} />

                            <SchemaField.String name={"tel"} title={"联系电话"} x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: "请输入联系电话" }} />

                            <SchemaField.String name={"address"} title={"收货地址"} x-decorator="FormItem" x-decorator-props={{ gridSpan: 4 }} x-component="Input" x-component-props={{ placeholder: "请输入供应商" }} />
                        </SchemaField.Object>

                        <SchemaField.String title={"备注"} name={"remark"} x-decorator="FormItem" x-decorator-props={{ gridSpan: 4 }} x-component={"Input.TextArea"} x-component-props={{ placeholder: "请输入编码" }} />

                        <SchemaField.Array name="items" title="送货明细" x-component="ArrayTable" x-validator={[{ message: "送货明细必须填写" }]} x-decorator="FormItem"
                            x-decorator-props={{ gridSpan: 4 }} x-component-props={{
                                title: () => <BindItemDialog onSelected={onSelected} />
                            }}
                        >
                            <SchemaField.Object>
                                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ width: 150, title: '出库指令单', fixed: "left" }}>
                                    <SchemaField.String name={"outInstructionOrderNo"} required x-decorator="FormItem" x-component="Input" x-read-pretty={true} />
                                    <SchemaField.String name={"outInstructionOrderItemId"} required x-decorator="FormItem" x-component="Input" x-hidden={true} />
                                </SchemaField.Void>

                                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ width: 150, title: '来源单据', fixed: "left" }}>
                                    <SchemaField.String name={"sourceOrderNo"} required x-decorator="FormItem" x-component="Input" x-read-pretty={true} />
                                    <SchemaField.String name={"sourceOrderItemId"} required x-decorator="FormItem" x-component="Input" x-hidden={true} />
                                </SchemaField.Void>

                                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ width: 150, title: '物料编码', fixed: "left" }}>
                                    <SchemaField.String name={"material.outCode"} required x-decorator="FormItem" x-component="Input" x-read-pretty={true} />
                                    <SchemaField.String name={"materialId"} required x-decorator="FormItem" x-component="Input" x-hidden={true} />
                                </SchemaField.Void>

                                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '物料描述', fixed: "left", ellipsis: true }}>
                                    <SchemaField.String name={"material.descript"} x-component="Input" x-decorator="FormItem" x-component-props={{ placeholder: "请输入物料描述" }} x-read-pretty={true} />
                                </SchemaField.Void>

                                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '送货数量' }}>
                                    <SchemaField.String name={"quantity"} required x-component="NumberPicker" x-decorator="FormItem" x-component-props={{ placeholder: "请输入数量" }} />
                                </SchemaField.Void>

                            </SchemaField.Object>
                        </SchemaField.Array>
                    </SchemaField.Void>
                </SchemaField.Void>

            </SchemaField>

            {
                	<ToolBar style={{zIndex:window.location.pathname.indexOf('form')!=-1?0:-1}}>
                    <Button onClick={() => { pubGoBack() }}>返回</Button>

                    <Submit type={"primary"} onSubmit={handleSubmit}>提交</Submit>
                </ToolBar>
            }
        </Form>
    </PageContainer>
    );
}

export default ShipmentOrderForm
export const routeProps = {
	name: '创建送货单',
};