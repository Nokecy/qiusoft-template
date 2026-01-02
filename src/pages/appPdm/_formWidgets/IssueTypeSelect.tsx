import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { IssueTypeGetListAsync } from '@/services/pdm/IssueType';

const IssueTypeSelect: React.FC<any> = props => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    IssueTypeGetListAsync({ MaxResultCount: 1000 })
      .then(res => {
        if (mounted && res.items) {
          const opts = res.items.map(item => ({
            label: item.name || item.code || '-',
            value: item.code, // 使用code而不是id,与API字段对应
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

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={props.placeholder || '请选择问题类型'}
      options={options}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};

//@ts-ignore
IssueTypeSelect.GroupName = "PDM";
export default IssueTypeSelect;
export { IssueTypeSelect };
