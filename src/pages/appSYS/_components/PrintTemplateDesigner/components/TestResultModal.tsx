/**
 * 数据源测试结果弹窗组件
 * 展示详细的测试结果，包括状态、性能指标、诊断信息和样本数据
 */

import React from 'react';
import {
  Modal,
  Card,
  Statistic,
  Alert,
  Descriptions,
  Row,
  Col,
  Space,
  Tag,
  Button,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { DataSourceTestResult } from '../types';
import { formatResponseTime, formatDataSize } from '../utils/dataSourceUtils';

export interface TestResultModalProps {
  visible: boolean;
  result: DataSourceTestResult | null;
  dataSourceName: string;
  onClose: () => void;
}

export const TestResultModal: React.FC<TestResultModalProps> = ({
  visible,
  result,
  dataSourceName,
  onClose,
}) => {
  if (!result) {
    return null;
  }

  // 计算数据大小
  const dataSize = result.sampleData
    ? JSON.stringify(result.sampleData).length
    : 0;

  // 获取样本数据的记录数
  const getRecordCount = (data: any): number => {
    if (Array.isArray(data)) {
      return data.length;
    } else if (data && typeof data === 'object') {
      return 1;
    }
    return 0;
  };

  const recordCount = getRecordCount(result.sampleData);

  return (
    <Modal
      title={
        <Space>
          <span>数据源测试结果</span>
          <Tag color="blue">{dataSourceName}</Tag>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          关闭
        </Button>,
      ]}
      width={800}
      destroyOnClose
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* 测试状态卡片 */}
        <Card size="small">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="测试状态"
                value={result.success ? '成功' : '失败'}
                valueStyle={{
                  color: result.success ? '#52c41a' : '#ff4d4f',
                  fontSize: 24,
                }}
                prefix={
                  result.success ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="响应时间"
                value={result.responseTimeMs || 0}
                suffix="ms"
                precision={0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{
                  color: result.responseTimeMs && result.responseTimeMs < 1000 ? '#52c41a' : '#faad14',
                }}
              />
            </Col>
          </Row>
        </Card>

        {/* 消息提示 */}
        <Alert
          message={result.message || (result.success ? '测试成功' : '测试失败')}
          type={result.success ? 'success' : 'error'}
          showIcon
        />

        {/* 数据统计 */}
        {result.success && result.sampleData && (
          <Card size="small" title={<Space><DatabaseOutlined /> 数据统计</Space>}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="记录数"
                  value={recordCount}
                  suffix="条"
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="数据大小"
                  value={formatDataSize(dataSize)}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="响应速度"
                  value={formatResponseTime(result.responseTimeMs || 0)}
                />
              </Col>
            </Row>
          </Card>
        )}

        {/* 诊断信息 */}
        {result.diagnostics && Object.keys(result.diagnostics).length > 0 && (
          <Card size="small" title="诊断信息">
            <Descriptions column={1} size="small" bordered>
              {Object.entries(result.diagnostics).map(([key, value]) => (
                <Descriptions.Item key={key} label={key}>
                  {typeof value === 'object' ? (
                    <pre style={{
                      margin: 0,
                      padding: 8,
                      background: '#f5f5f5',
                      borderRadius: 4,
                      fontSize: 12,
                      maxHeight: 200,
                      overflow: 'auto',
                    }}>
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    <span style={{ wordBreak: 'break-all' }}>{String(value)}</span>
                  )}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
        )}

        {/* 样本数据 */}
        {result.sampleData && (
          <Card size="small" title="样本数据" extra={<Tag>{recordCount}条记录</Tag>}>
            <pre
              style={{
                background: '#f5f5f5',
                padding: 12,
                borderRadius: 4,
                maxHeight: 400,
                overflow: 'auto',
                margin: 0,
                fontSize: 12,
                fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
              }}
            >
              {JSON.stringify(result.sampleData, null, 2)}
            </pre>
          </Card>
        )}
      </Space>
    </Modal>
  );
};
