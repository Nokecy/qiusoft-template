/**
 * 元素拖拽逻辑Hook
 */
import { useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import { AtlElement, SectionType, TemplateSections } from '../../../types';
import { calculateSectionLayout } from '../../../utils/sectionUtils';
import { SectionType as SectionTypeEnum } from '../../../types';
import { detectFirstGridCell } from '../utils/gridDetection';

export interface DraggingState {
  elementId: string;
  offsetX: number; // 鼠标相对元素左上角的X偏移（毫米）
  offsetY: number; // 鼠标相对元素左上角的Y偏移（毫米）
}

export interface UseDragDropParams {
  elements: AtlElement[];
  width: number;
  height: number;
  dpi: number;
  sections?: TemplateSections;
  onSelectElement: (id: string | null) => void;
  onSelectSection?: (sectionType: SectionType | null) => void;
  onUpdateElementPosition: (id: string, position: { x: number; y: number }) => void;
  onUpdateElement?: (id: string, updates: Partial<AtlElement>) => void;
  onUpdateSection?: (sectionType: SectionType, config: any) => void;
  toCanvasMm: (clientX: number, clientY: number) => { x: number; y: number };
}

export const useDragDrop = ({
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
  toCanvasMm,
}: UseDragDropParams) => {
  const [dragging, setDragging] = useState<DraggingState | null>(null);

  /**
   * 开始拖拽
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, elementId: string) => {
      e.stopPropagation();

      // 选中元素时,取消区域选择
      if (onSelectSection) {
        onSelectSection(null);
      }
      onSelectElement(elementId);

      const element = elements.find((el) => el.id === elementId);
      if (!element) return;

      // 检查元素是否被锁定
      if (element.locked) {
        // 锁定的元素只允许选中，不允许拖动
        return;
      }

      // 计算鼠标在画布中的位置（毫米）
      const mousePos = toCanvasMm(e.clientX, e.clientY);

      // 计算鼠标相对于元素左上角的偏移
      // 这样在拖拽过程中，鼠标相对于元素的位置保持不变
      const offsetX = mousePos.x - element.position.x;
      const offsetY = mousePos.y - element.position.y;

      setDragging({
        elementId,
        offsetX,
        offsetY,
      });
    },
    [elements, onSelectElement, onSelectSection, toCanvasMm],
  );

  /**
   * 拖拽中
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return false;

      // 计算当前鼠标在画布中的位置（毫米）
      const mousePos = toCanvasMm(e.clientX, e.clientY);

      // 计算元素新位置：鼠标位置 - 偏移量
      // 这样保证了鼠标相对于元素的位置始终不变
      let newX = mousePos.x - dragging.offsetX;
      let newY = mousePos.y - dragging.offsetY;

      // 限制元素在画布范围内
      newX = Math.max(0, Math.min(width, newX));
      newY = Math.max(0, Math.min(height, newY));

      // 更新元素位置
      onUpdateElementPosition(dragging.elementId, { x: newX, y: newY });

      return true; // 表示处理了拖拽
    },
    [dragging, width, height, toCanvasMm, onUpdateElementPosition],
  );

  /**
   * 结束拖拽
   */
  const handleMouseUp = useCallback(() => {
    // 检查是否需要更新元素的section（跨区域拖动）
    if (dragging && sections && onUpdateElement) {
      const element = elements.find((el) => el.id === dragging.elementId);
      if (element) {
        // 计算区域布局
        const layout = calculateSectionLayout({
          canvas: { width, height, dpi },
          sections,
          elements,
        } as any);

        // 根据元素的Y坐标判断属于哪个区域
        const elementY = element.position.y;
        let newSection: SectionType;

        if (
          sections.header &&
          layout.headerHeight > 0 &&
          elementY < layout.headerOffset + layout.headerHeight
        ) {
          // 页头区域
          newSection = SectionTypeEnum.Header;
        } else if (
          sections.footer &&
          layout.footerHeight > 0 &&
          elementY >= layout.footerOffset
        ) {
          // 页尾区域
          newSection = SectionTypeEnum.Footer;
        } else {
          // 内容区域
          newSection = SectionTypeEnum.Content;
        }

        // 如果section发生变化,更新元素
        if (element.section !== newSection) {
          onUpdateElement(dragging.elementId, { section: newSection });
        }

        // 检测是否拖入第一个网格单元格，自动配置cellTemplate
        const gridDetection = detectFirstGridCell(element, sections, width, height, dpi, elements);

        // 处理cellTemplate的添加/移除
        if (onUpdateSection) {
          // 处理页头
          if (sections.header?.labelGridLayout) {
            const currentCellTemplate = sections.header.labelGridLayout.cellTemplate || [];
            const elementExists = currentCellTemplate.some(e => e.id === element.id);

            if (gridDetection && gridDetection.sectionType === SectionTypeEnum.Header && gridDetection.areaIndex === undefined) {
              if (!elementExists) {
                const newConfig = {
                  ...sections.header,
                  labelGridLayout: {
                    ...sections.header.labelGridLayout,
                    cellTemplate: [...currentCellTemplate, { ...element }],
                  },
                };
                onUpdateSection(SectionTypeEnum.Header, newConfig);
                message.success(`已将元素添加到页头网格单元格模板`);
              }
            } else if (elementExists) {
              const newCellTemplate = currentCellTemplate.filter(e => e.id !== element.id);
              const newConfig = {
                ...sections.header,
                labelGridLayout: {
                  ...sections.header.labelGridLayout,
                  cellTemplate: newCellTemplate,
                },
              };
              onUpdateSection(SectionTypeEnum.Header, newConfig);
              message.info(`已将元素从页头网格单元格模板中移除`);
            }
          }

          // 处理多内容区域
          if (sections.contentAreas && sections.contentAreas.length > 0) {
            sections.contentAreas.forEach((area, index) => {
              if (!area.labelGridLayout) return;

              const currentCellTemplate = area.labelGridLayout.cellTemplate || [];
              const elementExists = currentCellTemplate.some(e => e.id === element.id);

              if (gridDetection && gridDetection.sectionType === SectionTypeEnum.Content && gridDetection.areaIndex === index) {
                if (!elementExists) {
                  const newContentAreas = [...sections.contentAreas!];
                  newContentAreas[index] = {
                    ...area,
                    labelGridLayout: {
                      ...area.labelGridLayout,
                      cellTemplate: [...currentCellTemplate, { ...element }],
                    },
                  };
                  onUpdateSection(SectionTypeEnum.Content, { contentAreas: newContentAreas });
                  message.success(`已将元素添加到${area.name || `内容区域${index + 1}`}的网格单元格模板`);
                }
              } else if (elementExists) {
                const newCellTemplate = currentCellTemplate.filter(e => e.id !== element.id);
                const newContentAreas = [...sections.contentAreas!];
                newContentAreas[index] = {
                  ...area,
                  labelGridLayout: {
                    ...area.labelGridLayout,
                    cellTemplate: newCellTemplate,
                  },
                };
                onUpdateSection(SectionTypeEnum.Content, { contentAreas: newContentAreas });
                message.info(`已将元素从${area.name || `内容区域${index + 1}`}的网格单元格模板中移除`);
              }
            });
          }
          // 处理传统单内容区域（向后兼容）
          else if (sections.content?.labelGridLayout) {
            const currentCellTemplate = sections.content.labelGridLayout.cellTemplate || [];
            const elementExists = currentCellTemplate.some(e => e.id === element.id);

            if (gridDetection && gridDetection.sectionType === SectionTypeEnum.Content && gridDetection.areaIndex === undefined) {
              if (!elementExists) {
                const newConfig = {
                  ...sections.content,
                  labelGridLayout: {
                    ...sections.content.labelGridLayout,
                    cellTemplate: [...currentCellTemplate, { ...element }],
                  },
                };
                onUpdateSection(SectionTypeEnum.Content, newConfig);
                message.success(`已将元素添加到内容区域网格单元格模板`);
              }
            } else if (elementExists) {
              const newCellTemplate = currentCellTemplate.filter(e => e.id === element.id);
              const newConfig = {
                ...sections.content,
                labelGridLayout: {
                  ...sections.content.labelGridLayout,
                  cellTemplate: newCellTemplate,
                },
              };
              onUpdateSection(SectionTypeEnum.Content, newConfig);
              message.info(`已将元素从内容区域网格单元格模板中移除`);
            }
          }

          // 处理页尾
          if (sections.footer?.labelGridLayout) {
            const currentCellTemplate = sections.footer.labelGridLayout.cellTemplate || [];
            const elementExists = currentCellTemplate.some(e => e.id === element.id);

            if (gridDetection && gridDetection.sectionType === SectionTypeEnum.Footer && gridDetection.areaIndex === undefined) {
              if (!elementExists) {
                const newConfig = {
                  ...sections.footer,
                  labelGridLayout: {
                    ...sections.footer.labelGridLayout,
                    cellTemplate: [...currentCellTemplate, { ...element }],
                  },
                };
                onUpdateSection(SectionTypeEnum.Footer, newConfig);
                message.success(`已将元素添加到页尾网格单元格模板`);
              }
            } else if (elementExists) {
              const newCellTemplate = currentCellTemplate.filter(e => e.id === element.id);
              const newConfig = {
                ...sections.footer,
                labelGridLayout: {
                  ...sections.footer.labelGridLayout,
                  cellTemplate: newCellTemplate,
                },
              };
              onUpdateSection(SectionTypeEnum.Footer, newConfig);
              message.info(`已将元素从页尾网格单元格模板中移除`);
            }
          }
        }
      }
    }

    setDragging(null);
  }, [dragging, sections, elements, width, height, dpi, onUpdateElement, onUpdateSection]);

  return {
    dragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
