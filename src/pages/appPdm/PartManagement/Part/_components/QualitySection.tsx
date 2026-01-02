/**
 * 质量追溯组件
 * 展示物料的质量统计和检验记录(模拟数据)
 */

import React, { useMemo } from 'react';
import { Alert, Badge, Divider, Empty, Progress, Table, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { QualityRecordData } from '../types';

interface QualitySectionProps {
  qualityData: QualityRecordData[];
}

const QualitySection: React.FC<QualitySectionProps> = ({
  qualityData,
}) => {
  // 计算质量统计
  const qualityStats = useMemo(() => {
    const totalCount = qualityData.length;
    const passCount = qualityData.filter(q => q.inspectionResult === '合格').length;
    const failCount = totalCount - passCount;
    const passRate = totalCount > 0 ? Math.round((passCount / totalCount) * 100) : 0;

    return { totalCount, passCount, failCount, passRate };
  }, [qualityData]);

  // 质量记录列定义
  const qualityColumns: ColumnsType<QualityRecordData> = useMemo(() => [
    { title: '批次', dataIndex: 'batchNumber', width: 120 },
    { title: '检验类型', dataIndex: 'inspectionType', width: 90, render: t => <Badge color="blue" text={t} /> },
    { title: '结果', dataIndex: 'inspectionResult', width: 70, align: 'center', render: v => <Badge status={v === '合格' ? 'success' : 'error'} text={v} /> },
    { title: '不良率', dataIndex: 'defectRate', width: 70, align: 'right', render: v => v !== undefined ? <span style={{ color: v === 0 ? '#52c41a' : v < 3 ? '#faad14' : '#ff4d4f' }}>{v.toFixed(1)}%</span> : '-' },
    { title: '检验人', dataIndex: 'inspector', width: 80 },
    { title: '时间', dataIndex: 'inspectionTime', width: 120 },
    { title: '操作', width: 60, render: (_, r) => r.reportUrl ? <Button type="link" size="small" icon={<FileTextOutlined />}>报告</Button> : null },
  ], []);

  return (
    <div className="detail-section">
      <Alert
        message="功能开发中"
        description="质量追溯功能正在开发中，以下为模拟数据展示效果。"
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <div className="section-header">
        <h3>质量统计</h3>
      </div>
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-value">{qualityStats.totalCount}</span>
          <span className="stat-label">检验批次</span>
        </div>
        <div className="stat-item">
          <span className="stat-value success">{qualityStats.passCount}</span>
          <span className="stat-label">合格</span>
        </div>
        <div className="stat-item">
          <span className="stat-value error">{qualityStats.failCount}</span>
          <span className="stat-label">不合格</span>
        </div>
        <div className="stat-item">
          <Progress
            type="circle"
            percent={qualityStats.passRate}
            width={48}
            strokeWidth={8}
            status={qualityStats.passRate >= 95 ? 'success' : qualityStats.passRate >= 85 ? 'normal' : 'exception'}
          />
          <span className="stat-label">合格率</span>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className="section-header">
        <h3>检验记录</h3>
      </div>
      {qualityData.length > 0 ? (
        <Table
          dataSource={qualityData}
          columns={qualityColumns}
          pagination={{ pageSize: 5, size: 'small' }}
          size="small"
          rowKey="id"
          scroll={{ x: 700 }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无质量记录"
          style={{ padding: '40px 0' }}
        />
      )}
    </div>
  );
};

export default QualitySection;
