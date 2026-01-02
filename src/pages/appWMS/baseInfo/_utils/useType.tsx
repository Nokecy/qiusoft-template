
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const UseType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderZoneClass = (text) => {
        switch (text) {
            case 5:
                return "收货";
            case 10:
                return "发货";
            default:
                return "未知"
        }
    }

    return renderZoneClass(value);
}

export default UseType;