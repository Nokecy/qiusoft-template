import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";
import { countRuleTypeOptions } from "./countRuleTypeEnum";

const { Option } = Select;

/**
 * 盘点规则类型选择器组件
 */
const CountRuleTypeSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  return (
    <Select
      {...props}
      value={state}
      onChange={setState}
    >
      {countRuleTypeOptions.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default CountRuleTypeSelect;