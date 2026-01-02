import { Select } from "antd";
import { useControllableValue, useRequest } from 'ahooks';
import { SelectProps, SelectValue } from "antd/lib/select";
import React, { useState } from "react";

const DeliveryTypeSelect = (props: SelectProps<any>, ref) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    return (
        <span ref={ref}>
            <Select
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                {...props}
                value={state}
                onChange={e => { setState(e); }}
            >
                <Select.Option value={10} title={"入库直发"} >入库直发</Select.Option>
                <Select.Option value={20} title={"JIT发货"} >JIT发货</Select.Option>
            </Select>
        </span>
    );
}

export default React.forwardRef(DeliveryTypeSelect);