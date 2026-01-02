/**
 * 统计工具函数
 */

import type { CalendarDateData, CalendarStatistics } from '../types';

/**
 * 计算日历统计数据
 */
export const calculateStatistics = (dataSource: CalendarDateData[]): CalendarStatistics => {
  const workdays = dataSource.filter((d) => d.isWorkday).length;
  const holidays = dataSource.filter((d) => d.isHoliday).length;
  const manualAdjusted = dataSource.filter((d) => d.isManuallySet).length;
  const totalWorkHours = dataSource.reduce((sum, d) => sum + (d.workHours || 0), 0);
  const totalPlannedHours = dataSource.reduce((sum, d) => sum + (d.plannedHours || 0), 0);

  return {
    workdays,
    holidays,
    manualAdjusted,
    totalWorkHours,
    totalPlannedHours,
  };
};

/**
 * 创建日期数据映射
 */
export const createDateMap = (dataSource: CalendarDateData[]): Map<string, CalendarDateData> => {
  const map = new Map<string, CalendarDateData>();

  dataSource.forEach((data) => {
    if (data.date) {
      const key = typeof data.date === 'string'
        ? data.date.split('T')[0]
        : data.date.toISOString().split('T')[0];
      map.set(key, data);
    }
  });

  return map;
};

/**
 * 获取日期数据
 */
export const getDateData = (
  dateMap: Map<string, CalendarDateData>,
  dateKey: string
): CalendarDateData | undefined => {
  return dateMap.get(dateKey);
};

/**
 * 格式化工时显示
 */
export const formatWorkHours = (hours?: number): string => {
  if (hours === undefined || hours === null) return '';
  return `${hours}h`;
};

/**
 * 计算工时完成率
 */
export const calculateWorkHoursRate = (actual?: number, planned?: number): number => {
  if (!planned || planned === 0) return 0;
  if (!actual) return 0;
  return Math.round((actual / planned) * 100);
};

/**
 * 获取日期状态标签
 */
export const getDateStatusLabel = (data?: CalendarDateData): string => {
  if (!data) return '';
  if (data.isHoliday) return data.holidayName || '假期';
  if (data.isWorkday) return '工作日';
  return '';
};

/**
 * 获取日期状态颜色
 */
export const getDateStatusColor = (data?: CalendarDateData): string => {
  if (!data) return '';
  if (data.isHoliday) return 'error';
  if (data.isWorkday) return 'success';
  return 'default';
};

/**
 * 判断是否有备注
 */
export const hasRemark = (data?: CalendarDateData): boolean => {
  return !!(data?.remark && data.remark.trim().length > 0);
};

/**
 * 判断是否超过计划工时
 */
export const isOverPlanned = (data?: CalendarDateData): boolean => {
  if (!data?.plannedHours || !data?.workHours) return false;
  return data.workHours > data.plannedHours;
};

/**
 * 判断是否完成计划工时
 */
export const isPlannedCompleted = (data?: CalendarDateData): boolean => {
  if (!data?.plannedHours || !data?.workHours) return false;
  return data.workHours >= data.plannedHours;
};
