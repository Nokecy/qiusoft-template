/**
 * 右键菜单管理Hook
 */
import React, { useState, useCallback } from 'react';
import { message } from 'antd';
import type { MenuProps } from 'antd';
import {
  LockOutlined,
  UnlockOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { AtlElement } from '../../../types';

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  elementId: string | null;
}

export interface UseContextMenuParams {
  elements: AtlElement[];
  onSelectElement: (id: string | null) => void;
  onUpdateElement?: (id: string, updates: Partial<AtlElement>) => void;
  onRemoveElement?: (id: string) => void;
  onMoveToTop?: (id: string) => void;
  onMoveToBottom?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
}

export const useContextMenu = ({
  elements,
  onSelectElement,
  onUpdateElement,
  onRemoveElement,
  onMoveToTop,
  onMoveToBottom,
  onMoveUp,
  onMoveDown,
}: UseContextMenuParams) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    elementId: null,
  });

  /**
   * 处理右键点击
   */
  const handleContextMenu = useCallback(
    (e: React.MouseEvent, elementId: string) => {
      e.preventDefault();
      e.stopPropagation();

      // 选中元素
      onSelectElement(elementId);

      // 显示右键菜单
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        elementId,
      });
    },
    [onSelectElement],
  );

  /**
   * 关闭菜单
   */
  const closeContextMenu = useCallback(() => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
      elementId: null,
    });
  }, []);

  /**
   * 菜单项点击处理
   */
  const handleMenuClick = useCallback(
    (key: string) => {
      if (!contextMenu.elementId) return;

      const element = elements.find((el) => el.id === contextMenu.elementId);
      if (!element) return;

      switch (key) {
        case 'lock':
          if (onUpdateElement) {
            onUpdateElement(contextMenu.elementId, { locked: true });
            message.success('元素已锁定');
          }
          break;
        case 'unlock':
          if (onUpdateElement) {
            onUpdateElement(contextMenu.elementId, { locked: false });
            message.success('元素已解锁');
          }
          break;
        case 'toTop':
          if (onMoveToTop) {
            onMoveToTop(contextMenu.elementId);
            message.success('已置顶');
          }
          break;
        case 'toBottom':
          if (onMoveToBottom) {
            onMoveToBottom(contextMenu.elementId);
            message.success('已置底');
          }
          break;
        case 'moveUp':
          if (onMoveUp) {
            onMoveUp(contextMenu.elementId);
            message.success('已上移一层');
          }
          break;
        case 'moveDown':
          if (onMoveDown) {
            onMoveDown(contextMenu.elementId);
            message.success('已下移一层');
          }
          break;
        case 'delete':
          if (onRemoveElement) {
            onRemoveElement(contextMenu.elementId);
            message.success('元素已删除');
          }
          break;
      }

      closeContextMenu();
    },
    [
      contextMenu.elementId,
      elements,
      onUpdateElement,
      onMoveToTop,
      onMoveToBottom,
      onMoveUp,
      onMoveDown,
      onRemoveElement,
      closeContextMenu,
    ],
  );

  /**
   * 根据元素状态生成菜单项
   */
  const getMenuItems = useCallback((element: AtlElement): MenuProps['items'] => {
    return [
      {
        key: element.locked ? 'unlock' : 'lock',
        icon: element.locked ? <UnlockOutlined /> : <LockOutlined />,
        label: element.locked ? '解锁' : '锁定',
      },
      {
        type: 'divider',
      },
      {
        key: 'toTop',
        icon: <VerticalAlignTopOutlined />,
        label: '置顶',
      },
      {
        key: 'moveUp',
        icon: <ArrowUpOutlined />,
        label: '上移一层',
      },
      {
        key: 'moveDown',
        icon: <ArrowDownOutlined />,
        label: '下移一层',
      },
      {
        key: 'toBottom',
        icon: <VerticalAlignBottomOutlined />,
        label: '置底',
      },
      {
        type: 'divider',
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: '删除',
        danger: true,
      },
    ];
  }, []);

  return {
    contextMenu,
    handleContextMenu,
    closeContextMenu,
    handleMenuClick,
    getMenuItems,
  };
};
