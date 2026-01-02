import React, { useMemo } from 'react';
import { Button, Card, Empty, Modal, Space, Tag, message } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { observer } from '@formily/react';
import { ProjectMilestoneCompleteAsync } from '@/services/pdm/ProjectMilestone';
import { openMilestoneApprovalRouteDialog } from './MilestoneApprovalRouteDialog';

interface CurrentMilestoneCardProps {
  milestones?: any[];
  currentMilestoneId?: string;
  value?: any;
}

/**
 * 当前里程碑卡片
 * 显示当前进行中的里程碑信息，并提供“完成/提交”入口
 */
const CurrentMilestoneCard: React.FC<CurrentMilestoneCardProps> = observer((props) => {
  const { milestones: propMilestones, currentMilestoneId, value } = props;
  const milestones = Array.isArray(propMilestones) ? propMilestones : (Array.isArray(value) ? value : []);

  const inProgressMilestones = useMemo(() => {
    if (currentMilestoneId) {
      const current = milestones.find((m: any) => m?.id === currentMilestoneId);
      return current ? [current] : [];
    }
    return milestones.filter((m: any) => m?.status === 10);
  }, [milestones, currentMilestoneId]);

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

  if (!inProgressMilestones.length) {
    return (
      <Card
        title={
          <Space>
            <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
            <span>当前里程碑</span>
          </Space>
        }
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无进行中的里程碑" />
      </Card>
    );
  }

  return (
    <Card
      title={
        <Space>
          <ClockCircleOutlined style={{ color: '#1890ff' }} />
          <span>当前里程碑</span>
        </Space>
      }
      style={{ marginTop: 16, marginBottom: 16 }}
      extra={
        <Space>
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
              size="small"
              icon={<CheckOutlined />}
              onClick={() => handleComplete(milestone)}
              disabled={isApproving}
            >
              {isApproving ? '审批中' : (milestone.isApproval ? '提交' : '完成')}
            </Button>
              );
            })()
          ))}
        </Space>
      }
    >
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {inProgressMilestones.map((milestone: any) => (
          <div
            key={milestone.id}
            style={{
              padding: '12px 16px',
              background: '#f0f5ff',
              border: '1px solid #adc6ff',
              borderRadius: 6,
            }}
          >
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              <Space>
                <Tag color="processing">进行中</Tag>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#262626' }}>{milestone.milestoneName}</span>
                {milestone.isApproval ? (
                  (milestone.workflowInstanceId && milestone.workflowStatus !== 0 && milestone.workflowStatus !== 5)
                    ? <Tag color="blue">审批中</Tag>
                    : <Tag color="orange">需要审批</Tag>
                ) : null}
              </Space>
              {milestone.responsibleName ? (
                <div style={{ fontSize: 13, color: '#8c8c8c' }}>负责人：{milestone.responsibleName}</div>
              ) : null}
            </Space>
          </div>
        ))}
      </Space>
    </Card>
  );
});

export default CurrentMilestoneCard;
