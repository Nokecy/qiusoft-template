/**
 * 区域分隔线拖拽Hook
 */
import { useState, useCallback } from 'react';
import { AtlElement, TemplateSections, SectionType } from '../../../types';
import { calculateSectionLayout } from '../../../utils/sectionUtils';
import { SectionType as SectionTypeEnum } from '../../../types';

export interface SectionDividerDraggingState {
  dividerType: 'header-content' | 'content-bottom';
  startMousePos: number; // 开始时鼠标Y位置（毫米）
  initialHeaderHeight?: number; // 初始页头高度（毫米）
  initialCanvasHeight?: number; // 初始画布高度（毫米）
}

export interface UseSectionDividerParams {
  width: number;
  height: number;
  dpi: number;
  sections?: TemplateSections;
  elements: AtlElement[];
  onUpdateSection?: (sectionType: SectionType, config: Partial<any>) => void;
  onUpdateCanvasHeight?: (height: number) => void;
  toCanvasMm: (clientX: number, clientY: number) => { x: number; y: number };
}

export const useSectionDivider = ({
  width,
  height,
  dpi,
  sections,
  elements,
  onUpdateSection,
  onUpdateCanvasHeight,
  toCanvasMm,
}: UseSectionDividerParams) => {
  const [sectionDividerDragging, setSectionDividerDragging] =
    useState<SectionDividerDraggingState | null>(null);

  /**
   * 开始拖拽页头-内容区域分隔线
   */
  const handleHeaderContentDividerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!sections?.header || !onUpdateSection) return;

      const mousePos = toCanvasMm(e.clientX, e.clientY);
      const layout = calculateSectionLayout({
        canvas: { width, height, dpi },
        sections,
        elements,
      } as any);

      setSectionDividerDragging({
        dividerType: 'header-content',
        startMousePos: mousePos.y,
        initialHeaderHeight: layout.headerHeight,
      });
    },
    [sections, onUpdateSection, toCanvasMm, width, height, dpi, elements],
  );

  /**
   * 开始拖拽内容区域底部分隔线（调整画布高度）
   */
  const handleContentBottomDividerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!onUpdateCanvasHeight) return;

      const mousePos = toCanvasMm(e.clientX, e.clientY);

      setSectionDividerDragging({
        dividerType: 'content-bottom',
        startMousePos: mousePos.y,
        initialCanvasHeight: height,
      });
    },
    [onUpdateCanvasHeight, toCanvasMm, height],
  );

  /**
   * 拖拽区域分隔线中
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionDividerDragging) return false;

      const mousePos = toCanvasMm(e.clientX, e.clientY);
      const deltaY = mousePos.y - sectionDividerDragging.startMousePos;

      if (sectionDividerDragging.dividerType === 'header-content') {
        // 拖拽页头-内容分隔线，调整页头高度
        if (!sections || !onUpdateSection) return false;
        const newHeaderHeight =
          (sectionDividerDragging.initialHeaderHeight || 0) + deltaY;

        // 实时更新页头高度
        onUpdateSection(SectionTypeEnum.Header, { height: newHeaderHeight });
      } else if (sectionDividerDragging.dividerType === 'content-bottom') {
        // 拖拽内容区域底部分隔线,调整画布高度
        if (!onUpdateCanvasHeight) return false;

        // 计算当前布局,获取页头页尾高度
        const layout = calculateSectionLayout({
          canvas: { width, height, dpi },
          sections,
          elements,
        } as any);

        // 计算最小画布高度：页头高度 + 页尾高度 + 最小内容高度(10mm)
        const minContentHeight = 10; // 最小内容区域高度
        const minCanvasHeight =
          layout.headerHeight + layout.footerHeight + minContentHeight;

        const newCanvasHeight = Math.max(
          minCanvasHeight,
          (sectionDividerDragging.initialCanvasHeight || 0) + deltaY,
        );

        // 实时更新画布高度
        onUpdateCanvasHeight(newCanvasHeight);
      }

      return true; // 表示处理了拖拽
    },
    [
      sectionDividerDragging,
      sections,
      onUpdateSection,
      onUpdateCanvasHeight,
      width,
      height,
      dpi,
      elements,
      toCanvasMm,
    ],
  );

  /**
   * 结束拖拽
   */
  const handleMouseUp = useCallback(() => {
    setSectionDividerDragging(null);
  }, []);

  return {
    sectionDividerDragging,
    handleHeaderContentDividerMouseDown,
    handleContentBottomDividerMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
