/**
 * CalendarSidebar - 日历右侧信息面板
 */

import React, { useState } from 'react';
import { Card, Typography, Space, Input, Button, Statistic, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs.extend(dayOfYear);

const { Title, Text } = Typography;
const { TextArea } = Input;

export interface MonthStatistics {
  /** 工作天数 */
  workDays: number;
  /** 放假天数 */
  holidays: number;
  /** 周末天数 */
  weekends: number;
  /** 调休天数 */
  adjustedDays: number;
}

export interface CalendarSidebarProps {
  /** 当前选中日期 */
  currentDate?: Dayjs;
  /** 月度统计数据 */
  monthStats?: MonthStatistics;
  /** 备忘录添加回调 */
  onMemoAdd?: (memo: string) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  currentDate = dayjs(),
  monthStats = {
    workDays: 0,
    holidays: 0,
    weekends: 0,
    adjustedDays: 0,
  },
  onMemoAdd,
}) => {
  const [memoText, setMemoText] = useState('');

  // 计算周数（ISO周数）
  const weekNumber = currentDate.isoWeek();

  // 计算年度天数
  const dayOfYear = currentDate.dayOfYear();

  // 处理备忘录添加
  const handleAddMemo = () => {
    if (memoText.trim()) {
      onMemoAdd?.(memoText.trim());
      setMemoText('');
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* 当前日期信息 */}
      <Card>
        <Title level={5} style={{ marginBottom: 16 }}>当前日期</Title>

        {/* 大号日期显示 */}
        <Title
          level={2}
          style={{
            color: '#1890ff',
            textAlign: 'center',
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          {currentDate.format('YYYY年MM月DD日')}
        </Title>

        {/* 周数和天数 */}
        <Row gutter={16}>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: 12, color: '#999' }}>第</Text>
              <Text style={{ fontSize: 24, fontWeight: 600, color: '#52c41a', margin: '0 4px' }}>
                {weekNumber}
              </Text>
              <Text style={{ fontSize: 12, color: '#999' }}>周</Text>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: 12, color: '#999' }}>第</Text>
              <Text style={{ fontSize: 24, fontWeight: 600, color: '#1890ff', margin: '0 4px' }}>
                {dayOfYear}
              </Text>
              <Text style={{ fontSize: 12, color: '#999' }}>天</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 月度工作概况 */}
      <Card>
        <Title level={5} style={{ marginBottom: 16 }}>
          {currentDate.format('M')}月工作概况
        </Title>

        <Row gutter={[16, 16]}>
          {/* 工作天数 */}
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: '#52c41a' }}>
                {monthStats.workDays}
              </div>
              <Text style={{ fontSize: 12, color: '#666' }}>工作天数</Text>
            </div>
          </Col>

          {/* 放假天数 */}
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: '#ff4d4f' }}>
                {monthStats.holidays}
              </div>
              <Text style={{ fontSize: 12, color: '#666' }}>放假天数</Text>
            </div>
          </Col>

          {/* 周末天数 */}
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: '#999' }}>
                {monthStats.weekends}
              </div>
              <Text style={{ fontSize: 12, color: '#666' }}>周末天数</Text>
            </div>
          </Col>

          {/* 调休天数 */}
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: '#faad14' }}>
                {monthStats.adjustedDays}
              </div>
              <Text style={{ fontSize: 12, color: '#666' }}>调休天数</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 备忘录 */}
      <Card>
        <Title level={5} style={{ marginBottom: 16 }}>备忘录</Title>

        <Space.Compact style={{ width: '100%' }}>
          <TextArea
            placeholder="添加备忘录..."
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 4 }}
            onPressEnter={(e) => {
              if (e.ctrlKey || e.metaKey) {
                handleAddMemo();
              }
            }}
          />
        </Space.Compact>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddMemo}
          style={{ marginTop: 8, width: '100%' }}
          disabled={!memoText.trim()}
        >
          添加
        </Button>
      </Card>

      {/* 任务列表占位 */}
      <Card>
        <Title level={5} style={{ marginBottom: 16 }}>待办任务</Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          暂无任务
        </Text>
      </Card>
    </Space>
  );
};

export default CalendarSidebar;
