import React, { useState, useEffect } from 'react';
import { Select, Spin, Tag } from 'antd';
import type { SelectProps } from 'antd';
import { ProjectTaskGetListAsync } from '@/services/pdm/ProjectTask';
import { debounce } from 'lodash';

/**
 * 任务状态枚举
 */
const taskStatusEnum = [
  { label: '未开始', value: 0, color: 'default' },
  { label: '进行中', value: 1, color: 'processing' },
  { label: '已暂停', value: 2, color: 'warning' },
  { label: '已完成', value: 3, color: 'success' },
  { label: '已取消', value: 4, color: 'default' },
];

/**
 * 任务数据结构
 */
interface TaskOption {
  id: string;
  code: string;
  name: string;
  status: number;
  projectName?: string;
}

interface TaskSelectorProps {
  value?: string | string[]; // 任务ID或ID数组
  onChange?: (value: string | string[], options?: TaskOption | TaskOption[]) => void;
  mode?: 'multiple' | 'tags';
  projectId?: string; // 可选：限制只能选择某个项目下的任务
  maxTagCount?: number;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

/**
 * 任务关联选择器组件
 * 支持搜索和选择项目任务，与Formily表单集成
 */
const TaskSelector: React.FC<TaskSelectorProps> = ({
  value,
  onChange,
  mode,
  projectId,
  maxTagCount = 3,
  placeholder = '请选择关联任务',
  disabled = false,
  allowClear = true,
}) => {
  const [options, setOptions] = useState<TaskOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  /**
   * 加载任务列表
   */
  const loadTasks = async (keyword?: string) => {
    setLoading(true);
    try {
      const params: any = {
        MaxResultCount: 50,
        SkipCount: 0,
      };

      // 添加搜索关键字
      if (keyword) {
        params.Filter = keyword;
      }

      // 添加项目过滤
      if (projectId) {
        params.ProjectId = projectId;
      }

      const result = await ProjectTaskGetListAsync(params);
      const tasks: TaskOption[] =
        result?.items?.map((item: any) => ({
          id: item.id,
          code: item.code,
          name: item.name,
          status: item.status,
          projectName: item.projectName,
        })) || [];

      setOptions(tasks);
    } catch (error) {
      console.error('加载任务列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 防抖搜索
   */
  const debouncedSearch = debounce((keyword: string) => {
    loadTasks(keyword);
  }, 300);

  /**
   * 处理搜索
   */
  const handleSearch = (keyword: string) => {
    setSearchText(keyword);
    if (keyword) {
      debouncedSearch(keyword);
    } else {
      loadTasks();
    }
  };

  /**
   * 处理选择
   */
  const handleChange = (selectedValue: string | string[], option: any) => {
    onChange?.(selectedValue, option);
  };

  /**
   * 初始加载
   */
  useEffect(() => {
    loadTasks();
  }, [projectId]);

  /**
   * 渲染任务标签
   */
  const renderTaskTag = (props: any) => {
    const { label, value: taskId, closable, onClose } = props;
    const task = options.find((t) => t.id === taskId);
    if (!task) return label;

    const statusItem = taskStatusEnum.find((s) => s.value === task.status);

    return (
      <Tag
        color={statusItem?.color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {task.code} - {task.name}
      </Tag>
    );
  };

  /**
   * 渲染任务选项
   */
  const renderOption = (task: TaskOption) => {
    const statusItem = taskStatusEnum.find((s) => s.value === task.status);

    return (
      <Select.Option key={task.id} value={task.id} label={`${task.code} - ${task.name}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 500 }}>{task.code}</span>
            <span style={{ marginLeft: 8 }}>{task.name}</span>
          </div>
          <div style={{ marginLeft: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            {task.projectName && (
              <span style={{ fontSize: 12, color: '#999' }}>{task.projectName}</span>
            )}
            {statusItem && (
              <Tag color={statusItem.color} style={{ margin: 0 }}>
                {statusItem.label}
              </Tag>
            )}
          </div>
        </div>
      </Select.Option>
    );
  };

  const selectProps: SelectProps = {
    value,
    mode,
    placeholder,
    disabled,
    allowClear,
    showSearch: true,
    filterOption: false,
    loading,
    maxTagCount,
    onChange: handleChange,
    onSearch: handleSearch,
    notFoundContent: loading ? <Spin size="small" /> : '暂无数据',
    style: { width: '100%' },
    ...(mode === 'multiple' || mode === 'tags'
      ? {
          tagRender: renderTaskTag,
        }
      : {}),
  };

  return <Select {...selectProps}>{options.map(renderOption)}</Select>;
};

export default TaskSelector;
