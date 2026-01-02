import { DialogSelect } from '@/components';
import { CustomerGetListAsync } from '@/services/common/Customer';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return CustomerGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 客户选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const CustomerSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onCustomerSelect?: (customer: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onCustomerSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onCustomerSelect && value) {
      const customerCode = typeof value === 'object' ? value.value : value;
      const selectedCustomer = data?.items?.find(customer => 
        useCode ? customer.code === customerCode : customer.id === customerCode
      );
      if (selectedCustomer) {
        onCustomerSelect(selectedCustomer);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择客户"
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
          { field: 'code', headerName: '客户编码', width: 120 },
          { field: 'name', headerName: '客户名称', width: 200 },
          { field: 'shortName', headerName: '简称', width: 120 },
          { field: 'customerType', headerName: '客户类型', width: 100 },
          { field: 'contactPerson', headerName: '联系人', width: 100 },
          { field: 'contactPhone', headerName: '联系电话', width: 120 },
          { field: 'address', headerName: '地址', flex: 1, ellipsis: true },
        ]}
      >
        {data?.items?.map(customer => (
          <Option key={customer.id} value={useCode ? customer.code! : customer.id!}>
            {`${customer.code} - ${customer.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(CustomerSelect);