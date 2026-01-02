// import { DialogSelect } from '@/components';
// import { TransportPointGetListAsync } from '@/services/wms/TransportPoint';
// import { useControllableValue, useRequest } from 'ahooks';
// import { Select as AntSelect } from "antd";
// import { SelectProps, SelectValue } from "antd/lib/select";
// import React from "react";
// const { Option, OptGroup } = AntSelect;

// const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
//     return TransportPointGetListAsync({
//         Filter: Filter ? Filter : undefined,
//         SkipCount: SkipCount ? SkipCount : 0,
//         MaxResultCount: MaxResultCount ? MaxResultCount : 300,
//         Sorting: Sorting ? Sorting : undefined
//     });
// };

// const TransportPointSelect = (props: SelectProps<any> & { disabledKeys?: any[], showId?: boolean }, ref) => {
//     const { showId = true } = props;

//     const [state, setState] = useControllableValue<SelectValue>(props);

//     const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });

//     return (
//         <span ref={ref}>
//             <DialogSelect
//                 placeholder="选择仓库班组"
//                 style={{ width: "100%" }}
//                 filterOption={false}
//                 showSearch
//                 {...props}
//                 onSearch={(value) => { run({ Filter: `name=*${value}` }); }}
//                 onDropdownVisibleChange={(visible) => { visible && run({}) }}
//                 labelInValue
//                 loading={loading}
//                 onBlur={cancel}
//                 value={JSON.stringify(state) === "{}" ? undefined : state}
//                 onChange={e => { setState(e); }}
//                  valueField={"code"} 
//                  request={getData}
//                 columnDefs={[
//                     { field: "code", headerName: "编码", flex: 1 },
//                     { field: "name", headerName: "名称", flex: 1 },
//                 ]}
//             >
//                 {data?.items!.map((wareHouse) => <Option value={wareHouse.id!}>{`${wareHouse.name}(${wareHouse.code})`}</Option>)}
//             </DialogSelect>
//         </span>
//     );
// }

// export default React.forwardRef(TransportPointSelect);