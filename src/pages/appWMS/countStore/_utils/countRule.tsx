
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const CountRuleType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderCountRule = (text) => {
        switch (text) {
            case 5:
                return <Tag color={"processing"}>指令盘点</Tag>;
            case 10:
                return <Tag color={"success"}>循环盘点</Tag>;
            case 15:
                return <Tag color={"cyan"}>冻结盘点</Tag>;
            case 20:
                return <Tag color={"yellow"}>主动盘点</Tag>;
            case 25:
                return <Tag color={"error"}>退库盘点</Tag>;
            default:
                return "未知"
        }
    }

    return renderCountRule(value);
}

export default CountRuleType;


const CountParamboxstatus = (props: ICellRendererParams) => {
    const { value } = props;

    const renderCountParamboxstatus = (text) => {
        switch (text) {
            case 5:
                return <Tag color={"error"}>全部</Tag>;
            case 10:
                return <Tag color={"success"}>整箱</Tag>;
            case 15:
                return <Tag color={"cyan"}>开箱</Tag>;
            default:
                return "未知"
        }
    }

    return renderCountParamboxstatus(value);
}
export  {CountParamboxstatus};

const CountParamHighValueFlagStatus = (props: ICellRendererParams) => {
    const { value } = props;

    const renderCountParamboxstatus = (text) => {
        switch (text) {
            case 0:
                return <Tag color={"skyblue"}>全部</Tag>;
            case 1:
                return <Tag color={"success"}>是</Tag>;
            case 2:
                return <Tag color={"cyan"}>否</Tag>;
            default:
                return "未知"
        }
    }

    return renderCountParamboxstatus(value);
}
export  {CountParamHighValueFlagStatus};
