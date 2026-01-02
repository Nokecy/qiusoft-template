import { FactoryInfoUpdateAsync, FactoryInfoGetAsync, FactoryInfoCreateAsync } from '@/services/openApi/FactoryInfo';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from "antd";
import React from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";

const FactoryFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);
    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    FactoryInfoGetAsync({ id: entityId }).then((factoryInfo) => {
                        form.setInitialValues(factoryInfo);
                    })
                }
            })
        }
    };
    const portalId = `factoryInfo${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 1100, }, portalId, () => {
                return (<>
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>
                </>)
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return FactoryInfoCreateAsync(values)
                            .then(() => {
                                message.success('创建成功');
                                if (onAfterSubmit) onAfterSubmit();
                            })
                            .then(() => { next(payload) })
                            .catch((error) => {
                                message.error('创建失败: ' + (error.message || '未知错误'));
                                throw error;
                            });
                    } else {
                        return FactoryInfoUpdateAsync({ id: values.id }, values)
                            .then(() => {
                                message.success('更新成功');
                                if (onAfterSubmit) onAfterSubmit();
                            })
                            .then(() => { next(payload) })
                            .catch((error) => {
                                message.error('更新失败: ' + (error.message || '未知错误'));
                                throw error;
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

export default FactoryFormDialog