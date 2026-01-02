/**
 * useContentAreas.ts
 * 内容区域管理Hook
 * 提供内容区域的增删改查和状态管理功能
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { TemplateSections, SectionConfig } from '../types';
import {
  calculateActualY,
  detectLayoutConflicts,
  createDefaultContentArea,
  calculateAreaPositions,
} from '../utils/multiContentAreaUtils';
import type { AreaPosition, LayoutConflict } from '../utils/multiContentAreaUtils';

export interface UseContentAreasOptions {
  sections: TemplateSections;
  onSectionsChange: (sections: TemplateSections) => void;
  pageHeight: number;
}

export interface UseContentAreasReturn {
  contentAreas: SectionConfig[];
  areaPositions: AreaPosition[];
  conflicts: LayoutConflict[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addArea: () => void;
  deleteArea: (index: number) => void;
  updateArea: (index: number, updatedArea: SectionConfig) => void;
  duplicateArea: (index: number) => void;
  reorderAreas: (fromIndex: number, toIndex: number) => void;
}

/**
 * 内容区域管理Hook
 */
export const useContentAreas = ({
  sections,
  onSectionsChange,
  pageHeight,
}: UseContentAreasOptions): UseContentAreasReturn => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const headerHeight = sections.header?.height || 0;

  // 确保所有区域都有唯一ID（兼容旧数据）
  const contentAreas = useMemo(() => {
    return (sections.contentAreas || []).map((area, index) => {
      if (!area.id) {
        return {
          ...area,
          id: `area_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
        };
      }
      return area;
    });
  }, [sections.contentAreas]);

  // 检测是否有区域缺少ID，如果有则立即保存
  useEffect(() => {
    const hasAreaWithoutId = (sections.contentAreas || []).some(area => !area.id);
    if (hasAreaWithoutId && contentAreas.length > 0) {
      console.log('[useContentAreas] 检测到区域缺少ID，自动生成并保存');
      onSectionsChange({
        ...sections,
        contentAreas: contentAreas,
      });
    }
  }, [sections.contentAreas]); // 依赖 sections.contentAreas，每次变化时检查

  // 计算区域位置
  const areaPositions = useMemo(() => {
    return calculateAreaPositions(sections);
  }, [sections]);

  // 检测冲突
  const conflicts = useMemo(() => {
    return detectLayoutConflicts(sections, pageHeight);
  }, [sections, pageHeight]);

  // 添加区域
  const addArea = useCallback(() => {
    const newArea = createDefaultContentArea(
      contentAreas.length,
      headerHeight,
      contentAreas
    );

    onSectionsChange({
      ...sections,
      contentAreas: [...contentAreas, newArea],
    });

    setActiveIndex(contentAreas.length);
  }, [contentAreas, sections, onSectionsChange, headerHeight]);

  // 删除区域
  const deleteArea = useCallback(
    (index: number) => {
      const newAreas = contentAreas.filter((_, i) => i !== index);
      onSectionsChange({
        ...sections,
        contentAreas: newAreas,
      });

      if (activeIndex === index) {
        setActiveIndex(Math.max(0, index - 1));
      } else if (activeIndex > index) {
        setActiveIndex(activeIndex - 1);
      }
    },
    [contentAreas, sections, onSectionsChange, activeIndex]
  );

  // 更新区域
  const updateArea = useCallback(
    (index: number, updatedArea: SectionConfig) => {
      console.log('[useContentAreas] updateArea:', { index, updatedArea });
      const newAreas = [...contentAreas];
      // 确保保留原有的 ID（如果 updatedArea 中没有提供 ID）
      const originalArea = contentAreas[index];
      newAreas[index] = {
        ...updatedArea,
        id: updatedArea.id || originalArea?.id, // 优先使用 updatedArea 的 id，如果没有则使用原有 id
      };
      const newSections = {
        ...sections,
        contentAreas: newAreas,
      };
      console.log('[useContentAreas] onSectionsChange:', newSections);
      onSectionsChange(newSections);
    },
    [contentAreas, sections, onSectionsChange]
  );

  // 复制区域
  const duplicateArea = useCallback(
    (index: number) => {
      const sourceArea = contentAreas[index];

      // 先创建一个具有正确定位的默认区域
      const defaultArea = createDefaultContentArea(
        index + 1, // 新区域的索引
        headerHeight,
        contentAreas.slice(0, index + 1) // 包括当前区域在内的所有前序区域
      );

      // 然后覆盖需要复制的属性(保留定位相关的属性为默认值)
      const newArea: SectionConfig = {
        ...defaultArea, // 使用默认的定位配置
        name: `${sourceArea.name}_副本`,
        height: sourceArea.height, // 复制高度
        dataSourceKey: sourceArea.dataSourceKey, // 复制数据源
        printFrequency: sourceArea.printFrequency, // 复制打印频率
        followLoopPagination: sourceArea.followLoopPagination, // 复制分页设置
        labelGridLayout: sourceArea.labelGridLayout, // 复制网格布局
        elementIds: [], // 不复制元素
      };

      const newAreas = [
        ...contentAreas.slice(0, index + 1),
        newArea,
        ...contentAreas.slice(index + 1),
      ];

      onSectionsChange({
        ...sections,
        contentAreas: newAreas,
      });

      setActiveIndex(index + 1);
    },
    [contentAreas, sections, onSectionsChange, headerHeight]
  );

  // 重新排序
  const reorderAreas = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newAreas = [...contentAreas];
      const [movedArea] = newAreas.splice(fromIndex, 1);
      newAreas.splice(toIndex, 0, movedArea);

      onSectionsChange({
        ...sections,
        contentAreas: newAreas,
      });

      setActiveIndex(toIndex);
    },
    [contentAreas, sections, onSectionsChange]
  );

  return {
    contentAreas,
    areaPositions,
    conflicts,
    activeIndex,
    setActiveIndex,
    addArea,
    deleteArea,
    updateArea,
    duplicateArea,
    reorderAreas,
  };
};
