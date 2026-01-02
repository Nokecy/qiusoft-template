/**
 * ContentAreasManager.tsx
 * 内容区域管理器组件
 * 管理多个内容区域的添加、删除、排序等操作
 * 包含元素删除和位置调整功能
 */

import React from 'react';
import { Button, Space, Segmented, Empty } from 'antd';
import { PlusOutlined, OrderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TemplateSections } from '../types';
import { ContentAreaPaginationMode } from '../types';
import { ContentAreaCard } from './ContentAreaCard';
import { useContentAreas } from '../hooks/useContentAreas';
import { calculateAreaPositions } from '../utils/multiContentAreaUtils';

export interface ContentAreasManagerProps {
  sections: TemplateSections;
  onSectionsChange: (sections: TemplateSections) => void;
  pageHeight: number;
  dataSources: Record<string, import('../types').AtlDataSource>;
  canvasWidth: number;
  elements: import('../types').AtlElement[];
  onElementsChange?: (elements: import('../types').AtlElement[]) => void;
  onSectionsAndElementsChange?: (sections: TemplateSections, elements: import('../types').AtlElement[]) => void;
}

/**
 * 可排序项组件
 */
const SortableItem: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {React.cloneElement(children as React.ReactElement, {
        dragHandleProps: listeners,
      })}
    </div>
  );
};

/**
 * 内容区域管理器组件
 */
export const ContentAreasManager: React.FC<ContentAreasManagerProps> = ({
  sections,
  onSectionsChange,
  pageHeight,
  dataSources,
  canvasWidth,
  elements,
  onElementsChange,
  onSectionsAndElementsChange,
}) => {
  const {
    contentAreas,
    conflicts,
    activeIndex,
    setActiveIndex,
    addArea,
    deleteArea,
    updateArea,
    duplicateArea,
    reorderAreas,
  } = useContentAreas({ sections, onSectionsChange, pageHeight });

  const headerHeight = sections.header?.height || 0;

  // 处理内容区域删除，同时删除该区域的元素并调整其他元素位置
  const handleDeleteArea = (index: number) => {
    console.log('🗑️ handleDeleteArea 开始执行:', { index });
    const areaToDelete = contentAreas[index];
    console.log('📋 要删除的区域:', { areaToDelete, hasCallback: !!onElementsChange });

    if (!areaToDelete || !onElementsChange) {
      console.log('⚠️ 缺少必要数据，直接删除区域');
      deleteArea(index);
      return;
    }

    // 1. 计算被删除区域的高度和Y坐标
    const areaPositions = calculateAreaPositions(sections);
    const deletedAreaPosition = areaPositions[index];
    const deletedAreaHeight = deletedAreaPosition?.height || 0;
    const deletedAreaY = deletedAreaPosition?.y || 0;
    const deletedAreaBottom = deletedAreaY + deletedAreaHeight;
    console.log('📐 区域位置信息:', { deletedAreaY, deletedAreaHeight, deletedAreaBottom });

    // 2. 删除该区域的所有元素
    // 只删除section=1(内容区域) 且 sectionId匹配的元素
    const filteredElements = elements.filter((el) => {
      // 保留非内容区域的元素
      if (el.section !== 1) return true;

      // 对于内容区域元素，检查sectionId是否匹配
      const shouldDelete = el.sectionId === areaToDelete.id;

      if (shouldDelete) {
        console.log('🗑️ 删除元素:', {
          elementId: el.id,
          section: el.section,
          sectionId: el.sectionId,
          areaToDeleteId: areaToDelete.id
        });
      }

      // 保留不匹配的元素
      return !shouldDelete;
    });

    console.log('📊 元素过滤结果:', {
      原始元素数: elements.length,
      过滤后元素数: filteredElements.length,
      删除数量: elements.length - filteredElements.length
    });

    // 3. 调整位置：只有Y坐标大于被删除区域底部的元素需要向上移动
    const adjustedElements = filteredElements.map((el) => {
      if (el.position.y > deletedAreaBottom) {
        console.log('📍 调整元素位置:', {
          elementId: el.id,
          原始Y: el.position.y,
          新Y: el.position.y - deletedAreaHeight
        });
        return {
          ...el,
          position: {
            ...el.position,
            y: el.position.y - deletedAreaHeight,
          },
        };
      }
      return el;
    });

    console.log('✅ 准备调用 onElementsChange, 最终元素数量:', adjustedElements.length);

    // 4. 删除区域
    const newAreas = contentAreas.filter((_, i) => i !== index);
    const newSections = {
      ...sections,
      contentAreas: newAreas,
    };

    console.log('📋 准备更新, 新区域数量:', newAreas.length);

    // 5. 一次性更新 sections 和 elements
    if (onSectionsAndElementsChange) {
      // 优先使用原子更新回调，避免history truncation问题
      console.log('✅ 使用原子更新回调');
      onSectionsAndElementsChange(newSections, adjustedElements);
      console.log('✅ handleDeleteArea 执行完成');
    } else {
      // Fallback: 分开更新(会有history问题)
      console.log('⚠️ 使用分开更新(fallback)');
      onSectionsChange(newSections);
      setTimeout(() => {
        onElementsChange!(adjustedElements);
        console.log('✅ elements已更新, handleDeleteArea 执行完成');
      }, 0);
    }
  };

  // 处理拖拽结束
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const fromIndex = parseInt(active.id.toString());
      const toIndex = parseInt(over.id.toString());
      reorderAreas(fromIndex, toIndex);
    }
  };

  return (
    <div className="content-areas-manager">
      {/* 顶部工具栏 */}
      <div style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addArea}
            block
            style={{ height: 40 }}
          >
            新增内容区域
          </Button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>分页模式：</span>
            <Segmented
              value={sections.paginationMode || ContentAreaPaginationMode.Sequential}
              onChange={(value) =>
                onSectionsChange({
                  ...sections,
                  paginationMode: value as ContentAreaPaginationMode,
                })
              }
              options={[
                {
                  label: '串联分页',
                  value: ContentAreaPaginationMode.Sequential,
                  icon: <OrderedListOutlined />,
                },
                {
                  label: '并行分页',
                  value: ContentAreaPaginationMode.Parallel,
                  icon: <AppstoreOutlined />,
                },
              ]}
            />
          </div>
        </Space>
      </div>

      {/* 区域列表 */}
      {contentAreas.length > 0 ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={contentAreas.map((_, i) => i.toString())}
            strategy={verticalListSortingStrategy}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {contentAreas.map((area, index) => {
                const areaConflicts = conflicts.filter((c) => c.areaIndex === index);
                const previousAreas = contentAreas.slice(0, index);

                // 筛选属于当前区域的元素
                const areaElements = elements.filter(el =>
                  el.section === 1 && // SectionType.Content
                  el.sectionId === area.id
                );

                return (
                  <SortableItem key={index} id={index.toString()}>
                    <ContentAreaCard
                      area={area}
                      index={index}
                      isActive={activeIndex === index}
                      conflicts={areaConflicts}
                      previousAreas={previousAreas}
                      headerHeight={headerHeight}
                      onUpdate={(updatedArea) => updateArea(index, updatedArea)}
                      onDelete={() => handleDeleteArea(index)}
                      onDuplicate={() => duplicateArea(index)}
                      onActivate={() => setActiveIndex(index)}
                      dataSources={dataSources}
                      canvasWidth={canvasWidth}
                      areaElements={areaElements}
                    />
                  </SortableItem>
                );
              })}
            </Space>
          </SortableContext>
        </DndContext>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无内容区域，点击上方按钮添加"
          style={{ padding: '40px 0' }}
        />
      )}
    </div>
  );
};

export default ContentAreasManager;
