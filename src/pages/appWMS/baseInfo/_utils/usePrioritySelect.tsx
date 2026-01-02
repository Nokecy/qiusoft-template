import { useControllableValue } from 'ahooks';
import { Select, SelectProps } from 'antd';
import type { SelectValue } from 'antd/es/select';
import React from 'react';
import { usePriorityOptions } from './usePriorityEnum';

const { Option } = Select;

const UsePrioritySelect = (props: SelectProps<any>) => {
  const [state, setState] = useControllableValue<SelectValue>(props);

  return (
    <Select {...props} value={state} onChange={setState}>
      {usePriorityOptions.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default UsePrioritySelect;