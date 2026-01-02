import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";

const { Option } = Select;

const CountParamBoxStatusSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);
  const gradeMap = [
    { label: "全部", value: "5" }, 
    { label: "整箱", value: "10" }, 
    { label: "开箱", value: "15" }
  ];

  return (
    <Select {...props} value={state} onChange={setState}>
      {gradeMap.map((i: any) => (
        <Option key={i.value} value={i.value}>
          {i.label}
        </Option>
      ))}
    </Select>
  );
};

const CountTypeSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);
  const gradeMap = [
    { label: "指令盘点", value: "5" }, 
    { label: "循环盘点", value: "10" }, 
    { label: "冻结盘点", value: "15" }, 
    { label: "主动盘点", value: "20" }, 
    { label: "退库盘点", value: "25" }
  ];

  return (
    <Select
      style={{ width: "100%" }}
      filterOption={false}
      {...props}
      value={state}
      onChange={setState}
    >
      {gradeMap.map((i: any) => (
        <Option key={i.value} value={i.value}>
          {i.label}
        </Option>
      ))}
    </Select>
  );
};

export { CountTypeSelect };
export default CountParamBoxStatusSelect;



