/**
 * RuleBuilder 数据类型转换工具
 *
 * 前端: 使用数字枚举 (TypeScript 最佳实践)
 *   MatchLogic.And = 0, MatchLogic.Or = 1
 *   MatchOperator.Equals = 0, MatchOperator.NotEquals = 1, ...
 *
 * 后端: 使用字符串字面量 (JSON-friendly 格式)
 *   logic: "and" | "or"
 *   operator: "equals" | "notEquals" | "greaterThan" | ...
 */

import type {
  RuleGroupDto,
  RuleDto,
  MatchLogic,
  MatchOperator,
} from '@nokecy/qc-ui';
import type {
  BurnAbpLabelManagementRuleEngineRuleGroupDto,
  BurnAbpLabelManagementRuleEngineRuleDto,
  BurnAbpRuleEngineMatchLogic,
  BurnAbpRuleEngineMatchOperator,
} from '@/services/openApi/typings';

// ==================== 枚举映射表 ====================

/**
 * 前端数字枚举 → 后端字符串字面量
 */
const LOGIC_TO_API: Record<MatchLogic, BurnAbpRuleEngineMatchLogic> = {
  0: 'and', // MatchLogic.And
  1: 'or',  // MatchLogic.Or
};

/**
 * 后端字符串字面量 → 前端数字枚举
 */
const LOGIC_FROM_API: Record<BurnAbpRuleEngineMatchLogic, MatchLogic> = {
  and: 0,  // MatchLogic.And
  or: 1,   // MatchLogic.Or
};

/**
 * 前端数字枚举 → 后端字符串字面量
 */
const OPERATOR_TO_API: Record<MatchOperator, BurnAbpRuleEngineMatchOperator> = {
  0: 'equals',                // MatchOperator.Equals
  1: 'notEquals',             // MatchOperator.NotEquals
  2: 'greaterThan',           // MatchOperator.GreaterThan
  3: 'greaterThanOrEqual',    // MatchOperator.GreaterThanOrEqual
  4: 'lessThan',              // MatchOperator.LessThan
  5: 'lessThanOrEqual',       // MatchOperator.LessThanOrEqual
  6: 'in',                    // MatchOperator.In
  7: 'notIn',                 // MatchOperator.NotIn
  8: 'between',               // MatchOperator.Between
  9: 'like',                  // MatchOperator.Like
  10: 'isNull',               // MatchOperator.IsNull
  11: 'isNotNull',            // MatchOperator.IsNotNull
};

/**
 * 后端字符串字面量 → 前端数字枚举
 */
const OPERATOR_FROM_API: Record<BurnAbpRuleEngineMatchOperator, MatchOperator> = {
  equals: 0,                  // MatchOperator.Equals
  notEquals: 1,               // MatchOperator.NotEquals
  greaterThan: 2,             // MatchOperator.GreaterThan
  greaterThanOrEqual: 3,      // MatchOperator.GreaterThanOrEqual
  lessThan: 4,                // MatchOperator.LessThan
  lessThanOrEqual: 5,         // MatchOperator.LessThanOrEqual
  in: 6,                      // MatchOperator.In
  notIn: 7,                   // MatchOperator.NotIn
  between: 8,                 // MatchOperator.Between
  like: 9,                    // MatchOperator.Like
  isNull: 10,                 // MatchOperator.IsNull
  isNotNull: 11,              // MatchOperator.IsNotNull
};

// ==================== 转换函数 ====================

/**
 * 将前端 Rule 转换为后端 API 格式
 */
function convertRuleToApi(
  rule: RuleDto,
): BurnAbpLabelManagementRuleEngineRuleDto {
  return {
    fieldName: rule.fieldName,
    operator: OPERATOR_TO_API[rule.operator],
    value: rule.value,
  };
}

/**
 * 将后端 API 格式 Rule 转换为前端格式
 */
function convertRuleFromApi(
  apiRule: BurnAbpLabelManagementRuleEngineRuleDto,
): RuleDto {
  return {
    fieldName: apiRule.fieldName || '',
    operator: OPERATOR_FROM_API[apiRule.operator || 'equals'],
    value: apiRule.value,
  };
}

/**
 * 将前端 RuleGroup 转换为后端 API 格式 (递归)
 */
export function toApiFormat(
  ruleGroup: RuleGroupDto | null | undefined,
): BurnAbpLabelManagementRuleEngineRuleGroupDto | undefined {
  if (!ruleGroup) return undefined;

  return {
    logic: LOGIC_TO_API[ruleGroup.logic],
    rules: ruleGroup.rules?.map(convertRuleToApi),
    groups: ruleGroup.groups?.map((group) => toApiFormat(group)!).filter(Boolean),
  };
}

/**
 * 将后端 API 格式 RuleGroup 转换为前端格式 (递归)
 */
export function fromApiFormat(
  apiRuleGroup: BurnAbpLabelManagementRuleEngineRuleGroupDto | null | undefined,
): RuleGroupDto | null {
  if (!apiRuleGroup) return null;

  return {
    logic: LOGIC_FROM_API[apiRuleGroup.logic || 'and'],
    rules: apiRuleGroup.rules?.map(convertRuleFromApi) || [],
    groups: apiRuleGroup.groups?.map((group) => fromApiFormat(group)!).filter(Boolean) || [],
  };
}

/**
 * 验证转换后的数据是否有效
 */
export function validateConversion(ruleGroup: RuleGroupDto | null): boolean {
  if (!ruleGroup) return true;

  // 检查逻辑运算符是否有效
  if (![0, 1].includes(ruleGroup.logic)) return false;

  // 检查规则操作符是否有效
  if (ruleGroup.rules) {
    for (const rule of ruleGroup.rules) {
      if (!Object.keys(OPERATOR_TO_API).includes(String(rule.operator))) {
        return false;
      }
    }
  }

  // 递归检查子组
  if (ruleGroup.groups) {
    for (const group of ruleGroup.groups) {
      if (!validateConversion(group)) return false;
    }
  }

  return true;
}
