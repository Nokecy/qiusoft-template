import { DialogSelect } from '@/components';
import { IDialogSelectProps } from '@/components/dialogSelect';
import { PutItemRecommendStrategyGetProviderListAsync } from '@/services/wms/PutItemRecommendStrategy';
import { RealRightInfoGetListAsync } from '@/services/wms/RealRightInfo';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return PutItemRecommendStrategyGetProviderListAsync();
};

const RecommendStrategyProviderSelect = (props: SelectProps<any> & IDialogSelectProps & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true, labelField } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择提供者"
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
                valueField={"value"}
                request={getData}
                columnDefs={[
                    { field: "value", headerName: "编码", flex: 1 },
                    { field: "name", headerName: "名称", flex: 1 },
                ]}
            >
                {data?.map((item) => <Option value={item.value!}>{item.name}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(RecommendStrategyProviderSelect); 