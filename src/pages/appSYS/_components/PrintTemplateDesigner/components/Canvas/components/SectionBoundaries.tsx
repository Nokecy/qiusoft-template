/**
 * 区域边界组件
 * 负责渲染页头、内容、页尾区域的边界和分隔线
 */

import React from 'react';
import type { AtlElement, TemplateSections, SectionType, SectionConfig } from '../../../types';
import { mmToPx } from '../../../utils';
import { calculateSectionLayout, getSectionVisualConfig } from '../../../utils/sectionUtils';
import { calculateAreaPositions } from '../../../utils/multiContentAreaUtils';

export interface SectionBoundariesProps {
  sections?: TemplateSections;
  selectedSection?: SectionType | null;
  onSelectSection?: (sectionType: SectionType | null) => void;
  width: number; // 画布宽度（毫米）
  height: number; // 画布高度（毫米）
  dpi: number;
  displayScale: number;
  elements: AtlElement[];
  onUpdateSection?: (sectionType: SectionType, config: any) => void;
  onUpdateCanvasHeight?: (height: number) => void;
  handleSectionClick: (e: React.MouseEvent, sectionType: SectionType) => void;
  handleHeaderContentDividerMouseDown: (e: React.MouseEvent) => void;
  handleContentBottomDividerMouseDown: (e: React.MouseEvent) => void;
  sectionDividerDragging?: {
    dividerType: 'header-content' | 'content-bottom';
    startMousePos: number;
    initialHeaderHeight?: number;
    initialCanvasHeight?: number;
  } | null;
}

/**
 * 区域边界组件
 * 渲染页头/页尾区域边界线、标签和可拖拽的分隔线
 */
export const SectionBoundaries: React.FC<SectionBoundariesProps> = ({
  sections,
  selectedSection,
  onSelectSection,
  width,
  height,
  dpi,
  displayScale,
  elements,
  onUpdateSection,
  onUpdateCanvasHeight,
  handleSectionClick,
  handleHeaderContentDividerMouseDown,
  handleContentBottomDividerMouseDown,
  sectionDividerDragging,
}) => {
  if (!sections) return null;

  // 构建模板对象用于计算布局
  const template = {
    canvas: { width, height },
    sections,
    elements,
  };

  // 计算区域布局
  const layout = calculateSectionLayout(template as any);

  const boundaries: React.ReactNode[] = [];

  // 页头区域边界
  if (sections.header && layout.headerHeight > 0) {
    const visualConfig = getSectionVisualConfig(0); // SectionType.Header = 0
    const yPx = mmToPx(layout.headerHeight, dpi) * displayScale;
    const isSelected = selectedSection === 0;

    boundaries.push(
      <div
        key="header-boundary"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: yPx,
          backgroundColor: 'transparent',
          border: isSelected
            ? `3px dashed ${visualConfig.color}`
            : `2px dashed ${visualConfig.color}`,
          pointerEvents: 'none',
          zIndex: 0,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            padding: '2px 8px',
            background: visualConfig.color,
            color: '#fff',
            fontSize: 12,
            borderRadius: 2,
            fontWeight: 500,
            pointerEvents: 'auto',
            cursor: 'pointer',
            zIndex: 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSectionClick(e, 0);
          }}
        >
          {isSelected ? '✓ ' : ''}
          {visualConfig.label}
        </div>
      </div>
    );
  }

  // 内容区域边界(多内容区域模式)
  if (sections.contentAreas && sections.contentAreas.length > 0) {
    const areaPositions = calculateAreaPositions(sections);

    areaPositions.forEach((areaPos, index) => {
      const area = sections.contentAreas![index];
      const yPx = mmToPx(areaPos.y, dpi) * displayScale;
      const heightPx = mmToPx(areaPos.height, dpi) * displayScale;
      const isSelected = selectedSection === 1; // 内容区域类型为1

      // 为每个区域使用不同的颜色
      const colors = ['#52c41a', '#1890ff', '#722ed1', '#eb2f96', '#fa8c16'];
      const color = colors[index % colors.length];

      boundaries.push(
        <div
          key={`content-area-${index}`}
          style={{
            position: 'absolute',
            left: 0,
            top: yPx,
            width: '100%',
            height: heightPx,
            backgroundColor: 'transparent',
            border: isSelected
              ? `3px dashed ${color}`
              : `2px dashed ${color}`,
            pointerEvents: 'none',
            zIndex: 0,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 4,
              left: 4,
              padding: '2px 8px',
              background: color,
              color: '#fff',
              fontSize: 12,
              borderRadius: 2,
              fontWeight: 500,
              pointerEvents: 'auto',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleSectionClick(e, 1);
            }}
          >
            {isSelected ? '✓ ' : ''}
            {area.name || `内容区域${index + 1}`}
          </div>
        </div>
      );
    });
  }

  // 页尾区域边界
  if (sections.footer && layout.footerHeight > 0) {
    const visualConfig = getSectionVisualConfig(2); // SectionType.Footer = 2
    const yPx = mmToPx(layout.footerOffset, dpi) * displayScale;
    const heightPx = mmToPx(layout.footerHeight, dpi) * displayScale;
    const isSelected = selectedSection === 2;

    boundaries.push(
      <div
        key="footer-boundary"
        style={{
          position: 'absolute',
          left: 0,
          top: yPx,
          width: '100%',
          height: heightPx,
          backgroundColor: 'transparent',
          border: isSelected
            ? `3px dashed ${visualConfig.color}`
            : `2px dashed ${visualConfig.color}`,
          pointerEvents: 'none',
          zIndex: 0,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            padding: '2px 8px',
            background: visualConfig.color,
            color: '#fff',
            fontSize: 12,
            borderRadius: 2,
            fontWeight: 500,
            pointerEvents: 'auto',
            cursor: 'pointer',
            zIndex: 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSectionClick(e, 2);
          }}
        >
          {isSelected ? '✓ ' : ''}
          {visualConfig.label}
        </div>
      </div>
    );
  }

  // 页头-内容区域分隔线（可拖动调整页头高度）
  if (sections.header && layout.headerHeight > 0) {
    const dividerY = mmToPx(layout.headerHeight, dpi) * displayScale;
    const isDraggingThis = sectionDividerDragging?.dividerType === 'header-content';

    boundaries.push(
      <div
        key="header-content-divider"
        style={{
          position: 'absolute',
          left: 0,
          top: dividerY - 2,
          width: '100%',
          height: 4,
          cursor: 'ns-resize',
          zIndex: 101,
          background: isDraggingThis ? 'rgba(24, 144, 255, 0.5)' : 'transparent',
          borderTop: isDraggingThis ? '2px solid #1890ff' : 'none',
          pointerEvents: 'auto',
        }}
        onMouseDown={handleHeaderContentDividerMouseDown}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(24, 144, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          if (!isDraggingThis) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      />
    );
  }

  // 内容区域底部分隔线（可拖动调整画布高度）
  // 计算位置：如果有页尾，在页尾顶部；如果没有页尾，在画布底部
  const contentBottomY =
    sections.footer && layout.footerHeight > 0
      ? mmToPx(layout.headerHeight + layout.contentHeight, dpi) * displayScale
      : mmToPx(height, dpi) * displayScale;
  const isDraggingContentBottom = sectionDividerDragging?.dividerType === 'content-bottom';

  boundaries.push(
    <div
      key="content-bottom-divider"
      style={{
        position: 'absolute',
        left: 0,
        top: contentBottomY - 2,
        width: '100%',
        height: 4,
        cursor: 'ns-resize',
        zIndex: 101,
        background: isDraggingContentBottom ? 'rgba(24, 144, 255, 0.5)' : 'transparent',
        borderTop: isDraggingContentBottom ? '2px solid #1890ff' : 'none',
        pointerEvents: 'auto',
      }}
      onMouseDown={handleContentBottomDividerMouseDown}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(24, 144, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        if (!isDraggingContentBottom) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    />
  );

  return <>{boundaries}</>;
};
