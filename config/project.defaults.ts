// 客户差异层的模板。这份文件在分发清单里标了 skipIfExists——
// 新客户开张时拷过去一次，之后母版再更新也不会覆盖它，因为它装的是**这个客户的事实**。
//
// 所以这里的值一律是占位，不是可用的默认值：留着别人的客户名或密钥，
// 新客户不改也能跑起来，等发现时它已经跟着进了交付包。宁可让它一眼就看出没填。
export const projectDefaults = {
  /** 客户名称，用作布局标题与站点名。**开张第一件事就是改掉它。** */
  appName: '待填写客户名称',
  appTitle: '',
  port: 8001,
  /**
   * OAuth 客户端标识与授权范围，必须与后端 OpenIddict 种子里注册的客户端一致，
   * 对不上表现为 /connect/token 返回 400 invalid_client。
   *
   * clientSecret 留空即公开客户端（密码模式 + 刷新令牌，无密钥），这是常见形态；
   * 后端确实配了机密客户端时才填，且**不要把真实密钥提交进仓库**。
   * oidc 两项供接入外部身份提供方的客户使用。
   */
  oauth: {
    clientId: '待填写客户端标识',
    clientSecret: '',
    scope: 'offline_access',
    oidcConfigName: '',
    enableOidc: false,
  },
  // 本客户启用的业务模块，路由表按此顺序组装。
  enabledModules: ['appLogin', 'appSYS'],
  /**
   * 不进路由表的页面前缀。本客户后端不提供对应接口时用它摘掉，
   * 这些页面连同它们引用的服务客户端都不会参与构建。
   *
   * 用于「上游子模块的页面领先于本客户后端」这类情况——改这里，不要去改共享子模块。
   * 例：['/appCommon/integration/', '/appWMS/inInstruction/purchaseInInstruction']
   */
  excludedRoutePrefixes: [] as string[],
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
  /**
   * 服务客户端的契约来源，`yarn openapi` 按这份清单生成 `src/services/<projectName>`。
   *
   * projectName 必须与业务模块里 `@/services/<名字>` 的引用一一对应，否则生成的目录
   * 对不上引用路径，构建期报 “Can't resolve”。每一项也要在后端网关上真实存在——
   * 配了后端没有的服务，生成出来的是一个永远调不通的空客户端（孤儿契约）。
   *
   * 下面是形态示例，开张时按本客户后端实际提供的服务重写。
   */
  openAPI: [
    {
      projectName: '待填写服务名',
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'http://待填写后端地址/swagger-json/待填写服务/swagger/v1/swagger.json',
      mock: false,
      isCamelCase: false,
    },
  ],
};
