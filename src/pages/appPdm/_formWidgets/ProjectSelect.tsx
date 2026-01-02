import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectGetListAsync } from '@/services/pdm/Project';

const ProjectSelect: React.FC<any> = props => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    ProjectGetListAsync({ MaxResultCount: 1000 })
      .then(res => {
        if (mounted && res.items) {
          const opts = res.items.map(item => ({
            label: item.projectName || item.projectCode || '-',
            value: props.valueField === 'projectCode' ? item.projectCode : item.id,
            projectCode: item.projectCode,
            projectName: item.projectName,
            id: item.id,
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
  }, [props.valueField]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={props.placeholder || '请选择项目'}
      options={options}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};

//@ts-ignore
ProjectSelect.GroupName = "PDM";
export default ProjectSelect;
export { ProjectSelect };
