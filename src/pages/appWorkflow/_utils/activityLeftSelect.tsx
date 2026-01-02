import { WorkflowActivityGetLeftList } from '@/services/workflow/WorkflowActivity';
import { DialogSelect } from '@nokecy/qc-ui';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect, Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = AntSelect;



const ActivityLeftSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean; code: boolean, definitionId: string, activityId: string }, ref) => {
    const { code, definitionId, activityId } = props;

    const getData = ({ }: any) => {
        return WorkflowActivityGetLeftList({
            definitionId: definitionId,
            activityId: activityId
        });
    };

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <Select
                placeholder='选择流程节点'
                style={{ width: '100%' }}
                filterOption={false}
                showSearch
                labelInValue
                {...props}
                onSearch={value => {
                    run({ Filter: `activityName=*${value}` });
                }}
                onDropdownVisibleChange={visible => {
                    visible && run({});
                }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === '{}' ? undefined : state}
                onChange={e => {
                    setState(e);
                }}
            >
                {data?.reverse()?.map(i => (
                    <Option value={i.activityNodeId!} label={i.activityName}>{i.activityName}</Option>
                ))}
            </Select>
        </span>
    );
};

export default React.forwardRef(ActivityLeftSelect);
