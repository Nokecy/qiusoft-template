/**
 * 元素渲染器主组件
 * 统一管理所有类型元素的渲染，包括容器、边框、选中状态等
 */

import React from 'react';
import type { AtlElement, ElementType } from '../../../../types';
import { mmToPx, ensurePropertyBinding, resolveBindingValue } from '../../../../utils';
import { TextElement } from './TextElement';
import { BarcodeElement } from './BarcodeElement';
import { ImageElement } from './ImageElement';
import { TableElement } from './TableElement';
import { LineElement } from './LineElement';
import { ShapeElement } from './ShapeElement';
import { QRCodeElement } from './QRCodeElement';
import { DataMatrixElement } from './DataMatrixElement';

export interface ElementRendererProps {
  element: AtlElement;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  handleMouseDown: (e: React.MouseEvent, elementId: string) => void;
  handleResizeStart: (e: React.MouseEvent, elementId: string, handle: string) => void;
  handleContextMenu: (e: React.MouseEvent, elementId: string) => void;
  displayScale: number;
  dpi: number;
  bindingContext: Record<string, any>;
  interactive?: boolean;
  // 表格分隔线拖拽相关
  onRowDividerMouseDown?: (e: React.MouseEvent, element: AtlElement, rowIndex: number) => void;
  onColDividerMouseDown?: (e: React.MouseEvent, element: AtlElement, colIndex: number) => void;
  tableDividerDragging?: {
    elementId: string;
    type: 'row' | 'column';
    index: number;
    startMousePos: number;
    initialSize: number;
  } | null;
  // 单元格点击编辑相关
  onCellClick?: (element: AtlElement, rowIndex: number, colIndex: number) => void;
}

/**
 * 元素渲染器组件
 * 负责渲染单个元素，包括边框、选中状态、锁定标识、调整大小手柄等
 */
export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  selectedElementId,
  onSelectElement,
  handleMouseDown,
  handleResizeStart,
  handleContextMenu,
  displayScale,
  dpi,
  bindingContext,
  interactive = true,
  onRowDividerMouseDown,
  onColDividerMouseDown,
  tableDividerDragging,
  onCellClick,
}) => {
  // 计算元素位置和尺寸（显示像素）
  const x = mmToPx(element.position.x, dpi) * displayScale;
  const y = mmToPx(element.position.y, dpi) * displayScale;
  const w = mmToPx(element.size.width, dpi) * displayScale;
  const h = mmToPx(element.size.height, dpi) * displayScale;

  // 🔍 调试:表格元素时打印 size
  if (element.type === 6) {
    console.log('🖼️ [ElementRenderer] 表格元素 size:', {
      id: element.id,
      size: element.size,
      w, h,
    });
  }

  const isSelected = interactive && element.id === selectedElementId;

  // 检查元素是否可见
  const visibleBinding = ensurePropertyBinding(element.visible, 'boolean');
  const isVisible = Boolean(resolveBindingValue(visibleBinding, bindingContext, 'boolean'));
  const isDesignTimeHidden = !isVisible;

  // 根据元素类型渲染对应的内容
  const renderContent = () => {
    switch (element.type) {
      case 1: // ElementType.Text
        return (
          <TextElement
            element={element}
            displayScale={displayScale}
            dpi={dpi}
            context={bindingContext}
          />
        );

      case 2: // ElementType.MultilineText
        return (
          <TextElement
            element={element}
            displayScale={displayScale}
            dpi={dpi}
            context={bindingContext}
          />
        );

      case 3: // ElementType.Barcode
        return (
          <BarcodeElement
            element={element}
            displayScale={displayScale}
            dpi={dpi}
            w={w}
            h={h}
            context={bindingContext}
          />
        );

      case 4: // ElementType.Image
        return (
          <ImageElement
            element={element}
            displayScale={displayScale}
            context={bindingContext}
          />
        );

      case 6: // ElementType.Table
        return (
          <TableElement
            element={element}
            displayScale={displayScale}
            dpi={dpi}
            context={bindingContext}
            isSelected={isSelected}
            onRowDividerMouseDown={onRowDividerMouseDown}
            onColDividerMouseDown={onColDividerMouseDown}
            onCellClick={onCellClick}
            tableDividerDragging={tableDividerDragging}
          />
        );

      case 7: // ElementType.QRCode
        return (
          <QRCodeElement
            element={element}
            displayScale={displayScale}
            w={w}
            h={h}
            context={bindingContext}
          />
        );

      case 8: // ElementType.DataMatrix
        return (
          <DataMatrixElement
            element={element}
            displayScale={displayScale}
            w={w}
            h={h}
            context={bindingContext}
          />
        );

      case 9: // ElementType.Line
        return <LineElement element={element} displayScale={displayScale} dpi={dpi} />;

      case 5: // ElementType.Shape
        return <ShapeElement element={element} displayScale={displayScale} w={w} h={h} />;

      default:
        return null;
    }
  };

  // 线条元素未选中时不显示边框,避免影响线条显示
  const shouldShowBorder = element.type === 9 ? isSelected : true; // 9 = ElementType.Line

  // 边框样式：优先级 设计时隐藏 > 选中 > 默认
  let borderStyleValue = 'none';
  if (shouldShowBorder) {
    if (isDesignTimeHidden) {
      // 设计时隐藏的元素：红色虚线边框
      borderStyleValue = '2px dashed #ff4d4f';
    } else if (interactive) {
      borderStyleValue = isSelected ? '2px solid #1890ff' : '1px dashed #ccc';
    } else {
      borderStyleValue = '1px dashed rgba(0, 0, 0, 0.15)';
    }
  }

  const cursorValue = interactive ? (element.locked ? 'not-allowed' : 'move') : 'default';
  const pointerEventsValue = interactive ? 'auto' : 'none';

  // 透明度：设计时隐藏 > 锁定 > 正常
  let opacityValue = 1;
  if (isDesignTimeHidden) {
    opacityValue = 0.3; // 设计时隐藏：30%透明度
  } else if (element.locked) {
    opacityValue = 0.7; // 锁定：70%透明度
  }

  return (
    <div
      key={element.id}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        border: borderStyleValue,
        boxSizing: 'border-box',
        cursor: cursorValue,
        opacity: opacityValue,
        pointerEvents: pointerEventsValue,
        zIndex: element.zIndex !== undefined ? element.zIndex : 1,
      }}
      onMouseDown={interactive ? (e) => handleMouseDown(e, element.id) : undefined}
      onClick={interactive ? (e) => e.stopPropagation() : undefined}
      onContextMenu={interactive ? (e) => handleContextMenu(e, element.id) : undefined}
    >
      {renderContent()}

      {/* 设计时隐藏标识 */}
      {isDesignTimeHidden && interactive && (
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            background: 'rgba(255, 77, 79, 0.9)',
            padding: '2px 6px',
            borderRadius: 2,
            fontSize: 10,
            color: '#fff',
            pointerEvents: 'none',
            zIndex: 1,
            fontWeight: 500,
          }}
        >
          隐藏
        </div>
      )}

      {/* 锁定图标指示器 */}
      {element.locked && interactive && (
        <div
          style={{
            position: 'absolute',
            top: 2,
            right: 2,
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '2px 4px',
            borderRadius: 2,
            fontSize: 10,
            color: '#fff',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          🔒
        </div>
      )}

      {/* 调整大小手柄 - 锁定时不显示 */}
      {interactive && isSelected && !element.locked && (
        <>
          {['nw', 'ne', 'se', 'sw'].map((handle) => (
            <div
              key={handle}
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                background: '#1890ff',
                border: '1px solid #fff',
                cursor: `${handle}-resize`,
                ...(handle.includes('n') ? { top: -4 } : { bottom: -4 }),
                ...(handle.includes('w') ? { left: -4 } : { right: -4 }),
              }}
              onMouseDown={(e) => handleResizeStart(e, element.id, handle)}
            />
          ))}
        </>
      )}
    </div>
  );
};
