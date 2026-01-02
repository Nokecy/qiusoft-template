import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Space, Select } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber,message } from "antd";
import React, { useMemo } from "react";
import UserSelect from "@/pages/appSYS/users/components/userSelect";
import { PickTaskItemAssignHandlerAsync } from '@/services/wms/PickTaskItem';

const WareHouseFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormTab, FormItem, FormGrid, Space, Input, InputNumber, Checkbox, UserSelect, Select
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {

                }
            })
        }
    };
    const portalId = `wareHouse${entityId[0]?.id}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 450 }, portalId, () => {
                return (
                    <FormLayout labelWidth={100} feedbackLayout={'none'} shallow={false}>
                        <SchemaField>

                            <SchemaField.String title={"处理人"} required name={"handlerCodeValue"}
                                x-decorator="FormItem" x-component={"UserSelect"}
                                x-component-props={{ placeholder: "请输入处理人", labelInValue: true, showId: true }}

                            />

                        </SchemaField>
                    </FormLayout>)
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if(entityId?.length>20){
                        message.error("分配责任人最多不能超过20条数据！");
                        return;
                    }
                    let ids = entityId?.map((x) => { return x.id }); 
                    let res: any = {
                        id: ids,
                    }
                    res.handlerId = values.handlerCodeValue.value;
                    res.handlerName = values.handlerCodeValue.label;
                    PickTaskItemAssignHandlerAsync(res).then(() => { if(onAfterSubmit) onAfterSubmit(); next(payload) });
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