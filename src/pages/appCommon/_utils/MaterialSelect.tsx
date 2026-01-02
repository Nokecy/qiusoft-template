import { DialogSelect } from '@/components';
import { MaterialGetListAsync } from '@/services/common/Material';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return MaterialGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 物料选择器组件
 * @param props SelectProps & { useCode?: boolean; useAutoComplete?: boolean }
 * @param ref 
 * @returns 
 */
const MaterialSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onMaterialSelect?: (material: any) => void;
    useAutoComplete?: boolean;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onMaterialSelect, useAutoComplete = false } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onMaterialSelect && value) {
      const materialCode = typeof value === 'object' ? value.value : value;
      const selectedMaterial = data?.items?.find(material => 
        useCode ? material.code === materialCode : material.id === materialCode
      );
      if (selectedMaterial) {
        onMaterialSelect(selectedMaterial);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择物料"
        style={{ width: '100%' }}
        showSearch
        labelInValue
        filterOption={false}
        {...props}
        onSearch={value => {
          run({ Filter: `code=*${value}` });
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
        useAutoComplete={useAutoComplete}
        columnDefs={[
          { field: 'code', headerName: '物料编码', width: 150 },
          { field: 'name', headerName: '物料名称', width: 200 },
          { field: 'description', headerName: '物料描述', flex: 1 },
          { field: 'specification', headerName: '规格型号', width: 150 },
          { field: 'unit', headerName: '基本单位', width: 100 },
        ]}
      >
        {data?.items?.map(material => (
          <Option key={material.id} value={useCode ? material.code! : material.id!}>
            {`${material.code}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(MaterialSelect);