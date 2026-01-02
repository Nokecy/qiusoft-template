
import { DialogSelect } from '@nokecy/qc-ui';
import { MaterialPickTaskTypeGetListAsync } from '@/services/wms/MaterialPickTaskType';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return MaterialPickTaskTypeGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined,
    });
};

const MaterialPickTaskTypeSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean; code: boolean }, ref) => {
    const { showId = true, code } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder='选择类型'
                style={{ width: '100%' }}
                showSearch
                labelInValue
                labelField={'name'}
                filterOption={false}
                allowClear
                {...props}
                onSearch={value => {
                    run({ Filter: `name=*${value}` });
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
                valueField={code ? 'type' : 'id'}
                request={getData}
                columnDefs={[
                    { field: 'type', headerName: '类型', flex: 1 },
                    { field: 'name', headerName: '名称', flex: 1 },
                ]}
            >
                {data?.items?.map(i => (
                    <Option value={code ? i.type! : i.id!} key={i.id!}>{i.name}</Option>
                ))}
            </DialogSelect>
        </span>
    );
};

export default React.forwardRef(MaterialPickTaskTypeSelect);
