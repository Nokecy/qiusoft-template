import { DialogSelect } from '@/components';
import { IDialogSelectProps } from '@/components/dialogSelect';
import { RealRightInfoGetListAsync } from '@/services/wms/RealRightInfo';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return RealRightInfoGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const WareHouseshadowSelect = (props: SelectProps<any> & IDialogSelectProps & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId, labelField } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择物权信息"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                labelInValue
                {...props}
                onSearch={(value) => { run({ Filter: `name=*${value}` }); }}
                onDropdownVisibleChange={(visible) => { visible && run({}) }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
                 valueField={showId ? "id" :"code"} 
                 request={getData}
                columnDefs={[
                    { field: "code", headerName: "编码", flex: 1 },
                    { field: "name", headerName: "名称", flex: 1 },
                ]}
            >
                {data?.items!.map((wareHouse) => <Option value={showId ? wareHouse.id : wareHouse.code!}>{wareHouse.name}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(WareHouseshadowSelect); 