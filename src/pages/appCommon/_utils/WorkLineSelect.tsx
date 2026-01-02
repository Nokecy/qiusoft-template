import { DialogSelect } from '@/components';
import { WorkLineGetListAsync } from '@/services/common/WorkLine';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return WorkLineGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 线体选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const WorkLineSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onWorkLineSelect?: (workLine: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onWorkLineSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onWorkLineSelect && value) {
      const workLineCode = typeof value === 'object' ? value.value : value;
      const selectedWorkLine = data?.items?.find(workLine => 
        useCode ? workLine.code === workLineCode : workLine.id === workLineCode
      );
      if (selectedWorkLine) {
        onWorkLineSelect(selectedWorkLine);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择线体"
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
          { field: 'code', headerName: '线体编码', width: 120 },
          { field: 'name', headerName: '线体名称', width: 150 },
          { field: 'workCenter.name', headerName: '工作中心', width: 140 },
          { field: 'lineType', headerName: '线体类型', width: 100 },
          { field: 'capacity', headerName: '产能', width: 100 },
          { field: 'description', headerName: '描述', flex: 1, ellipsis: true },
        ]}
      >
        {data?.items?.map(workLine => (
          <Option key={workLine.id} value={useCode ? workLine.code! : workLine.id!}>
            {`${workLine.code} - ${workLine.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(WorkLineSelect);