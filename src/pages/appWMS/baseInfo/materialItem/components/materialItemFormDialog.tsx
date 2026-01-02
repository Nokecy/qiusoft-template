import { MaterialItemCreateAsync, MaterialItemGetAsync, MaterialItemUpdateAsync } from '@/services/wms/MaterialItem';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';

const MaterialFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    MaterialItemGetAsync({ id: entityId }).then((workshiftsInfo) => {
                        form.setInitialValues(workshiftsInfo);
                    })
                }
            })
        }
    };
    const portalId = `WMS.base.materialItem${entityId}`
    return (
        <FormDialog.Portal id={portalId}>
            <Button type={"primary"} onClick={() => {
                let formDialog = FormDialog({ title: title, width: 1100 }, portalId, () => {
                    return (
                        <FormLayoutMode formId={formId} {...schema.form}
                            editClickAfter={() => formDialog.close()}
                            children={<SchemaField schema={schema.schema} />}
                            moduleKey={'WMS'}
                            entityKey={'MaterialItem'}
                        />

                    )
                });

                formDialog
                    .forConfirm((payload, next) => {
                        let values: any = payload.values;
                        if (!values.id) {
                            return MaterialItemCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit() }).then(() => { next(payload) });
                        } else {
                            return MaterialItemUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit() }).then(() => { next(payload) });
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

export default MaterialFormDialog