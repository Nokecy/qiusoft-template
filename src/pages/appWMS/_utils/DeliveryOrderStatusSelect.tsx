import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";
import { deliveryOrderStatusOptions } from "./deliveryOrderStatusEnum";

const { Option } = Select;

/**
 * 送货单状态选择器组件
 */
const DeliveryOrderStatusSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  return (
    <Select
      {...props}
      value={state}
      onChange={setState}
    >
      {deliveryOrderStatusOptions.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default DeliveryOrderStatusSelect;