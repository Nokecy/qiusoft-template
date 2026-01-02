import { WareHouseLocationGetListAsync } from '@/services/wms/WareHouseLocation';
import { Select } from "@formily/antd-v5";
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option } = AntSelect;

const getData = (value: string, wareHouseId?: any) => {
    return WareHouseLocationGetListAsync({ Filter: `wareHouseId=${wareHouseId}`, SkipCount: 0, MaxResultCount: 10, Sorting: undefined }).then(a => {
        return a.items
    });
};

const WareHouseLocationSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean, wareHouseId?: any }, ref) => {
    const { showId = true, wareHouseId } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest((value) => { return getData(value, wareHouseId) }, { debounceMaxWait: 500, refreshDeps: [wareHouseId] });

    return (
        <span ref={ref}>
            <Select
                placeholder="选择客户"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                {...props}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
            >
                {data&& !showId && data.map((location) => <Option key={location.code} value={location.code!}>{`${location.code}`}</Option>)}

                {data&& showId && data.map((location) => <Option key={location.id} value={location.id!}>{`${location.code}`}</Option>)}
            </Select>
        </span>
    );
}

export default React.forwardRef(WareHouseLocationSelect);