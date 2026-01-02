/**
 * MonthView - 月视图组件
 */

import React, { memo, useMemo, useCallback } from 'react';
import { Badge, Tag, Tooltip, Space } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import type { CalendarDateData, CellRenderFn, OnSelectFn, OnDateClickFn } from '../types';
import { useCalendarContext } from '../context/CalendarContext';
import {
  getWeeksInMonth,
  getWeekdayNames,
  formatDateKey,
  isToday as checkIsToday,
  isCurrentMonth as checkIsCurrentMonth,
  isSameDay,
  getLunarInfo,
  getISOWeekNumber,
  formatWeekNumber,
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
};

export interface MonthViewProps {
  /** 首周日(0-6) */
  firstDayOfWeek?: number;
  /** 自定义单元格渲染 */
  cellRender?: CellRenderFn;
  /** 日期选择回调 */
  onSelect?: OnSelectFn;
  /** 日期点击回调 */
  onDateClick?: OnDateClickFn;
  /** 禁用选择 */
  disabled?: boolean;
}

const MonthView: React.FC<MonthViewProps> = memo(({
  firstDayOfWeek = 0,
  cellRender,
  onSelect,
  onDateClick,
  disabled = false,
}) => {
  const { currentDate, dateMap, selectedDate, setSelectedDate } = useCalendarContext();

  // 生成周数组
  const weeks = useMemo(
    () => getWeeksInMonth(currentDate, firstDayOfWeek),
    [currentDate, firstDayOfWeek]
  );

  // 星期名称
  const weekdayNames = useMemo(
    () => getWeekdayNames(firstDayOfWeek),
    [firstDayOfWeek]
  );

  // 获取日期文字颜色
  const getDateTextColor = useCallback((
    date: Dayjs,
    data: CalendarDateData | null,
    isTodayDate: boolean
  ): string => {
    // 优先级: 今天 > 节假日 > 工作日 > 周末 > 默认
    if (isTodayDate) return TEXT_COLORS.today;
    if (data?.isHoliday) return TEXT_COLORS.holiday;
    if (data?.isWorkday) return TEXT_COLORS.workday;
    if (isWeekend(date)) return TEXT_COLORS.weekend;
    return TEXT_COLORS.default;
  }, []);

  // 处理日期点击
  const handleDateClick = useCallback(
    (date: Dayjs, event: React.MouseEvent) => {
      if (disabled) return;

      const dateKey = formatDateKey(date);
      const data = getDateData(dateMap, dateKey);

      setSelectedDate(date);

      if (onSelect) {
        onSelect(date, data);
      }

      if (onDateClick) {
        onDateClick({ date, data, event });
      }
    },
    [disabled, dateMap, setSelectedDate, onSelect, onDateClick]
  );

  // 默认单元格渲染
  const renderDefaultCell = useCallback(
    (date: Dayjs) => {
      const dateKey = formatDateKey(date);
      const data = getDateData(dateMap, dateKey);

      if (!data) return null;

      return (
        <div style={{ minHeight: '60px', padding: '4px' }}>
          {/* 状态标签 */}
          <div style={{ marginBottom: '4px' }}>
            {data.isWorkday && (
              <Badge
                status="success"
                text={
                  <span style={{ fontSize: '12px' }}>
                    工作日 {data.workHours ? `${data.workHours}h` : ''}
                  </span>
                }
              />
            )}
            {data.isHoliday && (
              <Badge
                status="error"
                text={
                  <span style={{ fontSize: '12px' }}>
                    {data.holidayName || '假期'}
                  </span>
                }
              />
            )}
          </div>

          {/* 手动调整标签 */}
          {data.isManuallySet && (
            <Tag color="orange" style={{ fontSize: '11px', padding: '0 4px', marginBottom: '2px' }}>
              <ToolOutlined /> 手动
            </Tag>
          )}

          {/* 备注 */}
          {data.remark && (
            <Tooltip title={data.remark}>
              <div
                style={{
                  fontSize: '11px',
                  color: '#666',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {data.remark}
              </div>
            </Tooltip>
          )}
        </div>
      );
    },
    [dateMap]
  );

  // 渲染日期单元格
  const renderCell = useCallback(
    (date: Dayjs) => {
      const dateKey = formatDateKey(date);
      const data = getDateData(dateMap, dateKey);
      const isCurrentMonthDate = checkIsCurrentMonth(date, currentDate);
      const isTodayDate = checkIsToday(date);
      const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

      // 获取农历信息
      const lunarInfo = getLunarInfo(date);
      const displayText = lunarInfo.festival || lunarInfo.solarTerm || lunarInfo.lunarDayText;

      // 获取日期文字颜色
      const dateTextColor = getDateTextColor(date, data, isTodayDate);

      // 计算单元格背景色
      const bgColor = isSelected ? '#e6f7ff' : isTodayDate ? '#fff7e6' : '#fff';

      const cellContent = cellRender
        ? cellRender({
            date,
            data,
            isCurrentMonth: isCurrentMonthDate,
            isToday: isTodayDate,
            isSelected,
          })
        : renderDefaultCell(date);

      return (
        <div
          className={`
            calendar-pro-cell
            ${isCurrentMonthDate ? 'current-month' : 'other-month'}
            ${isTodayDate ? 'today' : ''}
            ${isSelected ? 'selected' : ''}
            ${disabled ? 'disabled' : ''}
          `}
          onClick={(e) => handleDateClick(date, e)}
          style={{
            position: 'relative',
            minHeight: '80px',
            padding: '8px',
            border: '1px solid #f0f0f0',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: isCurrentMonthDate ? 1 : 0.4,
            backgroundColor: bgColor,
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = bgColor;
            }
          }}
        >
          {/* 日期数字和农历 */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              right: '8px',
              textAlign: 'right',
              lineHeight: 1.2,
            }}
          >
            {/* 公历日期 - 显示月-日格式 */}
            <div
              style={{
                fontSize: '14px',
                fontWeight: isTodayDate ? 600 : 400,
                color: isCurrentMonthDate ? dateTextColor : '#999',
              }}
            >
              {date.format('M-DD')}
            </div>
            {/* 农历日期/节日 */}
            {displayText && (
              <div
                style={{
                  fontSize: '11px',
                  color: lunarInfo.festival || lunarInfo.solarTerm ? '#ff4d4f' : '#999',
                  fontWeight: lunarInfo.festival || lunarInfo.solarTerm ? 500 : 400,
                  marginTop: '2px',
                }}
              >
                {displayText}
              </div>
            )}
          </div>

          {/* 单元格内容 */}
          <div style={{ marginTop: '32px' }}>{cellContent}</div>
        </div>
      );
    },
    [
      dateMap,
      currentDate,
      selectedDate,
      cellRender,
      renderDefaultCell,
      handleDateClick,
      disabled,
      getDateTextColor,
    ]
  );

  return (
    <div className="calendar-pro-month-view">
      {/* 图例 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #f0f0f0',
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

      {/* 星期头部 */}
      <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)' }}>
        {/* 周数列头部 */}
        <div
          style={{
            padding: '8px',
            textAlign: 'center',
            fontWeight: 500,
            backgroundColor: '#fafafa',
            border: '1px solid #f0f0f0',
            fontSize: '12px',
            color: '#666',
          }}
        >
          周数
        </div>
        {/* 星期名称 */}
        {weekdayNames.map((name, index) => (
          <div
            key={index}
            style={{
              padding: '8px',
              textAlign: 'center',
              fontWeight: 500,
              backgroundColor: '#fafafa',
              border: '1px solid #f0f0f0',
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      {weeks.map((week, weekIndex) => {
        // 获取本周的第一天来计算周数
        const firstDayOfWeek = week[0];
        const weekNumber = getISOWeekNumber(firstDayOfWeek);

        return (
          <div
            key={weekIndex}
            style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)' }}
          >
            {/* 周数列 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #f0f0f0',
                fontSize: '12px',
                fontWeight: 500,
                color: '#666',
              }}
            >
              {formatWeekNumber(weekNumber)}
            </div>

            {/* 日期单元格 */}
            {week.map((date) => (
              <React.Fragment key={date.format('YYYY-MM-DD')}>
                {renderCell(date)}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
});

MonthView.displayName = 'MonthView';

export default MonthView;
