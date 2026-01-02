import { DialogSelect } from '@/components';
import { MaterialComFromInfoGetListAsync } from '@/services/common/MaterialComFromInfo';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return MaterialComFromInfoGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 物料来源选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const MaterialComFromSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    onMaterialComFromSelect?: (comFrom: any) => void;
  }, 
  ref
) => {
  const { useCode = true, onMaterialComFromSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  // 初始加载数据,避免回显时无法显示label
  const { data, loading, run, cancel } = useRequest(getData, {
    debounceMaxWait: 500,
    manual: false, // 改为自动加载
    defaultParams: [{}] // 初始加载全部数据
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果有回调，则触发回调逻辑
    if (onMaterialComFromSelect && value) {
      const comFromCode = typeof value === 'object' ? value.value : value;
      const selectedComFrom = data?.items?.find(item => 
        useCode ? item.comFromCode === comFromCode : item.id === comFromCode
      );
      if (selectedComFrom) {
        onMaterialComFromSelect(selectedComFrom);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择来源"
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
        valueField={useCode ? 'comFromCode' : 'id'}
        labelField="comFromName"
        request={getData}
        columnDefs={[
          { field: 'comFromCode', headerName: '来源编码', width: 120 },
          { field: 'comFromName', headerName: '来源名称', flex: 1 },
          { field: 'comeFromTypeName', headerName: '来源类型', width: 150 },
        ]}
      >
        {data?.items?.map(item => (
          <Option key={item.id} value={useCode ? item.comFromCode! : item.id!}>
            {`${item.comFromCode} - ${item.comFromName}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(MaterialComFromSelect);