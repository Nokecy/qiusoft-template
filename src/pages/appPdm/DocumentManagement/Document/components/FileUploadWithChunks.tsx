import React, { useState } from 'react';
import { Upload, message, Button, Modal, Progress } from 'antd';
import { InboxOutlined, CloudUploadOutlined, UploadOutlined } from '@ant-design/icons';
import { AgGridPlus } from '@nokecy/qc-ui';
import { useControllableValue } from 'ahooks';
import dayjs from 'dayjs';
import { serverUrl, useModel } from '@umijs/max';
import {
  TempFileUploadInitiateUploadAsync,
  TempFileUploadUploadChunkAsync,
  TempFileUploadCompleteUploadAsync,
  TempFileUploadGetMissingChunksAsync,
} from '@/services/pdm/TempFileUpload';

const { Dragger } = Upload;

// 默认分片大小：5MB
const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024;

interface FileUploadWithChunksProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  disabled?: boolean;
  hidePercent?: boolean;
  maxCount?: number; // 最大上传数量
  inline?: boolean; // 内联模式，不使用模态框
}

const FileUploadWithChunks: React.FC<FileUploadWithChunksProps> = (props) => {
  const { disabled, hidePercent, maxCount, inline = false } = props;
  const [rawState, setRawState] = useControllableValue<any[]>(props, {
    defaultValue: [],
  });
  // 确保 state 始终是数组
  const state = Array.isArray(rawState) ? rawState : [];
  const setState = (value: any[] | ((prev: any[]) => any[])) => {
    if (typeof value === 'function') {
      setRawState((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return value(prevArray);
      });
    } else {
      setRawState(Array.isArray(value) ? value : []);
    }
  };
  const { initialState } = useModel('@@initialState');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  // 文件分片
  const sliceFile = (file: File, chunkSize: number): Blob[] => {
    const chunks: Blob[] = [];
    let offset = 0;
    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      chunks.push(chunk);
      offset += chunkSize;
    }
    return chunks;
  };

  // 上传单个分片
  const uploadChunk = async (
    uploadId: string,
    chunkIndex: number,
    chunk: Blob,
    file: File
  ): Promise<void> => {
    const chunkFile = new File([chunk], file.name, { type: file.type });

    await TempFileUploadUploadChunkAsync(
      { uploadId, chunkIndex },
      {},
      chunkFile
    );
  };

  // 上传文件（支持分片和断点续传）
  const uploadFileWithChunks = async (file: File): Promise<any> => {
    try {
      // 确保 contentType 有值，如果没有则使用默认值
      const contentType = file.type || 'application/octet-stream';

      // 1. 初始化上传
      const uploadInfo = await TempFileUploadInitiateUploadAsync({
        fileName: file.name,
        totalSize: file.size,
        contentType: contentType,
        chunkSize: DEFAULT_CHUNK_SIZE,
      });

      const { uploadId, totalChunks } = uploadInfo;
      if (!uploadId || !totalChunks) {
        throw new Error('上传初始化失败');
      }

      // 2. 检查是否有缺失的分片（断点续传）
      const missingChunksResult = await TempFileUploadGetMissingChunksAsync({ uploadId });
      const missingChunks = missingChunksResult.missingChunkIndexes || [];

      // 如果所有分片都已上传，直接完成
      if (missingChunks.length === 0) {
        const result = await TempFileUploadCompleteUploadAsync({ uploadId });
        return result;
      }

      // 3. 分片文件
      const chunks = sliceFile(file, DEFAULT_CHUNK_SIZE);

      // 4. 按顺序上传缺失的分片
      let uploadedCount = totalChunks - missingChunks.length;
      for (const chunkIndex of missingChunks) {
        if (chunkIndex < chunks.length) {
          await uploadChunk(uploadId, chunkIndex, chunks[chunkIndex], file);

          // 更新进度
          uploadedCount++;
          const progress = Math.round((uploadedCount / totalChunks) * 100);
          setUploadProgress((prev) => ({
            ...prev,
            [file.uid]: progress,
          }));
        }
      }

      // 5. 完成上传
      const result = await TempFileUploadCompleteUploadAsync({ uploadId });

      // 清除进度
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[file.uid];
        return newProgress;
      });

      return result;
    } catch (error) {
      console.error('文件上传失败:', error);
      throw error;
    }
  };

  // 自定义上传处理
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      // uploadFileWithChunks 返回 TempFileUploadCompleteUploadAsync 的结果
      const result = await uploadFileWithChunks(file);

      // 确保 contentType 有值
      const contentType = file.type || 'application/octet-stream';

      // 构建文件信息
      // result 是 TempFileUploadCompleteUploadAsync 返回的对象
      // result.id: 临时文件记录ID，用于提交表单时关联到文档
      // result.uploadId: Blob存储标识，用于下载文件
      const fileInfo = {
        uid: file.uid,
        name: file.name,
        fileName: result.fileName || file.name,
        id: result.id,  // TempFileUploadCompleteUploadAsync 返回的 id
        uploadId: result.uploadId,  // Blob存储标识
        blobName: result.uploadId,  // 使用 uploadId 作为 blobName
        contentType: result.contentType || contentType,
        size: result.totalSize || file.size,
        status: 'done',
        creator: initialState?.profile.name,
        creationTime: result.creationTime || dayjs().format('YYYY-MM-DD HH:mm'),
      };

      console.log('FileUploadWithChunks customRequest - fileInfo:', fileInfo);
      console.log('FileUploadWithChunks customRequest - calling onSuccess');
      onSuccess?.(fileInfo, file);

      // 手动更新 state，确保包含 uploadId
      setTimeout(() => {
        console.log('FileUploadWithChunks - manually updating state after upload');
        setState((prevState) => {
          const updatedList = (prevState || []).map(f => {
            if (f.uid === file.uid) {
              const updated = { ...f, ...fileInfo };
              console.log('FileUploadWithChunks - updated file in state:', updated);
              return updated;
            }
            return f;
          });

          // 如果文件不在列表��，添加进去
          if (!updatedList.find(f => f.uid === file.uid)) {
            updatedList.push(fileInfo);
          }

          console.log('FileUploadWithChunks - new state:', updatedList);
          return updatedList;
        });
      }, 100);

      message.success(`${file.name} 上传成功`);
    } catch (error) {
      onError?.(error);
      message.error(`${file.name} 上传失败`);
    }
  };

  // 文件变化处理
  const handleChange = (info: any) => {
    let { fileList } = info;
    console.log('FileUploadWithChunks handleChange - original fileList:', fileList);
    console.log('FileUploadWithChunks handleChange - info.file:', info.file);

    // 如果设置了 maxCount=1，且有新文件上传，自动替换旧文件
    if (maxCount === 1 && fileList.length > 1) {
      // 保留最新上传的文件（最后一个）
      fileList = [fileList[fileList.length - 1]];
    }

    // Ant Design Upload 的 fileList 可能会过滤掉自定义字段
    // 需要手动合并 response 中的数据到 fileList
    const mergedFileList = fileList.map((file: any) => {
      console.log('FileUploadWithChunks - processing file:', file);
      console.log('FileUploadWithChunks - file.response:', file.response);
      console.log('FileUploadWithChunks - file.status:', file.status);

      if (file.response && file.status === 'done') {
        // 将 customRequest 中 onSuccess 传递的 fileInfo 合并到文件对象
        const merged = {
          ...file,
          ...file.response,
        };
        console.log('FileUploadWithChunks - merged file with response:', merged);
        return merged;
      }
      return file;
    });

    console.log('FileUploadWithChunks - final mergedFileList:', mergedFileList);
    setState(mergedFileList);
  };

  // 移除文件
  const removeFile = (fileToRemove: any) => {
    const newFileList = state?.filter((f) => f.uid !== fileToRemove.uid) || [];
    setState(newFileList);
  };

  // 表格列定义
  const columnDefs = [
    {
      field: 'fileName',
      headerName: '文件名称',
      flex: 1,
      cellRenderer: ({ value, data }: any) => {
        return (
          <a
            target="_blank"
            onClick={(event) => {
              event.stopPropagation();
              if (data.blobName) {
                window.open(`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${data.blobName}`);
              } else {
                message.error('下载失败，请稍后重试');
              }
            }}
            rel="noreferrer"
          >
            {data.name || value || data.fileName}
          </a>
        );
      },
    },
    {
      field: 'creator',
      headerName: '上传者',
      width: 100,
      hideInSearch: true,
    },
    {
      field: 'creationTime',
      headerName: '时间',
      width: 130,
      hideInSearch: true,
      cellRenderer: (params: any) => {
        return <div>{dayjs(params.data?.creationTime).format('YYYY-MM-DD')}</div>;
      },
    },
    {
      field: 'percent',
      headerName: '上传进度',
      width: 100,
      hideInTable: hidePercent,
      hideInSearch: true,
      cellRenderer: ({ data }: any) => {
        const progress = uploadProgress[data.uid] || (data.status === 'done' ? 100 : 0);
        return <Progress percent={progress} />;
      },
    },
    {
      field: 'options',
      headerName: '操作',
      width: 150,
      cellRenderer: (props: any) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <a
              target="_blank"
              onClick={(event) => {
                event.stopPropagation();
                if (props?.data.blobName) {
                  window.open(
                    `${serverUrl()}/api/attachmentManage/blob/by-blob-name/${props?.data.blobName}`
                  );
                } else {
                  message.error('下载失败，请稍后重试');
                }
              }}
              rel="noreferrer"
            >
              下载
            </a>
            {!disabled && (
              <>
                {' | '}
                <a
                  style={{ color: 'red' }}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeFile(props.data);
                  }}
                >
                  移除
                </a>
              </>
            )}
          </div>
        );
      },
    },
  ];

  // 检查是否已达到上传数量限制
  const isMaxCountReached = maxCount !== undefined && state && state.length >= maxCount;

  // 内联模式：直接显示上传组件
  if (inline) {
    return (
      <div>
        {state && state.length > 0 ? (
          <div style={{ marginBottom: 4 }}>
            {state.map((file: any) => (
              <div
                key={file.uid}
                style={{
                  padding: '2px 6px',
                  border: '1px solid #e8e8e8',
                  borderRadius: 2,
                  marginBottom: 2,
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file.name || file.fileName}
                  {uploadProgress[file.uid] !== undefined && uploadProgress[file.uid] < 100 && (
                    <span style={{ marginLeft: 6, color: '#1890ff' }}>
                      {uploadProgress[file.uid]}%
                    </span>
                  )}
                </div>
                {!disabled && (
                  <a
                    style={{ color: '#ff4d4f', marginLeft: 6, fontSize: 12 }}
                    onClick={() => removeFile(file)}
                  >
                    ×
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : null}
        <Upload
          multiple={maxCount !== 1}
          disabled={disabled || isMaxCountReached}
          fileList={state}
          customRequest={customRequest}
          onChange={handleChange}
          showUploadList={false}
          maxCount={maxCount}
        >
          <Button
            icon={<UploadOutlined />}
            size="small"
            disabled={disabled || isMaxCountReached}
            style={{ width: '100%' }}
          >
            {state && state.length > 0 ? (maxCount === 1 ? '替换' : '继续上传') : '上传'}
          </Button>
        </Upload>
      </div>
    );
  }

  // 模态框模式：原有逻辑
  return (
    <span>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        {state && state.length > 0
          ? `已上传${state.length}${maxCount ? `/${maxCount}` : ''}个文件`
          : '上传文件'}
      </Button>
      <Modal
        title="文件列表"
        open={isModalOpen}
        width={1160}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Dragger
          multiple={maxCount !== 1}
          disabled={disabled || (maxCount !== undefined && state && state.length >= maxCount)}
          fileList={state}
          customRequest={customRequest}
          onChange={handleChange}
          showUploadList={false}
          maxCount={maxCount}
        >
          {disabled || (state && state.length > 0) ? (
            <div>
              <AgGridPlus
                pagination={false}
                style={{
                  minHeight: 130,
                  overflowY: 'auto',
                  textAlign: 'left',
                  height: (state?.length || 0) * 40,
                }}
                hideTool
                search={false}
                dataSource={state || []}
                columnDefs={columnDefs}
              />
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
            </div>
          ) : (
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
          )}
        </Dragger>
      </Modal>
    </span>
  );
};

export default FileUploadWithChunks;
