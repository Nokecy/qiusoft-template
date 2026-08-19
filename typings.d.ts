declare module 'dva-model-extend';
declare module 'lodash.debounce';
declare module 'antd-pro-merge-less';
declare module 'braft-editor';
declare module 'fr-generator';

declare const OAUTH_ClientID: string;
declare const OAUTH_ClientSecret: string;
declare const OAUTH_Scope: string;
// 外部身份提供方接入配置，由客户配置在构建期注入。@author nokecy
declare const OidcConfigName: string;
declare const enableOidc: boolean;

declare const APP_TITLE: string;
// 布局默认设置，由客户配置在构建期注入。@author nokecy
declare const APP_LAYOUT: Record<string, any>;
// 主题令牌，由客户配置在构建期注入。脱离根 ConfigProvider 的命令式弹窗用它取主题色。@author nokecy
declare const APP_THEME_TOKEN: Record<string, any>;


declare var APP_TYPE: string;
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.json";
