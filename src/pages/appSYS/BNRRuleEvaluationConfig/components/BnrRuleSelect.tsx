/**
 * BNR 规则选择组件
 * 用于选择序列号定义规则
 */

import React from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/lib/select';
import { useControllableValue, useRequest } from 'ahooks';
import { BnrRuleDefinitionGetStaticRulesAsync } from '@/services/openApi/BnrRuleDefinition';

const { Option } = Select;

/**
 * 获取规则列表数据
 */
const getData = () => {
  return BnrRuleDefinitionGetStaticRulesAsync().then((data) => {
    return data || [];
  });
};

/**
 * BNR 规则选择组件
 */
const BnrRuleSelect = (props: SelectProps<any>, ref) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, {
    manual: true,
  });

  // 当有初始值时，自动加载数据
  React.useEffect(() => {
    if (state && !data) {
      run();
    }
  }, [state, data, run]);

  return (
    <span ref={ref}>
      <Select
        placeholder="请选择规则名称"
        style={{ width: '100%' }}
        showSearch
        labelInValue
        {...props}
        loading={loading}
        onDropdownVisibleChange={(visible) => {
          if (visible) {
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
          <Option key={item.ruleName} value={item.ruleName!}>
            {item.ruleDisplayName || item.ruleName}
          </Option>
        ))}
      </Select>
    </span>
  );
};

export default React.forwardRef(BnrRuleSelect);
