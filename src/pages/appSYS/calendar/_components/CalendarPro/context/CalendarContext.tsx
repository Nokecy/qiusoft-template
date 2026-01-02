/**
 * Calendar Context - 日历状态管理
 */

import React, { createContext, useContext, useMemo, useCallback, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type {
  CalendarContextValue,
  CalendarDateData,
  ViewMode,
  CalendarStatistics,
} from '../types';
import { calculateStatistics, createDateMap } from '../utils/statisticsUtils';

const CalendarContext = createContext<CalendarContextValue | null>(null);

export interface CalendarProviderProps {
  children: React.ReactNode;
  initialDate?: Dayjs;
  initialViewMode?: ViewMode;
  initialDataSource?: CalendarDateData[];
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  initialDate = dayjs(),
  initialViewMode = 'month',
  initialDataSource = [],
}) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(initialDate);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [dataSource, setDataSource] = useState<CalendarDateData[]>(initialDataSource);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>();

  // 计算日期映射
  const dateMap = useMemo(() => createDateMap(dataSource), [dataSource]);

  // 计算统计数据
  const statistics = useMemo(() => calculateStatistics(dataSource), [dataSource]);

  // 跳转到今天
  const goToday = useCallback(() => {
    setCurrentDate(dayjs());
    setSelectedDate(dayjs());
  }, []);

  // 上一个周期
  const goPrev = useCallback(() => {
    setCurrentDate((prev) => {
      switch (viewMode) {
        case 'month':
          return prev.subtract(1, 'month');
        case 'year':
          return prev.subtract(1, 'year');
        case 'week':
          return prev.subtract(1, 'week');
        default:
          return prev;
      }
    });
  }, [viewMode]);

  // 下一个周期
  const goNext = useCallback(() => {
    setCurrentDate((prev) => {
      switch (viewMode) {
        case 'month':
          return prev.add(1, 'month');
        case 'year':
          return prev.add(1, 'year');
        case 'week':
          return prev.add(1, 'week');
        default:
          return prev;
      }
    });
  }, [viewMode]);

  // 刷新数据
  const refresh = useCallback(() => {
    // 触发数据重新加载的逻辑由外部通过 onLoad 处理
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  }, []);

  const value = useMemo<CalendarContextValue>(
    () => ({
      // 状态
      currentDate,
      viewMode,
      dataSource,
      dateMap,
      statistics,
      loading,
      selectedDate,
      // 操作
      setCurrentDate,
      setViewMode,
      setDataSource,
      setLoading,
      setSelectedDate,
      goToday,
      goPrev,
      goNext,
      refresh,
    }),
    [
      currentDate,
      viewMode,
      dataSource,
      dateMap,
      statistics,
      loading,
      selectedDate,
      goToday,
      goPrev,
      goNext,
      refresh,
    ]
  );

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

/**
 * 使用日历上下文
 */
export const useCalendarContext = (): CalendarContextValue => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within CalendarProvider');
  }
  return context;
};
