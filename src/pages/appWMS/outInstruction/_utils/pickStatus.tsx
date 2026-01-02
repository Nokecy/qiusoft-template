
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const PickStatus = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 5:
                return <Tag color={"error"}>欠料</Tag>;
            case 10:
                return <Tag color={'warning'}>指令已下发</Tag>;
            case 15:
                return <Tag color={'warning'}>捡料中</Tag>;
            case 19:
                return <Tag color={'error'}>欠料交付</Tag>;
            case 20:
                return <Tag color={'success'}>已交付</Tag>;
            case 25:
                return <Tag color={'error'}>取消</Tag>;
            case undefined:
                return ""
            default:
                return "未知"
        }
    }

    return renderPickType(value);
}

export default PickStatus;