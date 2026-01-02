/**
 * KeepAlive 场景下的参数管理 Hook
 *
 * 用于处理 KeepAlive 页面的 URL 参数变化检测
 *
 * @param targetPath - 目标路由路径（用于判断当前页面是否激活）
 * @param paramKeys - 需要监听的参数键名数组
 * @returns { [key]: value, isActive: boolean, hasChanged: boolean }
 *
 * @example
 * const { id, isActive, hasChanged } = useKeepAliveParams('/app/detail', ['id']);
 */

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'umi';
import { parse } from 'querystring';

export function useKeepAliveParams<T extends string = string>(
  targetPath: string,
  paramKeys: T[]
): Record<T, string | undefined> & { isActive: boolean; hasChanged: boolean } {
  const location = useLocation();
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  const [isActive, setIsActive] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const prevParamsRef = useRef<Record<string, string | undefined>>({});

  useEffect(() => {
    // 检查当前路径是否匹配目标路径
    const currentIsActive = location.pathname.includes(targetPath);
    setIsActive(currentIsActive);

    if (!currentIsActive) {
      return;
    }

    // 解析当前 URL 参数
    const query = parse(location.search.substring(1));
    const newParams: Record<string, string | undefined> = {};

    // 提取需要的参数
    paramKeys.forEach((key) => {
      newParams[key] = query[key] as string | undefined;
    });

    // 检查参数是否变化
    const changed = paramKeys.some(
      (key) => prevParamsRef.current[key] !== newParams[key]
    );

    setParams(newParams);
    setHasChanged(changed);

    // 更新上一次的参数值
    prevParamsRef.current = newParams;
  }, [location.pathname, location.search, targetPath, paramKeys]);

  return {
    ...params,
    isActive,
    hasChanged,
  } as Record<T, string | undefined> & { isActive: boolean; hasChanged: boolean };
}
