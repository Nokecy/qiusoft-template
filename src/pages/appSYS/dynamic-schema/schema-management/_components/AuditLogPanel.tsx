/**
 * Schema 管理 - 审计日志面板
 * 显示与动态 Schema 相关的操作审计日志
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Space,
  Tag,
  Button,
  Select,
  DatePicker,
  Modal,
  Descriptions,
  Typography,
  message,
} from 'antd';
import {
  FileSearchOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  AuditLoggingGetListAsync,
  AuditLoggingGetAsync,
} from '@/services/openApi/AuditLogging';

const { RangePicker } = DatePicker;
const { Text, Paragraph } = Typography;

interface AuditLogPanelProps {
  applicationName: string;
}

interface AuditLogItem {
  id: string;
  time: string;
  operationType: string;
  operator: string;
  operatorEmail: string;
  result: 'success' | 'failed';
  summary: string;
  url?: string;
  httpMethod?: string;
  httpStatusCode?: number;
  executionDuration?: number;
  clientIpAddress?: string;
  browserInfo?: string;
  details?: {
    fieldName?: string;
    dataType?: string;
    migratedRows?: number;
    duration?: string;
    ddlScript?: string;
    logs?: string[];
    actions?: any[];
    entityChanges?: any[];
  };
}

const AuditLogPanel: React.FC<AuditLogPanelProps> = ({ applicationName }) => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    operationType: undefined as string | undefined,
    dateRange: undefined as [dayjs.Dayjs, dayjs.Dayjs] | undefined,
  });
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // 加载审计日志
  const loadLogs = useCallback(async () => {
    if (!applicationName) return;

    setLoading(true);
    try {
      // 构建查询参数
      const params: any = {
        MaxResultCount: pagination.pageSize,
        SkipCount: (pagination.current - 1) * pagination.pageSize,
        // 按 URL 筛选与动态 Schema 相关的操作
        Url: '/api/dynamic',
      };

      // 添加时间范围筛选
      if (filters.dateRange && filters.dateRange.length === 2) {
        params.StartTime = filters.dateRange[0].format('YYYY-MM-DD HH:mm:ss');
        params.EndTime = filters.dateRange[1].format('YYYY-MM-DD HH:mm:ss');
      }

      const result = await AuditLoggingGetListAsync(params);

      // 转换数据格式
      const logList: AuditLogItem[] = (result.items || []).map((item: any) => {
        // 根据 URL 推断操作类型
        let operationType = '其他操作';
        if (item.url?.includes('promote')) {
          operationType = '字段提升';
        } else if (item.url?.includes('cache')) {
          operationType = '清除缓存';
        } else if (item.url?.includes('field')) {
          operationType = '字段操作';
        } else if (item.url?.includes('entity')) {
          operationType = '实体操作';
        } else if (item.url?.includes('application')) {
          operationType = '应用操作';
        }

        return {
          id: item.id,
          time: item.executionTime ? dayjs(item.executionTime).format('YYYY-MM-DD HH:mm:ss') : '-',
          operationType,
          operator: item.userName || '系统',
          operatorEmail: item.userName ? `${item.userName}@system` : '-',
          result: item.httpStatusCode && item.httpStatusCode < 400 ? 'success' : 'failed',
          summary: `${item.httpMethod || 'GET'} ${item.url || ''}`,
          url: item.url,
          httpMethod: item.httpMethod,
          httpStatusCode: item.httpStatusCode,
          executionDuration: item.executionDuration,
          clientIpAddress: item.clientIpAddress,
          browserInfo: item.browserInfo,
          details: {
            actions: item.actions,
            entityChanges: item.entityChanges,
          },
        };
      });

      setLogs(logList);
      setTotal(result.totalCount || 0);
    } catch (error: any) {
      message.error('加载审计日志失败: ' + (error?.message || '未知错误'));
      setLogs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [applicationName, filters, pagination]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const [detailLoading, setDetailLoading] = useState(false);

  const handleViewDetail = async (record: AuditLogItem) => {
    setSelectedLog(record);
    setDetailModalVisible(true);
    setDetailLoading(true);

    try {
      // 获取审计日志详情
      const detail = await AuditLoggingGetAsync({ id: record.id });

      // 更新详情数据
      setSelectedLog({
        ...record,
        details: {
          ...record.details,
          actions: detail.actions,
          entityChanges: detail.entityChanges,
        },
      });
    } catch (error: any) {
      message.error('获取详情失败: ' + (error?.message || '未知错误'));
    } finally {
      setDetailLoading(false);
    }
  };

  const handleExport = () => {
    message.info('导出功能开发中');
  };

  const handleRefresh = () => {
    loadLogs();
  };

  const columns: ColumnsType<AuditLogItem> = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 160,
    },
    {
      title: '操作类型',
      dataIndex: 'operationType',
      key: 'operationType',
      width: 100,
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: '方法',
      dataIndex: 'httpMethod',
      key: 'httpMethod',
      width: 80,
      render: (method) => <Tag color={method === 'GET' ? 'blue' : method === 'POST' ? 'green' : method === 'DELETE' ? 'red' : 'orange'}>{method}</Tag>,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      width: 100,
    },
    {
      title: '状态码',
      dataIndex: 'httpStatusCode',
      key: 'httpStatusCode',
      width: 80,
      render: (code) =>
        code && code < 400 ? (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            {code}
          </Tag>
        ) : (
          <Tag color="error" icon={<CloseCircleOutlined />}>
            {code}
          </Tag>
        ),
    },
    {
      title: '耗时',
      dataIndex: 'executionDuration',
      key: 'executionDuration',
      width: 80,
      render: (duration) => duration ? `${duration}ms` : '-',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => handleViewDetail(record)}>
          查看
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <FileSearchOutlined />
          <span>审计日志</span>
        </Space>
      }
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
            刷新
          </Button>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            导出日志
          </Button>
        </Space>
      }
    >
      {/* 筛选器 */}
      <Space style={{ marginBottom: 16 }}>
        <Select
          placeholder="操作类型"
          allowClear
          style={{ width: 140 }}
          value={filters.operationType}
          onChange={(v) => setFilters((f) => ({ ...f, operationType: v }))}
          options={[
            { label: '全部', value: undefined },
            { label: '字段提升', value: 'fieldPromotion' },
            { label: '清除缓存', value: 'clearCache' },
            { label: 'DDL执行', value: 'ddl' },
          ]}
        />
        <RangePicker
          value={filters.dateRange}
          onChange={(dates) =>
            setFilters((f) => ({
              ...f,
              dateRange: dates as [dayjs.Dayjs, dayjs.Dayjs] | undefined,
            }))
          }
          presets={[
            { label: '最近7天', value: [dayjs().subtract(7, 'day'), dayjs()] },
            { label: '最近30天', value: [dayjs().subtract(30, 'day'), dayjs()] },
          ]}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={logs}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
        }}
        size="middle"
      />

      {/* 详情对话框 */}
      <Modal
        title={
          <Space>
            <FileSearchOutlined />
            操作详情
          </Space>
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={700}
      >
        {selectedLog && (
          <div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="操作类型">{selectedLog.operationType}</Descriptions.Item>
              <Descriptions.Item label="操作时间">{selectedLog.time}</Descriptions.Item>
              <Descriptions.Item label="操作人">{selectedLog.operator}</Descriptions.Item>
              <Descriptions.Item label="HTTP 方法">
                <Tag color={selectedLog.httpMethod === 'GET' ? 'blue' : selectedLog.httpMethod === 'POST' ? 'green' : 'orange'}>
                  {selectedLog.httpMethod}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态码">
                {selectedLog.httpStatusCode && selectedLog.httpStatusCode < 400 ? (
                  <Tag color="success">{selectedLog.httpStatusCode}</Tag>
                ) : (
                  <Tag color="error">{selectedLog.httpStatusCode}</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="执行耗时">
                {selectedLog.executionDuration ? `${selectedLog.executionDuration}ms` : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="请求 URL" span={2}>
                <Text copyable style={{ wordBreak: 'break-all' }}>{selectedLog.url}</Text>
              </Descriptions.Item>
              {selectedLog.clientIpAddress && (
                <Descriptions.Item label="客户端 IP">{selectedLog.clientIpAddress}</Descriptions.Item>
              )}
            </Descriptions>

            {detailLoading ? (
              <div style={{ textAlign: 'center', padding: 24 }}>
                <Text type="secondary">加载详情中...</Text>
              </div>
            ) : (
              <>
                {selectedLog.details?.actions && selectedLog.details.actions.length > 0 && (
                  <>
                    <Paragraph strong style={{ marginTop: 16, marginBottom: 8 }}>
                      执行动作 ({selectedLog.details.actions.length})
                    </Paragraph>
                    <div
                      style={{
                        background: '#fafafa',
                        padding: 12,
                        borderRadius: 4,
                        maxHeight: 200,
                        overflow: 'auto',
                      }}
                    >
                      {selectedLog.details.actions.map((action: any, index: number) => (
                        <div key={index} style={{ marginBottom: 8, padding: 8, background: '#fff', borderRadius: 4 }}>
                          <Space direction="vertical" size={2}>
                            <Text strong>{action.serviceName}.{action.methodName}</Text>
                            <Text type="secondary">耗时: {action.executionDuration}ms</Text>
                          </Space>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {selectedLog.details?.entityChanges && selectedLog.details.entityChanges.length > 0 && (
                  <>
                    <Paragraph strong style={{ marginTop: 16, marginBottom: 8 }}>
                      实体变更 ({selectedLog.details.entityChanges.length})
                    </Paragraph>
                    <div
                      style={{
                        background: '#fafafa',
                        padding: 12,
                        borderRadius: 4,
                        maxHeight: 200,
                        overflow: 'auto',
                      }}
                    >
                      {selectedLog.details.entityChanges.map((change: any, index: number) => (
                        <div key={index} style={{ marginBottom: 8, padding: 8, background: '#fff', borderRadius: 4 }}>
                          <Space direction="vertical" size={2}>
                            <Space>
                              <Tag color={change.changeType === 0 ? 'green' : change.changeType === 1 ? 'blue' : 'red'}>
                                {change.changeTypeText || (change.changeType === 0 ? '创建' : change.changeType === 1 ? '更新' : '删除')}
                              </Tag>
                              <Text strong>{change.entityTypeFullName?.split('.').pop()}</Text>
                            </Space>
                            <Text type="secondary">实体 ID: {change.entityId}</Text>
                          </Space>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {(!selectedLog.details?.actions || selectedLog.details.actions.length === 0) &&
                  (!selectedLog.details?.entityChanges || selectedLog.details.entityChanges.length === 0) && (
                    <div style={{ textAlign: 'center', padding: 24 }}>
                      <Text type="secondary">暂无详细信息</Text>
                    </div>
                  )}
              </>
            )}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default AuditLogPanel;
