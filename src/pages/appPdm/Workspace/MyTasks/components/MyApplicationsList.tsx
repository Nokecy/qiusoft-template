import React, { useState } from 'react';
import { List, Tag, Button, Space, Select } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { history } from 'umi';
import dayjs from 'dayjs';

const { Option } = Select;

// 申请类型枚举 - 相关页面已删除，待后端 API 完善后恢复
enum RequestType {
}

const requestTypeMap: Record<string, { label: string; color: string; route: string }> = {
};

// 审批状态枚举
enum ApprovalStatus {
  Pending = 0,
  Submitted = 10,
  Approved = 20,
  Rejected = 30,
  Withdrawn = 40,
}

const statusMap = {
  [ApprovalStatus.Pending]: { label: '待提交', color: '#d9d9d9' },
  [ApprovalStatus.Submitted]: { label: '审批中', color: '#1890ff' },
  [ApprovalStatus.Approved]: { label: '已批准', color: '#52c41a' },
  [ApprovalStatus.Rejected]: { label: '已拒绝', color: '#ff4d4f' },
  [ApprovalStatus.Withdrawn]: { label: '已撤回', color: '#faad14' },
};

const MyApplicationsList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<number | undefined>(undefined);

  // 加载数据
  React.useEffect(() => {
    loadData();
  }, [filterType, filterStatus]);

  const loadData = async () => {
    setLoading(true);
    try {
      // TODO: 调用后端API获取我的申请列表
      // const result = await MyTasksGetMyApplicationsListAsync({
      //   requestType: filterType,
      //   status: filterStatus
      // });
      // setData(result.items);

      // 临时模拟数据
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (item: any) => {
    const typeConfig = requestTypeMap[item.requestType as RequestType];
    if (typeConfig) {
      history.push(`${typeConfig.route}?id=${item.id}`);
    }
  };

  return (
    <div>
      {/* 过滤器 */}
      <div style={{ marginBottom: 16 }}>
        <Space>
          <span>申请类型:</span>
          <Select
            style={{ width: 200 }}
            placeholder="全部类型"
            allowClear
            value={filterType}
            onChange={setFilterType}
          >
            {/* 申请类型选项 - 待后端 API 完善后添加 */}
          </Select>

          <span>审批状态:</span>
          <Select
            style={{ width: 150 }}
            placeholder="全部状态"
            allowClear
            value={filterStatus}
            onChange={setFilterStatus}
          >
            <Option value={ApprovalStatus.Pending}>待提交</Option>
            <Option value={ApprovalStatus.Submitted}>审批中</Option>
            <Option value={ApprovalStatus.Approved}>已批准</Option>
            <Option value={ApprovalStatus.Rejected}>已拒绝</Option>
            <Option value={ApprovalStatus.Withdrawn}>已撤回</Option>
          </Select>
        </Space>
      </div>

      {/* 列表 */}
      <List
        loading={loading}
        dataSource={data}
        locale={{ emptyText: '暂无申请记录' }}
        renderItem={(item: any) => {
          const typeConfig = requestTypeMap[item.requestType as RequestType];
          const statusConfig = statusMap[item.status as ApprovalStatus];

          return (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetail(item)}
                >
                  查看详情
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Tag color={typeConfig?.color}>{typeConfig?.label}</Tag>
                    <Tag color={statusConfig?.color}>{statusConfig?.label}</Tag>
                    <span>{item.requestNumber}</span>
                    <span>{item.title}</span>
                  </Space>
                }
                description={
                  <Space split="|">
                    <span>创建时间: {dayjs(item.creationTime).format('YYYY-MM-DD HH:mm')}</span>
                    {item.submittedAt && (
                      <span>提交时间: {dayjs(item.submittedAt).format('YYYY-MM-DD HH:mm')}</span>
                    )}
                    {item.approvedAt && (
                      <span>批准时间: {dayjs(item.approvedAt).format('YYYY-MM-DD HH:mm')}</span>
                    )}
                  </Space>
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default MyApplicationsList;
