import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";
import { warehousePropertyTypeOptions } from "./wareHousePropertyTypeEnum";

const { Option } = Select;

/**
 * 仓库属性类型选择器组件
 */
const WarehousePropertyTypeSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  return (
    <Select
      {...props}
      value={state}
      onChange={setState}
    >
      {warehousePropertyTypeOptions.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default WarehousePropertyTypeSelect;