import React, { useMemo } from 'react';
import { Empty, Tabs } from 'antd';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';

interface MilestoneApprovalDisplayProps {
  milestones?: any[];
}

/**
 * 里程碑工作流执行历史展示组件
 * 展示所有有工作流correlationId的里程碑的审批历史
 */
const MilestoneApprovalDisplay: React.FC<MilestoneApprovalDisplayProps> = ({ milestones = [] }) => {
  // 筛选出有工作流correlationId的里程碑
  const workflowMilestones = useMemo(() => {
    return milestones.filter(m => m && m.correlationId);
  }, [milestones]);

  if (!workflowMilestones || workflowMilestones.length === 0) {
    return (
      <Empty
        description="暂无工作流审批记录"
        style={{ padding: '40px 0' }}
      />
    );
  }

  // 如果只有一个里程碑,直接显示
  if (workflowMilestones.length === 1) {
    const milestone = workflowMilestones[0];
    return (
      <div style={{ padding: '16px 0' }}>
        <WorkflowExecutionCorrelationList
          workflowData={{
            correlationId: milestone.correlationId,
            workflowDefinitionId: milestone.workflowDefinitionId
          }}
        />
      </div>
    );
  }

  // 多个里程碑,使用Tabs展示
  return (
    <div style={{ padding: '16px 0' }}>
      <Tabs
        items={workflowMilestones.map((milestone, index) => ({
          key: milestone.id || index.toString(),
          label: milestone.milestoneName || `里程碑${index + 1}`,
          children: (
            <WorkflowExecutionCorrelationList
              workflowData={{
                correlationId: milestone.correlationId,
                workflowDefinitionId: milestone.workflowDefinitionId
              }}
            />
          )
        }))}
      />
    </div>
  );
};

export default MilestoneApprovalDisplay;

