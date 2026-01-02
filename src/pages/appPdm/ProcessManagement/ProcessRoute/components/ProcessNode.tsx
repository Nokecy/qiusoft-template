import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Button, Space, Tooltip } from 'antd';
import {
  PaperClipOutlined,
  FileTextOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import './ProcessNode.less';

/**
 * 工序节点数据结构
 */
export interface ProcessNodeData {
  id: string;
  sequence: number; // Keep for compatibility, map to sort
  sort?: number;
  processProcedure: {
    id: string;
    code: string;
    name: string;
    workCenterCode?: string;
    workCenterName?: string;
  };
  station?: string;
  isNeedCheckPrevWp?: boolean;
  checkPrevQuantity?: number;
  isNeedCheckWp?: boolean;
  actionType?: string;
  isOutsourced?: boolean;
  workerCount?: number;
  fixPassCount?: number;
  failScrapCount?: number;
  manuFactureCost?: number;
  inspectionSchemeCode?: string;
  inspectionSchemeName?: string;
  sampleSchemeCode?: string;
  sampleSchemeName?: string;
  atpFileName?: string;
  esopFileName?: string;
  needPicture?: boolean;
  memo?: string;
  isStartNode?: boolean;
  isEndNode?: boolean;
}

/**
 * 工序节点组件
 * 在ReactFlow画布上展示单个工序信息
 */
const ProcessNode: React.FC<NodeProps<ProcessNodeData>> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);

  const handleEditNode = () => {
    // TODO: 触发节点编辑事件
    console.log('编辑节点:', data);
  };

  // 节点样式类名
  const nodeClassName = [
    'process-node',
    selected && 'selected',
    hovered && 'hovered',
    data.isStartNode && 'start-node',
    data.isEndNode && 'end-node',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={nodeClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ReactFlow 左侧连接点（入口） */}
      <Handle type="target" position={Position.Left} id="left" />

      {/* 节点头部 */}
      <div className="node-header">
        <div className="node-indicator">●</div>
        <div className="node-title">
          工序: {data.processProcedure.code} - {data.processProcedure.name}
          {data.isOutsourced && <span style={{ marginLeft: 8, fontSize: 10, color: '#faad14', border: '1px solid #faad14', padding: '0 4px', borderRadius: 2 }}>外协</span>}
        </div>
      </div>

      {/* 节点内容 */}
      <div className="node-content">
        {data.processProcedure.workCenterCode && (
          <div className="node-info-row">
            <span className="info-label">工作中心:</span>
            <span className="info-value">
              {data.processProcedure.workCenterCode} - {data.processProcedure.workCenterName}
            </span>
          </div>
        )}
        {data.inspectionSchemeCode && (
          <div className="node-info-row">
            <span className="info-label">检验方案:</span>
            <span className="info-value">{data.inspectionSchemeCode}</span>
          </div>
        )}
        <div className="node-info-row">
          <span className="info-label">序号:</span>
          <span className="info-value">{data.sequence}</span>
        </div>
      </div>

      {/* 节点操作 */}
      <div className="node-actions">
        <Space size="small">
          {data.atpFileName && (
            <Tooltip title={`ATP: ${data.atpFileName}`}>
              <Button type="text" size="small" icon={<PaperClipOutlined />} />
            </Tooltip>
          )}
          {data.esopFileName && (
            <Tooltip title={`ESOP: ${data.esopFileName}`}>
              <Button type="text" size="small" icon={<FileTextOutlined />} />
            </Tooltip>
          )}
          <Tooltip title="编辑详情">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={handleEditNode}
            />
          </Tooltip>
        </Space>
      </div>

      {/* ReactFlow 右侧连接点（出口） */}
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
};

export default ProcessNode;
