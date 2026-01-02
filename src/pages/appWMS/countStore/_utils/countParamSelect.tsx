import { CountParamGetListAsync } from '@/services/wms/CountParam';
import { Select } from "@formily/antd-v5";
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React, { useEffect } from "react";
const { Option } = AntSelect;

const getData = (value?: string) => {
    return CountParamGetListAsync({
        Filter: value ? `name=*${value}` : undefined,
        SkipCount: 0,
        MaxResultCount: 300,
        Sorting: undefined,
    }).then(a => {
        return a.items
    });
};

const CountParamSelect = (props: SelectProps<any> & { disabledKeys?: any[] }, ref) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });

    useEffect(() => {
        run();
    }, [run]);

    return (
        <span ref={ref}>
            <Select
                placeholder="选择盘点参数"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                {...props}
                onSearch={(value) => { run(value); }}
                onDropdownVisibleChange={(visible) => { if (visible) run(); }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
            >
                {data?.map((countParam) => {
                    return <Option key={countParam.id} value={countParam.id!}>{`${countParam.name}`}</Option>
                })}
            </Select>
        </span>
    );
}

export default React.forwardRef(CountParamSelect);
