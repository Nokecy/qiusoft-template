import { OpenIddictProScopeCreateAsync, OpenIddictProScopeUpdateAsync, OpenIddictProScopeGetAsync } from '@/services/openApi/OpenIddictProScope';
import { ArrayItems, Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Space, Select } from '@formily/antd-v5';
import { isField, onFormInit, onFormMount } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, Input } from "antd";
import React, { useMemo } from "react";
import { useIntl } from "umi";

const ScopeFormDialog = (props: any) => {
    const { entityId, buttonProps, title, onConfirm } = props;
    const intl = useIntl();

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem, FormGrid, Checkbox, Space, Input, ArrayItems, Select
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    OpenIddictProScopeGetAsync({ id: entityId }).then((appUser) => {
                        form.setInitialValues(appUser);
                    });
                }
            })
        }
    };

    const PortalId = `openIddictScope${entityId}`;
    return (<FormDialog.Portal id={PortalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 760 }, PortalId, (form) => {
                return <FormLayout labelWidth={80} feedbackLayout={"terse"}>
                    <SchemaField>
                        <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: 1, strictAutoFit: true }}>

                            <SchemaField.String required name={"name"} title={"名称"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入名称" }} />

                            <SchemaField.String name={"displayName"} title={"显示名称"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入显示名称" }} />

                            <SchemaField.String name={"description"} title={"描述"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入描述" }} />

                            <SchemaField.String name={"resources"} title={"资源"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入资源" }} />

                        </SchemaField.Void>
                    </SchemaField>
                </FormLayout>
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return OpenIddictProScopeCreateAsync(values).then(() => {
                           if( onConfirm ) onConfirm()
                            next(payload);
                        });
                    } else {
                        return OpenIddictProScopeUpdateAsync({ id: values.id }, values).then(() => {
                           if( onConfirm ) onConfirm();
                            next(payload);
                        });
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

export default ScopeFormDialog
