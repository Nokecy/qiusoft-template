/**
 * 物料详情页面 - 技术参数展示组件
 */

import React from 'react';
import { Badge, Empty } from 'antd';
import type { PartDetailData } from '../types';

interface TechnicalSectionProps {
  data: PartDetailData;
  attributeNameMap: Record<string, string>;
}

const TechnicalSection: React.FC<TechnicalSectionProps> = ({ data, attributeNameMap }) => {
  return (
    <div className="detail-section">
      <div className="section-header">
        <h3>
          技术参数{' '}
          {data.attributeValues && data.attributeValues.length > 0 && (
            <Badge count={data.attributeValues.length} style={{ backgroundColor: '#1890ff' }} />
          )}
        </h3>
      </div>
      {data.attributeValues && data.attributeValues.length > 0 ? (
        <div className="info-grid">
          {data.attributeValues.map((attr) => (
            <div className="info-row" key={attr.attributeCode}>
              <span className="info-label">{attributeNameMap[attr.attributeCode] || attr.attributeCode}</span>
              <span className="info-value">{attr.value || attr.attributeValue || '-'}</span>
            </div>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无技术参数" style={{ padding: '40px 0' }} />
      )}
    </div>
  );
};

export default TechnicalSection;
