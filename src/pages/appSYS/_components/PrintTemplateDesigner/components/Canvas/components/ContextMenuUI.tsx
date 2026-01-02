/**
 * 右键菜单UI组件
 * 负责渲染元素的右键上下文菜单
 */

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { AtlElement } from '../../../types';

export interface ContextMenuUIProps {
  contextMenu: {
    visible: boolean;
    x: number;
    y: number;
    elementId: string | null;
  };
  elements: AtlElement[];
  getMenuItems: (element: AtlElement) => MenuProps['items'];
  handleMenuClick: (key: string) => void;
  closeContextMenu: () => void;
}

/**
 * 右键菜单UI组件
 */
export const ContextMenuUI: React.FC<ContextMenuUIProps> = ({
  contextMenu,
  elements,
  getMenuItems,
  handleMenuClick,
  closeContextMenu,
}) => {
  if (!contextMenu.visible || !contextMenu.elementId) {
    return null;
  }

  const element = elements.find((el) => el.id === contextMenu.elementId);
  if (!element) {
    return null;
  }

  return (
    <>
      {/* 菜单 */}
      <div
        style={{
          position: 'fixed',
          left: contextMenu.x,
          top: contextMenu.y,
          zIndex: 10000,
        }}
      >
        <Menu
          items={getMenuItems(element)}
          onClick={({ key }) => handleMenuClick(key)}
          style={{
            boxShadow:
              '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
          }}
        />
      </div>

      {/* 遮罩层 - 点击关闭菜单 */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
        onClick={closeContextMenu}
        onContextMenu={(e) => {
          e.preventDefault();
          closeContextMenu();
        }}
      />
    </>
  );
};
