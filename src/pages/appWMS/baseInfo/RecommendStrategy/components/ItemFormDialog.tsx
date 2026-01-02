import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, } from "antd";
import React from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./itemSchema";
import { publicTrim } from "@/components/public";
import FormLayoutMode from '@/pages/_utils/editMode';
import { PutItemRecommendStrategyItemGetAsync, PutItemRecommendStrategyItemCreateAsync, PutItemRecommendStrategyItemUpdateAsync } from '@/services/wms/PutItemRecommendStrategyItem';


const ItemModelFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit, fatherId } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await PutItemRecommendStrategyItemGetAsync({ id: entityId });
                    form.setInitialValues(publicTrim(workshiftsInfo));
                }
            })

        }
    };
    const portalId = `appSettlement.BaseInfo.RecommendStrategy.item${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 960, }, portalId, () => {
                return (
                    <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog1.close()}>
                        <SchemaField schema={schema.schema} />
                    </FormLayoutMode>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    values.putItemRecommendStrategyId = fatherId
                    if (!values.id) {
                        return PutItemRecommendStrategyItemCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return PutItemRecommendStrategyItemUpdateAsync({ id: values?.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default ItemModelFormDialog