import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

interface BasicInfoCardProps {
  form: any; // Formily form instance
}

/**
 * 基础信息卡片组件
 * 展示和编辑工艺路线的基本信息,支持折叠展开
 */
const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ form }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Card
      title="基本信息"
      extra={
        <Button
          type="link"
          icon={collapsed ? <DownOutlined /> : <UpOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '展开' : '折叠'}
        </Button>
      }
      className="basic-info-card"
      style={{ marginBottom: 16 }}
    >
      {!collapsed && (
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="工艺路线编码" required>
                <Input placeholder="请输入编码" maxLength={50} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="版本号" required>
                <Input placeholder="请输入版本号" maxLength={20} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工艺路线名称" required>
                <Input placeholder="请输入名称" maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="备注">
                <Input.TextArea placeholder="请输入备注" rows={3} maxLength={500} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
      {collapsed && (
        <div style={{ padding: '8px 0', color: '#666' }}>
          工艺路线基本信息 (点击展开查看详情)
        </div>
      )}
    </Card>
  );
};

export default BasicInfoCard;
