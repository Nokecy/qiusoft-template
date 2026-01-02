
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const BarCodeType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 5:
                return <Tag color={"red"}>产品条码</Tag>;
            case 10:
                return <Tag color={"cyan"}>箱条码</Tag>;
            case 15:
                return <Tag color={"success"}>栈板条码</Tag>;
            default:
                return <Tag color={"red"}>未知</Tag>;
        }
    }

    return renderPickType(value);
}

export default BarCodeType;