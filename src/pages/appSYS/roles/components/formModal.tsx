import { RoleCreateAsync, RoleGetAsync, RoleUpdateAsync } from "@/services/openApi/Role";
import { ArrayItems, Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Input, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from "antd";
import React, { useMemo } from "react";
import { useIntl } from "umi";

const RoleFormDialog = (props: any) => {
    const { entityId, buttonProps, onConfirm } = props;
    const intl = useIntl();

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem, FormGrid, Checkbox,
            Space, Input, ArrayItems
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    RoleGetAsync({ id: entityId }).then((entity) => {
                        form.setInitialValues(entity);
                    })
                }
            })
        }
    };

    const PortalId = `role${entityId}`;

    return (<FormDialog.Portal id={PortalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: "新建角色", width: 720 }, PortalId, (form) => {
                return <FormLayout wrapperCol={20} labelCol={4}>
                    <SchemaField>

                        <SchemaField.String title={"显示名称"} name={"isPublic"} x-decorator="FormItem" x-component={"Checkbox"} default={true} x-hidden={true} />

                        <SchemaField.String title={intl.formatMessage({ id: "AbpIdentity:DisplayName:RoleName" })} required name={"name"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: intl.formatMessage({ id: "AbpIdentity:DisplayName:RoleName" }) }} />


                        <SchemaField.Object name={"extraProperties"}>
                            <SchemaField.String title={"显示名称"} required name={"DisplayName"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入简短名称" }} />
                        </SchemaField.Object>

                        <SchemaField.String title={intl.formatMessage({ id: "AbpIdentity:DisplayName:IsDefault" })} name={"isDefault"} x-decorator="FormItem" x-component={"Checkbox"} />

                    </SchemaField>
                </FormLayout>
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return RoleCreateAsync(values).then(() => {
                            next(payload);
                           if( onConfirm ) onConfirm()
                        });
                    } else {
                        return RoleUpdateAsync({ id: values.id }, values).then(() => {
                            next(payload);
                           if( onConfirm ) onConfirm()
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

export default RoleFormDialog
