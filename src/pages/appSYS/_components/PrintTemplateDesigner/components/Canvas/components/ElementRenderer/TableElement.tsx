/**
 * 表格元素渲染器 - 优化版
 *
 * 优化内容：
 * 1. 视觉反馈：增强拖动手柄设计、实时尺寸提示、平滑过渡
 * 2. 性能优化：React.memo、useMemo 缓存、状态管理优化
 * 3. 交互改进：更大热区、悬停效果、拖动预览
 * 4. 可访问性：ARIA 标签、键盘支持、语义化 HTML
 * 5. 代码质量：类型安全、常量提取、错误处理
 */

import React, { useState, useMemo, CSSProperties } from 'react';
import { Tooltip } from 'antd';
import type { AtlElement, TableProperties } from '../../../../types';
import {
  mmToPx,
  ptToPx,
  resolveBindingValue,
  getEffectiveContentBinding,
} from '../../../../utils';

// ==================== 常量定义 ====================

/**
 * 拖动手柄样式常量
 */
const DIVIDER_CONSTANTS = {
  // 基础尺寸
  HANDLE_SIZE: 8,              // 手柄宽度/高度（像素）
  HOVER_EXPAND: 2,             // 悬停时扩展尺寸（像素）

  // 颜色方案（Ant Design 色板）
  COLOR_IDLE: 'rgba(0, 0, 0, 0.06)',         // 空闲状态
  COLOR_HOVER: 'rgba(24, 144, 255, 0.25)',   // 悬停状态
  COLOR_ACTIVE: 'rgba(24, 144, 255, 0.5)',   // 激活（拖动）状态
  COLOR_BORDER: '#1890ff',                   // 边框颜色

  // Z-Index
  Z_INDEX: 100,

  // 过渡动画
  TRANSITION: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * 单元格样式常量
 */
const CELL_CONSTANTS = {
  PADDING: 2,
  HOVER_OPACITY: 0.8,
  TRANSITION: 'background-color 0.2s, opacity 0.15s',
} as const;

// ==================== 类型定义 ====================

export interface TableElementProps {
  element: AtlElement;
  displayScale: number;
  dpi: number;
  context: Record<string, any>;
  isSelected: boolean;
  onRowDividerMouseDown?: (e: React.MouseEvent, element: AtlElement, rowIndex: number) => void;
  onColDividerMouseDown?: (e: React.MouseEvent, element: AtlElement, colIndex: number) => void;
  onCellClick?: (element: AtlElement, rowIndex: number, colIndex: number) => void;
  tableDividerDragging?: {
    elementId: string;
    type: 'row' | 'column';
    index: number;
    startMousePos: number;
    initialSize: number;
    currentSize: number;      // 新增：实时预览尺寸
    minSize: number;
    maxSize: number;
  } | null;
}

/**
 * 分隔线状态
 */
type DividerState = 'idle' | 'hover' | 'active';

// ==================== 工具函数 ====================

/**
 * 获取分隔线样式
 */
const getDividerStyle = (
  state: DividerState,
  isVertical: boolean
): CSSProperties => {
  const baseSize = DIVIDER_CONSTANTS.HANDLE_SIZE;
  const expandedSize = baseSize + DIVIDER_CONSTANTS.HOVER_EXPAND * 2;

  const size = state === 'hover' || state === 'active' ? expandedSize : baseSize;
  const offset = -size / 2;

  return {
    position: 'absolute',
    zIndex: DIVIDER_CONSTANTS.Z_INDEX,
    cursor: isVertical ? 'ew-resize' : 'ns-resize',
    transition: DIVIDER_CONSTANTS.TRANSITION,
    ...(isVertical
      ? {
          width: size,
          height: '100%',
          left: offset,
          top: 0,
        }
      : {
          width: '100%',
          height: size,
          left: 0,
          top: offset,
        }),
    backgroundColor:
      state === 'active'
        ? DIVIDER_CONSTANTS.COLOR_ACTIVE
        : state === 'hover'
        ? DIVIDER_CONSTANTS.COLOR_HOVER
        : DIVIDER_CONSTANTS.COLOR_IDLE,
    ...(state === 'active' && {
      [isVertical ? 'borderLeft' : 'borderTop']: `2px solid ${DIVIDER_CONSTANTS.COLOR_BORDER}`,
      boxShadow: `0 0 8px ${DIVIDER_CONSTANTS.COLOR_BORDER}`,
    }),
  };
};

/**
 * 格式化尺寸提示文本
 */
const formatSizeTooltip = (sizeMm: number, type: 'row' | 'column', index: number): string => {
  return `${type === 'row' ? '行' : '列'} ${index + 1}: ${sizeMm.toFixed(1)}mm`;
};

// ==================== 拖动手柄组件 ====================

/**
 * 行分隔线手柄组件
 */
const RowDividerHandle = React.memo<{
  rowIndex: number;
  yPx: number;
  height: number;
  element: AtlElement;
  isActive: boolean;
  onMouseDown: (e: React.MouseEvent, element: AtlElement, rowIndex: number) => void;
}>(({ rowIndex, yPx, height, element, isActive, onMouseDown }) => {
  const [hoverState, setHoverState] = useState<DividerState>('idle');

  const state: DividerState = isActive ? 'active' : hoverState;

  return (
    <Tooltip
      title={formatSizeTooltip(height, 'row', rowIndex)}
      placement="right"
      mouseEnterDelay={0.5}
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label={`调整第 ${rowIndex + 1} 行高度`}
        aria-valuenow={height}
        tabIndex={0}
        style={{
          ...getDividerStyle(state, false),
          top: yPx,
        }}
        onMouseDown={(e) => onMouseDown(e, element, rowIndex)}
        onMouseEnter={() => setHoverState('hover')}
        onMouseLeave={() => setHoverState('idle')}
      />
    </Tooltip>
  );
});

RowDividerHandle.displayName = 'RowDividerHandle';

/**
 * 列分隔线手柄组件
 */
const ColumnDividerHandle = React.memo<{
  colIndex: number;
  xPx: number;
  width: number;
  element: AtlElement;
  isActive: boolean;
  onMouseDown: (e: React.MouseEvent, element: AtlElement, colIndex: number) => void;
}>(({ colIndex, xPx, width, element, isActive, onMouseDown }) => {
  const [hoverState, setHoverState] = useState<DividerState>('idle');

  const state: DividerState = isActive ? 'active' : hoverState;

  return (
    <Tooltip
      title={formatSizeTooltip(width, 'column', colIndex)}
      placement="top"
      mouseEnterDelay={0.5}
    >
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={`调整第 ${colIndex + 1} 列宽度`}
        aria-valuenow={width}
        tabIndex={0}
        style={{
          ...getDividerStyle(state, true),
          left: xPx,
        }}
        onMouseDown={(e) => onMouseDown(e, element, colIndex)}
        onMouseEnter={() => setHoverState('hover')}
        onMouseLeave={() => setHoverState('idle')}
      />
    </Tooltip>
  );
});

ColumnDividerHandle.displayName = 'ColumnDividerHandle';

// ==================== 单元格组件 ====================

/**
 * 表格单元格组件
 */
const TableCell = React.memo<{
  cell: any;
  rowIndex: number;
  colIndex: number;
  cellX: number;
  cellY: number;
  cellWidth: number;
  cellHeight: number;
  props: TableProperties;
  dpi: number;
  scaleX: number;
  scaleY: number;
  displayScale: number;
  borderWidthPx: number;
  borderColor: string;
  context: Record<string, any>;
  isSelected: boolean;
  onCellClick?: (rowIndex: number, colIndex: number) => void;
}>(({
  cell,
  rowIndex,
  colIndex,
  cellX,
  cellY,
  cellWidth,
  cellHeight,
  props,
  dpi,
  scaleX,
  scaleY,
  displayScale,
  borderWidthPx,
  borderColor,
  context,
  isSelected,
  onCellClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // ✅ 移除这里的 merged 检查，因为父组件已经过滤了
  // 这样确保每个 TableCell 实例的 hooks 数量始终一致

  // 解析单元格内容
  const cellContentBinding = getEffectiveContentBinding(cell);
  // 设计器模式：显示数据路径占位符
  const cellValue = resolveBindingValue(cellContentBinding, context, 'string', { showPlaceholder: true });

  // 获取单元格样式
  const cellBgColor = cell.backgroundColor;
  const cellTextColor = cell.textColor;
  const cellFontSize = cell.fontSize || props.font?.size || 10;
  const cellFontFamily = cell.fontFamily || props.font?.family || 'Arial';
  const cellBold = cell.bold;
  const cellItalic = cell.italic;
  const cellTextAlign = cell.textAlign ?? props.alignment ?? 1;
  const cellVerticalAlign = cell.verticalAlign ?? 1;

  // 转换对齐方式
  const justifyContent =
    cellTextAlign === 0 ? 'flex-start' : cellTextAlign === 2 ? 'flex-end' : 'center';
  const alignItems =
    cellVerticalAlign === 0 ? 'flex-start' : cellVerticalAlign === 2 ? 'flex-end' : 'center';

  // 计算悬停背景色
  const hoverBgColor = useMemo(() => {
    if (!isSelected) return cellBgColor || 'transparent';

    if (cellBgColor) {
      // 为现有背景色添加透明度
      return `${cellBgColor}${Math.round(CELL_CONSTANTS.HOVER_OPACITY * 255).toString(16)}`;
    }
    return 'rgba(24, 144, 255, 0.08)';
  }, [cellBgColor, isSelected]);

  return (
    <div
      style={{
        position: 'absolute',
        left: mmToPx(cellX, dpi) * scaleX,
        top: mmToPx(cellY, dpi) * scaleY,
        width: mmToPx(cellWidth, dpi) * scaleX,
        height: mmToPx(cellHeight, dpi) * scaleY,
        border: props.showBorders ? `${borderWidthPx}px solid ${borderColor}` : 'none',
        display: 'flex',
        alignItems,
        justifyContent,
        fontSize: ptToPx(cellFontSize, dpi) * displayScale,
        fontFamily: cellFontFamily,
        fontWeight: cellBold ? 'bold' : 'normal',
        fontStyle: cellItalic ? 'italic' : 'normal',
        color: cellTextColor || '#000',
        backgroundColor: isHovered && isSelected ? hoverBgColor : cellBgColor || 'transparent',
        overflow: 'hidden',
        padding: CELL_CONSTANTS.PADDING,
        boxSizing: 'border-box',
        cursor: isSelected ? 'pointer' : 'default',
        transition: CELL_CONSTANTS.TRANSITION,
        userSelect: 'none',
      }}
      onDoubleClick={(e) => {
        if (isSelected && onCellClick) {
          e.stopPropagation();
          onCellClick(rowIndex, colIndex);
        }
      }}
      onMouseEnter={() => isSelected && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cellValue}
    </div>
  );
});

TableCell.displayName = 'TableCell';

// ==================== 表格元素主组件 ====================

/**
 * 表格元素组件
 */
export const TableElement: React.FC<TableElementProps> = React.memo(({
  element,
  displayScale,
  dpi,
  context,
  isSelected,
  onRowDividerMouseDown,
  onColDividerMouseDown,
  onCellClick,
  tableDividerDragging,
}) => {
  const props = element.properties as TableProperties;

  // 安全检查：确保必要数据存在
  if (!props.colWidths || !props.rowHeights || !props.cells) {
    console.warn('TableElement: Missing required properties', { elementId: element.id });
    return null;
  }

  // ==================== 计算表格尺寸 ====================

  // 使用拖动预览尺寸（如果正在拖动）
  const effectiveRowHeights = useMemo(() => {
    if (
      tableDividerDragging?.elementId === element.id &&
      tableDividerDragging.type === 'row'
    ) {
      const heights = [...props.rowHeights];
      heights[tableDividerDragging.index] = tableDividerDragging.currentSize;

      // 如果有 nextSize，说明下一行的高度也需要更新（保持总高度不变）
      if (tableDividerDragging.nextSize !== undefined) {
        const nextIndex = tableDividerDragging.index + 1;
        if (nextIndex < heights.length) {
          heights[nextIndex] = tableDividerDragging.nextSize;
        }
      }

      return heights;
    }
    return props.rowHeights;
  }, [props.rowHeights, tableDividerDragging, element.id]);

  const effectiveColWidths = useMemo(() => {
    if (
      tableDividerDragging?.elementId === element.id &&
      tableDividerDragging.type === 'column'
    ) {
      const widths = [...props.colWidths];
      widths[tableDividerDragging.index] = tableDividerDragging.currentSize;

      // 如果有 nextSize，说明下一列的宽度也需要更新（保持总宽度不变）
      if (tableDividerDragging.nextSize !== undefined) {
        const nextIndex = tableDividerDragging.index + 1;
        if (nextIndex < widths.length) {
          widths[nextIndex] = tableDividerDragging.nextSize;
        }
      }

      return widths;
    }
    return props.colWidths;
  }, [props.colWidths, tableDividerDragging, element.id]);

  // 计算表格总尺寸（毫米）
  const totalWidth = useMemo(
    () => effectiveColWidths.reduce((sum, w) => sum + w, 0),
    [effectiveColWidths]
  );
  const totalHeight = useMemo(
    () => effectiveRowHeights.reduce((sum, h) => sum + h, 0),
    [effectiveRowHeights]
  );

  // ✅ 修复:直接使用 totalWidth/totalHeight 计算容器尺寸
  // 由于 element.size 现在始终等于行列总和,不需要 effectiveElement 中间变量
  // 这样确保 scaleX/scaleY 始终为 displayScale,表格不会被拉伸
  const containerW = mmToPx(totalWidth, dpi) * displayScale;
  const containerH = mmToPx(totalHeight, dpi) * displayScale;

  // 缩放比例（将mm转换为显示像素）
  const scaleX = displayScale;
  const scaleY = displayScale;

  // 边框样式
  const borderColor = props.borderColor || '#000000';
  const borderWidthMm = props.borderWidth ?? 0.5;
  const borderWidthPx = mmToPx(borderWidthMm, dpi) * displayScale;

  // ==================== 渲染分隔线位置计算 ====================

  const rowDividers = useMemo(() => {
    if (!isSelected || !onRowDividerMouseDown) return [];

    return effectiveRowHeights.slice(0, -1).map((_, index) => {
      const y = effectiveRowHeights.slice(0, index + 1).reduce((sum, h) => sum + h, 0);
      const yPx = mmToPx(y, dpi) * scaleY;

      return {
        index,
        yPx,
        height: effectiveRowHeights[index],
        isActive:
          tableDividerDragging?.elementId === element.id &&
          tableDividerDragging?.type === 'row' &&
          tableDividerDragging?.index === index,
      };
    });
  }, [
    isSelected,
    effectiveRowHeights,
    dpi,
    scaleY,
    onRowDividerMouseDown,
    tableDividerDragging,
    element.id,
  ]);

  const colDividers = useMemo(() => {
    if (!isSelected || !onColDividerMouseDown) return [];

    return effectiveColWidths.slice(0, -1).map((_, index) => {
      const x = effectiveColWidths.slice(0, index + 1).reduce((sum, w) => sum + w, 0);
      const xPx = mmToPx(x, dpi) * scaleX;

      return {
        index,
        xPx,
        width: effectiveColWidths[index],
        isActive:
          tableDividerDragging?.elementId === element.id &&
          tableDividerDragging?.type === 'column' &&
          tableDividerDragging?.index === index,
      };
    });
  }, [
    isSelected,
    effectiveColWidths,
    dpi,
    scaleX,
    onColDividerMouseDown,
    tableDividerDragging,
    element.id,
  ]);

  // ==================== 渲染 ====================

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: props.showBorders ? `${borderWidthPx}px solid ${borderColor}` : 'none',
      }}
    >
      {/* 渲染单元格 */}
      {props.cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          // ✅ 关键修复：在渲染前过滤掉被合并的单元格
          // 这样避免 TableCell 组件内部的 hooks 数量变化
          if (cell.merged) return null;

          // 计算单元格位置和尺寸
          const cellX = effectiveColWidths.slice(0, colIndex).reduce((sum, w) => sum + w, 0);
          const cellY = effectiveRowHeights.slice(0, rowIndex).reduce((sum, h) => sum + h, 0);
          const cellWidth = effectiveColWidths
            .slice(colIndex, colIndex + cell.colSpan)
            .reduce((sum, w) => sum + w, 0);
          const cellHeight = effectiveRowHeights
            .slice(rowIndex, rowIndex + cell.rowSpan)
            .reduce((sum, h) => sum + h, 0);

          return (
            <TableCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              cellX={cellX}
              cellY={cellY}
              cellWidth={cellWidth}
              cellHeight={cellHeight}
              props={props}
              dpi={dpi}
              scaleX={scaleX}
              scaleY={scaleY}
              displayScale={displayScale}
              borderWidthPx={borderWidthPx}
              borderColor={borderColor}
              context={context}
              isSelected={isSelected}
              onCellClick={onCellClick ? (r, c) => onCellClick(element, r, c) : undefined}
            />
          );
        })
      )}

      {/* 渲染行分隔线 */}
      {rowDividers.map((divider) => (
        <RowDividerHandle
          key={`row-divider-${divider.index}`}
          rowIndex={divider.index}
          yPx={divider.yPx}
          height={divider.height}
          element={element}
          isActive={divider.isActive}
          onMouseDown={onRowDividerMouseDown!}
        />
      ))}

      {/* 渲染列分隔线 */}
      {colDividers.map((divider) => (
        <ColumnDividerHandle
          key={`col-divider-${divider.index}`}
          colIndex={divider.index}
          xPx={divider.xPx}
          width={divider.width}
          element={element}
          isActive={divider.isActive}
          onMouseDown={onColDividerMouseDown!}
        />
      ))}
    </div>
  );
});

TableElement.displayName = 'TableElement';
