import { message } from 'antd';

/**
 * 通用API错误处理工具
 */
export class ApiErrorHandler {
  /**
   * 处理删除操作的通用方法
   * @param deleteApi 删除API方法
   * @param id 要删除的记录ID
   * @param onSuccess 成功回调
   * @param options 可选配置
   */
  static async handleDelete(
    deleteApi: (params: { id: any }) => Promise<any>,
    id: any,
    onSuccess?: () => void,
    options?: {
      loadingText?: string;
      successText?: string;
      errorText?: string;
    }
  ) {
    const {
      loadingText = '正在删除,请稍后',
      successText = '删除成功',
      errorText = '删除失败，请重试'
    } = options || {};

    const hide = message.loading(loadingText, 0);
    
    try {
      await deleteApi({ id });
      message.success(successText);
      onSuccess?.();
    } catch (error) {
      console.error('删除操作失败:', error);
      message.error(errorText);
      throw error; // 重新抛出错误，让调用方知道操作失败
    } finally {
      hide();
    }
  }

  /**
   * 处理导出操作的通用方法
   * @param exportApi 导出API方法
   * @param params 导出参数
   * @param fileName 文件名
   * @param downloadFn 下载文件的方法
   * @param options 可选配置
   */
  static async handleExport(
    exportApi: (params: any) => Promise<any>,
    params: any,
    fileName: string,
    downloadFn: (result: any, fileName: string) => void,
    options?: {
      loadingText?: string;
      successText?: string;
      errorText?: string;
    }
  ) {
    const {
      loadingText = '正在导出,请稍后',
      successText = '导出成功',
      errorText = '导出失败，请重试'
    } = options || {};

    const hide = message.loading(loadingText, 0);
    
    try {
      const result = await exportApi(params);
      downloadFn(result, fileName);
      message.success(successText);
    } catch (error) {
      console.error('导出操作失败:', error);
      message.error(errorText);
      throw error;
    } finally {
      hide();
    }
  }

  /**
   * 处理下载模板操作的通用方法
   * @param getTemplateApi 获取模板API方法
   * @param fileName 模板文件名
   * @param downloadFn 下载文件的方法
   * @param options 可选配置
   */
  static async handleDownloadTemplate(
    getTemplateApi: () => Promise<any>,
    fileName: string,
    downloadFn: (result: any, fileName: string) => void,
    options?: {
      loadingText?: string;
      successText?: string;
      errorText?: string;
    }
  ) {
    const {
      loadingText = '正在下载模板,请稍后',
      successText = '模板下载成功',
      errorText = '模板下载失败，请重试'
    } = options || {};

    const hide = message.loading(loadingText, 0);
    
    try {
      const result = await getTemplateApi();
      downloadFn(result, fileName);
      message.success(successText);
    } catch (error) {
      console.error('下载模板失败:', error);
      message.error(errorText);
      throw error;
    } finally {
      hide();
    }
  }

  /**
   * 通用API调用错误处理装饰器
   * @param apiCall API调用方法
   * @param options 错误处理配置
   */
  static async withErrorHandling<T>(
    apiCall: () => Promise<T>,
    options?: {
      showLoading?: boolean;
      loadingText?: string;
      successText?: string;
      errorText?: string;
      silent?: boolean; // 是否静默处理错误（不显示错误消息）
    }
  ): Promise<T> {
    const {
      showLoading = false,
      loadingText = '处理中,请稍后',
      successText,
      errorText = '操作失败，请重试',
      silent = false
    } = options || {};

    let hide: (() => void) | undefined;
    
    if (showLoading) {
      hide = message.loading(loadingText, 0);
    }
    
    try {
      const result = await apiCall();
      
      if (successText) {
        message.success(successText);
      }
      
      return result;
    } catch (error) {
      console.error('API调用失败:', error);
      
      if (!silent) {
        message.error(errorText);
      }
      
      throw error;
    } finally {
      hide?.();
    }
  }
}

/**
 * React Hook 版本的API错误处理
 */
export const useApiErrorHandler = () => {
  const handleDelete = async (
    deleteApi: (params: { id: any }) => Promise<any>,
    id: any,
    onSuccess?: () => void,
    options?: Parameters<typeof ApiErrorHandler.handleDelete>[3]
  ) => {
    return ApiErrorHandler.handleDelete(deleteApi, id, onSuccess, options);
  };

  const handleExport = async (
    exportApi: (params: any) => Promise<any>,
    params: any,
    fileName: string,
    downloadFn: (result: any, fileName: string) => void,
    options?: Parameters<typeof ApiErrorHandler.handleExport>[4]
  ) => {
    return ApiErrorHandler.handleExport(exportApi, params, fileName, downloadFn, options);
  };

  const handleDownloadTemplate = async (
    getTemplateApi: () => Promise<any>,
    fileName: string,
    downloadFn: (result: any, fileName: string) => void,
    options?: Parameters<typeof ApiErrorHandler.handleDownloadTemplate>[3]
  ) => {
    return ApiErrorHandler.handleDownloadTemplate(getTemplateApi, fileName, downloadFn, options);
  };

  const withErrorHandling = async <T>(
    apiCall: () => Promise<T>,
    options?: Parameters<typeof ApiErrorHandler.withErrorHandling>[1]
  ): Promise<T> => {
    return ApiErrorHandler.withErrorHandling(apiCall, options);
  };

  return {
    handleDelete,
    handleExport,
    handleDownloadTemplate,
    withErrorHandling
  };
};