import { DialogSelect } from '@nokecy/qc-ui';
import { LabelTypeAdvancedSettingGetProviderItemAsync } from '@/services/openApi/LabelTypeAdvancedSetting';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option, OptGroup } = AntSelect;

const getData = () => {
    return LabelTypeAdvancedSettingGetProviderItemAsync();
}

const LabelTypeAdvancedSettingProviderSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean; code: boolean }, ref) => {
    const { showId = true, code } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, { manual: true });

    // 前端搜索过滤
    const [searchValue, setSearchValue] = React.useState('');

    const filteredData = React.useMemo(() => {
        if (!searchValue || !data) return data || [];
        return data.filter(
            (item) =>
                item.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [data, searchValue]);

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder='选择标签类型提供者'
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
                valueField={code ? 'code' : 'id'}
                request={getData}
                columnDefs={[
                    { field: 'code', headerName: '编码', flex: 1 },
                    { field: 'name', headerName: '名称', flex: 1 },
                ]}
            >
                {filteredData?.map(i => (
                    <Option value={code ? i.code! : i.id!} key={code ? i.code! : i.id!}>{i.name}</Option>
                ))}
            </DialogSelect>
        </span>
    );
};

export default React.forwardRef(LabelTypeAdvancedSettingProviderSelect);
