import React from 'react';
import { Button, Space, Divider, Tooltip } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  LinkOutlined,
  DeploymentUnitOutlined,
  FullscreenOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';

interface ToolbarProps {
  onAddNode: () => void;
  onDeleteSelected: () => void;
  onToggleConnectionMode: () => void;
  onAutoLayout: () => void;
  onFitView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onUndo: () => void;
  onRedo: () => void;
  hasSelectedNodes: boolean;
  connectionMode: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

/**
 * 编辑器工具栏组件
 * 提供节点操作、画布控制和撤销重做功能
 */
const Toolbar: React.FC<ToolbarProps> = ({
  onAddNode,
  onDeleteSelected,
  onToggleConnectionMode,
  onAutoLayout,
  onFitView,
  onZoomIn,
  onZoomOut,
  onUndo,
  onRedo,
  hasSelectedNodes,
  connectionMode,
  canUndo,
  canRedo,
}) => {
  return (
    <div
      className="editor-toolbar"
      style={{
        padding: '12px 16px',
        background: '#fafafa',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Space size={8}>
        {/* 节点操作区 */}
        <Space.Compact>
          <Button
            icon={<DeleteOutlined />}
            onClick={onDeleteSelected}
            disabled={!hasSelectedNodes}
            danger={hasSelectedNodes}
          >
            删除
          </Button>
          <Button
            icon={<LinkOutlined />}
            onClick={onToggleConnectionMode}
            type={connectionMode ? 'primary' : 'default'}
          >
            {connectionMode ? '退出连线' : '连线'}
          </Button>
        </Space.Compact>

        <Divider type="vertical" />

        {/* 画布操作区 */}
        <Space.Compact>
          <Tooltip title="自动布局">
            <Button icon={<DeploymentUnitOutlined />} onClick={onAutoLayout}>
              自动布局
            </Button>
          </Tooltip>
          <Tooltip title="适应画布">
            <Button icon={<FullscreenOutlined />} onClick={onFitView}>
              适应
            </Button>
          </Tooltip>
          <Tooltip title="放大">
            <Button icon={<ZoomInOutlined />} onClick={onZoomIn} />
          </Tooltip>
          <Tooltip title="缩小">
            <Button icon={<ZoomOutOutlined />} onClick={onZoomOut} />
          </Tooltip>
        </Space.Compact>

        <Divider type="vertical" />

        {/* 编辑控制区 */}
        <Space.Compact>
          <Tooltip title="撤销 (Ctrl+Z)">
            <Button icon={<UndoOutlined />} onClick={onUndo} disabled={!canUndo}>
              撤销
            </Button>
          </Tooltip>
          <Tooltip title="重做 (Ctrl+Y)">
            <Button icon={<RedoOutlined />} onClick={onRedo} disabled={!canRedo}>
              重做
            </Button>
          </Tooltip>
        </Space.Compact>
      </Space>
    </div>
  );
};

export default Toolbar;
