import { Select } from "antd";
import { useControllableValue, useRequest } from 'ahooks';
import { SelectProps, SelectValue } from "antd/lib/select";
import React, { } from "react";
import { ExcludeCompareSettingGetCompareTypes } from "@/services/wms/ExcludeCompareSetting";
const { Option } = Select;

const getData = (value: string) => {
    return ExcludeCompareSettingGetCompareTypes({});
};

const compareSettingTypeSelect = (props: any, ref) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500 });

    return (
        <span ref={ref}>
            {props?.readonly ? data?.find(i => i.itemValue === props.value)?.itemName :
                <Select
                    style={{ width: "100%" }}
                    filterOption={false}
                    showSearch

                    {...props}
                    loading={loading}
                    onBlur={cancel}
                    value={state}
                    onChange={e => { setState(e); }}>
                    {
                        data?.map(value => {
                            return <Option value={value.itemValue} title={value.itemName}>{`${value.itemName}`}</Option>
                        })
                    }
                </Select>}
        </span>
    );
}

export default React.forwardRef(compareSettingTypeSelect);