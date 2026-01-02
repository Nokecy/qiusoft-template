import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Descriptions, Table, Tag } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import {
  ProjectTaskGetAsync,
  ProjectTaskGetRisksAsync,
  ProjectTaskGetIssuesAsync
} from '@/services/pdm/ProjectTask';
import { UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import { AttachmentBlobDownloadByBlobNameAsync } from '@/services/attachment/AttachmentBlob';
import { AttachmentBlobDownloadByBlobNameAsync } from '@/services/attachment/AttachmentBlob';
import { ToolBar } from '@/components';
import dayjs from 'dayjs';

// 状态枚举
const statusMap: Record<number, { text: string; color: string }> = {
  0: { text: '未开始', color: 'default' },
  1: { text: '进行中', color: 'processing' },
  2: { text: '已完成', color: 'success' },
  3: { text: '受阻', color: 'error' },
  4: { text: '已取消', color: 'default' },
};

// 紧急程度枚举
const urgencyMap: Record<number, { text: string; color: string }> = {
  0: { text: '低', color: 'default' },
  10: { text: '中', color: 'warning' },
  20: { text: '高', color: 'error' },
};

// 任务来源枚举
const taskSourceMap: Record<number, string> = {
  0: '未设置',
  1: '会议',
  2: '项目',
  3: '记录单',
  4: '合理化建议',
};

const TaskDetail: React.FC = () => {
  const { id: taskId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/TaskList/detail',
    ['id']
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [risks, setRisks] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [watchers, setWatchers] = useState<any[]>([]);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    if (taskId) {
      loadData();
    }
  }, [isActive, hasChanged, taskId]);

  const loadData = async () => {
    setLoading(true);
    try {
      // 并行请求：获取任务详情、关联风险、关联问题
      const [res, risksRes, issuesRes] = await Promise.all([
        ProjectTaskGetAsync({ id: taskId }),
        ProjectTaskGetRisksAsync({ taskId }),
        ProjectTaskGetIssuesAsync({ taskId })
      ]);

      setData(res);
      setRisks(risksRes || []);
      setIssues(issuesRes || []);

      // 获取完任务详情后，根据 taskCode 获取关注人
      if (res && res.taskCode) {
        loadWatchers(res.taskCode);
      }
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const loadWatchers = async (taskCode: string) => {
    try {
      const res = await UserWatchGetListByTargetCodeAsync({ targetCode: taskCode });
      setWatchers(res.items || []);
    } catch (error) {
      console.error('加载关注人失败', error);
    }
  };

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ProjectManagement/TaskList');
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
        title="任务详情"
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
            <Descriptions column={3} bordered>
              <Descriptions.Item label="关联项目编码">{data.projectCode}</Descriptions.Item>
              <Descriptions.Item label="任务名称">{data.taskName}</Descriptions.Item>
              <Descriptions.Item label="任务类型">{data.taskTypeName}</Descriptions.Item>

              <Descriptions.Item label="任务描述" span={3}>{data.description || '-'}</Descriptions.Item>

              <Descriptions.Item label="关联里程碑" span={3}>{data.milestoneName || '-'}</Descriptions.Item>

              <Descriptions.Item label="父任务编码">{data.parentCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="前置任务编码">{data.frontMountedCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="后置任务编码">{data.rearMountedCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="任务状态">
                {statusMap[data.status] ? (
                  <Tag color={statusMap[data.status].color}>{statusMap[data.status].text}</Tag>
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="紧急程度">
                {urgencyMap[data.urgencyLevel] ? (
                  <Tag color={urgencyMap[data.urgencyLevel].color}>{urgencyMap[data.urgencyLevel].text}</Tag>
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="预估工时">{data.estimatedHours ? `${data.estimatedHours} 小时` : '-'}</Descriptions.Item>

              <Descriptions.Item label="负责人" span={3}>{data.chargeNames || '-'}</Descriptions.Item>

              <Descriptions.Item label="处理人" span={3}>{data.processNames || '-'}</Descriptions.Item>

              <Descriptions.Item label="任务来源">{taskSourceMap[data.taskSource] || '-'}</Descriptions.Item>
              <Descriptions.Item label="计划开始日期">{data.plannedStartDate ? dayjs(data.plannedStartDate).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>
              <Descriptions.Item label="计划结束日期">{data.plannedEndDate ? dayjs(data.plannedEndDate).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>
            </Descriptions>

            {/* 关联风险 */}
            <Card title="关联风险" style={{ marginTop: 16 }} size="small">
              <Table
                dataSource={risks}
                pagination={false}
                rowKey="id"
                locale={{ emptyText: '暂无关联风险' }}
                columns={[
                  { title: '风险标题', dataIndex: 'name', width: 200 },
                  {
                    title: '风险等级',
                    dataIndex: 'priority',
                    width: 120,
                    render: (val: number) => {
                      const map: Record<number, { text: string; color: string }> = {
                        0: { text: '低', color: 'default' },
                        10: { text: '中', color: 'warning' },
                        20: { text: '高', color: 'error' },
                        30: { text: '紧急', color: 'error' },
                      };
                      return map[val] ? <Tag color={map[val].color}>{map[val].text}</Tag> : '-';
                    }
                  },
                  { title: '描述', dataIndex: 'description' },
                ]}
              />
            </Card>

            {/* 关联问题 */}
            <Card title="关联问题" style={{ marginTop: 16 }} size="small">
              <Table
                dataSource={issues}
                pagination={false}
                rowKey="id"
                locale={{ emptyText: '暂无关联问题' }}
                columns={[
                  { title: '问题标题', dataIndex: 'name', width: 200 },
                  { title: '问题类型', dataIndex: 'issueCategory', width: 150 },
                  { title: '描述', dataIndex: 'description' },
                ]}
              />
            </Card>

            {/* 项目成果 */}
            <Card title="项目成果" style={{ marginTop: 16 }} size="small">
              <Table
                dataSource={data.deliverables || []}
                pagination={false}
                rowKey={(record, index) => index}
                locale={{ emptyText: '暂无项目成果' }}
                columns={[
                  { title: '成果名称', dataIndex: 'deliverableName', width: 200 },
                  {
                    title: '成果类型',
                    dataIndex: 'deliverableType',
                    width: 150,
                    render: (val: number) => {
                      const map: Record<number, string> = {
                        0: '文档',
                        1: '代码',
                        2: '设计',
                        3: '其他',
                      };
                      return map[val] || '-';
                    }
                  },
                  { title: '描述', dataIndex: 'description' },
                ]}
              />
            </Card>

            {/* 附件 */}
            <Card title="附件" style={{ marginTop: 16 }} size="small">
              <Table
                dataSource={data.attachments || []}
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

            {/* 关注人 */}
            <Descriptions column={1} bordered style={{ marginTop: 16 }}>
              <Descriptions.Item label="关注人">{watchers.length > 0 ? watchers.map(w => w.userName).join(', ') : (data.watchUserCodes || '-')}</Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Card>
    </Spin>
  );
};

export default TaskDetail;

export const routeProps = {
  name: '任务详情',
};
