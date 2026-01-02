import { DialogSelect } from '@/components';
import { SupplierGetListAsync } from '@/services/common/Supplier';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return SupplierGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 供应商选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const SupplierSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onSupplierSelect?: (supplier: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onSupplierSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onSupplierSelect && value) {
      const supplierCode = typeof value === 'object' ? value.value : value;
      const selectedSupplier = data?.items?.find(supplier => 
        useCode ? supplier.code === supplierCode : supplier.id === supplierCode
      );
      if (selectedSupplier) {
        onSupplierSelect(selectedSupplier);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择供应商"
        style={{ width: '100%' }}
        showSearch
        labelInValue
        filterOption={false}
        modalWidth={1000}
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
          { field: 'code', headerName: '供应商编码', width: 150 },
          { field: 'name', headerName: '供应商名称', flex: 1 },
          { field: 'contactPhone', headerName: '联系电话', width: 130 },
          { field: 'address', headerName: '地址', width: 200 },
        ]}
      >
        {data?.items?.map(supplier => (
          <Option key={supplier.id} value={useCode ? supplier.code! : supplier.id!}>
            {`${supplier.code} - ${supplier.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(SupplierSelect);