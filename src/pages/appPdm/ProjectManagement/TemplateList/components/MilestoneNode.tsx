import React, { useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import './MilestoneNode.less';

export interface MilestoneNodeData {
  milestoneName: string;
  isApproval?: boolean;
  responsibleName?: string;
  formNames?: string[];
  formCount?: number;
  disabled?: boolean;
}

const formatForms = (formNames?: string[], formCount?: number) => {
  const list = (formNames || []).filter(Boolean);
  if (list.length === 0) {
    return formCount && formCount > 0 ? `已选 ${formCount} 个` : '-';
  }
  if (list.length <= 2) return list.join('、');
  const rest = formCount && formCount > list.length ? formCount - list.length : 0;
  return `${list.slice(0, 2).join('、')}${rest > 0 ? ` 等${formCount}个` : ''}`;
};

/**
 * 里程碑节点组件（参考工艺路线 ProcessNode 样式）
 * 在 ReactFlow 画布上展示：关联表单、是否审批、负责人
 */
const MilestoneNode: React.FC<NodeProps<MilestoneNodeData>> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);

  const nodeClassName = ['milestone-node', selected && 'selected', hovered && 'hovered', data.isApproval && 'approval-node']
    .filter(Boolean)
    .join(' ');

  const formText = formatForms(data.formNames, data.formCount);

  return (
    <div className={nodeClassName} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* 查看模式也需要渲染 Handle，否则 ReactFlow 无法计算连接线锚点 */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        isConnectable={!data.disabled}
        style={data.disabled ? { opacity: 0, pointerEvents: 'none' } : undefined}
      />

      <div className="node-header">
        <div className="node-indicator">●</div>
        <div className="node-title" title={data.milestoneName}>
          {data.milestoneName}
        </div>
        <div className="node-badges">
          {data.isApproval && <span className="badge badge-approval">审批</span>}
        </div>
      </div>

      <div className="node-content">
        <div className="node-info-row">
          <span className="info-label">是否审批:</span>
          <span className="info-value">{data.isApproval ? '是' : '否'}</span>
        </div>
        <div className="node-info-row">
          <span className="info-label">关联表单:</span>
          <span className="info-value" title={Array.isArray(data.formNames) ? data.formNames.join('、') : undefined}>
            {formText}
          </span>
        </div>
        {!!data.responsibleName && (
          <div className="node-info-row">
            <span className="info-label">负责人:</span>
            <span className="info-value">{data.responsibleName}</span>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={!data.disabled}
        style={data.disabled ? { opacity: 0, pointerEvents: 'none' } : undefined}
      />
    </div>
  );
};

export default MilestoneNode;
