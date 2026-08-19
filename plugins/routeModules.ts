import { winPath } from '@umijs/utils';
import type { IApi } from 'umi';

/**
 * 按 DEV_ROUTE_MODULES 裁剪扫描结果。
 *
 * 开发时只起部分业务模块，登记物也应只生成对应模块的，否则临时入口仍会加载全系统。
 * widgets 与 form-widgets 此前各自复制了一份逐字相同的实现，现收在这里。
 *
 * @author nokecy
 */
export function filterByEnabledRouteModules(api: IApi, paths: string[]) {
	const enabledRouteModules = process.env.DEV_ROUTE_MODULES?.split(',')
		.map(item => item.trim())
		.filter(Boolean);
	if (!enabledRouteModules?.length) return paths;

	const pagesPath = winPath(api.paths.absPagesPath!);
	return paths.filter(path => {
		const normalizedPath = winPath(path);
		if (!normalizedPath.startsWith(`${pagesPath}/`)) return true;

		const moduleName = normalizedPath.slice(pagesPath.length + 1).split('/')[0];
		return enabledRouteModules.includes(moduleName);
	});
}
