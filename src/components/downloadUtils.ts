import { downloadBlob } from '@/_utils';

/**
 * 下载导出文件
 * @param response 响应数据
 * @param fileName 文件名
 */
export const downloadFile = (response: any, fileName: string) => {
  if (response) {
    // 假设后端返回的是blob URL或文件链接
    if (typeof response === 'string') {
      downloadBlob(response, fileName);
    } else {
      // 如果是blob数据，直接下载
      const blob = new Blob([response]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }
};