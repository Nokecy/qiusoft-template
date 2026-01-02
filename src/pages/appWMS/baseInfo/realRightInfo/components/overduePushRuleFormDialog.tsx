import { RealRightInfoCreateAsync, RealRightInfoGetAsync, RealRightInfoUpdateAsync } from "@/services/wms/RealRightInfo";
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from "@/pages/_utils/editMode";

const OverduePushRuleFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;
    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});
    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo: any = await RealRightInfoGetAsync({ id: entityId });
                    workshiftsInfo.handlerCodeValue = workshiftsInfo?.pusherId?.split(';').map((i, index) => ({ label: workshiftsInfo?.pusherName.split(';')[index], value: i }))
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };
    const portalId = `WMS.base.realRightInfo${entityId}`
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

                    if (!res.id) {
                        return RealRightInfoCreateAsync(res).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return RealRightInfoUpdateAsync({ id: res.id }, res).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default OverduePushRuleFormDialog