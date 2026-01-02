import React from 'react';
import { Button, Modal, message, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { ProjectMilestoneCompleteAsync } from '@/services/pdm/ProjectMilestone';
import { openMilestoneApprovalRouteDialog } from './MilestoneApprovalRouteDialog';

interface MilestoneCompleteButtonsProps {
  milestones?: any[];
}

/**
 * 里程碑完成按钮组
 * 显示在里程碑流程图下方，为每个“进行中”的里程碑提供完成/提交按钮
 */
const MilestoneCompleteButtons: React.FC<MilestoneCompleteButtonsProps> = ({ milestones }) => {
  const validMilestones = Array.isArray(milestones) ? milestones : [];
  const inProgressMilestones = validMilestones.filter((m: any) => m?.status === 10);

  const handleComplete = async (milestone: any) => {
    const isApproving =
      !!milestone?.isApproval &&
      !!milestone?.workflowInstanceId &&
      milestone?.workflowStatus !== undefined &&
      milestone?.workflowStatus !== null &&
      milestone?.workflowStatus !== 0 &&
      milestone?.workflowStatus !== 5;
    if (isApproving) {
      message.info('该里程碑正在审批中');
      return;
    }

    if (!milestone?.id) {
      message.warning('里程碑ID不存在，无法操作');
      return;
    }

    try {
      if (milestone.isApproval) {
        const approvers = await openMilestoneApprovalRouteDialog({
          milestoneName: milestone.milestoneName,
          workflowDefinitionId: milestone.workflowDefinitionId,
        });
        if (!approvers) return;
        await ProjectMilestoneCompleteAsync({ id: milestone.id }, { approvers });
        message.success('已提交审批');
        setTimeout(() => window.location.reload(), 300);
        return;
      }

      Modal.confirm({
        title: '确认完成里程碑',
        content: `确定要完成里程碑“${milestone.milestoneName}”吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          await ProjectMilestoneCompleteAsync({ id: milestone.id });
          message.success('里程碑已完成');
          setTimeout(() => window.location.reload(), 300);
        },
      });
    } catch (err: any) {
      message.error('操作失败: ' + (err?.message || '未知错误'));
      // eslint-disable-next-line no-console
      console.error('完成/提交里程碑失败:', err);
    }
  };

  if (!inProgressMilestones.length) return null;

  return (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      <Space wrap>
        {inProgressMilestones.map((milestone: any) => (
          (() => {
            const isApproving =
              !!milestone?.isApproval &&
              !!milestone?.workflowInstanceId &&
              milestone?.workflowStatus !== undefined &&
              milestone?.workflowStatus !== null &&
              milestone?.workflowStatus !== 0 &&
              milestone?.workflowStatus !== 5;
            return (
          <Button
            key={milestone.id}
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleComplete(milestone)}
            disabled={isApproving}
          >
            {(isApproving ? '审批中' : (milestone.isApproval ? '提交' : '完成')) + ': ' + milestone.milestoneName}
          </Button>
            );
          })()
        ))}
      </Space>
    </div>
  );
};

export default MilestoneCompleteButtons;
