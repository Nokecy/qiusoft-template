import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectTaskGetListByProjectCodeAsync } from '@/services/pdm/ProjectTask';

interface ProjectTaskSelectProps {
  projectCode?: string;
  milestoneId?: string;
  excludeTaskCode?: string; // 排除指定任务(用于父任务选择时排除自己)
  [key: string]: any;
}

const ProjectTaskSelect: React.FC<ProjectTaskSelectProps> = props => {
  const { projectCode, milestoneId, excludeTaskCode, ...restProps } = props;
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async (searchValue?: string) => {
    if (!projectCode) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      let filter = '';
      const filters: string[] = [];

      if (searchValue) {
        filters.push(`(taskCode=*${searchValue}* OR taskName=*${searchValue}*)`);
      }

      if (milestoneId) {
        filters.push(`milestoneId==${milestoneId}`);
      }

      if (excludeTaskCode) {
        filters.push(`taskCode!=${excludeTaskCode}`);
      }

      filter = filters.join(' AND ');

      const res = await ProjectTaskGetListByProjectCodeAsync({
        projectCode,
        Filter: filter,
        MaxResultCount: 100,
      });

      if (res.items) {
        const opts = res.items.map(item => ({
          label: `${item.taskCode} - ${item.taskName}`,
          value: item.taskCode,
          taskName: item.taskName,
        }));
        setOptions(opts);
      }
    } catch (error) {
      console.error('加载项目任务失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [projectCode, milestoneId, excludeTaskCode]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={restProps.placeholder || '请选择任务'}
      options={options}
      disabled={!projectCode}
      onSearch={(value) => {
        loadTasks(value);
      }}
      filterOption={false}
      {...restProps}
    />
  );
};

//@ts-ignore
ProjectTaskSelect.GroupName = "PDM";
export default ProjectTaskSelect;
export { ProjectTaskSelect };
