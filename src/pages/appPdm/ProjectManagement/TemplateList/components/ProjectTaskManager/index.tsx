import React, { useState, useEffect, useRef } from 'react';
import { observer } from '@formily/react';
import { ProCard } from '@ant-design/pro-components';
import { useField, useForm } from '@formily/react';
import { ArrayField } from '@formily/core';
import { ArrayTable } from '@formily/antd-v5';
import MilestoneList from './MilestoneList';
import { Alert, Modal, Select, Input, Checkbox } from 'antd';
import { InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import './index.less';

const { TextArea } = Input;

/**
 * 项目任务管理器组件
 *
 * 实现左右布局：
 * - 左侧（30%）：里程碑列表，显示任务数量
 * - 右侧（70%）：任务表格，按选中里程碑筛选
 */
const ProjectTaskManager: React.FC = observer(() => {
  const form = useForm();
  const field = useField<ArrayField>();

  // 获取里程碑数据
  const milestones = form.values.milestones || [];

  // 获取任务数据
  const tasks = field.value || [];

  // 选中的里程碑
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>();
  const [selectedMilestoneName, setSelectedMilestoneName] = useState<string>();

  // 如果里程碑列表不为空且没有选中，默认选中第一个
  // 但如果有未关联里程碑的任务，则优先选中"未关联"
  useEffect(() => {
    if (!selectedMilestoneId) {
      // 检查是否有未关联里程碑的任务
      const hasUnassignedTasks = tasks.some((task: any) => !task.milestoneId);

      if (hasUnassignedTasks) {
        // 选中"未关联"虚拟里程碑
        setSelectedMilestoneId('__unassigned__');
        setSelectedMilestoneName('未关联里程碑');
      } else if (milestones.length > 0) {
        // 否则选中第一个里程碑
        const firstMilestone = milestones[0];
        const milestoneId = firstMilestone.id || firstMilestone._id || firstMilestone.milestoneName;
        setSelectedMilestoneId(milestoneId);
        setSelectedMilestoneName(firstMilestone.milestoneName);
      }
    }
  }, [milestones.length, tasks.length]);

  // 计算每个里程碑的任务数量
  const getTaskCount = (milestoneId: string) => {
    if (milestoneId === '__unassigned__') {
      return tasks.filter((task: any) => !task.milestoneId).length;
    }
    return tasks.filter((task: any) => task.milestoneId === milestoneId).length;
  };

  // 计算未关联里程碑的任务数量
  const unassignedTaskCount = tasks.filter((task: any) => !task.milestoneId).length;

  // 构建扩展的里程碑列表（包含"未关联"虚拟项）
  const extendedMilestones = React.useMemo(() => {
    const result = [...milestones];
    if (unassignedTaskCount > 0) {
      // 在最前面添加"未关联"虚拟里程碑
      result.unshift({
        id: '__unassigned__',
        _id: '__unassigned__',
        milestoneName: '未关联里程碑',
        _isVirtual: true,
      });
    }
    return result;
  }, [milestones, unassignedTaskCount]);

  // 处理选择里程碑
  const handleSelectMilestone = (milestoneId: string, milestoneName: string) => {
    setSelectedMilestoneId(milestoneId);
    setSelectedMilestoneName(milestoneName);
  };

  // 添加任务
  const handleAddTask = () => {
    if (!selectedMilestoneId) {
      Modal.warning({
        title: '请先选择里程碑',
        content: '添加任务前，请先在左侧选择一个里程碑',
        icon: <InfoCircleOutlined />,
      });
      return;
    }

    // 如果选中的是"未关联"虚拟里程碑，则不设置milestoneId
    const newTask = selectedMilestoneId === '__unassigned__'
      ? {}
      : {
          milestoneId: selectedMilestoneId,
          milestoneName: selectedMilestoneName,
        };

    field.push(newTask);
  };

  // 删除任务
  const handleRemoveTask = (index: number) => {
    field.remove(index);
  };

  // 更新任务字段
  const handleUpdateTask = (index: number, fieldName: string, value: any) => {
    const currentTasks = [...tasks];
    currentTasks[index] = {
      ...currentTasks[index],
      [fieldName]: value,
    };
    field.setValue(currentTasks);
  };

  // 批量更新任务字段（一次性更新多个字段，避免中间状态）
  const handleBatchUpdateTask = (index: number, updates: Record<string, any>) => {
    const currentTasks = [...tasks];
    currentTasks[index] = {
      ...currentTasks[index],
      ...updates,
    };
    field.setValue(currentTasks);
  };

  // 处理里程碑变更（二次确认）
  const handleMilestoneChange = async (index: number, newValue: { value: string; label: string } | null) => {
    const task = tasks[index];
    const oldMilestoneId = task?.milestoneId;

    // 如果清空里程碑选择
    if (!newValue) {
      handleBatchUpdateTask(index, {
        milestoneId: undefined,
        milestoneName: undefined,
      });
      return;
    }

    // 如果里程碑发生变更且原来已关联
    if (oldMilestoneId && oldMilestoneId !== newValue.value) {
      const oldMilestone = milestones.find(
        (m: any) => (m.id || m._id || m.milestoneName) === oldMilestoneId
      );
      const oldName = oldMilestone?.milestoneName || '未知里程碑';

      Modal.confirm({
        title: '确认修改关联里程碑',
        icon: <ExclamationCircleOutlined />,
        content: (
          <div>
            <p>该任务已关联到【{oldName}】</p>
            <p>是否要改为【{newValue.label}】？</p>
          </div>
        ),
        okText: '确认修改',
        cancelText: '取消',
        onOk: () => {
          handleBatchUpdateTask(index, {
            milestoneId: newValue.value,
            milestoneName: newValue.label,
          });
        },
      });
    } else {
      handleBatchUpdateTask(index, {
        milestoneId: newValue.value,
        milestoneName: newValue.label,
      });
    }
  };

  // 筛选出选中里程碑的任务
  const filteredTasks = tasks.filter((task: any) => {
    if (selectedMilestoneId === '__unassigned__') {
      return !task.milestoneId;
    }
    return task.milestoneId === selectedMilestoneId;
  });

  // 获取里程碑选项
  const milestoneOptions = milestones
    .filter((m: any) => m && m.milestoneName)
    .map((m: any) => ({
      label: m.milestoneName,
      value: m.id || m._id || m.milestoneName,
    }));

  return (
    <div className="project-task-manager">
      <ProCard split="vertical" className="task-manager-card">
        {/* 左侧：里程碑列表 */}
        <ProCard colSpan="30%" className="milestone-panel">
          <MilestoneList
            milestones={extendedMilestones}
            selectedMilestoneId={selectedMilestoneId}
            onSelect={handleSelectMilestone}
            getTaskCount={getTaskCount}
          />
        </ProCard>

        {/* 右侧：任务列表 */}
        <ProCard colSpan="70%" className="task-panel">
          {milestones.length === 0 ? (
            <Alert
              message="请先添加里程碑"
              description="请先在「项目里程碑」Tab 中添加至少一个里程碑"
              type="warning"
              showIcon
              style={{ margin: '16px' }}
            />
          ) : !selectedMilestoneId ? (
            <Alert
              message="请先选择里程碑"
              description="请在左侧里程碑列表中选择一个里程碑"
              type="info"
              showIcon
              icon={<InfoCircleOutlined />}
              style={{ margin: '16px' }}
            />
          ) : (
            <div className="task-table-wrapper">
              <Alert
                message={`当前选中：${selectedMilestoneName}`}
                description={`显示关联到「${selectedMilestoneName}」的任务，共 ${filteredTasks.length} 个`}
                type="success"
                showIcon
                closable
                style={{ marginBottom: 16 }}
              />

              {/* 使用原生Table渲染 */}
              <div className="task-list">
                <table className="ant-table">
                  <thead className="ant-table-thead">
                    <tr>
                      <th style={{ width: 200 }}>任务名称</th>
                      <th style={{ width: 180 }}>任务类型</th>
                      <th style={{ width: 180 }}>关联里程碑</th>
                      <th style={{ width: 100 }}>预估工时</th>
                      <th style={{ width: 120 }}>紧急程度</th>
                      <th style={{ width: 200 }}>描述</th>
                      <th style={{ width: 80 }}>操作</th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {filteredTasks.map((task: any, filteredIndex: number) => {
                      // 找到在原始数组中的索引
                      const originalIndex = tasks.findIndex((t: any) => t === task);

                      return (
                        <tr key={originalIndex} className="ant-table-row">
                          <td>
                            <Input
                              value={task.taskName}
                              onChange={(e) => handleUpdateTask(originalIndex, 'taskName', e.target.value)}
                              placeholder="请输入任务名称"
                            />
                          </td>
                          <td>
                            <TaskTypeSelect
                              value={
                                task.taskTypeCode
                                  ? { value: task.taskTypeCode, label: task.taskTypeName }
                                  : undefined
                              }
                              onChange={(value: any) => {
                                if (value) {
                                  // 一次性更新 taskTypeCode 和 taskTypeName，避免中间状态
                                  handleBatchUpdateTask(originalIndex, {
                                    taskTypeCode: value.value,
                                    taskTypeName: value.label,
                                  });
                                } else {
                                  // 清空选择时，清除任务类型字段
                                  handleBatchUpdateTask(originalIndex, {
                                    taskTypeCode: undefined,
                                    taskTypeName: undefined,
                                  });
                                }
                              }}
                              labelInValue
                              placeholder="请选择任务类型"
                            />
                          </td>
                          <td>
                            <Select
                              value={
                                task.milestoneId
                                  ? { value: task.milestoneId, label: task.milestoneName }
                                  : undefined
                              }
                              onChange={(value: any) => handleMilestoneChange(originalIndex, value)}
                              labelInValue
                              options={milestoneOptions}
                              placeholder="请选择关联里程碑"
                              style={{ width: '100%' }}
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              value={task.estimatedHours}
                              onChange={(e) =>
                                handleUpdateTask(originalIndex, 'estimatedHours', Number(e.target.value))
                              }
                              placeholder="工时"
                              min={0}
                              step={0.1}
                            />
                          </td>
                          <td>
                            <Select
                              value={task.urgencyLevel}
                              onChange={(value) => handleUpdateTask(originalIndex, 'urgencyLevel', value)}
                              options={[
                                { label: '低', value: 1 },
                                { label: '中', value: 2 },
                                { label: '高', value: 3 },
                                { label: '紧急', value: 4 },
                              ]}
                              style={{ width: '100%' }}
                            />
                          </td>
                          <td>
                            <TextArea
                              value={task.description}
                              onChange={(e) => handleUpdateTask(originalIndex, 'description', e.target.value)}
                              placeholder="请输入描述"
                              rows={2}
                              maxLength={300}
                              showCount
                              autoSize={{ minRows: 2, maxRows: 4 }}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <a onClick={() => handleRemoveTask(originalIndex)}>删除</a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="ant-formily-array-base-addition" onClick={handleAddTask}>
                  <button type="button" className="ant-btn ant-btn-dashed">
                    <span>添加任务</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </ProCard>
      </ProCard>
    </div>
  );
});

export default ProjectTaskManager;
