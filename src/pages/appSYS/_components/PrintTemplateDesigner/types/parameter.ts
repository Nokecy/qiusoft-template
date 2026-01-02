/**
 * 模板参数化类型定义
 * 用于定义模板级参数、约束条件等
 */

/**
 * 参数类型枚举
 *
 * 定义模板参数支持的所有数据类型
 */
export enum ParameterType {
  /** 字符串类型 */
  String = 'string',
  /** 整数类型 */
  Int = 'int',
  /** 长整数类型 */
  Long = 'long',
  /** 双精度浮点数类型 */
  Double = 'double',
  /** 布尔类型 */
  Bool = 'bool',
  /** 日期时间类型 */
  DateTime = 'datetime',
  /** 数组类型 */
  Array = 'array',
}

/**
 * 数组元素的基础类型联合
 *
 * 用于约束数组参数中元素的类型，避免使用 unknown
 */
export type ArrayElementType = string | number | boolean | Date;

/**
 * 参数类型到TypeScript类型的映射
 *
 * @修复说明 Critical Issue #2: DateTime类型统一
 * - DateTime统一使用ISO 8601字符串格式(string)，移除Date类型
 * - 原因: 确保序列化/反序列化的一致性和可预测性
 * - 兼容性: 运行时仍可通过工具函数转换为Date对象
 *
 * @修复说明 Critical Issue #1: Array类型约束
 * - Array类型从 unknown[] 改为 ArrayElementType[]
 * - 原因: 提供类型安全的数组元素约束，避免any/unknown滥用
 * - 兼容性: ArrayElementType涵盖了所有支持的参数基础类型
 */
export type ParameterTypeMap = {
  [ParameterType.String]: string;
  [ParameterType.Int]: number;
  [ParameterType.Long]: number;
  [ParameterType.Double]: number;
  [ParameterType.Bool]: boolean;
  [ParameterType.DateTime]: string; // ISO 8601格式字符串
  [ParameterType.Array]: ArrayElementType[];
};

/**
 * 参数约束条件接口
 *
 * 用于定义参数的验证规则和限制条件
 */
export interface ParameterConstraints {
  // ========== 数值类型约束 ==========

  /** 最小值(适用于Int/Long/Double类型) */
  min?: number;

  /** 最大值(适用于Int/Long/Double类型) */
  max?: number;

  /** 是否允许为0(适用于数值类型) */
  allowZero?: boolean;

  /** 是否只允许正数(适用于数值类型) */
  positiveOnly?: boolean;

  // ========== 字符串类型约束 ==========

  /** 正则表达式模式(适用于String类型) */
  pattern?: string;

  /** 最小字符串长度(适用于String类型) */
  minLength?: number;

  /** 最大字符串长度(适用于String类型) */
  maxLength?: number;

  /** 是否允许空字符串(适用于String类型) */
  allowEmpty?: boolean;

  // ========== 数组类型约束 ==========

  /** 最小数组项数(适用于Array类型) */
  minItems?: number;

  /** 最大数组项数(适用于Array类型) */
  maxItems?: number;

  /** 数组项类型(适用于Array类型) */
  itemType?: ParameterType;

  /** 是否允许空数组(适用于Array类型) */
  allowEmptyArray?: boolean;

  // ========== 日期时间类型约束 ==========

  /** 最早日期(适用于DateTime类型,ISO 8601格式) */
  minDate?: string;

  /** 最晚日期(适用于DateTime类型,ISO 8601格式) */
  maxDate?: string;

  /** 日期格式(适用于DateTime类型,如:"yyyy-MM-dd") */
  dateFormat?: string;

  // ========== 枚举类型约束 ==========

  /** 枚举值列表(适用于所有类型,限定可选值) */
  enum?: Array<string | number | boolean>;

  /** 枚举值描述(与enum数组对应,用于UI显示) */
  enumLabels?: string[];

  // ========== 通用约束 ==========

  /** 自定义验证表达式(Scriban语法) */
  customValidation?: string;

  /** 自定义验证错误消息 */
  customValidationMessage?: string;
}

/**
 * 参数默认值的类型安全映射
 *
 * 根据参数类型自动推导defaultValue的正确类型
 * @修复说明 Critical Issue #1: unknown类型滥用
 */
export type ParameterDefaultValue<T extends ParameterType> = ParameterTypeMap[T];

/**
 * 模板参数定义基础接口(内部使用)
 *
 * @internal
 * 定义模板级别的参数及其元数据
 */
interface TemplateParameterBase {
  /** 参数名称(唯一标识符,命名规则:[a-zA-Z_][a-zA-Z0-9_]*) */
  name: string;

  /** 参数类型 */
  type: ParameterType;

  /** 参数描述(用于文档和UI提示) */
  description?: string;

  /** 显示标签(用于UI显示,如果未提供则使用name) */
  label?: string;

  /** 约束条件(可选) */
  constraints?: ParameterConstraints;

  /** 参数分组(用于UI组织,可选) */
  group?: string;

  /** 显示顺序(用于UI排序,可选) */
  order?: number;

  /** 是否在UI中隐藏(默认false,用于内部参数) */
  hidden?: boolean;

  /** 参数提示信息(显示在输入框下方) */
  placeholder?: string;

  /** 帮助文本(详细说明文档链接或markdown文本) */
  helpText?: string;
}

/**
 * 必填参数定义(required: true时必须提供defaultValue)
 *
 * @修复说明 Critical Issue #3: 必填参数类型约束
 * - required为true时，defaultValue为必填且类型安全
 * - 通过泛型T约束defaultValue类型必须匹配参数type
 */
export interface RequiredTemplateParameter<T extends ParameterType = ParameterType>
  extends TemplateParameterBase {
  /** 参数类型 */
  type: T;

  /** 默认值(必填,类型必须与type匹配) */
  defaultValue: ParameterDefaultValue<T>;

  /** 是否必填 */
  required: true;
}

/**
 * 可选参数定义(required: false时defaultValue可选)
 *
 * @修复说明 Critical Issue #3: 必填参数类型约束
 * - required为false时，defaultValue为可选且类型安全
 * - 通过泛型T约束defaultValue类型必须匹配参数type
 */
export interface OptionalTemplateParameter<T extends ParameterType = ParameterType>
  extends TemplateParameterBase {
  /** 参数类型 */
  type: T;

  /** 默认值(可选,类型必须与type匹配) */
  defaultValue?: ParameterDefaultValue<T>;

  /** 是否必填 */
  required: false;
}

/**
 * 模板参数定义接口(联合类型)
 *
 * @修复说明 Critical Issue #3: 必填参数类型约束
 * - 使用联合类型确保required和defaultValue的类型一致性
 * - required为true时defaultValue必填，required为false时defaultValue可选
 * - 保持向后兼容性：现有代码仍可正常使用
 *
 * @example
 * // 必填参数必须提供默认值
 * const requiredParam: TemplateParameter = {
 *   name: 'userId',
 *   type: ParameterType.Int,
 *   required: true,
 *   defaultValue: 0 // 必须提供
 * };
 *
 * @example
 * // 可选参数的默认值可选
 * const optionalParam: TemplateParameter = {
 *   name: 'userName',
 *   type: ParameterType.String,
 *   required: false,
 *   defaultValue: '' // 可选
 * };
 */
export type TemplateParameter<T extends ParameterType = ParameterType> =
  | RequiredTemplateParameter<T>
  | OptionalTemplateParameter<T>;

/**
 * 参数值类型(运行时参数值)
 *
 * @修复说明 Critical Issue #1: unknown类型滥用
 * - 移除 unknown[]，使用类型安全的 ArrayElementType[]
 * - 移除 Date，统一使用ISO 8601字符串(与ParameterTypeMap保持一致)
 * - 用于表示参数的实际值
 *
 * @修复说明 Critical Issue #2: DateTime类型统一
 * - 移除Date类型，统一使用string(ISO 8601格式)
 * - 确保序列化/反序列化的一致性
 */
export type ParameterValue = string | number | boolean | ArrayElementType[];

/**
 * 参数值字典
 *
 * 运行时参数值的集合,键为参数名称
 */
export type ParameterValues = Record<string, ParameterValue>;

/**
 * 参数元数据(用于反射和工具生成)
 */
export interface ParameterMetadata {
  /** 参数名称 */
  name: string;

  /** 参数类型 */
  type: ParameterType;

  /** 是否必填 */
  required: boolean;

  /** 有无默认值 */
  hasDefaultValue: boolean;

  /** 有无约束条件 */
  hasConstraints: boolean;

  /** 约束条件摘要(用于快速展示) */
  constraintsSummary?: string;
}

/**
 * 参数定义字典
 *
 * 模板的参数定义集合,键为参数名称
 */
export type TemplateParameters = Record<string, TemplateParameter>;

/**
 * 参数组配置
 *
 * 用于UI中对参数进行分组展示
 */
export interface ParameterGroup {
  /** 分组名称(唯一标识) */
  name: string;

  /** 显示标签 */
  label: string;

  /** 分组描述 */
  description?: string;

  /** 是否默认展开(默认true) */
  expanded?: boolean;

  /** 显示顺序 */
  order?: number;

  /** 所属参数名称列表 */
  parameterNames: string[];
}

/**
 * 参数校验选项
 */
export interface ParameterValidationOptions {
  /** 是否严格模式(严格模式下类型不匹配会报错) */
  strict?: boolean;

  /** 是否允许额外参数(宽松模式) */
  allowExtraParameters?: boolean;

  /** 是否自动类型转换(如字符串"123"转为数字123) */
  autoTypeConversion?: boolean;

  /** 自定义验证器函数 */
  customValidators?: Record<string, (value: unknown) => boolean | string>;
}

/**
 * 参数类型常量(用于类型守卫和类型检查)
 */
export const PARAMETER_TYPES = Object.values(ParameterType);

/**
 * 数值类型参数类型集合
 */
export const NUMERIC_PARAMETER_TYPES: readonly ParameterType[] = [
  ParameterType.Int,
  ParameterType.Long,
  ParameterType.Double,
] as const;

/**
 * 类型守卫: 检查是否为数值类型参数
 */
export function isNumericParameterType(type: ParameterType): type is ParameterType.Int | ParameterType.Long | ParameterType.Double {
  return NUMERIC_PARAMETER_TYPES.includes(type);
}

/**
 * 类型守卫: 检查是否为有效的参数类型
 */
export function isValidParameterType(type: string): type is ParameterType {
  return PARAMETER_TYPES.includes(type as ParameterType);
}

/**
 * 参数默认值工厂函数
 *
 * @修复说明 Critical Issue #2: DateTime类型统一
 * - DateTime类型确保返回ISO 8601格式字符串
 * - 使用类型断言确保返回类型与ParameterValue一致
 */
export function getDefaultParameterValue(type: ParameterType): ParameterValue {
  switch (type) {
    case ParameterType.String:
      return '';
    case ParameterType.Int:
    case ParameterType.Long:
    case ParameterType.Double:
      return 0;
    case ParameterType.Bool:
      return false;
    case ParameterType.DateTime:
      // 确保返回ISO 8601格式字符串
      return new Date().toISOString();
    case ParameterType.Array:
      return [] as ArrayElementType[];
    default:
      return '';
  }
}

/**
 * 日期字符串验证函数
 *
 * @修复说明 Critical Issue #2: DateTime类型验证工具
 * - 验证字符串是否为有效的ISO 8601格式日期
 * - 用于运行时参数验证
 *
 * @param value - 待验证的日期字符串
 * @returns 是否为有效的ISO 8601格式
 *
 * @example
 * isValidISODateString('2024-01-15T08:30:00.000Z') // true
 * isValidISODateString('2024-01-15') // true
 * isValidISODateString('invalid') // false
 */
export function isValidISODateString(value: string): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }

  // 尝试解析为日期
  const date = new Date(value);

  // 检查是否为有效日期且能正确往返转换
  return !isNaN(date.getTime()) && date.toISOString().startsWith(value.split('T')[0]);
}

/**
 * 日期转换为ISO字符串
 *
 * @修复说明 Critical Issue #2: DateTime类型转换工具
 * - 统一的日期转ISO字符串转换函数
 * - 支持Date对象、时间戳、ISO字符串输入
 *
 * @param value - Date对象、时间戳或ISO字符串
 * @returns ISO 8601格式字符串
 * @throws 如果输入无法转换为有效日期
 *
 * @example
 * toISODateString(new Date()) // '2024-01-15T08:30:00.000Z'
 * toISODateString(1705305000000) // '2024-01-15T08:30:00.000Z'
 * toISODateString('2024-01-15') // '2024-01-15T00:00:00.000Z'
 */
export function toISODateString(value: Date | number | string): string {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${value}`);
  }

  return date.toISOString();
}

/**
 * ISO字符串转换为Date对象
 *
 * @修复说明 Critical Issue #2: DateTime类型转换工具
 * - 统一的ISO字符串转Date对象函数
 * - 用于需要Date对象的场景(如日期选择器)
 *
 * @param isoString - ISO 8601格式字符串
 * @returns Date对象
 * @throws 如果输入不是有效的ISO字符串
 *
 * @example
 * fromISODateString('2024-01-15T08:30:00.000Z') // Date对象
 */
export function fromISODateString(isoString: string): Date {
  if (!isValidISODateString(isoString)) {
    throw new Error(`Invalid ISO date string: ${isoString}`);
  }

  return new Date(isoString);
}
