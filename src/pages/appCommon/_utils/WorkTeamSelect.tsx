import { DialogSelect } from '@/components';
import { WorkTeamGetListAsync } from '@/services/common/WorkTeam';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return WorkTeamGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * 班组选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref 
 * @returns 
 */
const WorkTeamSelect = (
  props: SelectProps<any> & { 
    useCode?: boolean; 
    enableLinkage?: boolean;
    onWorkTeamSelect?: (workTeam: any) => void;
  }, 
  ref
) => {
  const { useCode = true, enableLinkage = false, onWorkTeamSelect } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, { 
    debounceMaxWait: 500, 
    manual: true 
  });

  const handleChange = (value: any, option: any) => {
    setState(value);
    
    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onWorkTeamSelect && value) {
      const workTeamCode = typeof value === 'object' ? value.value : value;
      const selectedWorkTeam = data?.items?.find(workTeam => 
        useCode ? workTeam.code === workTeamCode : workTeam.id === workTeamCode
      );
      if (selectedWorkTeam) {
        onWorkTeamSelect(selectedWorkTeam);
      }
    }
  };

  return (
    <span ref={ref}>
      <DialogSelect
        placeholder="请选择班组"
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
          { field: 'code', headerName: '班组编码', width: 150 },
          { field: 'name', headerName: '班组名称', width: 150 },
          { field: 'workCenterCode', headerName: '工作中心编码', width: 150 },
          { field: 'teamLeadCode', headerName: '组长编码', width: 120 },
          { field: 'teamLeadName', headerName: '组长姓名', width: 120 },
          { field: 'leadTel', headerName: '联系方式', width: 120 },
          { field: 'memo', headerName: '备注', flex: 1, ellipsis: true },
        ]}
      >
        {data?.items?.map(workTeam => (
          <Option key={workTeam.id} value={useCode ? workTeam.code! : workTeam.id!}>
            {`${workTeam.code} - ${workTeam.name}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(WorkTeamSelect);