import { DialogSelect } from '@/components';
import { UnitGroupGetListAsync } from '@/services/common/UnitGroup';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";

const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return UnitGroupGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

/**
 * 单位组选择器 - 参考MES模式实现
 * 支持搜索、分页和弹窗选择功能
 * @param props 
 * @param ref 
 * @returns 
 */
const UnitGroupSelect = React.forwardRef((props: SelectProps<any>, ref: any) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { 
        debounceMaxWait: 500, 
        manual: true 
    });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择单位组"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                labelInValue
                {...props}
                onSearch={(value) => { 
                    run({ Filter: value ? `code=* ${value} , name=* ${value}` : undefined }); 
                }}
                onDropdownVisibleChange={(visible) => { 
                    visible && run({}) 
                }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { setState(e); }}
                valueField={"id"}
                labelField={"code"}
                request={getData}
                columnDefs={[
                    { field: "code", headerName: "单位组编码", width: 120 },
                    { field: "name", headerName: "单位组名称", flex: 1 },
                    { field: "memo", headerName: "备注", width: 200 },
                ]}
            >
                {data?.items?.map((item) => (
                    <Option key={item.id} value={item.id!}>
                        {`${item.code}`}
                    </Option>
                ))}
            </DialogSelect>
        </span>
    );
});

UnitGroupSelect.displayName = 'UnitGroupSelect';

export default UnitGroupSelect;