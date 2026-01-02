import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, message } from 'antd';
import { useLocation } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { ProjectMilestoneGetAsync } from '@/services/pdm/ProjectMilestone';
import WorkflowStatusRender from '@/pages/appWorkflow/_utils/workflowStatusRender';
import dayjs from 'dayjs';

/**
 * 项目里程碑详情页面
 */
const MilestoneDetailPage: React.FC = () => {
  const location = useLocation();
  const { params } = useKeepAliveParams('/appPdm/ProjectManagement/MilestoneList/detail');
  const id = params.id as string;

  console.log('Detail页面加载, URL参数:', { id, locationSearch: location.search });
  console.log('当前URL路径:', window.location.pathname + window.location.search);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const result = await ProjectMilestoneGetAsync({ id });
          setData(result);
        }
      } catch (error) {
        message.error('获取详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>加载中...</div>;
  }

  // 里程碑状态枚举
  const getStatus = (value: number) => {
    const statuses = {
      0: '未开始',
      1: '进行中',
      2: '已完成',
      3: '已暂停',
      4: '已取消',
    };
    return statuses[value] || value;
  };

  return (
    <PageContainer>
      <Card title="项目里程碑详情" loading={loading}>
        <Descriptions bordered column={2}>
          {/* 基础信息 */}
          <Descriptions.Item label="里程碑名称">{data?.milestoneName}</Descriptions.Item>
          <Descriptions.Item label="关联项目">{data?.projectName}</Descriptions.Item>
          <Descriptions.Item label="责任人">{data?.responsibleName}</Descriptions.Item>
          <Descriptions.Item label="状态">{getStatus(data?.status)}</Descriptions.Item>

          {/* 日期信息 */}
          <Descriptions.Item label="计划开始日期">
            {data?.plannedStartDate
              ? dayjs(data.plannedStartDate).format('YYYY-MM-DD HH:mm:ss')
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="计划结束日期">
            {data?.plannedEndDate ? dayjs(data.plannedEndDate).format('YYYY-MM-DD HH:mm:ss') : ''}
          </Descriptions.Item>
          <Descriptions.Item label="实际开始日期">
            {data?.actualStartDate
              ? dayjs(data.actualStartDate).format('YYYY-MM-DD HH:mm:ss')
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="实际结束日期">
            {data?.actualEndDate ? dayjs(data.actualEndDate).format('YYYY-MM-DD HH:mm:ss') : ''}
          </Descriptions.Item>

          {/* 进度信息 */}
          <Descriptions.Item label="计划工期(天)">{data?.plannedDuration}</Descriptions.Item>
          <Descriptions.Item label="实际工期(天)">{data?.actualDuration}</Descriptions.Item>
          <Descriptions.Item label="完成百分比">{data?.completionPercentage}%</Descriptions.Item>
          <Descriptions.Item label="延期天数">{data?.delayDays}</Descriptions.Item>

          {/* 任务统计 */}
          <Descriptions.Item label="总任务数">{data?.totalTasks}</Descriptions.Item>
          <Descriptions.Item label="已完成任务数">{data?.completedTasks}</Descriptions.Item>
          <Descriptions.Item label="进行中任务数">{data?.inProgressTasks}</Descriptions.Item>
          <Descriptions.Item label="待开始任务数">{data?.notStartedTasks}</Descriptions.Item>

          {/* 审批相关 */}
          <Descriptions.Item label="是否需要审批">
            {data?.isApproval ? '是' : '否'}
          </Descriptions.Item>
          <Descriptions.Item label="工作流定义ID">
            {data?.workflowDefinitionId || '未配置'}
          </Descriptions.Item>

          {/* 工作流信息 */}
          <Descriptions.Item label="工作流实例ID">
            {data?.workflowInstanceId || '未启动工作流'}
          </Descriptions.Item>
          <Descriptions.Item label="当前活动">{data?.currentActivityName || '无'}</Descriptions.Item>
          <Descriptions.Item label="当前处理人">
            {data?.currentAssigneeName || '系统处理'}
          </Descriptions.Item>
          <Descriptions.Item label="工作流状态">
            {data?.workflowStatus !== undefined ? (
              <WorkflowStatusRender value={data.workflowStatus} data={data} />
            ) : (
              '未启动'
            )}
          </Descriptions.Item>

          {/* 其他信息 */}
          <Descriptions.Item label="排序序号">{data?.sequence}</Descriptions.Item>
          <Descriptions.Item label="表单ID">{data?.formId || '未配置'}</Descriptions.Item>

          {/* 审计字段 */}
          <Descriptions.Item label="创建人">{data?.creator}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {data?.creationTime ? dayjs(data.creationTime).format('YYYY-MM-DD HH:mm:ss') : ''}
          </Descriptions.Item>
          <Descriptions.Item label="修改人">{data?.lastModifier}</Descriptions.Item>
          <Descriptions.Item label="修改时间">
            {data?.lastModificationTime
              ? dayjs(data.lastModificationTime).format('YYYY-MM-DD HH:mm:ss')
              : ''}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default MilestoneDetailPage;
export const routeProps = {
  name: '项目里程碑详情',
};
