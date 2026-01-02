/**
 * CalendarPro 组件类型定义
 * 企业级日历组件的完整类型系统
 */

import type { Dayjs } from 'dayjs';
import type { CSSProperties, ReactNode } from 'react';

/**
 * 日历日期数据结构
 */
export interface CalendarDateData {
  /** 日期 */
  date: string | Date;
  /** 是否工作日 */
  isWorkday?: boolean;
  /** 是否假期 */
  isHoliday?: boolean;
  /** 假期名称 */
  holidayName?: string;
  /** 是否手动调整 */
  isManuallySet?: boolean;
  /** 工作时长 */
  workHours?: number;
  /** 计划时长 */
  plannedHours?: number;
  /** 备注 */
  remark?: string;
  /** 扩展元数据 */
  metadata?: Record<string, any>;
}

/**
 * 视图模式
 */
export type ViewMode = 'month' | 'year' | 'week' | 'list';

/**
 * 统计数据
 */
export interface CalendarStatistics {
  /** 工作日数量 */
  workdays: number;
  /** 假期数量 */
  holidays: number;
  /** 手动调整数量 */
  manualAdjusted: number;
  /** 总工时 */
  totalWorkHours: number;
  /** 计划总工时 */
  totalPlannedHours?: number;
}

/**
 * 头部渲染参数
 */
export interface HeaderRenderParams {
  /** 当前日期 */
  value: Dayjs;
  /** 视图模式 */
  viewMode: ViewMode;
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

/**
 * 日期单元格渲染参数
 */
export interface CellRenderParams {
  /** 日期 */
  date: Dayjs;
  /** 日期数据 */
  data?: CalendarDateData;
  /** 是否当前月 */
  isCurrentMonth: boolean;
  /** 是否今天 */
  isToday: boolean;
  /** 是否选中 */
  isSelected: boolean;
}

/**
 * 日期点击事件参数
 */
export interface DateClickEvent {
  /** 日期 */
  date: Dayjs;
  /** 日期数据 */
  data?: CalendarDateData;
  /** 原生事件 */
  event: React.MouseEvent;
}

/**
 * 数据加载函数
 */
export type LoadDataFn = (startDate: Dayjs, endDate: Dayjs) => Promise<CalendarDateData[]>;

/**
 * 单元格渲染函数
 */
export type CellRenderFn = (params: CellRenderParams) => ReactNode;

/**
 * 头部渲染函数
 */
export type HeaderRenderFn = (params: HeaderRenderParams) => ReactNode;

/**
 * 底部渲染函数
 */
export type FooterRenderFn = (statistics: CalendarStatistics) => ReactNode;

/**
 * 日期选择回调
 */
export type OnSelectFn = (date: Dayjs, data?: CalendarDateData) => void;

/**
 * 日期点击回调
 */
export type OnDateClickFn = (params: DateClickEvent) => void;

/**
 * 视图模式改变回调
 */
export type OnViewModeChangeFn = (mode: ViewMode) => void;

/**
 * 月份改变回调
 */
export type OnMonthChangeFn = (date: Dayjs) => void;

/**
 * CalendarPro 组件 Props
 */
export interface CalendarProProps {
  // ==================== 数据相关 ====================
  /** 受控:当前选中日期 */
  value?: Dayjs;
  /** 非受控:默认选中日期 */
  defaultValue?: Dayjs;
  /** 日期数据源 */
  dataSource?: CalendarDateData[];
  /** 数据加载函数 */
  onLoad?: LoadDataFn;

  // ==================== 视图控制 ====================
  /** 受控:视图模式 */
  viewMode?: ViewMode;
  /** 非受控:默认视图模式 */
  defaultViewMode?: ViewMode;
  /** 视图模式改变回调 */
  onViewModeChange?: OnViewModeChangeFn;

  // ==================== 渲染定制 ====================
  /** 自定义单元格渲染 */
  cellRender?: CellRenderFn;
  /** 自定义头部渲染 */
  headerRender?: HeaderRenderFn;
  /** 自定义底部渲染 */
  footerRender?: FooterRenderFn;

  // ==================== 事件回调 ====================
  /** 日期选择回调 */
  onSelect?: OnSelectFn;
  /** 日期点击回调 */
  onDateClick?: OnDateClickFn;
  /** 月份改变回调 */
  onMonthChange?: OnMonthChangeFn;

  // ==================== 功能开关 ====================
  /** 显示统计信息 */
  showStatistics?: boolean;
  /** 显示工具栏 */
  showToolbar?: boolean;
  /** 显示"今天"按钮 */
  showToday?: boolean;
  /** 启用日期选择 */
  enableSelection?: boolean;
  /** 显示视图切换 */
  showViewSwitch?: boolean;

  // ==================== 样式定制 ====================
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 主题模式 */
  theme?: 'light' | 'dark';

  // ==================== 其他配置 ====================
  /** 加载状态 */
  loading?: boolean;
  /** 语言 */
  locale?: string;
  /** 每周第一天(0-6, 0=周日) */
  firstDayOfWeek?: number;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 日历上下文状态
 */
export interface CalendarContextState {
  /** 当前日期 */
  currentDate: Dayjs;
  /** 视图模式 */
  viewMode: ViewMode;
  /** 日期数据 */
  dataSource: CalendarDateData[];
  /** 日期数据映射 */
  dateMap: Map<string, CalendarDateData>;
  /** 统计数据 */
  statistics: CalendarStatistics;
  /** 加载状态 */
  loading: boolean;
  /** 选中日期 */
  selectedDate?: Dayjs;
}

/**
 * 日历上下文操作
 */
export interface CalendarContextActions {
  /** 设置当前日期 */
  setCurrentDate: (date: Dayjs) => void;
  /** 设置视图模式 */
  setViewMode: (mode: ViewMode) => void;
  /** 设置数据源 */
  setDataSource: (data: CalendarDateData[]) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 设置选中日期 */
  setSelectedDate: (date?: Dayjs) => void;
  /** 跳转到今天 */
  goToday: () => void;
  /** 上一个周期 */
  goPrev: () => void;
  /** 下一个周期 */
  goNext: () => void;
  /** 刷新数据 */
  refresh: () => void;
}

/**
 * 日历上下文
 */
export interface CalendarContextValue extends CalendarContextState, CalendarContextActions {}
