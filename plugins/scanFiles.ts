import { glob, lodash, winPath } from '@umijs/utils';
import { join } from 'path';

/**
 * 按 glob 扫描出插件要登记的源文件。
 *
 * widgets、form-widgets、setting、getInitState 四个插件此前各自复制了一份逐字等价的实现，
 * 现收在这里。行为与原实现一致：去重、跳过类型定义与测试文件。
 *
 * @author nokecy
 */
export function scanFiles(opts: {
	base: string;
	cwd: string;
	pattern?: string;
	skipModelValidate?: boolean;
	extraModels?: string[];
}) {
	return lodash
		.uniq(
			glob
				.sync(opts.pattern || '**/*.{ts,tsx,js,jsx}', {
					cwd: opts.base,
				})
				.map(f => join(opts.base, f))
				.concat(opts.extraModels || [])
				.map(winPath),
		)
		.filter(f => {
			if (/\.d.ts$/.test(f)) return false;
			if (/\.(test|e2e|spec).(j|t)sx?$/.test(f)) return false;
			return true;
		});
}
