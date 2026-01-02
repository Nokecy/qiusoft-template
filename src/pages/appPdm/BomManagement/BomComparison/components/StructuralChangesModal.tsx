import { Modal, Space, Typography, Card, Row, Col, Descriptions, Tag, Alert } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import React from 'react';
import type {
  BurnAbpPdmBomManagementBomItemDifferenceDto,
  BurnAbpPdmBomManagementFieldChangeDetail,
} from '@/services/pdm/typings';

const { Text, Title } = Typography;

interface StructuralChangesModalProps {
  visible: boolean;
  differenceItem: BurnAbpPdmBomManagementBomItemDifferenceDto;
  sourceVersion: string;
  targetVersion: string;
  onClose: () => void;
}

const StructuralChangesModal: React.FC<StructuralChangesModalProps> = ({
  visible,
  differenceItem,
  sourceVersion,
  targetVersion,
  onClose,
}) => {
  const { childMaterialCode, fieldChanges, sourceItem, targetItem } = differenceItem;

  // 获取物料名称
  const materialName = sourceItem?.childMaterialName || targetItem?.childMaterialName || '';

  // 获取结构变化相关字段
  const structuralChanges = fieldChanges?.filter(
    f => f.fieldName === 'ParentItemId' || f.fieldName === 'LevelCode' || f.fieldName === 'Sequence'
  ) || [];

  // 获取父节点显示文本
  const getParentText = (parentId?: number) => {
    if (!parentId) return '根节点';
    return `节点 ID: ${parentId}`;
  };

  return (
    <Modal
      title={
        <Space>
          <span>位置变更详情</span>
          <Text type="secondary">-</Text>
          <Tag color="blue">{childMaterialCode}</Tag>
          <Text>{materialName}</Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={700}
      footer={null}
    >
      {/* 变更提示 */}
      <Alert
        message="树形结构位置变更"
        description="该物料在BOM树中的位置发生了变化,但物料属性(数量、单位等)未发生变化"
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
      />

      {/* 位置变化对比 */}
      <Row gutter={16}>
        {/* 源版本位置 */}
        <Col span={11}>
          <Card
            title={`源版本 (${sourceVersion})`}
            size="small"
            style={{ background: '#fff9e6' }}
          >
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="父节点">
                <Text strong>{getParentText(sourceItem?.parentItemId)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="层级代码">
                <Tag color="blue">{sourceItem?.levelCode || '-'}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="序号">
                {sourceItem?.sequence || 0}
              </Descriptions.Item>
            </Descriptions>

            {/* 可视化树形位置 */}
            <div style={{ marginTop: 12, padding: 12, background: '#fff', borderRadius: 4 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>树形位置:</Text>
              <div style={{ marginTop: 8, paddingLeft: 16, fontFamily: 'monospace' }}>
                <div>主板 (根节点)</div>
                <div style={{ paddingLeft: sourceItem?.levelCode ? (sourceItem.levelCode.split('.').length - 1) * 16 : 0 }}>
                  └─ <Tag color="blue" size="small">{childMaterialCode}</Tag> {materialName}
                  {sourceItem?.levelCode && (
                    <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                      (层级: {sourceItem.levelCode})
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 中间箭头 */}
        <Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowDownOutlined style={{ fontSize: 24, color: '#1890ff' }} rotate={90} />
        </Col>

        {/* 目标版本位置 */}
        <Col span={11}>
          <Card
            title={`目标版本 (${targetVersion})`}
            size="small"
            style={{ background: '#e6f7e6' }}
          >
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="父节点">
                <Text strong>{getParentText(targetItem?.parentItemId)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="层级代码">
                <Tag color="green">{targetItem?.levelCode || '-'}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="序号">
                {targetItem?.sequence || 0}
              </Descriptions.Item>
            </Descriptions>

            {/* 可视化树形位置 */}
            <div style={{ marginTop: 12, padding: 12, background: '#fff', borderRadius: 4 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>树形位置:</Text>
              <div style={{ marginTop: 8, paddingLeft: 16, fontFamily: 'monospace' }}>
                <div>主板 (根节点)</div>
                <div style={{ paddingLeft: targetItem?.levelCode ? (targetItem.levelCode.split('.').length - 1) * 16 : 0 }}>
                  └─ <Tag color="green" size="small">{childMaterialCode}</Tag> {materialName}
                  {targetItem?.levelCode && (
                    <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                      (层级: {targetItem.levelCode})
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 属性变化详情 */}
      {structuralChanges.length > 0 && (
        <Card
          title="具体变化"
          size="small"
          style={{ marginTop: 16 }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size={8}>
            {structuralChanges.map(change => (
              <div key={change.fieldName} style={{ display: 'flex', alignItems: 'center' }}>
                <Text strong style={{ minWidth: 100 }}>{change.fieldDisplayName}:</Text>
                <Space>
                  <Text type="secondary">{change.sourceValue || '-'}</Text>
                  <Text type="secondary">→</Text>
                  <Text type="success" strong>{change.targetValue || '-'}</Text>
                </Space>
              </div>
            ))}
          </Space>
        </Card>
      )}

      {/* 影响说明 */}
      <div style={{ marginTop: 16, padding: 12, background: '#f0f5ff', borderRadius: 4, border: '1px solid #adc6ff' }}>
        <Space direction="vertical" size={4}>
          <Text strong style={{ color: '#1890ff' }}>影响说明:</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            • 物料在BOM树中被重新组织或移动到不同的层级
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            • 这可能影响制造工艺流程、装配顺序或成本核算层级
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            • 建议检查相关工艺文档和装配说明是否需要更新
          </Text>
        </Space>
      </div>
    </Modal>
  );
};

export default StructuralChangesModal;
