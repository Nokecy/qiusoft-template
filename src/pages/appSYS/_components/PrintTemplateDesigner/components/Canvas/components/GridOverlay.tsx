/**
 * 网格覆盖层组件
 * 用于在启用labelGridLayout的section区域绘制虚线网格
 */

import React from 'react';
import type { TemplateSections, LabelGridLayout } from '../../../types';
import { SectionType as SectionTypeEnum } from '../../../types';
import { GridLayoutMode } from '../../../types';
import { mmToPx } from '../../../utils';
import { calculateSectionLayout } from '../../../utils/sectionUtils';

export interface GridOverlayProps {
  sections?: TemplateSections;
  width: number;  // 画布宽度(mm)
  height: number; // 画布高度(mm)
  dpi: number;
  displayScale: number;
  elements: any[]; // 用于计算section布局
}

/**
 * 计算固定模式下的网格尺寸
 */
const calculateFixedGridSize = (
  gridLayout: LabelGridLayout,
  sectionWidth: number,
  sectionHeight: number
) => {
  const rows = gridLayout.rows?.staticValue ?? 1;
  const columns = gridLayout.columns?.staticValue ?? 1;

  const cellWidth = sectionWidth / columns;
  const cellHeight = sectionHeight / rows;

  return { rows, columns, cellWidth, cellHeight };
};

/**
 * GridOverlay - 绘制section区域的虚线网格
 */
export const GridOverlay: React.FC<GridOverlayProps> = ({
  sections,
  width,
  height,
  dpi,
  displayScale,
  elements,
}) => {
  if (!sections) return null;

  // 计算section布局
  const layout = calculateSectionLayout({
    canvas: { width, height, dpi },
    sections,
    elements,
  } as any);

  const gridOverlays: JSX.Element[] = [];

  // 辅助函数：为指定section绘制网格
  const renderGridForSection = (
    type: SectionTypeEnum,
    gridLayout: LabelGridLayout,
    offset: number,
    sectionHeight: number,
    areaIndex?: number
  ) => {

    // 只在固定模式下绘制网格
    if (gridLayout.mode !== GridLayoutMode.Fixed) {
      return;
    }

    // 计算网格尺寸
    const { rows, columns, cellWidth, cellHeight } = calculateFixedGridSize(
      gridLayout,
      width,
      sectionHeight
    );

    // 转换为像素
    const offsetPx = mmToPx(offset, dpi) * displayScale;
    const sectionWidthPx = mmToPx(width, dpi) * displayScale;
    const sectionHeightPx = mmToPx(sectionHeight, dpi) * displayScale;
    const cellWidthPx = mmToPx(cellWidth, dpi) * displayScale;
    const cellHeightPx = mmToPx(cellHeight, dpi) * displayScale;

    // 绘制网格线
    const lines: JSX.Element[] = [];

    // 生成唯一的key前缀
    const keyPrefix = areaIndex !== undefined ? `${type}-${areaIndex}` : `${type}`;

    // 垂直线 (列分隔线)
    for (let col = 0; col <= columns; col++) {
      const x = col * cellWidthPx;
      lines.push(
        <div
          key={`v-${keyPrefix}-${col}`}
          style={{
            position: 'absolute',
            left: x,
            top: 0,
            width: 1,
            height: sectionHeightPx,
            borderLeft: col === 0 || col === columns ? '2px solid #1890ff' : '1px dashed #1890ff',
            opacity: col === 0 || col === columns ? 0.6 : 0.4,
            pointerEvents: 'none',
          }}
        />
      );
    }

    // 水平线 (行分隔线)
    for (let row = 0; row <= rows; row++) {
      const y = row * cellHeightPx;
      lines.push(
        <div
          key={`h-${keyPrefix}-${row}`}
          style={{
            position: 'absolute',
            left: 0,
            top: y,
            width: sectionWidthPx,
            height: 1,
            borderTop: row === 0 || row === rows ? '2px solid #1890ff' : '1px dashed #1890ff',
            opacity: row === 0 || row === rows ? 0.6 : 0.4,
            pointerEvents: 'none',
          }}
        />
      );
    }

    // 高亮第一个网格 (0,0)
    const firstCellHighlight = (
      <div
        key={`first-cell-${keyPrefix}`}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: cellWidthPx,
          height: cellHeightPx,
          background: 'rgba(24, 144, 255, 0.08)',
          border: '2px dashed #1890ff',
          borderRadius: 4,
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
      >
        {/* 提示文字 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#1890ff',
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            textShadow: '0 0 4px rgba(255,255,255,0.8)',
          }}
        >
          拖入元素到此单元格
        </div>
      </div>
    );

    // 包装整个section的网格
    gridOverlays.push(
      <div
        key={`grid-${keyPrefix}`}
        style={{
          position: 'absolute',
          left: 0,
          top: offsetPx,
          width: sectionWidthPx,
          height: sectionHeightPx,
          pointerEvents: 'none',
        }}
      >
        {lines}
        {firstCellHighlight}
      </div>
    );
  };

  // 1. 绘制页头网格
  if (sections.header?.labelGridLayout) {
    renderGridForSection(
      SectionTypeEnum.Header,
      sections.header.labelGridLayout,
      layout.headerOffset,
      layout.headerHeight
    );
  }

  // 2. 绘制内容区域网格（支持多内容区域）
  if (sections.contentAreas && sections.contentAreas.length > 0) {
    sections.contentAreas.forEach((area, index) => {
      if (area.labelGridLayout && layout.contentAreas[index]) {
        const areaLayout = layout.contentAreas[index];
        renderGridForSection(
          SectionTypeEnum.Content,
          area.labelGridLayout,
          areaLayout.actualY,
          areaLayout.height,
          index
        );
      }
    });
  } else if (sections.content?.labelGridLayout) {
    // 兼容旧版单内容区域模式
    renderGridForSection(
      SectionTypeEnum.Content,
      sections.content.labelGridLayout,
      layout.contentOffset,
      layout.contentHeight
    );
  }

  // 3. 绘制页尾网格
  if (sections.footer?.labelGridLayout) {
    renderGridForSection(
      SectionTypeEnum.Footer,
      sections.footer.labelGridLayout,
      layout.footerOffset,
      layout.footerHeight
    );
  }

  return <>{gridOverlays}</>;
};
