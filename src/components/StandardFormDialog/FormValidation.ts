/**
 * 表单验证工具函数
 */

// 常用验证规则
export const ValidationRules = {
  /**
   * 必填验证
   */
  required: (message?: string) => ({
    required: true,
    message: message || '此字段为必填项'
  }),

  /**
   * 邮箱验证
   */
  email: (message?: string) => ({
    format: 'email',
    message: message || '请输入有效的邮箱地址'
  }),

  /**
   * 手机号验证
   */
  phone: (message?: string) => ({
    pattern: /^1[3-9]\d{9}$/,
    message: message || '请输入有效的手机号码'
  }),

  /**
   * 长度验证
   */
  length: (min: number, max?: number, message?: string) => {
    if (max) {
      return {
        min,
        max,
        message: message || `长度必须在${min}-${max}个字符之间`
      };
    }
    return {
      min,
      message: message || `长度不能少于${min}个字符`
    };
  },

  /**
   * 数字范围验证
   */
  range: (min: number, max?: number, message?: string) => {
    if (max !== undefined) {
      return {
        minimum: min,
        maximum: max,
        message: message || `值必须在${min}-${max}之间`
      };
    }
    return {
      minimum: min,
      message: message || `值不能小于${min}`
    };
  },

  /**
   * 正则表达式验证
   */
  pattern: (pattern: RegExp, message: string) => ({
    pattern,
    message
  }),

  /**
   * 身份证号验证
   */
  idCard: (message?: string) => ({
    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    message: message || '请输入有效的身份证号码'
  }),

  /**
   * URL验证
   */
  url: (message?: string) => ({
    format: 'url',
    message: message || '请输入有效的URL地址'
  }),

  /**
   * 整数验证
   */
  integer: (message?: string) => ({
    pattern: /^-?\d+$/,
    message: message || '请输入整数'
  }),

  /**
   * 正整数验证
   */
  positiveInteger: (message?: string) => ({
    pattern: /^[1-9]\d*$/,
    message: message || '请输入正整数'
  }),

  /**
   * 非负整数验证
   */
  nonNegativeInteger: (message?: string) => ({
    pattern: /^(0|[1-9]\d*)$/,
    message: message || '请输入非负整数'
  }),

  /**
   * 小数验证
   */
  decimal: (precision?: number, message?: string) => {
    const pattern = precision 
      ? new RegExp(`^-?\\d+(\\.\\d{1,${precision}})?$`)
      : /^-?\d+(\.\d+)?$/;
    return {
      pattern,
      message: message || `请输入${precision ? `最多${precision}位小数的` : ''}数字`
    };
  }
};

// 组合验证规则的工具函数
export const combineValidation = (...rules: any[]) => {
  return rules.filter(Boolean);
};

// 条件验证工具
export const conditionalValidation = (
  condition: (form: any) => boolean,
  rules: any[]
) => {
  return (form: any) => {
    return condition(form) ? rules : [];
  };
};

// 常用验证组合
export const CommonValidations = {
  /**
   * 编码字段（必填，长度限制，字母数字）
   */
  code: (maxLength: number = 50) => combineValidation(
    ValidationRules.required('编码不能为空'),
    ValidationRules.length(1, maxLength),
    ValidationRules.pattern(/^[a-zA-Z0-9_-]+$/, '编码只能包含字母、数字、下划线和短横线')
  ),

  /**
   * 名称字段（必填，长度限制）
   */
  name: (maxLength: number = 100) => combineValidation(
    ValidationRules.required('名称不能为空'),
    ValidationRules.length(1, maxLength)
  ),

  /**
   * 手机号字段（必填，格式验证）
   */
  requiredPhone: () => combineValidation(
    ValidationRules.required('手机号不能为空'),
    ValidationRules.phone()
  ),

  /**
   * 邮箱字段（必填，格式验证）
   */
  requiredEmail: () => combineValidation(
    ValidationRules.required('邮箱不能为空'),
    ValidationRules.email()
  ),

  /**
   * 备注字段（可选，长度限制）
   */
  remark: (maxLength: number = 500) => [
    ValidationRules.length(0, maxLength)
  ],

  /**
   * 金额字段（必填，非负数，两位小数）
   */
  amount: () => combineValidation(
    ValidationRules.required('金额不能为空'),
    ValidationRules.decimal(2, '请输入有效的金额（最多2位小数）'),
    ValidationRules.range(0, undefined, '金额不能为负数')
  ),

  /**
   * 数量字段（必填，正整数）
   */
  quantity: () => combineValidation(
    ValidationRules.required('数量不能为空'),
    ValidationRules.positiveInteger('请输入正整数')
  )
};

/**
 * 表单字段增强工具
 * 为FieldCreators添加验证功能
 */
export const enhanceFieldWithValidation = (
  field: any,
  validations: any[]
) => {
  return {
    ...field,
    'x-validator': validations
  };
};

/**
 * 批量添加验证的工具函数
 */
export const addValidationToFields = (
  fields: Record<string, any>,
  validationMap: Record<string, any[]>
) => {
  const result = { ...fields };
  
  Object.keys(validationMap).forEach(fieldName => {
    if (result[fieldName]) {
      result[fieldName] = enhanceFieldWithValidation(
        result[fieldName],
        validationMap[fieldName]
      );
    }
  });
  
  return result;
};