import React, { useState, useEffect } from 'react';
import { Card, Space, Select, Button, message, Descriptions, Tag, Alert, Row, Col, Table, DatePicker } from 'antd';
import { SettingOutlined, SaveOutlined, ReloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  CalendarDefinitionSetHolidaySetAsync,
  CalendarDefinitionSetWorkdayConfigureAsync,
} from '@/services/openApi/CalendarDefinition';
import { HolidaySetGetListAsync } from '@/services/openApi/HolidaySet';
import { WorkdayConfigureGetListAsync } from '@/services/openApi/WorkdayConfigure';

interface ConfigurationPanelProps {
  calendarDefinitionId: string;
  calendarData: any;
  onRefresh: () => void;
}

interface WorkdayConfigureApplication {
  workdayConfigureId: string;
  workdayConfigureName?: string; // 前端展示用，不传给后端
  startDate: string; // 必填
  endDate?: string;
  priority?: number;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  calendarDefinitionId,
  calendarData,
  onRefresh,
}) => {
  const [holidaySets, setHolidaySets] = useState<any[]>([]);
  const [workdayConfigures, setWorkdayConfigures] = useState<any[]>([]);
  const [selectedHolidaySet, setSelectedHolidaySet] = useState<string | undefined>();
  const [selectedWorkdayConfigures, setSelectedWorkdayConfigures] = useState<WorkdayConfigureApplication[]>([]);
  const [holidayLoading, setHolidayLoading] = useState(false);
  const [workdayLoading, setWorkdayLoading] = useState(false);

  // 加载假期集列表
  const loadHolidaySets = async () => {
    try {
      const data = await HolidaySetGetListAsync();
      setHolidaySets(data || []);
    } catch (error) {
      console.error('加载假期集失败:', error);
    }
  };

  // 加载工作日配置列表
  const loadWorkdayConfigures = async () => {
    try {
      const data = await WorkdayConfigureGetListAsync({
        MaxResultCount: 100,
        SkipCount: 0,
      });
      setWorkdayConfigures(data.items || []);
    } catch (error) {
      console.error('加载工作日配置失败:', error);
    }
  };

  useEffect(() => {
    loadHolidaySets();
    loadWorkdayConfigures();
  }, []);

  useEffect(() => {
    if (calendarData) {
      setSelectedHolidaySet(calendarData.holidaySetId);
      // 新接口返回的是完整的配置对象数组
      setSelectedWorkdayConfigures(
        calendarData.workdayConfigures?.map((item: any) => ({
          workdayConfigureId: item.workdayConfigureId,
          workdayConfigureName: item.workdayConfigureName,
          startDate: item.startDate,
          endDate: item.endDate,
        })) || []
      );
    }
  }, [calendarData]);

  // 保存假期集设置
  const handleSaveHolidaySet = async () => {
    if (!selectedHolidaySet) {
      message.warning('请选择假期集');
      return;
    }

    setHolidayLoading(true);
    try {
      await CalendarDefinitionSetHolidaySetAsync({
        id: calendarDefinitionId,
        holidaySetId: selectedHolidaySet,
      });
      message.success('假期集设置成功');
      onRefresh();
    } catch (error) {
      console.error('设置假期集失败:', error);
    } finally {
      setHolidayLoading(false);
    }
  };

  // 保存工作日配置
  const handleSaveWorkdayConfigures = async () => {
    if (selectedWorkdayConfigures.length === 0) {
      message.warning('请至少添加一个工作日配置');
      return;
    }

    // 验证必填字段
    const invalidIndex = selectedWorkdayConfigures.findIndex(
      item => !item.workdayConfigureId || !item.startDate
    );
    if (invalidIndex >= 0) {
      message.error(`第 ${invalidIndex + 1} 行配置不完整，请选择工作日配置并设置生效开始日期`);
      return;
    }

    setWorkdayLoading(true);
    try {
      // 新接口需要完整的配置对象数组
      await CalendarDefinitionSetWorkdayConfigureAsync(
        { id: calendarDefinitionId },
        {
          workdayConfigures: selectedWorkdayConfigures.map(item => ({
            workdayConfigureId: item.workdayConfigureId,
            startDate: item.startDate,
            endDate: item.endDate,
            priority: item.priority,
          }))
        }
      );
      message.success('工作日配置设置成功');
      onRefresh();
    } catch (error) {
      console.error('设置工作日配置失败:', error);
      message.error('设置工作日配置失败');
    } finally {
      setWorkdayLoading(false);
    }
  };

  // 添加工作日配置
  const handleAddWorkdayConfigure = () => {
    setSelectedWorkdayConfigures([
      ...selectedWorkdayConfigures,
      {
        workdayConfigureId: '',
        startDate: dayjs().format('YYYY-MM-DD'), // 默认当前日期
        endDate: undefined,
        priority: undefined,
      },
    ]);
  };

  // 删除工作日配置
  const handleDeleteWorkdayConfigure = (index: number) => {
    const newConfigures = [...selectedWorkdayConfigures];
    newConfigures.splice(index, 1);
    setSelectedWorkdayConfigures(newConfigures);
  };

  // 更新工作日配置项
  const handleUpdateWorkdayConfigure = (
    index: number,
    field: keyof WorkdayConfigureApplication,
    value: any
  ) => {
    const newConfigures = [...selectedWorkdayConfigures];
    newConfigures[index] = {
      ...newConfigures[index],
      [field]: value,
    };
    // 如果是选择配置，同时更新配置名称
    if (field === 'workdayConfigureId') {
      const configure = workdayConfigures.find(item => item.id === value);
      newConfigures[index].workdayConfigureName = configure?.name;
    }
    setSelectedWorkdayConfigures(newConfigures);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 基本信息 */}
      <Card title="基本信息" size="small">
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="日历名称">{calendarData?.name}</Descriptions.Item>
          <Descriptions.Item label="描述">
            {calendarData?.description || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="假期集状态" span={2}>
            {calendarData?.holidaySetId ? (
              <Tag color="green">已配置</Tag>
            ) : (
              <Tag color="default">未配置</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="工作日配置" span={2}>
            {calendarData?.workdayConfigures?.length > 0 ? (
              <Tag color="blue">{calendarData.workdayConfigures.length} 个配置</Tag>
            ) : (
              <Tag color="default">未配置</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 假期集配置 */}
      <Card
        title={
          <Space>
            <SettingOutlined />
            假期集配置
          </Space>
        }
        size="small"
        extra={
          <Button
            type="primary"
            size="small"
            icon={<SaveOutlined />}
            loading={holidayLoading}
            onClick={handleSaveHolidaySet}
          >
            保存
          </Button>
        }
      >
        <Alert
          message="假期集用于定义法定假日和特殊假期"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Select
          style={{ width: '100%' }}
          placeholder="请选择假期集"
          value={selectedHolidaySet}
          onChange={setSelectedHolidaySet}
          allowClear
          options={holidaySets.map((item) => ({
            label: `${item.name}${item.year ? ` (${item.year}年)` : ''}${!item.isActive ? ' (已禁用)' : ''}`,
            value: item.id,
            disabled: !item.isActive, // 禁用未激活的假期集
          }))}
        />
      </Card>

      {/* 工作日配置 */}
      <Card
        title={
          <Space>
            <SettingOutlined />
            工作日配置
          </Space>
        }
        size="small"
        extra={
          <Space>
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddWorkdayConfigure}
            >
              添加配置
            </Button>
            <Button
              type="primary"
              size="small"
              icon={<SaveOutlined />}
              loading={workdayLoading}
              onClick={handleSaveWorkdayConfigures}
            >
              保存
            </Button>
          </Space>
        }
      >
        <Alert
          message="工作日配置用于定义每周哪些天为工作日及工作时长，可以为不同时间段设置不同的配置"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Table
          dataSource={selectedWorkdayConfigures}
          pagination={false}
          size="small"
          rowKey={(record, index) => index?.toString() || ''}
          columns={[
            {
              title: <span><span style={{ color: 'red' }}>*</span> 工作日配置</span>,
              dataIndex: 'workdayConfigureId',
              width: 280,
              render: (value, record, index) => (
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择工作日配置"
                  value={value || undefined}
                  onChange={(val) => handleUpdateWorkdayConfigure(index, 'workdayConfigureId', val)}
                  options={workdayConfigures.map((item) => ({
                    label: `${item.name}${!item.isActive ? ' (已禁用)' : ''}`,
                    value: item.id,
                    disabled: !item.isActive, // 禁用未激活的工作日配置
                  }))}
                />
              ),
            },
            {
              title: <span><span style={{ color: 'red' }}>*</span> 生效开始日期</span>,
              dataIndex: 'startDate',
              width: 170,
              render: (value, record, index) => (
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="选择开始日期"
                  value={value ? dayjs(value) : undefined}
                  onChange={(date) =>
                    handleUpdateWorkdayConfigure(
                      index,
                      'startDate',
                      date ? date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
                    )
                  }
                />
              ),
            },
            {
              title: '生效结束日期',
              dataIndex: 'endDate',
              width: 170,
              render: (value, record, index) => (
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="选择结束日期"
                  value={value ? dayjs(value) : undefined}
                  onChange={(date) =>
                    handleUpdateWorkdayConfigure(
                      index,
                      'endDate',
                      date ? date.format('YYYY-MM-DD') : undefined
                    )
                  }
                />
              ),
            },
            {
              title: '操作',
              width: 80,
              fixed: 'right' as const,
              render: (_, record, index) => (
                <Button
                  type="link"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteWorkdayConfigure(index)}
                >
                  删除
                </Button>
              ),
            },
          ]}
        />
      </Card>

      {/* 配置说明 */}
      <Card title="配置说明" size="small">
        <Alert
          message="日历计算规则"
          description={
            <div>
              <p style={{ marginBottom: 8 }}>日历系统采用以下优先级计算某一天是否为工作日：</p>
              <ol style={{ margin: 0, paddingLeft: 20 }}>
                <li>如果该日期被手动调整，使用手动设置的值</li>
                <li>如果该日期在假期集中定义为假期，则为非工作日</li>
                <li>根据工作日配置判断该星期几是否为工作日（支持多个配置，按日期范围匹配）</li>
                <li>未配置的情况下，默认周一到周五为工作日</li>
              </ol>
              <p style={{ marginTop: 12, marginBottom: 0, color: '#666' }}>
                <strong>提示：</strong>工作日配置支持设置生效日期范围，不设置日期表示永久生效。
                多个配置可以覆盖不同的时间段。
              </p>
            </div>
          }
          type="warning"
          showIcon
        />
      </Card>
    </Space>
  );
};

export default ConfigurationPanel;
