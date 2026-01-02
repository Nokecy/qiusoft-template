import { DialogSelect } from '@/components';
import { IDialogSelectProps } from '@/components/dialogSelect';
import { WareHouseGetListAsync } from '@/services/wms/WareHouse';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React, { useEffect } from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return WareHouseGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const WareHouseshadowSelect = (props: SelectProps<any> & IDialogSelectProps & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true, labelField } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);
 
    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });
    useEffect(()=>{
        run({})
    },[])
    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择库房"
                style={{ width: "100%" }}
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
                    { field: "shadowWarehouseId", headerName: "编码", flex: 1 },
                    { field: "shadowWarehouseName", headerName: "名称", flex: 1 },
                ]}
            >
                {data?.items!.map((wareHouse) => <Option value={wareHouse.id!}>{`${wareHouse[labelField ?? "name"]}${wareHouse.name}`}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(WareHouseshadowSelect); 