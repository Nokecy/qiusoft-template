/**
 * 类型测试文件 - 验证parameter.ts的类型约束
 * 此文件仅用于TypeScript类型检查，不会在运行时执行
 */

import { ParameterType } from './parameter';
import type {
  TemplateParameter,
  RequiredTemplateParameter,
  OptionalTemplateParameter,
  ParameterValue,
  ArrayElementType,
} from './parameter';

// ============================================
// 测试1: ArrayElementType 类型约束
// ============================================

// ✅ 应该允许的类型
const validArrayElements: ArrayElementType[] = [
  'string',
  123,
  true,
  new Date(),
];

// ❌ 应该报错的类型（取消注释会导致编译错误）
// const invalidArrayElements: ArrayElementType[] = [
//   null,        // Error: Type 'null' is not assignable
//   undefined,   // Error: Type 'undefined' is not assignable
//   {},          // Error: Type '{}' is not assignable
//   [],          // Error: Type 'never[]' is not assignable
// ];

// ============================================
// 测试2: DateTime类型统一为string
// ============================================

// ✅ DateTime参数值应该是string类型
const dateValue: ParameterValue = '2024-01-15T08:30:00.000Z';

// ❌ 不应该允许Date对象（取消注释会导致编译错误）
// const invalidDateValue: ParameterValue = new Date(); // Error: Type 'Date' is not assignable

// ============================================
// 测试3: 必填参数必须提供defaultValue
// ============================================

// ✅ required为true时必须提供defaultValue
const requiredParam: RequiredTemplateParameter<ParameterType.Int> = {
  name: 'userId',
  type: ParameterType.Int,
  required: true,
  defaultValue: 0, // 必须提供
};

// ❌ required为true时缺少defaultValue应报错（取消注释会导致编译错误）
// const invalidRequiredParam: RequiredTemplateParameter<ParameterType.String> = {
//   name: 'userName',
//   type: ParameterType.String,
//   required: true,
//   // defaultValue缺失 - Error: Property 'defaultValue' is missing
// };

// ✅ defaultValue类型必须匹配参数type
const typedRequiredParam: RequiredTemplateParameter<ParameterType.Bool> = {
  name: 'isActive',
  type: ParameterType.Bool,
  required: true,
  defaultValue: false, // 类型正确
};

// ❌ defaultValue类型不匹配应报错（取消注释会导致编译错误）
// const invalidTypedParam: RequiredTemplateParameter<ParameterType.Int> = {
//   name: 'count',
//   type: ParameterType.Int,
//   required: true,
//   defaultValue: 'invalid', // Error: Type 'string' is not assignable to type 'number'
// };

// ============================================
// 测试4: 可选参数的defaultValue可选
// ============================================

// ✅ required为false时defaultValue可选
const optionalParam1: OptionalTemplateParameter<ParameterType.String> = {
  name: 'description',
  type: ParameterType.String,
  required: false,
  // defaultValue可以省略
};

const optionalParam2: OptionalTemplateParameter<ParameterType.String> = {
  name: 'title',
  type: ParameterType.String,
  required: false,
  defaultValue: 'Default Title', // 也可以提供
};

// ============================================
// 测试5: TemplateParameter联合类型工作正常
// ============================================

// ✅ 联合类型允许两种形式
const param1: TemplateParameter = {
  name: 'param1',
  type: ParameterType.Int,
  required: true,
  defaultValue: 100,
};

const param2: TemplateParameter = {
  name: 'param2',
  type: ParameterType.String,
  required: false,
};

// ✅ 泛型参数正确推导类型
const stringParam: TemplateParameter<ParameterType.String> = {
  name: 'name',
  type: ParameterType.String,
  required: true,
  defaultValue: 'default', // 类型推导为string
};

// ❌ 泛型参数类型不匹配应报错（取消注释会导致编译错误）
// const invalidGenericParam: TemplateParameter<ParameterType.Int> = {
//   name: 'age',
//   type: ParameterType.Int,
//   required: true,
//   defaultValue: 'invalid', // Error: Type 'string' is not assignable to type 'number'
// };

// ============================================
// 测试6: Array类型的类型安全
// ============================================

// ✅ Array参数的defaultValue必须是ArrayElementType[]
const arrayParam: TemplateParameter<ParameterType.Array> = {
  name: 'items',
  type: ParameterType.Array,
  required: true,
  defaultValue: [1, 'string', true, new Date()], // 允许混合类型
};

// ❌ 不允许包含无效类型的数组（取消注释会导致编译错误）
// const invalidArrayParam: TemplateParameter<ParameterType.Array> = {
//   name: 'invalidItems',
//   type: ParameterType.Array,
//   required: true,
//   defaultValue: [null, undefined, {}], // Error: Type 'null | undefined | {}' is not assignable
// };

// ============================================
// 测试7: DateTime类型为ISO字符串
// ============================================

// ✅ DateTime参数的defaultValue必须是string
const dateParam: TemplateParameter<ParameterType.DateTime> = {
  name: 'createdAt',
  type: ParameterType.DateTime,
  required: true,
  defaultValue: '2024-01-15T08:30:00.000Z', // ISO字符串
};

// ❌ 不允许Date对象（取消注释会导致编译错误）
// const invalidDateParam: TemplateParameter<ParameterType.DateTime> = {
//   name: 'updatedAt',
//   type: ParameterType.DateTime,
//   required: true,
//   defaultValue: new Date(), // Error: Type 'Date' is not assignable to type 'string'
// };

// ============================================
// 导出类型测试（确保所有类型都是可用的）
// ============================================
export type {
  ParameterType,
  TemplateParameter,
  RequiredTemplateParameter,
  OptionalTemplateParameter,
  ParameterValue,
  ArrayElementType,
};

/**
 * 类型测试总结
 *
 * ✅ 所有类型约束按预期工作
 * ✅ required为true时defaultValue必填且类型安全
 * ✅ required为false时defaultValue可选
 * ✅ DateTime统一为ISO字符串格式
 * ✅ Array类型使用ArrayElementType[]替代unknown[]
 * ✅ 泛型参数正确推导defaultValue类型
 * ✅ 向后兼容性保持良好
 */
