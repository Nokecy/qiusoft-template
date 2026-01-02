/**
 * 可拖动分隔条的BOM面板组件
 *
 * 功能特性:
 * - 左右面板可拖动调整宽度
 * - 支持面板收起/展开
 * - localStorage记忆用户偏好
 * - 平滑过渡动画
 * - 响应式适配
 *
 * 性能优化:
 * - 使用 ref 直接操作 DOM，避免拖动时频繁触发 React 重渲染
 * - 使用 requestAnimationFrame 优化渲染帧
 * - 拖动时禁用 CSS transition
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './ResizableBomPanel.less';

// 默认配置
const DEFAULT_CONFIG = {
  leftWidth: 360,           // 左侧面板默认宽度
  minLeftWidth: 200,        // 左侧最小宽度
  minRightWidth: 300,       // 右侧最小宽度
  dividerWidth: 6,          // 分隔条宽度
  storageKey: 'bom-panel-config', // localStorage键名
};

interface ResizableBomPanelProps {
  /** 左侧面板内容 */
  leftPanel: React.ReactNode;
  /** 右侧面板内容 */
  rightPanel: React.ReactNode;
  /** 是否显示左侧面板标题栏 */
  showLeftHeader?: boolean;
  /** 是否显示右侧面板标题栏 */
  showRightHeader?: boolean;
  /** 左侧面板标题 */
  leftTitle?: string;
  /** 右侧面板标题 */
  rightTitle?: string;
  /** 自定义类名 */
  className?: string;
  /** 容器高度 */
  height?: string | number;
}

const ResizableBomPanel: React.FC<ResizableBomPanelProps> = ({
  leftPanel,
  rightPanel,
  showLeftHeader = false,
  showRightHeader = false,
  leftTitle = 'BOM树形结构',
  rightTitle = '详细信息',
  className = '',
  height = '100%',
}) => {
  // 状态管理 - 只用于非拖动场景
  const [leftWidth, setLeftWidth] = useState(DEFAULT_CONFIG.leftWidth);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // DOM引用
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // 拖动相关引用 - 使用 ref 避免重渲染
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const currentWidthRef = useRef(DEFAULT_CONFIG.leftWidth);
  const rafIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  // ==================== 初始化：加载用户偏好 ====================

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DEFAULT_CONFIG.storageKey);
      if (saved) {
        const config = JSON.parse(saved);
        if (config.leftWidth) {
          const width = Math.max(DEFAULT_CONFIG.minLeftWidth, config.leftWidth);
          setLeftWidth(width);
          currentWidthRef.current = width;
        }
        if (typeof config.isLeftCollapsed === 'boolean') setIsLeftCollapsed(config.isLeftCollapsed);
        if (typeof config.isRightCollapsed === 'boolean') setIsRightCollapsed(config.isRightCollapsed);
      }
    } catch (error) {
      console.warn('加载BOM面板配置失败:', error);
    }
  }, []);

  // ==================== 保存用户偏好 ====================

  const saveConfig = useCallback((config: { leftWidth?: number; isLeftCollapsed?: boolean; isRightCollapsed?: boolean }) => {
    try {
      const saved = localStorage.getItem(DEFAULT_CONFIG.storageKey);
      const current = saved ? JSON.parse(saved) : {};
      const updated = { ...current, ...config };
      localStorage.setItem(DEFAULT_CONFIG.storageKey, JSON.stringify(updated));
    } catch (error) {
      console.warn('保存BOM面板配置失败:', error);
    }
  }, []);

  // ==================== 高性能拖动处理 ====================

  // 直接更新 DOM，不触发 React 重渲染
  const updatePanelWidth = useCallback((width: number) => {
    if (leftPanelRef.current) {
      leftPanelRef.current.style.width = `${width}px`;
      leftPanelRef.current.style.minWidth = `${width}px`;
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = currentWidthRef.current;

    setIsDragging(true);

    // 防止拖动时选中文本
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    // 取消上一帧的更新
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // 使用 requestAnimationFrame 优化渲染
    rafIdRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const deltaX = e.clientX - startXRef.current;
      const newWidth = startWidthRef.current + deltaX;

      // 计算容器宽度，最大宽度只受右侧最小宽度约束
      const containerWidth = container.offsetWidth;
      const maxWidth = containerWidth - DEFAULT_CONFIG.minRightWidth - DEFAULT_CONFIG.dividerWidth;

      const clampedWidth = Math.max(DEFAULT_CONFIG.minLeftWidth, Math.min(maxWidth, newWidth));

      // 直接更新 DOM，不触发 React 重渲染
      currentWidthRef.current = clampedWidth;
      updatePanelWidth(clampedWidth);
    });
  }, [updatePanelWidth]);

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;

    // 取消未完成的动画帧
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    isDraggingRef.current = false;

    // 同步 state 和保存配置
    const finalWidth = currentWidthRef.current;
    setLeftWidth(finalWidth);
    setIsDragging(false);
    saveConfig({ leftWidth: finalWidth });

    // 恢复样式
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, [saveConfig]);

  // 绑定全局鼠标事件
  useEffect(() => {
    // 始终绑定事件，通过 ref 判断是否处理
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // 清理未完成的动画帧
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleMouseMove, handleMouseUp]);

  // ==================== 双击分隔条重置宽度 ====================

  const handleDividerDoubleClick = useCallback(() => {
    const defaultWidth = DEFAULT_CONFIG.leftWidth;
    setLeftWidth(defaultWidth);
    currentWidthRef.current = defaultWidth;
    saveConfig({ leftWidth: defaultWidth });
  }, [saveConfig]);

  // ==================== 面板收起/展开 ====================

  const toggleLeftPanel = useCallback(() => {
    const newState = !isLeftCollapsed;
    setIsLeftCollapsed(newState);
    saveConfig({ isLeftCollapsed: newState });
  }, [isLeftCollapsed, saveConfig]);

  const toggleRightPanel = useCallback(() => {
    const newState = !isRightCollapsed;
    setIsRightCollapsed(newState);
    saveConfig({ isRightCollapsed: newState });
  }, [isRightCollapsed, saveConfig]);

  // ==================== 渲染 ====================

  return (
    <div
      ref={containerRef}
      className={`resizable-bom-panel ${className} ${isDragging ? 'dragging' : ''}`}
      style={{ height }}
    >
      {/* 左侧面板 */}
      <div
        ref={leftPanelRef}
        className={`bom-panel-left ${isLeftCollapsed ? 'collapsed' : ''}`}
        style={{
          width: isLeftCollapsed ? 0 : `${leftWidth}px`,
          minWidth: isLeftCollapsed ? 0 : `${leftWidth}px`,
        }}
      >
        {showLeftHeader && (
          <div className="panel-header">
            <span className="panel-title">{leftTitle}</span>
            <Tooltip title={isLeftCollapsed ? '展开' : '收起'}>
              <Button
                type="text"
                size="small"
                icon={isLeftCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleLeftPanel}
              />
            </Tooltip>
          </div>
        )}
        <div className="panel-content">
          {leftPanel}
        </div>
      </div>

      {/* 分隔条 */}
      {!isLeftCollapsed && !isRightCollapsed && (
        <div
          ref={dividerRef}
          className={`bom-divider ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDividerDoubleClick}
        >
          <div className="divider-handle">
            <span className="divider-line" />
            <span className="divider-line" />
          </div>
        </div>
      )}

      {/* 左侧收起时的展开按钮 */}
      {isLeftCollapsed && (
        <div className="expand-trigger left">
          <Tooltip title="展开BOM树" placement="right">
            <Button
              type="primary"
              ghost
              icon={<DoubleRightOutlined />}
              onClick={toggleLeftPanel}
              size="small"
            />
          </Tooltip>
        </div>
      )}

      {/* 右侧面板 */}
      <div
        className={`bom-panel-right ${isRightCollapsed ? 'collapsed' : ''}`}
        style={{
          width: isRightCollapsed ? 0 : 'auto',
          flex: isRightCollapsed ? 0 : 1,
        }}
      >
        {showRightHeader && (
          <div className="panel-header">
            <span className="panel-title">{rightTitle}</span>
            <Tooltip title={isRightCollapsed ? '展开' : '收起'}>
              <Button
                type="text"
                size="small"
                icon={isRightCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleRightPanel}
              />
            </Tooltip>
          </div>
        )}
        <div className="panel-content">
          {rightPanel}
        </div>
      </div>

      {/* 右侧收起时的展开按钮 */}
      {isRightCollapsed && (
        <div className="expand-trigger right">
          <Tooltip title="展开详细信息" placement="left">
            <Button
              type="primary"
              ghost
              icon={<DoubleLeftOutlined />}
              onClick={toggleRightPanel}
              size="small"
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ResizableBomPanel;
