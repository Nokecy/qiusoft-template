import React, { useState, useEffect } from 'react';
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import {
  Card,
  Tabs,
  Spin,
  message,
  Space,
  Button,
  Tag,
  Table,
  Statistic,
  Row,
  Col,
  Empty,
  Timeline,
  Descriptions,
} from 'antd';
import { history, Access, useAccess } from 'umi';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { HolidaySetGetAsync, HolidaySetDeleteAsync } from '@/services/openApi/HolidaySet';
import { useKeepAliveParams } from '@/hooks';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import DeleteConfirm from '@/components/deleteConfirm';
import HolidaySetFormDialog from './components/formDialog';

// 假期项目类型定义
interface HolidayItem {
  id?: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  isPublicHoliday?: boolean;
}

// 假期集数据类型
interface HolidaySetData {
  id?: string;
  name?: string;
  description?: string;
  countryOrRegion?: string;
  isActive?: boolean;
  items?: HolidayItem[];
}

const HolidaySetDetail = () => {
  // 使用 KeepAlive 参数 Hook
  const { id: holidaySetId, isActive, hasChanged } = useKeepAliveParams(
    '/appSYS/calendar/holidaySet/detail',
    ['id']
  );
  const access = useAccess();

  const [loading, setLoading] = useState(false);
  const [holidaySetData, setHolidaySetData] = useState<HolidaySetData | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  // 加载假期集数据
  const loadHolidaySetData = async () => {
    if (!holidaySetId) {
      return;
    }

    setLoading(true);
    try {
      const data = await HolidaySetGetAsync({ id: holidaySetId });
      setHolidaySetData(data);
    } catch (error) {
      console.error('加载假期集数据失败:', error);
      message.error('加载假期集数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Hook 已自动处理路径匹配
    if (!isActive || !hasChanged) {
      return;
    }
    if (holidaySetId) {
      loadHolidaySetData();
    }
  }, [isActive, hasChanged, holidaySetId]);

  // 返回列表
  const handleBack = () => {
    history.push('/appSYS/calendar/holidaySet');
  };

  // 删除假期集
  const handleDelete = async () => {
    if (!holidaySetId) return;

    const hide = message.loading('正在删除,请稍后', 0);
    try {
      await HolidaySetDeleteAsync({ id: holidaySetId });
      message.success('删除成功');
      hide();
      handleBack();
    } catch (error) {
      hide();
      message.error('删除失败');
    }
  };

  // 计算统计信息
  const getStatistics = () => {
    const items = holidaySetData?.items || [];
    const publicHolidays = items.filter((item) => item.isPublicHoliday);

    // 计算总天数
    let totalDays = 0;
    items.forEach((item) => {
      if (item.startDate && item.endDate) {
        const start = dayjs(item.startDate);
        const end = dayjs(item.endDate);
        totalDays += end.diff(start, 'day') + 1;
      }
    });

    return {
      totalHolidays: items.length,
      publicHolidays: publicHolidays.length,
      totalDays,
    };
  };

  const statistics = getStatistics();

  // 列表视图列定义
  const listColumns: ColumnsType<HolidayItem> = [
    {
      title: '假期名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <Space>
          <CalendarOutlined style={{ color: record.isPublicHoliday ? '#ff4d4f' : '#1890ff' }} />
          {text || '-'}
        </Space>
      ),
    },
    {
      title: '日期范围',
      key: 'dateRange',
      width: 220,
      render: (_, record) => {
        if (!record.startDate || !record.endDate) return '-';
        return `${dayjs(record.startDate).format('YYYY-MM-DD')} ~ ${dayjs(record.endDate).format('YYYY-MM-DD')}`;
      },
    },
    {
      title: '天数',
      key: 'days',
      width: 80,
      align: 'center',
      render: (_, record) => {
        if (!record.startDate || !record.endDate) return '-';
        const start = dayjs(record.startDate);
        const end = dayjs(record.endDate);
        const days = end.diff(start, 'day') + 1;
        return <Tag color="blue">{days}天</Tag>;
      },
    },
    {
      title: '是否公共假期',
      dataIndex: 'isPublicHoliday',
      key: 'isPublicHoliday',
      width: 120,
      align: 'center',
      render: (value) =>
        value ? (
          <Tag icon={<CheckCircleOutlined />} color="error">
            公共假期
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="default">
            非公共假期
          </Tag>
        ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text) => text || '-',
    },
  ];

  // 时间线视图
  const renderTimelineView = () => {
    const items = holidaySetData?.items || [];
    if (items.length === 0) {
      return <Empty description="暂无假期项目" />;
    }

    // 按开始日期排序
    const sortedItems = [...items].sort((a, b) => {
      if (!a.startDate || !b.startDate) return 0;
      return dayjs(a.startDate).isBefore(dayjs(b.startDate)) ? -1 : 1;
    });

    // 按月份分组
    const groupedByMonth: { [key: string]: HolidayItem[] } = {};
    sortedItems.forEach((item) => {
      if (item.startDate) {
        const monthKey = dayjs(item.startDate).format('YYYY-MM');
        if (!groupedByMonth[monthKey]) {
          groupedByMonth[monthKey] = [];
        }
        groupedByMonth[monthKey].push(item);
      }
    });

    return (
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {Object.entries(groupedByMonth).map(([month, monthItems]) => (
          <div key={month} style={{ marginBottom: 32 }}>
            <h3 style={{ marginBottom: 16, color: '#1890ff' }}>
              {dayjs(month).format('YYYY年MM月')}
            </h3>
            <Timeline
              items={monthItems.map((item) => ({
                color: item.isPublicHoliday ? 'red' : 'blue',
                children: (
                  <Card size="small" style={{ marginBottom: 8 }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space>
                        <strong>{item.name}</strong>
                        {item.isPublicHoliday && (
                          <Tag color="error" icon={<CheckCircleOutlined />}>
                            公共假期
                          </Tag>
                        )}
                      </Space>
                      <Space>
                        <CalendarOutlined />
                        <span>
                          {dayjs(item.startDate).format('YYYY-MM-DD')} ~{' '}
                          {dayjs(item.endDate).format('YYYY-MM-DD')}
                        </span>
                        <Tag color="blue">
                          {dayjs(item.endDate).diff(dayjs(item.startDate), 'day') + 1}天
                        </Tag>
                      </Space>
                      {item.description && (
                        <div style={{ color: '#666' }}>{item.description}</div>
                      )}
                    </Space>
                  </Card>
                ),
              }))}
            />
          </div>
        ))}
      </div>
    );
  };

  // Tab配置
  const tabItems = [
    {
      key: 'list',
      label: '列表视图',
      children: (
        <Table<HolidayItem>
          columns={listColumns}
          dataSource={holidaySetData?.items || []}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: '暂无假期项目' }}
        />
      ),
    },
    {
      key: 'timeline',
      label: '时间线视图',
      children: renderTimelineView(),
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回
          </Button>
          <span>{holidaySetData?.name || '假期集详情'}</span>
        </Space>
      }
      subTitle={holidaySetData?.description}
      loading={loading}
      extra={[
        <Access accessible={true} key="edit">
          <HolidaySetFormDialog
            title="编辑"
            entityId={holidaySetId}
            onAfterSubmit={loadHolidaySetData}
            buttonProps={{
              icon: <EditOutlined />,
            }}
          >
            编辑
          </HolidaySetFormDialog>
        </Access>,
        <Access accessible={true} key="delete">
          <DeleteConfirm title="确定删除此假期集?" onConfirm={handleDelete}>
            <Button danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </DeleteConfirm>
        </Access>,
      ]}
    >
      <Spin spinning={loading}>
        {/* 基本信息和统计卡片 */}
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Descriptions title="基本信息" column={1}>
                <Descriptions.Item label="假期集名称">
                  {holidaySetData?.name || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="国家/地区">
                  {holidaySetData?.countryOrRegion ? (
                    <Tag color="blue">{holidaySetData.countryOrRegion}</Tag>
                  ) : (
                    '-'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="启用状态">
                  {holidaySetData?.isActive ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      启用
                    </Tag>
                  ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      禁用
                    </Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="描述">
                  {holidaySetData?.description || '-'}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: 24 }}>统计信息</h3>
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic
                      title="假期总数"
                      value={statistics.totalHolidays}
                      suffix="个"
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="公共假期"
                      value={statistics.publicHolidays}
                      suffix="个"
                      valueStyle={{ color: '#ff4d4f' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="假期天数"
                      value={statistics.totalDays}
                      suffix="天"
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 假期项目列表/时间线 */}
        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Card>
      </Spin>
    </PageContainer>
  );
};

export default HolidaySetDetail;

export const routeProps = {
  name: '假期集详情',
};
