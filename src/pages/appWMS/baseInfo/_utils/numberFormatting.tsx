
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const NumberFormatting = (props: ICellRendererParams) => {
    const { value } = props;

    const renderZoneClass = (text) => {
        switch (text) {
            case 5:
                return <Tag color={"#237804"}>按LPN分配</Tag>;
            case 10:
                return <Tag color={"#006d75"}>按ITEM分配</Tag>;
            case 15:
                return <Tag color={"skyblue"}>按批次分配</Tag>;
            default:
                return <Tag color={"#5c0011"}>未知</Tag>;
        }
    }

    return renderZoneClass(value);
}

export default NumberFormatting;