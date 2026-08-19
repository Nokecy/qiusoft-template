import { IApi } from 'umi';
import { withTmpPath } from '../withTmpPath';
import { join } from 'path';

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
import type { GlobalConfigPermissions } from '@nokecy/qc-ui';
import { UserTableLayoutInfoSaveAsync, UserTableLayoutInfoClearAsync } from '@/services/openApi/UserTableLayoutInfo';
import { TableSchemeApplyToGlobalAsync, TableSchemeResetToGlobalAsync, TableSchemeResetAllUsersAsync } from '@/services/openApi/TableScheme';
import { message } from 'antd';

// 权限编码常量 @author nokecy
const TABLE_SCHEME_MANAGE_GLOBAL_CONFIG = 'ExtraObjectForm.TableScheme.ManageGlobalConfig';

function Provider(props) {
	const { initialState } = useModel('@@initialState');
	const { tableLayout, extensibleColumns } = React.useMemo(() => tableLayoutFactory(initialState), [initialState]);

	// 获取当前用户信息
	const currentUser = React.useMemo(() => {
		return initialState?.configuration?.currentUser || null;
	}, [initialState]);

	// ========== 全局配置权限信息（传递给 AgGridPlus） @author nokecy ==========
	const globalConfigPermissions = React.useMemo<GlobalConfigPermissions>(() => {
		const grantedPolicies = initialState?.configuration?.auth?.grantedPolicies || {};
		const hasManageGlobalConfig = !!grantedPolicies[TABLE_SCHEME_MANAGE_GLOBAL_CONFIG];
		return {
			canApplyToGlobal: hasManageGlobalConfig,
			canResetAllUsers: hasManageGlobalConfig,
		};
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

		...schemeManager,  // 展开方案管理状态和方法

		// ========== 新增：全局配置权限信息 @author nokecy ==========
		globalConfigPermissions,

		// ========== 新增：全局配置操作方法（覆盖 schemeManager 中的方法） @author nokecy ==========

		/** 将方案应用到全局（管理员操作） */
		applySchemeToGlobal: async (gridId: string, schemeId?: string) => {
			// 如果未传入 schemeId，从当前激活方案获取
			const targetSchemeId = schemeId || schemeManager.currentSchemes?.[gridId]?.columnSchemeId;
			if (!targetSchemeId) {
				message.error('没有可应用的方案');
				return;
			}
			try {
				console.log(\`[Table Scheme] 应用到全局: \${gridId} - \${targetSchemeId}\`);
				const result = await TableSchemeApplyToGlobalAsync({
					gridId,
					sourceSchemeId: targetSchemeId,
				});
				if (result.success) {
					message.success(result.message || '已应用到全局配置');
					// 刷新方案列表
					schemeManager.refreshSchemes?.();
				} else {
					message.error(result.message || '应用到全局失败');
				}
				return result.globalSchemeId;
			} catch (error: any) {
				console.error('[Table Scheme] 应用到全局失败:', error);
				message.error(error.message || '应用到全局失败');
				throw error;
			}
		},

		/** 重置当前用户配置，回退到全局配置 */
		resetToGlobal: async (gridId: string) => {
			try {
				console.log(\`[Table Scheme] 重置为全局配置: \${gridId}\`);
				const result = await TableSchemeResetToGlobalAsync({ gridId });
				if (result.success) {
					message.success(result.message || '已重置为全局配置');
					// 刷新方案列表
					schemeManager.refreshSchemes?.();
				} else {
					message.error(result.message || '重置失败');
				}
			} catch (error: any) {
				console.error('[Table Scheme] 重置为全局配置失败:', error);
				message.error(error.message || '重置失败');
				throw error;
			}
		},

		/** 重置所有用户配置（管理员操作） */
		resetAllUsers: async (gridId: string) => {
			try {
				console.log(\`[Table Scheme] 重置所有用户配置: \${gridId}\`);
				const result = await TableSchemeResetAllUsersAsync({ gridId });
				if (result.success) {
					message.success(result.message || \`已重置所有用户配置，影响 \${result.affectedUsers || 0} 个用户\`);
					// 刷新方案列表
					schemeManager.refreshSchemes?.();
				} else {
					message.error(result.message || '重置失败');
				}
			} catch (error: any) {
				console.error('[Table Scheme] 重置所有用户配置失败:', error);
				message.error(error.message || '重置失败');
				throw error;
			}
		},

	}), [tableLayout, extensibleColumns, schemeManager, globalConfigPermissions]);

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
