/**
 * BNR 目标规则选择组件
 * 用于选择目标规则名称，显示用户自定义的Name
 * 只显示动态规则，排除系统规则（name == __SystemRule）
 */

import React from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/lib/select';
import { useControllableValue, useRequest } from 'ahooks';
import { BnrRuleDefinitionGetDynamicRulesAsync } from '@/services/openApi/BnrRuleDefinition';

const { Option } = Select;

/**
 * 获取动态规则列表数据
 * 排除系统规则
 * @param ruleName - 规则名称，用于过滤只显示对应规则名称的动态规则
 */
const getData = async (ruleName?: string) => {
  try {
    if (!ruleName) {
      console.log('⚠️ ruleName 为空，无法加载目标规则列表');
      return [];
    }

    const result = await BnrRuleDefinitionGetDynamicRulesAsync({
      RuleName: ruleName, // 只获取指定规则名称的动态规则
      IncludeSystemRule: false, // 排除系统规则
      Active: true, // 只获取激活的规则
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 加载目标规则列表 - RuleName:', ruleName);
      console.log('📋 返回的规则数量:', result?.length || 0);
    }

    return result || [];
  } catch (error) {
    console.error('Failed to load dynamic rules:', error);
    return [];
  }
};

/**
 * BNR 目标规则选择组件
 * 显示用户自定义的 name 字段
 */
const BnrTargetRuleSelect = (props: SelectProps<any> & { ruleName?: string }, ref) => {
  const [state, setState] = useControllableValue<SelectValue>(props);
  const { ruleName, ...restProps } = props;

  // 添加调试：查看组件接收到的 props
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 BnrTargetRuleSelect 组件 props:', {
        propsValue: props.value,
        propsDefaultValue: props.defaultValue,
        state: state,
        ruleName: ruleName
      });
    }
  }, [props.value, props.defaultValue, state, ruleName]);

  const { data, loading, run, cancel } = useRequest(
    () => getData(ruleName),
    {
      manual: true,
      refreshDeps: [ruleName], // 当 ruleName 变化时重新加载
    }
  );

  // 当 ruleName 存在时，立即加载数据（无论是否有初始值）
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 BnrTargetRuleSelect useEffect:', {
        hasState: !!state,
        state: state,
        ruleName: ruleName,
        hasData: !!data,
        dataLength: data?.length
      });
    }
    // 只要有 ruleName 且没有数据，就加载
    if (ruleName && !data) {
      console.log('🔄 BnrTargetRuleSelect 自动加载数据');
      run();
    }
  }, [state, ruleName, data, run]);

  return (
    <span ref={ref}>
      <Select
        placeholder={ruleName ? '请选择目标规则名称' : '请先选择规则名称'}
        style={{ width: '100%' }}
        showSearch
        labelInValue
        {...restProps}
        disabled={!ruleName || restProps.disabled}
        loading={loading}
        onDropdownVisibleChange={(visible) => {
          if (visible && ruleName) {
            run();
          }
        }}
        onBlur={cancel}
        value={state}
        onChange={(e) => {
          setState(e);
        }}
        filterOption={(input, option) =>
          (option?.children?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
        }
      >
        {data?.map((item) => (
          <Option key={item.name || item.ruleName} value={item.name || item.ruleName || ''}>
            {item.name || item.displayName || item.ruleName}
          </Option>
        ))}
      </Select>
    </span>
  );
};

BnrTargetRuleSelect.displayName = 'BnrTargetRuleSelect';

export default React.forwardRef(BnrTargetRuleSelect);
