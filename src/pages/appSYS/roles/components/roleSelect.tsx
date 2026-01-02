import { RoleGetAllListAsync } from "@/services/openApi/Role";
import { useControllableValue, useRequest } from 'ahooks';
import { Select } from "antd";
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from "react";
const Option = Select.Option;

const getData = (value: string) => {
    return RoleGetAllListAsync({ Filter: value, IsPublic: true, Sorting: "", SkipCount: 0, MaxResultCount: 300 }).then(a => {
        return a.items;
    });
};

const RoleSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = false } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

    return (
        <span ref={ref}>
            <Select
                placeholder="Select Roles"
                style={{ width: "100%" }}
                showSearch
                {...props}
                onSearch={(value) => { run(`name=*${value}`); }}
                loading={loading}
                onBlur={cancel}
                value={state}
                onChange={e => { setState(e); }}
            >
                {data?.map((d) => <Option key={showId ? d.id : d.name} value={showId ? d.id! : d.name!} disabled={props.disabledKeys && props.disabledKeys?.findIndex(a => a === d.name) >= 0}>{d.name}</Option>)}
            </Select>
        </span>
    );
}

export default React.forwardRef(RoleSelect);