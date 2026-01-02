import AppLogo from '@/layouts/components/appLogo';
import RightContent from '@/layouts/components/RightContent';
import MenuItem from '@/layouts/menuItem';
import { RequestConfig } from '@@/plugin-request/request';
import { PreviewText } from '@formily/antd-v5';
import { message } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { getInitState, RuntimeAntdConfig } from 'umi';
// import EntityObjectRuntimeListPage from './pages/appSYS/appExtraObjectForm/entityObjectRuntime/list';
import { AxiosError, history, Link } from 'umi';
import { showErrorModal } from './components';


const loginPath = '/appLogin';
const forgetPath = '/appLogin/forgetPassword';
const emailPath = '/appLogin/emailConfirmation';

let extraRoutes: any[] = [];

const getLocale = () => {
	return Cookies.get('Accept-Language') === 'en' ? 'en-US' : 'zh-CN';
};

export const rootContainer = container => {
	return React.createElement(PreviewText.Placeholder, { value: '无' }, container);
};

// export function patchClientRoutes({ routes }) {
// 	//根据 extraRoutes 对 routes 做一些修改
// 	extraRoutes?.forEach((extraRoute: any) => {
// 		let lastIndex = extraRoute.url.lastIndexOf('/');
// 		let url = extraRoute.url.substring(0, lastIndex);
// 		routes[0].children[0].children.push({
// 			path: `${url}/:objectEntityName`,
// 			name: extraRoute.name,
// 			element: <EntityObjectRuntimeListPage />,
// 		});
// 	});
// }

// export function render(oldRender) {

// 	//@ts-ignore

// }

export function render(oldRender) {
	/**
	 * 项目已切到 hash 路由（见 `config/config.ts`），但用户可能会：
	 * - 直接在地址栏输入浏览器路由（例如 `/appPdm/ProjectManagement/TaskBreakdown`）
	 * - 或者从收藏夹/外部系统拿到不带 `#` 的旧链接
	 *
	 * 这种情况下刷新会导致资源路径/路由解析异常，表现为 `umi.css` 返回 HTML、控制台出现 `Unexpected token '<'` 等。
	 * 这里做一次兜底：把“浏览器路由”自动转换为 hash 路由。
	 */
	try {
		const { pathname, search, hash } = window.location;
		if (pathname && pathname !== '/' && (!hash || hash === '#')) {
			// 例如：/appPdm/xxx -> /#/appPdm/xxx
			window.history.replaceState(null, '', `/#${pathname}${search || ''}`);
		}
	} catch (e) {
		// ignore
	}

	oldRender();
}

export const locale = {
	getLocale() {
		return getLocale();
	},
};

export async function getInitialState() {
	const initStateData = await getInitState();
	return { ...initStateData };
}

export const layout = ({ initialState }) => {
	return {
		...initialState?.layout,
		title: initialState?.branding.appName,
		logo: () => {
			return <AppLogo />;
		},
		pure: !initialState?.configuration.currentUser.name,
		onPageChange: () => {
			const { location } = history;
			// 如果没有登录，重定向到 login
			if (!enableOidc && !initialState?.configuration.currentUser.userName && !(location.pathname === loginPath || location.pathname === forgetPath || location.pathname === emailPath)) {
				history.push(loginPath);
			}
		},
		disableContentMargin: false,
		locale: false,
		menu: { locale: false },
		siderMenuType: 'sub',
		siderWidth: 208,
		style: { height: '100vh' },
		token: {
			pageContainer: {
				paddingBlockPageContainerContent: 0,
				paddingInlinePageContainerContent: 12,
				colorBgPageContainer: 'rgb(242 243 245)',
				// colorBgPageContainerFixed: '#fff',
			},
			header: {
				colorBgHeader: '#292f33',
				colorHeaderTitle: '#fff',
				colorTextMenu: '#dfdfdf',
				colorTextMenuSecondary: '#dfdfdf',
				colorTextMenuSelected: '#fff',
				colorBgMenuItemSelected: '#22272b',
				colorTextMenuActive: 'rgba(255,255,255,0.85)',
				colorTextRightActionsItem: '#dfdfdf',
			},
			colorTextAppListIconHover: '#fff',
			colorTextAppListIcon: '#dfdfdf',
			sider: {
				// colorMenuBackground: '#fff',
				// colorMenuItemDivider: '#dfdfdf',
				// colorBgMenuItemHover: '#f6f6f6',
				// colorTextMenu: '#595959',
				colorTextMenuSelected: '#00b96b',
				colorTextMenuItemHover: '#00b96b',
				// colorTextMenuActive: '#242424',
				// colorBgMenuItemCollapsedHover: '#242424',
			},
		},
		rightRender: (initialState: any) => {
			if (initialState) {
				return <RightContent />;
			}
			return null;
		},
		headerRender: (props, defaultDom) => {
			return <div style={{}}> {defaultDom} </div>;
		},
		footerRender: false,
		breadcrumbRender: (routers = []) => {
			return [
				{
					path: '/',
					breadcrumbName: '首页',
				},
				...routers,
			];
		},
		menuDataRender: () => initialState?.menuData,
		menuItemRender: (renderItemProps, defaultDom, menuProps) => <MenuItem {...renderItemProps} defaultDom={defaultDom} menuProps={menuProps} />,
	};
};

export const request: RequestConfig = {
  headers: {
          'Accept-Language': Cookies.get('Accept-Language') || 'zh-Hans',
  },
  requestInterceptors: [
          config => {
                  //@ts-ignore
                  const baseUrl = config.baseURL ? config.baseURL : window.serverUrl.apiServerUrl;
                  const apiUrl = config.url.startsWith('/') ? config.url : `/${config.url}`;
                  const url = `${baseUrl}${apiUrl}`;

                  const accessToken = sessionStorage.getItem('access_token');
                  const organizationCode = localStorage.getItem('_organizationCode');
                  const normalizedOrganizationCode =
                          organizationCode && organizationCode !== 'ALL' ? organizationCode : '';

                  const headers = {
                          ...config.headers,
                          Authorization: `Bearer ${accessToken}`
                  }
                  const skipOrganization =
                          headers['x-skip-organization'] ||
                          headers['X-Skip-Organization'] ||
                          //@ts-ignore
                          config.skipOrganization;
                  if (skipOrganization) {
                          //@ts-ignore
                          delete headers['x-skip-organization'];
                          //@ts-ignore
                          delete headers['X-Skip-Organization'];
                          return { ...config, headers: headers, url };
                  }
                  if (normalizedOrganizationCode) {
                          //@ts-ignore
                          headers._organizationCode = normalizedOrganizationCode;
                  } else if (headers._organizationCode) {
                          //@ts-ignore
                          delete headers._organizationCode;
                  }
                  return { ...config, headers: headers, url };
          },
  ],
	errorConfig: {
		errorHandler: (error, opts) => {
			if (opts?.skipErrorHandler) throw error;
			//@ts-ignore
			if (error.response?.status == 401) {
				// 如果不是登录页面，执行
				const { location } = history;
				if (!enableOidc && !(location.pathname === loginPath || location.pathname === forgetPath || location.pathname === emailPath)) {
					history.push(loginPath);
				}
			} else {
				//@ts-ignore
				const errorRes = error?.response?.data;


				if (error?.response?.status === 400) {
					const validationErrors = error?.response?.data?.error?.validationErrors || [];
					if (validationErrors.length > 0) {
						showErrorModal(validationErrors);
					}
					return;
				}

				//@ts-ignore
				if (errorRes?.error) {
					//@ts-ignore
					message.error(errorRes?.error?.message);
					return;
				}
			}
		},
	},
};

export const antd: RuntimeAntdConfig = memo => {
	memo.theme ||= {};
	// memo.theme.algorithm = theme.compactAlgorithm;
	return memo;
};
