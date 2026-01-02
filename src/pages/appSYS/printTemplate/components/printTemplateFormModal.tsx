import { PrintTemplateInfoUpdateAsync, PrintTemplateInfoGetAsync, PrintTemplateInfoCreateAsync } from '@/services/openApi/PrintTemplateInfo';
import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Input, Select, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from "antd";
import React, { useMemo } from "react";
import { useIntl } from "umi";

const PrintTemplateFormModal = (props: any) => {
    const { entityId, buttonProps, onAfterSubmit } = props;
    const intl = useIntl();

    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem, FormGrid, Checkbox, Space, Input, Select
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    PrintTemplateInfoGetAsync({ id: entityId }).then((entity) => {
                        form.setInitialValues(entity);
                    })
                }
            })
        }
    };

    const PortalId = `printTemplate${entityId}`;

    return (<FormDialog.Portal id={PortalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: "新建", width: 720 }, PortalId, (form) => {
                return <FormLayout labelWidth={80} labelCol={4} feedbackLayout={"none"}>
                    <SchemaField>
                        <SchemaField.String title={"名称"} required name={"name"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "名称" }} />

                        <SchemaField.String title={"类型"} required name={"templateType"} x-decorator="FormItem" x-component={"Select"} enum={[
                            { label: "报表", value: 5 },
                            { label: "ZPL", value: 10 },
                            { label: "EPL", value: 15 },
                            { label: "CPCL", value: 20 }
                        ]}
                            x-component-props={{ placeholder: "请输入模板类型" }} />

                        <SchemaField.String title={"描述"} name={"describe"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入描述" }} />

                        <SchemaField.String title={"模板内容"} required name={"templateContent"} x-decorator="FormItem"
                            x-component={"Input.TextArea"}
                            x-component-props={{ placeholder: "请输入模板内容" }}
                            x-reactions={{
                                dependencies: [".templateType"],
                                fulfill: {
                                    state: {
                                        visible: '{{$deps[0] !== 5}}'
                                    }
                                }
                            }}
                        />
                    </SchemaField>
                </FormLayout>
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return PrintTemplateInfoCreateAsync(values).then(() => {
                            next(payload);
                            if (onAfterSubmit) onAfterSubmit()
                        });
                    } else {
                        return PrintTemplateInfoUpdateAsync({ id: values.id }, values).then(() => {
                            next(payload);
                            if (onAfterSubmit) onAfterSubmit()
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

export default PrintTemplateFormModal
