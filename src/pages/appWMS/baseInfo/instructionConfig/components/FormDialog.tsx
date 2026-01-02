import { InstructionConfigCreateAsync, InstructionConfigGetAsync, InstructionConfigUpdateAsync } from '@/services/wms/InstructionConfig';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import { useFormSchema, useSchemaField } from "umi";
import React, { } from "react";
import { formId, formSchema } from "./schema";
import { isArray } from 'lodash';
import FormLayoutMode from '@/pages/_utils/editMode';

const InstructionConfigFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let Supplier = await InstructionConfigGetAsync({ id: entityId });
                    // const xijun = "H0077,W1001"
                    if (Supplier?.wareHouses) {
                        const match = Supplier?.wareHouses.split(',')
                        if (match) {
                            const wareHouses = match.map((item) => {
                                return {
                                    key: item,
                                    value: item,
                                    // label:item
                                }
                            })
                            form.setInitialValuesIn('wareHouse', wareHouses)
                        }
                    }
                    form.setInitialValuesIn('type', Supplier?.type)
                    form.setInitialValuesIn('providerCode', Supplier?.providerCode)
                    form.setInitialValuesIn('providerName', Supplier?.providerName)
                    form.setInitialValuesIn('providerCodeCopy', Supplier?.providerCode)
                    form.setInitialValuesIn('providerNameCopy', Supplier?.providerName)
                    form.setInitialValuesIn('transferInOrderProviderName', Supplier?.transferInOrderProviderName)
                    form.setInitialValuesIn('transferInOrderProviderDescribe', Supplier?.transferInOrderProviderDescribe)
                    form.setInitialValues(Supplier);
                }
            })
        }
    };

    const portalId = `WMS.base.instructionConfig${entityId}`


    return (
        <FormDialog.Portal id={portalId}>
            <Button type={"primary"} onClick={async () => {
                console.log(schema);
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
                        const { providerNameCopy, providerCodeCopy, wareHouse } = values
                        let wareHouses = ''
                        if (wareHouse && isArray(wareHouse)) {
                            wareHouse.map((item: any, index) => {
                                if (index === 0) {
                                    wareHouses = `${item.value}`
                                } else {
                                    wareHouses = `${wareHouses},${item.value}`
                                }
                            })
                        }
                        let body: any
                        if (values.type === 10) {
                            body = { providerCode: providerCodeCopy, providerName: providerNameCopy, ...values }
                            delete body.providerCodeCopy
                            delete body.providerNameCopy
                        } else {
                            body = { ...values }
                        }
                        body.wareHouses = wareHouses

                        if (!values.id) {
                            return InstructionConfigCreateAsync(body).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                        } else {
                            return InstructionConfigUpdateAsync({ id: values.id }, body).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default InstructionConfigFormDialog