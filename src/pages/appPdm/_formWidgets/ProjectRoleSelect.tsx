import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectRoleGetListAsync } from '@/services/pdm/ProjectRole';

const ProjectRoleSelect: React.FC<any> = props => {
  const { valueType = 'code', ...restProps } = props; // 默认使用code,可选id
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    ProjectRoleGetListAsync({ MaxResultCount: 1000 })
      .then(res => {
        if (mounted && res.items) {
          const opts = res.items.map(item => ({
            label: item.name || item.code || '-',
            value: valueType === 'id' ? item.id : item.code, // 根据valueType返回id或code
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
  }, [valueType]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={restProps.placeholder || '请选择项目角色'}
      options={options}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...restProps}
    />
  );
};

//@ts-ignore
ProjectRoleSelect.GroupName = "PDM";
export default ProjectRoleSelect;
export { ProjectRoleSelect };
