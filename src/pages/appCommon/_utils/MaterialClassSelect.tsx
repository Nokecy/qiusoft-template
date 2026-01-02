import { DialogSelect } from '@/components';
import { MaterialClassGetListAsync } from '@/services/common/MaterialClass';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return MaterialClassGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 物料分类选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const MaterialClassSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    onMaterialClassSelect?: (materialClass: any) => void;
  }, 
  ref
) => {
  const { useCode = true, onMaterialClassSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果有回调，则触发回调逻辑
    if (onMaterialClassSelect && value) {
      const classCode = typeof value === 'object' ? value.value : value;
      const selectedClass = data?.items?.find(item => 
        useCode ? item.code === classCode : item.id === classCode
      );
      if (selectedClass) {
        onMaterialClassSelect(selectedClass);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择物料分类"
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
          { field: 'code', headerName: '分类编码', width: 120 },
          { field: 'name', headerName: '分类名称', flex: 1 },
          { field: 'description', headerName: '描述', width: 200, ellipsis: true },
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

export default React.forwardRef(MaterialClassSelect);