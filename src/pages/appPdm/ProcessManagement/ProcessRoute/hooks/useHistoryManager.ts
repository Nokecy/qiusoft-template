import { useState, useCallback, useRef } from 'react';
import { Node, Edge } from 'reactflow';

/**
 * 历史记录状态
 */
interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

/**
 * 历史记录管理器配置
 */
interface HistoryManagerConfig {
  maxHistorySize?: number; // 最大历史记录数量
}

/**
 * 历史记录管理器 Hook
 * 用于实现撤销和重做功能
 */
export const useHistoryManager = (
  initialNodes: Node[],
  initialEdges: Edge[],
  config: HistoryManagerConfig = {},
) => {
  const { maxHistorySize = 50 } = config;

  // 历史记录栈
  const [history, setHistory] = useState<HistoryState[]>([
    { nodes: initialNodes, edges: initialEdges },
  ]);
  // 当前历史记录索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 用于防止重复记录
  const isRestoringRef = useRef(false);

  /**
   * 添加新的历史记录
   */
  const pushHistory = useCallback(
    (nodes: Node[], edges: Edge[]) => {
      // 如果正在恢复历史记录,不添加新记录
      if (isRestoringRef.current) {
        return;
      }

      setHistory((prev) => {
        // 如果当前不是最新的记录,移除当前索引之后的所有记录
        const newHistory = prev.slice(0, currentIndex + 1);

        // 添加新记录
        newHistory.push({ nodes: [...nodes], edges: [...edges] });

        // 如果超过最大历史记录数量,移除最旧的记录
        if (newHistory.length > maxHistorySize) {
          return newHistory.slice(1);
        }

        return newHistory;
      });

      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        return newIndex >= maxHistorySize ? maxHistorySize - 1 : newIndex;
      });
    },
    [currentIndex, maxHistorySize],
  );

  /**
   * 撤销操作
   */
  const undo = useCallback((): HistoryState | null => {
    if (currentIndex <= 0) {
      return null;
    }

    isRestoringRef.current = true;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    const state = history[newIndex];
    isRestoringRef.current = false;

    return state;
  }, [currentIndex, history]);

  /**
   * 重做操作
   */
  const redo = useCallback((): HistoryState | null => {
    if (currentIndex >= history.length - 1) {
      return null;
    }

    isRestoringRef.current = true;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    const state = history[newIndex];
    isRestoringRef.current = false;

    return state;
  }, [currentIndex, history]);

  /**
   * 清空历史记录
   */
  const clearHistory = useCallback((nodes: Node[], edges: Edge[]) => {
    setHistory([{ nodes, edges }]);
    setCurrentIndex(0);
  }, []);

  /**
   * 检查是否可以撤销
   */
  const canUndo = currentIndex > 0;

  /**
   * 检查是否可以重做
   */
  const canRedo = currentIndex < history.length - 1;

  return {
    pushHistory,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
    historySize: history.length,
    currentIndex,
  };
};
