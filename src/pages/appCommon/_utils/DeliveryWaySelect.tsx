import DialogSelect from '@/components/dialogSelect';
import { DeliveryWayGetListAsync } from '@/services/common/DeliveryWay';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return DeliveryWayGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 交付方式选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const DeliveryWaySelect = (
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
        placeholder="请选择交付方式"
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
          { field: 'code', headerName: '交付方式代码', width: 120 },
          { field: 'name', headerName: '交付方式名称', width: 150 },
          { field: 'description', headerName: '描述', width: 200 },
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

export default React.forwardRef(DeliveryWaySelect);