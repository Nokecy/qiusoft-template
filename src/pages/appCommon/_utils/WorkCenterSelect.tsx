import { DialogSelect } from '@/components';
import { WorkCenterGetListAsync } from '@/services/common/WorkCenter';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return WorkCenterGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 工作中心选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const WorkCenterSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onWorkCenterSelect?: (workCenter: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onWorkCenterSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onWorkCenterSelect && value) {
      const workCenterCode = typeof value === 'object' ? value.value : value;
      const selectedWorkCenter = data?.items?.find(workCenter => 
        useCode ? workCenter.code === workCenterCode : workCenter.id === workCenterCode
      );
      if (selectedWorkCenter) {
        onWorkCenterSelect(selectedWorkCenter);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择工作中心"
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
          { field: 'code', headerName: '工作中心编码', width: 140 },
          { field: 'name', headerName: '工作中心名称', width: 150 },
          { field: 'workShop.name', headerName: '所属车间', width: 120 },
          { field: 'type', headerName: '类型', width: 100 },
          { field: 'description', headerName: '描述', flex: 1, ellipsis: true },
        ]}
      >
        {data?.items?.map(workCenter => (
          <Option key={workCenter.id} value={useCode ? workCenter.code! : workCenter.id!}>
            {`${workCenter.code} - ${workCenter.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(WorkCenterSelect);