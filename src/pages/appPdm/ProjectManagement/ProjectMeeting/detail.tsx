import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Descriptions, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { ProjectMeetingGetAsync } from '@/services/pdm/ProjectMeeting';
import { ToolBar } from '@/components';

const ProjectMeetingDetail: React.FC = () => {
  const { id: meetingId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/ProjectMeeting/detail',
    ['id']
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    if (meetingId) {
      loadData();
    }
  }, [isActive, hasChanged, meetingId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ProjectMeetingGetAsync({ id: meetingId });
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
    history.push('/appPdm/ProjectManagement/ProjectMeeting');
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
        title="会议详情"
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
              <Descriptions.Item label="会议名称" span={2}>{data.meetingName || '-'}</Descriptions.Item>

              <Descriptions.Item label="开始时间">{data.startTime || '-'}</Descriptions.Item>
              <Descriptions.Item label="结束时间">{data.endTime || '-'}</Descriptions.Item>

              <Descriptions.Item label="会议地点" span={2}>{data.location || '-'}</Descriptions.Item>

              <Descriptions.Item label="主持人">{data.hostName || data.hostCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="记录人">{data.recorderName || data.recorderCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="参会人员" span={2}>{data.participantNames || '-'}</Descriptions.Item>

              <Descriptions.Item label="关联项目" span={2}>{data.projectCode || '-'}</Descriptions.Item>

              <Descriptions.Item label="会议主要内容" span={2}>{data.mainContent || '-'}</Descriptions.Item>

              <Descriptions.Item label="执行内容" span={2}>{data.executionContent || '-'}</Descriptions.Item>
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
          </>
        )}
      </Card>
    </Spin>
  );
};

export default ProjectMeetingDetail;

export const routeProps = {
  name: '会议详情',
};
