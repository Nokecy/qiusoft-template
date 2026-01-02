import { TextTemplateContentsGetAsync, TextTemplateContentsUpdateAsync, TextTemplateContentsRestoreToDefaultAsync } from '@/services/openApi/TextTemplateContents'
import { TextTemplateDefinitionsGetAsync } from "@/services/openApi/TextTemplateDefinitions"
import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, } from '@formily/antd-v5';
import { isField, onFormInit, onFormMount } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, Input } from "antd";
import React, { useMemo, useState } from "react";

const UpdateFormDialog = (props: any) => {
    const { entityData, buttonProps, title, onConfirm } = props;

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem, FormGrid, Checkbox, TextArea: Input.TextArea, Input
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityData) {
                    TextTemplateDefinitionsGetAsync({ name: entityData.name }).then((res: any) => {
                        TextTemplateContentsGetAsync({ TemplateName: res.name, CultureName: res.defaultCultureName }).then(value => {
                            form.setInitialValues(value);
                        })
                    })


                }

            })


        }
    };

    const PortalId = `user${entityData.name}`;
    return (<FormDialog.Portal id={PortalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({
                title, width: 1024,
            }, PortalId, (form) => {
                return <FormLayout labelWidth={100} feedbackLayout={"terse"}>
                    <SchemaField>
                        <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>
                            <SchemaField.String title={"name"} name={"name"} x-decorator="FormItem" x-component={"Input"}
                                x-decorator-props={{ gridSpan: 4 }}
                                x-component-props={{ placeholder: "默认数据", disabled: true }} />
                            <SchemaField.String title={"cultureName"} name={"cultureName"} x-decorator="FormItem" x-component={"Input"}
                                x-decorator-props={{ gridSpan: 4 }}
                                x-component-props={{ placeholder: "默认数据", disabled: true }} />
                            <SchemaField.String title={"content"} required name={"content"} x-decorator="FormItem" x-component={"TextArea"}
                                x-decorator-props={{ gridSpan: 4 }}
                                x-component-props={{
                                    placeholder: "请填写content", autoFocus: true, autoSize: {
                                        minRows: 6
                                    }
                                }} />

                            {/* <SchemaField.String title={"是否启用"} name={"isActive"} x-decorator="FormItem" x-component={"Checkbox"} default={true} /> */}


                        </SchemaField.Void>
                    </SchemaField>
                    <Button type="primary" onClick={() => {
                        TextTemplateContentsRestoreToDefaultAsync({
                            templateName: entityData.name,
                            cultureName: entityData.defaultCultureName
                        }).then(() => {
                            TextTemplateDefinitionsGetAsync({ name: entityData.name }).then((res: any) => {
                                TextTemplateContentsGetAsync({ TemplateName: res.name, CultureName: res.defaultCultureName }).then(value => {
                                    form.setInitialValues(value);
                                })
                            })
                        });
                    }} style={{ position: 'absolute', bottom: 10, left: 16 }}>重置</Button>
                </FormLayout>
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    values.templateName = values.name;
                    delete values.name;
                    TextTemplateContentsUpdateAsync(values).then(() => {
                       if( onConfirm ) onConfirm();
                        next(payload);
                    });
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

export default UpdateFormDialog
