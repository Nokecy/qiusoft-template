import { Button, message, Modal, Progress, Space, Upload } from 'antd';
import { InboxOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { useBoolean } from 'ahooks';
import { UpdateChunkUploadAsync, UpdateCancelChunkUploadAsync } from '@/services/openApi/Update';

interface ChunkUploadProps {
	onAfterSubmit?: (response?: any) => void;
	title?: string;
	fileType: 'PdaApk' | 'PrinterClient';
	appName: string;
	force?: boolean;
	chunkSize?: number; // 分片大小，默认5MB
}

interface UploadProgress {
	percent: number;
	status: 'uploading' | 'success' | 'error' | 'paused';
	uploadedChunks: number;
	totalChunks: number;
	speed?: string;
}

const ChunkUpload: React.FC<ChunkUploadProps> = (props) => {
	const { onAfterSubmit, title = '上传客户端', fileType, appName, force = true, chunkSize = 5 * 1024 * 1024 } = props;
	const [visible, { setTrue, setFalse }] = useBoolean(false);
	const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
		percent: 0,
		status: 'uploading',
		uploadedChunks: 0,
		totalChunks: 0
	});
	const [uploading, setUploading] = useState(false);
	const uploadControlRef = useRef<{ pause: boolean; fileId: string }>({ pause: false, fileId: '' });
	const startTimeRef = useRef<number>(0);
	const uploadedSizeRef = useRef<number>(0);

	/**
	 * 使用Web Crypto API计算哈希值
	 */
	const calculateHash = async (data: ArrayBuffer): Promise<string> => {
		const hashBuffer = await crypto.subtle.digest('SHA-256', data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	};

	/**
	 * 计算分片哈希
	 */
	const calculateChunkHash = (chunk: Blob): Promise<string> => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.onload = async (e) => {
				if (e.target?.result) {
					try {
						const hash = await calculateHash(e.target.result as ArrayBuffer);
						resolve(hash);
					} catch (error) {
						reject(error);
					}
				}
			};

			fileReader.onerror = () => {
				reject(new Error('分片读取失败'));
			};

			fileReader.readAsArrayBuffer(chunk);
		});
	};

	/**
	 * 格式化速度显示
	 */
	const formatSpeed = (bytesPerSecond: number): string => {
		if (bytesPerSecond < 1024) {
			return `${bytesPerSecond.toFixed(2)} B/s`;
		} else if (bytesPerSecond < 1024 * 1024) {
			return `${(bytesPerSecond / 1024).toFixed(2)} KB/s`;
		} else {
			return `${(bytesPerSecond / (1024 * 1024)).toFixed(2)} MB/s`;
		}
	};

	/**
	 * 分片上传处理
	 */
	const handleChunkUpload = async (file: File) => {
		const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		uploadControlRef.current.fileId = fileId;
		uploadControlRef.current.pause = false;

		const totalChunks = Math.ceil(file.size / chunkSize);
		setUploadProgress({
			percent: 0,
			status: 'uploading',
			uploadedChunks: 0,
			totalChunks
		});
		setUploading(true);
		startTimeRef.current = Date.now();
		uploadedSizeRef.current = 0;

		try {
			// 开始分片上传
			for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
				// 检查是否暂停
				if (uploadControlRef.current.pause) {
					setUploadProgress(prev => ({ ...prev, status: 'paused' }));
					return;
				}

				const start = chunkIndex * chunkSize;
				const end = Math.min(start + chunkSize, file.size);
				const chunk = file.slice(start, end);

				// 计算当前分片哈希
				const chunkHash = await calculateChunkHash(chunk);

				// 上传分片
				const chunkFile = new File([chunk], file.name, { type: file.type });
				await UpdateChunkUploadAsync(
					{
						AppName: appName,
						FileId: fileId,
						FileName: file.name,
						ChunkIndex: chunkIndex,
						TotalChunks: totalChunks,
						ChunkMd5: chunkHash,
						TotalSize: file.size,
						Force: force
					},
					chunkFile
				);

				// 更新进度
				uploadedSizeRef.current += chunk.size;
				const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
				const speed = uploadedSizeRef.current / elapsedTime;
				const percent = Math.round(((chunkIndex + 1) / totalChunks) * 100);

				setUploadProgress({
					percent,
					status: 'uploading',
					uploadedChunks: chunkIndex + 1,
					totalChunks,
					speed: formatSpeed(speed)
				});
			}

			// 上传完成
			setUploadProgress(prev => ({ ...prev, percent: 100, status: 'success' }));
			message.success('上传成功');
			setUploading(false);
			setFalse();
			if (onAfterSubmit) {
				onAfterSubmit({ fileId, fileName: file.name });
			}
		} catch (error: any) {
			console.error('上传失败:', error);
			setUploadProgress(prev => ({ ...prev, status: 'error' }));
			message.error(error?.message || '上传失败');
			setUploading(false);
		}
	};

	/**
	 * 取消上传
	 */
	const handleCancelUpload = async () => {
		uploadControlRef.current.pause = true;
		if (uploadControlRef.current.fileId) {
			try {
				await UpdateCancelChunkUploadAsync({ fileId: uploadControlRef.current.fileId });
				message.info('已取消上传');
			} catch (error) {
				console.error('取消上传失败:', error);
			}
		}
		setUploading(false);
		setUploadProgress({
			percent: 0,
			status: 'uploading',
			uploadedChunks: 0,
			totalChunks: 0
		});
	};

	/**
	 * 关闭对话框
	 */
	const handleModalClose = () => {
		if (uploading) {
			Modal.confirm({
				title: '确认取消上传',
				content: '文件正在上传中，确定要取消吗?',
				onOk: () => {
					handleCancelUpload();
					setFalse();
				}
			});
		} else {
			setFalse();
		}
	};

	return (
		<>
			<Button icon={<CloudUploadOutlined />} type='primary' onClick={setTrue}>
				上传{fileType === 'PdaApk' ? 'PDA客户端' : '打印客户端'}
			</Button>

			<Modal
				title={title}
				open={visible}
				onCancel={handleModalClose}
				destroyOnClose
				footer={uploading ? [
					<Button key="cancel" danger icon={<CloseCircleOutlined />} onClick={handleCancelUpload}>
						取消上传
					</Button>
				] : null}
			>
				{!uploading ? (
					<Upload.Dragger
						style={{ marginTop: 10 }}
						multiple={false}
						showUploadList={false}
						beforeUpload={(file) => {
							handleChunkUpload(file);
							return false; // 阻止默认上传
						}}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>单击或拖动文件到该区域上传</p>
						<p className='ant-upload-hint'>支持大文件分片上传，上传更稳定</p>
					</Upload.Dragger>
				) : (
					<div style={{ marginTop: 20 }}>
						<Progress
							percent={uploadProgress.percent}
							status={uploadProgress.status === 'error' ? 'exception' : uploadProgress.status === 'success' ? 'success' : 'active'}
						/>
						<Space direction="vertical" style={{ width: '100%', marginTop: 10 }}>
							<div>上传进度: {uploadProgress.uploadedChunks} / {uploadProgress.totalChunks} 分片</div>
							{uploadProgress.speed && <div>上传速度: {uploadProgress.speed}</div>}
						</Space>
					</div>
				)}
			</Modal>
		</>
	);
};

export default ChunkUpload;