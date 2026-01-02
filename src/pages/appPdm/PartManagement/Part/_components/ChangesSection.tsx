/**
 * 变更历史记录组件
 * 负责展示物料的变更历史时间线
 */

import React from 'react';
import { Badge, Spin, Empty, Timeline, Tag } from 'antd';

interface ChangeRecordData {
  id?: string;
  changeType?: number;
  changeTypeName?: string;
  version?: string;
  comment?: string;
  operatorName?: string;
  operationTime?: string;
  creationTime?: string;
}

interface ChangesSectionProps {
  changeRecords: ChangeRecordData[];
  changeRecordsLoading: boolean;
  formatDate: (date?: string, format?: 'date' | 'datetime' | 'short') => string;
  getChangeTypeConfig: (changeType?: number) => { label: string; color: string };
}

const ChangesSection: React.FC<ChangesSectionProps> = ({
  changeRecords,
  changeRecordsLoading,
  formatDate,
  getChangeTypeConfig,
}) => {
  return (
    <div className="detail-section">
      <div className="section-header">
        <h3>变更历史 <Badge count={changeRecords.length} style={{ backgroundColor: '#2f54eb' }} /></h3>
      </div>
      <Spin spinning={changeRecordsLoading}>
        {changeRecords.length > 0 ? (
          <Timeline
            items={changeRecords.map((item) => {
              const changeTypeConfig = getChangeTypeConfig(item.changeType);
              return {
                color: changeTypeConfig.color === 'green' ? 'green' : changeTypeConfig.color === 'red' ? 'red' : 'blue',
                children: (
                  <div className="timeline-item">
                    <div className="timeline-header">
                      {item.version && <Tag color="blue">{item.version}</Tag>}
                      <Tag color={changeTypeConfig.color}>{item.changeTypeName || changeTypeConfig.label}</Tag>
                    </div>
                    {item.comment && <div className="timeline-content">{item.comment}</div>}
                    <div className="timeline-footer">
                      {item.operatorName || '-'} · {formatDate(item.operationTime || item.creationTime)}
                    </div>
                  </div>
                ),
              };
            })}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={changeRecordsLoading ? '加载中...' : '暂无变更历史'}
            style={{ padding: '40px 0' }}
          />
        )}
      </Spin>
    </div>
  );
};

export default ChangesSection;
