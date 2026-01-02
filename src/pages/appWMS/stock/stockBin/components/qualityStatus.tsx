import { ICellRendererParams } from "ag-grid-community";
import { useControllableValue } from "ahooks";
import { Select, SelectProps, Tag } from "antd";
import { SelectValue } from "antd/lib/select";
import React from "react";

const QualityStatus = (props: ICellRendererParams) => {
  const { value } = props;

  const qualityStatusType = (text) => {
    switch (text) {
      case 5:
        return <Tag color={"processing"}>检验中</Tag>;
      case 10:
        return <Tag color={"processing"}>合格</Tag>;
      case 20:
        return <Tag color={"processing"}>不合格</Tag>;
      case undefined:
        return "";
      default:
        return "未知";
    }
  };

  return qualityStatusType(value);
};
const { Option } = Select;

const QualityStatusSelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);
  const gradeMap = [
    { label: "检验中", value: 5 },
    { label: "合格", value: 10 },
    { label: "不合格", value: 20 },
  ];

  return (
    <Select
      style={{ width: "100%" }}
      filterOption={false}
      {...props}
      value={state}
      onChange={(e) => {
        setState(e);
      }}
    >
      {gradeMap.map((i: any) => (
        <Option value={i.value}>{i.label}</Option>
      ))}
    </Select>
  );
};

export { QualityStatus };
export default QualityStatusSelect;
