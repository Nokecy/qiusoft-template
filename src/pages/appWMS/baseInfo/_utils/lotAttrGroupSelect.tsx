import { LotAttrGroupGetListAsync } from '@/services/wms/LotAttrGroup';
import { Select } from "@formily/antd-v5";
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option } = AntSelect;

const getData = (value: string) => {
    return LotAttrGroupGetListAsync({ SkipCount: 0, MaxResultCount: 300, Sorting: undefined }).then(a => {
        return a.items
    });
};

const LotAttrGroupSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

    return (
        <span ref={ref}>
            <Select
                placeholder="选择批次属性"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                {...props}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
            >
                {data?.map((lotattr) => {
                    return showId ? <Option key={lotattr.id} value={lotattr.id!}>{`${lotattr.name}`}</Option> :
                        <Option key={lotattr.name} value={lotattr.name!}>{`${lotattr.name}`}</Option>
                })}
            </Select>
        </span>
    );
}

export default React.forwardRef(LotAttrGroupSelect);