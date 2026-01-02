import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Tabs, Spin, message, Space, Button, Row, Col } from 'antd';
import { history } from 'umi';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  CalendarDefinitionGetAsync,
  CalendarDefinitionGetDatesAsync,
} from '@/services/openApi/CalendarDefinition';
import { useKeepAliveParams } from '@/hooks';
import CalendarPro from '../_components/CalendarPro';
import type { CalendarDateData } from '../_components/CalendarPro';
import ConfigurationPanel from './components/ConfigurationPanel';
import AdjustmentHistory from './components/AdjustmentHistory';
import ManualAdjustmentDialog from './components/ManualAdjustmentDialog';
import CalendarSidebar from './components/CalendarSidebar';
import type { MonthStatistics } from './components/CalendarSidebar';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const CalendarDefinitionDetail = () => {
  // 使用 KeepAlive 参数 Hook
  const { id: calendarId, isActive, hasChanged } = useKeepAliveParams(
    '/appSYS/calendar/calendarDefinition/detail',
    ['id']
  );

  const [loading, setLoading] = useState(false);
  const [calendarData, setCalendarData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('calendar');
  const [adjustDialogVisible, setAdjustDialogVisible] = useState(false);
  const [currentAdjustDate, setCurrentAdjustDate] = useState<CalendarDateData | null>(null);
  const [calendarRefreshKey, setCalendarRefreshKey] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [monthDates, setMonthDates] = useState<CalendarDateData[]>([]);

  // 加载日历定义数据
  const loadCalendarData = async () => {
    if (!calendarId) {
      // 静默返回，不显示错误（通常是页面跳转导致的）
      return;
    }

    setLoading(true);
    try {
      const data = await CalendarDefinitionGetAsync({ id: calendarId });
      setCalendarData(data);
    } catch (error) {
      console.error('加载日历数据失败:', error);
      message.error('加载日历数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Hook 已自动处理路径匹配
    if (!isActive || !hasChanged) {
      return;
    }
    if (calendarId) {
      loadCalendarData();
    }
  }, [isActive, hasChanged, calendarId]);

  // 返回列表
  const handleBack = () => {
    history.push('/appSYS/calendar/calendarDefinition');
  };

  // 加载日历日期数据
  const handleLoadCalendarData = useCallback(async (startDate: Dayjs, endDate: Dayjs) => {
    try {
      const data = await CalendarDefinitionGetDatesAsync({
        id: calendarId,
        StartDate: startDate.format('YYYY-MM-DD'),
        EndDate: endDate.format('YYYY-MM-DD'),
      });

      // 保存所有加载的数据，统计时会根据 selectedDate 动态过滤
      setMonthDates(data || []);

      return data || [];
    } catch (error) {
      console.error('加载日历数据失败:', error);
      message.error('加载日历数据失败');
      return [];
    }
  }, [calendarId]);

  // 日期点击处理
  const handleDateClick = ({ date, data }: { date: Dayjs; data?: CalendarDateData }) => {
    setSelectedDate(date);
    if (data) {
      setCurrentAdjustDate(data);
      setAdjustDialogVisible(true);
    }
  };

  // 手动调整成功后刷新
  const handleAdjustSuccess = () => {
    setCalendarRefreshKey((prev) => prev + 1);
    loadCalendarData();
  };

  // 计算月度统计数据
  const monthStats = useMemo<MonthStatistics>(() => {
    let workDays = 0;
    let holidays = 0;
    let weekends = 0;
    let adjustedDays = 0;

    // 过滤出当前选中月份的数据
    const currentMonthDates = monthDates.filter((item) => {
      const itemDate = dayjs(item.date);
      return itemDate.month() === selectedDate.month() && itemDate.year() === selectedDate.year();
    });

    currentMonthDates.forEach((dateData) => {
      const date = dayjs(dateData.date);
      const isWeekend = date.day() === 0 || date.day() === 6;

      if (dateData.isHoliday) {
        holidays++;
      } else if (dateData.isWorkday) {
        workDays++;
        // 如果是周末但标记为工作日，则算作调休
        if (isWeekend) {
          adjustedDays++;
        }
      } else if (isWeekend) {
        weekends++;
      }
    });

    return {
      workDays,
      holidays,
      weekends,
      adjustedDays,
    };
  }, [monthDates, selectedDate]);

  // 处理备忘录添加
  const handleMemoAdd = (memo: string) => {
    message.success('备忘录已添加');
    // TODO: 调用API保存备忘录
    console.log('添加备忘录:', memo);
  };

  return (
    <PageContainer
      title={
        <Space>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            返回
          </Button>
          <span>{calendarData?.name || '日历详情'}</span>
        </Space>
      }
      subTitle={calendarData?.description}
      loading={loading}
    >
      <Spin spinning={loading}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {/* 标签切换 */}
          <Card bodyStyle={{ padding: '8px 16px' }}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                { key: 'calendar', label: '日历展示' },
                { key: 'config', label: '配置管理' },
                { key: 'history', label: '调整历史' },
              ]}
            />
          </Card>

          {/* 内容区域 */}
          {activeTab === 'calendar' ? (
            // 日历视图 - 左右分栏布局
            <Row gutter={16}>
              <Col xs={24} lg={18}>
                <Card>
                  {calendarId && (
                    <CalendarPro
                      key={calendarRefreshKey}
                      onLoad={handleLoadCalendarData}
                      onDateClick={handleDateClick}
                      showStatistics={false}
                    />
                  )}
                </Card>
              </Col>
              <Col xs={24} lg={6}>
                <CalendarSidebar
                  currentDate={selectedDate}
                  monthStats={monthStats}
                  onMemoAdd={handleMemoAdd}
                />
              </Col>
            </Row>
          ) : activeTab === 'config' ? (
            // 配置管理
            <Card>
              {calendarId && calendarData && (
                <ConfigurationPanel
                  calendarDefinitionId={calendarId}
                  calendarData={calendarData}
                  onRefresh={() => {
                    loadCalendarData();
                    setCalendarRefreshKey((prev) => prev + 1);
                  }}
                />
              )}
            </Card>
          ) : (
            // 调整历史
            <Card>
              {calendarId && <AdjustmentHistory calendarDefinitionId={calendarId} />}
            </Card>
          )}
        </Space>
      </Spin>

      {/* 手动调整对话框 */}
      {currentAdjustDate && (
        <ManualAdjustmentDialog
          visible={adjustDialogVisible}
          dateData={currentAdjustDate}
          onClose={() => {
            setAdjustDialogVisible(false);
            setCurrentAdjustDate(null);
          }}
          onSuccess={handleAdjustSuccess}
        />
      )}
    </PageContainer>
  );
};

export default CalendarDefinitionDetail;

export const routeProps = {
  name: '日历详情',
};
