import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { isField, onFieldInit, onFieldMount, onFieldValueChange, onFormInit, onFormMount, } from '@formily/core';
import { Button, } from "antd";
import React, { } from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import { BnrRuleDefinitionCreateAsync, BnrRuleDefinitionUpdateAsync } from '@/services/openApi/BnrRuleDefinition';
import { v4 as uuidv4 } from 'uuid';
import { options } from 'devexpress-reporting/scopes/reporting-designer-controls-pivotGrid-metadata';
/**
 * 规则表单窗口
 * @param props 
 * @returns 
 */
const NewBnrRuleDefinitionFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit, data, isView, operationType } = props;

    const selectOption = data?.properties?.map((i) => ({
        label: i.displayName,
        value: i.name
    }))

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                data.items.map((item) => {
                    item.id = uuidv4()
                    item.contentCopy = item.content
                })
                form.setInitialValues(data);
            })

            onFormMount((form) => {
                if (isView) {
                    form.readPretty = true;
                }

            })

            onFieldMount('items.*.contentCopy', async (field) => {
                field.componentProps = {
                    options: selectOption
                }
            })

            onFieldValueChange('items.*.type', (field, form) => {
                const contentCopy = field.query(`.contentCopy`).take();
                if (isField(contentCopy) && field.value === 9) {
                    contentCopy.setDataSource(selectOption)
                }
            });
        }
    };
    const portalId = `sys.newBnrRuleDefinition${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 1160, }, portalId, () => {
                return (
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    const values = { ...payload.values }; // 确保创建新的对象

                    if (values.items?.length) {
                        values.items = values.items.map(item => ({
                            ...item,
                            content: item.type === 9 ? item.contentCopy : item.content
                        }));
                    }

                    if (operationType === 'copy') {
                        return BnrRuleDefinitionCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return BnrRuleDefinitionUpdateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default NewBnrRuleDefinitionFormDialog