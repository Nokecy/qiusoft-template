import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
import { WMSProviderGetOutInstructionProviderList } from '@/services/wms/WMSProvider';
import NewDialogSelect from '@/components/newDialogSelect';
const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return WMSProviderGetOutInstructionProviderList({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

/**
 * 出库指令提供者选择器
 * @param props 
 * @param ref 
 * @returns 
 */
const OutstructionConfigSelect = (props: SelectProps<any>, ref) => {

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <NewDialogSelect
                placeholder="选择提供者"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                labelInValue
                {...props}
                onSearch={(value) => { run({ Filter: `code=*${value}` }); }}
                onDropdownVisibleChange={(visible) => { visible && run({}) }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
                valueField={"value"}
                request={getData}
                columnDefs={[
                    { field: "value", headerName: "编码", flex: 1 },
                    { field: "label", headerName: "名称", flex: 1 },
                ]}
            >
                {data?.map((i) => <Option value={i.value!} key={i.value}>{`${i.label}`}</Option>)}
            </NewDialogSelect>
        </span>
    );
}

export default React.forwardRef(OutstructionConfigSelect);
