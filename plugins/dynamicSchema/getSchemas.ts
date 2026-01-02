import { glob, lodash, winPath } from '@umijs/utils';
import { join } from 'path';

export function getSchemas(opts: {
  base: string;
  cwd: string;
  pattern?: string;
}) {
  try {
    return lodash
      .uniq(
        glob
          .sync(opts.pattern || '**/*.{ts,tsx}', {
            cwd: opts.base,
          })
          .map((f) => join(opts.base, f))
          .map(winPath)
      )
      .filter((f) => {
        // 排除类型定义文件
        if (/\.d\.ts$/.test(f)) return false;
        // 排除测试文件
        if (/\.(test|e2e|spec)\.(j|t)sx?$/.test(f)) return false;
        // 排除 index 文件（用于聚合导出）
        if (/index\.(j|t)sx?$/.test(f)) return false;
        return true;
      });
  } catch {
    // 目录不存在时返回空数组
    return [];
  }
}
