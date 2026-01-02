import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Empty } from 'antd';
import './MilestoneFlowChart.less';

interface MilestoneFlowChartProps {
  milestones?: any[];
  currentMilestoneId?: string;  // 当前选中的里程碑ID
  onMilestoneClick?: (milestoneId: string) => void;  // 点击里程碑的回调
}

/**
 * 项目模板里程碑流程图组件
 * 使用 Mermaid 展示里程碑的线性流程和并行结构
 */
const MilestoneFlowChart: React.FC<MilestoneFlowChartProps> = ({ milestones, currentMilestoneId, onMilestoneClick }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const renderIdRef = useRef<number>(0);

  // 确保 milestones 始终是数组
  const validMilestones = Array.isArray(milestones) ? milestones : [];

  useEffect(() => {
    // 初始化 Mermaid 配置 - 卡通风格
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        // 主色调 - 清新蓝色
        primaryColor: '#4FC3F7',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#29B6F6',

        // 审批节点 - 温暖橙色
        secondaryColor: '#FF9800',
        secondaryTextColor: '#ffffff',
        secondaryBorderColor: '#FB8C00',

        // 连接线颜色 - 渐变效果
        lineColor: '#E91E63',

        // 字体
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif',
        fontSize: '14px',
      },
      flowchart: {
        useMaxWidth: false, // 禁用自动缩放
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 120,
        rankSpacing: 150,
        padding: 30,
        diagramPadding: 30,
      },
    });
  }, []);

  useEffect(() => {
    // 过滤掉空对象和没有名称的里程碑
    const filteredMilestones = validMilestones.filter(m => m && m.milestoneName && m.milestoneName.trim());

    if (filteredMilestones.length === 0 || !chartRef.current) {
      return;
    }

    // 生成 Mermaid 流程图代码
    const mermaidCode = generateMermaidFlowChart(filteredMilestones);



    // 渲染流程图
    renderFlowChart(mermaidCode);
  }, [validMilestones, currentMilestoneId]); // 添加 currentMilestoneId 依赖，确保选中状态变化时重新渲染

  /**
   * 获取节点颜色 - 根据索引循环使用不同颜色
   */
  const getNodeColor = (index: number, isApproval: boolean): { fill: string; stroke: string } => {
    if (isApproval) {
      // 审批节点 - 黄色系
      return { fill: '#FFC107', stroke: '#FFA000' };
    }

    // 普通节点 - 多彩循环
    const colors = [
      { fill: '#E91E63', stroke: '#C2185B' }, // 玫红色
      { fill: '#4FC3F7', stroke: '#0288D1' }, // 天蓝色
      { fill: '#66BB6A', stroke: '#388E3C' }, // 绿色
      { fill: '#FF9800', stroke: '#F57C00' }, // 橙色
      { fill: '#AB47BC', stroke: '#7B1FA2' }, // 紫色
    ];

    return colors[index % colors.length];
  };

  /**
   * 获取里程碑的父级标识数组(支持parentCodes和parentMilestoneIds两种格式)
   */
  const getParentIdentifiers = (milestone: any): string[] => {
    // 优先使用 parentCodes (模板页面使用,存储里程碑名称)
    if (milestone.parentCodes && Array.isArray(milestone.parentCodes) && milestone.parentCodes.length > 0) {
      return milestone.parentCodes;
    }
    // 其次使用 parentMilestoneIds (项目页面使用,存储里程碑ID)
    if (milestone.parentMilestoneIds && Array.isArray(milestone.parentMilestoneIds) && milestone.parentMilestoneIds.length > 0) {
      return milestone.parentMilestoneIds;
    }
    return [];
  };

  /**
   * 生成 Mermaid 流程图代码 - 卡通风格
   */
  const generateMermaidFlowChart = (milestones: any[]): string => {
    let code = 'graph LR\n';

    // 添加开始节点
    const startNodeLabel = `<div style="text-align:center;padding:10px;">
      <div style="font-size:20px;margin-bottom:6px;">🚀</div>
      <div style="font-size:14px;font-weight:600;color:#fff;">开始</div>
    </div>`;
    code += `  START((${startNodeLabel}))\n`;

    // 添加结束节点
    const endNodeLabel = `<div style="text-align:center;padding:10px;">
      <div style="font-size:20px;margin-bottom:6px;">🎉</div>
      <div style="font-size:14px;font-weight:600;color:#fff;">结束</div>
    </div>`;
    code += `  END((${endNodeLabel}))\n`;

    // 创建节点 ID 映射 - 同时支持按名称和按ID查找
    const nodeIdMap = new Map<string, string>();
    milestones.forEach((m, index) => {
      const nodeId = `N${index}`;
      // 按名称映射(用于模板页面)
      nodeIdMap.set(m.milestoneName, nodeId);
      // 按ID映射(用于项目页面)
      if (m.id) {
        nodeIdMap.set(m.id, nodeId);
      }
    });

    // 如果有里程碑，找到第一个节点（没有父级的节点）
    const firstMilestones = milestones.filter(m => {
      const parents = getParentIdentifiers(m);
      return parents.length === 0;
    });
    const lastMilestones = milestones.filter(m => {
      // 找到没有子节点的节点作为最后节点
      const hasChildren = milestones.some(child => {
        const childParents = getParentIdentifiers(child);
        // 检查子节点的父级是否包含当前里程碑(通过名称或ID匹配)
        return childParents.includes(m.milestoneName) || (m.id && childParents.includes(m.id));
      });
      return !hasChildren;
    });

    // 为每个里程碑创建节点定义和连接
    milestones.forEach((m, index) => {
      const nodeId = nodeIdMap.get(m.milestoneName);
      if (!nodeId) return;

      // 获取节点图标
      let icon = '🎯';
      if (m.isApproval) {
        icon = '✅'; // 审批节点
      }

      // 构建节点标签内容 - 简洁版
      let nodeLabel = `<div style="text-align:center;padding:10px;">`;
      nodeLabel += `<div style="font-size:20px;margin-bottom:6px;">${icon}</div>`;
      nodeLabel += `<div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:4px;">${m.milestoneName}</div>`;

      if (m.responsibleName) {
        nodeLabel += `<div style="font-size:11px;color:#fff;opacity:0.9;">${m.responsibleName}</div>`;
      }

      nodeLabel += `</div>`;

      // 使用圆形节点 - 卡通风格
      const nodeShape = `((${nodeLabel}))`;

      // 连接线样式 - 虚线箭头
      const linkStyle = m.isApproval ? '-.->|审批|' : '==>';

      // 获取父级标识数组(支持parentCodes和parentMilestoneIds)
      const parentIdentifiers = getParentIdentifiers(m);

      // 如果有父级里程碑,创建连接
      if (parentIdentifiers.length > 0) {
        parentIdentifiers.forEach((parentIdentifier: string) => {
          // 尝试通过名称或ID查找父节点
          const parentId = nodeIdMap.get(parentIdentifier);
          if (parentId) {
            code += `  ${parentId} ${linkStyle} ${nodeId}${nodeShape}\n`;
          }
        });
      } else {
        // 起始节点,需要显示节点定义，并从START连接
        code += `  START ==> ${nodeId}${nodeShape}\n`;
      }
    });

    // 连接最后的节点到END
    if (lastMilestones.length > 0) {
      lastMilestones.forEach(m => {
        const nodeId = nodeIdMap.get(m.milestoneName);
        if (nodeId) {
          code += `  ${nodeId} ==> END\n`;
        }
      });
    } else if (milestones.length === 0) {
      // 如果没有里程碑，直接连接开始到结束
      code += `  START ==> END\n`;
    }

    // 添加样式类定义 - 彩色卡通风格
    // 开始节点样式
    code += `\n  classDef startStyle fill:#4CAF50,stroke:#388E3C,stroke-width:4px,color:#fff\n`;
    code += `  class START startStyle\n`;

    // 结束节点样式
    code += `\n  classDef endStyle fill:#FF5722,stroke:#E64A19,stroke-width:4px,color:#fff\n`;
    code += `  class END endStyle\n`;

    // 里程碑节点样式
    milestones.forEach((m, index) => {
      const nodeId = nodeIdMap.get(m.milestoneName);
      if (!nodeId) return;

      const color = getNodeColor(index, m.isApproval);
      code += `\n  classDef style${index} fill:${color.fill},stroke:${color.stroke},stroke-width:4px,color:#fff\n`;
      code += `  class ${nodeId} style${index}\n`;
    });

    return code;
  };

  /**
   * 渲染 Mermaid 流程图
   */
  const renderFlowChart = async (mermaidCode: string) => {
    if (!chartRef.current) return;

    try {
      // 清空容器
      chartRef.current.innerHTML = '';

      // 生成唯一 ID
      renderIdRef.current += 1;
      const id = `mermaid-milestone-${renderIdRef.current}`;

      // 渲染图表
      const { svg } = await mermaid.render(id, mermaidCode);

      // 插入 SVG
      chartRef.current.innerHTML = svg;

      // 添加点击事件监听
      if (onMilestoneClick && chartRef.current) {
        const svgElement = chartRef.current.querySelector('svg');
        if (svgElement) {
          // 为每个里程碑节点添加点击事件
          validMilestones.forEach((milestone) => {
            if (!milestone.id) return;

            // 查找对应的节点元素
            const nodeId = `flowchart-N${validMilestones.indexOf(milestone)}-`;
            const nodeElements = svgElement.querySelectorAll(`[id^="${nodeId}"]`);

            nodeElements.forEach((element) => {
              element.setAttribute('style', 'cursor: pointer;');
              element.addEventListener('click', () => {
                onMilestoneClick(milestone.id);
              });
            });
          });
        }
      }

      // 高亮当前选中的里程碑
      if (currentMilestoneId && chartRef.current) {
        const svgElement = chartRef.current.querySelector('svg');
        if (svgElement) {
          const currentIndex = validMilestones.findIndex(m => m.id === currentMilestoneId);
          if (currentIndex !== -1) {
            const nodeId = `flowchart-N${currentIndex}-`;
            const nodeElements = svgElement.querySelectorAll(`[id^="${nodeId}"]`);
            nodeElements.forEach((element) => {
              // 添加高亮样式
              element.setAttribute('stroke-width', '6');
              element.setAttribute('filter', 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))');
            });
          }
        }
      }
    } catch (error) {
      console.error('渲染 Mermaid 流程图失败:', error);
      if (chartRef.current) {
        chartRef.current.innerHTML = '<div style="color: red; padding: 20px;">流程图渲染失败,请检查数据格式</div>';
      }
    }
  };

  // 如果没有里程碑数据
  if (validMilestones.length === 0) {
    return (
      <div className="milestone-flowchart-container">
        <Empty description="暂无里程碑,请添加里程碑节点" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <div className="milestone-flowchart-container">
      <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: '#262626' }}>
        里程碑流程图
      </div>
      <div className="milestone-flowchart-wrapper" ref={chartRef}></div>
    </div>
  );
};

export default MilestoneFlowChart;
