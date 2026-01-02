/**
 * 库存信息组件
 * 展示物料的库存统计和明细(模拟数据)
 */

import React, { useMemo } from 'react';
import { Alert, Divider, Progress, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { InventoryData } from '../types';

interface InventorySectionProps {
  inventoryData: InventoryData[];
  getStockHealth: (available: number, safety: number) => { percent: number; status: 'success' | 'normal' | 'exception' };
}

const InventorySection: React.FC<InventorySectionProps> = ({
  inventoryData,
  getStockHealth,
}) => {
  // 计算总库存统计
  const totalInventoryStats = useMemo(() => {
    const total = inventoryData.reduce((sum, item) => sum + item.availableQty + (item.lockedQty || 0), 0);
    const available = inventoryData.reduce((sum, item) => sum + item.availableQty, 0);
    const inTransit = inventoryData.reduce((sum, item) => sum + item.inTransitQty, 0);
    const locked = inventoryData.reduce((sum, item) => sum + (item.lockedQty || 0), 0);
    const safetyStock = inventoryData.reduce((sum, item) => sum + item.safetyStock, 0);
    const healthPercent = safetyStock > 0 ? Math.min(Math.round((available / safetyStock) * 100), 150) : 100;

    return { total, available, inTransit, locked, healthPercent };
  }, [inventoryData]);

  // 库存列定义
  const inventoryColumns: ColumnsType<InventoryData> = useMemo(() => [
    { title: '仓库', dataIndex: 'warehouseName', ellipsis: true },
    { title: '可用', dataIndex: 'availableQty', width: 80, align: 'right', render: (v, r) => <span className="num-primary">{v.toLocaleString()} {r.unit}</span> },
    { title: '在途', dataIndex: 'inTransitQty', width: 80, align: 'right', render: (v, r) => <span className="num-warning">{v.toLocaleString()} {r.unit}</span> },
    { title: '锁定', dataIndex: 'lockedQty', width: 80, align: 'right', render: (v, r) => v ? <span>{v.toLocaleString()} {r.unit}</span> : '-' },
    { title: '安全库存', dataIndex: 'safetyStock', width: 90, align: 'right', render: (v, r) => `${v.toLocaleString()} ${r.unit}` },
    {
      title: '库存健康度', width: 100, align: 'center', render: (_, r) => {
        const health = getStockHealth(r.availableQty, r.safetyStock);
        return <Progress percent={health.percent} size="small" status={health.status} />;
      }
    },
  ], [getStockHealth]);

  return (
    <div className="detail-section">
      <Alert
        message="功能开发中"
        description="库存信息功能正在开发中，以下为模拟数据展示效果。"
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <div className="section-header">
        <h3>库存概览</h3>
      </div>
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-value primary">{totalInventoryStats.total.toLocaleString()}</span>
          <span className="stat-label">总库存</span>
        </div>
        <div className="stat-item">
          <span className="stat-value success">{totalInventoryStats.available.toLocaleString()}</span>
          <span className="stat-label">可用库存</span>
        </div>
        <div className="stat-item">
          <span className="stat-value warning">{totalInventoryStats.inTransit.toLocaleString()}</span>
          <span className="stat-label">在途库存</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{totalInventoryStats.locked.toLocaleString()}</span>
          <span className="stat-label">锁定库存</span>
        </div>
        <div className="stat-item">
          <Progress
            type="circle"
            percent={totalInventoryStats.healthPercent}
            width={48}
            strokeWidth={8}
            status={totalInventoryStats.healthPercent >= 100 ? 'success' : totalInventoryStats.healthPercent >= 50 ? 'normal' : 'exception'}
          />
          <span className="stat-label">健康度</span>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className="section-header">
        <h3>库存明细</h3>
      </div>
      <Table
        dataSource={inventoryData}
        columns={inventoryColumns}
        pagination={false}
        size="small"
        rowKey="warehouseCode"
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default InventorySection;
