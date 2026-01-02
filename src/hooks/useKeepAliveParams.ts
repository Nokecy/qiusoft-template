/**
 * useKeepAliveParams - 解决 KeepAlive 环境下路由参数问题的统一 Hook
 *
 * 问题背景：
 * 在 KeepAlive 缓存环境下，当从页面 A 切换到页面 B 时，页面 A 被缓存但其 useEffect 仍然活跃。
 * URL 变化会触发所有缓存页面的 location.search 依赖，导致页面 A 用页面 B 的参数去请求数据。
 *
 * 解决方案：
 * 1. 检查当前 URL 路径是否匹配页面自身路径
 * 2. 只有在路径匹配时才解析和返回参数
 * 3. 提供参数变化检测，避免重复请求
 *
 * 使用示例：
 * ```tsx
 * // 基础用法
 * const { id, isActive } = useKeepAliveParams('/appPdm/BomManagement/Bom/detail');
 *
 * // 获取多个参数
 * const { params, isActive, hasChanged } = useKeepAliveParams(
 *   '/appPdm/ProcessRoute/form',
 *   ['id', 'mode', 'version']
 * );
 * // params = { id: '4', mode: 'view', version: 'V1.0' }
 *
 * // 带回调的用法
 * useKeepAliveParams('/appPdm/Document/detail', ['id'], {
 *   onParamsChange: (params, prevParams) => {
 *     if (params.id && params.id !== prevParams?.id) {
 *       loadDetail(params.id);
 *     }
 *   }
 * });
 * ```
 */

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation } from 'umi';
import { parse } from 'querystring';

/** 参数对象类型 */
export type RouteParams = Record<string, string | undefined>;

/** Hook 配置选项 */
export interface UseKeepAliveParamsOptions {
  /**
   * 参数变化时的回调函数
   * @param params 当前参数
   * @param prevParams 上一次的参数
   */
  onParamsChange?: (params: RouteParams, prevParams: RouteParams | null) => void;

  /**
   * 是否区分大小写进行路径匹配，默认 false（不区分）
   */
  caseSensitive?: boolean;

  /**
   * 是否使用精确匹配，默认 false（使用 includes）
   * - false: 路径包含即可匹配
   * - true: 路径必须完全相等
   */
  exactMatch?: boolean;
}

/** Hook 返回值类型 */
export interface UseKeepAliveParamsResult {
  /** 所有解析的参数 */
  params: RouteParams;

  /** 当前页面是否处于活跃状态（URL 路径匹配） */
  isActive: boolean;

  /** 参数是否发生了变化 */
  hasChanged: boolean;

  /** 上一次的参数值 */
  prevParams: RouteParams | null;

  /** 便捷访问：id 参数 */
  id: string | undefined;

  /** 便捷访问：mode 参数 */
  mode: string | undefined;

  /** 便捷访问：version 参数 */
  version: string | undefined;
}

/**
 * 解决 KeepAlive 环境下路由参数问题的 Hook
 *
 * @param pagePath 页面路径（用于匹配判断）
 * @param paramKeys 需要获取的参数键名列表，默认 ['id']
 * @param options 配置选项
 * @returns 参数对象和状态信息
 */
export function useKeepAliveParams(
  pagePath?: string,
  paramKeys: string[] = ['id'],
  options: UseKeepAliveParamsOptions = {}
): UseKeepAliveParamsResult {
  const {
    onParamsChange,
    caseSensitive = false,
    exactMatch = false,
  } = options;

  const location = useLocation();
  const prevParamsRef = useRef<RouteParams | null>(null);
  const hasChangedRef = useRef(false);

  // 如果未提供 pagePath，使用当前路径（这意味着页面始终活跃）
  const effectivePagePath = pagePath || location.pathname;

  // 检查当前路径是否匹配页面路径
  const isActive = useMemo(() => {
    const currentPath = caseSensitive
      ? location.pathname
      : location.pathname.toLowerCase();
    const targetPath = caseSensitive
      ? effectivePagePath
      : effectivePagePath.toLowerCase();

    if (exactMatch) {
      return currentPath === targetPath;
    }
    return currentPath.includes(targetPath);
  }, [location.pathname, effectivePagePath, caseSensitive, exactMatch]);

  // 解析 URL 参数
  const params = useMemo<RouteParams>(() => {
    // 如果页面不活跃，返回空参数（避免用其他页面的参数）
    if (!isActive) {
      return {};
    }

    const query = parse(location.search.substring(1));
    const result: RouteParams = {};

    for (const key of paramKeys) {
      const value = query[key];
      result[key] = typeof value === 'string' ? value : undefined;
    }

    return result;
  }, [isActive, location.search, paramKeys]);

  // 检测参数是否变化
  const hasChanged = useMemo(() => {
    if (!isActive) {
      return false;
    }

    const prevParams = prevParamsRef.current;
    if (!prevParams) {
      return Object.keys(params).some(key => params[key] !== undefined);
    }

    return paramKeys.some(key => params[key] !== prevParams[key]);
  }, [isActive, params, paramKeys]);

  // 更新 hasChangedRef
  hasChangedRef.current = hasChanged;

  // 处理参数变化回调
  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (hasChanged && onParamsChange) {
      onParamsChange(params, prevParamsRef.current);
    }

    // 更新上一次参数
    prevParamsRef.current = { ...params };
  }, [isActive, hasChanged, params, onParamsChange]);

  return {
    params,
    isActive,
    hasChanged,
    prevParams: prevParamsRef.current,
    // 便捷属性
    id: params.id,
    mode: params.mode,
    version: params.version,
  };
}

/**
 * 简化版 Hook - 只关注 id 参数变化并触发加载
 *
 * @param pagePath 页面路径
 * @param loadFn 数据加载函数
 * @param deps 额外依赖项
 *
 * @example
 * ```tsx
 * useKeepAliveLoad(
 *   '/appPdm/BomManagement/Bom/detail',
 *   (id) => loadBomDetail(id)
 * );
 * ```
 */
export function useKeepAliveLoad(
  pagePath: string,
  loadFn: (id: string) => void | Promise<void>,
  deps: React.DependencyList = []
): { id: string | undefined; isActive: boolean } {
  const { id, isActive, hasChanged } = useKeepAliveParams(pagePath, ['id']);
  const loadFnRef = useRef(loadFn);
  loadFnRef.current = loadFn;

  useEffect(() => {
    if (isActive && hasChanged && id) {
      loadFnRef.current(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, hasChanged, id, ...deps]);

  return { id, isActive };
}

/**
 * 多参数版 Hook - 支持监听多个参数变化
 *
 * @param pagePath 页面路径
 * @param paramKeys 参数键名列表
 * @param loadFn 数据加载函数
 *
 * @example
 * ```tsx
 * useKeepAliveLoadWithParams(
 *   '/appPdm/ProcessRoute/form',
 *   ['id', 'mode'],
 *   (params) => {
 *     if (params.id) {
 *       loadData(params.id, params.mode);
 *     }
 *   }
 * );
 * ```
 */
export function useKeepAliveLoadWithParams(
  pagePath: string,
  paramKeys: string[],
  loadFn: (params: RouteParams) => void | Promise<void>
): { params: RouteParams; isActive: boolean } {
  const { params, isActive, hasChanged } = useKeepAliveParams(pagePath, paramKeys);
  const loadFnRef = useRef(loadFn);
  loadFnRef.current = loadFn;

  useEffect(() => {
    if (isActive && hasChanged) {
      loadFnRef.current(params);
    }
  }, [isActive, hasChanged, params]);

  return { params, isActive };
}

export default useKeepAliveParams;
