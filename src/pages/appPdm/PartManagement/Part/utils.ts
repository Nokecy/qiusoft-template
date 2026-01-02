/**
 * 物料详情页面 - 工具函数文件
 */

import dayjs from 'dayjs';
import type { LifecycleConfig, StockHealth, ChangeTypeConfig } from './types';

/**
 * 日期格式化函数
 * @param date 日期字符串
 * @param format 格式类型: 'date' | 'datetime' | 'short'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date?: string, format: 'date' | 'datetime' | 'short' = 'datetime'): string => {
  if (!date) return '-';
  const d = dayjs(date);
  if (!d.isValid()) return '-';
  switch (format) {
    case 'date':
      return d.format('YYYY-MM-DD');
    case 'short':
      return d.format('MM-DD HH:mm');
    case 'datetime':
    default:
      return d.format('YYYY-MM-DD HH:mm');
  }
};

/**
 * 获取生命周期状态配置
 * @param status 状态值
 * @returns 状态配置对象
 */
export const getLifecycleConfig = (status: number): LifecycleConfig => {
  const statusMap: Record<number, LifecycleConfig> = {
    0: { label: '草稿', color: 'default' },
    10: { label: '审批中', color: 'processing' },
    20: { label: '已发布', color: 'success' },
    30: { label: '已拒绝', color: 'error' },
    40: { label: '已作废', color: 'default' },
    50: { label: '已取消', color: 'warning' },
  };
  return statusMap[status] || { label: '未知', color: 'default' };
};

/**
 * 获取文档用途文本
 * @param usage 用途值
 * @returns 用途文本
 */
export const getDocumentUsageText = (usage?: number): string => {
  const usageMap: Record<number, string> = {
    10: '2D设计图纸',
    20: '3D设计模型',
    30: '作业指导书',
    40: '检验计划',
    50: '认证证书',
    60: '安全数据表',
    70: '包装规范',
    80: '供应商文档',
    90: '技术规范',
    999: '其他',
  };
  return usage !== undefined ? usageMap[usage] || '其他' : '其他';
};

/**
 * 计算库存健康度
 * @param available 可用库存
 * @param safety 安全库存
 * @returns 库存健康度对象
 */
export const getStockHealth = (available: number, safety: number): StockHealth => {
  if (safety === 0) return { percent: 100, status: 'success' as const };
  const ratio = (available / safety) * 100;
  if (ratio >= 100) return { percent: Math.min(ratio, 150), status: 'success' as const };
  if (ratio >= 50) return { percent: ratio, status: 'normal' as const };
  return { percent: ratio, status: 'exception' as const };
};

/**
 * 获取变更类型配置
 * @param changeType 变更类型值
 * @returns 变更类型配置对象
 */
export const getChangeTypeConfig = (changeType?: number): ChangeTypeConfig => {
  const changeTypeMap: Record<number, ChangeTypeConfig> = {
    10: { label: '新增', color: 'blue' },
    20: { label: '修改', color: 'orange' },
    30: { label: '作废', color: 'red' },
    40: { label: '恢复', color: 'green' },
  };
  return changeTypeMap[changeType || 10] || { label: '未知', color: 'default' };
};

/**
 * 计算总库存统计
 * @param inventoryData 库存数据数组
 * @returns 统计对象
 */
export const calculateInventoryStats = (inventoryData: any[]) => {
  const total = inventoryData.reduce((sum, item) => sum + item.availableQty, 0);
  const inTransit = inventoryData.reduce((sum, item) => sum + item.inTransitQty, 0);
  const locked = inventoryData.reduce((sum, item) => sum + (item.lockedQty || 0), 0);
  const safetyTotal = inventoryData.reduce((sum, item) => sum + item.safetyStock, 0);
  return {
    total,
    inTransit,
    locked,
    available: total - locked,
    safetyTotal,
    healthPercent: safetyTotal > 0 ? Math.round((total / safetyTotal) * 100) : 100,
  };
};

/**
 * 计算质量统计
 * @param qualityData 质量数据数组
 * @returns 统计对象
 */
export const calculateQualityStats = (qualityData: any[]) => {
  const passCount = qualityData.filter((item) => item.inspectionResult === '合格').length;
  return {
    passCount,
    failCount: qualityData.length - passCount,
    totalCount: qualityData.length,
    passRate: qualityData.length > 0 ? Math.round((passCount / qualityData.length) * 100) : 0,
  };
};
