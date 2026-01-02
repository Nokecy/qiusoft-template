import React from 'react';
import {
    FormDialog,
    FormLayout,
} from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { formSchema } from './schema';
import { message, Button } from 'antd';
import { useSchemaField } from 'umi';
import {
    BnrRuleDefinitionCreateAsync,
    BnrRuleDefinitionUpdateAsync,
    BnrRuleDefinitionGetPropertiesByRuleNameAsync,
    BnrRuleDefinitionGetStaticRulesAsync
} from '@/services/openApi/BnrRuleDefinition';
import { StaticRuleSelect } from './StaticRuleSelect';

interface NewBnrRuleFormDialogProps {
    title?: string;
    entityId?: string;
    data?: any;
    operationType?: 'edit' | 'copy' | 'add';
    onAfterSubmit?: () => void;
    isView?: boolean;
    buttonProps?: any;
}

const NewBnrRuleFormDialog: React.FC<NewBnrRuleFormDialogProps> = (props) => {
    const { title, entityId, data, operationType, onAfterSubmit, isView = false, buttonProps } = props;
    const SchemaField = useSchemaField({
        StaticRuleSelect
    });

    const formProps = {
        effects: () => {
            // 表单初始化
            onFormInit(async (form) => {
                try {
                    if (data) {
                        // 加载属性数据
                        const properties = await BnrRuleDefinitionGetPropertiesByRuleNameAsync({
                            ruleName: data.ruleName
                        });

                        // 转换属性为下拉选项
                        const propertyOptions = properties.map((prop: any) => ({
                            label: prop.displayName,
                            value: prop.name
                        }));

                        // 保存属性选项到表单状态
                        form.setFieldState('$propertyOptions', state => {
                            state.value = propertyOptions;
                        });

                        // 数据回显：处理items中的content字段
                        const formData = {
                            ...data,
                            items: data.items?.map((item: any) => ({
                                ...item,
                                contentCopy: item.type === 9 ? item.content : undefined
                            })),
                            properties: properties
                        };

                        form.setInitialValues(formData);

                        // 设置规则名称字段的模式
                        if (operationType === 'edit' || isView) {
                            form.setFieldState('ruleName', state => {
                                state.pattern = 'readPretty';
                            });
                        }

                        // 查看模式设置所有字段为只读
                        if (isView) {
                            form.setPattern('readPretty');
                        }
                    }
                } catch (error) {
                    message.error('加载数据失败');
                    console.error('Failed to load data:', error);
                }
            });

            // 监听规则名称变化，动态加载属性列表并设置规则显示名称
            onFieldValueChange('ruleName', async (field) => {
                const ruleName = field.value;
                console.log('🔔 规则名称变化:', ruleName);

                if (ruleName) {
                    try {
                        // 获取静态规则列表以找到对应的规则显示名称
                        const staticRulesField = field.form.query('$staticRules').take();
                        let staticRules = staticRulesField?.value || [];
                        console.log('📚 虚拟字段$staticRules:', staticRules);

                        // 如果虚拟字段为空,主动加载静态规则数据
                        if (!staticRules || staticRules.length === 0) {
                            console.log('⚡ 虚拟字段为空,重新加载静态规则...');
                            staticRules = await BnrRuleDefinitionGetStaticRulesAsync();
                            console.log('📋 重新加载的静态规则:', staticRules);

                            // 更新虚拟字段
                            field.form.setFieldState('$staticRules', state => {
                                state.value = staticRules;
                            });
                        }

                        const selectedRule = staticRules.find((rule: any) => rule.ruleName === ruleName);
                        console.log('🎯 找到的规则:', selectedRule);

                        // 自动设置规则显示名称
                        if (selectedRule) {
                            console.log('✅ 设置规则显示名称:', selectedRule.ruleDisplayName);
                            field.form.setValues({
                                ruleDisplayName: selectedRule.ruleDisplayName
                            });
                            console.log('✔️ 设置完成，当前表单值:', field.form.values);
                        } else {
                            console.warn('⚠️ 未找到对应的规则');
                        }

                        // 加载属性列表
                        const properties = await BnrRuleDefinitionGetPropertiesByRuleNameAsync({
                            ruleName: ruleName
                        });

                        // 转换属性为下拉选项
                        const propertyOptions = properties.map((prop: any) => ({
                            label: prop.displayName,
                            value: prop.name
                        }));

                        // 更新属性选项
                        field.form.setFieldState('$propertyOptions', state => {
                            state.value = propertyOptions;
                        });

                        // 更新所有contentCopy字段的dataSource
                        field.form.query('items.*.contentCopy').forEach((field) => {
                            field.setComponentProps({
                                options: propertyOptions
                            });
                        });
                    } catch (error) {
                        console.error('Failed to load properties:', error);
                    }
                }
            });
        }
    };

    const portalId = `appSYS.bnrRule${entityId || 'new'}`;

    return (
        <FormDialog.Portal id={portalId}>
            <Button
                {...buttonProps}
                onClick={() => {
                    const formDialog = FormDialog(
                        { title, width: 1200 },
                        portalId,
                        () => {
                            return (
                                <FormLayout {...formSchema.form}>
                                    <SchemaField schema={formSchema.schema} />
                                </FormLayout>
                            );
                        }
                    );

                    formDialog
                        .forConfirm(async (payload, next) => {
                            if (isView) {
                                next(payload);
                                return;
                            }

                            const hide = message.loading('正在提交...', 0);
                            try {
                                const values = payload.values;

                                // 数据转换：处理items中的contentCopy字段
                                const submitData = {
                                    ...values,
                                    items: values.items?.map((item: any) => ({
                                        ...item,
                                        content: item.type === 9 ? item.contentCopy : item.content
                                    }))
                                };

                                if (operationType === 'edit') {
                                    await BnrRuleDefinitionUpdateAsync(submitData);
                                    message.success('更新成功');
                                } else {
                                    await BnrRuleDefinitionCreateAsync(submitData);
                                    message.success('创建成功');
                                }

                                if (onAfterSubmit) {
                                    onAfterSubmit();
                                }
                                next(payload);
                            } catch (error) {
                                message.error('操作失败，请重试');
                                console.error('Submit failed:', error);
                            } finally {
                                hide();
                            }
                        })
                        .open(formProps);
                }}
            >
                {buttonProps?.title}
            </Button>
        </FormDialog.Portal>
    );
};

export default NewBnrRuleFormDialog;
