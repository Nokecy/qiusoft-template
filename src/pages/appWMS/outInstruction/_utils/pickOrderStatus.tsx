
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const PickOrderStatus = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 10:
                return "等待确认";
            case 15:
                return "审核完成";
            case 20:
                return "下架完成"
            default:
                return "未知"
        }
    }

    return renderPickType(value);
}

export default PickOrderStatus;