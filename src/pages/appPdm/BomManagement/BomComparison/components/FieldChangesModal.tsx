import { Modal, Table, Tag, Space, Typography, Alert } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import React from 'react';
import type {
  BurnAbpPdmBomManagementBomItemDifferenceDto,
  BurnAbpPdmBomManagementFieldChangeDetail,
} from '@/services/pdm/typings';

const { Text, Title } = Typography;

interface FieldChangesModalProps {
  visible: boolean;
  differenceItem: BurnAbpPdmBomManagementBomItemDifferenceDto;
  sourceVersion: string;
  targetVersion: string;
  onClose: () => void;
}

const FieldChangesModal: React.FC<FieldChangesModalProps> = ({
  visible,
  differenceItem,
  sourceVersion,
  targetVersion,
  onClose,
}) => {
  const { childMaterialCode, fieldChanges, sourceItem, targetItem } = differenceItem;

  // 表格列定义
  const columns = [
    {
      title: '属性',
      dataIndex: 'fieldDisplayName',
      key: 'fieldDisplayName',
      width: 180,
      render: (text: string, record: BurnAbpPdmBomManagementFieldChangeDetail) => (
        <Space>
          {record.isCritical && (
            <WarningOutlined style={{ color: '#faad14' }} />
          )}
          <Text strong={record.isCritical}>{text || record.fieldName}</Text>
        </Space>
      ),
    },
    {
      title: `源版本 (${sourceVersion})`,
      dataIndex: 'sourceValue',
      key: 'sourceValue',
      width: 200,
      render: (text: string, record: BurnAbpPdmBomManagementFieldChangeDetail) => (
        <Text
          type={record.isCritical ? 'danger' : undefined}
          strong={record.isCritical}
        >
          {text || '-'}
        </Text>
      ),
    },
    {
      title: `目标版本 (${targetVersion})`,
      dataIndex: 'targetValue',
      key: 'targetValue',
      width: 200,
      render: (text: string, record: BurnAbpPdmBomManagementFieldChangeDetail) => (
        <Text
          type={record.isCritical ? 'success' : undefined}
          strong={record.isCritical}
        >
          {text || '-'}
        </Text>
      ),
    },
    {
      title: '关键字段',
      dataIndex: 'isCritical',
      key: 'isCritical',
      width: 100,
      align: 'center' as const,
      render: (isCritical: boolean) => (
        isCritical ? (
          <Tag color="orange">关键</Tag>
        ) : (
          <Tag>普通</Tag>
        )
      ),
    },
  ];

  // 获取物料名称
  const materialName = sourceItem?.childMaterialName || targetItem?.childMaterialName || '';

  // 关键字段数量
  const criticalFieldsCount = fieldChanges?.filter(f => f.isCritical).length || 0;

  return (
    <Modal
      title={
        <Space>
          <span>字段变更详情</span>
          <Text type="secondary">-</Text>
          <Tag color="blue">{childMaterialCode}</Tag>
          <Text>{materialName}</Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      {/* 变更概要 */}
      <Alert
        message={
          <Space>
            <span>
              共有 <Text strong>{fieldChanges?.length || 0}</Text> 个字段发生变化
            </span>
            {criticalFieldsCount > 0 && (
              <>
                <Text type="secondary">|</Text>
                <span>
                  其中 <Text strong type="warning">{criticalFieldsCount}</Text> 个为关键字段
                  <Text type="secondary" style={{ marginLeft: 4 }}>(影响成本、工艺等)</Text>
                </span>
              </>
            )}
          </Space>
        }
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      {/* 字段变更表格 */}
      <Table
        dataSource={fieldChanges || []}
        columns={columns}
        rowKey="fieldName"
        pagination={false}
        size="small"
        bordered
        scroll={{ y: 400 }}
        rowClassName={(record) => (record.isCritical ? 'critical-field-row' : '')}
      />

      {/* 图例说明 */}
      <div style={{ marginTop: 16, padding: 12, background: '#fafafa', borderRadius: 4 }}>
        <Space size={24}>
          <Space>
            <WarningOutlined style={{ color: '#faad14' }} />
            <Text type="secondary">= 关键字段变化(影响成本/工艺)</Text>
          </Space>
          <Space>
            <Tag color="orange">关键</Tag>
            <Text type="secondary">= 重点关注字段</Text>
          </Space>
          <Space>
            <Tag>普通</Tag>
            <Text type="secondary">= 普通字段</Text>
          </Space>
        </Space>
      </div>

      <style>
        {`
          .critical-field-row {
            background-color: #fff9e6 !important;
          }
          .critical-field-row:hover {
            background-color: #fff7d6 !important;
          }
        `}
      </style>
    </Modal>
  );
};

export default FieldChangesModal;
