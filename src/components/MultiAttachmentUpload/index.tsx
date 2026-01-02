import React, { useState, useEffect } from 'react';
import { Upload, Button, List, message, Modal } from 'antd';
import { UploadOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { v4 as uuidv4 } from 'uuid';

interface MultiAttachmentUploadProps {
  value?: API.EntityAttachment[];
  onChange?: (value: API.EntityAttachment[]) => void;
  entityId?: string;
  entityTypeName?: string;
  maxSize?: number; // MB
  maxCount?: number;
  accept?: string;
  description?: string;
  disabled?: boolean;
  // API 函数
  uploadFn?: (entityId: string, file: File) => Promise<any>;
  downloadFn?: (entityId: string, blobName: string) => Promise<Blob>;
  deleteFn?: (entityId: string, blobName: string) => Promise<void>;
}

const MultiAttachmentUpload: React.FC<MultiAttachmentUploadProps> = ({
  value = [],
  onChange,
  entityId,
  entityTypeName,
  maxSize = 50,
  maxCount = 10,
  accept,
  description = '点击或拖拽文件到此区域上传',
  disabled = false,
  uploadFn,
  downloadFn,
  deleteFn,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [attachments, setAttachments] = useState<API.EntityAttachment[]>(value);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');

  // 同步 value 到 attachments
  useEffect(() => {
    setAttachments(value);
  }, [value]);

  // 自定义上传逻辑
  const customUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError, onProgress } = options;
    const uploadFile = file as File;

    // 检查文件大小
    if (uploadFile.size > maxSize * 1024 * 1024) {
      message.error(`文件大小不能超过 ${maxSize}MB`);
      onError?.(new Error(`文件大小超过限制`));
      return;
    }

    // 检查是否已上传到最大数量
    if (attachments.length >= maxCount) {
      message.error(`最多只能上传 ${maxCount} 个文件`);
      onError?.(new Error(`文件数量超过限制`));
      return;
    }

    // 即时上传模式：如果提供了 uploadFn，则立即上传
    if (uploadFn) {
      try {
        setUploading(true);
        onProgress?.({ percent: 50 });

        // 生成临时 GUID 作为 entityId（如果没有实际 entityId）
        const tempEntityId = entityId || `temp_${uuidv4()}`;

        // 使用传入的上传函数
        const result = await uploadFn(tempEntityId, uploadFile);

        const newAttachment: API.EntityAttachment = {
          id: result.blobName, // 使用 blobName 作为唯一标识
          entityId: result.entityId,
          entityTypeName: result.entityTypeName,
          name: result.fileName,
          size: result.fileSize,
          type: result.contentType,
          blobName: result.blobName,
          creationTime: result.uploadTime,
        };

        const newAttachments = [...attachments, newAttachment];
        setAttachments(newAttachments);
        onChange?.(newAttachments);

        onProgress?.({ percent: 100 });
        onSuccess?.(result);
        message.success(`文件 ${uploadFile.name} 上传成功`);
      } catch (error) {
        console.error('上传失败:', error);
        message.error(`文件 ${uploadFile.name} 上传失败`);
        onError?.(error as Error);
      } finally {
        setUploading(false);
      }
    } else {
      // 如果没有提供 uploadFn，则使用待上传模式（兼容旧版）
      const reader = new FileReader();
      reader.onload = () => {
        const tempAttachment: any = {
          id: `temp_${Date.now()}_${Math.random()}`,
          name: uploadFile.name,
          size: uploadFile.size,
          type: uploadFile.type,
          tempFile: uploadFile, // 暂存实际文件对象
          isTemp: true,
        };

        const newAttachments = [...attachments, tempAttachment];
        setAttachments(newAttachments);
        onChange?.(newAttachments);
        onSuccess?.('ok');
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  // 删除附件
  const handleDelete = async (attachment: API.EntityAttachment) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除附件 "${attachment.name}" 吗？`,
      onOk: async () => {
        try {
          // 调用删除 API
          if (attachment.blobName && deleteFn) {
            await deleteFn(entityId || attachment.entityId, attachment.blobName);
          }

          const newAttachments = attachments.filter((a) => a.id !== attachment.id);
          setAttachments(newAttachments);
          onChange?.(newAttachments);
          message.success('删除成功');
        } catch (error) {
          console.error('删除失败:', error);
          message.error('删除失败');
        }
      },
    });
  };

  // 下载附件
  const handleDownload = async (attachment: API.EntityAttachment) => {
    try {
      // 使用传入的下载函数
      const blob = await downloadFn!(entityId || attachment.entityId, attachment.blobName);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载失败:', error);
      message.error('下载失败');
    }
  };

  // 预览附件（仅支持图片）
  const handlePreview = async (attachment: API.EntityAttachment) => {
    // 检查是否为图片
    if (!attachment.type?.startsWith('image/')) {
      message.warning('仅支持预览图片文件');
      return;
    }

    try {
      // 使用传入的下载函数
      const blob = await downloadFn!(entityId || attachment.entityId, attachment.blobName);
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
      setPreviewTitle(attachment.name);
      setPreviewVisible(true);
    } catch (error) {
      console.error('预览失败:', error);
      message.error('预览失败');
    }
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <Upload
        accept={accept}
        customRequest={customUpload}
        fileList={fileList}
        onChange={(info) => {
          setFileList(info.fileList);
        }}
        showUploadList={false}
        disabled={disabled || uploading || attachments.length >= maxCount}
        multiple
      >
        <Button
          icon={<UploadOutlined />}
          loading={uploading}
          disabled={disabled || attachments.length >= maxCount}
        >
          {uploading ? '上传中...' : '选择文件'}
        </Button>
        <span style={{ marginLeft: 8, color: '#999', fontSize: 12 }}>
          {description} (最多 {maxCount} 个，单个文件不超过 {maxSize}MB)
        </span>
      </Upload>

      {attachments.length > 0 && (
        <List
          style={{ marginTop: 16 }}
          size="small"
          bordered
          dataSource={attachments}
          renderItem={(item) => (
            <List.Item
              actions={[
                item.type?.startsWith('image/') && (
                  <Button
                    key="preview"
                    type="link"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => handlePreview(item)}
                  >
                    预览
                  </Button>
                ),
                <Button
                  key="download"
                  type="link"
                  size="small"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(item)}
                >
                  下载
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item)}
                  disabled={disabled}
                >
                  删除
                </Button>,
              ].filter(Boolean)}
            >
              <List.Item.Meta
                title={item.name}
                description={`大小: ${formatFileSize(item.size)} | 类型: ${item.type || '未知'}`}
              />
            </List.Item>
          )}
        />
      )}

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => {
          setPreviewVisible(false);
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl('');
          }
        }}
      >
        <img alt={previewTitle} style={{ width: '100%' }} src={previewUrl} />
      </Modal>
    </div>
  );
};

export default MultiAttachmentUpload;
