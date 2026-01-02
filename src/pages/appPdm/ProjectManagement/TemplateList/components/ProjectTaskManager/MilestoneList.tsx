import React from 'react';
import { List, Badge, Empty, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './MilestoneList.less';

const { Text } = Typography;

interface Milestone {
  id?: string;
  _id?: string;
  milestoneName: string;
  [key: string]: any;
}

interface MilestoneListProps {
  milestones: Milestone[];
  selectedMilestoneId?: string;
  onSelect: (milestoneId: string, milestoneName: string) => void;
  getTaskCount: (milestoneId: string) => number;
}

const MilestoneList: React.FC<MilestoneListProps> = ({
  milestones,
  selectedMilestoneId,
  onSelect,
  getTaskCount,
}) => {
  if (!milestones || milestones.length === 0) {
    return (
      <div className="milestone-list-empty">
        <Empty description="暂无里程碑，请先在「项目里程碑」Tab 中添加" />
      </div>
    );
  }

  return (
    <div className="milestone-list-container">
      <div className="milestone-list-header">
        <Text strong>里程碑列表</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          共 {milestones.length} 个
        </Text>
      </div>
      <List
        className="milestone-list"
        dataSource={milestones}
        renderItem={(milestone) => {
          const milestoneId = milestone.id || milestone._id || milestone.milestoneName;
          const taskCount = getTaskCount(milestoneId);
          const isSelected = selectedMilestoneId === milestoneId;

          return (
            <List.Item
              className={`milestone-list-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(milestoneId, milestone.milestoneName)}
            >
              <div className="milestone-item-content">
                <div className="milestone-item-title">
                  {isSelected && <CheckCircleOutlined className="selected-icon" />}
                  <Text ellipsis={{ tooltip: milestone.milestoneName }}>
                    {milestone.milestoneName}
                  </Text>
                </div>
                <Badge
                  count={taskCount}
                  showZero
                  overflowCount={999}
                  className="milestone-task-count"
                />
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default MilestoneList;
