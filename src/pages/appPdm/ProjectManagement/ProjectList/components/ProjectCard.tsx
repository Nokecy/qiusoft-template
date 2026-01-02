import React from 'react';
import { Card, Avatar, Tag, Space, Button, Dropdown, Progress, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  UserOutlined,
  CalendarOutlined,
  FolderOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { useNavigate, Access, useAccess, useIntl } from 'umi';
import { ProjectPermissions } from '@/pages/appPdm/_permissions';
import DeleteConfirm from '@/components/deleteConfirm';
import type { MenuProps } from 'antd';
import './ProjectCard.less';
import { toDisplayUrl } from '@/pages/appPdm/_utils/url';

// 状态枚举 - 与后端 BurnAbpPdmProjectsProjectStatus 保持一致
const ProjectStatus = {
  Planning: 0,      // 计划中
  InProgress: 10,   // 进行中
  Paused: 20,       // 已暂停
  Completed: 30,    // 已完成
  Cancelled: 40,    // 已取消
};

const projectStatusEnum = [
  { label: '计划中', value: ProjectStatus.Planning, color: 'default' },
  { label: '进行中', value: ProjectStatus.InProgress, color: 'processing' },
  { label: '已暂停', value: ProjectStatus.Paused, color: 'warning' },
  { label: '已完成', value: ProjectStatus.Completed, color: 'success' },
  { label: '已取消', value: ProjectStatus.Cancelled, color: 'error' },
];

// 优先级枚举
const priorityEnum = [
  { label: '低', value: 0, color: '#52c41a' },
  { label: '中', value: 1, color: '#1890ff' },
  { label: '高', value: 2, color: '#faad14' },
  { label: '紧急', value: 3, color: '#ff4d4f' },
];

interface ProjectCardProps {
  data: any;
  onRefresh: () => void;
  onDelete: (id: any) => void;
  onAction: (id: any, action: any, actionName: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, onRefresh, onDelete, onAction }) => {
  const navigate = useNavigate();
  const access = useAccess();
  const intl = useIntl();
  const projectImageUrl = toDisplayUrl(data?.projectImageUrl) || data?.projectImageUrl;

  const canUpdate = !!(access && access[ProjectPermissions.Update]);
  const canDelete = !!(access && access[ProjectPermissions.Delete]);

  const handleCardClick = () => {
    if (data?.id) {
      navigate(`/appPdm/ProjectManagement/ProjectList/Detail?id=${data.id}`);
    }
  };

  // 查找状态配置，如果data.status为undefined/null，默认显示为"计划中"
  const status = projectStatusEnum.find(s => s.value === data.status) ||
    (data.status === undefined || data.status === null ? projectStatusEnum[0] : undefined);
  const priority = priorityEnum.find(p => p.value === data.priority);

  // 计算进度（基于开始和结束日期）
  const calculateProgress = () => {
    if (!data.plannedStartDate || !data.plannedEndDate) return 0;
    const start = new Date(data.plannedStartDate).getTime();
    const end = new Date(data.plannedEndDate).getTime();
    const now = Date.now();

    if (now < start) return 0;
    if (now > end) return 100;

    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  const progress = calculateProgress();

  // 操作菜单项
  const getActionMenuItems = (): MenuProps['items'] => {
    const items: MenuProps['items'] = [];
    const statusValue = data.status;

    if (statusValue === ProjectStatus.Planning) {
      items.push({
        key: 'start',
        label: '启动项目',
        icon: <PlayCircleOutlined />,
        onClick: () => onAction(data.id, 'start', '启动'),
      });
    }

    if (statusValue === ProjectStatus.InProgress) {
      items.push({
        key: 'pause',
        label: '暂停项目',
        icon: <PauseCircleOutlined />,
        onClick: () => onAction(data.id, 'pause', '暂停'),
      });
      items.push({
        key: 'complete',
        label: '完成项目',
        icon: <CheckCircleOutlined />,
        onClick: () => onAction(data.id, 'complete', '完成'),
      });
    }

    if (statusValue === ProjectStatus.Paused) {
      items.push({
        key: 'resume',
        label: '恢复项目',
        icon: <PlayCircleOutlined />,
        onClick: () => onAction(data.id, 'resume', '恢复'),
      });
    }

    if ([ProjectStatus.Planning, ProjectStatus.InProgress, ProjectStatus.Paused].includes(statusValue)) {
      items.push({
        key: 'cancel',
        label: '取消项目',
        icon: <CloseCircleOutlined />,
        onClick: () => onAction(data.id, 'cancel', '取消'),
      });
    }

    if (statusValue === ProjectStatus.Completed) {
      items.push({
        key: 'archive',
        label: '归档项目',
        icon: <InboxOutlined />,
        onClick: () => onAction(data.id, 'archive', '归档'),
      });
    }

    return items;
  };

  const actionItems = getActionMenuItems();

  return (
    <Card
      className="project-card"
      hoverable
      onClick={handleCardClick}
      style={{
        backgroundImage: projectImageUrl ? `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${projectImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      extra={
        <Space onClick={(e) => e.stopPropagation()}>
          <Access accessible={canUpdate}>
            <Button
              icon={<EditOutlined />}
              type="link"
              size="small"
              title={intl.formatMessage({ id: 'AbpUi:Edit' })}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/appPdm/ProjectManagement/ProjectList/Edit?id=${data.id}`);
              }}
            />
          </Access>

          {actionItems && actionItems.length > 0 && (
            <Access accessible={canUpdate}>
              <Dropdown menu={{ items: actionItems }} placement="bottomRight" trigger={['click']}>
                <Button
                  size="small"
                  type="link"
                  icon={<MoreOutlined />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            </Access>
          )}

          <Access accessible={canDelete}>
            <DeleteConfirm
              title="确定删除?"
              onConfirm={(e) => {
                console.log('🚀 DeleteConfirm onConfirm 被触发', e, data.id);
                e?.stopPropagation();
                console.log('🚀 准备调用 onDelete', data.id);
                return onDelete(data.id);
              }}
            >
              <Button
                size="small"
                icon={<DeleteOutlined />}
                type="link"
                danger
                title={intl.formatMessage({ id: 'AbpUi:Delete' })}
              />
            </DeleteConfirm>
          </Access>
        </Space>
      }
    >
      <div className="project-card-header">
        <Avatar
          size={64}
          icon={<FolderOutlined />}
          src={projectImageUrl}
          className="project-avatar"
          style={{ backgroundColor: priority?.color || '#1890ff' }}
        />
        <div className="project-info">
          <div className="project-title">
            <Tooltip title={data.projectName}>
              <span className="project-name">{data.projectName}</span>
            </Tooltip>
          </div>
          <div className="project-code">{data.projectCode}</div>
          {data.shortName && <div className="project-short-name">{data.shortName}</div>}
          {status && (
            <div style={{ marginTop: '4px' }}>
              <Tag color={status.color}>{status.label}</Tag>
            </div>
          )}
        </div>
      </div>

      <div className="project-card-body">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {data.projectManagerName && (
            <div className="project-meta">
              <UserOutlined /> 项目经理: {data.projectManagerName}
            </div>
          )}

          {data.projectCategoryCode && (
            <div className="project-meta">
              <FolderOutlined /> 分类: {data.projectCategoryCode}
            </div>
          )}

          {priority && (
            <div className="project-meta">
              优先级: <Tag color={priority.color}>{priority.label}</Tag>
            </div>
          )}

          {data.status === ProjectStatus.InProgress && (
            <div className="project-progress">
              <div className="progress-label">
                {data.currentMilestone ? `当前里程碑: ${data.currentMilestone.milestoneName}` : '项目进度'}
              </div>
              <Progress
                percent={data.currentMilestone ? Math.round(data.currentMilestone.taskCompletionRate || 0) : progress}
                size="small"
                status={(data.currentMilestone ? data.currentMilestone.taskCompletionRate : progress) === 100 ? 'success' : 'active'}
              />
              {data.currentMilestone && (
                <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                  已完成 {data.currentMilestone.completedTaskCount || 0} / {data.currentMilestone.totalTaskCount || 0} 个任务
                </div>
              )}
            </div>
          )}
        </Space>

        {data.description && (
          <div className="project-description">
            <Tooltip title={data.description}>
              {data.description}
            </Tooltip>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
