import { DialogSelect } from '@nokecy/qc-ui';
import { RoleGetListAsync } from '@/services/openApi/Role';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return RoleGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const RoleSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500 });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择角色"
                style={{ width: "100%" }}
                showSearch
                {...props}
                onSearch={(value) => {
                    run({ Filter: `${value}` });
                }}
                queryFun={(filter) => {
                    return filter && filter.split('^')[1].trim()
                }}
                onDropdownVisibleChange={(visible) => { visible && run({}) }}
                loading={loading}
                onBlur={cancel}
                mode="multiple"
                valueField="name"
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
                request={getData}
                columnDefs={[
                    { field: "name", headerName: "名称", width: 200 },
                ]}
            >
                {data && data.items!.map((item) => <Option key={item.name} value={item?.name}>{`${item.name}`}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(RoleSelect);