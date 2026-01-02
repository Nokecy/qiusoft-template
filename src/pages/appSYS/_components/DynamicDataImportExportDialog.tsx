/**
 * 动态数据导入导出对话框组件
 * 支持数据导入、导出和模板下载功能
 */
import {
  DynamicDataImportExportExportAsync,
  DynamicDataImportExportImportAsync,
  DynamicDataImportExportGetTemplateAsync,
} from '@/services/openApi/DynamicDataImportExport';
import { Modal, Button, Upload, message, Space, Alert, Progress, Typography, Divider } from 'antd';
import { UploadOutlined, DownloadOutlined, InboxOutlined, FileExcelOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;
const { Text } = Typography;

interface ImportExportDialogProps {
  /** 应用 ID */
  applicationId: string;
  /** 实体定义 ID */
  entityDefinitionId: string;
  /** 应用名称（用于显示） */
  applicationName?: string;
  /** 导入成功后的回调 */
  onAfterImport?: () => void;
  /** 获取选中的行 ID（用于导出选中数据） */
  getSelectedIds?: () => string[];
}

// 导入对话框
export const ImportDialog: React.FC<ImportExportDialogProps & {
  buttonProps?: any;
  children?: React.ReactNode;
}> = (props) => {
  const {
    applicationId,
    entityDefinitionId,
    applicationName,
    onAfterImport,
    buttonProps,
    children,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [downloadingTemplate, setDownloadingTemplate] = useState(false);

  // 下载导入模板
  const handleDownloadTemplate = async () => {
    if (!entityDefinitionId) {
      message.error('缺少实体定义信息，无法下载模板');
      return;
    }

    setDownloadingTemplate(true);
    try {
      message.loading({ content: '正在下载模板...', key: 'downloadTemplate' });

      const response = await DynamicDataImportExportGetTemplateAsync(
        { entityDefinitionId },
        { responseType: 'blob', getResponse: true } as any
      );

      // 从响应头获取文件名
      let fileName = `${applicationName || '动态数据'}_导入模板.xlsx`;
      if (response.response?.headers) {
        const contentDisposition = response.response.headers.get('content-disposition');
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1].replace(/['"]/g, '');
            try {
              fileName = decodeURIComponent(fileName);
            } catch (e) {
              console.warn('文件名解码失败:', e);
            }
          }
        }
      }

      // 创建 Blob 并下载
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      message.success({ content: '模板下载成功', key: 'downloadTemplate' });
    } catch (error) {
      console.error('下载模板失败:', error);
      message.error({ content: '下载模板失败，请重试', key: 'downloadTemplate' });
    } finally {
      setDownloadingTemplate(false);
    }
  };

  // 上传配置
  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // 检查文件类型
      const isExcel =
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel' ||
        file.name.endsWith('.xlsx') ||
        file.name.endsWith('.xls');

      if (!isExcel) {
        message.error('只能上传 Excel 文件!');
        return false;
      }

      // 检查文件大小 (限制为 10MB)
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('文件大小不能超过 10MB!');
        return false;
      }

      setFileList([file]);
      return false; // 阻止自动上传
    },
    fileList,
    maxCount: 1,
  };

  // 执行导入
  const handleImport = async () => {
    if (fileList.length === 0) {
      message.error('请先选择要导入的文件');
      return;
    }

    if (!applicationId || !entityDefinitionId) {
      message.error('缺少必要的应用或实体信息');
      return;
    }

    setUploading(true);
    const hide = message.loading('正在导入数据...', 0);

    try {
      const file = fileList[0] as any;
      const result = await DynamicDataImportExportImportAsync(
        { applicationId, entityDefinitionId },
        {},
        file.originFileObj || file
      );

      hide();

      if (!result || result.success !== false) {
        const successMsg = result?.importedRows
          ? `导入成功，共导入 ${result.importedRows} 条数据`
          : '导入成功';
        message.success(successMsg);
        setIsModalOpen(false);
        setFileList([]);
        onAfterImport?.();
      } else {
        // 显示导入错误信息
        const errors = result.errors || [];

        if (errors.length > 0) {
          Modal.error({
            title: '导入失败',
            width: 600,
            content: (
              <div>
                <div style={{ marginBottom: 8 }}>
                  共 {result.totalRows || 0} 行，成功 {result.importedRows || 0} 行，失败{' '}
                  {errors.length} 行
                </div>
                <div style={{ maxHeight: 300, overflow: 'auto' }}>
                  {errors.map((err, index) => (
                    <div key={index} style={{ marginBottom: 4, fontSize: 12 }}>
                      <span style={{ color: '#ff4d4f' }}>
                        {err.sheetName ? `[${err.sheetName}] ` : ''}第 {err.rowNumber || index + 1}{' '}
                        行{err.fieldName ? ` - ${err.fieldName}` : ''}:
                      </span>{' '}
                      {err.errorMessage}
                    </div>
                  ))}
                </div>
              </div>
            ),
          });
        } else {
          message.error('导入失败');
        }
      }
    } catch (error: any) {
      hide();
      console.error('导入失败:', error);

      const errorMsg =
        error?.response?.data?.error?.message ||
        error?.message ||
        '导入失败，请检查文件格式是否正确';

      message.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenDialog = () => {
    setIsModalOpen(true);
    setFileList([]);
  };

  const handleCancel = () => {
    if (!uploading) {
      setIsModalOpen(false);
      setFileList([]);
    }
  };

  return (
    <>
      <Button type="default" icon={<UploadOutlined />} onClick={handleOpenDialog} {...buttonProps}>
        {children || '导入'}
      </Button>

      <Modal
        title={`导入数据 - ${applicationName || '动态数据'}`}
        open={isModalOpen}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={handleDownloadTemplate}
            loading={downloadingTemplate}
          >
            下载模板
          </Button>,
          <Button key="cancel" onClick={handleCancel} disabled={uploading}>
            取消
          </Button>,
          <Button
            key="import"
            type="primary"
            loading={uploading}
            onClick={handleImport}
            disabled={fileList.length === 0}
          >
            开始导入
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Alert
            message="导入说明"
            description={
              <div>
                <div>1. 请先下载导入模板，按照模板格式填写数据</div>
                <div>2. 支持 .xlsx 和 .xls 格式的 Excel 文件</div>
                <div>3. 文件大小不能超过 10MB</div>
                <div>4. 导入时会自动校验数据格式和必填项</div>
              </div>
            }
            type="info"
            showIcon
          />

          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">支持 Excel 文件 (.xlsx, .xls)，单个文件不超过 10MB</p>
          </Dragger>
        </Space>
      </Modal>
    </>
  );
};

// 导出对话框
export const ExportDialog: React.FC<ImportExportDialogProps & {
  buttonProps?: any;
  children?: React.ReactNode;
}> = (props) => {
  const {
    applicationId,
    entityDefinitionId,
    applicationName,
    getSelectedIds,
    buttonProps,
    children,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportType, setExportType] = useState<'all' | 'selected'>('all');

  // 执行导出
  const handleExport = async (type: 'all' | 'selected') => {
    if (!applicationId || !entityDefinitionId) {
      message.error('缺少必要的应用或实体信息');
      return;
    }

    const selectedIds = type === 'selected' ? getSelectedIds?.() || [] : [];
    if (type === 'selected' && selectedIds.length === 0) {
      message.warning('请先选择要导出的数据');
      return;
    }

    setExporting(true);
    setExportType(type);

    try {
      message.loading({ content: '正在导出数据...', key: 'exportData' });

      const response = await DynamicDataImportExportExportAsync(
        {
          applicationId,
          entityDefinitionId,
          ids: type === 'selected' ? selectedIds : undefined,
        },
        { responseType: 'blob', getResponse: true } as any
      );

      // 从响应头获取文件名
      let fileName = `${applicationName || '动态数据'}_导出_${new Date().toLocaleDateString()}.xlsx`;
      if (response.response?.headers) {
        const contentDisposition = response.response.headers.get('content-disposition');
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1].replace(/['"]/g, '');
            try {
              fileName = decodeURIComponent(fileName);
            } catch (e) {
              console.warn('文件名解码失败:', e);
            }
          }
        }
      }

      // 创建 Blob 并下载
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      message.success({ content: '导出成功', key: 'exportData' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('导出失败:', error);
      message.error({ content: '导出失败，请重试', key: 'exportData' });
    } finally {
      setExporting(false);
    }
  };

  const handleOpenDialog = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    if (!exporting) {
      setIsModalOpen(false);
    }
  };

  const selectedCount = getSelectedIds?.()?.length || 0;

  return (
    <>
      <Button
        type="default"
        icon={<DownloadOutlined />}
        onClick={handleOpenDialog}
        {...buttonProps}
      >
        {children || '导出'}
      </Button>

      <Modal
        title={`导出数据 - ${applicationName || '动态数据'}`}
        open={isModalOpen}
        onCancel={handleCancel}
        width={500}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Alert
            message="导出说明"
            description="导出的数据将保存为 Excel 格式文件，包含所有可见字段。"
            type="info"
            showIcon
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button
              type="primary"
              icon={<FileExcelOutlined />}
              size="large"
              block
              loading={exporting && exportType === 'all'}
              onClick={() => handleExport('all')}
            >
              导出全部数据
            </Button>

            <Divider style={{ margin: '8px 0' }}>或</Divider>

            <Button
              icon={<FileExcelOutlined />}
              size="large"
              block
              loading={exporting && exportType === 'selected'}
              onClick={() => handleExport('selected')}
              disabled={selectedCount === 0}
            >
              导出选中数据 {selectedCount > 0 && `(${selectedCount} 条)`}
            </Button>

            {selectedCount === 0 && (
              <Text type="secondary" style={{ textAlign: 'center' }}>
                提示：请先在列表中选择要导出的数据
              </Text>
            )}
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default { ImportDialog, ExportDialog };
