import { DialogSelect } from '@/components';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
import { WareHouseGetListAsync } from '@/services/wms/WareHouse';
const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return WareHouseGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

/**
 * 仓库选择器
 * @param props 
 * @param ref 
 * @returns 
 */
const WarehouseSelect = (props: any, ref) => {
    const { Filter, code } = props

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择仓库"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                labelInValue
                allowClear
                {...props}
                // mode='multiple'
                onSearch={(value) => { run({ Filter: `name=*${value}` }); }}
                onDropdownVisibleChange={(visible) => { visible && run({}) }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
                valueField={code ? 'code' : "id"}
                request={getData}
                columnDefs={[
                    { field: "code", headerName: "编码", flex: 1 },
                    { field: "name", headerName: "名称", flex: 1 },
                ]}
            >
                {
                    data?.items!.map((i) => (
                        <Option key={i.id} value={code ? i.code! : i.id!}>{`${i.name}(${i.code})`}</Option>
                    ))
                }
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(WarehouseSelect);
