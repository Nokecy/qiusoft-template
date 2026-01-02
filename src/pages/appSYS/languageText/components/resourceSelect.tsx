import { LanguageGetResourcesAsync } from '@/services/openApi/Language';
import { useControllableValue, useRequest } from 'ahooks';
import { Select } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const Option = Select.Option;

const getData = (value: string) => {
    return LanguageGetResourcesAsync({}).then(a => {
        return a;
    });
};

const ResourceSelect = (props: SelectProps<any>) => {

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

    return (
        <Select
            placeholder="Select Resource"
            style={{ width: "100%" }}
            showSearch
            {...props}
            onSearch={(value) => { run(`name=*${value}`) }}
            loading={loading}
            onBlur={cancel}
            value={state}
            onChange={e => { setState(e); }}
        >
            {data?.map((d) => <Option key={d.name} value={d.name!} title={d.name}>{d.name}</Option>)}
        </Select>
    );
}

export default ResourceSelect;