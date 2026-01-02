/**
 * 元素调整大小Hook
 */
import { useState, useCallback, useRef } from 'react';
import { AtlElement, ElementType, TableProperties } from '../../../types';

export interface ResizingState {
  elementId: string;
  handle: string;
  startMouseX: number; // 开始时鼠标在画布中的X位置（毫米）
  startMouseY: number; // 开始时鼠标在画布中的Y位置（毫米）
  initialWidth: number; // 元素初始宽度（毫米）
  initialHeight: number; // 元素初始高度（毫米）
  initialX: number; // 元素初始X位置（毫米）
  initialY: number; // 元素初始Y位置（毫米）
}

export interface UseElementResizeParams {
  elements: AtlElement[];
  onUpdateElementSize: (id: string, size: { width: number; height: number }) => void;
  onUpdateElementPosition: (id: string, position: { x: number; y: number }) => void;
  onUpdateElement?: (id: string, updates: Partial<AtlElement>) => void;
  toCanvasMm: (clientX: number, clientY: number) => { x: number; y: number };
}

export const useElementResize = ({
  elements,
  onUpdateElementSize,
  onUpdateElementPosition,
  onUpdateElement,
  toCanvasMm,
}: UseElementResizeParams) => {
  const [resizing, setResizing] = useState<ResizingState | null>(null);

  // 记录表格元素调整前的初始尺寸,用于计算缩放比例
  const initialTableSizeRef = useRef<{ width: number; height: number } | null>(null);

  /**
   * 开始调整大小
   */
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, elementId: string, handle: string) => {
      e.stopPropagation();

      const element = elements.find((el) => el.id === elementId);
      if (!element) return;

      // 检查元素是否被锁定
      if (element.locked) {
        // 锁定的元素不允许调整大小
        return;
      }

      // 如果是表格元素,记录初始尺寸用于后续计算缩放比例
      if (element.type === 6) { // ElementType.Table
        initialTableSizeRef.current = {
          width: element.size.width,
          height: element.size.height,
        };
      } else {
        initialTableSizeRef.current = null;
      }

      // 计算鼠标在画布中的起始位置（毫米）
      const mousePos = toCanvasMm(e.clientX, e.clientY);

      setResizing({
        elementId,
        handle,
        startMouseX: mousePos.x, // 记录开始时鼠标在画布中的位置（毫米）
        startMouseY: mousePos.y,
        initialWidth: element.size.width,
        initialHeight: element.size.height,
        initialX: element.position.x,
        initialY: element.position.y,
      });
    },
    [elements, toCanvasMm],
  );

  /**
   * 调整大小中
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!resizing) return false;

      // 查找正在调整大小的元素
      const element = elements.find((el) => el.id === resizing.elementId);
      if (!element) return false;

      // 根据元素类型设置动态最小尺寸
      let minWidth = 5; // 默认最小宽度 5mm
      let minHeight = 2; // 默认最小高度 2mm

      // 线条元素使用更小的最小高度
      if (element.type === ElementType.Line) {
        minHeight = 1; // 线条最小高度 1mm
      }

      // 文本元素使用更小的最小尺寸
      if (element.type === ElementType.Text) {
        minWidth = 3; // 文本最小宽度 3mm
        minHeight = 2; // 文本最小高度 2mm
      }

      // 计算当前鼠标在画布中的位置（毫米）
      const mousePos = toCanvasMm(e.clientX, e.clientY);

      // 计算鼠标移动的距离（毫米）
      const dx = mousePos.x - resizing.startMouseX;
      const dy = mousePos.y - resizing.startMouseY;

      let newWidth = resizing.initialWidth;
      let newHeight = resizing.initialHeight;
      let newX = resizing.initialX;
      let newY = resizing.initialY;

      // 根据不同的调整句柄计算新的尺寸和位置
      switch (resizing.handle) {
        case 'se': // 右下角：增加宽高
          newWidth = Math.max(minWidth, resizing.initialWidth + dx);
          newHeight = Math.max(minHeight, resizing.initialHeight + dy);
          break;
        case 'ne': // 右上角：增加宽度，减少高度，Y位置上移
          newWidth = Math.max(minWidth, resizing.initialWidth + dx);
          newHeight = Math.max(minHeight, resizing.initialHeight - dy);
          newY = resizing.initialY + dy;
          // 如果高度达到最小值，调整Y位置
          if (newHeight === minHeight) {
            newY = resizing.initialY + resizing.initialHeight - minHeight;
          }
          break;
        case 'sw': // 左下角：减少宽度，增加高度，X位置左移
          newWidth = Math.max(minWidth, resizing.initialWidth - dx);
          newHeight = Math.max(minHeight, resizing.initialHeight + dy);
          newX = resizing.initialX + dx;
          // 如果宽度达到最小值，调整X位置
          if (newWidth === minWidth) {
            newX = resizing.initialX + resizing.initialWidth - minWidth;
          }
          break;
        case 'nw': // 左上角：减少宽高，XY位置都移动
          newWidth = Math.max(minWidth, resizing.initialWidth - dx);
          newHeight = Math.max(minHeight, resizing.initialHeight - dy);
          newX = resizing.initialX + dx;
          newY = resizing.initialY + dy;
          // 如果达到最小值，调整位置
          if (newWidth === minWidth) {
            newX = resizing.initialX + resizing.initialWidth - minWidth;
          }
          if (newHeight === minHeight) {
            newY = resizing.initialY + resizing.initialHeight - minHeight;
          }
          break;
      }

      // 更新元素尺寸和位置
      onUpdateElementSize(resizing.elementId, { width: newWidth, height: newHeight });
      if (newX !== resizing.initialX || newY !== resizing.initialY) {
        onUpdateElementPosition(resizing.elementId, { x: newX, y: newY });
      }

      return true; // 表示处理了调整大小
    },
    [resizing, elements, toCanvasMm, onUpdateElementSize, onUpdateElementPosition],
  );

  /**
   * 结束调整大小
   */
  const handleMouseUp = useCallback(() => {
    // 如果是表格元素且记录了初始尺寸,需要按比例缩放行列
    if (resizing && initialTableSizeRef.current && onUpdateElement) {
      const element = elements.find((el) => el.id === resizing.elementId);

      if (element && element.type === 6) { // ElementType.Table
        const props = element.properties as TableProperties;
        const initialSize = initialTableSizeRef.current;
        const currentSize = element.size;

        // 计算缩放比例
        const widthRatio = currentSize.width / initialSize.width;
        const heightRatio = currentSize.height / initialSize.height;

        console.log('📐 [useElementResize] 表格尺寸调整,按比例缩放行列:', {
          elementId: element.id,
          initialSize,
          currentSize,
          widthRatio,
          heightRatio,
        });

        // 按比例缩放行高和列宽
        const newRowHeights = props.rowHeights.map(h => h * heightRatio);
        const newColWidths = props.colWidths.map(w => w * widthRatio);

        console.log('📐 [useElementResize] 缩放后的行列尺寸:', {
          oldRowHeights: props.rowHeights,
          newRowHeights,
          oldColWidths: props.colWidths,
          newColWidths,
        });

        // 使用 onUpdateElement 一次性更新 size 和 properties
        onUpdateElement(resizing.elementId, {
          size: currentSize,
          properties: {
            rowHeights: newRowHeights,
            colWidths: newColWidths,
          }
        });
      }
    }

    // 清理状态
    setResizing(null);
    initialTableSizeRef.current = null;
  }, [resizing, elements, onUpdateElement]);

  return {
    resizing,
    handleResizeStart,
    handleMouseMove,
    handleMouseUp,
  };
};
