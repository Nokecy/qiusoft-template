/**
 * 数据源工具函数
 * 提供数据源格式转换、验证等功能
 */

import { AtlDataSource, DataSourceType } from '../types';

/**
 * 旧格式数据源接口（向后兼容）
 */
interface LegacyDataSource {
  key: string;
  type: DataSourceType;
  configJson: string;
  parameters?: any[];
}

/**
 * 将旧格式数据源转换为新格式
 * @param oldDataSource 旧格式数据源
 * @returns 新格式数据源
 */
export function migrateLegacyDataSource(oldDataSource: LegacyDataSource): AtlDataSource {
  try {
    const config = JSON.parse(oldDataSource.configJson || '{}');

    const newDataSource: AtlDataSource = {
      name: oldDataSource.key,
      type: oldDataSource.type,
      parameters: oldDataSource.parameters || [],
    };

    // 根据类型填充特定字段
    switch (oldDataSource.type) {
      case DataSourceType.Array:
        newDataSource.data = config.data;
        break;

      case DataSourceType.Api:
        // 使用新的字段名
        (newDataSource as any).url = config.url;
        (newDataSource as any).method = config.method || 'GET';
        (newDataSource as any).headers = config.headers;
        break;

      case DataSourceType.Sql:
        newDataSource.connectionString = config.connectionString;
        newDataSource.query = config.query;
        break;
    }

    return newDataSource;
  } catch (error) {
    console.error('数据源格式转换失败:', error);
    // 返回基础数据源结构
    return {
      name: oldDataSource.key,
      type: oldDataSource.type,
      parameters: [],
    };
  }
}

/**
 * 批量转换数据源字典
 * @param dataSources 数据源字典
 * @returns 转换后的数据源字典
 */
export function migrateDataSources(
  dataSources: Record<string, any>,
): Record<string, AtlDataSource> {
  const result: Record<string, AtlDataSource> = {};

  Object.entries(dataSources).forEach(([key, ds]) => {
    // 判断是否是旧格式（有key和configJson字段）
    if (ds.key && ds.configJson !== undefined) {
      result[key] = migrateLegacyDataSource(ds as LegacyDataSource);
    } else if (ds.name !== undefined) {
      // 已经是新格式，直接使用
      result[key] = ds as AtlDataSource;
    } else {
      // 未知格式，尝试作为新格式处理
      result[key] = {
        name: key,
        ...ds,
      } as AtlDataSource;
    }
  });

  return result;
}

/**
 * 验证数据源配置是否完整
 * @param dataSource 数据源
 * @returns 验证结果 {valid: boolean, errors: string[]}
 */
export function validateDataSource(dataSource: AtlDataSource): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 基础字段验证
  if (!dataSource.name || dataSource.name.trim() === '') {
    errors.push('数据源名称不能为空');
  }

  if (dataSource.type === undefined) {
    errors.push('数据源类型不能为空');
  }

  // 根据类型验证特定字段
  switch (dataSource.type) {
    case DataSourceType.Array:
      if (!dataSource.data || !Array.isArray(dataSource.data)) {
        errors.push('数组类型数据源必须提供data字段且为数组类型');
      } else if (dataSource.data.length === 0) {
        errors.push('数组数据不能为空');
      }
      break;

    case DataSourceType.Api:
      // 兼容新旧字段名: url/apiEndpoint, method/httpMethod
      const apiUrl = (dataSource as any).url || (dataSource as any).apiEndpoint;
      if (!apiUrl || apiUrl.trim() === '') {
        errors.push('API类型数据源必须提供url字段');
      } else {
        // 简单的URL格式验证(支持相对路径)
        if (!apiUrl.startsWith('/')) {
          try {
            new URL(apiUrl);
          } catch {
            errors.push('API端点必须是有效的URL格式或相对路径');
          }
        }
      }

      const httpMethod = (dataSource as any).method || (dataSource as any).httpMethod;
      if (!httpMethod || httpMethod.trim() === '') {
        errors.push('API类型数据源必须提供method字段');
      }
      break;

    case DataSourceType.Sql:
      if (!dataSource.connectionString || dataSource.connectionString.trim() === '') {
        errors.push('SQL类型数据源必须提供connectionString字段');
      }

      if (!dataSource.query || dataSource.query.trim() === '') {
        errors.push('SQL类型数据源必须提供query字段');
      }
      break;

    default:
      errors.push(`未知的数据源类型: ${dataSource.type}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 创建默认的数据源对象
 * @param type 数据源类型
 * @param name 数据源名称
 * @returns 默认数据源对象
 */
export function createDefaultDataSource(
  type: DataSourceType,
  name: string,
): AtlDataSource {
  const baseDataSource: AtlDataSource = {
    name,
    type,
    parameters: [],
  };

  switch (type) {
    case DataSourceType.Array:
      return {
        ...baseDataSource,
        data: [],
      };

    case DataSourceType.Api:
      return {
        ...baseDataSource,
        url: '',
        method: 'GET',
        headers: {},
        cache: {
          enabled: true,
          ttlSeconds: 300,
        },
      } as AtlDataSource;

    case DataSourceType.Sql:
      return {
        ...baseDataSource,
        connectionString: '',
        query: '',
      };

    default:
      return baseDataSource;
  }
}

/**
 * 获取数据源类型的显示名称
 * @param type 数据源类型
 * @returns 显示名称
 */
export function getDataSourceTypeName(type: DataSourceType): string {
  const typeNames = {
    [DataSourceType.Array]: '静态数组',
    [DataSourceType.Api]: 'REST API',
    [DataSourceType.Sql]: 'SQL查询',
  };
  return typeNames[type] || '未知类型';
}

/**
 * 格式化响应时间显示
 * @param ms 毫秒数
 * @returns 格式化后的字符串
 */
export function formatResponseTime(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  } else {
    return `${(ms / 60000).toFixed(2)}min`;
  }
}

/**
 * 格式化数据大小显示
 * @param bytes 字节数
 * @returns 格式化后的字符串
 */
export function formatDataSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes}B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)}KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  }
}

/**
 * 深度克隆数据源对象
 * @param dataSource 数据源
 * @returns 克隆后的数据源
 */
export function cloneDataSource(dataSource: AtlDataSource): AtlDataSource {
  return JSON.parse(JSON.stringify(dataSource));
}

/**
 * 比较两个数据源是否相等
 * @param ds1 数据源1
 * @param ds2 数据源2
 * @returns 是否相等
 */
export function isDataSourceEqual(ds1: AtlDataSource, ds2: AtlDataSource): boolean {
  return JSON.stringify(ds1) === JSON.stringify(ds2);
}
