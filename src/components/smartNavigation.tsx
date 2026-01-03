import React, { useContext } from 'react';
import { history, useLocation } from 'umi';
import { Modal, message } from 'antd';
import { KeepAliveContext } from '@/.umi/plugin-keepalive/context';

/**
 * 智能导航配置接口
 */
export interface SmartNavigationConfig {
  /** 目标路径 */
  targetPath: string;
  /** 新的参数对象 */
  newParams?: Record<string, any>;
  /** route state */
  state?: Record<string, any>;
  /** 确认对话框标题 */
  confirmTitle?: string;
  /** 确认对话框内容模板，支持变量：{currentId}、{newId} */
  confirmContent?: string;
  /** 确认按钮文本 */
  okText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 是否启用调试日志 */
  debug?: boolean;
}

/**
 * 智能导航Hook - 基于KeepAlive的智能tab切换
 * 
 * 功能特点：
 * 1. 检测已打开的tab，避免重复创建
 * 2. 参数不同时提示用户确认切换
 * 3. 自动更新KeepAlive缓存的location信息
 * 4. 支持自定义确认对话框
 * 
 * @returns smartNavigate函数
 */
export const useSmartNavigation = () => {
  const location = useLocation();
  const keepAliveContext = useContext(KeepAliveContext);

  const smartNavigate = (config: SmartNavigationConfig) => {
    const {
      targetPath,
      newParams = {},
      state,
      confirmTitle = '切换编辑记录确认',
      confirmContent = '检测到已有该表单页面打开编辑记录 {currentId}，是否要切换到编辑记录 {newId}？',
      okText = '是，切换',
      cancelText = '否，取消',
      debug = false
    } = config;

    // 构建新的URL
    const searchParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const newUrl = searchParams.toString() ? `${targetPath}?${searchParams.toString()}` : targetPath;

    // 检查KeepAlive上下文是否可用
    if (!keepAliveContext || !keepAliveContext.keepElements) {
      if (debug) console.log('[SmartNavigation] KeepAlive上下文不可用，直接跳转');
      history.push({
        pathname: targetPath,
        search: searchParams.toString() ? `?${searchParams.toString()}` : '',
        state
      });
      return;
    }

    const { keepElements } = keepAliveContext;
    const targetPathLower = targetPath.toLowerCase();

    if (debug) {
      console.log('[SmartNavigation] 智能导航检查:', {
        targetPath: targetPathLower,
        newParams,
        newUrl,
        currentPath: location.pathname.toLowerCase(),
        openedTabs: Object.keys(keepElements.current)
      });
    }

    // 对于编辑页面，检查是否已有相同表单页面打开
    if (newParams.id) {
      // 检查是否已有该表单页面打开
      const existingTab = keepElements.current[targetPathLower];
      
      if (existingTab) {
        // 检查当前是否正在该表单页面
        const isCurrentlyOnTargetPage = location.pathname.toLowerCase() === targetPathLower;
        
        if (isCurrentlyOnTargetPage) {
          // 当前就在目标表单页面，比较当前URL参数
          const currentParams = new URLSearchParams(location.search);
          const currentId = currentParams.get('id');

          if (debug) {
            console.log('[SmartNavigation] 当前在目标表单页面，参数比较:', {
              currentId,
              newId: newParams.id,
              currentUrl: location.pathname + location.search
            });
          }

          // 如果ID不同，提示用户
          if (currentId && currentId !== newParams.id) {
            const finalContent = confirmContent
              .replace('{currentId}', currentId.slice(-8))
              .replace('{newId}', newParams.id.toString().slice(-8));

            Modal.confirm({
              title: confirmTitle,
              content: finalContent,
              okText,
              cancelText,
              onOk() {
                if (debug) console.log('[SmartNavigation] 用户选择切换到新记录');
                
                // 更新KeepAlive中缓存的location信息
                updateTabLocation(targetPathLower, targetPath, searchParams, existingTab, state);
                
                history.push({
                  pathname: targetPath,
                  search: searchParams.toString() ? `?${searchParams.toString()}` : '',
                  state
                });
              },
              onCancel() {
                if (debug) console.log('[SmartNavigation] 用户选择保持当前页面');
                message.info('已取消切换，保持当前页面');
              }
            });
            return;
          }

          // 如果ID相同，直接跳转（无需提示）
          if (currentId === newParams.id) {
            if (debug) console.log('[SmartNavigation] 跳转到相同记录，无需提示');
            return;
          }
        } else {
          // 不在目标表单页面，但目标页面已存在，获取已存在的表单参数
          const existingUrl = existingTab.location ? (existingTab.location.pathname + existingTab.location.search) : '';
          const existingParams = new URLSearchParams(existingTab.location?.search || '');
          const existingId = existingParams.get('id');
          
          if (debug) {
            console.log('[SmartNavigation] 目标表单页面已存在但不是当前页面，检查参数:', {
              existingId,
              newId: newParams.id,
              existingUrl,
              newUrl
            });
          }
          
          // 比较已存在的tab的ID和新ID，如果不同则提示用户
          if (existingId && existingId !== newParams.id) {
            const finalContent = confirmContent
              .replace('{currentId}', existingId.slice(-8))
              .replace('{newId}', newParams.id.toString().slice(-8));

            Modal.confirm({
              title: confirmTitle,
              content: finalContent,
              okText,
              cancelText,
              onOk() {
                if (debug) console.log('[SmartNavigation] 用户选择切换到新表单页面');
                
                // 更新KeepAlive中缓存的location信息
                updateTabLocation(targetPathLower, targetPath, searchParams, existingTab, state);
                
                history.push({
                  pathname: targetPath,
                  search: searchParams.toString() ? `?${searchParams.toString()}` : '',
                  state
                });
              },
              onCancel() {
                if (debug) console.log('[SmartNavigation] 用户选择取消切换');
                message.info('已取消切换');
              }
            });
            return;
          } else {
            // ID相同，直接切换到已有tab
            if (debug) console.log('[SmartNavigation] 切换到已有相同记录的tab');
            history.push({
              pathname: targetPath,
              search: searchParams.toString() ? `?${searchParams.toString()}` : '',
              state
            });
            return;
          }
        }
      }
    }

    // 其他情况直接跳转
    if (debug) console.log('[SmartNavigation] 直接跳转到:', newUrl);
    history.push({
      pathname: targetPath,
      search: searchParams.toString() ? `?${searchParams.toString()}` : '',
      state
    });
  };

  /**
   * 更新KeepAlive tab的location信息
   */
  const updateTabLocation = (
    targetPathLower: string,
    targetPath: string,
    searchParams: URLSearchParams,
    existingTab: any,
    state?: Record<string, any>
  ) => {
    if (keepAliveContext && keepAliveContext.updateTab) {
      const newLocation = {
        ...existingTab.location,
        search: searchParams.toString() ? `?${searchParams.toString()}` : '',
        pathname: targetPath,
        state: state ?? existingTab.location?.state
      };
      
      console.log('[SmartNavigation] 更新KeepAlive tab的location:', {
        oldLocation: existingTab.location,
        newLocation
      });
      
      keepAliveContext.updateTab(targetPathLower, {
        location: newLocation
      });
    }
  };

  return smartNavigate;
};

/**
 * 简化版智能导航函数 - 使用默认配置
 * 
 * @param targetPath 目标路径
 * @param newParams 新的参数对象
 * @param debug 是否启用调试日志
 */
export const createSmartNavigate = (debug = false) => {
  return (targetPath: string, newParams: Record<string, any> = {}) => {
    const smartNavigate = useSmartNavigation();
    return smartNavigate({
      targetPath,
      newParams,
      debug
    });
  };
};

export default useSmartNavigation;
