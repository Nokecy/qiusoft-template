import { DialogSelect } from '@/components';
import { MaterialClassGetListAsync } from '@/services/common/MaterialClass';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React from "react";

const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return MaterialClassGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

/**
 * 父级物料分类选择器
 * 支持搜索、分页和弹窗选择功能
 * 用于在物料分类表单中选择父级分类
 */
const ParentMaterialClassSelect = React.forwardRef((props: SelectProps<any> & { 
    useCode?: boolean; 
    excludeId?: number; // 排除当前编辑的分类ID，避免循环引用
    onParentClassSelect?: (parentClass: any) => void; 
}, ref: any) => {
    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { 
        debounceMaxWait: 500, 
        manual: true 
    });

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择父级分类"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                labelInValue
                allowClear
                {...props}
                onSearch={(value) => { 
                    let filter = value ? `code=* ${value} | name=* ${value}` : undefined;
                    // 如果有需要排除的ID，添加过滤条件
                    if (props.excludeId) {
                        filter = filter 
                            ? `(${filter}) and id!=${props.excludeId}`
                            : `id!=${props.excludeId}`;
                    }
                    run({ Filter: filter }); 
                }}
                onDropdownVisibleChange={(visible) => { 
                    if (visible) {
                        let filter = undefined;
                        // 如果有需要排除的ID，添加过滤条件
                        if (props.excludeId) {
                            filter = `id!=${props.excludeId}`;
                        }
                        run({ Filter: filter });
                    }
                }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={e => { 
                    setState(e);
                    props.onParentClassSelect?.(e);
                }}
                valueField={"id"}
                labelField={props.useCode ? "code" : "name"}
                request={getData}
                columnDefs={[
                    { field: "code", headerName: "分类编码", width: 120 },
                    { field: "name", headerName: "分类名称", flex: 1 },
                    { field: "parentId", headerName: "父级ID", width: 100, hideInSearch: true },
                    { field: "memo", headerName: "备注", width: 200 },
                ]}
            >
                {data?.items
                    ?.filter(item => props.excludeId ? item.id !== props.excludeId : true) // 前端额外过滤排除项
                    ?.map((item) => (
                    <Option key={item.id} value={item.id!}>
                        {props.useCode ? `${item.code}` : `${item.code} - ${item.name}`}
                    </Option>
                ))}
            </DialogSelect>
        </span>
    );
});

ParentMaterialClassSelect.displayName = 'ParentMaterialClassSelect';

export default ParentMaterialClassSelect;