import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Descriptions, Tag, Table } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { ProjectRiskGetAsync } from '@/services/pdm/ProjectRisk';
import { ProjectTeamMemberGetListByProjectCodeAsync } from '@/services/pdm/ProjectTeamMember';
import { ProjectTaskGetTasksByRiskAsync } from '@/services/pdm/ProjectTask';
import { AttachmentBlobDownloadByBlobNameAsync } from '@/services/attachment/AttachmentBlob';
import { ToolBar } from '@/components';
import dayjs from 'dayjs';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';

// 优先级枚举
const priorityMap: Record<number, { text: string; color: string }> = {
  0: { text: '低', color: 'default' },
  10: { text: '中', color: 'warning' },
  20: { text: '高', color: 'error' },
  30: { text: '紧急', color: 'error' },
};

const RiskDetail: React.FC = () => {
  const { id: riskId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/RiskList/detail',
    ['id']
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [teamMemberMap, setTeamMemberMap] = useState<Record<string, string>>({});

  const watcherText = React.useMemo(() => {
    if (!data) return '-';
    const watchers = Array.isArray(data.watchers) ? data.watchers : [];

    // 优先使用 watchers 对象数组中的 userName (如果有)
    const fromWatchers = watchers
      .map((w: any) => w?.userName || w?.userCode || w?.userId)
      .filter(Boolean)
      .join(',');

    if (fromWatchers) return fromWatchers;

    // 如果 watchers 数组为空或无效，尝试解析 watchUserCodes
    if (data.watchUserCodes) {
      const codes = data.watchUserCodes.split(',').filter(Boolean);
      const names = codes.map((code: string) => teamMemberMap[code] || code);
      return names.join(', ');
    }

    return '-';
  }, [data, teamMemberMap]);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    if (riskId) {
      loadData();
    }
  }, [isActive, hasChanged, riskId]);

  // 当 data 加载完成后，根据 projectCode 加载团队成员
  useEffect(() => {
    if (data?.projectCode) {
      loadTeamMembers(data.projectCode);
    }
  }, [data?.projectCode]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [res, tasksRes] = await Promise.all([
        ProjectRiskGetAsync({ id: riskId }),
        ProjectTaskGetTasksByRiskAsync({ riskId })
      ]);
      setData(res);
      setTasks(tasksRes || []);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const loadTeamMembers = async (projectCode: string) => {
    try {
      const response = await ProjectTeamMemberGetListByProjectCodeAsync({
        projectCode: projectCode,
        MaxResultCount: 1000,
      });

      if (response?.items) {
        const map: Record<string, string> = {};
        response.items.forEach((member: any) => {
          if (member.userId && member.userName) {
            map[member.userId] = member.userName;
          }
        });
        setTeamMemberMap(map);
      }
    } catch (error) {
      console.error('加载项目团队成员失败:', error);
    }
  };

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ProjectManagement/RiskList');
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
        title="风险详情"
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
              <Descriptions.Item label="关联项目编码">{data.projectCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="风险名称">{data.name || '-'}</Descriptions.Item>

              <Descriptions.Item label="风险描述" span={2}>{data.description || '-'}</Descriptions.Item>

              <Descriptions.Item label="优先级">
                {priorityMap[data.priority] ? (
                  <Tag color={priorityMap[data.priority].color}>{priorityMap[data.priority].text}</Tag>
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="风险类型">{data.riskTypeName || data.riskTypeCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="处理人">{data.handlerName || data.handlerCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="影响的里程碑">{data.milestoneName || '-'}</Descriptions.Item>

              <Descriptions.Item label="风险后果描述" span={2}>{data.consequence || '-'}</Descriptions.Item>

              <Descriptions.Item label="是否启用评审流程" span={2}>
                {data.enableReview ? '是' : '否'}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.creationTime ? dayjs(data.creationTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>
            </Descriptions>

            {/* 关联任务 */}
            {(tasks && tasks.length > 0) && (
              <Card title="关联任务" style={{ marginTop: 16 }} size="small">
                <Table
                  dataSource={tasks}
                  pagination={false}
                  rowKey="id"
                  locale={{ emptyText: '暂无关联任务' }}
                  columns={[
                    { title: '任务编码', dataIndex: 'taskCode', width: 150 },
                    { title: '任务名称', dataIndex: 'taskName', width: 200 },
                    { title: '任务类型', dataIndex: 'taskTypeName', width: 150 },
                    {
                      title: '状态', dataIndex: 'status', width: 100, render: (val: number) => {
                        const statusMap: Record<number, string> = { 0: '未开始', 1: '进行中', 2: '已完成', 3: '受阻', 4: '已取消' };
                        return statusMap[val] || '-';
                      }
                    },
                    { title: '负责人', dataIndex: 'chargeNames', width: 150 },
                    { title: '计划开始日期', dataIndex: 'plannedStartDate', width: 150, render: (val: string) => val ? dayjs(val).format('YYYY-MM-DD') : '-' },
                    { title: '计划结束日期', dataIndex: 'plannedEndDate', width: 150, render: (val: string) => val ? dayjs(val).format('YYYY-MM-DD') : '-' },
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

            {/* 关注人 */}
            <Descriptions column={1} bordered style={{ marginTop: 16 }}>
              <Descriptions.Item label="关注人">{watcherText}</Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Card>
    </Spin>
  );
};

export default RiskDetail;

export const routeProps = {
  name: '风险详情',
};
