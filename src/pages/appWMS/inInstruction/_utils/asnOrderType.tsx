
import { ICellRendererParams } from "ag-grid-community";
import React from "react";
import { Select } from "antd";
import { useControllableValue, useRequest } from 'ahooks';
import { SelectProps, SelectValue } from "antd/lib/select";

const AsnOrderType = (props: ICellRendererParams) => {
    const { value } = props;

    const renderReceiptType = (text) => {
        switch (text) {
            case 5:
                return "采购入库";
            case 6:
                return "客供入库";
            case 10:
                return "销售退货单";
            case 15:
                return "生产入库"
            case 20:
                return "生产退料"
            case 25:
                return "其他入库"
            default:
                return "未知"
        }
    }

    return renderReceiptType(value);
}


const AsnOrderTypeSelect = (props: SelectProps<any>) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    return (
        <Select
            style={{ width: "100%" }}
            filterOption={false}
            showSearch
            {...props}
            value={state}
            onChange={e => { setState(e); }}
        >
            <Select.Option value={5} title={"采购订单"} >采购订单</Select.Option>
            <Select.Option value={10} title={"销售退货单"} >销售退货单</Select.Option>
            <Select.Option value={15} title={"生产入库"} >生产入库</Select.Option>
            <Select.Option value={20} title={"生产退料"} >生产退料</Select.Option>
            <Select.Option value={25} title={"其他入库"} >其他入库</Select.Option>
        </Select>
    );
}

export { AsnOrderTypeSelect };
export default AsnOrderType;