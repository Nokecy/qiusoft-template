import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Select, Space, Button, Checkbox, Spin, Empty, Dropdown, Typography, Tag } from 'antd';
import { SwapOutlined, FileExcelOutlined, FileTextOutlined, DownloadOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import ComparisonSummary from './ComparisonSummary';
import ComparisonTable from './ComparisonTable';
import { usePartVersionComparison, ReportFormat } from './usePartVersionComparison';

const { Text } = Typography;

// 版本历史数据类型
interface VersionHistoryItem {
  id?: string;
  version: string;
  versionDate?: string;
  effectiveDate?: string;
  isCurrent?: boolean;
  isDraft?: boolean;
  lifecycleStatus?: number;
}

interface PartVersionComparisonModalProps {
  visible: boolean;
  onClose: () => void;
  partId: number;
  partNumber: string;
  partName?: string;
  versionHistory: VersionHistoryItem[];
  currentVersion?: string;
  hasDraft?: boolean;
}

const PartVersionComparisonModal: React.FC<PartVersionComparisonModalProps> = ({
  visible,
  onClose,
  partId,
  partNumber,
  partName,
  versionHistory,
  currentVersion,
  hasDraft = false,
}) => {
  // 版本选择状态
  const [sourceVersion, setSourceVersion] = useState<string>('');
  const [targetVersion, setTargetVersion] = useState<string>('');
  const [includeUnchanged, setIncludeUnchanged] = useState(false);
  const [compareMode, setCompareMode] = useState<'versions' | 'draft'>('versions');

  // 使用对比 Hook
  const {
    loading,
    reportLoading,
    comparisonResult,
    compareVersions,
    compareWithDraft,
    generateReport,
    clearResult,
  } = usePartVersionComparison({ partId });

  // 重置状态
  useEffect(() => {
    if (!visible) {
      setSourceVersion('');
      setTargetVersion('');
      setIncludeUnchanged(false);
      setCompareMode('versions');
      clearResult();
    }
  }, [visible, clearResult]);

  // 版本选项列表（排除草稿）
  const versionOptions = useMemo(() => {
    return versionHistory
      .filter(v => !v.isDraft)
      .map(v => ({
        value: v.version,
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{v.version}</span>
            {v.isCurrent && (
              <Tag color="success" style={{ margin: 0, fontSize: 10, lineHeight: '16px', padding: '0 4px' }}>
                当前
              </Tag>
            )}
            {v.effectiveDate && (
              <Text type="secondary" style={{ fontSize: 11 }}>
                {v.effectiveDate.split('T')[0]}
              </Text>
            )}
          </span>
        ),
      }));
  }, [versionHistory]);

  // 执行对比
  const handleCompare = async () => {
    if (compareMode === 'draft') {
      await compareWithDraft(sourceVersion, includeUnchanged);
    } else {
      await compareVersions(sourceVersion, targetVersion, includeUnchanged);
    }
  };

  // 导出报告菜单
  const exportMenuItems: MenuProps['items'] = [
    {
      key: 'html',
      icon: <FileExcelOutlined />,
      label: '导出 HTML 报告',
      onClick: () => generateReport(sourceVersion, targetVersion, ReportFormat.Html, includeUnchanged),
    },
    {
      key: 'text',
      icon: <FileTextOutlined />,
      label: '导出文本报告',
      onClick: () => generateReport(sourceVersion, targetVersion, ReportFormat.Text, includeUnchanged),
    },
  ];

  // 判断是否可以对比
  const canCompare = compareMode === 'draft'
    ? !!sourceVersion
    : !!sourceVersion && !!targetVersion && sourceVersion !== targetVersion;

  // 判断是否可以导出
  const canExport = comparisonResult && sourceVersion && targetVersion;

  return (
    <Modal
      title={
        <Space>
          <SwapOutlined style={{ color: '#1890ff' }} />
          <span>物料版本对比</span>
          <Text type="secondary">-</Text>
          <Tag color="blue">{partNumber}</Tag>
          {partName && <Text type="secondary">{partName}</Text>}
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={null}
      destroyOnClose
    >
      {/* 对比模式选择和版本选择器 */}
      <div style={{ marginBottom: 16 }}>
        {/* 对比模式 */}
        {hasDraft && (
          <div style={{ marginBottom: 12 }}>
            <Space>
              <Text type="secondary">对比模式:</Text>
              <Select
                value={compareMode}
                onChange={value => {
                  setCompareMode(value);
                  setSourceVersion('');
                  setTargetVersion('');
                  clearResult();
                }}
                style={{ width: 180 }}
                size="small"
                options={[
                  { value: 'versions', label: '历史版本对比' },
                  { value: 'draft', label: '草稿与历史版本对比' },
                ]}
              />
            </Space>
          </div>
        )}

        {/* 版本选择器 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Space>
            <Text type="secondary">源版本:</Text>
            <Select
              value={sourceVersion}
              onChange={setSourceVersion}
              placeholder="选择源版本"
              style={{ width: 180 }}
              options={versionOptions}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option?.value || '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Space>

          <ArrowRightOutlined style={{ color: '#1890ff' }} />

          {compareMode === 'draft' ? (
            <Space>
              <Text type="secondary">目标版本:</Text>
              <Tag color="orange">当前草稿</Tag>
            </Space>
          ) : (
            <Space>
              <Text type="secondary">目标版本:</Text>
              <Select
                value={targetVersion}
                onChange={setTargetVersion}
                placeholder="选择目标版本"
                style={{ width: 180 }}
                options={versionOptions}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option?.value || '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Space>
          )}

          <Checkbox
            checked={includeUnchanged}
            onChange={e => setIncludeUnchanged(e.target.checked)}
          >
            包含无变化字段
          </Checkbox>

          <Button
            type="primary"
            icon={<SwapOutlined />}
            loading={loading}
            disabled={!canCompare}
            onClick={handleCompare}
          >
            开始对比
          </Button>

          {canExport && (
            <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight">
              <Button icon={<DownloadOutlined />} loading={reportLoading}>
                导出报告
              </Button>
            </Dropdown>
          )}
        </div>
      </div>

      {/* 对比结果 */}
      <Spin spinning={loading}>
        {comparisonResult ? (
          <>
            {/* 统计摘要 */}
            <ComparisonSummary
              statistics={comparisonResult.statistics}
              sourceVersion={comparisonResult.sourceVersion?.version}
              targetVersion={comparisonResult.targetVersion?.version || (compareMode === 'draft' ? '草稿' : undefined)}
              includeUnchanged={includeUnchanged}
            />

            {/* 差异详情表格 */}
            <div style={{ maxHeight: 'calc(100vh - 450px)', minHeight: 300, overflow: 'auto' }}>
              <ComparisonTable
                fieldChanges={comparisonResult.fieldChanges}
                sourceVersion={comparisonResult.sourceVersion?.version}
                targetVersion={comparisonResult.targetVersion?.version || (compareMode === 'draft' ? '草稿' : undefined)}
                loading={loading}
              />
            </div>

            {/* 结果提示 */}
            {!comparisonResult.hasDifferences && (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#52c41a' }}>
                <Text type="success">两个版本完全相同，无差异</Text>
              </div>
            )}
          </>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='请选择版本后点击"开始对比"按钮'
            style={{ padding: '60px 0' }}
          />
        )}
      </Spin>
    </Modal>
  );
};

export default PartVersionComparisonModal;

// 导出子组件和 Hook
export { ComparisonSummary, ComparisonTable, usePartVersionComparison };
export { DifferenceType, differenceTypeConfig, ReportFormat } from './usePartVersionComparison';
