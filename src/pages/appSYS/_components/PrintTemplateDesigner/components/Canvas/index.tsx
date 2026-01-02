/**
 * 画布组件 - 重构后的主组件
 * 负责整合所有子模块，提供完整的画布功能
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import type { CanvasProps } from './types';
import { SectionType as SectionTypeEnum, ElementType } from '../../types';
import { mmToPx, pxToMm } from '../../utils';
import { calculateSectionLayout, detectContentAreaIndex } from '../../utils/sectionUtils';

// Hooks
import { useCanvasCoordinates } from './hooks/useCanvasCoordinates';
import { useContextMenu } from './hooks/useContextMenu';
import { useDragDrop } from './hooks/useDragDrop';
import { useElementResize } from './hooks/useElementResize';
import { useTableDivider } from './hooks/useTableDivider';
import { useSectionDivider } from './hooks/useSectionDivider';
import { useCellEdit } from './hooks/useCellEdit';

// Components
import { ElementRenderer } from './components/ElementRenderer';
import { CanvasGrid, CanvasVerticalRuler } from './components/CanvasGrid';
import { SectionBoundaries } from './components/SectionBoundaries';
import { ContextMenuUI } from './components/ContextMenuUI';
import { GridOverlay } from './components/GridOverlay';
import { CellEditModal } from './components/CellEditModal';

/**
 * 画布主组件
 */
export const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  dpi,
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElementPosition,
  onUpdateElementSize,
  onUpdateElementProperties,
  onUpdateElement,
  onAddElementAtPosition,
  onRemoveElement,
  onMoveToTop,
  onMoveToBottom,
  onMoveUp,
  onMoveDown,
  showGrid = true,
  showRuler = true,
  showSectionBoundaries = true,
  showGridBoundaries = true,
  bindingContext = {},
  sections,
  selectedSection,
  onSelectSection,
  onUpdateSection,
  onUpdateCanvasHeight,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const initialScaleRef = useRef<number | null>(null);

  // ========== 拖放状态 ==========
  const [isDragOver, setIsDragOver] = useState(false);

  // ========== 计算显示参数 ==========
  const canvasWidthPx = mmToPx(width, dpi);
  const canvasHeightPx = mmToPx(height, dpi);

  // 计算缩放比例 - 使用初始缩放比例,防止画布高度变化导致视角缩放
  if (initialScaleRef.current === null) {
    initialScaleRef.current = Math.min(800 / canvasWidthPx, 600 / canvasHeightPx, 2);
  }
  const displayScale = initialScaleRef.current;

  const gridSizeMm = 5;
  const rulerSize = 30;

  // ========== 初始化 Hooks ==========
  // 坐标转换
  const coordinates = useCanvasCoordinates({
    canvasRef,
    displayScale,
    dpi,
  });

  // 右键菜单
  const contextMenu = useContextMenu({
    elements,
    onSelectElement,
    onUpdateElement,
    onRemoveElement,
    onMoveToTop,
    onMoveToBottom,
    onMoveUp,
    onMoveDown,
  });

  // 拖拽
  const dragDrop = useDragDrop({
    elements,
    width,
    height,
    dpi,
    sections,
    onSelectElement,
    onSelectSection,
    onUpdateElementPosition,
    onUpdateElement,
    onUpdateSection,
    toCanvasMm: coordinates.toCanvasMm,
  });

  // 调整大小
  const resize = useElementResize({
    elements,
    onUpdateElementSize,
    onUpdateElementPosition,
    onUpdateElement,
    toCanvasMm: coordinates.toCanvasMm,
  });

  // 表格分隔线
  const tableDivider = useTableDivider({
    elements,
    onUpdateElement,
    toCanvasMm: coordinates.toCanvasMm,
  });

  // 区域分隔线
  const sectionDivider = useSectionDivider({
    width,
    height,
    dpi,
    sections,
    elements,
    onUpdateSection,
    onUpdateCanvasHeight,
    toCanvasMm: coordinates.toCanvasMm,
  });

  // 单元格编辑
  const cellEdit = useCellEdit(onUpdateElement);

  // ========== 鼠标事件处理（统一） ==========
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // 按优先级处理不同的拖拽类型
      if (dragDrop.handleMouseMove(e)) return;
      if (tableDivider.handleMouseMove(e)) return;
      if (sectionDivider.handleMouseMove(e)) return;
      if (resize.handleMouseMove(e)) return;
    },
    [dragDrop, tableDivider, sectionDivider, resize]
  );

  const handleMouseUp = useCallback(() => {
    dragDrop.handleMouseUp();
    resize.handleMouseUp();
    tableDivider.handleMouseUp();
    sectionDivider.handleMouseUp();
  }, [dragDrop, resize, tableDivider, sectionDivider]);

  // ========== 区域点击处理 ==========
  const handleSectionClick = useCallback(
    (e: React.MouseEvent, sectionType: SectionTypeEnum) => {
      e.stopPropagation();
      onSelectElement(null);
      if (onSelectSection) {
        onSelectSection(sectionType);
      }
    },
    [onSelectSection, onSelectElement]
  );

  // ========== 画布点击处理（区域选择） ==========
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (!sections || !onSelectSection) {
        onSelectElement(null);
        return;
      }

      // 获取点击位置（毫米）
      const clickPos = coordinates.toCanvasMm(e.clientX, e.clientY);

      // 计算区域布局
      const layout = calculateSectionLayout({
        canvas: { width, height, dpi },
        sections,
        elements,
      } as any);

      // 根据Y坐标判断点击了哪个区域
      const clickY = clickPos.y;

      if (
        sections.header &&
        layout.headerHeight > 0 &&
        clickY < layout.headerOffset + layout.headerHeight
      ) {
        // 点击页头区域
        onSelectSection(SectionTypeEnum.Header);
        onSelectElement(null);
      } else if (
        sections.footer &&
        layout.footerHeight > 0 &&
        clickY >= layout.footerOffset
      ) {
        // 点击页尾区域
        onSelectSection(SectionTypeEnum.Footer);
        onSelectElement(null);
      } else {
        // 点击内容区域
        onSelectSection(SectionTypeEnum.Content);
        onSelectElement(null);
      }
    },
    [sections, onSelectSection, onSelectElement, coordinates, width, height, dpi, elements]
  );

  // ========== 从ElementPanel拖拽处理 ==========
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const { clientX, clientY } = e;
        if (
          clientX < rect.left ||
          clientX > rect.right ||
          clientY < rect.top ||
          clientY > rect.bottom
        ) {
          setIsDragOver(false);
        }
      }
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const elementTypeStr = e.dataTransfer.getData('application/element-type');
      if (!elementTypeStr || !onAddElementAtPosition) return;

      const elementType = parseInt(elementTypeStr, 10) as ElementType;
      const position = coordinates.toCanvasMm(e.clientX, e.clientY);

      // 调整位置使元素中心对齐鼠标位置
      const offsetX = 25;
      const offsetY = 5;

      const adjustedPosition = {
        x: Math.max(0, Math.min(width - 50, position.x - offsetX)),
        y: Math.max(0, Math.min(height - 10, position.y - offsetY)),
      };

      // 提前计算 section 和 sectionId
      let targetSection: SectionType = SectionTypeEnum.Content;
      let targetSectionId: string | null = null;

      // 检测元素掉落到哪个区域
      if (sections) {
        const layout = calculateSectionLayout({
          canvas: { width, height, dpi },
          sections,
          elements: [],
        } as any);

        const dropY = adjustedPosition.y;

        if (
          sections.header &&
          layout.headerHeight > 0 &&
          dropY < layout.headerOffset + layout.headerHeight
        ) {
          // 页头区域
          targetSection = SectionTypeEnum.Header;
          targetSectionId = null;
        } else if (
          sections.footer &&
          layout.footerHeight > 0 &&
          dropY >= layout.footerOffset
        ) {
          // 页尾区域
          targetSection = SectionTypeEnum.Footer;
          targetSectionId = null;
        } else {
          // 内容区域 - 需要检测具体是哪个内容区域
          targetSection = SectionTypeEnum.Content;

          // 检测属于哪个内容区域
          const areaIndex = detectContentAreaIndex(dropY, layout);
          if (areaIndex >= 0 && sections.contentAreas && sections.contentAreas[areaIndex]) {
            targetSectionId = sections.contentAreas[areaIndex].id || null;
          } else if (sections.contentAreas && sections.contentAreas.length > 0) {
            // 兜底逻辑：如果检测失败，使用第一个内容区域
            targetSectionId = sections.contentAreas[0].id || null;
          }
        }
      }

      // 直接传递区域信息给创建函数
      onAddElementAtPosition(elementType, adjustedPosition, {
        section: targetSection,
        sectionId: targetSectionId,
      });
    },
    [coordinates, onAddElementAtPosition, width, height, sections, dpi]
  );


  // ========== 渲染 ==========
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: '#f5f5f5',
        overflow: 'auto',
        padding: 20,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 标尺和网格 */}
        {showRuler && (
          <CanvasGrid
            width={width}
            height={height}
            dpi={dpi}
            displayScale={displayScale}
            showRuler={showRuler}
            showGrid={showGrid}
            gridSizeMm={gridSizeMm}
            rulerSize={rulerSize}
          />
        )}

        {/* 画布主体 */}
        <div style={{ display: 'flex' }}>
          {/* 垂直标尺 */}
          {showRuler && (
            <CanvasVerticalRuler
              height={height}
              dpi={dpi}
              displayScale={displayScale}
              showRuler={showRuler}
              gridSizeMm={gridSizeMm}
              rulerSize={rulerSize}
              sections={sections}
              activeAreaIndex={undefined} // TODO: 从ContentAreasManager获取激活的区域索引
            />
          )}

          <div
            ref={canvasRef}
            style={{
              position: 'relative',
              width: canvasWidthPx * displayScale,
              height: canvasHeightPx * displayScale,
              background: showGrid
                ? `repeating-linear-gradient(90deg, #d0d0d0 0, #d0d0d0 2px, transparent 2px, transparent 4px),
                   repeating-linear-gradient(0deg, #d0d0d0 0, #d0d0d0 2px, transparent 2px, transparent 4px),
                   #ffffff`
                : '#ffffff',
              backgroundSize: showGrid
                ? `${mmToPx(gridSizeMm, dpi) * displayScale}px ${
                    mmToPx(gridSizeMm, dpi) * displayScale
                  }px`
                : 'auto',
              backgroundPosition: showGrid ? '0 0, 0 0' : 'initial',
              boxShadow: isDragOver
                ? '0 0 0 3px rgba(24,144,255,0.5), 0 2px 8px rgba(0,0,0,0.15)'
                : '0 2px 8px rgba(0,0,0,0.15)',
              border: isDragOver ? '2px dashed #1890ff' : 'none',
              cursor: 'default',
              transition: 'all 0.2s',
            }}
            onClick={handleCanvasClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* 渲染所有元素 */}
            {elements.map((element) => (
              <ElementRenderer
                key={element.id}
                element={element}
                selectedElementId={selectedElementId}
                onSelectElement={onSelectElement}
                handleMouseDown={dragDrop.handleMouseDown}
                handleResizeStart={resize.handleResizeStart}
                handleContextMenu={contextMenu.handleContextMenu}
                displayScale={displayScale}
                dpi={dpi}
                bindingContext={bindingContext}
                interactive={true}
                onRowDividerMouseDown={tableDivider.handleRowDividerMouseDown}
                onColDividerMouseDown={tableDivider.handleColDividerMouseDown}
                onCellClick={cellEdit.openCellEdit}
                tableDividerDragging={tableDivider.tableDividerDragging}
              />
            ))}

            {/* 渲染区域边界 */}
            {showSectionBoundaries && (
              <SectionBoundaries
                sections={sections}
                selectedSection={selectedSection}
                onSelectSection={onSelectSection}
                width={width}
                height={height}
                dpi={dpi}
                displayScale={displayScale}
                elements={elements}
                onUpdateSection={onUpdateSection}
                onUpdateCanvasHeight={onUpdateCanvasHeight}
                handleSectionClick={handleSectionClick}
                handleHeaderContentDividerMouseDown={
                  sectionDivider.handleHeaderContentDividerMouseDown
                }
                handleContentBottomDividerMouseDown={
                  sectionDivider.handleContentBottomDividerMouseDown
                }
                sectionDividerDragging={sectionDivider.sectionDividerDragging}
              />
            )}

            {/* 渲染网格覆盖层 */}
            {showGridBoundaries && (
              <GridOverlay
                sections={sections}
                width={width}
                height={height}
                dpi={dpi}
                displayScale={displayScale}
                elements={elements}
              />
            )}

            {/* 拖拽提示 */}
            {isDragOver && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '16px 24px',
                  background: 'rgba(24,144,255,0.1)',
                  border: '2px dashed #1890ff',
                  borderRadius: 8,
                  color: '#1890ff',
                  fontSize: 14,
                  fontWeight: 500,
                  pointerEvents: 'none',
                }}
              >
                松开鼠标放置元素
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 右键菜单 */}
      <ContextMenuUI
        contextMenu={contextMenu.contextMenu}
        elements={elements}
        getMenuItems={contextMenu.getMenuItems}
        handleMenuClick={contextMenu.handleMenuClick}
        closeContextMenu={contextMenu.closeContextMenu}
      />

      {/* 单元格编辑对话框 */}
      <CellEditModal
        visible={cellEdit.editState.visible}
        cell={cellEdit.editState.cell}
        rowIndex={cellEdit.editState.rowIndex}
        colIndex={cellEdit.editState.colIndex}
        maxRowSpan={
          cellEdit.editState.element
            ? (cellEdit.editState.element.properties as any).rows - cellEdit.editState.rowIndex
            : 1
        }
        maxColSpan={
          cellEdit.editState.element
            ? (cellEdit.editState.element.properties as any).columns - cellEdit.editState.colIndex
            : 1
        }
        onSave={cellEdit.saveCellEdit}
        onCancel={cellEdit.closeCellEdit}
      />
    </div>
  );
};

// 导出类型
export type { CanvasProps };
