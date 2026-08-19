import { existsSync, readdirSync } from 'fs';
import { basename, extname, join } from 'path';
import { defineConfig } from 'umi';
import { project } from './project';
import routes from './routers';

const { appName, appTitle, port } = project;
const { iconfontUrl } = project.layoutDefaults;

// 应用壳是固定版本消费的独立仓库，挂载在 src/appShell，不放入业务模块所在的 src/pages。@author nokecy
const appShellPath = join(__dirname, '../src/appShell');
// umi 只扫描 src/models，壳内的状态模型通过额外模型配置注册。
// 必须显式声明命名空间：额外模型默认按相对 src 的路径推导，会得出 appShell.xxx，useModel('xxx') 将取不到模型。@author nokecy
const appShellModelsPath = join(appShellPath, 'models');
const appShellModels = existsSync(appShellModelsPath)
	? readdirSync(appShellModelsPath)
			.filter(file => /\.tsx?$/.test(file) && !file.endsWith('.d.ts'))
			.map(file => `${join(appShellModelsPath, file)}#${JSON.stringify({ namespace: basename(file, extname(file)) })}`)
	: [];
// 开发默认关闭 source map，降低 max dev 常驻内存；需要调试映射时使用 DEV_SOURCE_MAP=1。@author nokecy
const enableSourceMap = process.env.DEV_SOURCE_MAP === '1' || process.env.DEV_SOURCE_MAP === 'true';
const devBundler = process.env.DEV_BUNDLER || 'webpack';
// Webpack 默认使用 normal MFSU，减少 eager 模式额外 worker/esbuild 常驻内存。@author nokecy
const mfsuStrategy = process.env.DEV_MFSU_STRATEGY === 'eager' ? 'eager' : 'normal';
// umi 的临时目录随命令而变：dev 生成到 src/.umi，build 生成到 src/.umi-production。
// 固定指向 src/.umi 会让 vite build 解析到上一次 dev 留下的陈旧文件。@author nokecy
const umiTempPath = join(__dirname, process.argv.includes('build') ? '../src/.umi-production' : '../src/.umi');
if (!process.env.PORT) {
	// max dev 通过环境变量 PORT 取端口，这里用于读取本地配置后注入
	process.env.PORT = String(port);
}

export default defineConfig({
	define: {
		OAUTH_ClientID: project.oauth.clientId,
		OAUTH_ClientSecret: project.oauth.clientSecret,
		OAUTH_Scope: project.oauth.scope,
		OidcConfigName: project.oauth.oidcConfigName,
		enableOidc: project.oauth.enableOidc,
		APP_TITLE: appTitle,
		APP_LAYOUT: project.layoutDefaults,
		APP_THEME_TOKEN: project.themeToken,
	},
	npmClient: 'yarn',
	routes: routes,
	// Vite 不再自动 polyfill Node 内置 querystring，这里先映射到现有浏览器库。@author nokecy
	alias: {
		querystring: require.resolve('query-string'),
		uuid: join(__dirname, '../node_modules/uuid/dist/index.js'),
		// 以下 alias 都仅在 vite 模式下启用：
		// - umi → exports.ts：vite/esbuild 对 Umi 默认无扩展 exports alias 偶发解析失败
		// - @@/plugin-*：vite 对目录导入弱于 Webpack，避免 EISDIR
		// 在 mako/webpack build 下启用反而有害：umiTempPath 硬编码为 src/.umi（dev 临时目录），
		// 但 build 实际入口在 src/.umi-production，结果 umi/@@ 等被强制指回 src/.umi，
		// 而入口和其他相对路径走 src/.umi-production，造成 plugin-model 等被打包两份，
		// 出现两份独立 Context，useModel 读不到 Provider 注入的 dispatcher。@author nokecy
		...(devBundler === 'vite'
			? {
				umi: join(umiTempPath, 'exports.ts'),
				'@@/plugin-model': join(umiTempPath, 'plugin-model/index.tsx'),
				'@@/plugin-appConfig': join(umiTempPath, 'plugin-appConfig/index.tsx'),
			}
			: {}),
	},
	...(devBundler === 'mako' ? { mako: {} } : {}),
	...(devBundler === 'vite' ? { vite: {} } : {}),
	devtool: enableSourceMap ? 'source-map' : false,
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
		'./plugins/openapi',
		'@alita/plugins/dist/keepalive',
		'@alita/plugins/dist/tabs-layout',
	],
	tabsLayout: {
		hasDropdown: true,
		hasFixedHeader: true,
	},
	keepalive: [/./],
	// history: { type: 'hash' },
	hash: false,
	fastRefresh: true,
	mfsu: devBundler === 'webpack' ? { strategy: mfsuStrategy, include: ['@formily/reactive-react'] } : false,
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
	// 项目使用 iconfontUrl 菜单图标，未使用 Umi Icon 语法；关闭 icons 插件避免 Vite 扫描半生成 .umi 文件。@author nokecy
	icons: false,
	model: { extraModels: appShellModels },
	esbuildMinifyIIFE: true,
	request: { dataField: '' },
	reactQuery: {},
	antd: {
		import: false,
		configProvider: {
			input: { autoComplete: 'off' },
			theme: {
				token: project.themeToken,
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
		// Vite 下 ProLayout 未稳定注入 iconfont 脚本，显式加载保证菜单 SVG symbol 存在。@author nokecy
		{ src: iconfontUrl, async: true },
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
	openAPI: project.openAPI,
});
