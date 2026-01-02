/**
 * Schema 管理页面（高级管理）
 * 左右布局：左侧功能菜单 + 右侧内容面板
 */
import React, { useState, useMemo } from 'react';
import {
  Card,
  Menu,
  Empty,
  Button,
  Space,
  Typography,
  Breadcrumb,
  Alert,
} from 'antd';
import {
  ThunderboltOutlined,
  CloudSyncOutlined,
  FileSearchOutlined,
  DashboardOutlined,
  BookOutlined,
  HomeOutlined,
  LockOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAccess, Link } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { FieldPromotionPermissions } from '../_permissions';

// 子面板组件
import FieldPromotionPanel from './_components/FieldPromotionPanel';
import CacheManagementPanel from './_components/CacheManagementPanel';
import AuditLogPanel from './_components/AuditLogPanel';
import SystemMonitorPanel from './_components/SystemMonitorPanel';

const { Title, Paragraph } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

// 菜单项定义
const menuItems: MenuItem[] = [
  {
    key: 'fieldPromotion',
    icon: <ThunderboltOutlined />,
    label: '字段提升',
  },
  {
    key: 'cacheManagement',
    icon: <CloudSyncOutlined />,
    label: '缓存管理',
  },
  {
    key: 'auditLog',
    icon: <FileSearchOutlined />,
    label: '审计日志',
  },
  {
    key: 'systemMonitor',
    icon: <DashboardOutlined />,
    label: '系统监控',
  },
];

// 权限映射
const permissionMap: Record<string, string> = {
  fieldPromotion: FieldPromotionPermissions.Default,
  cacheManagement: 'DynamicSchema.SchemaManagement.ClearCache',
  auditLog: 'DynamicSchema.SchemaManagement.ViewAuditLog',
  systemMonitor: 'DynamicSchema.SchemaManagement.Default',
};

// 无权限提示组件
const NoPermission: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: 400,
    }}
  >
    <LockOutlined style={{ fontSize: 64, color: '#bfbfbf', marginBottom: 24 }} />
    <Title level={4} type="secondary">
      权限不足
    </Title>
    <Paragraph type="secondary">您没有权限访问高级管理功能</Paragraph>
    <Paragraph type="secondary">请联系系统管理员申请权限</Paragraph>
    <Button type="primary" href="/appSYS/dynamic-schema/applications">
      返回应用列表
    </Button>
  </div>
);

const SchemaManagementPage: React.FC = () => {
  const access = useAccess();

  // 使用 Hook 获取路由参数
  const { params } = useKeepAliveParams('/appSYS/dynamic-schema/schema-management', ['applicationName']);
  const applicationName = params.applicationName || '';

  const [selectedKey, setSelectedKey] = useState<string>('fieldPromotion');

  // 检查是否有基本访问权限
  const hasBasicAccess = !!(access && (access['DynamicSchema.SchemaManagement.Default'] ?? true));

  // 检查各功能的权限
  const hasFieldPromotionAccess = !!(
    access && (access[FieldPromotionPermissions.Default] ?? true)
  );
  const hasCacheAccess = !!(
    access && (access['DynamicSchema.SchemaManagement.ClearCache'] ?? true)
  );
  const hasAuditAccess = !!(
    access && (access['DynamicSchema.SchemaManagement.ViewAuditLog'] ?? true)
  );
  const hasMonitorAccess = !!(
    access && (access['DynamicSchema.SchemaManagement.Default'] ?? true)
  );

  // 过滤有权限的菜单项
  const accessibleMenuItems = menuItems.filter((item) => {
    if (!item || typeof item !== 'object' || !('key' in item)) return false;
    const key = item.key as string;
    switch (key) {
      case 'fieldPromotion':
        return hasFieldPromotionAccess;
      case 'cacheManagement':
        return hasCacheAccess;
      case 'auditLog':
        return hasAuditAccess;
      case 'systemMonitor':
        return hasMonitorAccess;
      default:
        return true;
    }
  });

  // 渲染内容面板
  const renderPanel = () => {
    // 检查当前选中功能的权限
    const currentPermission = permissionMap[selectedKey];
    const hasCurrentAccess = !!(access && (access[currentPermission] ?? true));

    if (!hasCurrentAccess) {
      return <NoPermission />;
    }

    switch (selectedKey) {
      case 'fieldPromotion':
        return <FieldPromotionPanel applicationName={applicationName} />;
      case 'cacheManagement':
        return <CacheManagementPanel applicationName={applicationName} />;
      case 'auditLog':
        return <AuditLogPanel applicationName={applicationName} />;
      case 'systemMonitor':
        return <SystemMonitorPanel applicationName={applicationName} />;
      default:
        return (
          <Empty description="请从左侧菜单选择功能" style={{ padding: '60px 0' }} />
        );
    }
  };

  // 没有应用名称参数
  if (!applicationName) {
    return (
      <Card>
        <Empty
          description="请从动态应用列表中选择一个应用进入高级管理"
          style={{ padding: '60px 0' }}
        >
          <Button type="primary" href="/appSYS/dynamic-schema/applications">
            前往应用列表
          </Button>
        </Empty>
      </Card>
    );
  }

  // 没有基本访问权限
  if (!hasBasicAccess) {
    return (
      <Card>
        <NoPermission />
      </Card>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 页面标题 */}
      <Card
        style={{ marginBottom: 16 }}
        bodyStyle={{ padding: '16px 24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space direction="vertical" size={4}>
            <Breadcrumb
              items={[
                { title: <Link to="/"><HomeOutlined /> 首页</Link> },
                { title: <Link to="/appSYS/dynamic-schema/applications">动态应用</Link> },
                { title: applicationName },
                { title: '高级管理' },
              ]}
            />
            <Title level={4} style={{ margin: 0 }}>
              <Space>
                <ThunderboltOutlined />
                高级管理
              </Space>
            </Title>
          </Space>
          <Button icon={<BookOutlined />} href="https://docs.example.com/dynamic-schema" target="_blank">
            使用文档
          </Button>
        </div>
      </Card>

      {/* 主内容区 */}
      <div style={{ flex: 1, display: 'flex', gap: 16, minHeight: 0 }}>
        {/* 左侧功能菜单 */}
        <Card
          style={{ width: 200, flexShrink: 0 }}
          bodyStyle={{ padding: 0 }}
          title={
            <Space>
              <DashboardOutlined />
              功能菜单
            </Space>
          }
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={accessibleMenuItems}
            onClick={({ key }) => setSelectedKey(key)}
            style={{ border: 'none' }}
          />
        </Card>

        {/* 右侧内容面板 */}
        <div style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
          {renderPanel()}
        </div>
      </div>
    </div>
  );
};

export default SchemaManagementPage;

export const routeProps = {
  name: '高级管理',
};
