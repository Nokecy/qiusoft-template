import { useControllableValue } from "ahooks";
import { Select, SelectProps } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";

const { Option } = Select;
const gradeMap = [{ label: "是", value: true }, { label: "否", value: false }];

const MaterialItemQuery = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);
  
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

export default MaterialItemQuery;
