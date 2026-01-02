import React, { useEffect, useState, useMemo } from 'react';
import { Select } from 'antd';
import { TaskTypeGetListAsync } from '@/services/pdm/TaskType';

const TaskTypeSelect: React.FC<any> = props => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    TaskTypeGetListAsync({ MaxResultCount: 1000 })
      .then(res => {
        if (mounted && res.items) {
          const opts = res.items.map(item => ({
            label: item.name || item.code || '-',
            value: item.code, // 使用code而不是id,与API字段taskTypeCode对应
          }));
          setOptions(opts);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // 处理初始值：使用 useMemo 避免死循环
  const enrichedOptions = useMemo(() => {
    const currentOptions = [...options];

    if (props.value && props.labelInValue) {
      const currentValue = props.value;

      if (typeof currentValue === 'object' && currentValue.value && currentValue.label) {
        const exists = currentOptions.some(opt => opt.value === currentValue.value);
        if (!exists) {
          currentOptions.unshift({ value: currentValue.value, label: currentValue.label });
        }
      }
    }

    return currentOptions;
  }, [options, props.value, props.labelInValue]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={props.placeholder || '请选择任务类型'}
      options={enrichedOptions}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};

//@ts-ignore
TaskTypeSelect.GroupName = "PDM";
export default TaskTypeSelect;
export { TaskTypeSelect };
