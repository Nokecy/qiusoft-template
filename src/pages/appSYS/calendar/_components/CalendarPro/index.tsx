/**
 * CalendarPro - 入口文件
 */

import CalendarPro from './CalendarPro';

// 导出类型
export type {
  CalendarProProps,
  CalendarDateData,
  ViewMode,
  CalendarStatistics,
  HeaderRenderParams,
  CellRenderParams,
  DateClickEvent,
  LoadDataFn,
  CellRenderFn,
  HeaderRenderFn,
  FooterRenderFn,
  OnSelectFn,
  OnDateClickFn,
  OnViewModeChangeFn,
  OnMonthChangeFn,
} from './types';

// 导出Context和Hooks
export { CalendarProvider, useCalendarContext } from './context/CalendarContext';
export { useCalendarData } from './hooks';

// 导出工具函数
export * from './utils/dateUtils';
export * from './utils/statisticsUtils';

// 默认导出组件
export default CalendarPro;
