import { DialogSelect } from '@nokecy/qc-ui';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
import { BnrRuleDefinitionGetRulesByGroupNameAsync } from '@/services/openApi/BnrRuleDefinition';
const { Option, OptGroup } = AntSelect;



const NewBnrRuleDefinitionProviderSelect = (props: any & { disabledKeys?: any[]; showId?: boolean; code: boolean }, ref) => {
    const { showId = true, code, groupName, ruleFilter } = props;

    const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
        return BnrRuleDefinitionGetRulesByGroupNameAsync({ groupName }).then(data => {
            return data.filter(item => {
                if (ruleFilter) {
                    return item.ruleName?.includes(ruleFilter);
                } else {
                    return true;
                }
            });
        });
    };
    const getTableData = async ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
        const data = await BnrRuleDefinitionGetRulesByGroupNameAsync({ groupName });

        const newData = data.filter(item => {
            if (ruleFilter) {
                return item.ruleName?.includes(ruleFilter);
            } else {
                return true;
            }
        })

        return { items: newData, totalCount: newData?.length }
    };

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder='选择规则提供者'
                style={{ width: '100%' }}
                showSearch
                filterOption={false}
                labelInValue
                {...props}
                onSearch={value => {
                    run({ Filter: `displayName=*${value}` });
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
                valueField={'name'}
                request={getTableData}
                search={false}
                columnDefs={[
                    { field: 'name', headerName: '名称', width: 90 },
                    { field: 'displayName', headerName: '展示名称', width: 140 },
                    { field: 'ruleName', headerName: '规则名称', width: 140 },
                    { field: 'ruleDisplayName', headerName: '规则展示名称', width: 140 },
                    { field: 'ruleDescription', headerName: '描述', flex: 1 },
                ]}
            >
                {data?.map(i => (
                    <Option value={i.name}>{i.displayName}</Option>
                ))}
            </DialogSelect>
        </span>
    );
};

export default React.forwardRef(NewBnrRuleDefinitionProviderSelect);
