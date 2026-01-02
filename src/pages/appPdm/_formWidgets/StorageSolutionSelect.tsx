import { StorageSolutionGetActiveLookupListAsync } from '@/services/pdm/StorageSolution';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 存储方案选择组件
 * 用于选择激活的存储方案
 */
const StorageSolutionSelectComponent: React.FC<any> = (props) => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      setLoading(true);
      const data = await StorageSolutionGetActiveLookupListAsync();
      const selectOptions = (data || []).map(item => ({
        label: `${item.solutionName} (${item.providerTypeDisplayName})${item.isDefault ? ' [默认]' : ''}`,
        value: item.id,
      }));
      setOptions(selectOptions);
    } catch (error) {
      console.error('加载存储方案失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      placeholder={props.placeholder || '请选择存储方案'}
      loading={loading}
      options={options}
      allowClear
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};

export const StorageSolutionSelect = StorageSolutionSelectComponent;
export default StorageSolutionSelectComponent;
