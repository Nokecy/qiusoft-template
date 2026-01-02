/**
 * PropertyBinding 验证工具类
 * 提供验证PropertyBinding对象、表达式和数据路径的功能
 */

import { PropertyBinding, BindingMode } from '../types';

/**
 * 验证结果接口
 */
export interface ValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 错误信息列表 */
  errors: string[];
  /** 警告信息列表 */
  warnings: string[];
}

/**
 * 绑定验证结果接口
 */
export interface BindingValidationResult extends ValidationResult {
  /** 绑定模式 */
  mode: BindingMode;
  /** 是否有值 */
  hasValue: boolean;
}

/**
 * 验证PropertyBinding对象
 *
 * @param binding PropertyBinding对象
 * @param valueType 期望的值类型（可选）
 * @returns 验证结果
 */
export const validatePropertyBinding = (
  binding: PropertyBinding,
  valueType?: 'string' | 'number' | 'boolean'
): BindingValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let hasValue = false;

  // 检查mode是否有效
  if (binding.mode === undefined || binding.mode === null) {
    errors.push('绑定模式(mode)不能为空');
  } else if (![BindingMode.Static, BindingMode.DataPath, BindingMode.Expression].includes(binding.mode)) {
    errors.push(`无效的绑定模式: ${binding.mode}`);
  }

  // 根据mode验证对应字段
  switch (binding.mode) {
    case BindingMode.Static:
      if (binding.staticValue === undefined || binding.staticValue === null) {
        errors.push('静态值模式下，staticValue不能为空');
      } else {
        hasValue = true;

        // 验证值类型匹配
        if (valueType) {
          const actualType = typeof binding.staticValue;
          if (valueType === 'number' && actualType !== 'number') {
            errors.push(`期望数字类型，实际为${actualType}`);
          } else if (valueType === 'boolean' && actualType !== 'boolean') {
            errors.push(`期望布尔类型，实际为${actualType}`);
          } else if (valueType === 'string' && actualType !== 'string') {
            errors.push(`期望字符串类型，实际为${actualType}`);
          }
        }
      }
      break;

    case BindingMode.DataPath:
      if (!binding.dataPath || binding.dataPath.trim() === '') {
        errors.push('数据路径模式下，dataPath不能为空');
      } else {
        hasValue = true;
        const pathValidation = validateDataPath(binding.dataPath);
        errors.push(...pathValidation.errors);
        warnings.push(...pathValidation.warnings);
      }
      break;

    case BindingMode.Expression:
      if (!binding.expression || binding.expression.trim() === '') {
        errors.push('表达式模式下，expression不能为空');
      } else {
        hasValue = true;
        const exprValidation = validateExpression(binding.expression);
        errors.push(...exprValidation.errors);
        warnings.push(...exprValidation.warnings);
      }
      break;
  }

  // 验证格式化字符串（可选）
  if (binding.format) {
    const formatValidation = validateFormat(binding.format);
    warnings.push(...formatValidation.warnings);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    mode: binding.mode,
    hasValue,
  };
};

/**
 * 验证表达式语法
 *
 * @param expression 表达式字符串
 * @returns 验证结果
 */
export const validateExpression = (expression: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!expression || expression.trim() === '') {
    errors.push('表达式不能为空');
    return { isValid: false, errors, warnings };
  }

  // 基础语法检查
  const trimmed = expression.trim();

  // 检查括号匹配
  const parenthesesValidation = validateParentheses(trimmed);
  if (!parenthesesValidation.isValid) {
    errors.push(...parenthesesValidation.errors);
  }

  // 检查引号匹配
  const quotesValidation = validateQuotes(trimmed);
  if (!quotesValidation.isValid) {
    errors.push(...quotesValidation.errors);
  }

  // 检查常见函数调用格式
  const functionPattern = /(\w+)\s*\(/g;
  const matches = Array.from(trimmed.matchAll(functionPattern));
  const knownFunctions = [
    'upper', 'lower', 'trim', 'substring', 'replace', 'concat',
    'if', 'format', 'date', 'now', 'length', 'sum', 'avg', 'max', 'min'
  ];

  matches.forEach(match => {
    const funcName = match[1].toLowerCase();
    if (!knownFunctions.includes(funcName)) {
      warnings.push(`未知函数: ${match[1]}，请确认函数名是否正确`);
    }
  });

  // 检查是否包含数据路径引用
  const hasDataPath = /[a-zA-Z_][\w.]*[\w]/.test(trimmed);
  if (!hasDataPath && matches.length === 0) {
    warnings.push('表达式中未检测到数据引用或函数调用');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * 验证数据路径
 *
 * @param path 数据路径字符串
 * @param dataSources 数据源对象（可选，用于验证路径是否存在）
 * @returns 验证结果
 */
export const validateDataPath = (
  path: string,
  dataSources?: Record<string, any>
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!path || path.trim() === '') {
    errors.push('数据路径不能为空');
    return { isValid: false, errors, warnings };
  }

  const trimmed = path.trim();

  // 检查路径格式（支持点号分隔和数组索引）
  const pathPattern = /^[a-zA-Z_][\w]*(\.[a-zA-Z_][\w]*|\[\d+\])*$/;
  if (!pathPattern.test(trimmed)) {
    errors.push('数据路径格式无效，应为: variable.property 或 array[0].property');
  }

  // 检查是否以数字开头
  if (/^\d/.test(trimmed)) {
    errors.push('数据路径不能以数字开头');
  }

  // 检查是否包含连续的点号
  if (/\.\./.test(trimmed)) {
    errors.push('数据路径不能包含连续的点号');
  }

  // 如果提供了数据源，验证路径是否存在
  if (dataSources && errors.length === 0) {
    const pathExists = checkPathExists(trimmed, dataSources);
    if (!pathExists) {
      warnings.push(`数据路径 "${trimmed}" 在当前数据源中不存在`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * 验证格式化字符串
 *
 * @param format 格式化字符串
 * @returns 验证结果
 */
export const validateFormat = (format: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!format || format.trim() === '') {
    return { isValid: true, errors, warnings };
  }

  // 检查常见日期格式
  const datePatterns = ['yyyy', 'MM', 'dd', 'HH', 'mm', 'ss'];
  const hasDatePattern = datePatterns.some(pattern => format.includes(pattern));
  if (hasDatePattern) {
    // 验证日期格式的合法性
    if (format.includes('yyyy') && !format.includes('MM')) {
      warnings.push('日期格式包含年份但缺少月份');
    }
  }

  // 检查数字格式占位符
  const numberPlaceholder = /\{0:[^}]+\}/;
  if (numberPlaceholder.test(format)) {
    // 这是C#风格的格式化字符串
    const formatSpec = format.match(/\{0:([^}]+)\}/)?.[1];
    if (formatSpec) {
      // 验证格式说明符
      if (!/^[CFDEFGNPRXcfdegjnprsx]\d*$/.test(formatSpec)) {
        warnings.push('数字格式说明符可能不正确');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * 验证括号匹配
 *
 * @param text 文本内容
 * @returns 验证结果
 */
const validateParentheses = (text: string): ValidationResult => {
  const errors: string[] = [];
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (Object.keys(pairs).includes(char)) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      const last = stack.pop();
      if (!last || pairs[last] !== char) {
        errors.push(`括号不匹配: 位置 ${i + 1}`);
        break;
      }
    }
  }

  if (stack.length > 0) {
    errors.push(`存在未闭合的括号: ${stack.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  };
};

/**
 * 验证引号匹配
 *
 * @param text 文本内容
 * @returns 验证结果
 */
const validateQuotes = (text: string): ValidationResult => {
  const errors: string[] = [];

  // 检查单引号匹配
  const singleQuoteCount = (text.match(/'/g) || []).length;
  if (singleQuoteCount % 2 !== 0) {
    errors.push('单引号未配对');
  }

  // 检查双引号匹配
  const doubleQuoteCount = (text.match(/"/g) || []).length;
  if (doubleQuoteCount % 2 !== 0) {
    errors.push('双引号未配对');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  };
};

/**
 * 检查数据路径是否存在于数据源中
 *
 * @param path 数据路径
 * @param data 数据对象
 * @returns 是否存在
 */
const checkPathExists = (path: string, data: any): boolean => {
  const parts = path.split('.');
  let current = data;

  for (const part of parts) {
    // 处理数组索引
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, key, index] = arrayMatch;
      if (current[key] === undefined || !Array.isArray(current[key])) {
        return false;
      }
      current = current[key][parseInt(index, 10)];
      if (current === undefined) {
        return false;
      }
    } else {
      if (current[part] === undefined) {
        return false;
      }
      current = current[part];
    }
  }

  return true;
};

/**
 * 批量验证多个PropertyBinding
 *
 * @param bindings PropertyBinding对象数组
 * @returns 验证结果数组
 */
export const validateBindings = (
  bindings: Array<{ id: string; property: string; binding: PropertyBinding }>
): Array<{ id: string; property: string; result: BindingValidationResult }> => {
  return bindings.map(({ id, property, binding }) => ({
    id,
    property,
    result: validatePropertyBinding(binding),
  }));
};
