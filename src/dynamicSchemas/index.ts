/**
 * DynamicSchemas 模块聚合导出
 *
 * 此文件提供 DynamicSchema 系统的统一导出点
 * 包括类型定义、内置 Schema 以及相关工具函数
 */

// 导出所有类型定义
export * from './types';

// 导出内置 Schema（供手动引用，插件会自动扫描）
export { schemas as exampleSchemas } from './builtin/example';
export { schemas as dataCopilotSchemas } from './builtin/dataCopilot';

