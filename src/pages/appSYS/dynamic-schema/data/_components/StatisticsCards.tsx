/**
 * 数据管理页面 - 统计卡片组件
 */
import { Card, Col, Row, Statistic } from 'antd';
import {
  DatabaseOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import React from 'react';

interface StatisticsCardsProps {
  total?: number;
  pending?: number;
  approved?: number;
  rejected?: number;
  loading?: boolean;
}

const cardStyle: React.CSSProperties = {
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
};

const iconStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
};

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  total = 0,
  pending = 0,
  approved = 0,
  rejected = 0,
  loading = false,
}) => {
  const stats = [
    {
      title: '数据总数',
      value: total,
      icon: <DatabaseOutlined />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#667eea',
    },
    {
      title: '待审批',
      value: pending,
      icon: <ClockCircleOutlined />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#f5576c',
    },
    {
      title: '已通过',
      value: approved,
      icon: <CheckCircleOutlined />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: '#10b981',
    },
    {
      title: '已拒绝',
      value: rejected,
      icon: <CloseCircleOutlined />,
      color: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
      textColor: '#ef4444',
    },
  ];

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      {stats.map((stat) => (
        <Col xs={24} sm={12} md={6} key={stat.title}>
          <Card style={cardStyle} loading={loading}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ ...iconStyle, background: stat.color, color: '#fff' }}>
                {stat.icon}
              </div>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.textColor, fontSize: 24, fontWeight: 600 }}
              />
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatisticsCards;
