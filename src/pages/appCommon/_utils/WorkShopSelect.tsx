import { DialogSelect } from '@/components';
import { WorkShopGetListAsync } from '@/services/common/WorkShop';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return WorkShopGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 车间选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const WorkShopSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onWorkShopSelect?: (workShop: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onWorkShopSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onWorkShopSelect && value) {
      const workShopCode = typeof value === 'object' ? value.value : value;
      const selectedWorkShop = data?.items?.find(workShop => 
        useCode ? workShop.code === workShopCode : workShop.id === workShopCode
      );
      if (selectedWorkShop) {
        onWorkShopSelect(selectedWorkShop);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择车间"
        style={{ width: '100%' }}
        showSearch
        labelInValue
        filterOption={false}
        modalWidth={900}
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
          { field: 'code', headerName: '车间编码', width: 120 },
          { field: 'name', headerName: '车间名称', width: 150 },
          { field: 'department.name', headerName: '所属部门', width: 150 },
          { field: 'manager', headerName: '车间主管', width: 120 },
          { field: 'description', headerName: '描述', flex: 1, ellipsis: true },
        ]}
      >
        {data?.items?.map(workShop => (
          <Option key={workShop.id} value={useCode ? workShop.code! : workShop.id!}>
            {`${workShop.code} - ${workShop.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(WorkShopSelect);