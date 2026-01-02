/**
 * PrintTemplateDesigner表达式函数定义
 * 包含数学、字符串、日期、条件等常用函数
 */

/**
 * 函数参数定义
 */
export interface FunctionParameter {
  /** 参数名称 */
  name: string;
  /** 参数类型 */
  type: string;
  /** 是否必填 */
  required: boolean;
  /** 参数描述 */
  description: string;
}

/**
 * 函数定义
 */
export interface FunctionDefinition {
  /** 函数名称 */
  name: string;
  /** 函数分类 */
  category: string;
  /** 函数签名（用于显示） */
  signature: string;
  /** 函数描述 */
  description: string;
  /** 参数列表 */
  parameters: FunctionParameter[];
  /** 返回值类型 */
  returnType: string;
  /** 使用示例 */
  examples: string[];
}

/**
 * 函数分类定义
 */
export const FUNCTION_CATEGORIES = {
  MATH: '数学函数',
  STRING: '字符串函数',
  DATE: '日期函数',
  CONDITION: '条件函数',
} as const;

/**
 * 所有可用函数定义
 */
export const FUNCTIONS: FunctionDefinition[] = [
  // ==================== 数学函数 ====================
  {
    name: 'round',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'round(value, decimals?)',
    description: '四舍五入到指定小数位数',
    parameters: [
      { name: 'value', type: 'number', required: true, description: '要四舍五入的数字' },
      { name: 'decimals', type: 'number', required: false, description: '小数位数（默认0）' },
    ],
    returnType: 'number',
    examples: [
      'round(3.14159, 2) → 3.14',
      'round(10.5) → 11',
    ],
  },
  {
    name: 'ceil',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'ceil(value)',
    description: '向上取整',
    parameters: [
      { name: 'value', type: 'number', required: true, description: '要向上取整的数字' },
    ],
    returnType: 'number',
    examples: [
      'ceil(3.1) → 4',
      'ceil(-3.9) → -3',
    ],
  },
  {
    name: 'floor',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'floor(value)',
    description: '向下取整',
    parameters: [
      { name: 'value', type: 'number', required: true, description: '要向下取整的数字' },
    ],
    returnType: 'number',
    examples: [
      'floor(3.9) → 3',
      'floor(-3.1) → -4',
    ],
  },
  {
    name: 'abs',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'abs(value)',
    description: '取绝对值',
    parameters: [
      { name: 'value', type: 'number', required: true, description: '要取绝对值的数字' },
    ],
    returnType: 'number',
    examples: [
      'abs(-5) → 5',
      'abs(3.5) → 3.5',
    ],
  },
  {
    name: 'max',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'max(value1, value2, ...)',
    description: '返回最大值',
    parameters: [
      { name: 'value1', type: 'number', required: true, description: '第一个数字' },
      { name: 'value2', type: 'number', required: true, description: '第二个数字' },
    ],
    returnType: 'number',
    examples: [
      'max(10, 20, 5) → 20',
      'max(price, minPrice) → 较大值',
    ],
  },
  {
    name: 'min',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'min(value1, value2, ...)',
    description: '返回最小值',
    parameters: [
      { name: 'value1', type: 'number', required: true, description: '第一个数字' },
      { name: 'value2', type: 'number', required: true, description: '第二个数字' },
    ],
    returnType: 'number',
    examples: [
      'min(10, 20, 5) → 5',
      'min(price, maxPrice) → 较小值',
    ],
  },
  {
    name: 'pow',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'pow(base, exponent)',
    description: '幂运算',
    parameters: [
      { name: 'base', type: 'number', required: true, description: '底数' },
      { name: 'exponent', type: 'number', required: true, description: '指数' },
    ],
    returnType: 'number',
    examples: [
      'pow(2, 3) → 8',
      'pow(10, 2) → 100',
    ],
  },
  {
    name: 'sqrt',
    category: FUNCTION_CATEGORIES.MATH,
    signature: 'sqrt(value)',
    description: '平方根',
    parameters: [
      { name: 'value', type: 'number', required: true, description: '要开方的数字' },
    ],
    returnType: 'number',
    examples: [
      'sqrt(16) → 4',
      'sqrt(2) → 1.414...',
    ],
  },

  // ==================== 字符串函数 ====================
  {
    name: 'upper',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'upper(text)',
    description: '转换为大写',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '要转换的文本' },
    ],
    returnType: 'string',
    examples: [
      'upper("hello") → "HELLO"',
      'upper(customer.name) → 客户名大写',
    ],
  },
  {
    name: 'lower',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'lower(text)',
    description: '转换为小写',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '要转换的文本' },
    ],
    returnType: 'string',
    examples: [
      'lower("HELLO") → "hello"',
      'lower(product.code) → 产品代码小写',
    ],
  },
  {
    name: 'substring',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'substring(text, start, length?)',
    description: '提取子字符串',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '原始文本' },
      { name: 'start', type: 'number', required: true, description: '起始位置（从0开始）' },
      { name: 'length', type: 'number', required: false, description: '长度（可选）' },
    ],
    returnType: 'string',
    examples: [
      'substring("Hello", 0, 2) → "He"',
      'substring(order.code, 0, 6) → 订单号前6位',
    ],
  },
  {
    name: 'replace',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'replace(text, search, replacement)',
    description: '替换文本',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '原始文本' },
      { name: 'search', type: 'string', required: true, description: '要查找的文本' },
      { name: 'replacement', type: 'string', required: true, description: '替换文本' },
    ],
    returnType: 'string',
    examples: [
      'replace("Hello World", "World", "Claude") → "Hello Claude"',
      'replace(address, "省", "Province") → 地址翻译',
    ],
  },
  {
    name: 'trim',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'trim(text)',
    description: '去除首尾空格',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '要处理的文本' },
    ],
    returnType: 'string',
    examples: [
      'trim("  hello  ") → "hello"',
      'trim(customer.name) → 去除客户名空格',
    ],
  },
  {
    name: 'length',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'length(text)',
    description: '获取字符串长度',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '要计算长度的文本' },
    ],
    returnType: 'number',
    examples: [
      'length("hello") → 5',
      'length(product.name) → 产品名称长度',
    ],
  },
  {
    name: 'starts_with',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'starts_with(text, prefix)',
    description: '判断是否以指定前缀开头',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '要检查的文本' },
      { name: 'prefix', type: 'string', required: true, description: '前缀文本' },
    ],
    returnType: 'boolean',
    examples: [
      'starts_with("Hello", "He") → true',
      'starts_with(order.code, "ORD") → 判断订单号前缀',
    ],
  },
  {
    name: 'ends_with',
    category: FUNCTION_CATEGORIES.STRING,
    signature: 'ends_with(text, suffix)',
    description: '判断是否以指定后缀结尾',
    parameters: [
      { name: 'text', type: 'string', required: true, description: '要检查的文本' },
      { name: 'suffix', type: 'string', required: true, description: '后缀文本' },
    ],
    returnType: 'boolean',
    examples: [
      'ends_with("Hello", "lo") → true',
      'ends_with(file.name, ".pdf") → 判断文件扩展名',
    ],
  },

  // ==================== 日期函数 ====================
  {
    name: 'now',
    category: FUNCTION_CATEGORIES.DATE,
    signature: 'now()',
    description: '获取当前日期时间',
    parameters: [],
    returnType: 'DateTime',
    examples: [
      'now() → 2024-01-15 14:30:00',
      'date_format(now(), "yyyy-MM-dd") → 当前日期',
    ],
  },
  {
    name: 'today',
    category: FUNCTION_CATEGORIES.DATE,
    signature: 'today()',
    description: '获取今天日期（不含时间）',
    parameters: [],
    returnType: 'Date',
    examples: [
      'today() → 2024-01-15',
      'date_format(today(), "yyyy/MM/dd") → 今天日期',
    ],
  },
  {
    name: 'date_format',
    category: FUNCTION_CATEGORIES.DATE,
    signature: 'date_format(date, format)',
    description: '格式化日期',
    parameters: [
      { name: 'date', type: 'DateTime', required: true, description: '要格式化的日期' },
      { name: 'format', type: 'string', required: true, description: '格式化字符串' },
    ],
    returnType: 'string',
    examples: [
      'date_format(order.date, "yyyy-MM-dd") → "2024-01-15"',
      'date_format(now(), "yyyy年MM月dd日") → "2024年01月15日"',
    ],
  },
  {
    name: 'date_add_days',
    category: FUNCTION_CATEGORIES.DATE,
    signature: 'date_add_days(date, days)',
    description: '日期加减天数',
    parameters: [
      { name: 'date', type: 'DateTime', required: true, description: '基准日期' },
      { name: 'days', type: 'number', required: true, description: '要增加的天数（负数表示减少）' },
    ],
    returnType: 'DateTime',
    examples: [
      'date_add_days(today(), 7) → 7天后',
      'date_add_days(order.date, -3) → 订单日期前3天',
    ],
  },
  {
    name: 'year',
    category: FUNCTION_CATEGORIES.DATE,
    signature: 'year(date)',
    description: '提取年份',
    parameters: [
      { name: 'date', type: 'DateTime', required: true, description: '日期' },
    ],
    returnType: 'number',
    examples: [
      'year(today()) → 2024',
      'year(order.date) → 订单年份',
    ],
  },
  {
    name: 'month',
    category: FUNCTION_CATEGORIES.DATE,
    signature: 'month(date)',
    description: '提取月份',
    parameters: [
      { name: 'date', type: 'DateTime', required: true, description: '日期' },
    ],
    returnType: 'number',
    examples: [
      'month(today()) → 1',
      'month(order.date) → 订单月份',
    ],
  },
  {
    name: 'day',
    category: FUNCTION_CATEGORIES.DATE,
    signature: 'day(date)',
    description: '提取日期（几号）',
    parameters: [
      { name: 'date', type: 'DateTime', required: true, description: '日期' },
    ],
    returnType: 'number',
    examples: [
      'day(today()) → 15',
      'day(order.date) → 订单日期',
    ],
  },

  // ==================== 条件函数 ====================
  {
    name: 'if',
    category: FUNCTION_CATEGORIES.CONDITION,
    signature: 'if(condition, trueValue, falseValue)',
    description: '条件判断',
    parameters: [
      { name: 'condition', type: 'boolean', required: true, description: '条件表达式' },
      { name: 'trueValue', type: 'any', required: true, description: '条件为真时的返回值' },
      { name: 'falseValue', type: 'any', required: true, description: '条件为假时的返回值' },
    ],
    returnType: 'any',
    examples: [
      'if(quantity > 10, "批量", "零售") → 根据数量判断',
      'if(status == "已完成", "✓", "✗") → 状态图标',
    ],
  },
  {
    name: 'coalesce',
    category: FUNCTION_CATEGORIES.CONDITION,
    signature: 'coalesce(value1, value2, ...)',
    description: '返回第一个非空值',
    parameters: [
      { name: 'value1', type: 'any', required: true, description: '第一个值' },
      { name: 'value2', type: 'any', required: true, description: '第二个值' },
    ],
    returnType: 'any',
    examples: [
      'coalesce(customer.phone, customer.mobile, "无") → 优先返回手机号',
      'coalesce(product.alias, product.name) → 别名或名称',
    ],
  },
  {
    name: 'is_null',
    category: FUNCTION_CATEGORIES.CONDITION,
    signature: 'is_null(value)',
    description: '判断是否为空',
    parameters: [
      { name: 'value', type: 'any', required: true, description: '要判断的值' },
    ],
    returnType: 'boolean',
    examples: [
      'is_null(customer.remark) → true/false',
      'if(is_null(price), "待定", price) → 价格为空时显示待定',
    ],
  },
  {
    name: 'is_empty',
    category: FUNCTION_CATEGORIES.CONDITION,
    signature: 'is_empty(value)',
    description: '判断是否为空字符串',
    parameters: [
      { name: 'value', type: 'string', required: true, description: '要判断的文本' },
    ],
    returnType: 'boolean',
    examples: [
      'is_empty(customer.address) → true/false',
      'if(is_empty(remark), "无备注", remark) → 备注为空时显示无备注',
    ],
  },
];

/**
 * 按分类分组函数
 */
export const getFunctionsByCategory = (): Record<string, FunctionDefinition[]> => {
  const grouped: Record<string, FunctionDefinition[]> = {};

  FUNCTIONS.forEach(func => {
    if (!grouped[func.category]) {
      grouped[func.category] = [];
    }
    grouped[func.category].push(func);
  });

  return grouped;
};

/**
 * 根据名称查找函数
 */
export const getFunctionByName = (name: string): FunctionDefinition | undefined => {
  return FUNCTIONS.find(func => func.name === name);
};
