import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectTeamMemberGetListByProjectCodeAsync } from '@/services/pdm/ProjectTeamMember';

interface ProjectTeamMemberSelectProps {
  projectCode?: string;
  [key: string]: any;
}

const ProjectTeamMemberSelect: React.FC<ProjectTeamMemberSelectProps> = props => {
  const { projectCode, ...restProps } = props;
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTeamMembers = async (searchValue?: string) => {
    if (!projectCode) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const filter = searchValue ? `userName=*${searchValue}* OR name=*${searchValue}*` : '';
      const res = await ProjectTeamMemberGetListByProjectCodeAsync({
        projectCode,
        Filter: filter,
        MaxResultCount: 100,
      });

      if (res.items) {
        const opts = res.items.map(item => ({
          // label 显示：用户名 (角色)
          label: `${item.userName || '-'}${item.projectRoleName ? ' (' + item.projectRoleName + ')' : ''}`,
          // value 返回用户的 Guid ID
          value: item.userId,
        }));
        setOptions(opts);
      }
    } catch (error) {
      console.error('加载项目团队成员失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamMembers();
  }, [projectCode]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={restProps.placeholder || '请选择团队成员'}
      options={options}
      disabled={!projectCode}
      onSearch={(value) => {
        loadTeamMembers(value);
      }}
      filterOption={false}
      fieldNames={{ label: 'label', value: 'value' }}
      {...restProps}
    />
  );
};

//@ts-ignore
ProjectTeamMemberSelect.GroupName = "PDM";
export default ProjectTeamMemberSelect;
export { ProjectTeamMemberSelect };
