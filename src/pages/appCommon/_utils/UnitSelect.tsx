import { DialogSelect } from '@/components';
import { UnitGetListAsync } from '@/services/common/Unit';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return UnitGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 单位选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const UnitSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onUnitSelect?: (unit: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onUnitSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onUnitSelect && value) {
      const unitCode = typeof value === 'object' ? value.value : value;
      const selectedUnit = data?.items?.find(unit => 
        useCode ? unit.code === unitCode : unit.id === unitCode
      );
      if (selectedUnit) {
        onUnitSelect(selectedUnit);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择单位"
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
        onChange={handleChange}
        valueField={useCode ? 'code' : 'id'}
        labelField="name"
        request={getData}
        columnDefs={[
          { field: 'code', headerName: '单位编码', width: 120 },
          { field: 'name', headerName: '单位名称', flex: 1 },
          { field: 'description', headerName: '描述', width: 200 },
        ]}
      >
        {data?.items?.map(unit => (
          <Option key={unit.id} value={useCode ? unit.code! : unit.id!}>
            {`${unit.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(UnitSelect);