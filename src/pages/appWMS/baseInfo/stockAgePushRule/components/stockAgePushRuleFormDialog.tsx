import { StockAgePushRuleCreateAsync, StockAgePushRuleGetAsync, StockAgePushRuleUpdateAsync } from "@/services/wms/StockAgePushRule";
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from "@/pages/_utils/editMode";

const StockAgePushRuleFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});


    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo: any = await StockAgePushRuleGetAsync({ id: entityId });
                    workshiftsInfo.handlerCodeValue = workshiftsInfo?.pusherId?.split(',').map((i, index) => {
                        return {
                            data: { label: workshiftsInfo?.pusherName.split(',')[index], value: i },
                            value: i,
                            key: i,
                            label: workshiftsInfo?.pusherName.split(',')[index],
                        }
                    })
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };
    const portalId = `WMS.base.stockAgePushRule${entityId}`
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
                    let res: any = { ...values }
                    res.pusherId = res.handlerCodeValue.map(i => i.value).join(',')
                    /** 推送人姓名 */
                    res.pusherName = res.handlerCodeValue.map(i => i.label).join(',')
                    delete res.handlerCodeValue
                    if (!res.id) {
                        return StockAgePushRuleCreateAsync(res).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return StockAgePushRuleUpdateAsync({ id: res.id }, res).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default StockAgePushRuleFormDialog