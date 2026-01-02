import React, { useMemo } from 'react';
import './MilestoneFlowChartHorizontal.less';

interface Milestone {
  id?: string;
  milestoneName: string;
  parentCodes?: string[];
  status?: number;
  isApproval?: boolean;
  responsibleName?: string; // 负责人名称
}

interface MilestoneFlowChartHorizontalProps {
  milestones?: Milestone[];
  currentMilestoneId?: string;
  selectedMilestoneId?: string;
  onMilestoneClick?: (milestoneId: string) => void;
}

/**
 * 水平线性流程图组件
 * 完全匹配参考图片样式:
 * 1. 简洁的水平布局
 * 2. 小圆点节点 + 细线连接
 * 3. 绿色表示已完成/进行中,灰色表示未开始
 * 4. 支持并行节点(竖向排列)
 */
const MilestoneFlowChartHorizontal: React.FC<MilestoneFlowChartHorizontalProps> = ({
  milestones = [],
  currentMilestoneId,
  selectedMilestoneId,
  onMilestoneClick,
}) => {
  // 构建层级数据结构(用于处理并行节点)
  const { layers } = useMemo(() => {
    if (!milestones || milestones.length === 0) {
      return { layers: [] };
    }

    // 创建里程碑名称到对象的映射
    const map = new Map<string, Milestone>();
    milestones.forEach(m => {
      if (m.milestoneName) {
        map.set(m.milestoneName, m);
      }
    });

    // 计算每个里程碑的层级
    const levelMap = new Map<string, number>();
    const visited = new Set<string>();

    const calculateLevel = (milestone: Milestone): number => {
      if (!milestone || !milestone.milestoneName) return 0;

      const name = milestone.milestoneName;
      if (levelMap.has(name)) {
        return levelMap.get(name)!;
      }

      if (visited.has(name)) {
        return 0;
      }

      visited.add(name);

      if (!milestone.parentCodes || milestone.parentCodes.length === 0) {
        levelMap.set(name, 0);
        visited.delete(name);
        return 0;
      }

      let maxParentLevel = -1;
      milestone.parentCodes.forEach(parentName => {
        const parent = map.get(parentName);
        if (parent) {
          const parentLevel = calculateLevel(parent);
          maxParentLevel = Math.max(maxParentLevel, parentLevel);
        }
      });

      const level = maxParentLevel + 1;
      levelMap.set(name, level);
      visited.delete(name);
      return level;
    };

    milestones.forEach(m => calculateLevel(m));

    // 按层级分组
    const layersArray: Milestone[][] = [];
    milestones.forEach(m => {
      const level = levelMap.get(m.milestoneName) || 0;
      if (!layersArray[level]) {
        layersArray[level] = [];
      }
      layersArray[level].push(m);
    });

    return { layers: layersArray };
  }, [milestones]);

  // 获取里程碑状态
  // MilestoneStatus: 0=未开始, 10=执行中, 20=已完成, 30=异常, 40=已取消
  const getMilestoneStatus = (milestone: Milestone) => {
    if (milestone.status === 20) return 'completed';  // 已完成 - 绿色
    if (milestone.status === 10) return 'current';     // 执行中(当前) - 黄色
    if (milestone.id === currentMilestoneId) return 'current';  // 当前里程碑 - 黄色
    return 'pending';  // 未开始/其他 - 灰色
  };

  if (!milestones || milestones.length === 0) {
    return (
      <div className="milestone-flow-chart-horizontal empty">
        <p>暂无里程碑数据</p>
      </div>
    );
  }

  return (
    <div className="milestone-flow-chart-horizontal">
      <div className="flow-container">
        {layers.map((layer, layerIndex) => (
          <React.Fragment key={layerIndex}>
            {/* 当前层的节点组 */}
            <div className="milestone-layer">
              {layer.map((milestone, index) => {
                const status = getMilestoneStatus(milestone);
                const isSelected = milestone.id === selectedMilestoneId;
                const isCurrent = milestone.id === currentMilestoneId;

                return (
                  <div
                    key={milestone.id || index}
                    className={`horizontal-node ${status} ${isSelected ? 'selected' : ''} ${isCurrent ? 'is-current' : ''} ${milestone.isApproval ? 'needs-approval' : ''}`}
                    onClick={() => {
                      if (milestone.id && onMilestoneClick) {
                        onMilestoneClick(milestone.id);
                      }
                    }}
                    title={`${milestone.milestoneName}${milestone.responsibleName ? ` - 负责人: ${milestone.responsibleName}` : ''}${milestone.isApproval ? ' [需审批]' : ''}`}
                  >
                    <div className="node-dot" />
                    <div className="node-label">{milestone.milestoneName}</div>
                  </div>
                );
              })}
            </div>

            {/* 连接线(除了最后一层) */}
            {layerIndex < layers.length - 1 && (
              <div className="connector-wrapper">
                <div className="connector-line" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MilestoneFlowChartHorizontal;
