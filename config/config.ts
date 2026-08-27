import { existsSync, readFileSync, readdirSync } from 'fs';
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
// 站点图标：图形取自应用壳（与登录页插画同形），颜色由客户主题色派生后在构建期填入，
// 生成 data URI 直接挂到 head。四个客户开箱即有图标且各是各的颜色，不必各自维护一份 favicon 文件。
// 客户要用自己的 logo，在客户配置里填 login.faviconUrl 覆盖。@author nokecy
const shadeColor = (hex: string, ratio: number) => {
	const raw = hex.replace('#', '');
	const full = raw.length === 3 ? raw.split('').map(c => c + c).join('') : raw;
	const num = parseInt(full, 16);
	if (Number.isNaN(num)) {
		return hex;
	}
	const channel = (shift: number) => {
		const c = (num >> shift) & 255;
		const next = ratio >= 0 ? c + (255 - c) * ratio : c * (1 + ratio);
		return Math.max(0, Math.min(255, Math.round(next)));
	};
	return `#${[channel(16), channel(8), channel(0)].map(c => c.toString(16).padStart(2, '0')).join('')}`;
};

const faviconTemplatePath = join(appShellPath, 'assets/favicon.svg');
const primaryColor = project.themeToken?.colorPrimary || '#1677ff';
const generatedFavicon = existsSync(faviconTemplatePath)
	? `data:image/svg+xml,${encodeURIComponent(
			readFileSync(faviconTemplatePath, 'utf8')
				// 注释与缩进只对读模板的人有用，编码进 data URI 会白白撑大每个页面的 head
				.replace(/<!--[\s\S]*?-->/g, '')
				.replace(/\s+/g, ' ')
				.trim()
				.replace(/\{\{colorLight\}\}/g, shadeColor(primaryColor, 0.22))
				.replace(/\{\{colorBase\}\}/g, primaryColor)
				.replace(/\{\{colorDark\}\}/g, shadeColor(primaryColor, -0.22)),
		)}`
	: '';
const favicons = [project.login?.faviconUrl || generatedFavicon].filter(Boolean);

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
		APP_LOGIN: project.login,
		APP_DASHBOARD: project.dashboard,
		// 顶栏 logo 的兜底图形，与站点图标同源同色。服务端 branding 没配 logoUrl 时用它，
		// 免得顶栏挂一个没有 src 的 img（浏览器会画成一个空框）。@author nokecy
		APP_BRAND_MARK: generatedFavicon,
	},
	favicons,
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
		// 服务端地址是全局运行时配置，必须先于 umi bundle 执行，因此同步加载不能加 async。
		// 加 async 时登录后的 window.location.replace 整页重载会让 umi.js 先命中缓存执行，
		// getInitialState 抢在赋值前发请求，接口退到同源打成 404。@author nokecy
		{ src: `/config/config.js` },
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
