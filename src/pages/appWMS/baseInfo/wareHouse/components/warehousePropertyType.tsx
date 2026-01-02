import { ICellRendererParams } from "ag-grid-community";
import { Select, Tag } from "antd";
import React from "react";
const { Option } = Select;

const WarehousePropertyType = (props: ICellRendererParams) => {
  const { value } = props;

  const renderWareHousePropertyType = (text) => {
    switch (text) {
      case 5:
        return <Tag color={"cyan"}>良品库</Tag>;
      case 10:
        return <Tag color={"lime"}>不良品库</Tag>;
      case 15:
        return <Tag color={"yellow"}>黑名单</Tag>;
      default:
        return <Tag color={"error"}>未知</Tag>;
    }
  }

  return renderWareHousePropertyType(value);
}

const gradeMap = [{ label: "良品库", value: "5" }, { label: "不良品库", value: "10" }, { label: "黑名单", value: "15" }]
const WareHousePropertyQuery = (props: any) => {
  return (
    <Select {...props}>
      {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)}</Select>
  );
};

export default WareHousePropertyQuery;
export { WarehousePropertyType }