/**
 * 日期工具函数
 */

import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

/**
 * 获取月份的日期范围
 */
export const getMonthRange = (date: Dayjs): [Dayjs, Dayjs] => {
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');
  return [startOfMonth, endOfMonth];
};

/**
 * 获取周的日期范围
 */
export const getWeekRange = (date: Dayjs, firstDayOfWeek: number = 0): [Dayjs, Dayjs] => {
  const dayOfWeek = date.day();
  const diff = (dayOfWeek - firstDayOfWeek + 7) % 7;
  const startOfWeek = date.subtract(diff, 'day').startOf('day');
  const endOfWeek = startOfWeek.add(6, 'day').endOf('day');
  return [startOfWeek, endOfWeek];
};

/**
 * 获取日历网格的日期范围(包含前后月份填充)
 */
export const getCalendarGridRange = (date: Dayjs, firstDayOfWeek: number = 0): [Dayjs, Dayjs] => {
  const [startOfMonth] = getMonthRange(date);
  const dayOfWeek = startOfMonth.day();
  const diff = (dayOfWeek - firstDayOfWeek + 7) % 7;

  const gridStart = startOfMonth.subtract(diff, 'day').startOf('day');
  const gridEnd = gridStart.add(41, 'day').endOf('day'); // 6周 = 42天

  return [gridStart, gridEnd];
};

/**
 * 生成日期数组
 */
export const generateDateArray = (start: Dayjs, end: Dayjs): Dayjs[] => {
  const dates: Dayjs[] = [];
  let current = start.startOf('day');

  while (current.isSameOrBefore(end, 'day')) {
    dates.push(current);
    current = current.add(1, 'day');
  }

  return dates;
};

/**
 * 格式化日期为键值(YYYY-MM-DD)
 */
export const formatDateKey = (date: Dayjs | string | Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};

/**
 * 判断是否为同一天
 */
export const isSameDay = (date1: Dayjs, date2: Dayjs): boolean => {
  return date1.format('YYYY-MM-DD') === date2.format('YYYY-MM-DD');
};

/**
 * 判断是否为今天
 */
export const isToday = (date: Dayjs): boolean => {
  return isSameDay(date, dayjs());
};

/**
 * 判断是否为当前月
 */
export const isCurrentMonth = (date: Dayjs, currentDate: Dayjs): boolean => {
  return date.month() === currentDate.month() && date.year() === currentDate.year();
};

/**
 * 判断是否为周末
 */
export const isWeekend = (date: Dayjs): boolean => {
  const day = date.day();
  return day === 0 || day === 6; // 0=周日, 6=周六
};

/**
 * 获取周数数组
 */
export const getWeeksInMonth = (date: Dayjs, firstDayOfWeek: number = 0): Dayjs[][] => {
  const [gridStart, gridEnd] = getCalendarGridRange(date, firstDayOfWeek);
  const allDates = generateDateArray(gridStart, gridEnd);

  const weeks: Dayjs[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }

  return weeks;
};

/**
 * 格式化月份标题
 */
export const formatMonthTitle = (date: Dayjs): string => {
  return `${date.year()}年${date.month() + 1}月`;
};

/**
 * 格式化周标题
 */
export const formatWeekTitle = (date: Dayjs): string => {
  const [start, end] = getWeekRange(date);
  if (start.month() === end.month()) {
    return `${start.year()}年${start.month() + 1}月第${start.week()}周`;
  }
  return `${start.format('YYYY-MM-DD')} ~ ${end.format('YYYY-MM-DD')}`;
};

/**
 * 获取星期名称
 */
export const getWeekdayNames = (firstDayOfWeek: number = 0, locale: string = 'zh-cn'): string[] => {
  const names = ['日', '一', '二', '三', '四', '五', '六'];
  const rotated = [...names.slice(firstDayOfWeek), ...names.slice(0, firstDayOfWeek)];
  return rotated.map(name => `周${name}`);
};

/**
 * 获取农历信息
 */
export interface LunarInfo {
  /** 农历日期文本 */
  lunarDayText: string;
  /** 节日名称(如果是节日) */
  festival?: string;
  /** 节气名称(如果是节气) */
  solarTerm?: string;
}

/**
 * 获取农历日期信息
 */
export const getLunarInfo = (date: Dayjs): LunarInfo => {
  try {
    // 动态导入 lunar-javascript
    const { Solar } = require('lunar-javascript');
    const solar = Solar.fromDate(date.toDate());
    const lunar = solar.getLunar();

    // 获取节日(优先级: 农历节日 > 公历节日)
    const lunarFestivals = lunar.getFestivals();
    const solarFestivals = solar.getFestivals();
    const lunarFestival = lunarFestivals.length > 0 ? lunarFestivals[0] : undefined;
    const solarFestival = solarFestivals.length > 0 ? solarFestivals[0] : undefined;

    // 获取节气 - 使用 getJieQi() 方法
    const jieQi = lunar.getJieQi();
    const solarTerm = jieQi || undefined;

    // 获取农历日期文本 - 始终显示"月份+日期"格式
    const monthText = lunar.getMonthInChinese() + '月';
    const dayText = lunar.getDayInChinese();
    const lunarDayText = monthText + dayText;

    return {
      lunarDayText,
      festival: lunarFestival || solarFestival || undefined,
      solarTerm,
    };
  } catch (error) {
    console.error('获取农历信息失败:', error);
    return {
      lunarDayText: '',
    };
  }
};

/**
 * 获取 ISO 周数(年度第几周)
 */
export const getISOWeekNumber = (date: Dayjs): number => {
  return date.isoWeek();
};

/**
 * 格式化周数显示
 */
export const formatWeekNumber = (weekNumber: number): string => {
  return `第${weekNumber}周`;
};
