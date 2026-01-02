
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const OutInspectionProjectType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 0:
                return "输入框";
            case 1:
                return "日期选择";
            case 2:
                return "单选框"
            case 3:
                return "下拉选择框"
            default:
                return "未知"
        }
    }

    return renderPickType(value);
}

export default OutInspectionProjectType;