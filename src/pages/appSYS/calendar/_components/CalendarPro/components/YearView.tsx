/**
 * YearView - 年视图组件
 */

import React, { memo } from 'react';
import { Space } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarDateData, OnSelectFn, OnDateClickFn } from '../types';
import { useCalendarContext } from '../context/CalendarContext';
import MonthMiniCalendar from './MonthMiniCalendar';

// 日期文字颜色常量（与 MonthView 保持一致）
const TEXT_COLORS = {
  holiday: '#ff4d4f',   // 节假日 - 红色
  workday: '#52c41a',   // 工作日 - 绿色
  weekend: '#1890ff',   // 周末 - 蓝色
  today: '#1890ff',     // 今天 - 蓝色
  default: '#000',      // 默认 - 黑色
};

export interface YearViewProps {
  /** 日期选择回调 */
  onSelect?: OnSelectFn;
  /** 日期点击回调 */
  onDateClick?: OnDateClickFn;
  /** 禁用选择 */
  disabled?: boolean;
}

const YearView: React.FC<YearViewProps> = memo(({
  onSelect,
  onDateClick,
  disabled = false,
}) => {
  const { currentDate, dateMap, setCurrentDate, setViewMode } = useCalendarContext();

  // 处理日期点击
  const handleDateClick = (date: Dayjs) => {
    if (disabled) return;

    setCurrentDate(date);

    if (onSelect) {
      const dateKey = date.format('YYYY-MM-DD');
      const data = dateMap.get(dateKey) || null;
      onSelect(date, data);
    }

    if (onDateClick) {
      const dateKey = date.format('YYYY-MM-DD');
      const data = dateMap.get(dateKey);
      onDateClick({ date, data, event: null as any });
    }
  };

  // 处理月份点击 - 切换到月视图
  const handleMonthClick = (month: number) => {
    const newDate = currentDate.month(month);
    setCurrentDate(newDate);
    setViewMode('month');
  };

  // 生成 12 个月
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="calendar-pro-year-view">
      {/* 图例 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #f0f0f0',
          marginBottom: '16px',
        }}
      >
        <Space size="middle">
          {/* 节假日图例 */}
          <Space size={4}>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: TEXT_COLORS.holiday,
                borderRadius: '50%',
              }}
            />
            <span style={{ fontSize: 12, color: TEXT_COLORS.holiday, fontWeight: 500 }}>节假日</span>
          </Space>

          {/* 工作日图例 */}
          <Space size={4}>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: TEXT_COLORS.workday,
                borderRadius: '50%',
              }}
            />
            <span style={{ fontSize: 12, color: TEXT_COLORS.workday, fontWeight: 500 }}>工作日</span>
          </Space>

          {/* 周末图例 */}
          <Space size={4}>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: TEXT_COLORS.weekend,
                borderRadius: '50%',
              }}
            />
            <span style={{ fontSize: 12, color: TEXT_COLORS.weekend, fontWeight: 500 }}>周末</span>
          </Space>
        </Space>
      </div>

      {/* 年份标题 */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '24px',
          color: '#000',
        }}
      >
        {currentDate.year()}年
      </div>

      {/* 12个月网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        {months.map((month) => (
          <div
            key={month}
            onClick={() => handleMonthClick(month)}
          >
            <MonthMiniCalendar
              month={month}
              year={currentDate.year()}
              dateMap={dateMap}
              onClick={handleDateClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

YearView.displayName = 'YearView';

export default YearView;
