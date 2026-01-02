import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectFormGetListAsync } from '@/services/pdm/ProjectForm';
import { useField, useForm } from '@formily/react';

interface ProjectFormSelectProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  mode?: 'multiple' | 'tags';
}

/**
 * 项目表单选择组件
 * 从项目表单配置中获取所有可用的项目表单列表
 * 支持单选和多选模式
 */
const ProjectFormSelect: React.FC<ProjectFormSelectProps> = ({
  value,
  onChange,
  placeholder = '请选择项目表单',
  mode,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 加载所有项目表单列表
    setLoading(true);
    ProjectFormGetListAsync({ MaxResultCount: 1000, SkipCount: 0 })
      .then(res => {
        const formOptions = (res.items || []).map(item => ({
          label: item.formName || '未命名表单',
          value: item.id!,
        }));
        setOptions(formOptions);
      })
      .catch(err => {
        console.error('加载项目表单失败:', err);
        setOptions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Select
      mode={mode}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      loading={loading}
      allowClear
      maxTagCount={mode ? 2 : undefined}
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

//@ts-ignore
ProjectFormSelect.GroupName = "PDM";
export default ProjectFormSelect;
