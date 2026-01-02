import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectIssueGetListByProjectCodeAsync } from '@/services/pdm/ProjectIssue';

const ProjectIssueSelect: React.FC<any> = props => {
  const { projectCode, value, onChange, ...restProps } = props;
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectCode) {
      setOptions([]);
      return;
    }

    let mounted = true;
    setLoading(true);
    ProjectIssueGetListByProjectCodeAsync({ projectCode, MaxResultCount: 1000 })
      .then(res => {
        if (mounted && res.items) {
          const opts = res.items.map(item => ({
            label: item.name || item.issueCode || '-',
            value: item.id,
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
  }, [projectCode]);

  // 处理value和onChange以支持labelInValue模式
  const handleChange = (val: any, option: any) => {
    if (onChange) {
      onChange(val, option);
    }
  };

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={restProps.placeholder || '请选择问题'}
      options={options}
      value={value}
      onChange={handleChange}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...restProps}
    />
  );
};

//@ts-ignore
ProjectIssueSelect.GroupName = "PDM";
export default ProjectIssueSelect;
export { ProjectIssueSelect };
