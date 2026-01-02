/**
 * 表格单元格编辑 Hook
 * 管理单元格编辑状态和操作
 */

import { useState, useCallback, useRef } from 'react';
import type { AtlElement, TableProperties, TableCell } from '../../../types';

export interface CellEditState {
  visible: boolean;
  element: AtlElement | null;
  rowIndex: number;
  colIndex: number;
  cell: TableCell | null;
}

export interface UseCellEditReturn {
  editState: CellEditState;
  openCellEdit: (element: AtlElement, rowIndex: number, colIndex: number) => void;
  closeCellEdit: () => void;
  saveCellEdit: (rowIndex: number, colIndex: number, updates: Partial<TableCell>) => void;
}

/**
 * 单元格编辑 Hook
 * @param onUpdateElement 更新元素的回调函数
 */
export const useCellEdit = (
  onUpdateElement: (elementId: string, updates: Partial<AtlElement>) => void
): UseCellEditReturn => {
  const [editState, setEditState] = useState<CellEditState>({
    visible: false,
    element: null,
    rowIndex: -1,
    colIndex: -1,
    cell: null,
  });

  // ✅ 使用 ref 保存 element 引用，避免 closeCellEdit 清空后无法访问
  const elementRef = useRef<AtlElement | null>(null);

  /**
   * 打开单元格编辑对话框
   */
  const openCellEdit = useCallback((element: AtlElement, rowIndex: number, colIndex: number) => {
    const props = element.properties as TableProperties;
    const cell = props.cells[rowIndex]?.[colIndex];

    if (cell && !cell.merged) {
      // 同时保存到 state 和 ref
      elementRef.current = element;
      setEditState({
        visible: true,
        element,
        rowIndex,
        colIndex,
        cell,
      });
    }
  }, []);

  /**
   * 关闭单元格编辑对话框
   */
  const closeCellEdit = useCallback(() => {
    setEditState({
      visible: false,
      element: null,
      rowIndex: -1,
      colIndex: -1,
      cell: null,
    });
    // 注意：不要清空 elementRef，因为 afterClose 回调还需要用到
    // elementRef 会在下次 openCellEdit 时被覆盖
  }, []);

  /**
   * 保存单元格编辑
   */
  const saveCellEdit = useCallback(
    (rowIndex: number, colIndex: number, updates: Partial<TableCell>) => {
      console.log('[useCellEdit] saveCellEdit 被调用:', { rowIndex, colIndex, updates });

      // ✅ 从 ref 获取 element，而不是从 editState
      // 因为 closeCellEdit 可能已经清空了 editState.element
      const element = elementRef.current;

      if (!element) {
        console.log('[useCellEdit] saveCellEdit - element 为空，退出');
        return;
      }

      console.log('[useCellEdit] saveCellEdit - 从 ref 获取到 element:', element.id);
      const props = element.properties as TableProperties;
      const newCells = JSON.parse(JSON.stringify(props.cells)); // 深拷贝

      // 更新当前单元格
      newCells[rowIndex][colIndex] = {
        ...newCells[rowIndex][colIndex],
        ...updates,
      };

      // 处理行列合并逻辑 - 添加默认值确保始终是数字,避免 NaN
      const oldCell = props.cells[rowIndex][colIndex];
      const oldRowSpan = oldCell.rowSpan ?? 1;  // 提供默认值 1
      const oldColSpan = oldCell.colSpan ?? 1;  // 提供默认值 1
      let newRowSpan = updates.rowSpan ?? oldRowSpan;
      let newColSpan = updates.colSpan ?? oldColSpan;

      // 验证合并范围不超出表格边界
      if (rowIndex + newRowSpan > props.rows) {
        console.warn(`rowSpan ${newRowSpan} exceeds table bounds, adjusting to ${props.rows - rowIndex}`);
        newRowSpan = props.rows - rowIndex;
      }
      if (colIndex + newColSpan > props.columns) {
        console.warn(`colSpan ${newColSpan} exceeds table bounds, adjusting to ${props.columns - colIndex}`);
        newColSpan = props.columns - colIndex;
      }

      // 恢复之前被合并的单元格
      for (let r = rowIndex; r < rowIndex + oldRowSpan && r < props.rows; r++) {
        for (let c = colIndex; c < colIndex + oldColSpan && c < props.columns; c++) {
          if (r !== rowIndex || c !== colIndex) {
            newCells[r][c].merged = false;
            // 确保恢复的单元格也有默认值
            newCells[r][c].rowSpan = newCells[r][c].rowSpan ?? 1;
            newCells[r][c].colSpan = newCells[r][c].colSpan ?? 1;
          }
        }
      }

      // 标记新的被合并单元格
      for (let r = rowIndex; r < rowIndex + newRowSpan && r < props.rows; r++) {
        for (let c = colIndex; c < colIndex + newColSpan && c < props.columns; c++) {
          if (r !== rowIndex || c !== colIndex) {
            newCells[r][c].merged = true;
            // 确保被合并的单元格也有默认值
            newCells[r][c].rowSpan = newCells[r][c].rowSpan ?? 1;
            newCells[r][c].colSpan = newCells[r][c].colSpan ?? 1;
          }
        }
      }

      // 确保主单元格有正确的 rowSpan/colSpan 值
      newCells[rowIndex][colIndex].rowSpan = newRowSpan;
      newCells[rowIndex][colIndex].colSpan = newColSpan;
      newCells[rowIndex][colIndex].merged = false; // 主单元格不是被合并状态

      // ✅ 修复: 移除 closeCellEdit() 在更新前调用
      // 现在由 CellEditModal 的 afterClose 回调确保 Modal 完全销毁后再执行此函数
      // 这样可以避免在 Modal 销毁过程中触发父组件重新渲染导致 "Rendered fewer hooks" 错误

      console.log('[useCellEdit] saveCellEdit - 准备更新元素:', element.id);
      console.log('[useCellEdit] saveCellEdit - 新的 cells:', newCells);

      // 直接更新元素（此时 Modal 已通过 afterClose 完全关闭和销毁）
      onUpdateElement(element.id, {
        properties: {
          ...props,
          cells: newCells,
        },
      });

      console.log('[useCellEdit] saveCellEdit - onUpdateElement 已调用');

      // ✅ 不要在这里调用 closeCellEdit()
      // 因为 Modal 的 onCancel 已经调用过了，重复调用会导致 hooks 错误

      // 清空 ref
      elementRef.current = null;

      console.log('[useCellEdit] saveCellEdit - 完成');
    },
    [onUpdateElement]
  );

  return {
    editState,
    openCellEdit,
    closeCellEdit,
    saveCellEdit,
  };
};
