/**
 * appPdm 模块动态表单 Schema 聚合导出
 *
 * 此文件聚合 PDM 模块下所有动态表单 Schema 定义
 * 插件会自动扫描并注册这些 Schema
 */

// 导出 BomManagement 模块的 Schema
export { schemas as bomManagementSchemas } from './bomManagement';

// 导出 PartManagement 模块的 Schema（简单表单）
export { schemas as partManagementSchemas } from './partManagement';

// 导出 PartManagement 模块的 Schema（复杂表单，含动态属性）
export { schemas as partManagementAdvancedSchemas } from './partManagementAdvanced';

// 聚合所有 Schema 供插件自动加载
import { schemas as bomManagementSchemas } from './bomManagement';
import { schemas as partManagementSchemas } from './partManagement';
import { schemas as partManagementAdvancedSchemas } from './partManagementAdvanced';

export const schemas = [
  ...bomManagementSchemas,
  ...partManagementSchemas,
  ...partManagementAdvancedSchemas,
];
