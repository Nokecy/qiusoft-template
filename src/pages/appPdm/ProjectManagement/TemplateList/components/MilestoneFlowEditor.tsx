import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Empty, message } from 'antd';
import { useForm } from '@formily/react';

// D3 Polyfill - 必须在 ReactFlow 之前导入，解决生产构建时 interrupt 函数丢失问题
import '@/pages/appPdm/ProcessManagement/ProcessRoute/utils/d3Polyfill';

import ReactFlow, { Background, Controls, type Connection, type Edge, type Node, type NodeTypes, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

import './MilestoneFlowChart.less';
import MilestoneNode, { type MilestoneNodeData } from './MilestoneNode';
import { ProjectFormGetListAsync } from '@/services/pdm/ProjectForm';

interface MilestoneFlowEditorProps {
  milestones?: any[];
  fieldName?: string;
  parentField?: string;
  disabled?: boolean;
  /** 画布高度（像素），用于控制占屏比例 */
  height?: number;
}

const normalizeFormIds = (milestone: any): string[] => {
  if (!milestone) return [];
  if (Array.isArray(milestone.formIds)) return milestone.formIds.filter(Boolean);
  if (milestone.formId) return [milestone.formId].filter(Boolean);
  return [];
};

const formatFormNames = (formNames: string[], totalCount: number) => {
  if (!formNames || formNames.length === 0) return [];
  const unique = Array.from(new Set(formNames.filter(Boolean)));
  if (unique.length <= 2) return unique;
  return unique.slice(0, 2);
};

const uniqueNames = (names: any[]) => {
  const result: string[] = [];
  const set = new Set<string>();
  (names || [])
    .map((n) => String(n || '').trim())
    .filter(Boolean)
    .forEach((n) => {
      if (!set.has(n)) {
        set.add(n);
        result.push(n);
      }
    });
  return result;
};

const buildChildrenMap = (milestones: any[], parentField: string) => {
  const childrenMap = new Map<string, string[]>();
  milestones.forEach((milestone) => {
    const name = String(milestone?.milestoneName || '').trim();
    if (!name) return;
    const parents = uniqueNames(milestone?.[parentField]);
    parents.forEach((parentName) => {
      const list = childrenMap.get(parentName) || [];
      list.push(name);
      childrenMap.set(parentName, list);
    });
  });
  return childrenMap;
};

const wouldCreateCycle = (milestones: any[], parentField: string, sourceName: string, targetName: string) => {
  if (sourceName === targetName) return true;
  const childrenMap = buildChildrenMap(milestones, parentField);
  const visited = new Set<string>();
  const stack: string[] = [targetName];

  while (stack.length > 0) {
    const current = stack.pop() as string;
    if (visited.has(current)) continue;
    visited.add(current);
    const children = childrenMap.get(current) || [];
    for (const child of children) {
      if (child === sourceName) return true;
      stack.push(child);
    }
  }
  return false;
};

const computeLevelByName = (milestones: any[], parentField: string) => {
  const byName = new Map<string, any>();
  milestones.forEach((m) => {
    const name = String(m?.milestoneName || '').trim();
    if (name) byName.set(name, m);
  });

  const cache = new Map<string, number>();
  const visiting = new Set<string>();

  const dfs = (name: string): number => {
    if (cache.has(name)) return cache.get(name) as number;
    if (visiting.has(name)) return 0;
    visiting.add(name);

    const milestone = byName.get(name);
    const parents = uniqueNames(milestone?.[parentField]);
    const level = parents.length ? 1 + Math.max(...parents.map((p) => dfs(p))) : 0;
    cache.set(name, level);
    visiting.delete(name);
    return level;
  };

  byName.forEach((_m, name) => dfs(name));
  return cache;
};

const MilestoneFlowEditor: React.FC<MilestoneFlowEditorProps> = ({
  milestones,
  fieldName = 'milestones',
  parentField = 'parentCodes',
  disabled,
  height = 320,
}) => {
  const form = useForm();
  const validMilestones = useMemo(() => (Array.isArray(milestones) ? milestones : []), [milestones]);
  const [formIdNameMap, setFormIdNameMap] = useState<Map<string, string>>(new Map());

  // 根据节点数量自适应首次进入的最大缩放，避免“看起来太小”或“铺满屏幕”两个极端
  const initialMaxZoom = useMemo(() => {
    const count = validMilestones.filter((m) => m && String(m.milestoneName || '').trim()).length;
    if (count <= 4) return 0.8;
    if (count <= 8) return 0.65;
    if (count <= 12) return 0.55;
    return 0.4;
  }, [validMilestones]);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      milestoneNode: MilestoneNode,
    }),
    [],
  );

  useEffect(() => {
    let mounted = true;
    ProjectFormGetListAsync({ MaxResultCount: 1000, SkipCount: 0 })
      .then((res) => {
        if (!mounted) return;
        const map = new Map<string, string>();
        (res.items || []).forEach((item: any) => {
          if (item?.id) {
            map.set(item.id, item.formName || item.id);
          }
        });
        setFormIdNameMap(map);
      })
      .catch((err) => {
        console.warn('加载项目表单列表失败，将在节点中显示已选数量/ID:', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const nameToNodeId = useMemo(() => {
    const map = new Map<string, string>();
    validMilestones.forEach((m, index) => {
      const name = String(m?.milestoneName || '').trim();
      if (!name) return;
      const nodeId = m?.id ? `id:${m.id}` : `name:${name}:${index}`;
      map.set(name, nodeId);
    });
    return map;
  }, [validMilestones]);

  const nodeIdToName = useMemo(() => {
    const map = new Map<string, string>();
    nameToNodeId.forEach((nodeId, name) => map.set(nodeId, name));
    return map;
  }, [nameToNodeId]);

  const [nodes, setNodes, onNodesChange] = useNodesState<MilestoneNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const filteredMilestones = validMilestones.filter((m) => m && String(m.milestoneName || '').trim());
    if (filteredMilestones.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const levelMap = computeLevelByName(filteredMilestones, parentField);
    const yIndexByLevel = new Map<number, number>();

    const nextNodes: Node<MilestoneNodeData>[] = filteredMilestones.map((m: any, index: number) => {
      const name = String(m?.milestoneName || '').trim();
      const id = nameToNodeId.get(name) || `name:${name}:${index}`;
      const level = levelMap.get(name) || 0;
      const yIndex = yIndexByLevel.get(level) || 0;
      yIndexByLevel.set(level, yIndex + 1);

      const formIds = normalizeFormIds(m);
      const resolvedFormNames = formIds.map((fid) => formIdNameMap.get(fid)).filter(Boolean) as string[];
      const compactFormNames = formatFormNames(resolvedFormNames, formIds.length);

      return {
        id,
        type: 'milestoneNode',
        // 节点尺寸约 200×120，配套调整布局间距以保持紧凑
        position: { x: 40 + level * 240, y: 40 + yIndex * 104 },
        data: {
          milestoneName: name,
          isApproval: !!m?.isApproval,
          responsibleName: m?.responsibleName ? String(m.responsibleName) : undefined,
          formNames: compactFormNames,
          formCount: formIds.length,
          disabled: !!disabled,
        },
      };
    });

    const nextEdges: Edge[] = [];
    filteredMilestones.forEach((m: any) => {
      const childName = String(m?.milestoneName || '').trim();
      if (!childName) return;
      const childId = nameToNodeId.get(childName);
      if (!childId) return;

      const parentNames = uniqueNames(m?.[parentField]);
      parentNames.forEach((parentName) => {
        const parentId = nameToNodeId.get(parentName);
        if (!parentId) return;
        nextEdges.push({
          id: `e:${parentId}->${childId}`,
          source: parentId,
          target: childId,
          animated: false,
          type: 'smoothstep',
        });
      });
    });

    setNodes(nextNodes);
    setEdges(nextEdges);
  }, [disabled, formIdNameMap, nameToNodeId, parentField, setEdges, setNodes, validMilestones]);

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (disabled) return;
      const sourceId = connection.source;
      const targetId = connection.target;
      if (!sourceId || !targetId) return;

      const sourceName = nodeIdToName.get(sourceId);
      const targetName = nodeIdToName.get(targetId);
      if (!sourceName || !targetName) return;
      if (sourceName === targetName) return;

      if (wouldCreateCycle(validMilestones, parentField, sourceName, targetName)) {
        message.error('不允许形成循环父子关系');
        return;
      }

      const nextMilestones = validMilestones.map((m: any) => {
        const name = String(m?.milestoneName || '').trim();
        if (name !== targetName) return m;
        const existing = uniqueNames(m?.[parentField]);
        return { ...m, [parentField]: uniqueNames([...existing, sourceName]) };
      });

      form.setFieldState(fieldName, (state) => {
        state.value = nextMilestones;
      });
    },
    [disabled, fieldName, form, nodeIdToName, parentField, validMilestones],
  );

  if (validMilestones.length === 0) {
    return (
      <div className="milestone-flowchart-container">
        <Empty description="暂无里程碑,请添加里程碑节点" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <div className="milestone-flowchart-container">
      <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 500, color: '#262626' }}>里程碑流程图（可拖拽连线设置父子）</div>
      <div style={{ height, minHeight: 220, border: '1px solid #f0f0f0', borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { stroke: '#8c8c8c', strokeWidth: 2 },
          }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          fitView
          fitViewOptions={{ padding: 0.7, maxZoom: initialMaxZoom }}
          minZoom={0.2}
          maxZoom={2}
          nodesDraggable={!disabled}
          nodesConnectable={!disabled}
          elementsSelectable={!disabled}
        >
          <Background gap={16} color="#f0f0f0" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default MilestoneFlowEditor;
