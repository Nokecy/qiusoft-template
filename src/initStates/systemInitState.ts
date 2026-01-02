import { AbpApplicationConfigurationGetAsync } from '@/services/openApi/AbpApplicationConfiguration';
import { AbpMenuDefinitionGetAsync } from '@/services/openApi/AbpMenuDefinition';
import { BrandingGetAsync } from '@/services/openApi/Branding';
import { ProfileGetAsync } from '@/services/openApi/Profile';
import { layoutTop } from '../../config/defaultSettings';
import { MenuFavoritesGetListAsync } from '@/services/openApi/MenuFavorites';
import { FormSchemaGetAllPublishedSchemasAsync } from '@/services/openApi/FormSchema';

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

	// 解析头像
	const avatarUrl = profile?.extraProperties?.['AvatarUrl'] || "";

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
