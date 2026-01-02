import React, { useEffect, useState } from 'react';
import { Timeline, Card, Tag, Empty, Spin, Image, message } from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { request } from 'umi';
import { ProjectIssueGetExecutionRecordsAsync } from '@/services/pdm/ProjectIssue';

/**
 * 格式化日期
 */
const formatDate = (dateString: string) => {
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
 * 附件信息接口
 */
interface AttachmentInfo {
  blobName?: string;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  contentType?: string;
  description?: string;
  uploadTime?: string;
  // 兼容旧格式字段
  name?: string;
  url?: string;
  type?: string;
  size?: number;
}

interface ExecutionRecord {
  id: string;
  recordType: number;
  recordTypeName: string;
  operatorName: string;
  operationTime: string;
  remark?: string;
  fromUserName?: string;
  toUserName?: string;
  attachmentsJson?: string;
  attachments?: AttachmentInfo[];
}

interface ExecutionTimelineProps {
  issueId: string;
  onRefreshReady?: (refresh: () => void) => void;
  extra?: React.ReactNode;
}

/**
 * 操作类型映射
 */
const operationTypeMap: Record<number, { label: string; color: string; icon: any }> = {
  0: { label: '创建', color: 'blue', icon: <FileTextOutlined /> },
  1: { label: '指派', color: 'purple', icon: <UserOutlined /> },
  2: { label: '确认', color: 'cyan', icon: <ClockCircleOutlined /> },
  3: { label: '解决', color: 'green', icon: <ClockCircleOutlined /> },
  4: { label: '关闭', color: 'default', icon: <ClockCircleOutlined /> },
  5: { label: '激活', color: 'orange', icon: <ClockCircleOutlined /> },
  6: { label: '备注', color: 'default', icon: <FileTextOutlined /> },
  7: { label: '修改', color: 'processing', icon: <FileTextOutlined /> },
};

/**
 * 执行记录时间线组件
 */
const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({ issueId, onRefreshReady, extra }) => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<ExecutionRecord[]>([]);

  useEffect(() => {
    loadRecords();
  }, [issueId]);

  useEffect(() => {
    // 将刷新函数传递给父组件
    if (onRefreshReady) {
      onRefreshReady(loadRecords);
    }
  }, [onRefreshReady]);

  const loadRecords = async () => {
    if (!issueId) return;
    setLoading(true);
    try {
      const data = await ProjectIssueGetExecutionRecordsAsync({ issueId });
      setRecords(data || []);
    } catch (error) {
      console.error('加载执行记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 带认证的文件下载
   */
  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      message.loading({ content: '正在下载...', key: 'download' });
      const blob = await request<Blob>(fileUrl, {
        method: 'GET',
        responseType: 'blob',
      });

      // 创建临时下载链接
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success({ content: '下载完成', key: 'download' });
    } catch (error) {
      console.error('下载附件失败:', error);
      message.error({ content: '下载失败', key: 'download' });
    }
  };

  /**
   * 渲染附件列表
   * 支持新格式(attachments数组)和旧格式(attachmentsJson字符串)
   */
  const renderAttachments = (record: ExecutionRecord) => {
    // 优先使用后端已解析好的 attachments 数组
    let attachments: AttachmentInfo[] = record.attachments || [];

    // 兼容旧数据：解析 attachmentsJson 字符串
    if (attachments.length === 0 && record.attachmentsJson) {
      try {
        const parsed = JSON.parse(record.attachmentsJson);
        if (Array.isArray(parsed)) {
          attachments = parsed;
        }
      } catch (error) {
        console.error('解析附件JSON失败:', error);
      }
    }

    if (attachments.length === 0) return null;

    return (
      <div style={{ marginTop: 8 }}>
        <div style={{ color: '#666', marginBottom: 4 }}>
          <PaperClipOutlined /> 附件:
        </div>
        {attachments.map((file: AttachmentInfo, index: number) => {
          // 统一字段名：支持新格式和旧格式
          const fileName = file.fileName || file.name || '未知文件';
          const fileUrl = file.fileUrl || file.url || '';
          const fileType = file.contentType || file.type || '';
          const fileSize = file.fileSize || file.size || 0;

          return (
            <div key={index} style={{ marginLeft: 16, marginBottom: 8 }}>
              {fileType.startsWith('image/') ? (
                // 图片预览 - 点击下载
                <span>
                  <a
                    onClick={() => handleDownload(fileUrl, fileName)}
                    style={{ cursor: 'pointer', color: '#1890ff' }}
                  >
                    <DownloadOutlined style={{ marginRight: 4 }} />
                    {fileName} {fileSize ? `(${(fileSize / 1024).toFixed(2)} KB)` : ''}
                  </a>
                </span>
              ) : (
                // 其他文件 - 点击下载
                <a
                  onClick={() => handleDownload(fileUrl, fileName)}
                  style={{ cursor: 'pointer', color: '#1890ff' }}
                >
                  <DownloadOutlined style={{ marginRight: 4 }} />
                  {fileName} {fileSize ? `(${(fileSize / 1024).toFixed(2)} KB)` : ''}
                </a>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * 渲染时间线项
   */
  const renderTimelineItem = (record: ExecutionRecord) => {
    const typeConfig = operationTypeMap[record.recordType] || {
      label: record.recordTypeName || `操作${record.recordType}`,
      color: 'default',
      icon: <ClockCircleOutlined />,
    };

    return {
      dot: typeConfig.icon,
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

          {/* 指派操作显示转派信息 */}
          {record.recordType === 1 && record.fromUserName && record.toUserName && (
            <div style={{ marginBottom: 4, color: '#666' }}>
              从 <strong>{record.fromUserName}</strong> 转派至 <strong>{record.toUserName}</strong>
            </div>
          )}

          {/* 备注信息 */}
          {record.remark && (
            <div style={{ color: '#666', marginTop: 4 }}>{record.remark}</div>
          )}

          {/* 附件列表 */}
          {renderAttachments(record)}
        </div>
      ),
    };
  };

  return (
    <Card title="执行记录" bordered={false} extra={extra}>
      <Spin spinning={loading}>
        {records.length === 0 ? (
          <Empty description="暂无执行记录" />
        ) : (
          <Timeline items={records.map(renderTimelineItem)} />
        )}
      </Spin>
    </Card>
  );
};

export default ExecutionTimeline;
