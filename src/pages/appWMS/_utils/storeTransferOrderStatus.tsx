
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const StoreTransferOrderStatus = (props: ICellRendererParams) => {
    const { value } = props;

    const renderStoreTransferTaskStatus = (text) => {
        switch (text) {
            case 5:
                return <Tag color={"processing"}>等待处理</Tag>;
            case 10:
                return <Tag color={"success"}>正在调拨</Tag>;
            case 15:
                return <Tag color={"cyan"}>调拨出库</Tag>;
            case 20:
                return <Tag color={"yellow"}>调拨入库</Tag>;
            case 25:
                return <Tag color={"yellow"}>取消</Tag>;
            case 30:
                return <Tag color={"yellow"}>完成</Tag>;
            default:
                return "未知"
        }
    }

    return renderStoreTransferTaskStatus(value);
}

export default StoreTransferOrderStatus;