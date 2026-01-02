import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit, } from '@formily/core';
import { Button, } from "antd";
import React, { } from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import { BoxLotResolveRuleCreateAsync, BoxLotResolveRuleGetAsync, BoxLotResolveRuleUpdateAsync } from '@/services/wms/BoxLotResolveRule';

/**
 * 客户表单窗口
 * @param props 
 * @returns 
 */
const BoxLotResolveRuleFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await BoxLotResolveRuleGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            })

        }
    };
    const portalId = `appWMS.baseInfo.BoxLotResolveRule231${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 1160, }, portalId, () => {
                return (
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return BoxLotResolveRuleCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return BoxLotResolveRuleUpdateAsync({ id: values?.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default BoxLotResolveRuleFormDialog