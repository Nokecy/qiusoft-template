import React from 'react';
import { Card, Descriptions, Tag, Statistic, Divider } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    BarcodeOutlined,
} from '@ant-design/icons';
import type { API } from '@/services/typings';

interface MaterialSummaryCardProps {
    node: API.BurnAbpPdmBomManagementBomsBomItemTreeDto | null;
}

const MaterialSummaryCard: React.FC<MaterialSummaryCardProps> = ({ node }) => {
    if (!node) {
        return (
            <Card title="物料概要" bordered={false}>
                <div
                    style={{
                        textAlign: 'center',
                        padding: '60px 0',
                        color: '#bfbfbf',
                        fontSize: 14,
                    }}
                >
                    <BarcodeOutlined style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }} />
                    <div>请从左侧BOM树中选择一个节点以查看详细信息</div>
                </div>
            </Card>
        );
    }

    const isActive = node.activationStatus === 1;

    const getStatusTag = (status?: number) => {
        if (status === 1) {
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    激活
                </Tag>
            );
        }
        return (
            <Tag icon={<CloseCircleOutlined />} color="default">
                失效
            </Tag>
        );
    };

    return (
        <div style={{ padding: '8px 12px' }}>
            {/* 概要卡片 */}
            <Card
                size="small"
                bordered={false}
                style={{
                    background: isActive ? '#f6ffed' : '#fafafa',
                    marginBottom: 16,
                    borderLeft: `3px solid ${isActive ? '#52c41a' : '#d9d9d9'}`,
                }}
            >
                <Statistic
                    title="用量"
                    value={node.quantity}
                    suffix={node.unitOfMeasure}
                    valueStyle={{ fontSize: 20, color: '#1890ff' }}
                />
            </Card>

            {/* 详细信息 */}
            <Card title="物料详细信息" size="small" bordered={false}>
                <Descriptions column={1} size="small" colon={false}>
                    <Descriptions.Item
                        label={<span style={{ color: '#8c8c8c' }}>物料编码</span>}
                    >
                        <strong
                            style={{
                                fontSize: 14,
                                color: '#1890ff',
                                fontFamily: 'Consolas, Monaco, monospace',
                            }}
                        >
                            {node.childMaterialCode}
                        </strong>
                    </Descriptions.Item>

                    <Descriptions.Item
                        label={<span style={{ color: '#8c8c8c' }}>物料描述</span>}
                    >
                        <span style={{ fontSize: 14, color: '#262626' }}>
                            {node.childMaterialDescription}
                        </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<span style={{ color: '#8c8c8c' }}>版本</span>}>
                        {node.childMaterialVersion || '-'}
                    </Descriptions.Item>

                    <Descriptions.Item label={<span style={{ color: '#8c8c8c' }}>状态</span>}>
                        {getStatusTag(node.activationStatus)}
                    </Descriptions.Item>
                </Descriptions>

                <Divider style={{ margin: '16px 0' }} />

                <Descriptions column={2} size="small" colon={false}>
                    <Descriptions.Item
                        label={<span style={{ color: '#8c8c8c' }}>物料来源</span>}
                    >
                        {node.materialComeFrom || '-'}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label={<span style={{ color: '#8c8c8c' }}>层级代码</span>}
                    >
                        <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                            {node.levelCode || '-'}
                        </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<span style={{ color: '#8c8c8c' }}>序号</span>}>
                        {node.sequence || '-'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default MaterialSummaryCard;
