import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './index.less';

interface CollapsibleSidebarProps {
  /** 侧边栏标题 */
  title: string;
  /** 侧边栏内容 */
  children: React.ReactNode;
  /** 额外操作按钮 */
  extra?: React.ReactNode;
  /** 本地存储的键名,用于持久化折叠状态 */
  storageKey: string;
  /** 卡片body样式 */
  bodyStyle?: React.CSSProperties;
}

/**
 * 可折叠的侧边栏组件
 *
 * 功能:
 * - 折叠/展开侧边栏
 * - 折叠后显示垂直文字和展开按钮
 * - 使用localStorage持久化折叠状态
 * - 平滑过渡动画
 */
const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  title,
  children,
  extra,
  storageKey,
  bodyStyle = { padding: '12px' },
}) => {
  // 从localStorage读取初始状态
  const getInitialCollapsed = () => {
    const stored = localStorage.getItem(storageKey);
    return stored ? stored === 'true' : false;
  };

  const [collapsed, setCollapsed] = useState(getInitialCollapsed);

  // 切换折叠状态
  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem(storageKey, String(newCollapsed));
  };

  // 折叠时显示的垂直标题栏
  if (collapsed) {
    return (
      <div className="collapsible-sidebar-collapsed">
        <div className="collapsed-content">
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={toggleCollapse}
            className="expand-button"
            title={`展开${title}`}
          />
          <div className="vertical-title">{title}</div>
        </div>
      </div>
    );
  }

  // 展开状态
  return (
    <Card
      title={title}
      size="small"
      className="collapsible-sidebar-expanded"
      bodyStyle={bodyStyle}
      extra={
        <>
          <Button
            type="text"
            size="small"
            icon={<MenuFoldOutlined />}
            onClick={toggleCollapse}
            title={`折叠${title}`}
          />
          {extra}
        </>
      }
    >
      {children}
    </Card>
  );
};

export default CollapsibleSidebar;
