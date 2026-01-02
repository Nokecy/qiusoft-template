import React from "react";
import { SelectProps } from "antd";
import { useControllableValue } from "ahooks";
import Select, { SelectValue } from "antd/lib/select";
import { warehouseZoneTypeOptions } from "./warehouseZoneTypeEnum";

const { Option } = Select;

/**
 * 库区类型选择组件 - 基于通用enum实现
 */
const WarehouseZoneTypeSelect = (props: SelectProps<any>) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    return (
        <Select
            style={{ width: "100%" }}
            filterOption={false}
            {...props}
            value={state}
            onChange={e => { setState(e); }}
        >
            {warehouseZoneTypeOptions.map((item: any) => (
                <Option key={item.value} value={item.value}>
                    {item.label}
                </Option>
            ))}
        </Select>
    );
};

export default WarehouseZoneTypeSelect;