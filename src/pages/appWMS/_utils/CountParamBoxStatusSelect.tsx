import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";
import { countParamBoxStatusOptions } from "./countParamBoxStatusEnum";

const { Option } = Select;

/**
 * 盘点参数箱体状态选择器组件
 */
const CountParamBoxStatusSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  return (
    <Select
      {...props}
      value={state}
      onChange={setState}
    >
      {countParamBoxStatusOptions.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default CountParamBoxStatusSelect;