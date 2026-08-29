// @author nokecy
// 路由表由客户配置的启用模块清单与各模块自述组装得出，本文件不含任何具体模块的页面知识。
import { existsSync } from 'fs';
import { join } from 'path';
import { project } from './project';

type RouteItem = {
	path?: string;
	component?: string;
	name?: string;
	layout?: boolean;
	redirect?: string;
};

// 业务模块在 src/pages，应用壳自带的模块（如登录）在 src/appShell。
const moduleRoots = [join(__dirname, '../src/pages'), join(__dirname, '../src/appShell')];

/** 读取模块自述。模块自述只承载路由，菜单标题、图标与权限由后端动态菜单下发。 */
const readModuleRoutes = (moduleName: string): RouteItem[] => {
	const selfDescription = moduleRoots.map(root => join(root, moduleName, 'routes.json')).find(existsSync);
	if (!selfDescription) {
		throw new Error(`模块 ${moduleName} 缺少模块自述 ${moduleName}/routes.json`);
	}
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	return require(selfDescription) as RouteItem[];
};

// DEV_ROUTE_MODULES 用于开发时裁剪路由模块，避免 max dev 一次加载全系统。@author nokecy
const devModules = process.env.DEV_ROUTE_MODULES?.split(',')
	.map(item => item.trim())
	.filter(Boolean);
// DEV_ROUTE_PREFIXES 进一步裁剪到指定路径前缀，只作用于前缀所属的那个模块。@author nokecy
const devPrefixes =
	process.env.DEV_ROUTE_PREFIXES?.split(',')
		.map(item => item.trim())
		.filter(Boolean) ?? [];
const devPrefixOwners = new Set(devPrefixes.map(prefix => prefix.split('/').filter(Boolean)[0]));

// 本客户后端不提供对应接口的页面：排除后它们不进路由表，umi 也就不会去编译，
// 连带那些页面引用的服务客户端也不必存在。
//
// 与 DEV_ROUTE_* 不同，这不是开发期裁剪，而是客户差异层的一部分——
// 某个客户没买某条业务线、或上游子模块的页面领先于后端接口时，用它把那几页摘掉，
// 而不是去改共享子模块。填写位置见 project.defaults.ts 的 excludedRoutePrefixes。
const excludedPrefixes = project.excludedRoutePrefixes ?? [];

const takeModuleRoutes = (moduleName: string): RouteItem[] => {
	if (devModules && !devModules.includes(moduleName)) return [];

	const moduleRoutes = readModuleRoutes(moduleName).filter(
		route => !excludedPrefixes.some(prefix => route.path?.startsWith(prefix)),
	);
	if (!devPrefixes.length || !devPrefixOwners.has(moduleName)) return moduleRoutes;

	return moduleRoutes.filter(route => devPrefixes.some(prefix => route.path?.startsWith(prefix)));
};

/** 按启用清单组装路由表。清单是唯一输入，停用一个模块只需把它从清单中移除。 */
export const buildRoutes = (enabledModules: string[]): RouteItem[] => [
	{
		path: '/404',
		component: './404',
		name: '找不到页面',
	},
	{
		path: '',
		component: './',
		name: '首页',
	},
	...enabledModules.flatMap(takeModuleRoutes),
	// 兜底必须排在所有模块路由之后：没有它，任何拼错的、失效的或指向未启用模块的地址
	// 都匹配不到路由，react-router 只在控制台留一句 No routes matched location，
	// 页面上是一片空白——用户看不出是走错了地址还是系统坏了，也没有回去的入口。
	// 走 layout 渲染，导航还在，用户能自己离开这一页。
	//
	// 路径写 `/*` 而不是 `*`：keepalive 插件靠 `key !== '/*'` 把兜底路由排除在标签名匹配之外，
	// 写成 `*` 命不中这个判断，兜底会抢在真实路由前面命名标签，
	// 表现是每个页面的标签名都退化成它自己的路径。@author nokecy
	{
		path: '/*',
		component: './404',
		name: '找不到页面',
	},
];

export default buildRoutes(project.enabledModules);
