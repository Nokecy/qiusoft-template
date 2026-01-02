/**
 * ATL模板DTO转换器
 *
 * 职责:
 * - 前端模板对象 ↔ 后端DTO格式的双向转换
 * - parameters字段的序列化/反序列化
 * - dataSources字段的序列化/反序列化(包含参数映射)
 * - 数据完整性验证和错误处理
 *
 * @module dtoConverters
 */

import type {
  AtlTemplateWithParameters,
  AtlDataSource,
  AtlDataSourceWithDependency
} from '../types';
import type { TemplateParameter } from '../types/parameter';

// ==================== 类型定义 ====================

/**
 * 后端DTO格式(parameters和dataSources为JSON字符串)
 */
export interface AtlTemplateDto {
  version: string;
  metadata: unknown;
  canvas: unknown;
  layoutType: number;
  dataSources?: string; // JSON字符串
  elements: unknown[];
  parameters?: string;  // JSON字符串
  variables?: unknown;
  computedVariables?: unknown;
  sections?: unknown;
  labelGridLayout?: unknown;
}

/**
 * 序列化选项
 */
export interface SerializationOptions {
  /** 是否启用格式化输出(便于调试,默认false) */
  pretty?: boolean;
  /** 是否验证数据完整性(默认true) */
  validate?: boolean;
  /** 是否启用严格模式(类型不匹配时抛出错误,默认false) */
  strict?: boolean;
}

/**
 * 反序列化选项
 */
export interface DeserializationOptions {
  /** 是否验证数据完整性(默认true) */
  validate?: boolean;
  /** 是否提供默认值(JSON解析失败时,默认true) */
  provideDefaults?: boolean;
  /** 是否记录详细日志(默认true) */
  verbose?: boolean;
}

/**
 * 转换错误类
 */
export class ConversionError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'ConversionError';
  }
}

// ==================== 验证函数 ====================

/**
 * 验证模板参数定义
 *
 * @param parameters - 参数定义对象
 * @returns 验证是否通过
 */
function validateParameters(parameters: Record<string, TemplateParameter>): boolean {
  if (!parameters || typeof parameters !== 'object') {
    return false;
  }

  for (const [key, param] of Object.entries(parameters)) {
    // 验证必填字段
    if (!param.name || !param.type) {
      console.warn(`[DTO] Invalid parameter definition for key "${key}":`, param);
      return false;
    }

    // 验证参数名称一致性
    if (param.name !== key) {
      console.warn(`[DTO] Parameter name mismatch: key="${key}" vs name="${param.name}"`);
      return false;
    }
  }

  return true;
}

/**
 * 验证数据源定义
 *
 * @param dataSources - 数据源字典
 * @returns 验证是否通过
 */
function validateDataSources(dataSources: Record<string, AtlDataSource>): boolean {
  if (!dataSources || typeof dataSources !== 'object') {
    return false;
  }

  for (const [key, dataSource] of Object.entries(dataSources)) {
    // 验证必填字段
    if (!dataSource.name || dataSource.type === undefined) {
      console.warn(`[DTO] Invalid data source definition for key "${key}":`, dataSource);
      return false;
    }

    // 验证数据源名称一致性
    if (dataSource.name !== key) {
      console.warn(`[DTO] Data source name mismatch: key="${key}" vs name="${dataSource.name}"`);
      return false;
    }
  }

  return true;
}

// ==================== 序列化函数 ====================

/**
 * 序列化模板参数为JSON字符串
 *
 * @param parameters - 参数定义对象
 * @param options - 序列化选项
 * @returns JSON字符串
 * @throws {ConversionError} 序列化失败时抛出
 */
function serializeParameters(
  parameters: Record<string, TemplateParameter>,
  options: SerializationOptions = {}
): string {
  const { pretty = false, validate = true } = options;

  try {
    // 数据验证
    if (validate && !validateParameters(parameters)) {
      throw new ConversionError(
        'Invalid parameters definition',
        'parameters'
      );
    }

    // JSON序列化
    return JSON.stringify(parameters, null, pretty ? 2 : undefined);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DTO] Failed to serialize parameters:', errorMessage, parameters);

    if (error instanceof ConversionError) {
      throw error;
    }

    throw new ConversionError(
      `Failed to serialize parameters: ${errorMessage}`,
      'parameters',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * 序列化数据源为JSON字符串
 *
 * @param dataSources - 数据源字典
 * @param options - 序列化选项
 * @returns JSON字符串
 * @throws {ConversionError} 序列化失败时抛出
 */
function serializeDataSources(
  dataSources: Record<string, AtlDataSource | AtlDataSourceWithDependency>,
  options: SerializationOptions = {}
): string {
  const { pretty = false, validate = true } = options;

  try {
    // 数据验证
    if (validate && !validateDataSources(dataSources)) {
      throw new ConversionError(
        'Invalid data sources definition',
        'dataSources'
      );
    }

    // JSON序列化
    return JSON.stringify(dataSources, null, pretty ? 2 : undefined);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DTO] Failed to serialize dataSources:', errorMessage, dataSources);

    if (error instanceof ConversionError) {
      throw error;
    }

    throw new ConversionError(
      `Failed to serialize dataSources: ${errorMessage}`,
      'dataSources',
      error instanceof Error ? error : undefined
    );
  }
}

// ==================== 反序列化函数 ====================

/**
 * 反序列化JSON字符串为模板参数对象
 *
 * @param parametersJson - JSON字符串
 * @param options - 反序列化选项
 * @returns 参数定义对象
 */
function deserializeParameters(
  parametersJson: string | undefined | null,
  options: DeserializationOptions = {}
): Record<string, TemplateParameter> {
  const { validate = true, provideDefaults = true, verbose = true } = options;

  // 处理空值
  if (!parametersJson) {
    if (verbose) {
      console.log('[DTO] Parameters field is empty, returning empty object');
    }
    return {};
  }

  // 处理非字符串类型(前端对象已解析)
  if (typeof parametersJson !== 'string') {
    if (verbose) {
      console.warn('[DTO] Parameters is not a string, assuming already parsed');
    }
    return parametersJson as Record<string, TemplateParameter>;
  }

  try {
    // JSON反序列化
    const parameters = JSON.parse(parametersJson) as Record<string, TemplateParameter>;

    // 数据验证
    if (validate && !validateParameters(parameters)) {
      if (provideDefaults) {
        console.warn('[DTO] Invalid parameters after parsing, returning empty object');
        return {};
      }
      throw new ConversionError(
        'Invalid parameters definition after parsing',
        'parameters'
      );
    }

    if (verbose) {
      console.log('[DTO] Successfully deserialized parameters:', Object.keys(parameters).length, 'parameters');
    }

    return parameters;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DTO] Failed to deserialize parameters:', errorMessage);

    // 提供默认值
    if (provideDefaults) {
      console.warn('[DTO] Providing default empty parameters object');
      return {};
    }

    if (error instanceof ConversionError) {
      throw error;
    }

    throw new ConversionError(
      `Failed to deserialize parameters: ${errorMessage}`,
      'parameters',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * 反序列化JSON字符串为数据源对象
 *
 * @param dataSourcesJson - JSON字符串
 * @param options - 反序列化选项
 * @returns 数据源字典
 */
function deserializeDataSources(
  dataSourcesJson: string | undefined | null,
  options: DeserializationOptions = {}
): Record<string, AtlDataSource | AtlDataSourceWithDependency> {
  const { validate = true, provideDefaults = true, verbose = true } = options;

  // 处理空值
  if (!dataSourcesJson) {
    if (verbose) {
      console.log('[DTO] DataSources field is empty, returning empty object');
    }
    return {};
  }

  // 处理非字符串类型(前端对象已解析)
  if (typeof dataSourcesJson !== 'string') {
    if (verbose) {
      console.warn('[DTO] DataSources is not a string, assuming already parsed');
    }
    return dataSourcesJson as Record<string, AtlDataSource>;
  }

  try {
    // JSON反序列化
    const dataSources = JSON.parse(dataSourcesJson) as Record<string, AtlDataSource>;

    // 数据验证
    if (validate && !validateDataSources(dataSources)) {
      if (provideDefaults) {
        console.warn('[DTO] Invalid dataSources after parsing, returning empty object');
        return {};
      }
      throw new ConversionError(
        'Invalid dataSources definition after parsing',
        'dataSources'
      );
    }

    if (verbose) {
      console.log('[DTO] Successfully deserialized dataSources:', Object.keys(dataSources).length, 'data sources');
    }

    return dataSources;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DTO] Failed to deserialize dataSources:', errorMessage);

    // 提供默认值
    if (provideDefaults) {
      console.warn('[DTO] Providing default empty dataSources object');
      return {};
    }

    if (error instanceof ConversionError) {
      throw error;
    }

    throw new ConversionError(
      `Failed to deserialize dataSources: ${errorMessage}`,
      'dataSources',
      error instanceof Error ? error : undefined
    );
  }
}

// ==================== 主转换函数 ====================

/**
 * 将前端模板数据转换为后端DTO格式
 *
 * 转换逻辑:
 * 1. 深拷贝模板对象,避免修改原对象
 * 2. 序列化parameters字段为JSON字符串
 * 3. 序列化dataSources字段为JSON字符串
 * 4. 保留其他字段不变
 *
 * @param template - 前端模板数据(包含parameters对象)
 * @param options - 序列化选项
 * @returns 后端DTO格式(parameters/dataSources为JSON字符串)
 * @throws {ConversionError} 转换失败时抛出
 *
 * @example
 * const template: AtlTemplateWithParameters = {
 *   version: '1.0',
 *   parameters: {
 *     orderId: { name: 'orderId', type: ParameterType.String, required: true, defaultValue: '' }
 *   },
 *   dataSources: {
 *     orderData: { name: 'orderData', type: DataSourceType.Api, url: '/api/orders' }
 *   },
 *   // ... 其他字段
 * };
 *
 * const dto = toTemplateDto(template);
 * // dto.parameters 为 JSON字符串
 * // dto.dataSources 为 JSON字符串
 */
export function toTemplateDto(
  template: AtlTemplateWithParameters,
  options: SerializationOptions = {}
): AtlTemplateDto {
  try {
    console.log('[DTO] Converting template to DTO format');

    // 深拷贝模板对象(避免修改原对象)
    const dto: any = { ...template };

    // 序列化parameters字段
    if (template.parameters && Object.keys(template.parameters).length > 0) {
      console.log('[DTO] Serializing parameters field:', Object.keys(template.parameters).length, 'parameters');
      dto.parameters = serializeParameters(template.parameters, options);
    } else {
      console.log('[DTO] No parameters to serialize');
      dto.parameters = undefined;
    }

    // 序列化dataSources字段
    if (template.dataSources && Object.keys(template.dataSources).length > 0) {
      console.log('[DTO] Serializing dataSources field:', Object.keys(template.dataSources).length, 'data sources');
      dto.dataSources = serializeDataSources(template.dataSources, options);
    } else {
      console.log('[DTO] No dataSources to serialize');
      dto.dataSources = undefined;
    }

    console.log('[DTO] Template to DTO conversion successful');
    return dto as AtlTemplateDto;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DTO] Template to DTO conversion failed:', errorMessage);
    throw error;
  }
}

/**
 * 将后端DTO数据转换为前端模板格式
 *
 * 转换逻辑:
 * 1. 深拷贝DTO对象,避免修改原对象
 * 2. 反序列化parameters字段为对象
 * 3. 反序列化dataSources字段为对象
 * 4. 保留其他字段不变
 *
 * @param dto - 后端DTO数据
 * @param options - 反序列化选项
 * @returns 前端模板数据(parameters/dataSources为对象)
 * @throws {ConversionError} 转换失败时抛出(provideDefaults=false时)
 *
 * @example
 * const dto = {
 *   version: '1.0',
 *   parameters: '{"orderId":{"name":"orderId","type":"string","required":true,"defaultValue":""}}',
 *   dataSources: '{"orderData":{"name":"orderData","type":2,"url":"/api/orders"}}',
 *   // ... 其他字段
 * };
 *
 * const template = fromTemplateDto(dto);
 * // template.parameters 为对象
 * // template.dataSources 为对象
 */
export function fromTemplateDto(
  dto: any,
  options: DeserializationOptions = {}
): AtlTemplateWithParameters {
  try {
    console.log('[DTO] Converting DTO to template format');

    // 深拷贝DTO对象(避免修改原对象)
    const template: any = { ...dto };

    // 反序列化parameters字段
    console.log('[DTO] Deserializing parameters field');
    template.parameters = deserializeParameters(dto.parameters, options);

    // 反序列化dataSources字段
    console.log('[DTO] Deserializing dataSources field');
    template.dataSources = deserializeDataSources(dto.dataSources, options);

    console.log('[DTO] DTO to template conversion successful');
    return template as AtlTemplateWithParameters;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DTO] DTO to template conversion failed:', errorMessage);
    throw error;
  }
}

// ==================== 工具函数 ====================

/**
 * 检查对象是否为DTO格式
 *
 * @param obj - 待检查对象
 * @returns 是否为DTO格式(parameters/dataSources为字符串)
 */
export function isTemplateDto(obj: any): obj is AtlTemplateDto {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  // 检查parameters字段类型
  const hasStringParameters =
    obj.parameters === undefined ||
    obj.parameters === null ||
    typeof obj.parameters === 'string';

  // 检查dataSources字段类型
  const hasStringDataSources =
    obj.dataSources === undefined ||
    obj.dataSources === null ||
    typeof obj.dataSources === 'string';

  return hasStringParameters && hasStringDataSources;
}

/**
 * 批量转换模板数组为DTO数组
 *
 * @param templates - 模板数组
 * @param options - 序列化选项
 * @returns DTO数组
 */
export function batchToTemplateDto(
  templates: AtlTemplateWithParameters[],
  options: SerializationOptions = {}
): AtlTemplateDto[] {
  console.log('[DTO] Batch converting', templates.length, 'templates to DTO format');

  const results: AtlTemplateDto[] = [];
  const errors: Array<{ index: number; error: Error }> = [];

  for (let i = 0; i < templates.length; i++) {
    try {
      results.push(toTemplateDto(templates[i], options));
    } catch (error) {
      console.error(`[DTO] Failed to convert template at index ${i}:`, error);
      errors.push({
        index: i,
        error: error instanceof Error ? error : new Error('Unknown error')
      });
    }
  }

  if (errors.length > 0) {
    console.warn(`[DTO] Batch conversion completed with ${errors.length} errors`);
  } else {
    console.log('[DTO] Batch conversion completed successfully');
  }

  return results;
}

/**
 * 批量转换DTO数组为模板数组
 *
 * @param dtos - DTO数组
 * @param options - 反序列化选项
 * @returns 模板数组
 */
export function batchFromTemplateDto(
  dtos: any[],
  options: DeserializationOptions = {}
): AtlTemplateWithParameters[] {
  console.log('[DTO] Batch converting', dtos.length, 'DTOs to template format');

  const results: AtlTemplateWithParameters[] = [];
  const errors: Array<{ index: number; error: Error }> = [];

  for (let i = 0; i < dtos.length; i++) {
    try {
      results.push(fromTemplateDto(dtos[i], options));
    } catch (error) {
      console.error(`[DTO] Failed to convert DTO at index ${i}:`, error);
      errors.push({
        index: i,
        error: error instanceof Error ? error : new Error('Unknown error')
      });

      // 如果提供默认值,添加空模板
      if (options.provideDefaults !== false) {
        results.push(dtos[i]);
      }
    }
  }

  if (errors.length > 0) {
    console.warn(`[DTO] Batch conversion completed with ${errors.length} errors`);
  } else {
    console.log('[DTO] Batch conversion completed successfully');
  }

  return results;
}

// ==================== 默认导出 ====================

export default {
  toTemplateDto,
  fromTemplateDto,
  isTemplateDto,
  batchToTemplateDto,
  batchFromTemplateDto,
  ConversionError,
};
