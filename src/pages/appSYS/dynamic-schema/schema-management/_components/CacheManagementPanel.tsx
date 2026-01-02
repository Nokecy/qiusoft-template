/**
 * Schema 管理 - 缓存管理面板
 * 注：缓存管理功能需要后端提供专门的 API 支持
 * 当前使用本地模拟，待后端 API 就绪后可替换
 */
import React, { useState, useCallback } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Radio,
  Alert,
  List,
  Space,
  Typography,
  message,
  Popconfirm,
  Empty,
} from 'antd';
import {
  CloudSyncOutlined,
  DeleteOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;

interface CacheManagementPanelProps {
  applicationName: string;
}

interface CacheStats {
  schemaCache: { count: number; size: string };
  dataCache: { count: number; size: string };
}

interface ClearRecord {
  time: string;
  operator: string;
  type: 'schema' | 'data' | 'all';
}

const CacheManagementPanel: React.FC<CacheManagementPanelProps> = ({ applicationName }) => {
  const [loading, setLoading] = useState(false);
  const [clearScope, setClearScope] = useState<'current' | 'all'>('current');
  const [cacheStats, setCacheStats] = useState<CacheStats>({
    schemaCache: { count: 0, size: '- MB' },
    dataCache: { count: 0, size: '- MB' },
  });
  const [clearHistory, setClearHistory] = useState<ClearRecord[]>([]);
  const [apiAvailable, setApiAvailable] = useState(false);

  // 加载缓存统计
  // 注：需要后端提供专门的缓存统计 API
  const loadCacheStats = useCallback(async () => {
    if (!applicationName) return;

    setLoading(true);
    try {
      // TODO: 当后端提供缓存统计 API 后，替换此处代码
      // const result = await CacheManagementGetStatsAsync({ applicationName });
      // setCacheStats(result);
      // setApiAvailable(true);

      // 当前显示提示信息
      setApiAvailable(false);
    } catch (error) {
      message.error('加载缓存统计失败');
    } finally {
      setLoading(false);
    }
  }, [applicationName]);

  // 清除 Schema 缓存
  const handleClearSchemaCache = async () => {
    setLoading(true);
    try {
      // TODO: 当后端提供缓存清除 API 后，替换此处代码
      // await CacheManagementClearSchemaCacheAsync({
      //   applicationName: clearScope === 'current' ? applicationName : undefined,
      // });

      // 模拟清除操作
      await new Promise((r) => setTimeout(r, 1000));

      message.success('Schema 缓存已清除');

      // 更新统计和历史
      setCacheStats((s) => ({
        ...s,
        schemaCache: { count: 0, size: '0 MB' },
      }));
      setClearHistory((h) => [
        { time: dayjs().format('YYYY-MM-DD HH:mm'), operator: '当前用户', type: 'schema' },
        ...h.slice(0, 9), // 保留最近 10 条
      ]);
    } catch (error: any) {
      message.error('清除缓存失败: ' + (error?.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  // 清除数据缓存
  const handleClearDataCache = async () => {
    setLoading(true);
    try {
      // TODO: 当后端提供缓存清除 API 后，替换此处代码
      // await CacheManagementClearDataCacheAsync({
      //   applicationName: clearScope === 'current' ? applicationName : undefined,
      // });

      // 模拟清除操作
      await new Promise((r) => setTimeout(r, 1000));

      message.success('数据缓存已清除');

      // 更新统计和历史
      setCacheStats((s) => ({
        ...s,
        dataCache: { count: 0, size: '0 MB' },
      }));
      setClearHistory((h) => [
        { time: dayjs().format('YYYY-MM-DD HH:mm'), operator: '当前用户', type: 'data' },
        ...h.slice(0, 9), // 保留最近 10 条
      ]);
    } catch (error: any) {
      message.error('清除缓存失败: ' + (error?.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const getCacheTypeText = (type: string) => {
    switch (type) {
      case 'schema':
        return 'Schema 缓存';
      case 'data':
        return '数据缓存';
      case 'all':
        return '全部缓存';
      default:
        return type;
    }
  };

  return (
    <Card
      title={
        <Space>
          <CloudSyncOutlined />
          <span>缓存管理</span>
        </Space>
      }
      extra={
        <Button icon={<ReloadOutlined />} onClick={loadCacheStats} loading={loading}>
          刷新
        </Button>
      }
    >
      {/* API 不可用提示 */}
      {!apiAvailable && (
        <Alert
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          message="缓存管理 API 待接入"
          description="当前缓存管理功能需要后端提供专门的 API 支持。清除缓存操作为模拟演示，实际效果需后端配合。"
          style={{ marginBottom: 16 }}
        />
      )}

      {/* 缓存统计 */}
      <Paragraph strong style={{ marginBottom: 16 }}>
        缓存统计
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 8,
            }}
          >
            <Statistic
              title={<Text style={{ color: 'rgba(255,255,255,0.85)' }}>Schema 缓存</Text>}
              value={cacheStats.schemaCache.count}
              suffix="项"
              valueStyle={{ color: '#fff' }}
              prefix={<FileTextOutlined />}
            />
            <Text style={{ color: 'rgba(255,255,255,0.65)' }}>{cacheStats.schemaCache.size}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderRadius: 8,
            }}
          >
            <Statistic
              title={<Text style={{ color: 'rgba(255,255,255,0.85)' }}>数据缓存</Text>}
              value={cacheStats.dataCache.count}
              suffix="项"
              valueStyle={{ color: '#fff' }}
              prefix={<DatabaseOutlined />}
            />
            <Text style={{ color: 'rgba(255,255,255,0.65)' }}>{cacheStats.dataCache.size}</Text>
          </Card>
        </Col>
      </Row>

      {/* 缓存操作 */}
      <Paragraph strong style={{ marginBottom: 16 }}>
        缓存操作
      </Paragraph>

      <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }}>
        <Radio.Group value={clearScope} onChange={(e) => setClearScope(e.target.value)}>
          <Radio value="current">当前应用</Radio>
          <Radio value="all">全部应用</Radio>
        </Radio.Group>

        <Alert
          type="info"
          showIcon
          message="清除缓存后，下次访问可能需要更长加载时间"
        />

        <Space>
          <Popconfirm
            title="确定清除 Schema 缓存?"
            description={`将清除${clearScope === 'current' ? '当前应用' : '全部应用'}的 Schema 缓存`}
            onConfirm={handleClearSchemaCache}
            okText="确认"
            cancelText="取消"
          >
            <Button icon={<DeleteOutlined />} loading={loading}>
              清除 Schema 缓存
            </Button>
          </Popconfirm>

          <Popconfirm
            title="确定清除数据缓存?"
            description={`将清除${clearScope === 'current' ? '当前应用' : '全部应用'}的数据缓存`}
            onConfirm={handleClearDataCache}
            okText="确认"
            cancelText="取消"
          >
            <Button icon={<DeleteOutlined />} loading={loading}>
              清除数据缓存
            </Button>
          </Popconfirm>
        </Space>
      </Space>

      {/* 清除记录 */}
      <Paragraph strong style={{ marginBottom: 16 }}>
        最近清除记录
      </Paragraph>

      <List
        size="small"
        dataSource={clearHistory.slice(0, 5)}
        renderItem={(item) => (
          <List.Item>
            <Space>
              <ClockCircleOutlined />
              <Text type="secondary">{item.time}</Text>
              <Text>-</Text>
              <Space>
                <UserOutlined />
                {item.operator}
              </Space>
              <Text>-</Text>
              <Text>{getCacheTypeText(item.type)}</Text>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CacheManagementPanel;
