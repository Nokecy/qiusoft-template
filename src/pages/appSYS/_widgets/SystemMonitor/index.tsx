import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Progress, theme } from 'antd';
import {
  DashboardOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  TeamOutlined,
} from '@ant-design/icons';

interface SystemMonitorProps {
  width?: number;
  height?: number;
}

const SystemMonitor: React.FC<SystemMonitorProps> = (props) => {
  const { token } = theme.useToken();
  const [systemData, setSystemData] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    onlineUsers: 0,
  });

  useEffect(() => {
    // 模拟系统监控数据
    // TODO: 替换为真实的 API 调用
    const mockData = {
      cpuUsage: Math.floor(Math.random() * 40) + 20, // 20-60%
      memoryUsage: Math.floor(Math.random() * 30) + 50, // 50-80%
      diskUsage: Math.floor(Math.random() * 20) + 60, // 60-80%
      onlineUsers: Math.floor(Math.random() * 50) + 10, // 10-60
    };
    setSystemData(mockData);

    // 定时更新数据
    const interval = setInterval(() => {
      setSystemData({
        cpuUsage: Math.floor(Math.random() * 40) + 20,
        memoryUsage: Math.floor(Math.random() * 30) + 50,
        diskUsage: Math.floor(Math.random() * 20) + 60,
        onlineUsers: Math.floor(Math.random() * 50) + 10,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getProgressColor = (value: number) => {
    if (value >= 80) return '#ff4d4f';
    if (value >= 60) return '#faad14';
    return '#52c41a';
  };

  return (
    <Card
      bordered={false}
      style={{ height: '100%' }}
      bodyStyle={{ height: '100%', padding: 16 }}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DashboardOutlined style={{ fontSize: 20, color: token.colorPrimary, marginRight: 8 }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>系统监控</span>
        </div>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card size="small" hoverable>
            <Statistic
              title={
                <span>
                  <CloudServerOutlined style={{ marginRight: 8, color: token.colorPrimary }} />
                  CPU 使用率
                </span>
              }
              value={systemData.cpuUsage}
              suffix="%"
              valueStyle={{ color: getProgressColor(systemData.cpuUsage), fontSize: 24 }}
            />
            <Progress
              percent={systemData.cpuUsage}
              strokeColor={getProgressColor(systemData.cpuUsage)}
              showInfo={false}
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" hoverable>
            <Statistic
              title={
                <span>
                  <DatabaseOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                  内存使用率
                </span>
              }
              value={systemData.memoryUsage}
              suffix="%"
              valueStyle={{ color: getProgressColor(systemData.memoryUsage), fontSize: 24 }}
            />
            <Progress
              percent={systemData.memoryUsage}
              strokeColor={getProgressColor(systemData.memoryUsage)}
              showInfo={false}
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" hoverable>
            <Statistic
              title={
                <span>
                  <DatabaseOutlined style={{ marginRight: 8, color: '#faad14' }} />
                  磁盘使用率
                </span>
              }
              value={systemData.diskUsage}
              suffix="%"
              valueStyle={{ color: getProgressColor(systemData.diskUsage), fontSize: 24 }}
            />
            <Progress
              percent={systemData.diskUsage}
              strokeColor={getProgressColor(systemData.diskUsage)}
              showInfo={false}
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" hoverable>
            <Statistic
              title={
                <span>
                  <TeamOutlined style={{ marginRight: 8, color: '#722ed1' }} />
                  在线用户
                </span>
              }
              value={systemData.onlineUsers}
              suffix="人"
              valueStyle={{ color: '#722ed1', fontSize: 24 }}
            />
            <div
              style={{
                marginTop: 12,
                fontSize: 12,
                color: '#999',
                textAlign: 'center',
              }}
            >
              实时在线用户数
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default {
  name: 'SystemMonitor',
  description: '系统监控：CPU、内存、磁盘使用率及在线用户数',
  tags: ['系统', '监控'],
  component: SystemMonitor,
  configComponent: null,
  maxLength: 1,
  snapShot: '',
  icon: <DashboardOutlined />,
  size: {
    defaultWidth: 6,
    defaultHeight: 6,
    minWidth: 4,
    minHeight: 4,
    maxWidth: 12,
    maxHeight: 12,
  },
};
