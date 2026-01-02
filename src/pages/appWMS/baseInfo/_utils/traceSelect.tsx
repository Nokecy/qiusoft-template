import { DialogSelect } from '@/components';
import { StockBinInfoGetListAsync } from '@/services/wms/StockBinInfo';
import { IDialogSelectProps } from '@/components/dialogSelect';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return StockBinInfoGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const TraceSelect = (props: SelectProps<any> & IDialogSelectProps & { disabledKeys?: any[], showId?: boolean, mode?: string, params?: any ,afterOnChange?:any}, ref) => {

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });
    const filter = `qty>0${props?.params?.materialId ? `,materialId=${props?.params?.materialId}` : ""}${props?.params?.wareHouseId ? `,wareHouseId=${props?.params?.wareHouseId}` : ""}`
    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择LPN载具号"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                labelInValue


                {...props}
                onSearch={(value) => { run({ Filter: `traceId=*${value},${filter}` }); }}
                onDropdownVisibleChange={(visible) => { visible && run({ Filter: filter }) }}

                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => {
                    setState(e);
                    let v = e.value||e;
                    let res =  data?.items?.find(i=>i.traceId==v);
                    if(res&&props.afterOnChange){
                        props.afterOnChange(res)
                    }
                }}
                request={getData}
                valueField="traceId"
                queryFun={() => {
                    return filter
                }}
                columnDefs={[
                    { field: "traceId", headerName: "LPN载具号", flex: 1 },
                    { field: "wareHouse.name", headerName: "库房名称", flex: 1 },
                ]}
            >
                {data?.items!.map((wareHouse) => <Option value={wareHouse.traceId!}>{wareHouse.traceId}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(TraceSelect); 