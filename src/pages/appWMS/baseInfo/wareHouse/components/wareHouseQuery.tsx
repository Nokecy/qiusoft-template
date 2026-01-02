import { connect } from "@formily/react";
import { ICellRendererParams } from "ag-grid-community";
import { Select, Tag } from "antd";
import React from "react";
const { Option } = Select;

const WareHouseType = (props: ICellRendererParams) => {
  const { value } = props;

  const renderWareHouseType = (text) => {
    switch (text) {
      case 5:
        return <Tag color={"cyan"}>自有库</Tag>;
      case 10:
        return <Tag color={"lime"}>客户库</Tag>;
      case 15:
        return <Tag color={"yellow"}>WMI库</Tag>;
      default:
        return <Tag color={"error"}>未知</Tag>;
    }
  }

  return renderWareHouseType(value);
}

const gradeMap = [{ label: "自有库", value: "5" }, { label: "客户库", value: "10" }, { label: "WMI库", value: "15" }]
const wareHouseQuery = (props: any) => {
  return (
    <Select
      {...props}
    >
      {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)}    </Select>
  );
};

export default wareHouseQuery;
export { WareHouseType }