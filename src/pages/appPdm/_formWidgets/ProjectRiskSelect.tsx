import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectRiskGetListAsync } from '@/services/pdm/ProjectRisk';

const ProjectRiskSelect: React.FC<any> = props => {
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
    ProjectRiskGetListAsync({ projectCode, MaxResultCount: 1000 })
      .then(res => {
        if (mounted && res.items) {
          const opts = res.items.map(item => ({
            label: item.title || item.riskCode || '-',
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
      placeholder={restProps.placeholder || '请选择风险'}
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
ProjectRiskSelect.GroupName = "PDM";
export default ProjectRiskSelect;
export { ProjectRiskSelect };
