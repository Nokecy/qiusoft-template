import { DialogSelect } from '@/components';
import { EmployeeGetListAsync } from '@/services/common/Employee';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return EmployeeGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 员工选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const EmployeeSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onEmployeeSelect?: (employee: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onEmployeeSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onEmployeeSelect && value) {
      const employeeCode = typeof value === 'object' ? value.value : value;
      const selectedEmployee = data?.items?.find(employee => 
        useCode ? employee.code === employeeCode : employee.id === employeeCode
      );
      if (selectedEmployee) {
        onEmployeeSelect(selectedEmployee);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择员工"
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
          { field: 'code', headerName: '员工编码', width: 120 },
          { field: 'name', headerName: '员工姓名', width: 150 },
          { field: 'department.name', headerName: '部门', width: 150 },
          { field: 'position', headerName: '职位', width: 120 },
          { field: 'phone', headerName: '联系电话', width: 140 },
          { field: 'email', headerName: '邮箱', flex: 1, ellipsis: true },
        ]}
      >
        {data?.items?.map(employee => (
          <Option key={employee.id} value={useCode ? employee.code! : employee.id!}>
            {`${employee.code} - ${employee.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(EmployeeSelect);