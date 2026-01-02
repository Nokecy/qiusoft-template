import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";
import { qualityStatusOptions } from "./qualityStatusEnum";

const { Option } = Select;

/**
 * 质量状态选择器组件
 */
const QualityStatusSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  return (
    <Select
      style={{ width: "100%" }}
      filterOption={false}
      {...props}
      value={state}
      onChange={setState}
    >
      {qualityStatusOptions.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default QualityStatusSelect;