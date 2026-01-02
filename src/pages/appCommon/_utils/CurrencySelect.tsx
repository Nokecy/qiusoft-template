import DialogSelect from '@/components/dialogSelect';
import { CurrencyGetListAsync } from '@/services/common/Currency';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return CurrencyGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 货币选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const CurrencySelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
  }, 
  ref
) => {
  const { useCode = true } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择货币"
        style={{ width: '100%' }}
        showSearch
        labelInValue
        filterOption={false}
        modalWidth={800}
        {...props}
        onSearch={value => {
          run({ Filter: `(name =* ${value}) | (code =* ${value})` });
        }}
        onDropdownVisibleChange={visible => {
          visible && run({});
        }}
        loading={loading}
        onBlur={cancel}
        value={JSON.stringify(state) === '{}' ? undefined : state}
        onChange={setState}
        valueField={useCode ? 'code' : 'id'}
        labelField="name"
        request={getData}
        columnDefs={[
          { field: 'code', headerName: '货币代码', width: 120 },
          { field: 'name', headerName: '货币名称', width: 150 },
          { field: 'nameEN', headerName: '英文名称', width: 150 },
          { field: 'exchangeRate', headerName: '汇率', width: 100 },
          { field: 'status', headerName: '状态', width: 80 },
        ]}
      >
        {data?.items?.map(item => (
          <Option key={item.id} value={useCode ? item.code! : item.id!}>
            {`${item.code} - ${item.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(CurrencySelect);