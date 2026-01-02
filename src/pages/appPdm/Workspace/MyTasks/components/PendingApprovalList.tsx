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

const PendingApprovalList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);

  // 加载数据
  React.useEffect(() => {
    loadData();
  }, [filterType]);

  const loadData = async () => {
    setLoading(true);
    try {
      // TODO: 调用后端API获取待审批列表
      // const result = await MyTasksGetPendingApprovalListAsync({ requestType: filterType });
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
        </Space>
      </div>

      {/* 列表 */}
      <List
        loading={loading}
        dataSource={data}
        locale={{ emptyText: '暂无待审批的申请' }}
        renderItem={(item: any) => {
          const typeConfig = requestTypeMap[item.requestType as RequestType];
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
                    <span>{item.requestNumber}</span>
                    <span>{item.title}</span>
                  </Space>
                }
                description={
                  <Space split="|">
                    <span>申请人: {item.applicantName}</span>
                    <span>提交时间: {dayjs(item.submittedAt).format('YYYY-MM-DD HH:mm')}</span>
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

export default PendingApprovalList;
