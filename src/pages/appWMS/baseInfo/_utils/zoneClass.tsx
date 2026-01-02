
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const ZoneClass = (props: ICellRendererParams) => {
    const { value } = props;

    const renderZoneClass = (text) => {
        switch (text) {
            case 5:
                return "货台";
            case 10:
                return "交接区";
            case 15:
                return "存储区";
            default:
                return "未知"
        }
    }

    return renderZoneClass(value);
}

export default ZoneClass;