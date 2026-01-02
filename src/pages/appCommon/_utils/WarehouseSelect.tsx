import { DialogSelect } from '@/components';
import { WarehouseGetListAsync } from '@/services/common/Warehouse';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return WarehouseGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 库房选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const WarehouseSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onWarehouseSelect?: (warehouse: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onWarehouseSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onWarehouseSelect && value) {
      const warehouseCode = typeof value === 'object' ? value.value : value;
      const selectedWarehouse = data?.items?.find(warehouse => 
        useCode ? warehouse.code === warehouseCode : warehouse.id === warehouseCode
      );
      if (selectedWarehouse) {
        onWarehouseSelect(selectedWarehouse);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择库房"
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
          { field: 'code', headerName: '库房编码', width: 120 },
          { field: 'name', headerName: '库房名称', width: 150 },
          { field: 'warehouseType', headerName: '库房类型', width: 100 },
          { field: 'factoryZone.name', headerName: '厂区', width: 120 },
          { field: 'manager', headerName: '管理员', width: 100 },
          { field: 'description', headerName: '描述', flex: 1, ellipsis: true },
        ]}
      >
        {data?.items?.map(warehouse => (
          <Option key={warehouse.id} value={useCode ? warehouse.code! : warehouse.id!}>
            {`${warehouse.code} - ${warehouse.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(WarehouseSelect);