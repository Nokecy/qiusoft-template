/**
 * BNR RuleBuilder 数据类型转换工具
 *
 * 前端: RuleGroupDto (数字枚举)
 * 后端: ruleGroupJson (JSON字符串)
 */

import type { RuleGroupDto, RuleDto, MatchLogic, MatchOperator } from '@nokecy/qc-ui';
import type {
  BurnAbpRuleEngineMatchLogic,
  BurnAbpRuleEngineMatchOperator,
} from '@/services/openApi/typings';

// ==================== 类型定义 ====================

interface ApiRuleGroupDto {
  logic?: BurnAbpRuleEngineMatchLogic;
  rules?: ApiRuleDto[];
  groups?: ApiRuleGroupDto[];
}

interface ApiRuleDto {
  fieldName?: string;
  operator?: BurnAbpRuleEngineMatchOperator;
  value?: any;
}

// ==================== 枚举映射表 ====================

const LOGIC_TO_API: Record<MatchLogic, BurnAbpRuleEngineMatchLogic> = {
  0: 'and',
  1: 'or',
};

const LOGIC_FROM_API: Record<BurnAbpRuleEngineMatchLogic, MatchLogic> = {
  and: 0,
  or: 1,
};

const OPERATOR_TO_API: Record<MatchOperator, BurnAbpRuleEngineMatchOperator> = {
  0: 'equals',
  1: 'notEquals',
  2: 'greaterThan',
  3: 'greaterThanOrEqual',
  4: 'lessThan',
  5: 'lessThanOrEqual',
  6: 'in',
  7: 'notIn',
  8: 'between',
  9: 'like',
  10: 'isNull',
  11: 'isNotNull',
};

const OPERATOR_FROM_API: Record<BurnAbpRuleEngineMatchOperator, MatchOperator> = {
  equals: 0,
  notEquals: 1,
  greaterThan: 2,
  greaterThanOrEqual: 3,
  lessThan: 4,
  lessThanOrEqual: 5,
  in: 6,
  notIn: 7,
  between: 8,
  like: 9,
  isNull: 10,
  isNotNull: 11,
};

// ==================== 转换函数 ====================

function convertRuleToApi(rule: RuleDto): ApiRuleDto {
  return {
    fieldName: rule.fieldName,
    operator: OPERATOR_TO_API[rule.operator],
    value: rule.value,
  };
}

function convertRuleFromApi(apiRule: ApiRuleDto): RuleDto {
  return {
    fieldName: apiRule.fieldName || '',
    operator: OPERATOR_FROM_API[apiRule.operator || 'equals'],
    value: apiRule.value,
  };
}

function toApiFormatInternal(ruleGroup: RuleGroupDto | null | undefined): ApiRuleGroupDto | undefined {
  if (!ruleGroup) return undefined;

  return {
    logic: LOGIC_TO_API[ruleGroup.logic],
    rules: ruleGroup.rules?.map(convertRuleToApi),
    groups: ruleGroup.groups?.map((group) => toApiFormatInternal(group)!).filter(Boolean),
  };
}

function fromApiFormatInternal(apiRuleGroup: ApiRuleGroupDto | null | undefined): RuleGroupDto | null {
  if (!apiRuleGroup) return null;

  return {
    logic: LOGIC_FROM_API[apiRuleGroup.logic || 'and'],
    rules: apiRuleGroup.rules?.map(convertRuleFromApi) || [],
    groups: apiRuleGroup.groups?.map((group) => fromApiFormatInternal(group)!).filter(Boolean) || [],
  };
}

// ==================== 导出函数 ====================

/**
 * 将前端 RuleGroup 转换为后端 JSON 字符串
 */
export function toApiFormat(ruleGroup: RuleGroupDto | null | undefined): string | undefined {
  if (!ruleGroup) return undefined;

  const apiFormat = toApiFormatInternal(ruleGroup);
  return apiFormat ? JSON.stringify(apiFormat) : undefined;
}

/**
 * 将后端 JSON 字符串转换为前端 RuleGroup
 */
export function fromApiFormat(jsonString: string | null | undefined): RuleGroupDto | null {
  if (!jsonString) return null;

  try {
    const apiRuleGroup = JSON.parse(jsonString) as ApiRuleGroupDto;
    return fromApiFormatInternal(apiRuleGroup);
  } catch (error) {
    console.error('Failed to parse rule group JSON:', error);
    return null;
  }
}

/**
 * 验证转换后的数据是否有效
 */
export function validateConversion(ruleGroup: RuleGroupDto | null): boolean {
  if (!ruleGroup) return true;

  if (![0, 1].includes(ruleGroup.logic)) return false;

  if (ruleGroup.rules) {
    for (const rule of ruleGroup.rules) {
      if (!Object.keys(OPERATOR_TO_API).includes(String(rule.operator))) {
        return false;
      }
    }
  }

  if (ruleGroup.groups) {
    for (const group of ruleGroup.groups) {
      if (!validateConversion(group)) return false;
    }
  }

  return true;
}
