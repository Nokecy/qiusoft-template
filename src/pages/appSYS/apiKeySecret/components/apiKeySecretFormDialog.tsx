import { ApiKeySecretCreateAsync, ApiKeySecretGetAsync, ApiKeySecretUpdateAsync } from "@/services/openApi/ApiKeySecret";
import { FormDialog, DatePicker, FormGrid, FormItem, FormLayout, FormTab, Input, Select, Space, Checkbox } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from "antd";
import React, { useMemo } from "react";

const ApiKeySecretFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormTab, FormItem, FormGrid, Space, Input, Select, Checkbox, DatePicker
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await ApiKeySecretGetAsync({ id: entityId });
                    form.setInitialValues(workshiftsInfo);
                }
            })
        }
    };
    const portalId = `apikeysecret${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
                return (
                    <FormLayout labelWidth={80} feedbackLayout={'none'} shallow={false}>
                        <SchemaField>

                            <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>
                                <SchemaField.String title={"应用名称"} required name={"name"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入应用名称" }} />
                                <SchemaField.String title={"应用Key"} required name={"key"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入应用Key" }} />
                                <SchemaField.String title={"有效期"} required name={"expireAt"} x-decorator="FormItem" x-component={"DatePicker"} x-component-props={{ placeholder: "请输入有效期" }} />
                                <SchemaField.String title={"是否激活"} name={"active"} x-decorator="FormItem" x-component={"Checkbox"} />
                            </SchemaField.Void>
                        </SchemaField>
                    </FormLayout>)
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return ApiKeySecretCreateAsync(values).then(() => { if(onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return ApiKeySecretUpdateAsync({ id: values.id }, values).then(() => { if(onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default ApiKeySecretFormDialog