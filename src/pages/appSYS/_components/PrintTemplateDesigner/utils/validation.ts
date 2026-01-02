/**
 * 元素数据校验和迁移工具
 */

import type { AtlElement, AtlTemplate, TemplateSections, SectionType } from '../types';
import { SectionType as SectionTypeEnum } from '../types';

/**
 * 元素校验结果
 */
export interface ElementValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 校验单个元素的 section 和 sectionId 字段
 */
export function validateElement(
  element: AtlElement,
  sections?: TemplateSections
): ElementValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 检查 section 字段
  if (element.section === undefined || element.section === null) {
    errors.push(`元素 ${element.id} 缺少 section 字段`);
  } else if (![SectionTypeEnum.Header, SectionTypeEnum.Content, SectionTypeEnum.Footer].includes(element.section)) {
    errors.push(`元素 ${element.id} 的 section 值无效: ${element.section}`);
  }

  // 检查 sectionId 字段（仅对属性访问进行检查）
  if (!('sectionId' in element)) {
    warnings.push(`元素 ${element.id} 缺少 sectionId 属性`);
  }

  // 检查内容区域的 sectionId
  if (element.section === SectionTypeEnum.Content) {
    if (!element.sectionId) {
      warnings.push(`内容区域元素 ${element.id} 的 sectionId 为空`);
    } else if (sections?.contentAreas) {
      const areaExists = sections.contentAreas.some((area) => area.id === element.sectionId);
      if (!areaExists) {
        errors.push(
          `元素 ${element.id} 的 sectionId "${element.sectionId}" 对应的区域不存在`
        );
      }
    }
  } else {
    // 页头和页尾区域的 sectionId 应该为 null
    if (element.sectionId !== null && element.sectionId !== undefined) {
      warnings.push(
        `${element.section === SectionTypeEnum.Header ? '页头' : '页尾'}区域元素 ${element.id} 的 sectionId 应该为 null，当前值为 "${element.sectionId}"`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * 校验模板中的所有元素
 */
export function validateTemplateElements(
  template: AtlTemplate
): {
  valid: boolean;
  totalErrors: number;
  totalWarnings: number;
  elementResults: Map<string, ElementValidationResult>;
} {
  const elementResults = new Map<string, ElementValidationResult>();
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const element of template.elements) {
    const result = validateElement(element, template.sections);
    elementResults.set(element.id, result);
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  return {
    valid: totalErrors === 0,
    totalErrors,
    totalWarnings,
    elementResults,
  };
}

/**
 * 修复单个元素的 section 和 sectionId 字段
 */
export function fixElement(
  element: AtlElement,
  sections?: TemplateSections
): AtlElement {
  const updates: Partial<AtlElement> = {};

  // 修复缺失的 section
  if (element.section === undefined || element.section === null) {
    updates.section = SectionTypeEnum.Content; // 默认内容区域
  }

  // 修复缺失的 sectionId 属性
  if (!('sectionId' in element)) {
    updates.sectionId = null;
  }

  // 修复内容区域的 sectionId
  if ((element.section ?? updates.section) === SectionTypeEnum.Content && !element.sectionId) {
    if (sections?.contentAreas && sections.contentAreas.length > 0) {
      updates.sectionId = sections.contentAreas[0].id || null;
    }
  }

  // 修复页头和页尾区域的 sectionId（应该为 null）
  if (
    (element.section === SectionTypeEnum.Header || element.section === SectionTypeEnum.Footer) &&
    element.sectionId !== null &&
    element.sectionId !== undefined
  ) {
    updates.sectionId = null;
  }

  return Object.keys(updates).length > 0 ? { ...element, ...updates } : element;
}

/**
 * 迁移旧模板数据，修复缺失的 section 和 sectionId 字段
 */
export function migrateTemplateData(template: AtlTemplate): {
  migratedTemplate: AtlTemplate;
  fixedCount: number;
  details: string[];
} {
  const details: string[] = [];
  let fixedCount = 0;

  const migratedElements = template.elements.map((element) => {
    const fixedElement = fixElement(element, template.sections);

    if (fixedElement !== element) {
      fixedCount++;
      const changes: string[] = [];

      if (element.section === undefined || element.section === null) {
        changes.push('添加 section 字段');
      }

      if (!('sectionId' in element)) {
        changes.push('添加 sectionId 字段');
      } else if (element.section === SectionTypeEnum.Content && !element.sectionId && fixedElement.sectionId) {
        changes.push(`设置 sectionId 为 ${fixedElement.sectionId}`);
      }

      if (changes.length > 0) {
        details.push(`元素 ${element.id}: ${changes.join(', ')}`);
      }
    }

    return fixedElement;
  });

  return {
    migratedTemplate: {
      ...template,
      elements: migratedElements,
    },
    fixedCount,
    details,
  };
}

/**
 * 批量校验并修复模板
 * 结合校验和迁移功能，提供完整的修复流程
 */
export function validateAndFixTemplate(template: AtlTemplate): {
  validationResult: ReturnType<typeof validateTemplateElements>;
  migrationResult: ReturnType<typeof migrateTemplateData> | null;
  needsMigration: boolean;
} {
  // 先进行校验
  const validationResult = validateTemplateElements(template);

  // 如果有错误或警告，执行迁移
  const needsMigration = validationResult.totalErrors > 0 || validationResult.totalWarnings > 0;
  const migrationResult = needsMigration ? migrateTemplateData(template) : null;

  return {
    validationResult,
    migrationResult,
    needsMigration,
  };
}
