/**
 * BOM 管理全局状态模型
 */

import { useState, useCallback } from 'react';
import type {
  BurnAbpPdmBomManagementBomsBomDto,
  BurnAbpPdmBomManagementBomsBomItemDto,
  BurnAbpPdmBomManagementMaterialEditionsMaterialEditionDto,
} from '@/services/pdm/typings';

export default () => {
  // BOM 列表缓存
  const [bomList, setBomList] = useState<BurnAbpPdmBomManagementBomsBomDto[]>([]);

  // 当前选中的 BOM
  const [currentBom, setCurrentBom] = useState<BurnAbpPdmBomManagementBomsBomDto | null>(null);

  // 当前版本
  const [currentVersion, setCurrentVersion] = useState<string>('');

  // 版本列表缓存 (key: materialCode)
  const [versionCache, setVersionCache] = useState<
    Map<string, BurnAbpPdmBomManagementMaterialEditionsMaterialEditionDto[]>
  >(new Map());

  // BOM 子项缓存 (key: bomId-version)
  const [itemsCache, setItemsCache] = useState<
    Map<string, BurnAbpPdmBomManagementBomsBomItemDto[]>
  >(new Map());

  // 更新 BOM 列表
  const updateBomList = useCallback((list: BurnAbpPdmBomManagementBomsBomDto[]) => {
    setBomList(list);
  }, []);

  // 选中 BOM
  const selectBom = useCallback((bom: BurnAbpPdmBomManagementBomsBomDto) => {
    setCurrentBom(bom);
  }, []);

  // 清除当前选中
  const clearCurrentBom = useCallback(() => {
    setCurrentBom(null);
    setCurrentVersion('');
  }, []);

  // 切换版本
  const changeVersion = useCallback((version: string) => {
    setCurrentVersion(version);
  }, []);

  // 获取缓存的版本列表
  const getCachedVersions = useCallback(
    (materialCode: string) => {
      return versionCache.get(materialCode) || [];
    },
    [versionCache]
  );

  // 缓存版本列表
  const cacheVersions = useCallback(
    (
      materialCode: string,
      versions: BurnAbpPdmBomManagementMaterialEditionsMaterialEditionDto[]
    ) => {
      setVersionCache((prev) => new Map(prev).set(materialCode, versions));
    },
    []
  );

  // 清除版本缓存
  const clearVersionCache = useCallback((materialCode?: string) => {
    if (materialCode) {
      setVersionCache((prev) => {
        const newCache = new Map(prev);
        newCache.delete(materialCode);
        return newCache;
      });
    } else {
      setVersionCache(new Map());
    }
  }, []);

  // 获取缓存的子项列表
  const getCachedItems = useCallback(
    (bomId: string, version: string) => {
      return itemsCache.get(`${bomId}-${version}`) || [];
    },
    [itemsCache]
  );

  // 缓存子项列表
  const cacheItems = useCallback(
    (
      bomId: string,
      version: string,
      items: BurnAbpPdmBomManagementBomsBomItemDto[]
    ) => {
      setItemsCache((prev) => new Map(prev).set(`${bomId}-${version}`, items));
    },
    []
  );

  // 清除子项缓存
  const clearItemsCache = useCallback((bomId?: string, version?: string) => {
    if (bomId && version) {
      setItemsCache((prev) => {
        const newCache = new Map(prev);
        newCache.delete(`${bomId}-${version}`);
        return newCache;
      });
    } else if (bomId) {
      setItemsCache((prev) => {
        const newCache = new Map(prev);
        Array.from(newCache.keys()).forEach((key) => {
          if (key.startsWith(`${bomId}-`)) {
            newCache.delete(key);
          }
        });
        return newCache;
      });
    } else {
      setItemsCache(new Map());
    }
  }, []);

  // 清除所有缓存
  const clearAllCache = useCallback(() => {
    setBomList([]);
    setCurrentBom(null);
    setCurrentVersion('');
    setVersionCache(new Map());
    setItemsCache(new Map());
  }, []);

  return {
    // State
    bomList,
    currentBom,
    currentVersion,
    versionCache,
    itemsCache,

    // 列表操作
    updateBomList,
    selectBom,
    clearCurrentBom,

    // 版本操作
    changeVersion,
    getCachedVersions,
    cacheVersions,
    clearVersionCache,

    // 子项操作
    getCachedItems,
    cacheItems,
    clearItemsCache,

    // 缓存操作
    clearAllCache,
  };
};
