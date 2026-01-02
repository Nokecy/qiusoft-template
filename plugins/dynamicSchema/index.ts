import { IApi } from '@umijs/max';
import { join } from 'path';
import { Mustache, lodash, winPath } from '@umijs/utils';
import { getSchemas } from './getSchemas';
import { withTmpPath } from '../withTmpPath';
const fs = require('fs');
const path = require('path');

export default (api: IApi) => {
  // 插件注册
  api.describe({
    key: 'dynamicSchema',
    config: {
      schema(joi) {
        return joi.object({
          // 是否启用后端 Schema 获取
          enableBackend: joi.boolean().default(true),
          // API 基础路径
          apiBasePath: joi.string().default('/api/dynamic-schema'),
        });
      },
    },
    enableBy: api.EnableBy.register,
  });

  // 获取内置 Schema 路径
  function getBuiltinSchemasPath() {
    return join(api.paths.absSrcPath!, 'dynamicSchemas/builtin');
  }

  // 扫描所有内置 Schema 文件
  function getAllBuiltinSchemas() {
    const builtinPath = getBuiltinSchemasPath();
    return lodash.uniq([
      // src/dynamicSchemas/builtin/ 下的文件
      ...getSchemas({
        base: builtinPath,
        cwd: api.cwd,
      }),
      // src/pages/**/_dynamicSchemas/ 下的文件
      ...getSchemas({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: '**/_dynamicSchemas/*.{ts,tsx}',
      }),
    ]);
  }

  // 生成临时文件
  api.onGenerateFiles(() => {
    const schemaFiles = getAllBuiltinSchemas();

    // 生成导入信息
    const imports = schemaFiles.map((file, index) => {
      const relativePath = winPath(file).replace(/\\/g, '/');
      const varName = `schemas_${index}`;
      return {
        varName,
        importPath: relativePath,
      };
    });

    // 读取模板
    const runtimeTpl = fs.readFileSync(
      path.join(__dirname, 'templates/runtime.tpl'),
      'utf-8'
    );
    const exportsTpl = fs.readFileSync(
      path.join(__dirname, 'templates/exports.tpl'),
      'utf-8'
    );
    const builtinsTpl = fs.readFileSync(
      path.join(__dirname, 'templates/builtins.tpl'),
      'utf-8'
    );

    // 生成内置 Schema 聚合文件
    api.writeTmpFile({
      path: 'builtinSchemas.ts',
      content: Mustache.render(builtinsTpl, {
        imports: imports.length > 0
          ? imports.map((item) =>
              `import { schemas as ${item.varName} } from '${item.importPath}';`
            ).join('\n')
          : '// 暂无内置 Schema',
        aggregation: imports.length > 0
          ? imports.map((item) => `...${item.varName}`).join(',\n  ')
          : '',
      }),
    });

    // 生成运行时文件
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: runtimeTpl,
    });

    // 生成导出文件
    api.writeTmpFile({
      path: 'index.ts',
      content: exportsTpl,
    });

    // 生成 Context 文件
    api.writeTmpFile({
      path: 'context.ts',
      content: `
import React from 'react';
import type { DynamicSchemaContextValue } from './types';

export const DynamicSchemaContext = React.createContext<DynamicSchemaContextValue | null>(null);
      `.trim(),
    });

    // 生成类型文件
    api.writeTmpFile({
      path: 'types.ts',
      content: `
import type { ISchema } from '@formily/react';

export interface DynamicSchemaDefinition {
  scenarioKey: string;
  label: string;
  description?: string;
  form: Record<string, any>;
  schema: ISchema;
}

export interface PublishedSchemaDto {
  scenarioKey: string;
  schemaJson: string;
  version: number;
  publishedAt: string | null;
  hostEntityId: string | null;
  entityType: string | null;
}

export interface DynamicSchemaContextValue {
  backendSchemas: Record<string, PublishedSchemaDto>;
  builtinSchemas: Record<string, DynamicSchemaDefinition>;
  isInitialized: boolean;
  lastFetchedAt: Date | null;
  refresh: () => Promise<void>;
}

export interface ScenarioInfo {
  scenarioKey: string;
  label: string;
  description?: string;
  source: 'builtin' | 'backend';
  hasBackendOverride?: boolean;
}
      `.trim(),
    });
  });

  // 添加运行时插件
  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
};
