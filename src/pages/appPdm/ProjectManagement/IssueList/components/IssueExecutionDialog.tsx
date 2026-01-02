import React, { useState, useEffect } from 'react';
import { Button, Drawer, Space, message, Tabs, Descriptions, Tag, Spin } from 'antd';
import { ProjectIssueGetAsync } from '@/services/pdm/ProjectIssue';
import { useModel } from 'umi';
import { IssueStatus, issueStatusEnum } from '../_utils/issueEnums';
import {
  canAssign,
  canConfirmReceive,
  canStartProcessing,
  canResolve,
  canClose,
  canActivate,
  canConvertToTask,
} from '../_utils/statusUtils';
import AssignDialog from '../_components/AssignDialog';
import ConfirmReceiveDialog from '../_components/ConfirmReceiveDialog';
import StartProcessingDialog from '../_components/StartProcessingDialog';
import ResolveDialog from '../_components/ResolveDialog';
import CloseDialog from '../_components/CloseDialog';
import ActivateDialog from '../_components/ActivateDialog';
import ConvertToTaskDialog from '../_components/ConvertToTaskDialog';
import ExecutionTimeline from '../_components/ExecutionTimeline';

interface IssueExecutionDialogProps {
  issueId: string;
  onRefresh: () => void;
  open: boolean;
  onClose: () => void;
}

/**
 * 问题执行抽屉
 * 包含三个标签页：问题信息、执行操作、执行记录
 */
const IssueExecutionDialog: React.FC<IssueExecutionDialogProps> = ({
  issueId,
  onRefresh,
  open,
  onClose,
}) => {
  const [issueData, setIssueData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('actions');
  const { initialState } = useModel('@@initialState');

  // 获取当前用户信息
  const currentUser = initialState?.configuration?.currentUser;
  const currentUserId = currentUser?.id || '';
  const currentUserCode = currentUser?.userName || '';

  // 加载问题数据
  const loadIssueData = async () => {
    if (!issueId) return;
    setLoading(true);
    try {
      const data = await ProjectIssueGetAsync({ id: issueId });
      setIssueData(data);
    } catch (error) {
      message.error('加载问题信息失败');
    } finally {
      setLoading(false);
    }
  };

  // 当对话框打开时加载数据
  useEffect(() => {
    if (open && issueId) {
      loadIssueData();
      setActiveTab('actions'); // 重置为操作选项卡
    }
  }, [open, issueId]);

  // 操作完成后的回调
  const handleActionSuccess = () => {
    onRefresh();
    loadIssueData();
    setActiveTab('records'); // 切换到执行记录选项卡
  };

  // 获取状态标签
  const getStatusTag = (status?: number) => {
    const statusItem = issueStatusEnum.find((s) => s.value === status);
    return statusItem ? (
      <Tag color={statusItem.color}>{statusItem.label}</Tag>
    ) : (
      <Tag>{status}</Tag>
    );
  };

  // 渲染问题信息
  const renderIssueInfo = () => {
    if (!issueData) return null;

    return (
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="问题编码">{issueData.issueCode}</Descriptions.Item>
          <Descriptions.Item label="问题名称">{issueData.name}</Descriptions.Item>
          <Descriptions.Item label="当前状态">{getStatusTag(issueData.status)}</Descriptions.Item>
          <Descriptions.Item label="所属项目">{issueData.projectName || issueData.projectCode}</Descriptions.Item>
          <Descriptions.Item label="处理人">{issueData.handlerName || '-'}</Descriptions.Item>
          <Descriptions.Item label="是否需要审批">
            <Tag color={issueData.requiresApproval ? 'blue' : 'default'}>
              {issueData.requiresApproval ? '需要' : '不需要'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="关联里程碑">{issueData.milestoneName || '-'}</Descriptions.Item>
          <Descriptions.Item label="关联任务">{issueData.taskCode || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建人">{issueData.creatorName}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{issueData.creationTime}</Descriptions.Item>
        </Descriptions>

        {/* TODO: 等后端支持执行周期后显示 */}
        {/* <Descriptions column={1} bordered size="small" title="执行周期信息">
          <Descriptions.Item label="当前周期">第 {issueData.currentCycleNumber} 次执行</Descriptions.Item>
          <Descriptions.Item label="总执行次数">{issueData.totalCycles} 次</Descriptions.Item>
          <Descriptions.Item label="本周期开始时间">{issueData.cycleStartTime}</Descriptions.Item>
        </Descriptions> */}
      </Space>
    );
  };

  // 渲染执行操作
  const renderActions = () => {
    if (!issueData) return null;

    const isCreator = issueData.creatorId === currentUserId;
    const isHandler = issueData.handlerCode === currentUserCode;
    const status = issueData.status;

    return (
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h3>可用操作</h3>
          <Space wrap>
            {/* 指派按钮 */}
            {canAssign(status, isCreator, isHandler) && (
              <AssignDialog
                issueId={issueId}
                currentHandler={issueData.handlerName}
                onSuccess={handleActionSuccess}
              />
            )}

            {/* 确认接收按钮 */}
            {canConfirmReceive(status, isHandler) && (
              <ConfirmReceiveDialog
                issueId={issueId}
                onSuccess={handleActionSuccess}
              />
            )}

            {/* 开始处理按钮 */}
            {canStartProcessing(status, isHandler) && (
              <StartProcessingDialog
                issueId={issueId}
                onSuccess={handleActionSuccess}
              />
            )}

            {/* 解决/提交审批按钮 */}
            {canResolve(status, isHandler) && (
              <ResolveDialog
                issueId={issueId}
                onSuccess={handleActionSuccess}
              />
            )}

            {/* 关闭按钮 */}
            {canClose(status, isCreator, isHandler) && (
              <CloseDialog
                issueId={issueId}
                onSuccess={handleActionSuccess}
              />
            )}

            {/* 激活按钮 */}
            {canActivate(status, isCreator) && (
              <ActivateDialog
                issueId={issueId}
                onSuccess={handleActionSuccess}
              />
            )}

            {/* 转任务按钮 */}
            {canConvertToTask(status, isCreator, isHandler) && (
              <ConvertToTaskDialog
                issueId={issueId}
                issueCode={issueData.issueCode}
                issueName={issueData.name}
                issueDescription={issueData.description}
                projectCode={issueData.projectCode}
                milestoneId={issueData.milestoneId}
                milestoneName={issueData.milestoneName}
                handlerCode={issueData.handlerCode}
                handlerName={issueData.handlerName}
                expectedResolvedDate={issueData.expectedResolvedDate}
                remark={issueData.remark}
                onSuccess={handleActionSuccess}
              />
            )}
          </Space>
        </div>

        {!canAssign(status, isCreator, isHandler) &&
          !canConfirmReceive(status, isHandler) &&
          !canStartProcessing(status, isHandler) &&
          !canResolve(status, isHandler) &&
          !canClose(status, isCreator, isHandler) &&
          !canActivate(status, isCreator) &&
          !canConvertToTask(status, isCreator, isHandler) && (
            <div style={{ color: '#999' }}>当前状态下暂无可用操作</div>
          )}
      </Space>
    );
  };

  return (
    <Drawer
      title="问题执行"
      width={720}
      open={open}
      onClose={onClose}
      loading={loading}
    >
      {issueData && (
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'info',
              label: '问题信息',
              children: renderIssueInfo(),
            },
            {
              key: 'actions',
              label: '执行操作',
              children: renderActions(),
            },
            {
              key: 'records',
              label: '执行记录',
              children: <ExecutionTimeline issueId={issueId} />,
            },
          ]}
        />
      )}
    </Drawer>
  );
};

export default IssueExecutionDialog;
