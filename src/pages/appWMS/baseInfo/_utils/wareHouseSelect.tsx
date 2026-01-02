import { DialogSelect } from '@/components';
import { IDialogSelectProps } from '@/components/dialogSelect';
import { WareHouseGetListAsync } from '@/services/wms/WareHouse';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import React, { useEffect, useMemo } from "react";
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
    return WareHouseGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined
    });
};

const WareHouseSelect = (props: SelectProps<any> & IDialogSelectProps & { disabledKeys?: any[], showId?: boolean, formatDataSource?: any }, ref) => {
    const { showId = true, labelField } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500, manual: true });
    useEffect(() => {
        run({});
    }, [])
    const dataMap = useMemo(() => {
        const items = data?.items || [];
        const map = new Map<any, any>();
        items.forEach((item) => {
            map.set(item[props.valueField || "id"], item);
        });
        return map;
    }, [data?.items, props.valueField]);

    const buildValueWithMeta = (value: any) => {
        if (!value || typeof value !== "object") return value;
        const meta = dataMap.get(value.value);
        if (!meta) return value;
        return {
            ...value,
            id: meta.id,
            name: meta.name,
            code: meta.code,
        };
    };

    const buildValueFromItem = (item: any) => {
        if (!item) return undefined;
        const valueField = props.valueField || "id";
        const labelField = props.labelField || "name";
        const useLabelInValue = props.labelInValue !== false;

        const toLabelValue = (row: any) => {
            if (!row || typeof row !== "object") return undefined;
            if ("value" in row && "label" in row && !("id" in row) && !("name" in row) && !("code" in row)) {
                return undefined;
            }
            const value = row?.[valueField];
            if (value === undefined || value === null) return undefined;
            if (!useLabelInValue) return value;
            return {
                value,
                label: row?.[labelField],
                key: row?.id,
                id: row?.id,
                name: row?.name,
                code: row?.code,
            };
        };

        if (Array.isArray(item)) {
            const mapped = item.map(toLabelValue).filter((row) => row !== undefined);
            return mapped.length ? mapped : undefined;
        }
        return toLabelValue(item);
    };

    const handleChange = (value: any) => {
        if (Array.isArray(value)) {
            setState(value.map(buildValueWithMeta));
            return;
        }
        setState(buildValueWithMeta(value));
    };
    const formatData = (arr) => {
        const { formatDataSource } = props;
        if (formatDataSource) {
            return formatDataSource(arr)
        } else {
            return arr
        }
    }
    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="选择仓库"
                style={{ width: "100%" }}
                filterOption={false}
                showSearch
                {...props}
                onSearch={(value) => { run({ Filter: `code=*${value}|name=*${value}` }); }}
                onDropdownVisibleChange={(visible) => { visible && run({}) }}
                labelInValue
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === "{}" ? undefined : state}
                onChange={handleChange}
                onChangeItem={(item) => {
                    const nextValue = buildValueFromItem(item);
                    if (nextValue !== undefined) {
                        setState(nextValue);
                    }
                    if (props.onChangeItem) {
                        props.onChangeItem(item);
                    }
                }}
                request={getData}
                columnDefs={[
                    { field: "code", headerName: "编码", flex: 1 },
                    { field: "name", headerName: "名称", flex: 1 },
                ]}
            >
                {data && formatData(data?.items!).map((wareHouse) => <Option key={wareHouse[props.valueField||"id"]} value={wareHouse[props.valueField||"id"]}>{`${wareHouse.name}`}</Option>)}
            </DialogSelect>
        </span>
    );
}

export default React.forwardRef(WareHouseSelect); 
