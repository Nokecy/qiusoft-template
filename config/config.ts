import { defineConfig } from 'umi';
import { iconfontUrl } from './defaultSettings';
import { projectDefaults } from './project.defaults';
import routes from './routers';

type ProjectLocal = Partial<typeof projectDefaults>;

let projectLocal: ProjectLocal = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  projectLocal = require('./project.local').default || {};
} catch (error) {
  projectLocal = {};
}

const appName = projectLocal.appName || projectDefaults.appName;
const appTitle =
  projectLocal.appTitle ||
  projectDefaults.appTitle ||
  `${appName}数字平台`;
const port = Number(process.env.PORT) || projectLocal.port || projectDefaults.port;
if (!process.env.PORT) {
  // max dev 通过环境变量 PORT 取端口，这里用于读取本地配置后注入
  process.env.PORT = String(port);
}
const themeToken = {
  ...projectDefaults.themeToken,
  ...(projectLocal.themeToken || {}),
  inputNumber: {
    ...(projectDefaults.themeToken?.inputNumber || {}),
    ...(projectLocal.themeToken?.inputNumber || {}),
  },
};
const openAPIConfig =
  projectLocal.openAPI && projectLocal.openAPI.length > 0 ? projectLocal.openAPI : projectDefaults.openAPI;

export default defineConfig({
        define: {
                OAUTH_ClientID: 'WMS_App',
                OAUTH_ClientSecret: '1q2w3e*',
                OAUTH_Scope: 'offline_access',

                OidcConfigName: '',
                enableOidc: false,
                APP_TITLE: appTitle,
        },
  npmClient: 'yarn',
	routes: routes,
	mako: {},
	plugins: [
		// './plugins/oidc.ts',
		'./plugins/getInitState',
		'./plugins/setting',
		'./plugins/widgets',
		'./plugins/dotnetify.ts',
		'./plugins/appConfig.ts',
		'./plugins/form-widgets',
		'./plugins/formSchema.ts',
		'./plugins/dynamicSchema/index.ts',
		// './plugins/getAllSchema/index.ts',
		'./plugins/table-layout',
		'./plugins/badges/badge.ts',
		'./plugins/openapi',
		'@alita/plugins/dist/keepalive',
		'@alita/plugins/dist/tabs-layout',
	],
	tabsLayout: {
		hasDropdown: true,
		hasFixedHeader: true,
	},
	keepalive: [/./],
	// 使用 hash 路由，避免在 nginx/网关未正确配置 history fallback 时，直接刷新子路由导致静态资源被错误回退为 index.html（出现 MIME/Unexpected token '<'）
	history: { type: 'hash' },
  hash: true,
	fastRefresh: true,
	mfsu: {
		// strategy: 'normal',
	},
	codeSplitting: {
		jsStrategy: 'granularChunks',
	},
	jsMinifierOptions: {
		drop: ['debugger', 'console'],
	},
	clickToComponent: {},
	//检测未使用的文件和导出，仅在 build 阶段开启。
	deadCode: {
		patterns: ['src/pages/**'],
	},
	//开启 TypeScript 的类型检查。基于 fork-ts-checker-webpack-plugin，配置项可参考 fork-ts-checker-webpack-plugin 的 Options。
	// forkTSChecker: {
	// 	issue: {
	// 		// 排除不需要检查的文件
	// 		exclude: [{ file: 'node_modules/**/*' }, { file: 'src/services/**/*' }, { file: 'src/pages/appSYS/**/*' }, { file: 'plugins/**/*' }],
	// 	},
	// },
	icons: {},
	model: {},
	esbuildMinifyIIFE: true,
	request: { dataField: '' },
	reactQuery: {},
	antd: {
		import: false,
        configProvider: {
            input: { autoComplete: 'off' },
            theme: {
                token: themeToken,
            },
        },
    },
    layout: {
        name: appName,
        locale: false,
        title: appName,
        disableContentMargin: false,
        iconfontUrl: iconfontUrl,
    },
	locale: {
		default: 'zh-CN',
		antd: true,
		baseNavigator: true,
	},
	initialState: {},
	access: {},
	ignoreMomentLocale: true,
	publicPath: '/',
	outputPath: 'dist',
	// 不识别 components 和 models 目录下的文件为路由
	conventionRoutes: {
		exclude: [/\/components\//, /\/models\//, /\/_widgets\//, /\/_utils\//, /\/_formWidgets\//],
	},
	headScripts: [
		// 解决首次加载时白屏的问题
		{ src: '/scripts/loading.js', async: true },
		{ src: `/config/config.js`, async: true },
	],
	// 引入外部样式
	styles: [
		// Designable 表单设计器样式 (从 node_modules 复制到 public 目录)
		'/styles/designable.react.umd.production.css',
		'/styles/designable.react-settings-form.umd.production.css',
	],
	chainWebpack(config) {
		config.output.set('chunkFilename', '[id].[contenthash:8].js');
	},
	extraBabelPlugins: ['lodash'],
	openAPI: openAPIConfig,
});

