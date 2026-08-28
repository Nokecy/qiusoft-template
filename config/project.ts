// @author nokecy
// 客户配置的唯一读取入口：合并客户默认值与机器级覆盖，构建配置与路由配置都从这里取值。
import { projectDefaults } from './project.defaults';

type ProjectLocal = Partial<typeof projectDefaults>;

let projectLocal: ProjectLocal = {};
try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	projectLocal = require('./project.local').default || {};
} catch (error) {
	projectLocal = {};
}

const appName = projectLocal.appName || projectDefaults.appName;
const appTitle = projectLocal.appTitle || projectDefaults.appTitle || `${appName}数字平台`;
const port = Number(process.env.PORT) || projectLocal.port || projectDefaults.port;

export const project = {
	appName,
	appTitle,
	port,
	oauth: { ...projectDefaults.oauth, ...(projectLocal.oauth || {}) },
	enabledModules: projectLocal.enabledModules?.length ? projectLocal.enabledModules : projectDefaults.enabledModules,
	themeToken: {
		...projectDefaults.themeToken,
		...(projectLocal.themeToken || {}),
		inputNumber: {
			...(projectDefaults.themeToken?.inputNumber || {}),
			...(projectLocal.themeToken?.inputNumber || {}),
		},
	},
	layoutDefaults: { ...projectDefaults.layoutDefaults, ...(projectLocal.layoutDefaults || {}) },
	dashboard: {
		...projectDefaults.dashboard,
		...(projectLocal.dashboard || {}),
		home: { ...projectDefaults.dashboard.home, ...(projectLocal.dashboard?.home || {}) },
	},
	login: {
		...projectDefaults.login,
		...(projectLocal.login || {}),
		features: { ...projectDefaults.login.features, ...(projectLocal.login?.features || {}) },
		footer: { ...projectDefaults.login.footer, ...(projectLocal.login?.footer || {}) },
	},
	openAPI: projectLocal.openAPI?.length ? projectLocal.openAPI : projectDefaults.openAPI,
	excludedRoutePrefixes: projectLocal.excludedRoutePrefixes ?? projectDefaults.excludedRoutePrefixes ?? [],
};
