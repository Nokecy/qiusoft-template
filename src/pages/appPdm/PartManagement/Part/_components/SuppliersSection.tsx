/**
 * 供应商管理组件
 * 展示物料的供应商信息(模拟数据)
 */

import React, { useMemo } from 'react';
import { Alert, Badge, Empty, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { SupplierData } from '../types';

interface SuppliersSectionProps {
  supplierData: SupplierData[];
}

const SuppliersSection: React.FC<SuppliersSectionProps> = ({
  supplierData,
}) => {
  // 供应商列定义
  const supplierColumns: ColumnsType<SupplierData> = useMemo(() => [
    { title: '编码', dataIndex: 'supplierCode', width: 100 },
    { title: '供应商名称', dataIndex: 'supplierName', ellipsis: true },
    { title: '周期', dataIndex: 'leadTime', width: 60, align: 'center', render: v => `${v}天` },
    { title: '价格', dataIndex: 'price', width: 90, align: 'right', render: v => <span className="num-primary">¥{v.toFixed(2)}</span> },
    { title: '主供', dataIndex: 'isPrimary', width: 60, align: 'center', render: v => v ? <Badge status="success" text="是" /> : '-' },
    { title: '联系人', dataIndex: 'contactPerson', width: 80 },
    { title: '电话', dataIndex: 'contactPhone', width: 110 },
  ], []);

  return (
    <div className="detail-section">
      <Alert
        message="功能开发中"
        description="供应商管理功能正在开发中，以下为模拟数据展示效果。"
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <div className="section-header">
        <h3>供应商 <Badge count={supplierData.length} style={{ backgroundColor: '#faad14' }} /></h3>
      </div>
      {supplierData.length > 0 ? (
        <Table
          dataSource={supplierData}
          columns={supplierColumns}
          pagination={false}
          size="small"
          rowKey="id"
          scroll={{ x: 700 }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无供应商"
          style={{ padding: '40px 0' }}
        />
      )}
    </div>
  );
};

export default SuppliersSection;
