import { DocumentLibraryImportAsync, DocumentLibraryGetImportTemplateAsync } from '@/services/pdm/DocumentLibrary';
import { Modal, Button, Upload, message, Space, Alert } from 'antd';
import { UploadOutlined, DownloadOutlined, InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;

interface DocumentLibraryImportDialogProps {
  onAfterSubmit?: () => void;
  buttonProps?: any;
  children?: React.ReactNode;
}

const DocumentLibraryImportDialog: React.FC<DocumentLibraryImportDialogProps> = (props) => {
  const { onAfterSubmit, buttonProps, children } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // 下载导入模板
  const handleDownloadTemplate = async () => {
    try {
      message.loading({ content: '正在下载模板...', key: 'downloadTemplate' });

      const response = await DocumentLibraryGetImportTemplateAsync({
        responseType: 'blob',
        getResponse: true,
      } as any);

      // 从响应头获取文件名
      let fileName = '文档库导入模板.xlsx';
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
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || file.type === 'application/vnd.ms-excel'
        || file.name.endsWith('.xlsx')
        || file.name.endsWith('.xls');

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

    setUploading(true);
    const hide = message.loading('正在导入数据...', 0);

    try {
      const file = fileList[0] as any;
      const result = await DocumentLibraryImportAsync({}, file.originFileObj || file);

      hide();

      // 处理导入成功的情况
      // 1. result 为 null/undefined (204 状态码返回空)
      // 2. result.success !== false
      // 3. result 存在但没有 success 字段
      if (!result || result.success !== false) {
        message.success('导入成功');
        setIsModalOpen(false);
        setFileList([]);
        // 导入成功后自动刷新列表
        if (onAfterSubmit) {
          onAfterSubmit();
        }
      } else {
        // 显示导入错误信息
        const errorMsg = result.message || '导入失败';
        const errors = result.errors || [];

        if (errors.length > 0) {
          Modal.error({
            title: '导入失败',
            width: 600,
            content: (
              <div>
                <div style={{ marginBottom: 8 }}>{errorMsg}</div>
                <div style={{ maxHeight: 300, overflow: 'auto' }}>
                  {errors.map((err: any, index: number) => (
                    <div key={index} style={{ marginBottom: 4, fontSize: 12 }}>
                      <span style={{ color: '#ff4d4f' }}>第 {err.rowNumber || index + 1} 行:</span> {err.message || err.errorMessage}
                    </div>
                  ))}
                </div>
              </div>
            ),
          });
        } else {
          message.error(errorMsg);
        }
      }
    } catch (error: any) {
      hide();
      console.error('导入失败:', error);

      // 显示详细错误信息
      const errorMsg = error?.response?.data?.error?.message
        || error?.message
        || '导入失败，请检查文件格式是否正确';

      message.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  // 打开对话框
  const handleOpenDialog = () => {
    setIsModalOpen(true);
    setFileList([]);
  };

  // 关闭对话框
  const handleCancel = () => {
    if (!uploading) {
      setIsModalOpen(false);
      setFileList([]);
    }
  };

  return (
    <>
      <Button
        type="default"
        icon={<UploadOutlined />}
        onClick={handleOpenDialog}
        {...buttonProps}
      >
        {children || '导入'}
      </Button>

      <Modal
        title="导入文档库"
        open={isModalOpen}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="download" icon={<DownloadOutlined />} onClick={handleDownloadTemplate}>
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
            <p className="ant-upload-hint">
              支持 Excel 文件 (.xlsx, .xls)，单个文件不超过 10MB
            </p>
          </Dragger>
        </Space>
      </Modal>
    </>
  );
};

export default DocumentLibraryImportDialog;
