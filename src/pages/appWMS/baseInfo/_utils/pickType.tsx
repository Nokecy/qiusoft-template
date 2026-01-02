
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const PickType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 10:
                return <Tag color={"#0958d9"}>先进先出</Tag>;
            case 20:
                return <Tag color={"#780650"}>滚动发料</Tag>;
            case 30:
                return <Tag color={"#061178"}>按批次发料</Tag>;
            default:
                return <Tag color={"#5c0011"}>未知</Tag>;
        }
    }

    return renderPickType(value);
}

export default PickType;