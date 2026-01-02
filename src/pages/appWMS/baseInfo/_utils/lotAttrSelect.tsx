import React from "react";
import { Select } from "antd";

const LotAttrSelect = (props: any) => {
    return <Select {...props}>
        <Select.Option value={"Property1"}>批次属性1</Select.Option>
        <Select.Option value={"Property2"}>批次属性2</Select.Option>
        <Select.Option value={"Property3"}>批次属性3</Select.Option>
        <Select.Option value={"Property4"}>批次属性4</Select.Option>
        <Select.Option value={"Property5"}>批次属性5</Select.Option>
        <Select.Option value={"Property6"}>批次属性6</Select.Option>
        <Select.Option value={"Property7"}>批次属性7</Select.Option>
        <Select.Option value={"Property8"}>批次属性8</Select.Option>
        <Select.Option value={"Property9"}>批次属性9</Select.Option>
        <Select.Option value={"Property10"}>批次属性10</Select.Option>
        <Select.Option value={"Property11"}>批次属性11</Select.Option>
        <Select.Option value={"Property12"}>批次属性12</Select.Option>
    </Select>
}

export default LotAttrSelect;