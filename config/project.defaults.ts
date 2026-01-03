export const projectDefaults = {
  appName: '财门',
  appTitle: '',
  port: 8001,
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
