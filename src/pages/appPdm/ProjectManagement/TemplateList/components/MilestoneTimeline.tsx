import React, { useMemo } from 'react';
import { Empty, Tag } from 'antd';
import { CheckCircleOutlined, PlayCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './MilestoneTimeline.less';

interface MilestoneTimelineProps {
  milestones?: any[];
}

interface MilestoneNode {
  name: string;
  responsibleName?: string;
  parentCode?: string; // 兼容旧字段
  parentCodes?: string[]; // 新字段:支持多个父级
  sequence?: number;
  isApproval?: boolean;
  children: MilestoneNode[];
  level: number;
  x?: number; // X坐标
  y?: number; // Y坐标
}

/**
 * 项目模板里程碑时间轴组件
 * 使用SVG曲线连接,支持并行分支展示
 */
const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones = [] }) => {
  // 构建里程碑树形结构,支持并行分支
  const milestoneTree = useMemo(() => {
    // 过滤掉空对象和没有名称的里程碑
    const validMilestones = milestones.filter(m => m && m.milestoneName);

    if (validMilestones.length === 0) return null;

    // 创建一个映射表: milestoneName -> milestone数据
    const milestoneMap = new Map<string, any>();
    validMilestones.forEach(m => {
      if (m.milestoneName) {
        milestoneMap.set(m.milestoneName, m);
      }
    });

    // 查找所有顶层里程碑(没有父级或父级不存在的)
    const rootMilestones: MilestoneNode[] = [];
    const childrenMap = new Map<string, MilestoneNode[]>();

    // 创建节点映射表,确保每个节点只创建一次
    const nodeInstanceMap = new Map<string, MilestoneNode>();

    // 第一遍遍历:创建所有节点实例
    validMilestones.forEach(m => {
      if (!m.milestoneName || nodeInstanceMap.has(m.milestoneName)) return;

      nodeInstanceMap.set(m.milestoneName, {
        name: m.milestoneName,
        responsibleName: m.responsibleName,
        parentCode: m.parentCode,
        parentCodes: m.parentCodes,
        sequence: m.sequence ?? 0,
        isApproval: m.isApproval,
        children: [],
        level: 0,
      });
    });

    // 第二遍遍历:建立父子关系
    validMilestones.forEach(m => {
      if (!m.milestoneName) return;

      const node = nodeInstanceMap.get(m.milestoneName)!;
      // 支持新的parentCodes数组和旧的parentCode字段
      const parentCodes = m.parentCodes || (m.parentCode ? [m.parentCode] : []);
      const hasValidParent = parentCodes.length > 0 && parentCodes.some((p: string) => milestoneMap.has(p));

      if (!hasValidParent) {
        // 顶层里程碑(没有父级或父级不存在)
        if (!rootMilestones.find(r => r.name === node.name)) {
          rootMilestones.push(node);
        }
      } else {
        // 子里程碑 - 可能有多个父级
        // 对于每个父级,将当前节点添加到父级的children中(去重)
        parentCodes.forEach((parentCode: string) => {
          if (milestoneMap.has(parentCode)) {
            if (!childrenMap.has(parentCode)) {
              childrenMap.set(parentCode, []);
            }
            const children = childrenMap.get(parentCode)!;
            // 去重:检查是否已经添加过
            if (!children.find(c => c.name === node.name)) {
              children.push(node);
            }
          }
        });
      }
    });

    // 递归函数:为每个节点填充子节点
    const buildTree = (node: MilestoneNode, level: number): void => {
      node.level = level;
      const children = childrenMap.get(node.name) || [];
      // 按sequence排序子节点
      children.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
      node.children = children;
      children.forEach(child => buildTree(child, level + 1));
    };

    // 按sequence排序顶层节点
    rootMilestones.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
    rootMilestones.forEach(root => buildTree(root, 0));

    return rootMilestones;
  }, [milestones]);

  // 计算节点位置
  const calculatePositions = (roots: MilestoneNode[]) => {
    const nodeWidth = 200;
    const nodeHeight = 100;
    const horizontalGap = 100;
    const verticalGap = 40;

    // 第一个里程碑的X坐标应该在开始节点之后
    // 开始节点: x=20, width=180, 所以右边界=200
    // 加上gap,第一个里程碑从 200 + 100 = 300 开始
    const startX = 300;
    const startY = 120;

    const assignPositions = (nodes: MilestoneNode[], x: number, y: number, isParallel: boolean = false) => {
      if (isParallel) {
        // 并行排列(垂直)
        nodes.forEach((node, index) => {
          node.x = x;
          node.y = y + index * (nodeHeight + verticalGap);
          if (node.children.length > 0) {
            assignPositions(node.children, x + nodeWidth + horizontalGap, node.y, node.children.length > 1);
          }
        });
      } else {
        // 线性排列(水平)
        nodes.forEach((node, index) => {
          node.x = x + index * (nodeWidth + horizontalGap);
          node.y = y;
          if (node.children.length > 0) {
            assignPositions(node.children, node.x + nodeWidth + horizontalGap, y, node.children.length > 1);
          }
        });
      }
    };

    assignPositions(roots, startX, startY, roots.length > 1);
    return roots;
  };

  // 生成SVG曲线路径
  const generateCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const midX = (x1 + x2) / 2;
    // 使用三次贝塞尔曲线
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  };

  // 渲染连接线
  const renderConnections = (nodes: MilestoneNode[], parentNode?: { x: number; y: number }) => {
    const lines: JSX.Element[] = [];

    nodes.forEach((node, index) => {
      if (parentNode && node.x !== undefined && node.y !== undefined) {
        // 绘制从父节点到当前节点的曲线
        const startX = parentNode.x + 180; // 节点右边
        const startY = parentNode.y + 40; // 节点中心
        const endX = node.x + 20; // 节点左边
        const endY = node.y + 40; // 节点中心

        lines.push(
          <path
            key={`line-${parentNode.x}-${node.x}-${index}`}
            d={generateCurvePath(startX, startY, endX, endY)}
            fill="none"
            stroke="#91d5ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      }

      // 递归处理子节点
      if (node.children.length > 0 && node.x !== undefined && node.y !== undefined) {
        lines.push(...renderConnections(node.children, { x: node.x, y: node.y }));
      }
    });

    return lines;
  };

  // 渲染里程碑节点
  const renderNodes = (nodes: MilestoneNode[]) => {
    const result: JSX.Element[] = [];

    nodes.forEach(node => {
      if (node.x !== undefined && node.y !== undefined) {
        result.push(
          <g key={`node-${node.name}`} transform={`translate(${node.x}, ${node.y})`}>
            {/* 节点背景 */}
            <rect
              x="0"
              y="0"
              width="180"
              height="80"
              rx="16"
              fill="white"
              filter="url(#shadow)"
            />
            {/* 图标圆圈 */}
            <circle cx="30" cy="40" r="18" fill="#e6f7ff" />
            <foreignObject x="12" y="22" width="36" height="36">
              <div style={{ fontSize: '18px', color: '#1890ff', textAlign: 'center', lineHeight: '36px' }}>
                <ClockCircleOutlined />
              </div>
            </foreignObject>
            {/* 文本内容 */}
            <foreignObject x="55" y="15" width="120" height="70">
              <div className="milestone-node-content">
                <div className="milestone-title">{node.name}</div>
                {node.responsibleName && (
                  <div className="milestone-desc">负责人: {node.responsibleName}</div>
                )}
                {node.isApproval && (
                  <Tag color="orange" style={{ marginTop: 4, fontSize: '11px' }}>需审批</Tag>
                )}
              </div>
            </foreignObject>
          </g>
        );

        // 递归渲染子节点
        if (node.children.length > 0) {
          result.push(...renderNodes(node.children));
        }
      }
    });

    return result;
  };

  // 如果没有里程碑数据
  if (milestones.length === 0 || !milestoneTree) {
    return (
      <div className="milestone-timeline-container">
        <div className="milestone-timeline-empty">
          <svg width="400" height="150" viewBox="0 0 400 150">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
              </filter>
            </defs>
            {/* 开始节点 */}
            <g transform="translate(20, 35)">
              <rect x="0" y="0" width="140" height="80" rx="16" fill="white" filter="url(#shadow)" />
              <circle cx="30" cy="40" r="18" fill="#52c41a" />
              <foreignObject x="12" y="22" width="36" height="36">
                <div style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '36px' }}>
                  <PlayCircleOutlined />
                </div>
              </foreignObject>
              <foreignObject x="55" y="20" width="80" height="60">
                <div className="milestone-node-content">
                  <div className="milestone-title">开始</div>
                  <div className="milestone-desc">项目启动</div>
                </div>
              </foreignObject>
            </g>
            {/* 曲线 */}
            <path d="M 160 75 C 190 75, 190 75, 220 75" fill="none" stroke="#91d5ff" strokeWidth="3" strokeLinecap="round" />
            {/* 结束节点 */}
            <g transform="translate(220, 35)">
              <rect x="0" y="0" width="140" height="80" rx="16" fill="white" filter="url(#shadow)" />
              <circle cx="30" cy="40" r="18" fill="#faad14" />
              <foreignObject x="12" y="22" width="36" height="36">
                <div style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '36px' }}>
                  <CheckCircleOutlined />
                </div>
              </foreignObject>
              <foreignObject x="55" y="20" width="80" height="60">
                <div className="milestone-node-content">
                  <div className="milestone-title">结束</div>
                  <div className="milestone-desc">项目完成</div>
                </div>
              </foreignObject>
            </g>
          </svg>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Empty description="暂无里程碑,请添加里程碑节点" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        </div>
      </div>
    );
  }

  // 计算节点位置
  const positionedTree = calculatePositions(milestoneTree);

  // 计算SVG画布大小和结束节点位置
  const getCanvasSize = (nodes: MilestoneNode[]): { width: number; height: number; endX: number; endY: number } => {
    let maxX = 0;
    let maxY = 0;
    let minY = Infinity;
    let totalY = 0;
    let nodeCount = 0;

    const traverse = (node: MilestoneNode) => {
      if (node.x !== undefined && node.y !== undefined) {
        maxX = Math.max(maxX, node.x + 200);
        maxY = Math.max(maxY, node.y + 100);
        minY = Math.min(minY, node.y);
        // 只统计叶子节点的Y坐标来计算平均值
        if (node.children.length === 0) {
          totalY += node.y;
          nodeCount++;
        }
      }
      node.children.forEach(traverse);
    };

    nodes.forEach(traverse);

    // 结束节点放在最右侧,Y坐标为所有叶子节点的平均值
    const avgY = nodeCount > 0 ? totalY / nodeCount : 80;
    const endX = maxX + 100;
    const endY = avgY;

    return {
      width: Math.max(endX + 250, 600),
      height: Math.max(maxY + 100, 400),
      endX,
      endY
    };
  };

  const canvasSize = getCanvasSize(positionedTree);

  // 渲染完整流程: 开始 → 里程碑树 → 结束
  return (
    <div className="milestone-timeline-container">
      <div className="milestone-timeline-flow">
        <svg
          width="100%"
          height={canvasSize.height}
          viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* 绘制连接线 */}
          <g className="milestone-connections">
            {/* 开始到所有顶层里程碑的连接线 */}
            {positionedTree.map((rootNode, index) => {
              if (rootNode.x !== undefined && rootNode.y !== undefined) {
                return (
                  <path
                    key={`start-line-${index}`}
                    d={generateCurvePath(200, 80, rootNode.x + 20, rootNode.y + 40)}
                    fill="none"
                    stroke="#91d5ff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              }
              return null;
            })}
            {/* 里程碑之间的连接线 */}
            {renderConnections(positionedTree)}
            {/* 最后的里程碑到结束节点的连接线 */}
            {(() => {
              // 找到所有叶子节点
              const leafNodes: MilestoneNode[] = [];
              const findLeafNodes = (nodes: MilestoneNode[]) => {
                nodes.forEach(node => {
                  if (node.children.length === 0 && node.x !== undefined && node.y !== undefined) {
                    leafNodes.push(node);
                  } else {
                    findLeafNodes(node.children);
                  }
                });
              };
              findLeafNodes(positionedTree);

              // 为每个叶子节点绘制到结束节点的连接线
              return leafNodes.map((node, index) => (
                <path
                  key={`end-line-${index}`}
                  d={generateCurvePath(
                    node.x! + 180,
                    node.y! + 40,
                    canvasSize.endX + 20,
                    canvasSize.endY + 40
                  )}
                  fill="none"
                  stroke="#91d5ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ));
            })()}
          </g>

          {/* 开始节点 */}
          <g transform="translate(20, 40)">
            <rect x="0" y="0" width="180" height="80" rx="16" fill="white" filter="url(#shadow)" />
            <circle cx="30" cy="40" r="18" fill="#52c41a" />
            <foreignObject x="12" y="22" width="36" height="36">
              <div style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '36px' }}>
                <PlayCircleOutlined />
              </div>
            </foreignObject>
            <foreignObject x="55" y="20" width="120" height="60">
              <div className="milestone-node-content">
                <div className="milestone-title">开始</div>
                <div className="milestone-desc">项目启动</div>
              </div>
            </foreignObject>
          </g>

          {/* 里程碑节点 */}
          {renderNodes(positionedTree)}

          {/* 结束节点 */}
          <g transform={`translate(${canvasSize.endX}, ${canvasSize.endY})`}>
            <rect x="0" y="0" width="180" height="80" rx="16" fill="white" filter="url(#shadow)" />
            <circle cx="30" cy="40" r="18" fill="#faad14" />
            <foreignObject x="12" y="22" width="36" height="36">
              <div style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '36px' }}>
                <CheckCircleOutlined />
              </div>
            </foreignObject>
            <foreignObject x="55" y="20" width="120" height="60">
              <div className="milestone-node-content">
                <div className="milestone-title">结束</div>
                <div className="milestone-desc">项目完成</div>
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default MilestoneTimeline;
