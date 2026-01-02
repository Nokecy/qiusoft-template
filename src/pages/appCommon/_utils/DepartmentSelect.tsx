import { DialogSelect } from '@/components';
import { DepartmentGetListAsync } from '@/services/common/Department';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return DepartmentGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 部门选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const DepartmentSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onDepartmentSelect?: (department: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onDepartmentSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onDepartmentSelect && value) {
      const departmentCode = typeof value === 'object' ? value.value : value;
      const selectedDepartment = data?.items?.find(department => 
        useCode ? department.code === departmentCode : department.id === departmentCode
      );
      if (selectedDepartment) {
        onDepartmentSelect(selectedDepartment);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择部门"
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
          { field: 'code', headerName: '部门编码', width: 120 },
          { field: 'name', headerName: '部门名称', width: 150 },
          { field: 'description', headerName: '部门描述', flex: 1, ellipsis: true },
          { field: 'leaderName', headerName: '负责人', width: 100 },
        ]}
      >
        {data?.items?.map(department => (
          <Option key={department.id} value={useCode ? department.code! : department.id!}>
            {`${department.code} - ${department.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(DepartmentSelect);