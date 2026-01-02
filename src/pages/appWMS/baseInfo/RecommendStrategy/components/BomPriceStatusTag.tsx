
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const BomPriceStatusTag = (props: ICellRendererParams) => {
    const { value } = props;

    const renderPickType = (text) => {
        switch (text) {
            case 1:
                return <Tag color={"blue"}>未开始</Tag>;
            case 2:
                return <Tag color={"cyan"}>进行中</Tag>;
            case 3:
                return <Tag color={"success"}>已完成</Tag>;
        }
    }

    return renderPickType(value);
}

export default BomPriceStatusTag;