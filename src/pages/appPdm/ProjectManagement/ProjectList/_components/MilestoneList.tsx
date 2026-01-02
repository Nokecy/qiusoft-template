import React from 'react';
import { List, Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './MilestoneList.less';

interface MilestoneListProps {
  milestones?: any[];
  selectedMilestoneId?: string;
  onMilestoneSelect?: (milestoneId: string) => void;
}

/**
 * 里程碑列表组件
 * 用于左侧显示里程碑列表，支持点击切换
 */
const MilestoneList: React.FC<MilestoneListProps> = ({
  milestones = [],
  selectedMilestoneId,
  onMilestoneSelect,
}) => {
  // 获取里程碑状态图标
  const getStatusIcon = (status: number) => {
    switch (status) {
      case 0: // 未开始
        return <ClockCircleOutlined style={{ color: '#d9d9d9' }} />;
      case 10: // 进行中
        return <SyncOutlined spin style={{ color: '#1890ff' }} />;
      case 20: // 已完成
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return <ClockCircleOutlined style={{ color: '#d9d9d9' }} />;
    }
  };

  // 获取里程碑状态文本
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return <Tag color="default">未开始</Tag>;
      case 10:
        return <Tag color="processing">进行中</Tag>;
      case 20:
        return <Tag color="success">已完成</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  return (
    <div className="milestone-list-container">
      <div className="milestone-list-header">里程碑列表</div>
      {/* 全部选项 */}
      <div
        className={`milestone-list-item milestone-all-item ${!selectedMilestoneId ? 'milestone-list-item-active' : ''
          }`}
        onClick={() => {
          onMilestoneSelect?.('');
        }}
      >
        <div className="milestone-item-content">
          <div className="milestone-item-row">
            <span className="milestone-item-name">全部</span>
          </div>
        </div>
      </div>
      <List
        dataSource={milestones}
        renderItem={(item: any) => (
          <List.Item
            className={`milestone-list-item ${selectedMilestoneId === item.id ? 'milestone-list-item-active' : ''
              }`}
            onClick={() => {
              onMilestoneSelect?.(item.id);
            }}
          >
            <div className="milestone-item-content">
              <div className="milestone-item-row">
                {getStatusText(item.status)}
                <span className="milestone-item-name">{item.milestoneName}</span>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MilestoneList;
