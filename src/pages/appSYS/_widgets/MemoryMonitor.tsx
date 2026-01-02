import React, { useEffect, useState } from 'react';
import { Card, Progress, Statistic, Row, Col, theme } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

interface MemoryMonitorProps {
  width?: number;
  height?: number;
}

const MemoryMonitor: React.FC<MemoryMonitorProps> = () => {
  const { token } = theme.useToken();
  const [memoryData, setMemoryData] = useState({
    used: 0,
    total: 16, // GB
    percentage: 0,
  });

  useEffect(() => {
    // 模拟内存使用数据
    const updateMemory = () => {
      const percentage = Math.floor(Math.random() * 30) + 50; // 50-80%
      const used = ((percentage / 100) * memoryData.total).toFixed(1);
      setMemoryData({
        used: parseFloat(used),
        total: 16,
        percentage,
      });
    };

    updateMemory();
    const interval = setInterval(updateMemory, 4000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (value: number) => {
    if (value >= 80) return '#ff4d4f';
    if (value >= 60) return '#faad14';
    return '#52c41a';
  };

  return (
    <Card
      bordered={false}
      style={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
      bodyStyle={{ height: '100%', padding: 24 }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <DatabaseOutlined style={{ fontSize: 48, marginBottom: 16 }} />
        <Statistic
          title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16 }}>内存使用</span>}
          value={memoryData.percentage}
          suffix="%"
          valueStyle={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}
        />
        <Progress
          percent={memoryData.percentage}
          strokeColor={{
            '0%': token.colorPrimary,
            '100%': token.colorSuccess,
          }}
          showInfo={false}
          style={{ marginTop: 16 }}
          strokeWidth={8}
        />
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={12}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>已用</div>
            <div style={{ fontSize: 18, fontWeight: 'bold', marginTop: 4 }}>
              {memoryData.used} GB
            </div>
          </Col>
          <Col span={12}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>总计</div>
            <div style={{ fontSize: 18, fontWeight: 'bold', marginTop: 4 }}>
              {memoryData.total} GB
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default {
  name: 'MemoryMonitor',
  description: '内存使用率监控',
  tags: ['系统', '监控', '内存'],
  component: MemoryMonitor,
  configComponent: null,
  maxLength: 5,
  snapShot: '',
  icon: <DatabaseOutlined />,
  size: {
    defaultWidth: 3,
    defaultHeight: 4,
    minWidth: 2,
    minHeight: 3,
    maxWidth: 6,
    maxHeight: 8,
  },
};
