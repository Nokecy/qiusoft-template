import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Descriptions, Table } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { RationalizationProposalGetAsync } from '@/services/pdm/RationalizationProposal';
import { AttachmentBlobDownloadByBlobNameAsync } from '@/services/attachment/AttachmentBlob';
import { ToolBar } from '@/components';
import dayjs from 'dayjs';

const RationalizationProposalDetail: React.FC = () => {
  const { id: proposalId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/RationalizationProposalList/detail',
    ['id']
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    if (proposalId) {
      loadData();
    }
  }, [isActive, hasChanged, proposalId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await RationalizationProposalGetAsync({ id: proposalId });
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
    history.push('/appPdm/ProjectManagement/RationalizationProposalList');
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
        title="合理化建议详情"
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
            {/* 基础信息 */}
            <Descriptions column={2} bordered>
              <Descriptions.Item label="建议主题" span={2}>{data.proposalTitle || '-'}</Descriptions.Item>

              <Descriptions.Item label="提出人">{data.proposerUserName || data.proposerUserId || '-'}</Descriptions.Item>
              <Descriptions.Item label="提出时间">{data.proposedDate ? dayjs(data.proposedDate).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>

              <Descriptions.Item label="参与人" span={2}>{data.participantNames || '-'}</Descriptions.Item>

              <Descriptions.Item label="关联项目" span={2}>{data.projectName || data.projectCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="建议描述" span={2}>{data.description || '-'}</Descriptions.Item>
            </Descriptions>

            {/* 任务列表 */}
            {data.tasks && data.tasks.length > 0 && (
              <Card title="下发任务" style={{ marginTop: 16 }} size="small">
                <Table
                  dataSource={data.tasks}
                  pagination={false}
                  rowKey={(record, index) => record.id || index}
                  locale={{ emptyText: '暂无任务' }}
                  columns={[
                    { title: '任务名称', dataIndex: 'taskName', width: 200 },
                    { title: '任务类型', dataIndex: 'taskTypeName', width: 150 },
                    { title: '关联里程碑', dataIndex: 'milestoneName', width: 150 },
                    { title: '负责人', dataIndex: 'chargeNames', width: 150 },
                    { title: '处理人', dataIndex: 'processNames', width: 150 },
                    { title: '任务描述', dataIndex: 'description', ellipsis: true },
                  ]}
                />
              </Card>
            )}

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
                    { title: '上传时间', dataIndex: 'creationTime', render: (val: string) => val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : '-' },
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

export default RationalizationProposalDetail;

export const routeProps = {
  name: '合理化建议详情',
};
