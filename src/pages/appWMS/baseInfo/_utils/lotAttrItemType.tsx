
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const LotAttrItemType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 0:
                return "字符串";
            case 1:
                return "数字";
            case 2:
                return "日期"
            default:
                return "未知"
        }
    }

    return renderPickType(value);
}

export default LotAttrItemType;