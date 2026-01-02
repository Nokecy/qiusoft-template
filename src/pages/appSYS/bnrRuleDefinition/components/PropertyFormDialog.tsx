import React from 'react';
import {
    FormDialog,
    FormLayout,
} from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { propertyFormSchema } from './propertySchema';
import { message, Button } from 'antd';
import { useSchemaField } from 'umi';
import {
    BnrPropertyDefinitionCreateAsync,
    BnrPropertyDefinitionUpdateAsync
} from '@/services/openApi/BnrPropertyDefinition';

interface PropertyFormDialogProps {
    title?: string;
    entityId?: string;
    data?: any;
    operationType?: 'edit' | 'add';
    onAfterSubmit?: () => void;
    buttonProps?: any;
    ruleName?: string;
}

const PropertyFormDialog: React.FC<PropertyFormDialogProps> = (props) => {
    const { title, entityId, data, operationType, onAfterSubmit, buttonProps, ruleName } = props;
    const SchemaField = useSchemaField();

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (data) {
                    form.setInitialValues(data);
                }
            });
        }
    };

    const portalId = `appSYS.bnrRuleDefinition.property${entityId || 'new'}`;

    return (
        <FormDialog.Portal id={portalId}>
            <Button
                {...buttonProps}
                onClick={() => {
                    const formDialog = FormDialog(
                        { title, width: 600 },
                        portalId,
                        () => {
                            return (
                                <FormLayout {...propertyFormSchema.form}>
                                    <SchemaField schema={propertyFormSchema.schema} />
                                </FormLayout>
                            );
                        }
                    );

                    formDialog
                        .forConfirm(async (payload, next) => {
                            const hide = message.loading('正在提交...', 0);
                            try {
                                const values = payload.values;
                                const submitData = {
                                    ...values,
                                    ruleName: ruleName || values.ruleName
                                };

                                if (operationType === 'edit' && data?.id) {
                                    await BnrPropertyDefinitionUpdateAsync(
                                        { id: data.id },
                                        submitData
                                    );
                                    message.success('更新成功');
                                } else {
                                    await BnrPropertyDefinitionCreateAsync(submitData);
                                    message.success('创建成功');
                                }

                                if (onAfterSubmit) {
                                    onAfterSubmit();
                                }
                                next(payload);
                            } catch (error) {
                                message.error('操作失败，请重试');
                            } finally {
                                hide();
                            }
                        })
                        .open(formProps);
                }}
            >
                {buttonProps?.title || title}
            </Button>
        </FormDialog.Portal>
    );
};

export default PropertyFormDialog;
