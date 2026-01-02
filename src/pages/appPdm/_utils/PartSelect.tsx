import { DialogSelect } from '@/components';
import { PartGetListAsync } from '@/services/pdm/Part';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
  return PartGetListAsync({
    Filter: Filter ? Filter : undefined,
    SkipCount: SkipCount ? SkipCount : 0,
    MaxResultCount: MaxResultCount ? MaxResultCount : 300,
    Sorting: Sorting ? Sorting : undefined,
  });
};

/**
 * PDM物料选择器组件
 * @param props SelectProps & { useCode?: boolean; useAutoComplete?: boolean }
 * @param ref
 * @returns
 */
const PartSelect = (
  props: SelectProps<any> & {
    useCode?: boolean;
    enableLinkage?: boolean;
    onPartSelect?: (part: any) => void;
    useAutoComplete?: boolean;
  },
  ref
) => {
  const { useCode = true, enableLinkage = false, onPartSelect, useAutoComplete = false } = props;

  const [state, setState] = useControllableValue<SelectValue>(props);

  const { data, loading, run, cancel } = useRequest(getData, {
    debounceMaxWait: 500,
    manual: true
  });

  const handleChange = (value: any, option: any) => {
    setState(value);

    // 如果启用联动且有回调，则触发联动逻辑
    if (enableLinkage && onPartSelect && value) {
      const partCode = typeof value === 'object' ? value.value : value;
      const selectedPart = data?.items?.find(part =>
        useCode ? part.partNumber === partCode : part.id === partCode
      );
      if (selectedPart) {
        onPartSelect(selectedPart);
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
          run({ Filter: `partNumber=*${value} | description=*${value}` });
        }}
        onDropdownVisibleChange={visible => {
          visible && run({});
        }}
        loading={loading}
        onBlur={cancel}
        value={JSON.stringify(state) === '{}' ? undefined : state}
        onChange={handleChange}
        valueField={useCode ? 'partNumber' : 'id'}
        labelField="description"
        request={getData}
        useAutoComplete={useAutoComplete}
        columnDefs={[
          { field: 'partNumber', headerName: '物料编号', width: 150 },
          { field: 'description', headerName: '描述', flex: 1 },
          { field: 'specification', headerName: '规格', width: 150 },
        ]}
      >
        {data?.items?.map(part => (
          <Option key={part.id} value={useCode ? part.partNumber! : part.id!}>
            {`${part.partNumber} - ${part.description}`}
          </Option>
        ))}
      </DialogSelect>
    </span>
  );
};

export default React.forwardRef(PartSelect);
