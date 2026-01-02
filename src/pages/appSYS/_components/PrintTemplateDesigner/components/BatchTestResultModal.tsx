/**
 * 批量测试结果弹窗组件
 * 展示所有数据源的测试结果统计和详情
 */

import React, { useState } from 'react';
import {
  Modal,
  Table,
  Card,
  Statistic,
  Tag,
  Button,
  Row,
  Col,
  Space,
  Progress,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { DataSourceTestResult } from '../types';
import { TestResultModal } from './TestResultModal';
import { formatResponseTime } from '../utils/dataSourceUtils';
import type { ColumnsType } from 'antd/es/table';

export interface BatchTestResultModalProps {
  visible: boolean;
  results: Record<string, DataSourceTestResult>;
  onClose: () => void;
}

interface DataSourceResult extends DataSourceTestResult {
  name: string;
  key: string;
}

export const BatchTestResultModal: React.FC<BatchTestResultModalProps> = ({
  visible,
  results,
  onClose,
}) => {
  const [selectedResult, setSelectedResult] = useState<{
    name: string;
    result: DataSourceTestResult;
  } | null>(null);

  // 转换数据格式
  const dataSource: DataSourceResult[] = Object.entries(results).map(
    ([name, result]) => ({
      name,
      key: name,
      ...result,
    }),
  );

  // 统计信息
  const successCount = dataSource.filter((d) => d.success).length;
  const failedCount = dataSource.length - successCount;
  const totalCount = dataSource.length;
  const successRate = totalCount > 0 ? (successCount / totalCount) * 100 : 0;

  // 计算平均响应时间（只统计成功的）
  const successfulResults = dataSource.filter((d) => d.success);
  const avgResponseTime =
    successfulResults.length > 0
      ? successfulResults.reduce((sum, d) => sum + (d.responseTimeMs || 0), 0) /
        successfulResults.length
      : 0;

  // 查看详情
  const handleViewDetail = (record: DataSourceResult) => {
    setSelectedResult({
      name: record.name,
      result: record,
    });
  };

  // 表格列定义
  const columns: ColumnsType<DataSourceResult> = [
    {
      title: '数据源',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: '状态',
      dataIndex: 'success',
      key: 'success',
      width: 100,
      align: 'center',
      render: (success: boolean) => (
        <Tag
          icon={success ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={success ? 'success' : 'error'}
        >
          {success ? '成功' : '失败'}
        </Tag>
      ),
      filters: [
        { text: '成功', value: true },
        { text: '失败', value: false },
      ],
      onFilter: (value, record) => record.success === value,
    },
    {
      title: '响应时间',
      dataIndex: 'responseTimeMs',
      key: 'responseTimeMs',
      width: 120,
      align: 'right',
      render: (time: number) => formatResponseTime(time || 0),
      sorter: (a, b) => (a.responseTimeMs || 0) - (b.responseTimeMs || 0),
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (message: string) => (
        <span style={{ color: '#666' }}>{message || '-'}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Button
          size="small"
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetail(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="批量测试结果"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="close" type="primary" onClick={onClose}>
            关闭
          </Button>,
        ]}
        width={1000}
        destroyOnClose
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {/* 统计卡片 */}
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总数"
                  value={totalCount}
                  suffix="个"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="成功"
                  value={successCount}
                  suffix="个"
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="失败"
                  value={failedCount}
                  suffix="个"
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<CloseCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="平均响应时间"
                  value={avgResponseTime}
                  precision={0}
                  suffix="ms"
                />
              </Card>
            </Col>
          </Row>

          {/* 成功率进度条 */}
          <Card size="small">
            <div style={{ marginBottom: 8 }}>
              <strong>测试通过率</strong>
            </div>
            <Progress
              percent={successRate}
              status={successRate === 100 ? 'success' : successRate > 50 ? 'active' : 'exception'}
              strokeColor={
                successRate === 100
                  ? '#52c41a'
                  : successRate > 50
                  ? '#1890ff'
                  : '#ff4d4f'
              }
            />
          </Card>

          {/* 结果列表 */}
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 个数据源`,
            }}
            size="small"
            scroll={{ x: 800 }}
          />
        </Space>
      </Modal>

      {/* 详情弹窗 */}
      {selectedResult && (
        <TestResultModal
          visible={!!selectedResult}
          result={selectedResult.result}
          dataSourceName={selectedResult.name}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </>
  );
};
