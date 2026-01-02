import appSYS from './routeItems/appSYS.json';
import appSmartErp from './routeItems/appSmartErp.json';
import appLogin from './routeItems/appLogin.json';
import appWMS from "./routeItems/appWMS.json"
import appWorkflow from "./routeItems/appWorkflow.json"
import appCommon from "./routeItems/appCommon.json"
import appPdm from "./routeItems/appPdm.json"
import appCenter from "./routeItems/appCenter.json"
import appDataCopilot from "./routeItems/appDataCopilot.json"
const routes = [
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
	...appLogin,
	...appSmartErp,
	{
        "path": "appWMS",
        "component": "./appWMS",
        "name":"WMS仓储管理"
    },
    ...appWMS,
	{
        "path": "appWorkflow",
        "component": "./appWorkflow",
        "name":"工作流管理"
    },
    ...appWorkflow,
	{
		path: 'appDealer/index',
		component: './appSYS',
		name: '系统管理',
	},
	...appPdm,
	...appSYS,
	...appCenter,
	...appCommon,
	...appDataCopilot
];
export default routes;
