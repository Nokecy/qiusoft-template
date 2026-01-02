import React, { useState } from 'react';
import { Button, Drawer, Space, message, Tabs } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { ProjectTaskGetAsync } from '@/services/pdm/ProjectTask';
import AssignTaskDialog from './AssignTaskDialog';
import StartTaskDialog from './StartTaskDialog';
import CompleteTaskDialog from './CompleteTaskDialog';
import TaskExecutionRecords from './TaskExecutionRecords';
import ProjectTaskFormDialog from './ProjectTaskFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  ProjectTaskCancelTaskAsync,
  ProjectTaskDeleteAsync,
} from '@/services/pdm/ProjectTask';

interface TaskExecutionDialogProps {
  taskId: string;
  onRefresh: () => void;
  open: boolean;
  onClose: () => void;
}

// 任务状态枚举
const TaskStatus = {
  NotStarted: 0,
  InProgress: 1,
  Paused: 2,
  Completed: 3,
  Cancelled: 4,
};

const TaskExecutionDialog: React.FC<TaskExecutionDialogProps> = ({
  taskId,
  onRefresh,
  open,
  onClose,
}) => {
  const [taskData, setTaskData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('actions');

  // 加载任务数据
  const loadTaskData = async () => {
    if (!taskId) return;
    setLoading(true);
    try {
      const data = await ProjectTaskGetAsync({ id: taskId });
      setTaskData(data);
    } catch (error) {
      message.error('加载任务信息失败');
    } finally {
      setLoading(false);
    }
  };

  // 当对话框打开时加载数据
  React.useEffect(() => {
    if (open && taskId) {
      loadTaskData();
      setActiveTab('actions'); // 重置为操作选项卡
    }
  }, [open, taskId]);

  // 取消任务
  const handleCancel = async () => {
    if (!taskId) return;
    const hide = message.loading('正在取消任务...', 0);
    try {
      await ProjectTaskCancelTaskAsync({ taskId });
      message.success('任务已取消');
      onRefresh();
      loadTaskData(); // 重新加载任务数据
    } catch (error) {
      message.error('取消任务失败');
    } finally {
      hide();
    }
  };

  // 删除任务
  const handleDelete = async () => {
    if (!taskData?.id) return;
    const hide = message.loading('正在删除...', 0);
    try {
      await ProjectTaskDeleteAsync({ id: taskData.id });
      message.success('删除成功');
      onRefresh();
      onClose();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 操作完成后的回调
  const handleActionSuccess = () => {
    onRefresh();
    loadTaskData();
    setActiveTab('records'); // 切换到执行记录选项卡
  };

  const renderActions = () => {
    if (!taskData) return null;

    const isNotStarted = taskData.status === TaskStatus.NotStarted;
    const isInProgress = taskData.status === TaskStatus.InProgress;
    const isCompleted = taskData.status === TaskStatus.Completed;
    const isCancelled = taskData.status === TaskStatus.Cancelled;

    return (
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 基本信息 */}
        <div>
          <h3>任务信息</h3>
          <p>
            <strong>任务编码:</strong> {taskData.taskCode}
          </p>
          <p>
            <strong>任务名称:</strong> {taskData.taskName}
          </p>
          <p>
            <strong>当前状态:</strong>{' '}
            {
              [
                { label: '未开始', value: 0 },
                { label: '进行中', value: 1 },
                { label: '已暂停', value: 2 },
                { label: '已完成', value: 3 },
                { label: '已取消', value: 4 },
              ].find((s) => s.value === taskData.status)?.label
            }
          </p>
          <p>
            <strong>负责人:</strong> {taskData.chargeNames || '-'}
          </p>
          <p>
            <strong>处理人:</strong> {taskData.processNames || '-'}
          </p>
          {taskData.actualExecutorName && (
            <p>
              <strong>实际执行人:</strong> {taskData.actualExecutorName}
            </p>
          )}
        </div>

        {/* 操作按钮 */}
        <div>
          <h3>任务操作</h3>
          <Space wrap>
            {/* 指派按钮 - 未完成和未取消的任务可以指派 */}
            {!isCompleted && !isCancelled && (
              <AssignTaskDialog
                taskId={taskId}
                projectCode={taskData.projectCode}
                onSuccess={handleActionSuccess}
                buttonProps={{
                  icon: <SendOutlined />,
                  type: 'primary',
                  children: '指派',
                }}
              />
            )}

            {/* 开始按钮 - 只有未开始的任务可以开始 */}
            {isNotStarted && (
              <StartTaskDialog
                taskId={taskId}
                projectCode={taskData.projectCode}
                onSuccess={handleActionSuccess}
                buttonProps={{
                  icon: <PlayCircleOutlined />,
                  type: 'primary',
                  children: '开始',
                }}
              />
            )}

            {/* 完成按钮 - 只有进行中的任务可以完成 */}
            {isInProgress && (
              <CompleteTaskDialog
                taskId={taskId}
                taskData={taskData}
                onSuccess={handleActionSuccess}
                buttonProps={{
                  icon: <CheckOutlined />,
                  type: 'primary',
                  children: '完成',
                }}
              />
            )}

            {/* 取消按钮 - 未完成和未取消的任务可以取消 */}
            {!isCompleted && !isCancelled && (
              <DeleteConfirm title="确定取消此任务?" onConfirm={handleCancel}>
                <Button icon={<CloseOutlined />} danger>
                  取消
                </Button>
              </DeleteConfirm>
            )}

          </Space>
        </div>
      </Space>
    );
  };

  return (
    <Drawer
      title="任务执行"
      width={720}
      open={open}
      onClose={onClose}
      loading={loading}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'actions',
            label: '任务操作',
            children: renderActions(),
          },
          {
            key: 'records',
            label: '执行记录',
            children: <TaskExecutionRecords taskId={taskId} />,
          },
        ]}
      />
    </Drawer>
  );
};

export default TaskExecutionDialog;
