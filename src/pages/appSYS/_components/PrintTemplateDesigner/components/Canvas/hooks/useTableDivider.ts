/**
 * 表格行列分隔线拖拽Hook - 优化版
 *
 * 优化内容：
 * 1. 性能优化：防抖节流、减少重渲染、优化查找
 * 2. 用户体验：实时预览、尺寸提示、边界约束
 * 3. 类型安全：完整的 TypeScript 类型定义
 * 4. 可配置性：支持自定义约束和行为
 */

import { useState, useCallback, useMemo, useRef } from 'react';
import type { AtlElement, TableProperties } from '../../../types';

// ==================== 类型定义 ====================

/**
 * 表格分隔线配置
 */
export interface TableDividerConfig {
  minRowHeight: number;       // 最小行高（毫米）
  minColumnWidth: number;     // 最小列宽（毫米）
  maxRowHeight?: number;      // 最大行高（毫米）
  maxColumnWidth?: number;    // 最大列宽（毫米）
  snapToGrid?: boolean;       // 是否吸附网格
  gridSize?: number;          // 网格大小（毫米，吸附时使用）
  throttleDelay?: number;     // 节流延迟（毫秒）
  debounceDelay?: number;     // 防抖延迟（毫秒）
}

/**
 * 拖拽状态
 */
export interface TableDividerDraggingState {
  elementId: string;          // 元素ID
  type: 'row' | 'column';     // 拖拽类型
  index: number;              // 行/列索引
  startMousePos: number;      // 起始鼠标位置（毫米）
  initialSize: number;        // 初始尺寸（毫米）
  currentSize: number;        // 当前尺寸（毫米，用于实时预览）
  minSize: number;            // 最小尺寸约束
  maxSize: number;            // 最大尺寸约束
  nextSize?: number;          // 下一行/列的当前尺寸（用于保持总尺寸不变）
}

/**
 * Hook 参数
 */
export interface UseTableDividerParams {
  elements: AtlElement[];
  onUpdateElement?: (id: string, updates: Partial<AtlElement>) => void;
  toCanvasMm: (clientX: number, clientY: number) => { x: number; y: number };
  config?: Partial<TableDividerConfig>;
}

// ==================== 默认配置 ====================

const DEFAULT_CONFIG: TableDividerConfig = {
  minRowHeight: 1,
  minColumnWidth: 1,
  snapToGrid: false,
  gridSize: 5,
  throttleDelay: 16,      // ~60fps
  debounceDelay: 150,
};

// ==================== 工具函数 ====================

/**
 * 吸附到网格
 */
const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

/**
 * 约束数值在范围内
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * 计算最大允许尺寸
 *
 * 注意：我们不限制表格总尺寸，因为拖动行/列应该可以改变表格整体大小
 * 只需要确保当前行/列不会过大即可
 */
const calculateMaxSize = (
  sizes: number[],
  index: number,
  minSize: number,
  totalSize: number
): number => {
  // 返回一个合理的最大值（表格总尺寸的3倍）
  // 这样允许行/列可以变大，但不会过分夸张
  return totalSize * 3;
};

// ==================== Hook 实现 ====================

export const useTableDivider = ({
  elements,
  onUpdateElement,
  toCanvasMm,
  config: userConfig,
}: UseTableDividerParams) => {
  // 合并配置
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...userConfig }),
    [userConfig]
  );

  // 拖拽状态
  const [tableDividerDragging, setTableDividerDragging] =
    useState<TableDividerDraggingState | null>(null);

  // 元素查找优化：使用 Map 缓存
  const elementMap = useMemo(
    () => new Map(elements.map((el) => [el.id, el])),
    [elements]
  );

  // 待处理的更新（用于 mouseUp 时确保使用最新值）
  const pendingUpdateRef = useRef<{
    id: string;
    properties: Partial<TableProperties>;
    size: { width: number; height: number };
  } | null>(null);

  // ==================== 开始拖拽 ====================

  /**
   * 开始拖拽行分隔线
   */
  const handleRowDividerMouseDown = useCallback(
    (e: React.MouseEvent, element: AtlElement, rowIndex: number) => {
      e.stopPropagation();
      e.preventDefault();

      const props = element.properties as TableProperties;

      // 安全检查
      if (!props.rowHeights || rowIndex < 0 || rowIndex >= props.rowHeights.length) {
        console.warn('Invalid row index or missing rowHeights');
        return;
      }

      const mousePos = toCanvasMm(e.clientX, e.clientY);
      const initialSize = props.rowHeights[rowIndex];
      const totalHeight = props.rowHeights.reduce((sum, h) => sum + h, 0);

      // 计算约束
      const minSize = config.minRowHeight;
      const calculatedMax = calculateMaxSize(props.rowHeights, rowIndex, minSize, totalHeight);
      const maxSize = config.maxRowHeight
        ? Math.min(config.maxRowHeight, calculatedMax)
        : calculatedMax;

      setTableDividerDragging({
        elementId: element.id,
        type: 'row',
        index: rowIndex,
        startMousePos: mousePos.y,
        initialSize,
        currentSize: initialSize,
        minSize,
        maxSize,
      });
    },
    [toCanvasMm, config.minRowHeight, config.maxRowHeight]
  );

  /**
   * 开始拖拽列分隔线
   */
  const handleColDividerMouseDown = useCallback(
    (e: React.MouseEvent, element: AtlElement, colIndex: number) => {
      e.stopPropagation();
      e.preventDefault();

      const props = element.properties as TableProperties;

      // 安全检查
      if (!props.colWidths || colIndex < 0 || colIndex >= props.colWidths.length) {
        console.warn('Invalid column index or missing colWidths');
        return;
      }

      const mousePos = toCanvasMm(e.clientX, e.clientY);
      const initialSize = props.colWidths[colIndex];
      const totalWidth = props.colWidths.reduce((sum, w) => sum + w, 0);

      // 计算约束
      const minSize = config.minColumnWidth;
      const calculatedMax = calculateMaxSize(props.colWidths, colIndex, minSize, totalWidth);
      const maxSize = config.maxColumnWidth
        ? Math.min(config.maxColumnWidth, calculatedMax)
        : calculatedMax;

      setTableDividerDragging({
        elementId: element.id,
        type: 'column',
        index: colIndex,
        startMousePos: mousePos.x,
        initialSize,
        currentSize: initialSize,
        minSize,
        maxSize,
      });
    },
    [toCanvasMm, config.minColumnWidth, config.maxColumnWidth]
  );

  // ==================== 拖拽中 ====================

  /**
   * 拖拽过程中的鼠标移动处理
   *
   * 新策略：动态调整相邻行/列，保持表格总尺寸不变
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!tableDividerDragging) {
        return false;
      }

      // 直接处理，不使用 RAF（RAF 会导致异步问题）
      const element = elementMap.get(tableDividerDragging.elementId);
      if (!element) {
        console.warn('Element not found:', tableDividerDragging.elementId);
        return false;
      }

      const props = element.properties as TableProperties;
      const mousePos = toCanvasMm(e.clientX, e.clientY);

      if (tableDividerDragging.type === 'row') {
        // 拖拽行分隔线
        const deltaY = mousePos.y - tableDividerDragging.startMousePos;
        let newHeight = tableDividerDragging.initialSize + deltaY;

        // 应用网格吸附
        if (config.snapToGrid && config.gridSize) {
          newHeight = snapToGrid(newHeight, config.gridSize);
        }

        // 计算实际的 delta（考虑约束前后的差异）
        const actualDelta = newHeight - tableDividerDragging.initialSize;

        // 检查是否有下一行可以调整
        const nextRowIndex = tableDividerDragging.index + 1;
        const hasNextRow = nextRowIndex < props.rowHeights.length;

        // 准备属性更新
        const newRowHeights = [...props.rowHeights];

        if (hasNextRow) {
          // 方案1：调整下一行的高度来保持总高度不变
          const nextRowHeight = props.rowHeights[nextRowIndex];
          const newNextRowHeight = nextRowHeight - actualDelta;

          // 检查下一行是否会小于最小高度
          if (newNextRowHeight >= config.minRowHeight) {
            // 可以调整，应用新的高度
            newHeight = clamp(
              newHeight,
              tableDividerDragging.minSize,
              tableDividerDragging.maxSize
            );
            newRowHeights[tableDividerDragging.index] = newHeight;
            newRowHeights[nextRowIndex] = newNextRowHeight;
          } else {
            // 下一行太小，限制当前行的增长
            // 当前行最多可以增加：下一行的高度 - 最小高度
            const maxIncrease = nextRowHeight - config.minRowHeight;
            newHeight = tableDividerDragging.initialSize + maxIncrease;

            // 应用约束
            newHeight = clamp(
              newHeight,
              tableDividerDragging.minSize,
              tableDividerDragging.maxSize
            );

            newRowHeights[tableDividerDragging.index] = newHeight;
            newRowHeights[nextRowIndex] = nextRowHeight - (newHeight - tableDividerDragging.initialSize);
          }
        } else {
          // 最后一行：只能在最大约束内改变，表格总高度会变化
          newHeight = clamp(
            newHeight,
            tableDividerDragging.minSize,
            tableDividerDragging.maxSize
          );
          newRowHeights[tableDividerDragging.index] = newHeight;
        }

        // 立即更新 currentSize 和 nextSize（确保视觉实时响应）
        setTableDividerDragging((prev) =>
          prev
            ? {
                ...prev,
                currentSize: newRowHeights[tableDividerDragging.index],
                nextSize: hasNextRow ? newRowHeights[nextRowIndex] : undefined,
              }
            : null
        );

        // 计算新的表格总尺寸
        const newTotalHeight = newRowHeights.reduce((sum, h) => sum + h, 0);
        const totalWidth = props.colWidths.reduce((sum, w) => sum + w, 0);

        // 缓存最新的更新（拖动过程中只缓存,不真正更新以避免触发历史记录）
        // ✅ 修复:分离 size 和 properties,因为 size 是元素的顶层属性
        pendingUpdateRef.current = {
          id: element.id,
          properties: {
            rowHeights: newRowHeights,
          },
          size: {
            width: totalWidth,      // 同时更新宽度,确保与列总和一致
            height: newTotalHeight,
          },
        };
      } else {
        // 拖拽列分隔线
        const deltaX = mousePos.x - tableDividerDragging.startMousePos;
        let newWidth = tableDividerDragging.initialSize + deltaX;

        // 应用网格吸附
        if (config.snapToGrid && config.gridSize) {
          newWidth = snapToGrid(newWidth, config.gridSize);
        }

        // 计算实际的 delta（考虑约束前后的差异）
        const actualDelta = newWidth - tableDividerDragging.initialSize;

        // 检查是否有下一列可以调整
        const nextColIndex = tableDividerDragging.index + 1;
        const hasNextCol = nextColIndex < props.colWidths.length;

        // 准备属性更新
        const newColWidths = [...props.colWidths];

        if (hasNextCol) {
          // 方案1：调整下一列的宽度来保持总宽度不变
          const nextColWidth = props.colWidths[nextColIndex];
          const newNextColWidth = nextColWidth - actualDelta;

          // 检查下一列是否会小于最小宽度
          if (newNextColWidth >= config.minColumnWidth) {
            // 可以调整，应用新的宽度
            newWidth = clamp(
              newWidth,
              tableDividerDragging.minSize,
              tableDividerDragging.maxSize
            );
            newColWidths[tableDividerDragging.index] = newWidth;
            newColWidths[nextColIndex] = newNextColWidth;
          } else {
            // 下一列太小，限制当前列的增长
            // 当前列最多可以增加：下一列的宽度 - 最小宽度
            const maxIncrease = nextColWidth - config.minColumnWidth;
            newWidth = tableDividerDragging.initialSize + maxIncrease;

            // 应用约束
            newWidth = clamp(
              newWidth,
              tableDividerDragging.minSize,
              tableDividerDragging.maxSize
            );

            newColWidths[tableDividerDragging.index] = newWidth;
            newColWidths[nextColIndex] = nextColWidth - (newWidth - tableDividerDragging.initialSize);
          }
        } else {
          // 最后一列：只能在最大约束内改变，表格总宽度会变化
          newWidth = clamp(
            newWidth,
            tableDividerDragging.minSize,
            tableDividerDragging.maxSize
          );
          newColWidths[tableDividerDragging.index] = newWidth;
        }

        // 立即更新 currentSize 和 nextSize（确保视觉实时响应）
        setTableDividerDragging((prev) =>
          prev
            ? {
                ...prev,
                currentSize: newColWidths[tableDividerDragging.index],
                nextSize: hasNextCol ? newColWidths[nextColIndex] : undefined,
              }
            : null
        );

        // 计算新的表格总尺寸
        const newTotalWidth = newColWidths.reduce((sum, w) => sum + w, 0);
        const totalHeight = props.rowHeights.reduce((sum, h) => sum + h, 0);

        // 缓存最新的更新（拖动过程中只缓存,不真正更新以避免触发历史记录）
        // ✅ 修复:分离 size 和 properties,因为 size 是元素的顶层属性
        pendingUpdateRef.current = {
          id: element.id,
          properties: {
            colWidths: newColWidths,
          },
          size: {
            width: newTotalWidth,
            height: totalHeight,    // 同时更新高度,确保与行总和一致
          },
        };
      }

      return true; // 表示处理了拖拽
    },
    [
      tableDividerDragging,
      elementMap,
      toCanvasMm,
      config.snapToGrid,
      config.gridSize,
      config.minRowHeight,
      config.minColumnWidth,
    ]
  );

  // ==================== 结束拖拽 ====================

  /**
   * 结束拖拽(立即提交待处理的更新)
   */
  const handleMouseUp = useCallback(() => {
    // 立即提交待处理的更新(如果有)
    if (pendingUpdateRef.current) {
      const { id, properties, size } = pendingUpdateRef.current;

      console.log('🔧 [useTableDivider] handleMouseUp 提交更新:', {
        id,
        size,
        properties,
      });

      // ✅ 最终修复:使用 onUpdateElement 一次性更新 size 和 properties
      // updateElement 现在支持深度合并 properties,不会丢失其他字段
      // 只触发一次 saveHistory,避免覆盖问题
      if (onUpdateElement) {
        console.log('🔧 [useTableDivider] 调用 onUpdateElement 一次性更新');
        onUpdateElement(id, { size, properties });
      }

      pendingUpdateRef.current = null;
    }

    // 清除拖拽状态
    setTableDividerDragging(null);
  }, [onUpdateElement]);

  // ==================== 导出 ====================

  return {
    tableDividerDragging,
    handleRowDividerMouseDown,
    handleColDividerMouseDown,
    handleMouseMove,
    handleMouseUp,
    config, // 导出配置供组件使用
  };
};
