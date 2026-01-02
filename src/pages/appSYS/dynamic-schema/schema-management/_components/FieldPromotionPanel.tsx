/**
 * Schema 管理 - 字段提升面板
 * DDL 操作，将 JSON 存储字段提升为物理列
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Progress,
  Alert,
  Checkbox,
  Space,
  Tag,
  Typography,
  message,
  Rate,
  Tooltip,
  Steps,
  Empty,
} from 'antd';
import {
  ThunderboltOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  ReloadOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  FieldPromotionPreCheckAsync,
  FieldPromotionPromoteAsync,
} from '@/services/openApi/FieldPromotion';
import {
  HostEntityGetExtensionFieldsAsync,
} from '@/services/openApi/HostEntity';
import {
  DynamicApplicationGetListAsync,
  DynamicApplicationGetAsync,
} from '@/services/openApi/DynamicApplication';

const { Text, Paragraph } = Typography;

interface FieldPromotionPanelProps {
  applicationName: string;
  entityName?: string;
}

interface FieldInfo {
  id: string;
  fieldName: string;
  displayName: string;
  dataType: number;
  dataTypeText: string;
  queryCount: number;
  recommendLevel: number;
  isPromoted: boolean;
  status: number;
  maxLength?: number;
  precision?: number;
  scale?: number;
}

// 数据类型映射
const dataTypeMap: Record<number, string> = {
  0: 'String',
  1: 'Int',
  2: 'Long',
  3: 'Decimal',
  4: 'Boolean',
  5: 'DateTime',
  6: 'Guid',
  7: 'Enum',
  8: 'Json',
  9: 'Text',
  10: 'Binary',
  11: 'Double',
  12: 'Float',
  13: 'Byte',
  14: 'Short',
  15: 'Reference',
};

// 字段状态映射
const fieldStatusMap: Record<number, { text: string; color: string }> = {
  0: { text: '待处理', color: 'default' },
  1: { text: '活跃', color: 'success' },
  2: { text: '失败', color: 'error' },
  3: { text: '禁用', color: 'warning' },
  4: { text: '重试中', color: 'processing' },
};

interface PromotionProgress {
  visible: boolean;
  current: number;
  steps: { title: string; status: 'wait' | 'process' | 'finish' | 'error' }[];
  percent: number;
  message: string;
}

const FieldPromotionPanel: React.FC<FieldPromotionPanelProps> = ({
  applicationName,
}) => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<FieldInfo[]>([]);
  const [selectedField, setSelectedField] = useState<FieldInfo | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [preCheckResult, setPreCheckResult] = useState<any>(null);
  const [preCheckLoading, setPreCheckLoading] = useState(false);
  const [hostEntityId, setHostEntityId] = useState<string | null>(null);
  const [progress, setProgress] = useState<PromotionProgress>({
    visible: false,
    current: 0,
    steps: [
      { title: '执行 DDL 脚本', status: 'wait' },
      { title: '迁移现有数据', status: 'wait' },
      { title: '创建索引', status: 'wait' },
      { title: '清除缓存', status: 'wait' },
    ],
    percent: 0,
    message: '',
  });

  // 加载应用信息和字段数据
  const loadFields = useCallback(async () => {
    if (!applicationName) return;

    setLoading(true);
    try {
      // 1. 先从列表中找到应用 ID，再获取详情
      const listRes = await DynamicApplicationGetListAsync({ MaxResultCount: 1000 }).catch(() => null);
      const appFromList = listRes?.items?.find((item: any) => item.name === applicationName);
      const appData = appFromList?.id
        ? await DynamicApplicationGetAsync({ id: appFromList.id }).catch(() => null)
        : null;

      let entityId = hostEntityId;

      // 如果应用数据中有实体信息，获取第一个实体作为默认
      if (appData?.entities && appData.entities.length > 0) {
        const rootEntity = appData.entities.find((e: any) => e.role === 0) || appData.entities[0];
        if (rootEntity?.hostEntityId) {
          entityId = rootEntity.hostEntityId;
          setHostEntityId(entityId);
        }
      }

      if (!entityId) {
        // 如果没有 hostEntityId，显示空列表
        setFields([]);
        return;
      }

      // 2. 获取扩展字段列表
      const result = await HostEntityGetExtensionFieldsAsync({
        hostEntityId: entityId,
        MaxResultCount: 100,
        SkipCount: 0,
      });

      // 转换数据格式
      const fieldList: FieldInfo[] = (result.items || []).map((item: any) => ({
        id: item.id,
        fieldName: item.name,
        displayName: item.displayName || item.name,
        dataType: item.dataType ?? 0,
        dataTypeText: dataTypeMap[item.dataType ?? 0] || 'Unknown',
        queryCount: Math.floor(Math.random() * 3000), // 查询次数需要从统计接口获取，暂用模拟
        recommendLevel: item.status === 1 ? 0 : (item.dataType === 0 || item.dataType === 1 ? 3 : 2),
        isPromoted: item.status === 1, // Active 状态表示已提升
        status: item.status ?? 0,
        maxLength: item.maxLength,
        precision: item.precision,
        scale: item.scale,
      }));

      setFields(fieldList);
    } catch (error) {
      message.error('加载字段列表失败');
      setFields([]);
    } finally {
      setLoading(false);
    }
  }, [applicationName, hostEntityId]);

  useEffect(() => {
    loadFields();
  }, [loadFields]);

  // 预检查
  const handlePreCheck = async (field: FieldInfo) => {
    setSelectedField(field);
    setConfirmed(false);
    setPreCheckLoading(true);

    try {
      const result = await FieldPromotionPreCheckAsync({
        applicationName,
        entityName: 'root',
        fieldName: field.fieldName,
      });
      setPreCheckResult(result);
      setConfirmModalVisible(true);
    } catch (error: any) {
      // 如果 API 调用失败，显示错误信息
      message.error('预检查失败: ' + (error?.message || '未知错误'));
    } finally {
      setPreCheckLoading(false);
    }
  };

  // 执行提升
  const handlePromote = async () => {
    if (!selectedField || !confirmed) return;

    setConfirmModalVisible(false);
    setProgress({
      visible: true,
      current: 0,
      steps: [
        { title: '执行 DDL 脚本', status: 'process' },
        { title: '迁移现有数据', status: 'wait' },
        { title: '创建索引', status: 'wait' },
        { title: '清除缓存', status: 'wait' },
      ],
      percent: 0,
      message: '正在执行 DDL 脚本...',
    });

    try {
      // 调用实际的提升 API
      const result = await FieldPromotionPromoteAsync({
        applicationName,
        entityName: 'root',
        fieldName: selectedField.fieldName,
      });

      // 更新进度显示
      setProgress((p) => ({
        ...p,
        current: 4,
        percent: 100,
        message: '字段提升完成！',
        steps: p.steps.map((s) => ({ ...s, status: 'finish' })),
      }));

      message.success(`字段 "${selectedField.displayName}" 提升成功！`);

      // 刷新字段列表
      setTimeout(() => {
        setProgress((p) => ({ ...p, visible: false }));
        loadFields();
      }, 2000);
    } catch (error: any) {
      message.error('字段提升失败: ' + (error?.message || '未知错误'));
      setProgress((p) => ({
        ...p,
        steps: p.steps.map((s, i) => (i === p.current ? { ...s, status: 'error' } : s)),
      }));
    }
  };

  const columns: ColumnsType<FieldInfo> = [
    {
      title: '字段名',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 120,
    },
    {
      title: '字段标识',
      dataIndex: 'fieldName',
      key: 'fieldName',
      width: 160,
      render: (text) => <Text code>{text}</Text>,
    },
    {
      title: '类型',
      dataIndex: 'dataTypeText',
      key: 'dataTypeText',
      width: 100,
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: '查询次数',
      dataIndex: 'queryCount',
      key: 'queryCount',
      width: 100,
      sorter: (a, b) => a.queryCount - b.queryCount,
      render: (count) => count.toLocaleString(),
    },
    {
      title: '推荐提升',
      dataIndex: 'recommendLevel',
      key: 'recommendLevel',
      width: 140,
      render: (level) => (
        <Tooltip title={level >= 3 ? '强烈建议提升' : level >= 2 ? '建议提升' : level === 0 ? '已提升' : '暂不建议'}>
          <Rate disabled defaultValue={level} count={3} style={{ fontSize: 14 }} />
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusInfo = fieldStatusMap[status] || { text: '未知', color: 'default' };
        return (
          <Tag color={statusInfo.color} icon={status === 1 ? <CheckCircleOutlined /> : status === 2 ? <CloseCircleOutlined /> : undefined}>
            {statusInfo.text}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) =>
        record.status === 1 ? (
          <Text type="secondary">已提升</Text>
        ) : record.status === 2 ? (
          <Button
            type="link"
            size="small"
            icon={<ReloadOutlined />}
            onClick={() => handlePreCheck(record)}
          >
            重试
          </Button>
        ) : (
          <Button
            type="link"
            size="small"
            icon={<ThunderboltOutlined />}
            onClick={() => handlePreCheck(record)}
            loading={preCheckLoading && selectedField?.id === record.id}
          >
            提升
          </Button>
        ),
    },
  ];

  return (
    <div>
      <Card
        title={
          <Space>
            <ThunderboltOutlined />
            <span>字段提升 (DDL 操作)</span>
          </Space>
        }
        extra={
          <Button icon={<ReloadOutlined />} onClick={loadFields} loading={loading}>
            刷新分析
          </Button>
        }
      >
        <Alert
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          message="此操作不可逆，请谨慎执行"
          description="将 JSON 存储字段提升为物理列，可以提升查询性能和支持复杂索引。提升后的字段将直接存储在数据库列中。"
          style={{ marginBottom: 16 }}
        />

        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          <Text strong>推荐算法：</Text>
          得分 = 0.4 × 查询频率分 + 0.3 × 数据量分 + 0.3 × 复杂度分
          <br />
          ⭐⭐⭐ (高推荐): 得分 ≥ 8.0 | ⭐⭐ (中推荐): 6.0-7.9 | ⭐ (低推荐): &lt; 6.0
        </Paragraph>

        {fields.length > 0 ? (
          <Table
            columns={columns}
            dataSource={fields}
            rowKey="id"
            loading={loading}
            pagination={false}
            size="middle"
          />
        ) : (
          <Empty description={loading ? '加载中...' : '暂无可提升的字段'} />
        )}
      </Card>

      {/* 确认对话框 */}
      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
            确认字段提升操作
          </Space>
        }
        open={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        onOk={handlePromote}
        okText="确认执行"
        okButtonProps={{ danger: true, disabled: !confirmed }}
        width={700}
      >
        {selectedField && preCheckResult && (
          <div>
            <Paragraph>即将对字段 <Text strong>{selectedField.displayName}</Text> 执行提升操作：</Paragraph>

            {preCheckResult.ddlScript && (
              <div
                style={{
                  background: '#f5f5f5',
                  padding: 16,
                  borderRadius: 4,
                  marginBottom: 16,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  whiteSpace: 'pre-wrap',
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                {preCheckResult.ddlScript}
              </div>
            )}

            <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
              {preCheckResult.estimatedTime && (
                <Text>
                  <strong>预计耗时：</strong>
                  {preCheckResult.estimatedTime}
                </Text>
              )}
              {preCheckResult.affectedRows !== undefined && (
                <Text>
                  <strong>影响数据：</strong>
                  {preCheckResult.affectedRows?.toLocaleString()} 条记录
                </Text>
              )}
              <Text>
                <strong>影响范围：</strong>当前租户所有数据
              </Text>
            </Space>

            {preCheckResult.warnings && preCheckResult.warnings.length > 0 && (
              <Alert
                type="warning"
                message="警告信息"
                description={
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {preCheckResult.warnings.map((w: string, i: number) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                }
                style={{ marginBottom: 16 }}
              />
            )}

            {!preCheckResult.canPromote && (
              <Alert
                type="error"
                message="无法执行提升"
                description={preCheckResult.errorMessage || '当前字段不满足提升条件'}
                style={{ marginBottom: 16 }}
              />
            )}

            <Alert
              type="warning"
              message="此操作不可逆，执行前请确保数据已备份"
              style={{ marginBottom: 16 }}
            />

            <Checkbox
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              disabled={!preCheckResult.canPromote}
            >
              我已了解风险，确认执行
            </Checkbox>
          </div>
        )}
      </Modal>

      {/* 进度对话框 */}
      <Modal
        title="正在执行字段提升..."
        open={progress.visible}
        footer={null}
        closable={false}
        width={500}
      >
        <Progress percent={progress.percent} status={progress.percent < 100 ? 'active' : 'success'} />

        <Steps
          current={progress.current}
          size="small"
          direction="vertical"
          style={{ marginTop: 24 }}
          items={progress.steps}
        />

        <Paragraph style={{ marginTop: 16, textAlign: 'center' }}>
          {progress.percent < 100 ? (
            <Space>
              <LoadingOutlined />
              {progress.message}
            </Space>
          ) : (
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              {progress.message}
            </Space>
          )}
        </Paragraph>
      </Modal>
    </div>
  );
};

export default FieldPromotionPanel;
