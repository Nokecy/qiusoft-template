/**
 * CalendarFooter - 日历底部统计组件
 */

import React, { memo } from 'react';
import { Card, Row, Col, Statistic, Space } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  ToolOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import type { CalendarStatistics, FooterRenderFn } from '../types';

export interface CalendarFooterProps {
  /** 统计数据 */
  statistics: CalendarStatistics;
  /** 自定义渲染 */
  footerRender?: FooterRenderFn;
}

const CalendarFooter: React.FC<CalendarFooterProps> = memo(({ statistics, footerRender }) => {
  // 如果有自定义渲染
  if (footerRender) {
    return <>{footerRender(statistics)}</>;
  }

  return (
    <Card className="calendar-pro-footer" style={{ marginTop: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="工作日"
            value={statistics.workdays}
            suffix="天"
            prefix={<CalendarOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="假期"
            value={statistics.holidays}
            suffix="天"
            prefix={<SmileOutlined />}
            valueStyle={{ color: '#cf1322' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="手动调整"
            value={statistics.manualAdjusted}
            suffix="天"
            prefix={<ToolOutlined />}
            valueStyle={{ color: '#fa8c16' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            title="总工时"
            value={statistics.totalWorkHours}
            suffix="小时"
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
      </Row>
    </Card>
  );
});

CalendarFooter.displayName = 'CalendarFooter';

export default CalendarFooter;
