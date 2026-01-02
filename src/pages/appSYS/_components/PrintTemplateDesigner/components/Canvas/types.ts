/**
 * Canvas组件类型定义
 */

import type {
  AtlElement,
  ElementType,
  TemplateSections,
  SectionType,
  SectionConfig,
} from '../../types';

/**
 * 创建元素时的选项参数
 */
export interface CreateElementOptions {
  section?: SectionType;
  sectionId?: string;
}

/**
 * Canvas组件属性接口
 */
export interface CanvasProps {
  width: number; // 画布宽度(毫米)
  height: number; // 画布高度(毫米)
  dpi: number; // DPI
  elements: AtlElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElementPosition: (id: string, position: { x: number; y: number }) => void;
  onUpdateElementSize: (id: string, size: { width: number; height: number }) => void;
  onUpdateElementProperties?: (id: string, properties: Partial<any>) => void;
  onUpdateElement?: (id: string, updates: Partial<AtlElement>) => void;
  onAddElementAtPosition?: (type: ElementType, position: { x: number; y: number }, options?: CreateElementOptions) => void;
  onRemoveElement?: (id: string) => void;
  onMoveToTop?: (id: string) => void;
  onMoveToBottom?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  showGrid?: boolean; // 是否显示网格
  showRuler?: boolean; // 是否显示标尺
  showSectionBoundaries?: boolean; // 是否显示区域边界虚线框
  showGridBoundaries?: boolean; // 是否显示网格边界
  bindingContext?: Record<string, any>;
  sections?: TemplateSections; // 区域配置（用于显示页头页尾边界）
  selectedSection?: SectionType | null; // 当前选中的区域
  onSelectSection?: (sectionType: SectionType | null) => void; // 区域选择回调
  onUpdateSection?: (sectionType: SectionType, config: Partial<SectionConfig>) => void; // 更新区域配置
  onUpdateCanvasHeight?: (height: number) => void; // 更新画布高度回调
}
