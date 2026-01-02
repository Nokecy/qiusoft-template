import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProjectTeamMemberGetListByProjectCodeAsync } from '@/services/pdm/ProjectTeamMember';
import { useForm } from '@formily/react';

interface ProjectMemberSelectProps {
  projectCode?: string; // 直接传入的项目编码（优先使用）
  projectCodeField?: string; // 项目编码字段名，默认为'projectCode'（从表单中获取）
  placeholder?: string;
  mode?: 'multiple' | 'tags';
  labelInValue?: boolean;
  value?: any;
  onChange?: (value: any, option: any) => void;
  disabled?: boolean;
}

/**
 * 项目成员选择组件
 * 支持两种方式获取项目编码:
 * 1. 通过 projectCode props 直接传入（优先使用，适用于 ArrayTable 等场景）
 * 2. 通过 projectCodeField 从表单中获取（适用于常规表单）
 */
const ProjectMemberSelect: React.FC<ProjectMemberSelectProps> = (props) => {
  const {
    projectCode: projectCodeProp,
    projectCodeField = 'projectCode',
    placeholder = '请选择成员',
    ...restProps
  } = props;

  const form = useForm();
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [projectCodeFromForm, setProjectCodeFromForm] = useState<string>('');

  // 优先使用 props 传入的 projectCode，否则使用从表单获取的值
  const effectiveProjectCode = projectCodeProp || projectCodeFromForm;

  // 定义加载成员的函数
  const loadProjectMembers = React.useCallback((code: string) => {
    if (!code) {
      setOptions([]);
      return;
    }

    console.log('[ProjectMemberSelect] 加载项目成员，项目编码:', code);
    setLoading(true);
    ProjectTeamMemberGetListByProjectCodeAsync({
      projectCode: code,
      MaxResultCount: 1000, // 获取所有成员
    })
      .then((res) => {
        console.log('[ProjectMemberSelect] API返回数据:', res);
        if (res.items) {
          const opts = res.items.map((item) => ({
            label: item.userName || item.memberName || item.userId || '-',
            value: item.userId,
            userName: item.userName,
            memberName: item.memberName,
            userId: item.userId,
            roleName: item.roleName,
          }));
          console.log('[ProjectMemberSelect] 转换后的选项:', opts);
          setOptions(opts);
        }
      })
      .catch((err) => {
        console.error('[ProjectMemberSelect] 加载失败:', err);
        setOptions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 当 props.projectCode 变化时，加载成员
  useEffect(() => {
    if (projectCodeProp) {
      loadProjectMembers(projectCodeProp);
    }
  }, [projectCodeProp, loadProjectMembers]);

  // 监听表单中项目编码字段的变化（仅当没有通过 props 传入时）
  useEffect(() => {
    if (projectCodeProp) {
      // 如果有 props.projectCode，则不需要监听表单
      return;
    }

    const dispose = form.subscribe(({ type }) => {
      if (type === 'onFieldValueChange') {
        const currentProjectCode = form.getValuesIn(projectCodeField);
        if (currentProjectCode && currentProjectCode !== projectCodeFromForm) {
          setProjectCodeFromForm(currentProjectCode);
          loadProjectMembers(currentProjectCode);
        } else if (!currentProjectCode && projectCodeFromForm) {
          // 项目编码被清空，清空选项
          setProjectCodeFromForm('');
          setOptions([]);
        }
      }
    });

    // 初始加载
    const initialProjectCode = form.getValuesIn(projectCodeField);
    if (initialProjectCode) {
      setProjectCodeFromForm(initialProjectCode);
      loadProjectMembers(initialProjectCode);
    }

    return () => {
      if (typeof dispose === 'function') {
        dispose();
      }
    };
  }, [form, projectCodeField, projectCodeFromForm, projectCodeProp, loadProjectMembers]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={effectiveProjectCode ? placeholder : '请先选择项目'}
      options={options}
      disabled={!effectiveProjectCode || props.disabled}
      filterOption={(input, option) =>
        (option?.label?.toString() || '').toLowerCase().includes(input.toLowerCase())
      }
      {...restProps}
    />
  );
};

//@ts-ignore
ProjectMemberSelect.GroupName = 'PDM';
export default ProjectMemberSelect;
export { ProjectMemberSelect };
