import React, { useEffect, useState } from 'react';
import { Card, Progress, Statistic, theme } from 'antd';
import { CloudServerOutlined } from '@ant-design/icons';

interface CPUMonitorProps {
  width?: number;
  height?: number;
}

const CPUMonitor: React.FC<CPUMonitorProps> = () => {
  const { token } = theme.useToken();
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    // 模拟 CPU 使用率数据
    const mockCpu = Math.floor(Math.random() * 40) + 20; // 20-60%
    setCpuUsage(mockCpu);

    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40) + 20);
    }, 3000);

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
      style={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      bodyStyle={{ height: '100%', padding: 24 }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <CloudServerOutlined style={{ fontSize: 48, marginBottom: 16 }} />
        <Statistic
          title={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16 }}>CPU 使用率</span>}
          value={cpuUsage}
          suffix="%"
          valueStyle={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}
        />
        <Progress
          percent={cpuUsage}
          strokeColor={{
            '0%': token.colorPrimary,
            '100%': token.colorSuccess,
          }}
          showInfo={false}
          style={{ marginTop: 16 }}
          strokeWidth={8}
        />
        <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
          {cpuUsage >= 80 ? '⚠️ 使用率偏高' : cpuUsage >= 60 ? '⚡ 运行正常' : '✓ 运行流畅'}
        </div>
      </div>
    </Card>
  );
};

export default {
  name: 'CPUMonitor',
  description: 'CPU 使用率监控',
  tags: ['系统', '监控', 'CPU'],
  component: CPUMonitor,
  configComponent: null,
  maxLength: 5,
  snapShot: '',
  icon: <CloudServerOutlined />,
  iconBackground: '#667eea',
  size: {
    defaultWidth: 3,
    defaultHeight: 4,
    minWidth: 2,
    minHeight: 3,
    maxWidth: 6,
    maxHeight: 8,
  },
};
