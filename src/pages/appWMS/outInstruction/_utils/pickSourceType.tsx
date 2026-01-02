
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const PickSourceType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 10:
                return "无";
            case 20:
                return "生产领料";
            case 30:
                return "成品发货";
            case undefined:
                return ""
            default:
                return "未知"
        }
    }

    return renderPickType(value);
}

export default PickSourceType;