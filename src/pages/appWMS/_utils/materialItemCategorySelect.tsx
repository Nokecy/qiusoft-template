import { MaterialItemCategoryGetListAsync } from '@/services/wms/MaterialItemCategory';
import { Select } from "@formily/antd-v5";
import { DialogSelect } from '@nokecy/qc-ui';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return MaterialItemCategoryGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined,
    });
};

const LotAttrItemSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }, ref) => {
    const { showId = true, code } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder='选择分类'
                style={{ width: '100%' }}
                showSearch
                labelInValue
                labelField={'name'}
                filterOption={false}
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
                valueField={code ? 'code' : 'id'}
                request={getData}
                columnDefs={[
                    { field: 'code', headerName: '编码', flex: 1 },
                    { field: 'name', headerName: '名称', flex: 1 },
                ]}
            >
                {data?.items?.map(i => (
                    <Option value={code ? i.code! : i.id!} key={i.id!}>{i.name}</Option>
                ))}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(LotAttrItemSelect);