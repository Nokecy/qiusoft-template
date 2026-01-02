import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Button, Space, message } from 'antd';
import { PlusOutlined, LinkOutlined } from '@ant-design/icons';
import { AgGridPlus } from '@/components/AgGridPlus';
import { FormDialog, FormLayout, FormGrid, FormItem, Input, Select, NumberPicker } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { useSchemaField } from 'umi';
import TaskTypeSelect from '../../_formWidgets/TaskTypeSelect';

interface MilestoneDetailDialogProps {
  visible: boolean;
  milestone: any;
  tasks: any[]; // 模板中的所有任务
  milestones: any[]; // 模板中的所有里程碑
  onClose: () => void;
  onTasksChange: (tasks: any[]) => void; // 回调通知父组件任务列表变化
}

const MilestoneDetailDialog: React.FC<MilestoneDetailDialogProps> = ({
  visible,
  milestone,
  tasks,
  milestones,
  onClose,
  onTasksChange,
}) => {
  const [relatedTasks, setRelatedTasks] = useState<any[]>([]);
  const SchemaField = useSchemaField({ TaskTypeSelect });

  // 获取当前里程碑关联的任务
  useEffect(() => {
    if (visible && milestone) {
      const milestoneId = milestone.id || milestone.milestoneName;
      const filtered = tasks.filter((task) =>
        task.milestoneId === milestoneId || task.milestoneName === milestone.milestoneName
      );
      setRelatedTasks(filtered);
    }
  }, [visible, milestone, tasks]);

  // 创建新任务
  const handleCreateTask = () => {
    const form = createForm();

    FormDialog.Portal({
      title: '创建项目任务',
      width: 600,
      onFormInit: (form) => {
        // 预设里程碑信息
        form.setInitialValues({
          milestoneId: milestone.id || milestone.milestoneName,
          milestoneName: milestone.milestoneName,
        });
      },
      forConfirm: async (form) => {
        const values = await form.submit();

        // 生成临时ID
        const newTask = {
          ...values,
          _id: `temp_task_${Date.now()}_${Math.random()}`,
          _isNew: true,
        };

        // 添加到任务列表
        const updatedTasks = [...tasks, newTask];
        onTasksChange(updatedTasks);

        message.success('任务创建成功');
      },
    }).open({
      form,
      schema: {
        type: 'object',
        properties: {
          grid: {
            type: 'void',
            'x-component': 'FormGrid',
            'x-component-props': { maxColumns: 1, strictAutoFit: true },
            properties: {
              taskName: {
                type: 'string',
                title: '任务名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入任务名称' },
                required: true,
              },
              '{value:taskTypeCode,label:taskTypeName}': {
                type: 'string',
                title: '任务类型',
                'x-decorator': 'FormItem',
                'x-component': 'TaskTypeSelect',
                'x-component-props': {
                  labelInValue: true,
                  placeholder: '请选择任务类型',
                },
                required: true,
              },
              estimatedHours: {
                type: 'number',
                title: '预估工时',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  placeholder: '工时(小时)',
                  min: 0,
                  precision: 1,
                },
              },
              urgencyLevel: {
                type: 'number',
                title: '紧急程度',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: [
                    { label: '低', value: 1 },
                    { label: '中', value: 2 },
                    { label: '高', value: 3 },
                    { label: '紧急', value: 4 },
                  ],
                },
              },
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入描述',
                  rows: 3,
                },
              },
            },
          },
        },
      },
    });
  };

  // 关联已有任务
  const handleLinkTask = () => {
    const form = createForm();

    // 获取未关联任何里程碑或关联其他里程碑的任务
    const availableTasks = tasks.filter((task) => {
      const currentMilestoneId = milestone.id || milestone.milestoneName;
      return task.milestoneId !== currentMilestoneId && task.milestoneName !== milestone.milestoneName;
    });

    FormDialog.Portal({
      title: '关联已有任务',
      width: 600,
      forConfirm: async (form) => {
        const values = await form.submit();

        if (!values.taskIds || values.taskIds.length === 0) {
          message.warning('请选择要关联的任务');
          return;
        }

        // 更新选中任务的里程碑信息
        const updatedTasks = tasks.map((task) => {
          if (values.taskIds.includes(task._id || task.id)) {
            return {
              ...task,
              milestoneId: milestone.id || milestone.milestoneName,
              milestoneName: milestone.milestoneName,
            };
          }
          return task;
        });

        onTasksChange(updatedTasks);
        message.success('任务关联成功');
      },
    }).open({
      form,
      schema: {
        type: 'object',
        properties: {
          taskIds: {
            type: 'array',
            title: '选择任务',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              mode: 'multiple',
              placeholder: '请选择要关联的任务',
              options: availableTasks.map((task) => ({
                label: `${task.taskName}${task.milestoneName ? ` (当前关联: ${task.milestoneName})` : ''}`,
                value: task._id || task.id,
              })),
            },
            required: true,
          },
        },
      },
    });
  };

  // 移除任务关联
  const handleRemoveTask = (task: any) => {
    const updatedTasks = tasks.map((t) => {
      if ((t._id || t.id) === (task._id || task.id)) {
        return {
          ...t,
          milestoneId: undefined,
          milestoneName: undefined,
        };
      }
      return t;
    });

    onTasksChange(updatedTasks);
    message.success('已移除任务关联');
  };

  // 任务列表列定义
  const columnDefs = [
    {
      field: 'taskName',
      headerName: '任务名称',
      width: 200,
    },
    {
      field: 'taskTypeName',
      headerName: '任务类型',
      width: 150,
    },
    {
      field: 'estimatedHours',
      headerName: '预估工时',
      width: 100,
      hideInSearch: true,
    },
    {
      field: 'urgencyLevel',
      headerName: '紧急程度',
      width: 120,
      valueEnum: [
        { label: '低', value: 1 },
        { label: '中', value: 2 },
        { label: '高', value: 3 },
        { label: '紧急', value: 4 },
      ],
    },
    {
      field: 'description',
      headerName: '描述',
      width: 200,
    },
    {
      field: 'actions',
      headerName: '操作',
      width: 100,
      cellRenderer: (params: any) => {
        return (
          <Button
            type="link"
            size="small"
            danger
            onClick={() => handleRemoveTask(params.data)}
          >
            移除关联
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title="里程碑详情"
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="close" onClick={onClose}>
          关闭
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* 里程碑基本信息 */}
        <Descriptions title="基本信息" column={2} bordered size="small">
          <Descriptions.Item label="里程碑名称">{milestone?.milestoneName}</Descriptions.Item>
          <Descriptions.Item label="责任人">{milestone?.responsibleName}</Descriptions.Item>
          <Descriptions.Item label="计划开始时间">{milestone?.planStartTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="计划结束时间">{milestone?.planEndTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="是否需要审批">{milestone?.isApproval ? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="关联表单">{milestone?.formId || '-'}</Descriptions.Item>
        </Descriptions>

        {/* 关联任务列表 */}
        <div>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>关联任务 ({relatedTasks.length})</h3>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>
                创建新任务
              </Button>
              <Button icon={<LinkOutlined />} onClick={handleLinkTask}>
                关联已有任务
              </Button>
            </Space>
          </div>

          <AgGridPlus
            gridKey="milestone-detail-tasks"
            dataSource={relatedTasks}
            columnDefs={columnDefs}
            pagination={{ pageSize: 10 }}
            height={300}
          />
        </div>
      </Space>
    </Modal>
  );
};

export default MilestoneDetailDialog;
