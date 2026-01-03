import { ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList } from '@/services/workflow/WorkflowDefinitions';
import { DialogSelect } from '@nokecy/qc-ui';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        VersionOptions: "Latest",
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const ProcessTypeConfigSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择任务流程"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                labelInValue
                valueField={"description"}
                {...props}
                onSearch={(value) => { run({ Filter: `description=*${value}` }); }}
                onDropdownVisibleChange={(visible) => { visible && run({}) }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
                request={getData}
                columnDefs={[
                    { field: "name", headerName: "名称", flex: 1 },
                ]}
            >
                {data?.items!.map((item) => <Option value={item.name!}>{item.description}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(ProcessTypeConfigSelect);