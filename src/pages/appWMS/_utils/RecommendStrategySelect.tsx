import { DialogSelect } from '@/components';
import { IDialogSelectProps } from '@/components/dialogSelect';
import { PutItemRecommendStrategyGetListAsync } from '@/services/wms/PutItemRecommendStrategy';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return PutItemRecommendStrategyGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const RecommendStrategySelect = (props: SelectProps<any> & IDialogSelectProps & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true, labelField } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择上架策略"
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
                valueField={"id"}
                request={getData}
                columnDefs={[
                    { field: "id", headerName: "编码", flex: 1 },
                    { field: "name", headerName: "名称", flex: 1 },
                ]}
            >
                {data?.items!.map((item) => <Option value={item.id!}>{item.name}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(RecommendStrategySelect); 