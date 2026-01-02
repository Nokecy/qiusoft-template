import { DialogSelect } from '@nokecy/qc-ui';
import { LabelPrintFeatureDefinitionGetListAsync } from '@/services/openApi/LabelPrintFeatureDefinition';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option, OptGroup } = AntSelect;

const getData = () => {
    return LabelPrintFeatureDefinitionGetListAsync();
}

const LabelPrintFeatureDefinitionSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean; code: boolean }, ref) => {
    const { showId = true, code } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { manual: true });

    // 前端搜索过滤
    const [searchValue, setSearchValue] = React.useState('');

    const filteredData = React.useMemo(() => {
        if (!searchValue || !data?.items) return data?.items || [];
        return data.items.filter(
            (item) =>
                item.feature?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName?.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [data?.items, searchValue]);

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder='选择标签功能'
                style={{ width: '100%' }}
                showSearch
                labelInValue
                filterOption={false}
                {...props}
                onSearch={value => {
                    setSearchValue(value);
                }}
                onDropdownVisibleChange={visible => {
                    if (visible) {
                        run();
                    } else {
                        setSearchValue('');
                    }
                }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === '{}' ? undefined : state}
                onChange={e => {
                    setState(e);
                }}
                valueField={'feature'}
                request={getData}
                columnDefs={[
                    { field: 'feature', headerName: '编码', width: 150 },
                    { field: 'displayName', headerName: '名称', flex: 1 },
                    { field: 'serviceName', headerName: '服务名称', width: 150 },
                ]}
            >
                {filteredData?.map(i => (
                    <Option key={i.feature} value={i.feature}>{i.displayName}</Option>
                ))}
            </DialogSelect>
        </span>
    );
};

export default React.forwardRef(LabelPrintFeatureDefinitionSelect);
