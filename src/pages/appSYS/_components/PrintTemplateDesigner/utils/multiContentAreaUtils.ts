/**
 * multiContentAreaUtils.ts
 * 多内容区域管理工具函数
 * 包含数据迁移、布局计算、冲突检测等功能
 */

import type {
  AtlTemplate,
  TemplateSections,
  SectionConfig,
  YPositionMode,
  ContentAreaPaginationMode,
} from '../types';
import {
  YPositionMode as YPositionModeEnum,
  ContentAreaPaginationMode as PaginationModeEnum,
  SectionPrintFrequency,
} from '../types';

/**
 * 布局冲突接口
 */
export interface LayoutConflict {
  areaIndex: number;
  type: 'overlap' | 'overflow';
  message: string;
}

/**
 * 区域位置信息接口
 */
export interface AreaPosition {
  y: number;
  height: number;
  index: number;
  area: SectionConfig;
}

/**
 * 计算内容区域的实际Y坐标
 * @param contentArea 目标区域
 * @param previousAreas 前序区域数组
 * @param headerHeight 页头高度
 * @returns 实际Y坐标（毫米）
 */
export function calculateActualY(
  contentArea: SectionConfig,
  previousAreas: SectionConfig[],
  headerHeight: number = 0
): number {
  // Fixed模式：固定Y坐标 + 页头高度
  if (contentArea.yPositionMode === YPositionModeEnum.Fixed) {
    return (contentArea.fixedY || 0) + headerHeight;
  }

  // AfterPrevious模式：累加前序区域高度和间距
  let totalY = headerHeight;
  for (const area of previousAreas) {
    // 确保只累加数字类型的高度
    const areaHeight = typeof area.height === 'number' ? area.height : 0;
    totalY += areaHeight;
  }
  totalY += contentArea.spacingAfterPrevious || 0;

  return totalY;
}

/**
 * 检测区域布局冲突
 * @param sections 区域配置
 * @param pageHeight 页面高度（毫米）
 * @returns 冲突列表
 */
export function detectLayoutConflicts(
  sections: TemplateSections,
  pageHeight: number
): LayoutConflict[] {
  const conflicts: LayoutConflict[] = [];
  const contentAreas = sections.contentAreas || [];
  const headerHeight = sections.header?.height || 0;
  const footerHeight = sections.footer?.height || 0;

  // 计算每个区域的实际位置
  const areaPositions: AreaPosition[] = contentAreas.map((area, index) => {
    const previousAreas = contentAreas.slice(0, index);
    const y = calculateActualY(area, previousAreas, headerHeight);
    return { y, height: area.height || 0, index, area };
  });

  // 检测重叠
  for (let i = 0; i < areaPositions.length; i++) {
    for (let j = i + 1; j < areaPositions.length; j++) {
      const area1 = areaPositions[i];
      const area2 = areaPositions[j];

      const overlap = !(
        area1.y + area1.height <= area2.y || area2.y + area2.height <= area1.y
      );
      if (overlap) {
        conflicts.push({
          areaIndex: area2.index,
          type: 'overlap',
          message: `内容区域${area2.index + 1}与内容区域${area1.index + 1}重叠`,
        });
      }
    }
  }

  // 检测溢出
  areaPositions.forEach(({ y, height, index }) => {
    const totalHeight = y + height + footerHeight;
    if (totalHeight > pageHeight) {
      conflicts.push({
        areaIndex: index,
        type: 'overflow',
        message: `内容区域${index + 1}超出页面范围（总高度${totalHeight.toFixed(
          1
        )}mm > ${pageHeight}mm）`,
      });
    }
  });

  return conflicts;
}

/**
 * 计算建议的Y坐标
 * @param index 区域索引
 * @param contentAreas 内容区域数组
 * @param headerHeight 页头高度
 * @returns 建议的Y坐标（毫米）
 */
export function suggestYCoordinate(
  index: number,
  contentAreas: SectionConfig[],
  headerHeight: number
): number {
  if (index === 0) {
    return headerHeight;
  }

  const previousAreas = contentAreas.slice(0, index);
  let totalY = headerHeight;
  for (const area of previousAreas) {
    const areaHeight = typeof area.height === 'number' ? area.height : 0;
    totalY += areaHeight;
  }
  totalY += 0; // 默认间距

  return totalY;
}

/**
 * 验证区域配置完整性
 * @param area 区域配置
 * @returns 验证结果
 */
export function validateSectionConfig(area: SectionConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!area.name || area.name.trim() === '') {
    errors.push('区域名称不能为空');
  }

  if (!area.height || area.height <= 0) {
    errors.push('区域高度必须大于0');
  }

  if (
    area.yPositionMode === YPositionModeEnum.Fixed &&
    (area.fixedY === undefined || area.fixedY < 0)
  ) {
    errors.push('固定定位模式下必须指定有效的Y坐标');
  }

  if (
    area.yPositionMode === YPositionModeEnum.AfterPrevious &&
    (area.spacingAfterPrevious === undefined || area.spacingAfterPrevious < 0)
  ) {
    errors.push('自动跟随模式下必须指定有效的间距');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 创建默认的内容区域配置
 * @param index 区域索引
 * @param headerHeight 页头高度
 * @param previousAreas 前序区域数组
 * @returns 默认的区域配置
 */
export function createDefaultContentArea(
  index: number,
  headerHeight: number,
  previousAreas: SectionConfig[] = []
): SectionConfig {
  // 生成唯一ID：使用时间戳和随机数确保唯一性
  const uniqueId = `area_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // 所有内容区域统一使用 AfterPrevious 模式,自动跟随前面的区域
  return {
    id: uniqueId,
    name: `内容区域${index + 1}`,
    height: 50,
    printFrequency: SectionPrintFrequency.EveryPage,
    followLoopPagination: false,
    yPositionMode: YPositionModeEnum.AfterPrevious,
    spacingAfterPrevious: 0, // 默认无间距,紧跟前面的区域
    elementIds: [],
  };
}

/**
 * 计算所有区域的实际位置
 * @param sections 区域配置
 * @returns 区域位置数组
 */
export function calculateAreaPositions(sections: TemplateSections): AreaPosition[] {
  const contentAreas = sections.contentAreas || [];
  const headerHeight = sections.header?.height || 0;

  return contentAreas.map((area, index) => {
    const previousAreas = contentAreas.slice(0, index);
    const y = calculateActualY(area, previousAreas, headerHeight);
    const height = typeof area.height === 'number' ? area.height : 0;
    return { y, height, index, area };
  });
}

/**
 * 获取内容区域总高度
 * @param contentAreas 内容区域数组
 * @param headerHeight 页头高度
 * @returns 总高度（毫米）
 */
export function getTotalContentHeight(
  contentAreas: SectionConfig[],
  headerHeight: number
): number {
  if (contentAreas.length === 0) {
    return 0;
  }

  const lastArea = contentAreas[contentAreas.length - 1];
  const lastY = calculateActualY(
    lastArea,
    contentAreas.slice(0, -1),
    headerHeight
  );

  const lastHeight = typeof lastArea.height === 'number' ? lastArea.height : 0;
  return lastY + lastHeight - headerHeight;
}
