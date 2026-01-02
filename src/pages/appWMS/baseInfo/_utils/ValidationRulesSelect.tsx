import { Select } from "@formily/antd-v5";
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option } = AntSelect;

const getData = (value: string, wareHouseId?: any) => {

};

const ValidationRulesSelect = (props: SelectProps<any>, ref) => {
    const { } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest((value) => { return getData(value) }, { debounceMaxWait: 500, refreshDeps: [] });

    return (
        <span ref={ref}>
            <Select
                placeholder="选择校验器"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                allowClear
                {...props}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
            >
                {data?.map((location) => <Option key={location.value} value={location.value!}>{`${location.label}`}</Option>)}
            </Select>
        </span>
    );
}

export default React.forwardRef(ValidationRulesSelect);