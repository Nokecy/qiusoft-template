import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";
import { wareHouseTypeOptions } from "./wareHouseTypeEnum";

const { Option } = Select;

/**
 * 仓库类型选择器组件
 */
const WareHouseTypeSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  return (
    <Select
      {...props}
      value={state}
      onChange={setState}
    >
      {wareHouseTypeOptions.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default WareHouseTypeSelect;