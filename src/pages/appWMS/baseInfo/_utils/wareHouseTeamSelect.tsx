import { DialogSelect } from '@/components';
import { WareHouseTeamGetListAsync } from '@/services/wms/WareHouseTeam';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return WareHouseTeamGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const WareHouseTeamSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }) => {
    const { showId = true } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });

    return (<DialogSelect
        placeholder="选择仓库班组"
        filterOption={false}
        showSearch
        {...props}
        onSearch={(value) => { run({ Filter: `name=*${value}` }); }}
        onDropdownVisibleChange={(visible) => { visible && run({}) }}
        labelInValue
        loading={loading}
        onBlur={cancel}
        value={JSON.stringify(state) === "{}" ? undefined : state}
        onChange={e => { setState(e); }}
        request={getData}
        columnDefs={[
            { field: "code", headerName: "编码", flex: 1 },
            { field: "name", headerName: "名称", flex: 1 },
        ]}
    >
        {data?.items!.map((wareHouse) => <Option value={wareHouse.id!}>{`${wareHouse.name}(${wareHouse.code})`}</Option>)}
    </DialogSelect>);
}

export default WareHouseTeamSelect