import { OrganizationInfoUpdateAsync, OrganizationInfoGetAsync, OrganizationInfoCreateAsync } from '@/services/openApi/OrganizationInfo';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from "antd";
import React from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import { OrganizationFunctionEnum, organizationFunctionConfig } from "./organizationFunction";

const OrganizationFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);
    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    OrganizationInfoGetAsync({ id: entityId }).then((organizationInfo) => {
                        // 将 Flag 枚举值转换为数组形式用于多选框
                        const functionArray: number[] = [];
                        const organizationFunction = organizationInfo.organizationFunction || 0;

                        organizationFunctionConfig.forEach(item => {
                            if ((organizationFunction & item.value) === item.value) {
                                functionArray.push(item.value);
                            }
                        });

                        form.setInitialValues({ ...organizationInfo, organizationFunction: functionArray });
                    })
                }
            })
        }
    };
    const portalId = `organizationInfo${entityId}`
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

                    // 将数组形式的组织职能转换为 Flag 枚举值
                    const organizationFunctionArray = values.organizationFunction || [];
                    const organizationFunction = organizationFunctionArray.length > 0
                        ? organizationFunctionArray.reduce((a: number, b: number) => a | b, 0)
                        : 0;

                    const submitData = {
                        ...values,
                        organizationFunction: organizationFunction
                    };

                    if (!values.id) {
                        return OrganizationInfoCreateAsync(submitData)
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
                        return OrganizationInfoUpdateAsync({ id: values.id }, submitData)
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

export default OrganizationFormDialog