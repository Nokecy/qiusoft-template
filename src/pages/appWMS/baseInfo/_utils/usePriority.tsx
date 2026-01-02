
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const UsePriority = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 5:
                return "低";
            case 10:
                return "中";
            case 15:
                return "高";
            default:
                return "未知"
        }
    }

    return renderPickType(value);
}

export default UsePriority;