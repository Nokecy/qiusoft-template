import { CompanyInfoGetListAsync } from "@/services/openApi/CompanyInfo";
import { useControllableValue, useRequest } from 'ahooks';
import { Select } from "antd";
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from "react";
const Option = Select.Option;

const getData = (value: string) => {
    return CompanyInfoGetListAsync({ Filter: value, Sorting: "", SkipCount: 0, MaxResultCount: 300 }).then(a => {
        return a.items;
    });
};

const SystemCompanySelect = (props: SelectProps<any> & { disabledKeys?: any[] }, ref) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

    return (
        <span ref={ref}>
            <Select
                placeholder="选择公司"
                style={{ width: "100%" }}
                showSearch
                {...props}
                loading={loading}
                onBlur={cancel}
                value={state}
                onChange={e => { setState(e); }}
            >
                {data?.map((d) => <Option key={d.code} value={d.code}>{d.chinaName}</Option>)}
            </Select>
        </span>
    );
}

export default React.forwardRef(SystemCompanySelect);