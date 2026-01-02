import React from 'react';
import {
    FormDialog,
    FormLayout,
} from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { formSchema } from './schema';
import { message, Button } from 'antd';
import { useSchemaField } from 'umi';
import {
    BnrRuleEvaluationConfigCreateAsync,
    BnrRuleEvaluationConfigUpdateAsync,
    BnrRuleEvaluationConfigGetAsync
} from '@/services/openApi/BnrRuleEvaluationConfig';
import { BnrRuleDefinitionGetStaticRulesAsync, BnrRuleDefinitionGetDynamicRulesAsync } from '@/services/openApi/BnrRuleDefinition';
import { fromApiFormat, toApiFormat, validateConversion } from './ruleConverter';

interface BnrRuleEvaluationConfigFormDialogProps {
    title?: string;
    entityId?: string;
    data?: any;
    operationType?: 'edit' | 'add';
    onAfterSubmit?: () => void;
    isView?: boolean;
    buttonProps?: any;
}

const BnrRuleEvaluationConfigFormDialog: React.FC<BnrRuleEvaluationConfigFormDialogProps> = (props) => {
    const { title, entityId, data, operationType, onAfterSubmit, isView = false, buttonProps } = props;
    const BnrRuleSelect = require('./BnrRuleSelect').default;
    const BnrTargetRuleSelect = require('./BnrTargetRuleSelect').default;
    const BnrRuleBuilderWrapper = require('./BnrRuleBuilderWrapper').default;
    const SchemaField = useSchemaField({
        BnrRuleSelect,
        BnrTargetRuleSelect,
        BnrRuleBuilderWrapper,
    });

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (data) {
                    try {
                        // 如果有ID,始终加载完整数据(编辑和查看模式都需要)
                        let formData = data;
                        if (data.id) {
                            console.log('📋 加载规则评估配置详情, ID:', data.id);
                            formData = await BnrRuleEvaluationConfigGetAsync({ id: data.id });
                            console.log('✅ 加载的完整数据:', formData);
                        }

                        // 转换规则组JSON为前端格式
                        if (formData.ruleGroupJson) {
                            console.log('🔄 开始转换规则组JSON:', formData.ruleGroupJson);
                            const convertedRuleGroup = fromApiFormat(formData.ruleGroupJson);
                            console.log('🎯 转换后的规则组:', convertedRuleGroup);

                            if (!validateConversion(convertedRuleGroup)) {
                                console.error('❌ 规则组数据验证失败');
                                message.warning('规则数据格式异常,已自动清空规则配置');
                                formData.ruleGroupJson = undefined;
                            } else {
                                console.log('✅ 规则组数据验证成功');
                                formData.ruleGroupJson = convertedRuleGroup;
                            }
                        } else {
                            console.log('ℹ️ 没有规则组配置数据');
                        }

                        // 转换复合字段：规则名称
                        // Formily 复合字段需要分别设置 value 和 label 两个独立字段
                        if (formData.ruleName) {
                            try {
                                // 查询静态规则获取 displayName
                                const staticRules = await BnrRuleDefinitionGetStaticRulesAsync();
                                const ruleInfo = staticRules?.find(r => r.ruleName === formData.ruleName);
                                const ruleDisplayName = ruleInfo?.ruleDisplayName || formData.ruleName;

                                // 直接设置两个独立字段，Formily 会自动组合为复合字段
                                formData.ruleDisplayName = ruleDisplayName;
                                console.log('🔄 设置规则名称字段:', {
                                    ruleName: formData.ruleName,
                                    ruleDisplayName: formData.ruleDisplayName
                                });
                            } catch (error) {
                                console.error('❌ 查询规则 displayName 失败:', error);
                            }
                        }

                        // 转换复合字段：目标规则名称
                        // 后端没有 targetRuleDisplayName 字段，需要查询或使用 targetRuleName 本身
                        if (formData.targetRuleName && formData.ruleName) {
                            try {
                                // 查询动态规则获取 displayName（name字段）
                                const dynamicRules = await BnrRuleDefinitionGetDynamicRulesAsync({
                                    RuleName: formData.ruleName,
                                    IncludeSystemRule: false,
                                    Active: true
                                });
                                const targetRuleInfo = dynamicRules?.find(r =>
                                    (r.name || r.ruleName) === formData.targetRuleName
                                );
                                // 优先使用 name，其次 displayName，最后使用 targetRuleName 本身
                                const targetRuleDisplayName = targetRuleInfo?.name || targetRuleInfo?.displayName || formData.targetRuleName;

                                // 直接设置两个独立字段，Formily 会自动组合为复合字段
                                formData.targetRuleDisplayName = targetRuleDisplayName;
                                console.log('🔄 设置目标规则名称字段:', {
                                    targetRuleName: formData.targetRuleName,
                                    targetRuleDisplayName: formData.targetRuleDisplayName,
                                    foundInDynamicRules: !!targetRuleInfo
                                });
                            } catch (error) {
                                console.error('❌ 查询目标规则 displayName 失败:', error);
                                // 查询失败时，使用 targetRuleName 本身作为 displayName
                                formData.targetRuleDisplayName = formData.targetRuleName;
                            }
                        }

                        form.setInitialValues(formData);

                        // 手动触发 ruleGroupJson 字段的 componentProps 更新，确保 ruleName 正确传递
                        if (formData.ruleName) {
                            const ruleGroupField = form.query('ruleGroupJson').take();
                            if (ruleGroupField) {
                                ruleGroupField.setComponentProps({
                                    ruleName: formData.ruleName
                                });
                                console.log('🔄 手动设置 ruleGroupJson 的 ruleName:', formData.ruleName);
                            }
                        }

                        // 查看模式设置所有字段为只读
                        if (isView) {
                            form.setPattern('readPretty');
                        }
                    } catch (error) {
                        message.error('加载数据失败');
                        console.error('Failed to load data:', error);
                    }
                }
            });
        }
    };

    const portalId = `appSYS.bnrRuleEvaluationConfig${entityId || 'new'}`;

    return (
        <FormDialog.Portal id={portalId}>
            <Button
                {...buttonProps}
                onClick={() => {
                    const formDialog = FormDialog(
                        { title, width: 800 },
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

                                // 转换规则组为后端JSON格式
                                if (values.ruleGroupJson) {
                                    if (!validateConversion(values.ruleGroupJson)) {
                                        message.error('规则配置数据格式错误,请检查后重试');
                                        hide();
                                        return;
                                    }
                                    const apiRuleGroupJson = toApiFormat(values.ruleGroupJson);
                                    values.ruleGroupJson = apiRuleGroupJson;
                                }

                                if (operationType === 'edit' && data?.id) {
                                    await BnrRuleEvaluationConfigUpdateAsync(
                                        { id: data.id },
                                        values
                                    );
                                    message.success('更新成功');
                                } else {
                                    await BnrRuleEvaluationConfigCreateAsync(values);
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

export default BnrRuleEvaluationConfigFormDialog;
