/**
 * CalendarHeader - 日历头部组件
 */

import React, { memo } from 'react';
import { Row, Col, Space, Button, Segmented, DatePicker } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ViewMode, HeaderRenderFn } from '../types';
import { formatMonthTitle, formatWeekTitle } from '../utils/dateUtils';

export interface CalendarHeaderProps {
  /** 当前日期 */
  value: Dayjs;
  /** 视图模式 */
  viewMode: ViewMode;
  /** 显示视图切换 */
  showViewSwitch?: boolean;
  /** 显示今天按钮 */
  showToday?: boolean;
  /** 自定义渲染 */
  headerRender?: HeaderRenderFn;
  /** 改变日期 */
  onChange: (date: Dayjs) => void;
  /** 改变视图模式 */
  onViewModeChange: (mode: ViewMode) => void;
  /** 跳转到今天 */
  goToday: () => void;
  /** 上一个周期 */
  goPrev: () => void;
  /** 下一个周期 */
  goNext: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = memo(({
  value,
  viewMode,
  showViewSwitch = true,
  showToday = true,
  headerRender,
  onChange,
  onViewModeChange,
  goToday,
  goPrev,
  goNext,
}) => {
  // 如果有自定义渲染
  if (headerRender) {
    return (
      <>
        {headerRender({
          value,
          viewMode,
          onChange,
          onViewModeChange,
          goToday,
          goPrev,
          goNext,
        })}
      </>
    );
  }

  // 获取标题
  const getTitle = () => {
    switch (viewMode) {
      case 'month':
        return formatMonthTitle(value);
      case 'week':
        return formatWeekTitle(value);
      case 'year':
        return `${value.year()}年`;
      default:
        return formatMonthTitle(value);
    }
  };

  // 视图模式选项 - 只保留月视图和年视图
  const viewModeOptions = [
    {
      label: '月视图',
      value: 'month' as ViewMode,
      icon: <AppstoreOutlined />
    },
    {
      label: '年视图',
      value: 'year' as ViewMode,
      icon: <CalendarOutlined />
    },
  ];

  return (
    <div className="calendar-pro-header" style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <Row gutter={16} align="middle" justify="space-between">
        <Col flex="auto">
          <Space size="middle">
            {/* 导航按钮 */}
            <Space.Compact>
              <Button icon={<LeftOutlined />} onClick={goPrev} />
              <Button icon={<RightOutlined />} onClick={goNext} />
            </Space.Compact>

            {/* 当前日期标题 */}
            <span style={{ fontSize: '16px', fontWeight: 500 }}>
              {getTitle()}
            </span>

            {/* 今天按钮 */}
            {showToday && (
              <Button onClick={goToday}>今天</Button>
            )}

            {/* 日期选择器 */}
            <DatePicker
              value={value}
              onChange={(date) => date && onChange(date)}
              picker={viewMode === 'year' ? 'year' : 'month'}
              allowClear={false}
              style={{ width: 150 }}
            />
          </Space>
        </Col>

        {/* 视图切换 - 使用 Segmented 组件 */}
        {showViewSwitch && (
          <Col>
            <Segmented
              value={viewMode}
              onChange={(value) => onViewModeChange(value as ViewMode)}
              options={viewModeOptions.map(option => ({
                label: (
                  <div style={{ padding: '0 4px' }}>
                    <Space size={4}>
                      {option.icon}
                      {option.label}
                    </Space>
                  </div>
                ),
                value: option.value,
              }))}
            />
          </Col>
        )}
      </Row>
    </div>
  );
});

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader;
