/**
 * 网格检测工具函数
 * 用于检测元素是否在网格的第一个单元格内
 */

import type { AtlElement, TemplateSections, LabelGridLayout, SectionType } from '../../../types';
import { SectionType as SectionTypeEnum, GridLayoutMode } from '../../../types';
import { calculateSectionLayout } from '../../../utils/sectionUtils';

/**
 * 计算固定模式下的第一个网格单元格范围
 */
const calculateFirstGridCellBounds = (
  gridLayout: LabelGridLayout,
  sectionOffset: number,
  sectionWidth: number,
  sectionHeight: number
) => {
  const rows = gridLayout.rows?.staticValue ?? 1;
  const columns = gridLayout.columns?.staticValue ?? 1;

  const cellWidth = sectionWidth / columns;
  const cellHeight = sectionHeight / rows;

  return {
    x: 0,
    y: sectionOffset,
    width: cellWidth,
    height: cellHeight,
  };
};

/**
 * 网格检测结果接口
 */
export interface GridDetectionResult {
  sectionType: SectionType;  // 区域类型
  areaIndex?: number;        // 内容区域索引（多内容区域模式下使用）
  cellBounds: {              // 第一个网格单元格边界
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * 检测元素中心点是否在某个section的第一个网格单元格内
 * 支持传统section和多内容区域
 */
export const detectFirstGridCell = (
  element: AtlElement,
  sections: TemplateSections | undefined,
  canvasWidth: number,
  canvasHeight: number,
  canvasDpi: number,
  allElements: AtlElement[]
): GridDetectionResult | null => {
  if (!sections) return null;

  // 计算元素中心点
  const centerX = element.position.x + element.size.width / 2;
  const centerY = element.position.y + element.size.height / 2;

  // 计算section布局
  const layout = calculateSectionLayout({
    canvas: { width: canvasWidth, height: canvasHeight, dpi: canvasDpi },
    sections,
    elements: allElements,
  } as any);

  // 1. 检查页头
  if (sections.header?.labelGridLayout) {
    const gridLayout = sections.header.labelGridLayout;
    if (gridLayout.mode === GridLayoutMode.Fixed) {
      const cellBounds = calculateFirstGridCellBounds(
        gridLayout,
        layout.headerOffset,
        canvasWidth,
        layout.headerHeight
      );

      if (
        centerX >= cellBounds.x &&
        centerX <= cellBounds.x + cellBounds.width &&
        centerY >= cellBounds.y &&
        centerY <= cellBounds.y + cellBounds.height
      ) {
        return { sectionType: SectionTypeEnum.Header, cellBounds };
      }
    }
  }

  // 2. 检查多内容区域
  if (sections.contentAreas && sections.contentAreas.length > 0) {
    for (let i = 0; i < sections.contentAreas.length; i++) {
      const area = sections.contentAreas[i];
      if (!area.labelGridLayout) continue;

      const gridLayout = area.labelGridLayout;
      if (gridLayout.mode !== GridLayoutMode.Fixed) continue;

      // 获取该区域的布局信息
      const areaLayout = layout.contentAreas?.[i];
      if (!areaLayout) continue;

      const cellBounds = calculateFirstGridCellBounds(
        gridLayout,
        areaLayout.actualY,
        canvasWidth,
        areaLayout.height
      );

      if (
        centerX >= cellBounds.x &&
        centerX <= cellBounds.x + cellBounds.width &&
        centerY >= cellBounds.y &&
        centerY <= cellBounds.y + cellBounds.height
      ) {
        return {
          sectionType: SectionTypeEnum.Content,
          areaIndex: i,
          cellBounds
        };
      }
    }
  }
  // 3. 检查传统单内容区域（向后兼容）
  else if (sections.content?.labelGridLayout) {
    const gridLayout = sections.content.labelGridLayout;
    if (gridLayout.mode === GridLayoutMode.Fixed) {
      const cellBounds = calculateFirstGridCellBounds(
        gridLayout,
        layout.contentOffset,
        canvasWidth,
        layout.contentHeight
      );

      if (
        centerX >= cellBounds.x &&
        centerX <= cellBounds.x + cellBounds.width &&
        centerY >= cellBounds.y &&
        centerY <= cellBounds.y + cellBounds.height
      ) {
        return { sectionType: SectionTypeEnum.Content, cellBounds };
      }
    }
  }

  // 4. 检查页尾
  if (sections.footer?.labelGridLayout) {
    const gridLayout = sections.footer.labelGridLayout;
    if (gridLayout.mode === GridLayoutMode.Fixed) {
      const cellBounds = calculateFirstGridCellBounds(
        gridLayout,
        layout.footerOffset,
        canvasWidth,
        layout.footerHeight
      );

      if (
        centerX >= cellBounds.x &&
        centerX <= cellBounds.x + cellBounds.width &&
        centerY >= cellBounds.y &&
        centerY <= cellBounds.y + cellBounds.height
      ) {
        return { sectionType: SectionTypeEnum.Footer, cellBounds };
      }
    }
  }

  return null;
};
