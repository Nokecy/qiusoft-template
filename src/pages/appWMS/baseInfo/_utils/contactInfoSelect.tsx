import { DialogSelect } from '@/components';
// import { ContactInfoGetListAsync } from '@/services/wms/ContactInfo';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";
const { Option } = AntSelect;

// const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any, type: any) => {
//     const filter = Filter ? `${Filter},type=${type}` : `type=${type}`//type=10客户,type=5供应商
//     return ContactInfoGetListAsync({
//         Filter: filter,
//         SkipCount: SkipCount ? SkipCount : 0,
//         MaxResultCount: MaxResultCount ? MaxResultCount : 300,
//         Sorting: Sorting ? Sorting : undefined
//     });
// };

const ContactInfoSelect = (props: SelectProps<any> & { type?: any, disabledKeys?: any[], onChangeItem?: (item: any) => void }, ref) => {
    const { onChangeItem, type } = props;
    const [state, setState] = useControllableValue<SelectValue>(props);

    // const { data, loading, run, cancel } = useRequest((params) => { return getData(params, type) }, { debounceWait: 500, manual: true });

    return (
        <span ref={ref}>
            {/* <DialogSelect
                placeholder="选择往来"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                {...props}
                onSearch={(value) => { run({ Filter: `code=${value} | name=${value}` }); }}
                onDropdownVisibleChange={(visible) => { visible && run({}) }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={(e) => {
                    setState(e);
                    let value = e.value ? e.value : e;
                    let contactInfo = data?.items?.find(x => x.code === value);
                    if (contactInfo) {
                        if(onChangeItem ) onChangeItem(contactInfo)
                    }
                }}
                onChangeItem={onChangeItem}
                request={(params) => { return getData(params, type) }}
                valueField={"code"}
                labelField={"name"}
                columnDefs={[
                    { field: "code", headerName: "编码", flex: 1 },
                    { field: "name", headerName: "名称", flex: 1 },
                ]}
            >
                {data?.items!.map((contactInfo) => <Option value={contactInfo.code!}>{`${contactInfo.name}`}</Option>)}
            </DialogSelect> */}
        </span>
    );
}

export default React.forwardRef(ContactInfoSelect);