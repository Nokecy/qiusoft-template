/**
 * 应用卡片组件
 * 展示单个应用的图标、名称和数据量
 */
import React from 'react';
import { Card, Tooltip } from 'antd';
import * as Icons from '@ant-design/icons';

interface AppCardProps {
  app: {
    name: string;
    displayName: string;
    description?: string;
    icon?: string;
  };
  dataCount?: number;
  onClick: () => void;
}

// 动态获取 Ant Design 图标
const getIconComponent = (iconName?: string) => {
  if (!iconName) {
    return <Icons.AppstoreOutlined />;
  }
  // 尝试从 Icons 中获取对应图标
  const IconComponent = (Icons as any)[iconName] || (Icons as any)[`${iconName}Outlined`];
  if (IconComponent) {
    return <IconComponent />;
  }
  return <Icons.AppstoreOutlined />;
};

// 格式化数字（千分位）
const formatNumber = (num?: number) => {
  if (num === undefined || num === null) return '-';
  return num.toLocaleString();
};

const AppCard: React.FC<AppCardProps> = ({ app, dataCount, onClick }) => {
  const cardContent = (
    <Card
      hoverable
      onClick={onClick}
      style={{
        width: 180,
        height: 140,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      styles={{
        body: {
          padding: 16,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      className="app-card"
    >
      {/* 图标 */}
      <div
        style={{
          fontSize: 36,
          color: '#1890ff',
          marginBottom: 12,
          lineHeight: 1,
        }}
      >
        {getIconComponent(app.icon)}
      </div>

      {/* 应用名称 */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#333',
          textAlign: 'center',
          marginBottom: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {app.displayName || app.name}
      </div>

      {/* 数据量 */}
      <div
        style={{
          fontSize: 12,
          color: '#999',
        }}
      >
        {formatNumber(dataCount)} 条
      </div>
    </Card>
  );

  // 如果有描述，添加 Tooltip
  if (app.description) {
    return (
      <Tooltip title={app.description} placement="bottom">
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
};

export default AppCard;
