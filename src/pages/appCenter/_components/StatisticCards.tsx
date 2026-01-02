/**
 * 应用数据页 - 统计卡片组件
 * 展示数据总数、今日新增、本周新增、本月新增
 */
import { Card, Col, Row, Statistic } from 'antd';
import {
  DatabaseOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import React from 'react';

interface StatisticCardsProps {
  total: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
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

const StatisticCards: React.FC<StatisticCardsProps> = ({
  total = 0,
  todayCount = 0,
  weekCount = 0,
  monthCount = 0,
  loading = false,
}) => {
  const stats = [
    {
      title: '数据总数',
      value: total,
      icon: <DatabaseOutlined />,
      color: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
      textColor: '#1890ff',
    },
    {
      title: '今日新增',
      value: todayCount,
      icon: <CalendarOutlined />,
      color: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
      textColor: '#52c41a',
    },
    {
      title: '本周新增',
      value: weekCount,
      icon: <FieldTimeOutlined />,
      color: 'linear-gradient(135deg, #faad14 0%, #d48806 100%)',
      textColor: '#faad14',
    },
    {
      title: '本月新增',
      value: monthCount,
      icon: <ScheduleOutlined />,
      color: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
      textColor: '#722ed1',
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

export default StatisticCards;
