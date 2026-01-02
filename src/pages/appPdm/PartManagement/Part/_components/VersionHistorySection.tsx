/**
 * 版本历史管理组件
 * 负责展示物料的版本历史记录,支持版本切换和对比
 */

import React from 'react';
import { Button, Space, Badge, Spin, Empty, Tag, Tooltip } from 'antd';
import {
  SwapOutlined,
  RollbackOutlined,
  EyeOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { VersionHistoryData } from '../types';

interface VersionHistorySectionProps {
  versionHistory: VersionHistoryData[];
  versionHistoryLoading: boolean;
  versionDetailLoading: boolean;
  isViewingHistory: boolean;
  selectedVersionId: string | null;
  formatDate: (date?: string, format?: 'date' | 'datetime' | 'short') => string;
  getLifecycleConfig: (status: number) => { label: string; color: string };
  onBackToCurrentVersion: () => void;
  onVersionCompare: () => void;
  onVersionCompareWith: (version: string) => void;
  onLoadVersionDetail: (versionId: number, version: string) => void;
}

const VersionHistorySection: React.FC<VersionHistorySectionProps> = ({
  versionHistory,
  versionHistoryLoading,
  versionDetailLoading,
  isViewingHistory,
  selectedVersionId,
  formatDate,
  getLifecycleConfig,
  onBackToCurrentVersion,
  onVersionCompare,
  onVersionCompareWith,
  onLoadVersionDetail,
}) => {
  return (
    <div className="detail-section">
      <div className="section-header">
        <h3>历史版本 <Badge count={versionHistory.length} style={{ backgroundColor: '#722ed1' }} /></h3>
        <Space>
          {versionHistory.length >= 2 && (
            <Button
              type="default"
              size="small"
              icon={<SwapOutlined />}
              onClick={onVersionCompare}
            >
              版本对比
            </Button>
          )}
          {isViewingHistory && (
            <Button
              type="primary"
              size="small"
              icon={<RollbackOutlined />}
              onClick={onBackToCurrentVersion}
            >
              返回当前版本
            </Button>
          )}
        </Space>
      </div>
      <Spin spinning={versionHistoryLoading || versionDetailLoading}>
        {versionHistory.length > 0 ? (
          <div className="version-history-container">
            {/* 版本时间线 */}
            <div className="version-timeline">
              {versionHistory.map((version, index) => (
                <div
                  key={version.version}
                  className={`version-card ${version.isCurrent ? 'current' : ''} ${selectedVersionId === version.id ? 'selected' : ''}`}
                  onClick={() => {
                    if (!version.isCurrent && version.id) {
                      onLoadVersionDetail(Number(version.id), version.version);
                    }
                  }}
                >
                  <div className="version-card-header">
                    <div className="version-info">
                      <span className="version-number">
                        <BranchesOutlined style={{ marginRight: 6 }} />
                        {version.version}
                      </span>
                      {version.isCurrent && (
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                          当前版本
                        </Tag>
                      )}
                      {!version.isCurrent && selectedVersionId === version.id && (
                        <Tag color="blue" icon={<EyeOutlined />}>
                          查看中
                        </Tag>
                      )}
                    </div>
                    <Tag color={getLifecycleConfig(version.lifecycleStatus).color}>
                      {getLifecycleConfig(version.lifecycleStatus).label}
                    </Tag>
                  </div>

                  <div className="version-card-body">
                    {version.versionReason && (
                      <div className="version-reason">
                        <span className="label">变更原因：</span>
                        <span className="value">{version.versionReason}</span>
                      </div>
                    )}
                    <div className="version-meta">
                      <span className="meta-item">
                        <UserOutlined style={{ marginRight: 4 }} />
                        {version.createdBy || '-'}
                      </span>
                      <span className="meta-item">
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        {formatDate(version.versionDate)}
                      </span>
                    </div>
                  </div>

                  <div className="version-card-footer">
                    {!version.isCurrent && (
                      <Space size={8}>
                        <Button
                          type="link"
                          size="small"
                          icon={<EyeOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (version.id) {
                              onLoadVersionDetail(Number(version.id), version.version);
                            }
                          }}
                        >
                          查看详情
                        </Button>
                        <Tooltip title="与当前版本对比">
                          <Button
                            type="link"
                            size="small"
                            icon={<SwapOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              onVersionCompareWith(version.version);
                            }}
                          >
                            对比
                          </Button>
                        </Tooltip>
                      </Space>
                    )}
                    {version.isCurrent && (
                      <span className="current-label">这是最新发布的版本</span>
                    )}
                  </div>

                  {/* 时间线连接线 */}
                  {index < versionHistory.length - 1 && (
                    <div className="version-connector" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={versionHistoryLoading ? '加载中...' : '暂无版本历史'}
            style={{ padding: '60px 0' }}
          />
        )}
      </Spin>
    </div>
  );
};

export default VersionHistorySection;
