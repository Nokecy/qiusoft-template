import React from 'react';
import { Button, Modal, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { observer } from '@formily/react';
import { ProjectMilestoneCompleteAsync } from '@/services/pdm/ProjectMilestone';
import { openMilestoneApprovalRouteDialog } from './MilestoneApprovalRouteDialog';

/**
 * 完成/提交里程碑按钮
 * 用于 Formily ArrayTable 行内操作
 */
const CompleteMilestoneButton: React.FC<any> = observer((props) => {
  const { value } = props;

  const handleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const isApproving =
      !!value?.isApproval &&
      !!value?.workflowInstanceId &&
      value?.workflowStatus !== undefined &&
      value?.workflowStatus !== null &&
      value?.workflowStatus !== 0 &&
      value?.workflowStatus !== 5;
    if (isApproving) {
      message.info('该里程碑正在审批中');
      return;
    }

    if (!value?.id) {
      message.warning('里程碑ID不存在，无法操作');
      return;
    }

    try {
      // 审批里程碑：弹出节点审批人选择弹窗，确认后直接提交审批（避免嵌套确认弹窗导致卡死）
      if (value.isApproval) {
        const approvers = await openMilestoneApprovalRouteDialog({
          milestoneName: value.milestoneName,
          workflowDefinitionId: value.workflowDefinitionId,
        });
        if (!approvers) return;
        await ProjectMilestoneCompleteAsync({ id: value.id }, { approvers });
        message.success('已提交审批');
        window.location.reload();
        return;
      }

      // 非审批里程碑：保留确认弹窗
      Modal.confirm({
        title: '确认完成里程碑',
        content: `确定要完成里程碑“${value.milestoneName}”吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          await ProjectMilestoneCompleteAsync({ id: value.id });
          message.success('里程碑已完成');
          window.location.reload();
        },
      });
    } catch (err: any) {
      message.error('操作失败: ' + (err?.message || '未知错误'));
      // eslint-disable-next-line no-console
      console.error('完成/提交里程碑失败:', err);
    }
  };

  // 仅在“进行中”状态显示按钮（旧逻辑保持不动）
  if (value?.status !== 1) {
    return null;
  }

  return (
    <Button type="link" size="small" icon={<CheckOutlined />} onClick={handleComplete}>
      {value?.isApproval ? '提交' : '完成'}
    </Button>
  );
});

export default CompleteMilestoneButton;
