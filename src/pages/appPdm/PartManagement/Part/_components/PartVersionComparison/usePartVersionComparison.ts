import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  PartVersionComparisonCompareVersionsAsync,
  PartVersionComparisonCompareWithCurrentDraftAsync,
  PartVersionComparisonGenerateReportAsync,
} from '@/services/pdm/PartVersionComparison';
import type {
  BurnAbpPdmPartManagementPartVersionsComparisonPartVersionComparisonResultDto,
  BurnAbpPdmPartManagementPartVersionsComparisonComparisonReportFormat,
} from '@/services/pdm/typings';

// 差异类型枚举
export const DifferenceType = {
  Unchanged: 0,
  Modified: 1,
  Added: 2,
  Removed: 3,
} as const;

export type DifferenceTypeValue = (typeof DifferenceType)[keyof typeof DifferenceType];

// 差异类型配置
export const differenceTypeConfig: Record<DifferenceTypeValue, { label: string; icon: string; color: string; bg: string }> = {
  [DifferenceType.Unchanged]: { label: '无变化', icon: '⚪', color: '#8c8c8c', bg: '#ffffff' },
  [DifferenceType.Modified]: { label: '修改', icon: '✏️', color: '#faad14', bg: '#fff9e6' },
  [DifferenceType.Added]: { label: '新增', icon: '✅', color: '#52c41a', bg: '#e6f7e6' },
  [DifferenceType.Removed]: { label: '删除', icon: '❌', color: '#ff4d4f', bg: '#fde7e7' },
};

// 报告格式枚举
export const ReportFormat = {
  Html: 0,
  Text: 1,
} as const;

export type ReportFormatValue = (typeof ReportFormat)[keyof typeof ReportFormat];

interface UsePartVersionComparisonOptions {
  partId: number;
}

interface UsePartVersionComparisonReturn {
  // 状态
  loading: boolean;
  reportLoading: boolean;
  comparisonResult: BurnAbpPdmPartManagementPartVersionsComparisonPartVersionComparisonResultDto | null;

  // 方法
  compareVersions: (sourceVersion: string, targetVersion: string, includeUnchanged?: boolean) => Promise<void>;
  compareWithDraft: (historicalVersion: string, includeUnchanged?: boolean) => Promise<void>;
  generateReport: (sourceVersion: string, targetVersion: string, format?: ReportFormatValue, includeUnchanged?: boolean) => Promise<void>;
  clearResult: () => void;
}

export function usePartVersionComparison({ partId }: UsePartVersionComparisonOptions): UsePartVersionComparisonReturn {
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [comparisonResult, setComparisonResult] =
    useState<BurnAbpPdmPartManagementPartVersionsComparisonPartVersionComparisonResultDto | null>(null);

  // 对比两个历史版本
  const compareVersions = useCallback(
    async (sourceVersion: string, targetVersion: string, includeUnchanged = false) => {
      if (!partId) {
        message.warning('请先选择物料');
        return;
      }
      if (!sourceVersion || !targetVersion) {
        message.warning('请选择源版本和目标版本');
        return;
      }
      if (sourceVersion === targetVersion) {
        message.warning('源版本和目标版本不能相同');
        return;
      }

      setLoading(true);
      try {
        const result = await PartVersionComparisonCompareVersionsAsync({
          partId,
          sourceVersion,
          targetVersion,
          includeUnchanged,
        });
        setComparisonResult(result);
        message.success('对比完成');
      } catch (error) {
        message.error('对比失败，请重试');
        console.error('版本对比失败:', error);
      } finally {
        setLoading(false);
      }
    },
    [partId]
  );

  // 对比草稿与历史版本
  const compareWithDraft = useCallback(
    async (historicalVersion: string, includeUnchanged = false) => {
      if (!partId) {
        message.warning('请先选择物料');
        return;
      }
      if (!historicalVersion) {
        message.warning('请选择历史版本');
        return;
      }

      setLoading(true);
      try {
        const result = await PartVersionComparisonCompareWithCurrentDraftAsync({
          partId,
          historicalVersion,
          includeUnchanged,
        });
        setComparisonResult(result);
        message.success('对比完成');
      } catch (error) {
        message.error('对比失败，请重试');
        console.error('草稿对比失败:', error);
      } finally {
        setLoading(false);
      }
    },
    [partId]
  );

  // 生成对比报告
  const generateReport = useCallback(
    async (
      sourceVersion: string,
      targetVersion: string,
      format: ReportFormatValue = ReportFormat.Html,
      includeUnchanged = false
    ) => {
      if (!partId) {
        message.warning('请先选择物料');
        return;
      }
      if (!sourceVersion || !targetVersion) {
        message.warning('请选择源版本和目标版本');
        return;
      }

      setReportLoading(true);
      try {
        const result = await PartVersionComparisonGenerateReportAsync({
          partId,
          sourceVersion,
          targetVersion,
          format: format as BurnAbpPdmPartManagementPartVersionsComparisonComparisonReportFormat,
          includeUnchanged,
        });

        // 根据格式下载或显示报告
        if (result.content) {
          const fileName = result.fileName || `版本对比报告_${sourceVersion}_${targetVersion}`;
          const contentType = format === ReportFormat.Html ? 'text/html' : 'text/plain';
          const extension = format === ReportFormat.Html ? '.html' : '.txt';

          // 创建 Blob 并下载
          const blob = new Blob([result.content], { type: contentType });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${fileName}${extension}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          message.success('报告已生成并下载');
        }
      } catch (error) {
        message.error('生成报告失败，请重试');
        console.error('生成报告失败:', error);
      } finally {
        setReportLoading(false);
      }
    },
    [partId]
  );

  // 清除结果
  const clearResult = useCallback(() => {
    setComparisonResult(null);
  }, []);

  return {
    loading,
    reportLoading,
    comparisonResult,
    compareVersions,
    compareWithDraft,
    generateReport,
    clearResult,
  };
}
