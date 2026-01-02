
import { ICellRendererParams } from "ag-grid-community";
import React from "react";
import { SelectProps, Tag } from "antd";
import { useControllableValue } from "ahooks";
import Select, { SelectValue } from "antd/lib/select";

const ReceiptType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderReceiptType = (text) => {
        switch (text) {
            case 10:
                return <Tag color={"cyan"}>等待收货</Tag>;
            case 20:
                return <Tag color={"lime"}>部分收货</Tag>;
            case 30:
                return <Tag color={"yellow"}>收货完成</Tag>;
            case 40:
                return <Tag color={"processing"}>部分上架</Tag>;
            case 50:
                return <Tag color={"success"}>上架完成</Tag>;
            case undefined:
                return ""
            default:
                return <Tag color={"error"}>未知</Tag>;
        }
    }

    return renderReceiptType(value);
}

const ReceiptItemType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderReceiptType = (text) => {
        switch (text) {
            case 10:
                return "等待接收";
            case 20:
                return "接收完成";
            case 30:
                return "上架完成"
            default:
                return "未知"
        }
    }

    return renderReceiptType(value);
}

const SourceOrderType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderReceiptType = (text) => {
        switch (text) {
            case 0:
                return "期初入库";
            case 5:
                return "采购入库";
            case 6:
                return "客供来料";
            case 10:
                return "销售退货单";
            case 15:
                return "生产入库"
            case 20:
                return "生产退料"
            case 22:
                return "转库入库"
            case 25:
                return "其他入库"
            default:
                return "未知"
        }
    }

    return renderReceiptType(value);
}
const { Option } = Select;
const SourceOrderTypeSelect = (props: SelectProps<any>) => {
    const [state, setState] = useControllableValue<SelectValue>(props);
    const gradeMap = [
        { label: "期初入库", value: 0 }, 
        { label: "采购入库", value: 5 }, 
        { label: "客供来料", value: 6 }, 
        { label: "销售退货单", value: 10 }, 
        { label: "生产入库", value: 15 }, 
        { label: "生产退料", value: 20 }, 
        { label: "转库入库", value: 22 }, 
        { label: "其他入库", value: 25 }]

    return (
        <Select
            style={{ width: "100%" }}
            filterOption={false}
            {...props}
            value={state}
            onChange={e => { setState(e); }}
        >
            {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)}
        </Select>
    );
}

export default ReceiptType;
export { ReceiptItemType, SourceOrderType, SourceOrderTypeSelect }