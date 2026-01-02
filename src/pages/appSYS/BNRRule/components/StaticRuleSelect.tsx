import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { BnrRuleDefinitionGetStaticRulesAsync } from '@/services/openApi/BnrRuleDefinition';
import { useField } from '@formily/react';

/**
 * 静态规则名称下拉选择组件
 * 自动加载静态规则列表并提供选择功能
 */
export const StaticRuleSelect: React.FC<SelectProps> = (props) => {
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const field = useField();

    useEffect(() => {
        loadStaticRules();
    }, []);

    const loadStaticRules = async () => {
        setLoading(true);
        try {
            const staticRules = await BnrRuleDefinitionGetStaticRulesAsync();
            console.log('📋 StaticRuleSelect加载静态规则:', staticRules);

            const ruleOptions = staticRules.map((rule: any) => ({
                label: rule.ruleDisplayName,
                value: rule.ruleName
            }));
            setOptions(ruleOptions);

            // 将完整的静态规则数据保存到表单的虚拟字段中，供其他字段使用
            if (field?.form) {
                field.form.setFieldState('$staticRules', state => {
                    state.value = staticRules;
                });
                console.log('✅ 虚拟字段$staticRules已设置, 数据长度:', staticRules.length);
            } else {
                console.warn('⚠️ 无法访问form实例');
            }
        } catch (error) {
            console.error('❌ 加载静态规则失败:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Select
            {...props}
            options={options}
            loading={loading}
            placeholder={props.placeholder || '请选择规则名称'}
        />
    );
};

export default StaticRuleSelect;
