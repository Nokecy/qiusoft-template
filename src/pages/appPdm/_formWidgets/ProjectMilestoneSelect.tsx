import React, { useEffect, useState, useMemo } from 'react';
import { Select } from 'antd';
import { ProjectMilestoneGetListByProjectCodeAsync } from '@/services/pdm/ProjectMilestone';

interface ProjectMilestoneSelectProps {
  projectCode?: string;
  [key: string]: any;
}

const ProjectMilestoneSelect: React.FC<ProjectMilestoneSelectProps> = props => {
  const { projectCode, ...restProps } = props;
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMilestones = async (searchValue?: string) => {
    if (!projectCode) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const filter = searchValue ? `milestoneName=*${searchValue}*` : '';
      const res = await ProjectMilestoneGetListByProjectCodeAsync({
        projectCode,
        Filter: filter,
        MaxResultCount: 100,
      });

      if (res.items) {
        const opts = res.items.map(item => ({
          label: item.milestoneName || '-',
          value: item.id,
        }));
        setOptions(opts);
      }
    } catch (error) {
      console.error('加载项目里程碑失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMilestones();
  }, [projectCode]);

  // 处理初始值：使用 useMemo 避免死循环
  const enrichedOptions = useMemo(() => {
    const currentOptions = [...options];

    if (restProps.value && restProps.labelInValue) {
      const currentValue = restProps.value;

      if (typeof currentValue === 'object' && currentValue.value && currentValue.label) {
        const exists = currentOptions.some(opt => opt.value === currentValue.value);
        if (!exists) {
          currentOptions.unshift({ value: currentValue.value, label: currentValue.label });
        }
      }
    }

    return currentOptions;
  }, [options, restProps.value, restProps.labelInValue]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={restProps.placeholder || '请选择里程碑'}
      options={enrichedOptions}
      disabled={!projectCode}
      onSearch={(value) => {
        loadMilestones(value);
      }}
      filterOption={false}
      {...restProps}
    />
  );
};

//@ts-ignore
ProjectMilestoneSelect.GroupName = "PDM";
export default ProjectMilestoneSelect;
export { ProjectMilestoneSelect };
