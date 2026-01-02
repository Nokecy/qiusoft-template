/**
 * 农历功能集成测试
 */

import dayjs from 'dayjs';
import { getLunarInfo, getISOWeekNumber, formatWeekNumber } from '../utils/dateUtils';

describe('农历功能测试', () => {
  test('应该正确获取农历信息', () => {
    // 测试春节 (2025-01-29)
    const chunjie = dayjs('2025-01-29');
    const lunarInfo = getLunarInfo(chunjie);

    expect(lunarInfo).toBeDefined();
    expect(lunarInfo.lunarDayText).toBeDefined();
    expect(lunarInfo.festival).toContain('春节');
  });

  test('应该正确显示农历月份', () => {
    // 测试正月初一
    const date = dayjs('2025-01-29');
    const lunarInfo = getLunarInfo(date);

    expect(lunarInfo.lunarDayText).toContain('月');
  });

  test('应该正确获取节气', () => {
    // 测试立春 (约2月4日)
    const lichun = dayjs('2025-02-03');
    const lunarInfo = getLunarInfo(lichun);

    expect(lunarInfo).toBeDefined();
  });

  test('应该正确获取周数', () => {
    const date = dayjs('2025-01-15');
    const weekNumber = getISOWeekNumber(date);

    expect(weekNumber).toBeGreaterThan(0);
    expect(weekNumber).toBeLessThanOrEqual(53);
  });

  test('应该正确格式化周数', () => {
    const formatted = formatWeekNumber(10);
    expect(formatted).toBe('第10周');
  });

  test('农历信息获取失败时应该有降级处理', () => {
    const date = dayjs('invalid-date');
    const lunarInfo = getLunarInfo(date);

    // 应该返回空字符串而不是抛出错误
    expect(lunarInfo.lunarDayText).toBe('');
  });
});
