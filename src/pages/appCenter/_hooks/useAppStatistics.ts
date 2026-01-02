/**
 * 统计数据计算 Hook
 * 根据数据列表计算今日、本周、本月新增数量
 * 注意：total 使用服务端返回的总数，时间统计基于当前页数据（近似值）
 */
import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { StatisticsData, DynamicDataItem } from '../_types';

interface UseAppStatisticsParams {
  dataList: DynamicDataItem[];
  serverTotal: number; // 服务端返回的总数
}

/**
 * 根据数据列表计算统计数据
 * @param params.dataList 当前页数据列表
 * @param params.serverTotal 服务端返回的数据总数
 * @returns 统计结果
 */
function useAppStatistics({ dataList, serverTotal }: UseAppStatisticsParams): StatisticsData {
  return useMemo(() => {
    const now = dayjs();
    const todayStart = now.startOf('day');
    const weekStart = now.startOf('week');
    const monthStart = now.startOf('month');

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    // 基于当前页数据计算时间统计（近似值）
    if (dataList && dataList.length > 0) {
      dataList.forEach((item) => {
        if (!item.creationTime) return;

        const creationTime = dayjs(item.creationTime);

        if (creationTime.isAfter(todayStart)) {
          todayCount++;
        }
        if (creationTime.isAfter(weekStart)) {
          weekCount++;
        }
        if (creationTime.isAfter(monthStart)) {
          monthCount++;
        }
      });
    }

    return {
      total: serverTotal, // 使用服务端总数
      todayCount,
      weekCount,
      monthCount,
    };
  }, [dataList, serverTotal]);
}

export default useAppStatistics;
