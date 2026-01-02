
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const LoopType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderLoopType = (text) => {
        switch (text) {
            case 10:
                return <Tag color={"#0958d9"}>批次</Tag>;
            case 20:
                return <Tag color={"#780650"}>箱号</Tag>;
            case 30:
                return <Tag color={"#061178"}>批次属性</Tag>;
            default:
                return <Tag color={"#5c0011"}>未知</Tag>;
        }
    }

    return renderLoopType(value);
}

export default LoopType;