/**
 * 物料详情页面 - 基础信息展示组件
 */

import React from 'react';
import { Tag, Divider } from 'antd';
import type { PartDetailData } from '../types';
import { formatDate, getLifecycleConfig } from '../utils';

interface BasicInfoSectionProps {
  data: PartDetailData;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ data }) => {
  const lifecycleConfig = getLifecycleConfig(data.lifecycleStatus);

  return (
    <div className="detail-section">
      <div className="section-header">
        <h3>基本属性</h3>
      </div>
      <div className="info-grid">
        <div className="info-row">
          <span className="info-label">物料编码</span>
          <span className="info-value primary">{data.partNumber}</span>
        </div>
        <div className="info-row">
          <span className="info-label">物料名称</span>
          <span className="info-value">{data.description}</span>
        </div>
        <div className="info-row">
          <span className="info-label">英文描述</span>
          <span className="info-value">{data.engDescription || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">对外描述</span>
          <span className="info-value">{data.outDescription || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">外部编码</span>
          <span className="info-value">{data.outCode || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">物料图号</span>
          <span className="info-value">{data.drawingNumber || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">产品系列</span>
          <span className="info-value">{data.productSeriesName || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">物料类别</span>
          <span className="info-value">{data.categoryName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">规格型号</span>
          <span className="info-value">{data.specification || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">对外规格</span>
          <span className="info-value">{data.outSpecification || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">计量单位</span>
          <span className="info-value">{data.unitName || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">来源</span>
          <span className="info-value">
            {data.comeFrom && data.comeFromName ? `${data.comeFrom} - ${data.comeFromName}` : data.comeFrom || '-'}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">生命周期</span>
          <span className="info-value">
            <Tag color={lifecycleConfig.color}>{lifecycleConfig.label}</Tag>
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">关键物料</span>
          <span className="info-value">{data.isCritical ? <Tag color="red">是</Tag> : <Tag>否</Tag>}</span>
        </div>
        <div className="info-row">
          <span className="info-label">启用状态</span>
          <span className="info-value">{data.isActive ? <Tag color="success">启用</Tag> : <Tag>禁用</Tag>}</span>
        </div>
        <div className="info-row">
          <span className="info-label">当前版本</span>
          <span className="info-value">
            <Tag color="blue">{data.version}</Tag>
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">EAN码</span>
          <span className="info-value">{data.eanCode || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">UPC码</span>
          <span className="info-value">{data.upcCode || '-'}</span>
        </div>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      <div className="section-header">
        <h3>规格尺寸</h3>
      </div>
      <div className="info-grid">
        <div className="info-row">
          <span className="info-label">材料/材质</span>
          <span className="info-value">{data.material || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">表面处理</span>
          <span className="info-value">{data.surfaceTreatment || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">颜色</span>
          <span className="info-value">{data.color || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">长度</span>
          <span className="info-value">{data.length !== undefined ? `${data.length} mm` : '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">宽度</span>
          <span className="info-value">{data.width !== undefined ? `${data.width} mm` : '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">高度</span>
          <span className="info-value">{data.height !== undefined ? `${data.height} mm` : '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">直径</span>
          <span className="info-value">{data.diameter !== undefined ? `${data.diameter} mm` : '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">重量</span>
          <span className="info-value">{data.weight !== undefined ? `${data.weight} g` : '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">体积</span>
          <span className="info-value">{data.volume !== undefined ? `${data.volume} mm³` : '-'}</span>
        </div>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      <div className="section-header">
        <h3>创建与修改</h3>
      </div>
      <div className="info-grid cols-2">
        <div className="info-row">
          <span className="info-label">创建人</span>
          <span className="info-value">{data.creator}</span>
        </div>
        <div className="info-row">
          <span className="info-label">创建时间</span>
          <span className="info-value">{formatDate(data.creationTime)}</span>
        </div>
        <div className="info-row">
          <span className="info-label">最后修改人</span>
          <span className="info-value">{data.lastModifier || '-'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">最后修改时间</span>
          <span className="info-value">{formatDate(data.lastModificationTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
