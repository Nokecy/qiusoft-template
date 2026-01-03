import appSYS from './routeItems/appSYS.json';

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
  {
    path: '/appLogin',
    component: './appLogin',
    name: '登录',
    xLayout: false,
  },
  {
    path: '/appLogin/forgetPassword',
    component: './appLogin/forgetPassword',
    name: '找回密码',
    xLayout: false,
  },
  {
    path: '/appLogin/emailConfirmation',
    component: './appLogin/emailConfirmation',
    name: '确认邮箱',
    xLayout: false,
  },
  {
    path: 'appDealer/index',
    component: './appSYS',
    name: '系统管理',
  },
  ...appSYS,
];

export default routes;
