import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { RiseOutlined, ApartmentOutlined, NumberOutlined } from '@ant-design/icons';

interface StatisticsCardsProps {
    directParents: number;
    totalReferences: number;
    maxLevel: number;
    loading?: boolean;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
    directParents,
    totalReferences,
    maxLevel,
    loading = false,
}) => {
    return (
        <Row gutter={12} style={{ marginBottom: 12 }}>
            <Col xs={24} sm={8}>
                <Card size="small" bodyStyle={{ padding: 12 }}>
                    <Statistic
                        title="直接父项"
                        value={directParents}
                        prefix={<NumberOutlined />}
                        valueStyle={{ color: '#1890ff', fontSize: 20 }}
                        loading={loading}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={8}>
                <Card size="small" bodyStyle={{ padding: 12 }}>
                    <Statistic
                        title="总引用数"
                        value={totalReferences}
                        prefix={<ApartmentOutlined />}
                        valueStyle={{ color: '#00b578', fontSize: 20 }}
                        loading={loading}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={8}>
                <Card size="small" bodyStyle={{ padding: 12 }}>
                    <Statistic
                        title="最大层级"
                        value={maxLevel}
                        prefix={<RiseOutlined />}
                        valueStyle={{ color: '#faad14', fontSize: 20 }}
                        loading={loading}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default StatisticsCards;
