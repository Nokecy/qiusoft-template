/**
 * 参数验证器测试用例
 *
 * 使用说明: 这是测试用例的参考实现,实际测试需要配置Jest环境
 */

import { ParameterType } from '../../../types/parameter';
import type { TemplateParameter } from '../../../types/parameter';
import {
  validateParameter,
  validateParameterValue,
  validateConstraints,
  validateAllParameters,
} from '../parameterValidators';

describe('参数验证器测试', () => {
  // ========== validateParameter 测试 ==========

  describe('validateParameter - 参数定义验证', () => {
    test('应该验证通过: 有效的必填参数定义', () => {
      const param: TemplateParameter = {
        name: 'userId',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
        description: '用户ID',
        constraints: {
          min: 0,
          max: 999999,
        },
      };

      const result = validateParameter(param);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('应该验证失败: 参数名称为空', () => {
      const param: any = {
        name: '',
        type: ParameterType.String,
        required: false,
      };

      const result = validateParameter(param);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].code).toBe('INVALID_PARAMETER_NAME');
    });

    test('应该验证失败: 参数名称格式无效', () => {
      const param: TemplateParameter = {
        name: '123invalid', // 不能以数字开头
        type: ParameterType.String,
        required: false,
      };

      const result = validateParameter(param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_PARAMETER_NAME')).toBe(true);
    });

    test('应该验证失败: 必填参数缺少默认值', () => {
      const param: any = {
        name: 'count',
        type: ParameterType.Int,
        required: true,
        // defaultValue 缺失
      };

      const result = validateParameter(param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'REQUIRED_PARAMETER_MISSING')).toBe(true);
    });

    test('应该验证失败: 默认值类型不匹配', () => {
      const param: TemplateParameter = {
        name: 'age',
        type: ParameterType.Int,
        required: true,
        defaultValue: 'not a number' as any,
      };

      const result = validateParameter(param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'TYPE_MISMATCH')).toBe(true);
    });

    test('应该验证失败: 约束条件逻辑错误(min > max)', () => {
      const param: TemplateParameter = {
        name: 'score',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
        constraints: {
          min: 100,
          max: 0, // min > max
        },
      };

      const result = validateParameter(param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'CUSTOM_VALIDATION_FAILED')).toBe(true);
    });

    test('应该验证警告: 枚举标签数量不匹配', () => {
      const param: TemplateParameter = {
        name: 'status',
        type: ParameterType.String,
        required: true,
        defaultValue: 'active',
        constraints: {
          enum: ['active', 'inactive', 'pending'],
          enumLabels: ['激活', '禁用'], // 少一个标签
        },
      };

      const result = validateParameter(param);

      expect(result.warnings).toBeDefined();
      expect(result.warnings!.length).toBeGreaterThan(0);
    });
  });

  // ========== validateParameterValue 测试 ==========

  describe('validateParameterValue - 参数值验证', () => {
    test('应该验证通过: 有效的整数值', () => {
      const param: TemplateParameter = {
        name: 'count',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
        constraints: { min: 0, max: 100 },
      };

      const result = validateParameterValue(50, param);

      expect(result.valid).toBe(true);
      expect(result.constraintsValid).toBe(true);
    });

    test('应该验证失败: 必填参数值为null', () => {
      const param: TemplateParameter = {
        name: 'userId',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
      };

      const result = validateParameterValue(null, param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'REQUIRED_PARAMETER_MISSING')).toBe(true);
    });

    test('应该验证通过: 可选参数值为null', () => {
      const param: TemplateParameter = {
        name: 'description',
        type: ParameterType.String,
        required: false,
      };

      const result = validateParameterValue(null, param);

      expect(result.valid).toBe(true);
    });

    test('应该验证失败: 值类型不匹配', () => {
      const param: TemplateParameter = {
        name: 'age',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
      };

      const result = validateParameterValue('not a number', param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'TYPE_MISMATCH')).toBe(true);
    });

    test('应该验证失败: 值超出范围(小于最小值)', () => {
      const param: TemplateParameter = {
        name: 'score',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
        constraints: { min: 0, max: 100 },
      };

      const result = validateParameterValue(-10, param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'VALUE_OUT_OF_RANGE')).toBe(true);
    });

    test('应该验证失败: 值超出范围(大于最大值)', () => {
      const param: TemplateParameter = {
        name: 'score',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
        constraints: { min: 0, max: 100 },
      };

      const result = validateParameterValue(150, param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'VALUE_OUT_OF_RANGE')).toBe(true);
    });

    test('应该验证失败: 值不在枚举列表中', () => {
      const param: TemplateParameter = {
        name: 'status',
        type: ParameterType.String,
        required: true,
        defaultValue: 'active',
        constraints: {
          enum: ['active', 'inactive', 'pending'],
        },
      };

      const result = validateParameterValue('unknown', param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'VALUE_NOT_IN_ENUM')).toBe(true);
    });

    test('应该验证失败: 字符串长度超出限制', () => {
      const param: TemplateParameter = {
        name: 'name',
        type: ParameterType.String,
        required: true,
        defaultValue: '',
        constraints: { minLength: 2, maxLength: 10 },
      };

      const result = validateParameterValue('a'.repeat(20), param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'STRING_LENGTH_EXCEEDED')).toBe(true);
    });

    test('应该验证失败: 字符串不匹配正则表达式', () => {
      const param: TemplateParameter = {
        name: 'email',
        type: ParameterType.String,
        required: true,
        defaultValue: '',
        constraints: {
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
      };

      const result = validateParameterValue('invalid-email', param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'PATTERN_MISMATCH')).toBe(true);
    });

    test('应该验证失败: 数组项数超出限制', () => {
      const param: TemplateParameter = {
        name: 'tags',
        type: ParameterType.Array,
        required: true,
        defaultValue: [],
        constraints: { minItems: 1, maxItems: 5 },
      };

      const result = validateParameterValue([1, 2, 3, 4, 5, 6, 7], param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'ARRAY_SIZE_EXCEEDED')).toBe(true);
    });

    test('应该验证失败: 日期格式无效', () => {
      const param: TemplateParameter = {
        name: 'birthDate',
        type: ParameterType.DateTime,
        required: true,
        defaultValue: new Date().toISOString(),
      };

      const result = validateParameterValue('invalid-date', param);

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'TYPE_MISMATCH')).toBe(true);
    });
  });

  // ========== validateConstraints 测试 ==========

  describe('validateConstraints - 约束条件验证', () => {
    test('应该验证通过: 数值在有效范围内', () => {
      const result = validateConstraints(
        50,
        { min: 0, max: 100 },
        ParameterType.Int
      );

      expect(result.valid).toBe(true);
    });

    test('应该验证失败: 只允许正数但值为负数', () => {
      const result = validateConstraints(
        -10,
        { positiveOnly: true },
        ParameterType.Int
      );

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'VALUE_OUT_OF_RANGE')).toBe(true);
    });

    test('应该验证失败: 不允许为0但值为0', () => {
      const result = validateConstraints(
        0,
        { allowZero: false },
        ParameterType.Int
      );

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'CUSTOM_VALIDATION_FAILED')).toBe(true);
    });

    test('应该验证失败: 不允许空字符串', () => {
      const result = validateConstraints(
        '',
        { allowEmpty: false },
        ParameterType.String
      );

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'CUSTOM_VALIDATION_FAILED')).toBe(true);
    });

    test('应该验证失败: 不允许空数组', () => {
      const result = validateConstraints(
        [],
        { allowEmptyArray: false },
        ParameterType.Array
      );

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'CUSTOM_VALIDATION_FAILED')).toBe(true);
    });
  });

  // ========== validateAllParameters 测试 ==========

  describe('validateAllParameters - 批量参数验证', () => {
    test('应该验证通过: 所有参数定义有效', () => {
      const result = validateAllParameters({
        userId: {
          name: 'userId',
          type: ParameterType.Int,
          required: true,
          defaultValue: 0,
        },
        userName: {
          name: 'userName',
          type: ParameterType.String,
          required: false,
        },
        isActive: {
          name: 'isActive',
          type: ParameterType.Bool,
          required: true,
          defaultValue: true,
        },
      });

      expect(result.valid).toBe(true);
      expect(result.parameterCount).toBe(3);
      expect(result.totalErrors).toBe(0);
    });

    test('应该验证失败: 部分参数定义无效', () => {
      const result = validateAllParameters({
        validParam: {
          name: 'validParam',
          type: ParameterType.Int,
          required: true,
          defaultValue: 0,
        },
        invalidParam: {
          name: '123invalid', // 无效名称
          type: ParameterType.String,
          required: false,
        },
      });

      expect(result.valid).toBe(false);
      expect(result.totalErrors).toBeGreaterThan(0);
      expect(result.results.invalidParam.valid).toBe(false);
    });
  });
});

// ========== 性能测试 ==========

describe('性能测试', () => {
  test('大量参数验证性能', () => {
    const parameters: Record<string, TemplateParameter> = {};

    // 生成1000个参数
    for (let i = 0; i < 1000; i++) {
      parameters[`param${i}`] = {
        name: `param${i}`,
        type: ParameterType.Int,
        required: i % 2 === 0,
        defaultValue: i % 2 === 0 ? i : undefined,
        constraints: { min: 0, max: 10000 },
      };
    }

    const startTime = Date.now();
    const result = validateAllParameters(parameters);
    const endTime = Date.now();

    expect(result.parameterCount).toBe(1000);
    expect(endTime - startTime).toBeLessThan(1000); // 应该在1秒内完成

    console.log(`验证1000个参数耗时: ${endTime - startTime}ms`);
  });
});
