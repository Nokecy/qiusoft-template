import type { DynamicSchemaDefinition } from '@/dynamicSchemas/types';

{{{ imports }}}

const allSchemas: DynamicSchemaDefinition[] = [
  {{{ aggregation }}}
];

// 转换为以 scenarioKey 为 key 的 Map
export const BUILTIN_SCHEMAS: Record<string, DynamicSchemaDefinition> = {};

allSchemas.forEach((schema) => {
  if (BUILTIN_SCHEMAS[schema.scenarioKey]) {
    console.warn(
      `[DynamicSchema] 重复的 scenarioKey: ${schema.scenarioKey}，后者将覆盖前者`
    );
  }
  BUILTIN_SCHEMAS[schema.scenarioKey] = schema;
});
