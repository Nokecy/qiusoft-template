import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Descriptions, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { ProjectIssueGetAsync } from '@/services/pdm/ProjectIssue';
import { UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import { ToolBar } from '@/components';
import dayjs from 'dayjs';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';

// 严重程度枚举
const severityMap: Record<number, { text: string; color: string }> = {
  0: { text: '低', color: 'default' },
  10: { text: '中', color: 'warning' },
  20: { text: '高', color: 'error' },
  30: { text: '紧急', color: 'error' },
};

// 紧急程度枚举
const urgencyMap: Record<number, { text: string; color: string }> = {
  0: { text: '低', color: 'default' },
  10: { text: '中', color: 'warning' },
  20: { text: '高', color: 'error' },
};

const IssueDetail: React.FC = () => {
  const { id: issueId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/IssueList/detail',
    ['id']
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [watchers, setWatchers] = useState<any[]>([]);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    if (issueId) {
      loadData();
    }
  }, [isActive, hasChanged, issueId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ProjectIssueGetAsync({ id: issueId });
      setData(res);

      if (res && res.issueCode) {
        loadWatchers(res.issueCode);
      }
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const loadWatchers = async (issueCode: string) => {
    try {
      const res = await UserWatchGetListByTargetCodeAsync({ targetCode: issueCode });
      setWatchers(res.items || []);
    } catch (error) {
      console.error('加载关注人失败', error);
    }
  };

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ProjectManagement/IssueList');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
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
        title="问题详情"
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
              <Descriptions.Item label="问题名称">{data.name || '-'}</Descriptions.Item>

              <Descriptions.Item label="关联里程碑">{data.milestoneName || '-'}</Descriptions.Item>
              <Descriptions.Item label="关联任务">{data.taskCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="严重程度">
                {severityMap[data.severity] ? (
                  <Tag color={severityMap[data.severity].color}>{severityMap[data.severity].text}</Tag>
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="紧急程度">
                {urgencyMap[data.urgency] ? (
                  <Tag color={urgencyMap[data.urgency].color}>{urgencyMap[data.urgency].text}</Tag>
                ) : '-'}
              </Descriptions.Item>

              <Descriptions.Item label="是否需要审批">
                <Tag color={data.requiresApproval ? 'blue' : 'default'}>
                  {data.requiresApproval ? '需要' : '不需要'}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="期望解决日期">{data.expectedResolvedDate ? dayjs(data.expectedResolvedDate).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>

              <Descriptions.Item label="处理人" span={2}>{data.handlerName || data.handlerCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="问题说明" span={2}>{data.description || '-'}</Descriptions.Item>

              <Descriptions.Item label="备注" span={2}>{data.remark || '-'}</Descriptions.Item>
            </Descriptions>

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

export default IssueDetail;

export const routeProps = {
  name: '问题详情',
};
