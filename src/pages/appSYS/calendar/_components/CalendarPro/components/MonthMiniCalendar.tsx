/**
 * MonthMiniCalendar - 迷你月历组件（用于年视图）
 */

import React, { memo, useMemo } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { CalendarDateData } from '../types';
import {
  getWeeksInMonth,
  formatDateKey,
  isToday,
  isWeekend,
} from '../utils/dateUtils';
import { getDateData } from '../utils/statisticsUtils';

// 日期文字颜色常量
const TEXT_COLORS = {
  holiday: '#ff4d4f',   // 节假日 - 红色
  workday: '#52c41a',   // 工作日 - 绿色
  weekend: '#1890ff',   // 周末 - 蓝色
  today: '#1890ff',     // 今天 - 蓝色
  default: '#000',      // 默认 - 黑色
  otherMonth: '#bbb',   // 其他月份 - 浅灰色
};

export interface MonthMiniCalendarProps {
  /** 月份 (0-11) */
  month: number;
  /** 年份 */
  year: number;
  /** 日期数据映射 */
  dateMap: Map<string, CalendarDateData>;
  /** 点击日期回调 */
  onClick?: (date: Dayjs) => void;
}

const MonthMiniCalendar: React.FC<MonthMiniCalendarProps> = memo(({
  month,
  year,
  dateMap,
  onClick,
}) => {
  // 当前月份的第一天
  const monthDate = useMemo(() => dayjs().year(year).month(month).date(1), [year, month]);

  // 生成周数组
  const weeks = useMemo(() => getWeeksInMonth(monthDate, 0), [monthDate]);

  // 获取日期颜色
  const getDateColor = (date: Dayjs): string => {
    const isTodayDate = isToday(date);
    const isCurrentMonth = date.month() === month;

    if (!isCurrentMonth) {
      return TEXT_COLORS.otherMonth;
    }

    if (isTodayDate) {
      return TEXT_COLORS.today;
    }

    const dateKey = formatDateKey(date);
    const data = getDateData(dateMap, dateKey);

    if (data?.isHoliday) {
      return TEXT_COLORS.holiday;
    }
    if (data?.isWorkday) {
      return TEXT_COLORS.workday;
    }
    if (isWeekend(date)) {
      return TEXT_COLORS.weekend;
    }

    return TEXT_COLORS.default;
  };

  return (
    <div
      style={{
        border: '1px solid #f0f0f0',
        borderRadius: '4px',
        padding: '8px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* 月份标题 */}
      <div
        style={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '14px',
          marginBottom: '8px',
          color: '#000',
        }}
      >
        {month + 1}月
      </div>

      {/* 星期标题 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          marginBottom: '4px',
        }}
      >
        {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
          <div
            key={index}
            style={{
              textAlign: 'center',
              fontSize: '10px',
              color: '#999',
              fontWeight: 500,
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      {weeks.map((week, weekIndex) => (
        <div
          key={weekIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '2px',
            marginBottom: '2px',
          }}
        >
          {week.map((date) => {
            const isCurrentMonth = date.month() === month;
            const isTodayDate = isToday(date);
            const color = getDateColor(date);

            return (
              <div
                key={date.format('YYYY-MM-DD')}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.(date);
                }}
                style={{
                  textAlign: 'center',
                  fontSize: '11px',
                  padding: '2px',
                  color,
                  fontWeight: isTodayDate ? 600 : 400,
                  opacity: isCurrentMonth ? 1 : 0.3,
                  cursor: 'pointer',
                  borderRadius: '2px',
                  backgroundColor: isTodayDate ? '#e6f7ff' : 'transparent',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (isCurrentMonth) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isTodayDate ? '#e6f7ff' : 'transparent';
                }}
              >
                {date.date()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

MonthMiniCalendar.displayName = 'MonthMiniCalendar';

export default MonthMiniCalendar;
