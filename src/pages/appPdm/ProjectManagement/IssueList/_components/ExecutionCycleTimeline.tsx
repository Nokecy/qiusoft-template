import React, { useEffect, useState } from 'react';
import { Card, Collapse, Timeline, Tag, Empty, Spin, Space, Badge } from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import {
  ProjectIssueGetExecutionCyclesAsync,
  ProjectIssueGetExecutionRecordsAsync,
} from '@/services/pdm/ProjectIssue';

/**
 * 格式化日期
 */
const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * 格式化短日期（精确到分钟）
 */
const formatShortDate = (dateString?: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}-${day} ${hours}:${minutes}`;
};

/**
 * 执行周期数据结构
 */
interface ExecutionCycle {
  id: string;
  issueId: string;
  cycleNumber: number;
  startTime: string;
  endTime?: string;
  status: string;
}

/**
 * 执行记录数据结构
 */
interface ExecutionRecord {
  id: string;
  executionCycleId: string;
  recordType: number;
  recordTypeName: string;
  operatorName: string;
  operationTime: string;
  remark?: string;
  resolution?: string;
  fromUserName?: string;
  toUserName?: string;
  handlerName?: string;
  attachmentsJson?: string;
}

interface ExecutionCycleTimelineProps {
  issueId: string;
  onRefreshReady?: (refresh: () => void) => void;
}

/**
 * 操作类型映射
 */
const operationTypeMap: Record<number, { label: string; color: string }> = {
  0: { label: '创建', color: 'blue' },
  1: { label: '指派', color: 'purple' },
  2: { label: '确认接收', color: 'cyan' },
  3: { label: '开始处理', color: 'geekblue' },
  4: { label: '解决', color: 'green' },
  5: { label: '关闭', color: 'default' },
  6: { label: '激活', color: 'orange' },
  7: { label: '添加备注', color: 'default' },
  8: { label: '修改', color: 'processing' },
};

/**
 * 按执行周期分组的时间线组件
 */
const ExecutionCycleTimeline: React.FC<ExecutionCycleTimelineProps> = ({
  issueId,
  onRefreshReady,
}) => {
  const [loading, setLoading] = useState(false);
  const [cycles, setCycles] = useState<ExecutionCycle[]>([]);
  const [recordsByCycle, setRecordsByCycle] = useState<Record<string, ExecutionRecord[]>>({});
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, [issueId]);

  useEffect(() => {
    // 将刷新函数传递给父组件
    if (onRefreshReady) {
      onRefreshReady(loadData);
    }
  }, [onRefreshReady]);

  /**
   * 加载周期和执行记录数据
   */
  const loadData = async () => {
    if (!issueId) return;
    setLoading(true);
    try {
      const cyclesData = await ProjectIssueGetExecutionCyclesAsync({ issueId });
      setCycles(cyclesData || []);

      // 加载每个周期的执行记录
      const recordsMap: Record<string, ExecutionRecord[]> = {};
      for (const cycle of cyclesData || []) {
        const records = await ProjectIssueGetExecutionRecordsAsync({
          issueId,
          executionCycleId: cycle.id,
        });
        recordsMap[cycle.id] = records || [];
      }
      setRecordsByCycle(recordsMap);

      // 默认展开最新周期
      if (cyclesData && cyclesData.length > 0) {
        setActiveKeys([cyclesData[cyclesData.length - 1].id]);
      }
    } catch (error) {
      console.error('加载执行周期数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 渲染附件
   */
  const renderAttachments = (attachmentsJson?: string) => {
    if (!attachmentsJson) return null;

    try {
      const attachments = JSON.parse(attachmentsJson);
      if (!Array.isArray(attachments) || attachments.length === 0) return null;

      return (
        <div style={{ marginTop: 8 }}>
          <div style={{ color: '#666', marginBottom: 4 }}>
            <PaperClipOutlined /> 附件:
          </div>
          {attachments.map((attachmentId: string, index: number) => (
            <div key={index} style={{ marginLeft: 16 }}>
              <a
                href={`/api/attachmentManage/attachment/download/${attachmentId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                附件{index + 1}
              </a>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error('解析附件JSON失败:', error);
      return null;
    }
  };

  /**
   * 渲染时间线项
   */
  const renderTimelineItem = (record: ExecutionRecord) => {
    const typeConfig = operationTypeMap[record.recordType] || {
      label: record.recordTypeName || `操作${record.recordType}`,
      color: 'default',
    };

    return {
      color: typeConfig.color,
      children: (
        <div style={{ paddingBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <Tag color={typeConfig.color}>{typeConfig.label}</Tag>
            <span style={{ marginLeft: 8, color: '#666' }}>
              <UserOutlined /> {record.operatorName}
            </span>
            <span style={{ marginLeft: 16, color: '#999', fontSize: 12 }}>
              <ClockCircleOutlined /> {formatDate(record.operationTime)}
            </span>
          </div>

          {/* 指派操作显示处理人信息 */}
          {record.recordType === 1 && (
            <div style={{ marginBottom: 4, color: '#666' }}>
              {record.fromUserName && record.toUserName ? (
                <>
                  从 <strong>{record.fromUserName}</strong> 转派至{' '}
                  <strong>{record.toUserName}</strong>
                </>
              ) : record.handlerName ? (
                <>
                  指派给 <strong>{record.handlerName}</strong>
                </>
              ) : null}
            </div>
          )}

          {/* 解决方案 - 解决操作显示 */}
          {record.recordType === 4 && record.resolution && (
            <div style={{ marginTop: 8, marginBottom: 8 }}>
              <div style={{ color: '#666', marginBottom: 4, fontWeight: 500 }}>
                <FileTextOutlined /> 解决方案:
              </div>
              <div
                style={{
                  marginLeft: 16,
                  padding: '8px 12px',
                  background: '#f5f5f5',
                  borderRadius: 4,
                  color: '#333',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {record.resolution}
              </div>
            </div>
          )}

          {/* 备注信息 */}
          {record.remark && (
            <div style={{ marginTop: 8 }}>
              <div style={{ color: '#666', marginBottom: 4 }}>备注:</div>
              <div style={{ color: '#666', marginLeft: 16 }}>{record.remark}</div>
            </div>
          )}

          {/* 附件列表 */}
          {renderAttachments(record.attachmentsJson)}
        </div>
      ),
    };
  };

  /**
   * 渲染周期面板
   */
  const renderCyclePanel = (cycle: ExecutionCycle): CollapseProps['items'][0] => {
    const records = recordsByCycle[cycle.id] || [];
    const isActive = cycle.status === 'InProgress';

    return {
      key: cycle.id,
      label: (
        <Space>
          <Badge
            status={isActive ? 'processing' : 'success'}
            text={
              <span style={{ fontWeight: 500, fontSize: 14 }}>
                第 {cycle.cycleNumber} 个执行周期
              </span>
            }
          />
          {isActive ? (
            <Tag icon={<SyncOutlined spin />} color="processing">
              进行中
            </Tag>
          ) : (
            <Tag icon={<CheckCircleOutlined />} color="success">
              已完成
            </Tag>
          )}
        </Space>
      ),
      extra: (
        <Space size="large" onClick={(e) => e.stopPropagation()}>
          <span style={{ fontSize: 12, color: '#999' }}>
            开始: {formatShortDate(cycle.startTime)}
          </span>
          {cycle.endTime && (
            <span style={{ fontSize: 12, color: '#999' }}>
              结束: {formatShortDate(cycle.endTime)}
            </span>
          )}
          <span style={{ fontSize: 12, color: '#666' }}>
            {records.length} 条记录
          </span>
        </Space>
      ),
      children: (
        <div style={{ padding: '16px 0' }}>
          {records.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无执行记录"
            />
          ) : (
            <Timeline items={records.map(renderTimelineItem)} />
          )}
        </div>
      ),
    };
  };

  return (
    <Card title="执行历史" bordered={false}>
      <Spin spinning={loading}>
        {cycles.length === 0 ? (
          <Empty description="暂无执行周期" />
        ) : (
          <Collapse
            activeKey={activeKeys}
            onChange={(keys) => setActiveKeys(keys as string[])}
            items={cycles.map(renderCyclePanel)}
          />
        )}
      </Spin>
    </Card>
  );
};

export default ExecutionCycleTimeline;
