
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const LocationType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 5:
                return "作业区";
            case 6:
                return "虚拟区";
            case 10:
                return "存储区";
            case undefined:
                return ""
            default:
                return "未知"
        }
    }

    return renderPickType(value);
}

export default LocationType;