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
