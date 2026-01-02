import React from "react";
import { Select } from "antd";

const LoopTypeSelect = (props: any) => {
    return <Select {...props}>
        <Select.Option value={10}>批次</Select.Option>
        <Select.Option value={20}>箱号</Select.Option>
        <Select.Option value={30}>批次属性</Select.Option>
    </Select>
}

export default LoopTypeSelect;