import { Card, Row, Col, Statistic, Tabs, Badge } from 'antd';
import { FileAddOutlined, EditOutlined, DeleteOutlined, SendOutlined, CheckCircleOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import PendingApprovalList from './components/PendingApprovalList';
import MyApplicationsList from './components/MyApplicationsList';
import MyTaskList from './components/MyTaskList';
import MyIssueList from './components/MyIssueList';
import MyRiskList from './components/MyRiskList';
import { ProjectTaskGetMyTasksAsync } from '@/services/pdm/ProjectTask';
import { ProjectIssueGetMyIssuesAsync } from '@/services/pdm/ProjectIssue';
import { ProjectRiskGetMyRisksAsync } from '@/services/pdm/ProjectRisk';

const { TabPane } = Tabs;

const MyTasksPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.currentUser?.id;

  const [statistics, setStatistics] = useState({
    pendingApprovalCount: 0,
    myApplicationsCount: 0,
    creationRequestCount: 0,
    changeRequestCount: 0,
    obsolescenceRequestCount: 0,
    myTasksCount: 0,
    myIssuesCount: 0,
    myRisksCount: 0,
  });

  const [workLoading, setWorkLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pendingApproval');

  // 加载统计数据
  useEffect(() => {
    loadStatistics();
    loadWorkStatistics();
  }, [currentUserId]);

  const loadStatistics = async () => {
    // TODO: 调用后端API获取统计数据
    // const data = await MyTasksGetStatisticsAsync();
    // setStatistics(data);

    // 临时模拟数据
    setStatistics(prev => ({
      ...prev,
      pendingApprovalCount: 0,
      myApplicationsCount: 0,
      creationRequestCount: 0,
      changeRequestCount: 0,
      obsolescenceRequestCount: 0,
    }));
  };

  // 加载我负责的工作统计
  const loadWorkStatistics = async () => {
    if (!currentUserId) return;

    setWorkLoading(true);
    try {
      // 并行调用三个API获取统计数据
      const [tasksResult, issuesResult, risksResult] = await Promise.all([
        // 获取我负责的任务数量
        ProjectTaskGetMyTasksAsync({
          MaxResultCount: 1, // 只需要totalCount
          SkipCount: 0,
        }).catch(() => ({ totalCount: 0 })),

        // 获取我负责的问题数量
        ProjectIssueGetMyIssuesAsync({
          MaxResultCount: 1,
          SkipCount: 0,
        }).catch(() => ({ totalCount: 0 })),

        // 获取我负责的风险数量
        ProjectRiskGetMyRisksAsync({
          MaxResultCount: 1,
          SkipCount: 0,
        }).catch(() => ({ totalCount: 0 })),
      ]);

      setStatistics(prev => ({
        ...prev,
        myTasksCount: tasksResult.totalCount || 0,
        myIssuesCount: issuesResult.totalCount || 0,
        myRisksCount: risksResult.totalCount || 0,
      }));
    } catch (error) {
      console.error('加载工作统计失败:', error);
    } finally {
      setWorkLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* 我负责的工作统计卡片 */}
      <Card
        title="我负责的工作"
        style={{ marginBottom: 16 }}
        loading={workLoading}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="我负责的任务"
              value={statistics.myTasksCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => {
                // TODO: 跳转到任务列表页面并筛选当前用户负责的任务
                history.push('/appPdm/ProjectManagement/TaskList');
              }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="我负责的问题"
              value={statistics.myIssuesCount}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#fa8c16', cursor: 'pointer' }}
              onClick={() => {
                // TODO: 跳转到问题列表页面并筛选当前用户负责的问题
                history.push('/appPdm/ProjectManagement/IssueList');
              }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="我负责的风险"
              value={statistics.myRisksCount}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#f5222d', cursor: 'pointer' }}
              onClick={() => {
                // TODO: 跳转到风险列表页面并筛选当前用户负责的风险
                history.push('/appPdm/ProjectManagement/RiskList');
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="待我审批"
              value={statistics.pendingApprovalCount}
              prefix={<SendOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="我的申请"
              value={statistics.myApplicationsCount}
              prefix={<FileAddOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文档新增申请"
              value={statistics.creationRequestCount}
              prefix={<FileAddOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文档变更申请"
              value={statistics.changeRequestCount}
              prefix={<EditOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 任务列表 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <Badge count={statistics.pendingApprovalCount} offset={[10, 0]}>
                  待我审批
                </Badge>
              </span>
            }
            key="pendingApproval"
          >
            <PendingApprovalList />
          </TabPane>

          <TabPane
            tab={
              <span>
                <Badge count={statistics.myApplicationsCount} offset={[10, 0]}>
                  我的申请
                </Badge>
              </span>
            }
            key="myApplications"
          >
            <MyApplicationsList />
          </TabPane>

          <TabPane
            tab={
              <span>
                <Badge count={statistics.myTasksCount} offset={[10, 0]}>
                  我的任务
                </Badge>
              </span>
            }
            key="myTasks"
          >
            <MyTaskList />
          </TabPane>

          <TabPane
            tab={
              <span>
                <Badge count={statistics.myIssuesCount} offset={[10, 0]}>
                  我的问题
                </Badge>
              </span>
            }
            key="myIssues"
          >
            <MyIssueList />
          </TabPane>

          <TabPane
            tab={
              <span>
                <Badge count={statistics.myRisksCount} offset={[10, 0]}>
                  我的风险
                </Badge>
              </span>
            }
            key="myRisks"
          >
            <MyRiskList />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default MyTasksPage;

export const routeProps = {
  name: '我的任务',
};
