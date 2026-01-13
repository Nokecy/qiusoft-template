import { AbpApplicationConfigurationGetAsync } from '@/services/openApi/AbpApplicationConfiguration';
import { AbpMenuDefinitionGetAsync } from '@/services/openApi/AbpMenuDefinition';
import { BrandingGetAsync } from '@/services/openApi/Branding';
import { ProfileGetAsync } from '@/services/openApi/Profile';
import { layoutTop } from '../../config/defaultSettings';
import { MenuFavoritesGetListAsync } from '@/services/openApi/MenuFavorites';
import { FormSchemaGetAllPublishedSchemasAsync } from '@/services/openApi/FormSchema';
import Cookies from 'js-cookie';

const filterMenuData = (menuData: any[] | undefined) => {
	if (!menuData) {
		return [];
	}
	return menuData
		.filter(item => item.name)
		.map(item => {
			// make dom
			const ItemDom: any = getSubMenu(item);
			return ItemDom;
		})
		.filter(item => item);
};

const getSubMenu = (item: any | undefined) => {
	if (item && item.items && item.items.length > 0) {
		return {
			...item,
			path: item && (item.url || item.name),
			name: item.displayName,
			children: filterMenuData(item.items),
		};
	}
	return {
		...item,
		path: item && item.url,
		key: item && item.url,
		name: item && item.displayName,
	};
};

const converAuth = (auth: any) => {
	Object.keys(auth.grantedPolicies!).forEach(key => {
		auth.grantedPolicies![key] = auth.grantedPolicies![key] ? auth.grantedPolicies![key] : false;
	});
};

const getInitialState = async () => {
	// 检查用户是否已设置语言偏好，如果没有则使用 ABP 系统默认语言 @author nokecy
	const currentLanguage = Cookies.get('Accept-Language');

	if (!currentLanguage) {
		try {
			// 从 ABP application-configuration API 获取系统默认语言设置
			const abpConfig = await AbpApplicationConfigurationGetAsync({});
			const defaultLanguage = abpConfig?.setting?.values?.['Abp.Localization.DefaultLanguage'];
			if (defaultLanguage) {
				// 将 ABP 语言代码转换为标准 locale 代码存储到 Cookie @author nokecy
				// ABP 格式: zh-Hans, en -> 标准格式: zh-CN, en-US
				const localeCode = defaultLanguage === 'zh-Hans' ? 'zh-CN' :
				                   defaultLanguage === 'en' ? 'en-US' : defaultLanguage;
				Cookies.set('Accept-Language', localeCode, { expires: 365 });
				console.log(`[Language] 已设置系统默认语言: ${defaultLanguage} -> ${localeCode}`);
				// 语言变更后刷新页面以获取正确的本地化数据 @author nokecy
				window.location.reload();
				return {};
			}
		} catch (error) {
			console.error('[Language] 获取默认语言失败:', error);
		}
	}

	const results = await Promise.allSettled([
		ProfileGetAsync({}),
		AbpApplicationConfigurationGetAsync({}),
		BrandingGetAsync({}),
		AbpMenuDefinitionGetAsync({}),
		MenuFavoritesGetListAsync({}),
		FormSchemaGetAllPublishedSchemasAsync(),
	]);

	// 解析 Promise 结果
	const [profile, configuration, branding, menus, favorites, dynamicSchemasResult]: any = results.map(result =>
		result.status === "fulfilled" ? result.value : null
	);

	// 处理失败请求
	results.forEach((result, index) => {
		if (result.status === "rejected") {
			console.error(`请求 ${index + 1} 失败:`, result.reason);
		}
	});

	// 处理菜单数据
	const menuData = menus ? filterMenuData(menus.items) : [];

	// 处理授权信息
	if (configuration) converAuth(configuration.auth!);

	// 解析头像，如果是相对路径则拼接服务器基础 URL @author nokecy
	const rawAvatarUrl = profile?.extraProperties?.['AvatarUrl'] || "";
	const apiServerUrl = (window as any).serverUrl?.apiServerUrl || '';
	const avatarUrl = rawAvatarUrl
		? (rawAvatarUrl.startsWith('http') ? rawAvatarUrl : `${apiServerUrl}${rawAvatarUrl}`)
		: "";

	// 处理动态 Schema 数据
	const dynamicSchemas = dynamicSchemasResult || {
		schemas: {},
		fetchedAt: new Date().toISOString(),
	};
	if (dynamicSchemasResult) {
		console.log(`[DynamicSchema] 已加载 ${Object.keys(dynamicSchemasResult.schemas || {}).length} 个后端 Schema`);
	}

	return {
		badges: [],
		avatarUrl,
		configuration,
		profile,
		branding,
		menuData,
		layout: layoutTop,
		isLogin: true,
		formEdit: false,
		dataDictions: [],
		favorites,
		dynamicSchemas,
	};
};

export default getInitialState;
