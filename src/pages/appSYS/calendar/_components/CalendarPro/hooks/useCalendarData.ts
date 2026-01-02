/**
 * useCalendarData - 日历数据管理Hook
 */

import { useEffect, useCallback } from 'react';
import type { Dayjs } from 'dayjs';
import type { CalendarDateData, LoadDataFn, ViewMode } from '../types';
import { getMonthRange, getWeekRange } from '../utils/dateUtils';
import { useCalendarContext } from '../context/CalendarContext';

export interface UseCalendarDataOptions {
  /** 数据加载函数 */
  onLoad?: LoadDataFn;
  /** 外部数据源 */
  dataSource?: CalendarDateData[];
  /** 当前日期 */
  currentDate?: Dayjs;
  /** 视图模式 */
  viewMode?: ViewMode;
}

/**
 * 日历数据管理Hook
 */
export const useCalendarData = (options: UseCalendarDataOptions) => {
  const { onLoad, dataSource: externalDataSource, currentDate, viewMode } = options;
  const { setDataSource, setLoading } = useCalendarContext();

  // 加载数据
  const loadData = useCallback(
    async (date: Dayjs, mode: ViewMode) => {
      if (!onLoad) return;

      setLoading(true);
      try {
        let startDate: Dayjs;
        let endDate: Dayjs;

        // 根据视图模式计算日期范围
        switch (mode) {
          case 'month':
            [startDate, endDate] = getMonthRange(date);
            break;
          case 'week':
            [startDate, endDate] = getWeekRange(date);
            break;
          default:
            [startDate, endDate] = getMonthRange(date);
        }

        const data = await onLoad(startDate, endDate);
        setDataSource(data || []);
      } catch (error) {
        console.error('加载日历数据失败:', error);
        setDataSource([]);
      } finally {
        setLoading(false);
      }
    },
    [onLoad, setDataSource, setLoading]
  );

  // 当外部数据源变化时更新
  useEffect(() => {
    if (externalDataSource) {
      setDataSource(externalDataSource);
    }
  }, [externalDataSource, setDataSource]);

  // 当日期或视图模式变化时加载数据
  useEffect(() => {
    if (currentDate && viewMode && onLoad) {
      loadData(currentDate, viewMode);
    }
  }, [currentDate, viewMode, loadData, onLoad]);

  return {
    loadData,
  };
};
