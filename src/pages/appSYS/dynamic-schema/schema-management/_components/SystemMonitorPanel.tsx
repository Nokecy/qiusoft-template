/**
 * Schema 管理 - 系统监控面板
 * 注：系统监控功能需要后端提供专门的监控 API 支持
 * 当前使用本地模拟，待后端 API 就绪后可替换
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Typography,
  Space,
  Tag,
  Button,
  Alert,
} from 'antd';
import {
  DashboardOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  FieldTimeOutlined,
  FileTextOutlined,
  BulbOutlined,
  ReloadOutlined,
  LineChartOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  DynamicApplicationGetListAsync,
  DynamicApplicationGetAsync,
} from '@/services/openApi/DynamicApplication';
import {
  HostEntityGetExtensionFieldsAsync,
} from '@/services/openApi/HostEntity';

const { Text, Paragraph } = Typography;

interface SystemMonitorPanelProps {
  applicationName: string;
}

interface PerformanceMetrics {
  avgQueryTime: number; // ms
  cacheHitRate: number; // %
  queryTrend: number[]; // 最近7天查询时间趋势
  cacheTrend: number[]; // 最近7天缓存命中率趋势
}

interface DataStatistics {
  totalRecords: number;
  physicalColumns: number;
  jsonFields: number;
  schemaVersion: number;
}

interface PerformanceSuggestion {
  level: 'warning' | 'info' | 'success';
  icon: React.ReactNode;
  message: string;
}

const SystemMonitorPanel: React.FC<SystemMonitorPanelProps> = ({ applicationName }) => {
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false); // 默认关闭自动刷新
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    avgQueryTime: 0,
    cacheHitRate: 0,
    queryTrend: [],
    cacheTrend: [],
  });
  const [statistics, setStatistics] = useState<DataStatistics>({
    totalRecords: 0,
    physicalColumns: 0,
    jsonFields: 0,
    schemaVersion: 0,
  });
  const [suggestions, setSuggestions] = useState<PerformanceSuggestion[]>([]);
  const [apiAvailable, setApiAvailable] = useState(false);

  // 加载统计数据
  const loadStatistics = useCallback(async () => {
    if (!applicationName) return;

    setLoading(true);
    try {
      // 先从列表中找到应用 ID，再获取详情
      const listRes = await DynamicApplicationGetListAsync({ MaxResultCount: 1000 }).catch(() => null);
      const appFromList = listRes?.items?.find((item: any) => item.name === applicationName);
      const appData = appFromList?.id
        ? await DynamicApplicationGetAsync({ id: appFromList.id }).catch(() => null)
        : null;

      let physicalColumns = 0;
      let jsonFields = 0;

      if (appData?.entities && appData.entities.length > 0) {
        const rootEntity = appData.entities.find((e: any) => e.role === 0) || appData.entities[0];
        if (rootEntity?.hostEntityId) {
          // 获取扩展字段统计
          const fieldsResult = await HostEntityGetExtensionFieldsAsync({
            hostEntityId: rootEntity.hostEntityId,
            MaxResultCount: 100,
            SkipCount: 0,
          }).catch(() => null);

          if (fieldsResult?.items) {
            // 统计已提升和未提升的字段
            physicalColumns = fieldsResult.items.filter((f: any) => f.status === 1).length;
            jsonFields = fieldsResult.items.filter((f: any) => f.status !== 1).length;
          }
        }
      }

      // 更新统计信息
      setStatistics({
        totalRecords: 0, // 需要专门的 API 获取记录数
        physicalColumns,
        jsonFields,
        schemaVersion: appData?.entities?.length || 0,
      });

      // 生成建议
      const newSuggestions: PerformanceSuggestion[] = [];
      if (jsonFields > 0) {
        newSuggestions.push({
          level: 'info',
          icon: <ThunderboltOutlined style={{ color: '#1890ff' }} />,
          message: `当前有 ${jsonFields} 个 JSON 字段，可根据查询频率考虑提升为物理列`,
        });
      }
      if (physicalColumns > 0) {
        newSuggestions.push({
          level: 'success',
          icon: <BulbOutlined style={{ color: '#52c41a' }} />,
          message: `已有 ${physicalColumns} 个字段提升为物理列`,
        });
      }
      if (newSuggestions.length === 0) {
        newSuggestions.push({
          level: 'info',
          icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
          message: '暂无扩展字段数据',
        });
      }
      setSuggestions(newSuggestions);

      // 性能指标需要专门的监控 API
      setApiAvailable(false);
    } catch (error) {
      console.error('加载统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  }, [applicationName]);

  // 初始加载
  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  // 自动刷新（如启用）
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      loadStatistics();
    }, 30000); // 30秒刷新一次

    return () => clearInterval(timer);
  }, [autoRefresh, loadStatistics]);

  // 绘制简易趋势图
  const renderMiniTrend = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', height: 24, gap: 2 }}>
        {data.map((value, index) => {
          const height = ((value - min) / range) * 20 + 4;
          return (
            <div
              key={index}
              style={{
                width: 6,
                height,
                background: color,
                borderRadius: 2,
                opacity: 0.6 + (index / data.length) * 0.4,
              }}
            />
          );
        })}
      </div>
    );
  };

  const handleRefresh = () => {
    loadStatistics();
  };

  return (
    <Card
      title={
        <Space>
          <DashboardOutlined />
          <span>系统监控</span>
        </Space>
      }
      extra={
        <Space>
          <Text type="secondary">
            刷新: {autoRefresh ? '自动' : '手动'}
          </Text>
          <Button
            size="small"
            icon={<ReloadOutlined spin={loading} />}
            onClick={handleRefresh}
          >
            刷新
          </Button>
        </Space>
      }
    >
      {/* API 不可用提示 */}
      {!apiAvailable && (
        <Alert
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          message="性能监控 API 待接入"
          description="实时性能指标（查询耗时、缓存命中率等）需要后端提供专门的监控 API。当前仅显示字段统计信息。"
          style={{ marginBottom: 16 }}
        />
      )}

      {/* 实时性能指标 */}
      <Paragraph strong style={{ marginBottom: 16 }}>
        实时性能指标
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card size="small">
            <Statistic
              title="查询性能"
              value={metrics.avgQueryTime > 0 ? metrics.avgQueryTime.toFixed(0) : '-'}
              suffix={metrics.avgQueryTime > 0 ? 'ms' : ''}
              prefix={<FieldTimeOutlined />}
              valueStyle={{
                color: metrics.avgQueryTime === 0 ? '#999' : metrics.avgQueryTime < 150 ? '#52c41a' : metrics.avgQueryTime < 300 ? '#faad14' : '#f5222d',
              }}
            />
            <div style={{ marginTop: 8 }}>
              {metrics.queryTrend.length > 0 ? renderMiniTrend(metrics.queryTrend, '#667eea') : <Text type="secondary">暂无数据</Text>}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card size="small">
            <Statistic
              title="缓存命中率"
              value={metrics.cacheHitRate > 0 ? metrics.cacheHitRate.toFixed(1) : '-'}
              suffix={metrics.cacheHitRate > 0 ? '%' : ''}
              prefix={<ThunderboltOutlined />}
              valueStyle={{
                color: metrics.cacheHitRate === 0 ? '#999' : metrics.cacheHitRate > 90 ? '#52c41a' : metrics.cacheHitRate > 70 ? '#faad14' : '#f5222d',
              }}
            />
            <div style={{ marginTop: 8 }}>
              {metrics.cacheTrend.length > 0 ? renderMiniTrend(metrics.cacheTrend, '#4facfe') : <Text type="secondary">暂无数据</Text>}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 数据统计 */}
      <Paragraph strong style={{ marginBottom: 16 }}>
        数据统计
      </Paragraph>

      <List
        size="small"
        bordered
        style={{ marginBottom: 24 }}
        dataSource={[
          {
            icon: <DatabaseOutlined />,
            label: '数据总量',
            value: `${statistics.totalRecords.toLocaleString()} 条`,
          },
          {
            icon: <FileTextOutlined />,
            label: '物理列字段',
            value: `${statistics.physicalColumns} 个`,
          },
          {
            icon: <FileTextOutlined />,
            label: 'JSON 字段',
            value: `${statistics.jsonFields} 个`,
          },
          {
            icon: <LineChartOutlined />,
            label: 'Schema 版本',
            value: `v${statistics.schemaVersion}`,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Space>
              {item.icon}
              <Text>{item.label}:</Text>
            </Space>
            <Text strong>{item.value}</Text>
          </List.Item>
        )}
      />

      {/* 性能建议 */}
      <Paragraph strong style={{ marginBottom: 16 }}>
        性能建议
      </Paragraph>

      <Space direction="vertical" style={{ width: '100%' }}>
        {suggestions.map((suggestion, index) => (
          <Alert
            key={index}
            type={suggestion.level}
            icon={suggestion.icon}
            message={suggestion.message}
            showIcon
          />
        ))}
      </Space>

      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Button type="link" icon={<LineChartOutlined />}>
          查看详细报告
        </Button>
      </div>
    </Card>
  );
};

export default SystemMonitorPanel;
