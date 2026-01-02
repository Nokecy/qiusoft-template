import React, { useState } from 'react';
import { Upload, message, Image } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useControllableValue } from 'ahooks';
import { request } from 'umi';
import { normalizeToRelativePath, toDisplayUrl } from '../_utils/url';

type FileType = Parameters<any>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface ProjectImageUploadProps {
  value?: string;
  onChange?: (value?: string) => void;
  readOnly?: boolean;
}

/**
 * 项目图片上传组件
 * 使用 ProjectDocumentUploadController 简单快速上传
 */
const ProjectImageUpload: React.FC<ProjectImageUploadProps> = (props) => {
  const { readOnly } = props;
  const [value, setValue] = useControllableValue<string | undefined>(props);

  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 根据value初始化fileList
  React.useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: toDisplayUrl(value) || value,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      setLoading(false);
      const nextFileList = (info.fileList || []).map((f) => {
        const stored = normalizeToRelativePath(f.response?.documentUrl || f.response?.url || f.url);
        const display = toDisplayUrl(stored) || stored;
        return { ...f, url: display || f.url };
      });
      setFileList(nextFileList);
      return;
    }

    if (info.file.status === 'error') {
      setLoading(false);
      message.error('上传失败');
    }

    setFileList(info.fileList);
  };

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // 使用Controller路由
      const response = await request('/api/pdm/project-management/project-document-uploads', {
        method: 'POST',
        data: formData,
        requestType: 'form',
      });

      if (response && response.documentUrl) {
        const storedPath = normalizeToRelativePath(response.documentUrl);
        const displayUrl = toDisplayUrl(storedPath) || storedPath;

        setValue(storedPath);
        setLoading(false);
        message.success('上传成功');

        // 同时调用 onSuccess 保持兼容性
        const successData = { ...response, documentUrl: storedPath, url: displayUrl };
        onSuccess && onSuccess(successData, file);
      } else {
        throw new Error('上传失败: 未返回URL');
      }
    } catch (error: any) {
      onError(error);
      message.error('上传失败: ' + (error.message || '未知错误'));
    }
  };

  const beforeUpload = (file: FileType) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件!');
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片大小不能超过 5MB!');
      return false;
    }

    return true;
  };

  const handleRemove = () => {
    if (readOnly) return false;
    setValue(undefined);
    setFileList([]);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        maxCount={1}
        disabled={readOnly}
      >
        {fileList.length >= 1 ? null : readOnly ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

//@ts-ignore
ProjectImageUpload.GroupName = "PDM";
export default ProjectImageUpload;
export { ProjectImageUpload };
