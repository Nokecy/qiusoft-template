import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Descriptions, Tag, Table } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { ProjectChangeGetAsync } from '@/services/pdm/ProjectChange';
import { AttachmentBlobDownloadByBlobNameAsync } from '@/services/attachment/AttachmentBlob';
import { ToolBar } from '@/components';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';

// 变更类型枚举
const changeTypeMap: Record<number, { text: string; color: string }> = {
  0: { text: '范围变更', color: 'blue' },
  10: { text: '进度变更', color: 'cyan' },
  20: { text: '成本变更', color: 'orange' },
  30: { text: '质量变更', color: 'purple' },
  40: { text: '资源变更', color: 'green' },
  99: { text: '其他', color: 'default' },
};

// 优先级枚举
const priorityMap: Record<number, { text: string; color: string }> = {
  0: { text: '低', color: 'default' },
  10: { text: '中', color: 'warning' },
  20: { text: '高', color: 'error' },
  30: { text: '紧急', color: 'error' },
};

const ProjectChangeDetail: React.FC = () => {
  const { id: changeId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/ProjectChangeList/detail',
    ['id']
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    if (changeId) {
      loadData();
    }
  }, [isActive, hasChanged, changeId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ProjectChangeGetAsync({ id: changeId });
      setData(res);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ProjectManagement/ProjectChangeList');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 下载附件
  const handleDownload = async (record: any) => {
    try {
      const blob = await AttachmentBlobDownloadByBlobNameAsync({ blobName: record.blobName });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = record.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      message.success('下载成功');
    } catch (error) {
      message.error('下载失败');
    }
  };

  // 预览附件（仅图片）
  const handlePreview = async (record: any) => {
    if (!record.contentType?.startsWith('image/')) {
      message.warning('仅支持预览图片文件');
      return;
    }
    try {
      const blob = await AttachmentBlobDownloadByBlobNameAsync({ blobName: record.blobName });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      message.error('预览失败');
    }
  };

  return (
    <Spin spinning={loading}>
      <Card
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title="项目变更单详情"
        extra={
          <ToolBar>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              返回
            </Button>
          </ToolBar>
        }
      >
        {data && (
          <>
            {/* 工作流信息 */}
            {data.workflowInstanceId && (
              <>
                <WorkflowInstanceInfo
                  correlationData={data}
                  workflowInstanceId={data.workflowInstanceId}
                />
                <WorkflowExecutionCorrelationList
                  workflowData={{
                    correlationId: data.correlationId,
                    workflowDefinitionId: data.workflowDefinitionId,
                  }}
                />
              </>
            )}

            {/* 基础信息 */}
            <Descriptions column={2} bordered style={{ marginTop: data.workflowInstanceId ? 16 : 0 }}>
              <Descriptions.Item label="变更名称" span={2}>{data.name || '-'}</Descriptions.Item>

              <Descriptions.Item label="关联项目">{data.projectName || data.projectCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="申请人">{data.requesterName || data.requesterCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="负责人">{data.ownerName || data.ownerCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="计划实施日期">{data.plannedImplementationDate || '-'}</Descriptions.Item>

              <Descriptions.Item label="变更类型">
                {changeTypeMap[data.changeType] ? (
                  <Tag color={changeTypeMap[data.changeType].color}>{changeTypeMap[data.changeType].text}</Tag>
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="优先级">
                {priorityMap[data.priority] ? (
                  <Tag color={priorityMap[data.priority].color}>{priorityMap[data.priority].text}</Tag>
                ) : '-'}
              </Descriptions.Item>

              <Descriptions.Item label="变更描述" span={2}>{data.description || '-'}</Descriptions.Item>

              <Descriptions.Item label="变更原因" span={2}>{data.reason || '-'}</Descriptions.Item>

              <Descriptions.Item label="影响分析" span={2}>{data.impactAnalysis || '-'}</Descriptions.Item>
            </Descriptions>

            {/* 附件 */}
            {data.attachments && data.attachments.length > 0 && (
              <Card title="附件" style={{ marginTop: 16 }} size="small">
                <Table
                  dataSource={data.attachments}
                  pagination={false}
                  rowKey={(record) => record.blobName || record.id}
                  locale={{ emptyText: '暂无附件' }}
                  columns={[
                    { title: '文件名', dataIndex: 'fileName' },
                    {
                      title: '文件大小',
                      dataIndex: 'fileSize',
                      render: (size: number) => {
                        if (!size) return '-';
                        if (size < 1024) return `${size} B`;
                        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
                        return `${(size / 1024 / 1024).toFixed(2)} MB`;
                      }
                    },
                    { title: '上传时间', dataIndex: 'creationTime' },
                    {
                      title: '操作',
                      width: 150,
                      render: (_, record) => (
                        <>
                          {record.contentType?.startsWith('image/') && (
                            <Button
                              type="link"
                              size="small"
                              icon={<EyeOutlined />}
                              onClick={() => handlePreview(record)}
                            >
                              预览
                            </Button>
                          )}
                          <Button
                            type="link"
                            size="small"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownload(record)}
                          >
                            下载
                          </Button>
                        </>
                      ),
                    },
                  ]}
                />
              </Card>
            )}
          </>
        )}
      </Card>
    </Spin>
  );
};

export default ProjectChangeDetail;

export const routeProps = {
  name: '项目变更单详情',
};
