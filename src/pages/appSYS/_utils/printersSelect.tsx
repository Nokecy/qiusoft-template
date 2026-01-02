
import { PrinterClientGetPrintersAsync } from '@/services/openApi/PrinterClient';
import { DialogSelect } from '@nokecy/qc-ui';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return PrinterClientGetPrintersAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined,
    });
};

const PrintersSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean; code: boolean }, ref) => {
    const { showId = true, code } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder='选择打印机'
                style={{ width: '100%' }}
                showSearch
                labelInValue
                labelField={'displayName'}
                filterOption={false}
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
                valueField={code ? 'code' : 'id'}
                request={getData}
                columnDefs={[
                    { field: 'displayName', headerName: '名称', flex: 1 },
                ]}
            >
                {data?.items?.map(i => (
                    <Option value={i.id!} key={i.id!}>{i.displayName}</Option>
                ))}
            </DialogSelect>
        </span>
    );
};

export default React.forwardRef(PrintersSelect);
