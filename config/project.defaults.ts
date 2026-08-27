export const projectDefaults = {
  appName: '财门',
  appTitle: '',
  port: 8001,
  // OAuth 客户端标识与授权范围。oidc 两项供接入外部身份提供方的客户使用。
  oauth: {
    clientId: 'WMS_App',
    clientSecret: '1q2w3e*',
    scope: 'offline_access',
    oidcConfigName: '',
    enableOidc: false,
  },
  // 本客户启用的业务模块，路由表按此顺序组装。
  enabledModules: ['appLogin', 'appSYS'],
  // 布局默认设置。主题色不在此声明，唯一来源是 themeToken.colorPrimary。
  layoutDefaults: {
    iconfontUrl: '/font/iconfont.js',
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
    navTheme: 'light',
    contentWidth: 'Fluid',
    siderMenuType: 'group',
    fixedHeader: true,
  },
  themeToken: {
    colorPrimary: '#00b96b',
    colorInfo: '#00b96b',
    fontFamily: "'microsoft yahei', Helvetica, Arial",
    fontSize: 12,
    borderRadius: 4,
    inputNumber: {
      lineHeight: 'inherit',
    },
  },
  // 首页仪表板。默认上首页的小程序由各小程序自己在元数据里声明（home.default），
  // 这里只放本客户的覆盖：include 额外要的，exclude 不要的（exclude 优先）。
  // 填的是小程序的注册名（文件名派生，如 RecentVisits），不是元数据里的中文名。
  dashboard: {
    home: {
      include: [] as string[],
      exclude: [] as string[],
    },
  },
  // 登录页外观与功能。图形与版式代码在应用壳里，本客户的取值放这儿。
  login: {
    /** 版式：split 两栏品牌页 | centered 居中单卡（无品牌图的客户用它，版面不塌） */
    layout: 'split' as 'split' | 'centered',
    /** 品牌名，留空取站点标题 */
    brandName: '',
    /** 品牌面板副标题，留空不渲染 */
    subtitle: '',
    /** 以下三项是 public 下的 URL 而非打包资源，留空则该元素不渲染 */
    logoUrl: '',
    backgroundUrl: '',
    /** 站点图标：留空用应用壳自带的图形并填入本客户主题色；要用自己的 logo 就填 public 下的 URL */
    faviconUrl: '',
    /** 插画：留空用应用壳自带的产线示意；填 '-' 表示不要插画 */
    illustrationUrl: '',
    features: {
      /** 组织选择：登录时按账号拉取组织列表并写入 _organizationCode */
      organization: false,
      /** 注册入口 */
      register: false,
      /** 忘记密码入口 */
      forgetPassword: true,
      /** 语言切换 */
      langSwitch: true,
    },
    footer: {
      copyright: '© 深圳市秋创软件有限公司',
      icp: '',
      icpUrl: 'https://beian.miit.gov.cn/',
    },
    /** ABP 账号接口的应用名，决定找回密码与邮箱确认邮件回链的域名解析 */
    accountAppName: 'React',
  },
  openAPI: [
    {
      projectName: 'smarterp',
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'http://192.168.2.2:10010/swagger-json/SmartErpService/swagger/v1/swagger.json',
      mock: false,
      isCamelCase: false,
    },
    {
      projectName: 'pdm',
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'http://192.168.2.2:10010/swagger-json/PdmService/swagger/v1/swagger.json',
      mock: false,
      isCamelCase: false,
    },
  ],
};
