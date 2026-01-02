/**
 * CalendarPro - 企业级日历组件
 */

import React, { memo, useEffect, useMemo } from 'react';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import type { CalendarProProps } from './types';
import { CalendarProvider, useCalendarContext } from './context/CalendarContext';
import { useCalendarData } from './hooks';
import { CalendarHeader, CalendarFooter, MonthView, YearView } from './components';

/**
 * 内部组件 - 使用Context的实际渲染组件
 */
const CalendarProInner: React.FC<CalendarProProps> = memo((props) => {
  const {
    value,
    viewMode,
    dataSource,
    onLoad,
    cellRender,
    headerRender,
    footerRender,
    onSelect,
    onDateClick,
    onViewModeChange,
    onMonthChange,
    showStatistics = true,
    showToolbar = true,
    showToday = true,
    showViewSwitch = true,
    enableSelection = true,
    className,
    style,
    loading: externalLoading,
    disabled = false,
    firstDayOfWeek = 0,
  } = props;

  const context = useCalendarContext();
  const {
    currentDate,
    viewMode: contextViewMode,
    statistics,
    loading: contextLoading,
    setCurrentDate,
    setViewMode,
    goToday,
    goPrev,
    goNext,
  } = context;

  // 数据管理
  useCalendarData({
    onLoad,
    dataSource,
    currentDate,
    viewMode: contextViewMode,
  });

  // 受控模式:同步外部 value
  useEffect(() => {
    if (value && !value.isSame(currentDate, 'day')) {
      setCurrentDate(value);
    }
  }, [value, currentDate, setCurrentDate]);

  // 受控模式:同步外部 viewMode
  useEffect(() => {
    if (viewMode && viewMode !== contextViewMode) {
      setViewMode(viewMode);
    }
  }, [viewMode, contextViewMode, setViewMode]);

  // 月份变化回调
  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(currentDate);
    }
  }, [currentDate, onMonthChange]);

  // 视图模式变化回调
  const handleViewModeChange = (mode: typeof contextViewMode) => {
    setViewMode(mode);
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  // 日期变化回调
  const handleDateChange = (date: dayjs.Dayjs) => {
    setCurrentDate(date);
  };

  // 加载状态
  const loading = externalLoading !== undefined ? externalLoading : contextLoading;

  // 渲染视图
  const renderView = () => {
    switch (contextViewMode) {
      case 'month':
        return (
          <MonthView
            firstDayOfWeek={firstDayOfWeek}
            cellRender={cellRender}
            onSelect={onSelect}
            onDateClick={onDateClick}
            disabled={disabled}
          />
        );
      case 'year':
        return (
          <YearView
            onSelect={onSelect}
            onDateClick={onDateClick}
            disabled={disabled}
          />
        );
      default:
        // 默认显示月视图
        return (
          <MonthView
            firstDayOfWeek={firstDayOfWeek}
            cellRender={cellRender}
            onSelect={onSelect}
            onDateClick={onDateClick}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div
      className={`calendar-pro ${className || ''}`}
      style={style}
    >
      <Spin spinning={loading}>
        {/* 头部 */}
        {showToolbar && (
          <CalendarHeader
            value={currentDate}
            viewMode={contextViewMode}
            showViewSwitch={showViewSwitch}
            showToday={showToday}
            headerRender={headerRender}
            onChange={handleDateChange}
            onViewModeChange={handleViewModeChange}
            goToday={goToday}
            goPrev={goPrev}
            goNext={goNext}
          />
        )}

        {/* 视图主体 */}
        <div style={{ marginTop: showToolbar ? 16 : 0 }}>
          {renderView()}
        </div>

        {/* 底部统计 */}
        {showStatistics && (
          <CalendarFooter
            statistics={statistics}
            footerRender={footerRender}
          />
        )}
      </Spin>
    </div>
  );
});

CalendarProInner.displayName = 'CalendarProInner';

/**
 * CalendarPro - 主组件(带Provider)
 */
const CalendarPro: React.FC<CalendarProProps> = memo((props) => {
  const { defaultValue, defaultViewMode, dataSource } = props;

  const initialDate = useMemo(() => defaultValue || dayjs(), [defaultValue]);
  const initialViewMode = useMemo(() => defaultViewMode || 'month', [defaultViewMode]);
  const initialDataSource = useMemo(() => dataSource || [], [dataSource]);

  return (
    <CalendarProvider
      initialDate={initialDate}
      initialViewMode={initialViewMode}
      initialDataSource={initialDataSource}
    >
      <CalendarProInner {...props} />
    </CalendarProvider>
  );
});

CalendarPro.displayName = 'CalendarPro';

export default CalendarPro;
