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
    path: 'appDealer/index',
    component: './appSYS',
    name: '系统管理',
  },
  ...appSYS,
];

export default routes;
