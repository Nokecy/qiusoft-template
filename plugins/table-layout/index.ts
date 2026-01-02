import { IApi } from 'umi';
import { Mustache, lodash, winPath } from '@umijs/utils';
import { withTmpPath } from '../withTmpPath';
import { readFileSync } from 'fs';
import { join, relative } from 'path';

export default (api: IApi) => {
	api.describe({
		key: 'table-layout',
		config: {
			schema(joi) {
				return joi.object();
			},
		},
		enableBy: api.EnableBy.register,
	});

	api.onStart(() => { });

	api.onGenerateFiles(async () => {
		// runtime.tsx
		api.writeTmpFile({
			path: 'runtime.tsx',
			content: `
import React from 'react';
import tableLayoutFactory from '@/tableLayout';
import { useModel } from '@@/plugin-model';
import { GridPlusContext, BackendApiSchemeAdapter, useSchemeManager } from '@nokecy/qc-ui';
import { UserTableLayoutInfoSaveAsync, UserTableLayoutInfoClearAsync } from '@/services/openApi/UserTableLayoutInfo';

function Provider(props) {
	const { initialState } = useModel('@@initialState');
	const { tableLayout, extensibleColumns } = React.useMemo(() => tableLayoutFactory(initialState), [initialState]);

	// 获取当前用户信息
	const currentUser = React.useMemo(() => {
		return initialState?.configuration?.currentUser || null;
	}, [initialState]);

	// ========== 创建后端存储适配器 ==========
	const adapter = React.useMemo(() => {
		return new BackendApiSchemeAdapter({
			// API 基础路径 - 从运行时配置获取
			apiBaseUrl: window.serverUrl?.apiServerUrl || '',

			// 获取认证令牌
			getToken: () => {
				return sessionStorage.getItem('access_token') || null;
			},

			// 获取用户ID - 用于多用户数据隔离
			getUserId: () => {
				return currentUser?.id || currentUser?.userId || null;
			},

			// 请求超时时间（毫秒）
			timeout: 10000,

			// 最大重试次数
			maxRetries: 3,

			// 重试延迟（毫秒）
			retryDelay: 1000,

			// 启用调试日志（仅开发环境）
			enableDebugLog: process.env.NODE_ENV === 'development',
		});
	}, [currentUser]);

	// ========== 使用 useSchemeManager Hook 创建方案管理器 ==========
	const schemeManager = useSchemeManager({
		adapter,
		autoLoad: true,
		showErrorMessage: true,
		currentUserId: currentUser?.id || currentUser?.userId || null,
	});

	// GridPlusContext 配置值
	const contextValue = React.useMemo(() => ({
		// ========== 基础配置 ==========

		// 扩展列配置
		extensibleColumns,

		// 查询表单项（空数组，根据实际需求填充）
		queryFormItems: [],

		// ========== 旧版 table-layout 兼容接口（向后兼容） ==========

		columnState: tableLayout,

		onSaveColumnState: (gridKey: string, columnState: any[]) => {
			UserTableLayoutInfoSaveAsync({
				tableKey: gridKey,
				layoutContext: JSON.stringify(columnState),
				providerName: "User"
			}).then(() => {
				console.log(\`[Table Layout] 已保存用户列布局: \${gridKey}\`);
			}).catch((error) => {
				console.error(\`[Table Layout] 保存失败: \${gridKey}\`, error);
			});
		},

		applyToGlobal: (gridKey: string) => {
			UserTableLayoutInfoSaveAsync({
				tableKey: gridKey,
				layoutContext: JSON.stringify(tableLayout?.[gridKey] ?? []),
				providerName: "Global"
			}).then(() => {
				console.log(\`[Table Layout] 已应用到全局: \${gridKey}\`);
			}).catch((error) => {
				console.error(\`[Table Layout] 应用全局失败: \${gridKey}\`, error);
			});
		},

		resetCurrent: (gridKey: string) => {
			UserTableLayoutInfoClearAsync({
				tableKey: gridKey,
				providerName: "User"
			}).then(() => {
				console.log(\`[Table Layout] 已重置用户配置: \${gridKey}\`);
			}).catch((error) => {
				console.error(\`[Table Layout] 重置失败: \${gridKey}\`, error);
			});
		},

		resetAll: (gridKey: string) => {
			UserTableLayoutInfoClearAsync({
				tableKey: gridKey,
				providerName: "Global"
			}).then(() => {
				console.log(\`[Table Layout] 已重置全局配置: \${gridKey}\`);
			}).catch((error) => {
				console.error(\`[Table Layout] 重置全局失败: \${gridKey}\`, error);
			});
		},

		// ========== 新增：集中式方案管理（通过 useSchemeManager Hook） ==========

		...schemeManager  // 展开方案管理状态和方法

	}), [tableLayout, extensibleColumns, schemeManager]);

	return (
		<GridPlusContext.Provider value={contextValue}>
			{props.children}
		</GridPlusContext.Provider>
	);
}

export function innerProvider(container) {
  return <Provider>{ container }</Provider>;
}
      `,
		});
	});

	api.addRuntimePlugin(() => {
		return [withTmpPath({ api, path: 'runtime.tsx' })];
	});

	api.addTmpGenerateWatcherPaths(() => [join(api.paths.absSrcPath, 'tableLayout.js'), join(api.paths.absSrcPath, 'tableLayout.js')]);
};
