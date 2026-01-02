import { LanguageGetCulturelistAsync } from '@/services/openApi/Language';
import { useControllableValue, useRequest } from 'ahooks';
import { Select } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const Option = Select.Option;

const getData = (value: string) => {
    return LanguageGetCulturelistAsync({}).then(a => {
        return a;
    });
};

const CultureSelect = (props: SelectProps<any>) => {

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

    return (
        <Select
            placeholder="Select Culture"
            style={{ width: "100%" }}
            showSearch
            {...props}
            onSearch={(value) => { run(`displayName=*${value}`); }}
            loading={loading}
            onBlur={cancel}
            value={state}
            onChange={e => { setState(e); }}
        >
            {data?.map((d) => <Option key={d.name} value={d.name!} title={d.displayName}>{d.displayName}</Option>)}
        </Select>
    );
}

export default CultureSelect;