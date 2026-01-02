/**
 * sectionUtils.ts
 * 区域管理工具函数
 * 用于计算、验证和处理页头页尾相关逻辑
 */

import type {
  AtlTemplate,
  AtlElement,
  SectionType,
  SectionConfig,
  PaginationContext,
  SectionPrintFrequency,
} from '../types';
import { SectionType as SectionTypeEnum, SectionPrintFrequency as PrintFrequency, YPositionMode } from '../types';
import { calculateActualY } from './multiContentAreaUtils';

/**
 * 内容区域位置信息接口
 */
export interface ContentAreaLayout {
  index: number;           // 区域索引
  offset: number;          // 起始Y坐标(包含前面所有区域)
  height: number;          // 区域高度
  actualY: number;         // 实际Y坐标(相对画布)
}

/**
 * 区域布局信息接口
 */
export interface SectionLayout {
  headerOffset: number;    // 页头起始Y坐标
  headerHeight: number;    // 页头高度
  contentOffset: number;   // 内容区起始Y坐标
  contentHeight: number;   // 内容区高度
  footerOffset: number;    // 页尾起始Y坐标
  footerHeight: number;    // 页尾高度
  contentAreas: ContentAreaLayout[];  // 多内容区域布局信息
  totalContentHeight: number;  // 所有内容区域的总高度
}

/**
 * 计算指定区域的高度
 * @param elements 元素列表
 * @param sectionType 区域类型
 * @returns 区域高度（毫米）
 */
export function calculateSectionHeight(elements: AtlElement[], sectionType: SectionType): number {
  // 筛选出属于该区域的元素
  const sectionElements = elements.filter(
    el => (el.section ?? SectionTypeEnum.Content) === sectionType
  );

  if (sectionElements.length === 0) {
    return 0;
  }

  // 找到所有元素的最大 Y 坐标 + 高度
  const maxBottom = Math.max(
    ...sectionElements.map(el => el.position.y + el.size.height)
  );

  // 找到所有元素的最小 Y 坐标
  const minTop = Math.min(
    ...sectionElements.map(el => el.position.y)
  );

  return maxBottom - minTop;
}

/**
 * 判断区域是否应该渲染
 * @param sectionConfig 区域配置
 * @param pagination 分页上下文
 * @returns 是否应该渲染该区域
 */
export function shouldRenderSection(
  sectionConfig: { printFrequency: SectionPrintFrequency } | undefined,
  pagination: PaginationContext
): boolean {
  if (!sectionConfig) {
    return false;
  }

  switch (sectionConfig.printFrequency) {
    case PrintFrequency.EveryPage:
      return true;
    case PrintFrequency.FirstPageOnly:
      return pagination.isFirstPage;
    case PrintFrequency.LastPageOnly:
      return pagination.isLastPage;
    case PrintFrequency.None:
      return false;
    default:
      return true;
  }
}

/**
 * 按区域分组元素
 * @param template 模板对象
 * @returns 分组后的元素
 */
export function groupElementsBySection(template: AtlTemplate) {
  const groups = {
    header: [] as AtlElement[],
    content: [] as AtlElement[],
    footer: [] as AtlElement[],
  };

  template.elements.forEach(element => {
    const section = element.section ?? SectionTypeEnum.Content;

    switch (section) {
      case SectionTypeEnum.Header:
        groups.header.push(element);
        break;
      case SectionTypeEnum.Footer:
        groups.footer.push(element);
        break;
      case SectionTypeEnum.Content:
      default:
        groups.content.push(element);
        break;
    }
  });

  return groups;
}

/**
 * 计算各区域的布局信息(支持多内容区域)
 * @param template 模板对象
 * @param pagination 分页上下文（可选）
 * @returns 区域布局信息
 */
export function calculateSectionLayout(
  template: AtlTemplate,
  pagination?: PaginationContext
): SectionLayout {
  const { sections, elements, canvas } = template;

  // 默认布局（无页头页尾）
  let layout: SectionLayout = {
    headerOffset: 0,
    headerHeight: 0,
    contentOffset: 0,
    contentHeight: canvas.height,
    footerOffset: canvas.height,
    footerHeight: 0,
    contentAreas: [],
    totalContentHeight: canvas.height,
  };

  // 如果没有配置区域，直接返回默认布局
  if (!sections) {
    return layout;
  }

  // 计算页头高度
  let headerHeight = 0;
  if (sections.header) {
    if (sections.header.height !== undefined) {
      headerHeight = sections.header.height;
    } else {
      const calculatedHeight = calculateSectionHeight(elements, SectionTypeEnum.Header);
      // 如果没有元素或计算高度为0，使用默认高度20mm
      headerHeight = calculatedHeight > 0 ? calculatedHeight : 20;
    }
  }

  // 计算页尾高度
  let footerHeight = 0;
  if (sections.footer) {
    if (sections.footer.height !== undefined) {
      footerHeight = sections.footer.height;
    } else {
      const calculatedHeight = calculateSectionHeight(elements, SectionTypeEnum.Footer);
      // 如果没有元素或计算高度为0，使用默认高度20mm
      footerHeight = calculatedHeight > 0 ? calculatedHeight : 20;
    }
  }

  // 考虑分页上下文，判断是否显示页头页尾
  if (pagination) {
    if (!shouldRenderSection(sections.header, pagination)) {
      headerHeight = 0;
    }
    if (!shouldRenderSection(sections.footer, pagination)) {
      footerHeight = 0;
    }
  }

  // 计算内容区域布局(支持多内容区域)
  const contentAreas: ContentAreaLayout[] = [];
  let totalContentHeight = 0;

  if (sections.contentAreas && sections.contentAreas.length > 0) {
    // 多内容区域模式
    sections.contentAreas.forEach((area, index) => {
      const previousAreas = sections.contentAreas!.slice(0, index);
      const actualY = calculateActualY(area, previousAreas, headerHeight);
      const areaHeight = typeof area.height === 'number' ? area.height : 50; // 默认50mm

      contentAreas.push({
        index,
        offset: actualY - headerHeight, // 相对于内容区起始的偏移
        height: areaHeight,
        actualY, // 相对于画布的实际Y坐标
      });

      totalContentHeight = Math.max(totalContentHeight, actualY + areaHeight - headerHeight);
    });
  } else {
    // 单内容区域模式(传统模式)
    let contentHeight: number;
    if (sections.content?.height !== undefined) {
      contentHeight = sections.content.height;
    } else {
      contentHeight = canvas.height - headerHeight - footerHeight;
    }

    contentAreas.push({
      index: 0,
      offset: 0,
      height: contentHeight,
      actualY: headerHeight,
    });

    totalContentHeight = contentHeight;
  }

  // 计算最终布局
  layout = {
    headerOffset: 0,
    headerHeight: headerHeight,
    contentOffset: headerHeight,
    contentHeight: totalContentHeight, // 使用计算后的总高度
    footerOffset: headerHeight + totalContentHeight,
    footerHeight: footerHeight,
    contentAreas,
    totalContentHeight,
  };

  return layout;
}

/**
 * 验证区域配置
 * @param template 模板对象
 * @returns 验证结果
 */
export function validateSectionConfig(template: AtlTemplate): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  const { sections, elements, canvas } = template;

  // 如果没有配置区域，跳过验证
  if (!sections) {
    return { valid: true, errors, warnings };
  }

  // 计算布局
  const layout = calculateSectionLayout(template);

  // 检查内容区域高度
  if (layout.contentHeight <= 0) {
    errors.push('内容区域高度不足，页头和页尾占用了所有空间');
  } else if (layout.contentHeight < 10) {
    warnings.push(`内容区域高度过小（${layout.contentHeight.toFixed(2)}mm），可能影响内容显示`);
  }

  // 检查页头高度
  if (sections.header && layout.headerHeight > canvas.height * 0.5) {
    warnings.push(`页头高度过大（${layout.headerHeight.toFixed(2)}mm），占用了超过50%的画布空间`);
  }

  // 检查页尾高度
  if (sections.footer && layout.footerHeight > canvas.height * 0.5) {
    warnings.push(`页尾高度过大（${layout.footerHeight.toFixed(2)}mm），占用了超过50%的画布空间`);
  }

  // 检查元素位置
  const grouped = groupElementsBySection(template);

  // 检查页头元素位置
  grouped.header.forEach(el => {
    const bottom = el.position.y + el.size.height;
    if (bottom > layout.headerHeight) {
      warnings.push(`元素 "${el.id}" 超出了页头区域范围`);
    }
  });

  // 检查页尾元素位置
  grouped.footer.forEach(el => {
    const top = el.position.y;
    if (top < layout.footerOffset) {
      warnings.push(`元素 "${el.id}" 超出了页尾区域范围`);
    }
  });

  // 检查内容区域元素位置
  grouped.content.forEach(el => {
    const top = el.position.y;
    const bottom = el.position.y + el.size.height;

    if (top < layout.contentOffset) {
      warnings.push(`元素 "${el.id}" 顶部超出了内容区域范围`);
    }
    if (bottom > layout.contentOffset + layout.contentHeight) {
      warnings.push(`元素 "${el.id}" 底部超出了内容区域范围`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * 自动调整元素到指定区域
 * @param element 元素
 * @param targetSection 目标区域
 * @param layout 区域布局信息
 * @returns 调整后的元素
 */
export function adjustElementToSection(
  element: AtlElement,
  targetSection: SectionType,
  layout: SectionLayout
): AtlElement {
  const adjusted = { ...element };

  switch (targetSection) {
    case SectionTypeEnum.Header:
      // 页头元素：相对于画布顶部定位
      // 不需要调整 Y 坐标
      break;

    case SectionTypeEnum.Content:
      // 内容元素：需要考虑页头高度
      if (layout.headerHeight > 0) {
        adjusted.position = {
          ...adjusted.position,
          y: Math.max(layout.contentOffset, adjusted.position.y),
        };
      }
      break;

    case SectionTypeEnum.Footer:
      // 页尾元素：相对于画布底部定位
      adjusted.position = {
        ...adjusted.position,
        y: Math.max(layout.footerOffset, adjusted.position.y),
      };
      break;
  }

  return adjusted;
}

/**
 * 检测元素应该属于哪个内容区域
 * @param dropY 元素放置的Y坐标(毫米)
 * @param layout 区域布局信息
 * @returns 内容区域索引,如果不在任何内容区域则返回-1
 */
export function detectContentAreaIndex(
  dropY: number,
  layout: SectionLayout
): number {
  // 检查是否在页头或页尾
  if (dropY < layout.contentOffset) {
    return -1; // 页头区域
  }
  if (dropY >= layout.footerOffset) {
    return -1; // 页尾区域
  }

  // 检查属于哪个内容区域
  for (let i = 0; i < layout.contentAreas.length; i++) {
    const area = layout.contentAreas[i];
    const areaStart = area.actualY;
    const areaEnd = area.actualY + area.height;

    if (dropY >= areaStart && dropY < areaEnd) {
      return i;
    }
  }

  // 如果不在任何定义的内容区域内,返回最后一个区域的索引(或0)
  return layout.contentAreas.length > 0 ? layout.contentAreas.length - 1 : 0;
}

/**
 * 获取区域的可视化配置
 * @param sectionType 区域类型
 * @returns 可视化配置（颜色、标签等）
 */
export function getSectionVisualConfig(sectionType: SectionType) {
  switch (sectionType) {
    case SectionTypeEnum.Header:
      return {
        color: '#1890ff',
        bgColor: 'rgba(24, 144, 255, 0.05)',
        label: '页头区域',
      };
    case SectionTypeEnum.Content:
      return {
        color: '#52c41a',
        bgColor: 'rgba(82, 196, 26, 0.05)',
        label: '内容区域',
      };
    case SectionTypeEnum.Footer:
      return {
        color: '#faad14',
        bgColor: 'rgba(250, 173, 20, 0.05)',
        label: '页尾区域',
      };
    default:
      console.warn(`[getSectionVisualConfig] 收到未知的 sectionType 值:`, sectionType, typeof sectionType);
      return {
        color: '#d9d9d9',
        bgColor: 'rgba(217, 217, 217, 0.05)',
        label: `未知区域 (${sectionType})`,
      };
  }
}
