import NewDialogSelect from '@/components/newDialogSelect';
// import { LabelTypeGetLabelInfoContributorListAsync } from '@/services/wms/LabelType';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    // return LabelTypeGetLabelInfoContributorListAsync({
    //     Filter: Filter ? Filter : undefined,
    //     SkipCount: SkipCount ? SkipCount : 0,
    //     MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    //     Sorting: Sorting ? Sorting : undefined
    // });
};

const LabellingTypeSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <NewDialogSelect
                placeholder="选择标签类型"
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
                valueField={"name"}
                labelField={"displayName"}
                request={getData}
                columnDefs={[
                    { field: "name", headerName: "编码", flex: 1 },
                    { field: "displayName", headerName: "显示名称", flex: 1 },
                ]}
            >
                {data?.map((e) => <Option value={e.name!}>{e.displayName!}</Option>)}
            </NewDialogSelect>
        </span>
    );
}

export default React.forwardRef(LabellingTypeSelect);