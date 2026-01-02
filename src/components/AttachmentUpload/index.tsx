import React, { useState, useEffect, useMemo } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { useField } from '@formily/react';
import {
	TempFileUploadInitiateUploadAsync,
	TempFileUploadUploadChunkAsync,
	TempFileUploadCompleteUploadAsync,
	TempFileUploadGetMissingChunksAsync,
} from '@/services/pdm/TempFileUpload';

const { Dragger } = Upload;

// 默认分片大小：5MB
const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024;

interface AttachmentUploadProps {
	value?: any;
	onChange?: (value: any) => void;
	maxSize?: number; // MB
	accept?: string;
	description?: string;
}

/**
 * 单文件附件上传组件
 * 用于Formily表单,支持上传、预览、删除
 * 使用文档功能统一附件上传接口
 */
const AttachmentUpload: React.FC<AttachmentUploadProps> = (props) => {
	const {
		value,
		onChange,
		maxSize = 50,
		accept,
		description = '点击或拖拽文件到此区域上传',
	} = props;

	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const field = useField();
	const isReadPretty = !!(field && (field as any).pattern === 'readPretty');

	const normalizedValue = useMemo(() => {
		if (!value) return undefined;

		if (typeof value === 'string') {
			const blobName = value;
			const fileName = blobName.split('/').pop() || blobName.split('\\').pop() || blobName;
			return { blobName, fileName, id: blobName };
		}

		if (value.fileName) return value;

		if (value.blobName) {
			const blobName = value.blobName;
			const fileName = blobName.split('/').pop() || blobName.split('\\').pop() || value.name || '附件';
			return { ...value, blobName, fileName, id: value.id || blobName };
		}

		return value;
	}, [value]);

	// 当 value 变化时同步更新 fileList
	useEffect(() => {
		console.log('[AttachmentUpload] value changed:', normalizedValue);
		if (normalizedValue && normalizedValue.fileName) {
			console.log('[AttachmentUpload] Setting fileList from value');
			setFileList([
				{
					uid: normalizedValue.id || '-1',
					name: normalizedValue.fileName || '附件',
					status: 'done',
					url: normalizedValue.url,
				},
			]);
		} else if (!normalizedValue) {
			console.log('[AttachmentUpload] Clearing fileList');
			setFileList([]);
		}
	}, [normalizedValue]);

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
		file: File,
	): Promise<void> => {
		const chunkFile = new File([chunk], file.name, { type: file.type });
		await TempFileUploadUploadChunkAsync({ uploadId, chunkIndex }, {}, chunkFile);
	};

	// 上传文件（支持分片和断点续传）
	const uploadFileWithChunks = async (file: File): Promise<any> => {
		try {
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
			for (const chunkIndex of missingChunks) {
				if (chunkIndex < chunks.length) {
					await uploadChunk(uploadId, chunkIndex, chunks[chunkIndex], file);
				}
			}

			// 5. 完成上传
			const result = await TempFileUploadCompleteUploadAsync({ uploadId });
			return result;
		} catch (error) {
			console.error('文件上传失败:', error);
			throw error;
		}
	};

	const uploadProps: UploadProps = {
		name: 'file',
		multiple: false,
		maxCount: 1,
		fileList,
		accept,
		disabled: isReadPretty,
		customRequest: async ({ file, onSuccess, onError }) => {
			try {
				const uploadFile = file as File;

				// 检查文件大小
				if (uploadFile.size > maxSize * 1024 * 1024) {
					message.error(`文件大小不能超过${maxSize}MB`);
					onError?.(new Error('文件大小超限'));
					return;
				}

				// 上传文件
				const result = await uploadFileWithChunks(uploadFile);

				if (result && result.id) {
					const fileData = {
						fileName: result.fileName || uploadFile.name,
						uploadId: result.uploadId, // UploadId用于提交表单
						id: result.id, // 临时文件记录ID
						size: result.totalSize || uploadFile.size,
						contentType: result.contentType || uploadFile.type,
					};

					// 手动更新 fileList 显示已上传的文件
					console.log('[AttachmentUpload] customRequest success, setting fileList:', result);
					setFileList([
						{
							uid: result.id || '-1',
							name: result.fileName || uploadFile.name,
							status: 'done',
						},
					]);

					onChange?.(fileData);
					onSuccess?.(result);
					message.success('上传成功');
				} else {
					throw new Error('上传失败');
				}
			} catch (error) {
				console.error('上传失败:', error);
				message.error('上传失败');
				onError?.(error as Error);
			}
		},
		onChange: (info) => {
			console.log('[AttachmentUpload] onChange called, info.fileList:', info.fileList);
			// 当有文件在上传或已完成时，更新 fileList
			const lastFile = info.fileList.slice(-1);
			if (lastFile.length > 0 && lastFile[0].status !== 'removed') {
				console.log('[AttachmentUpload] onChange updating fileList to:', lastFile);
				setFileList(lastFile);
			}
		},
		onRemove: () => {
			if (isReadPretty) return false as any;
			onChange?.(undefined);
			setFileList([]);
		},
	};

	// console.log('[AttachmentUpload] Rendering with fileList:', fileList);

	// 如果有已上传的文件，显示文件信息而不是 Dragger
	if (fileList.length > 0 && fileList[0].status === 'done') {
		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f5f5f5', borderRadius: 4 }}>
				<span style={{ flex: 1 }}>{fileList[0].name}</span>
				{!isReadPretty && (
					<button
						type="button"
						onClick={() => {
							onChange?.(undefined);
							setFileList([]);
						}}
						style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ff4d4f' }}
					>
						删除
					</button>
				)}
			</div>
		);
	}

	return (
		<Dragger {...uploadProps} showUploadList={{ showRemoveIcon: !isReadPretty, showPreviewIcon: false }}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">{description}</p>
			<p className="ant-upload-hint">支持单个文件上传,文件大小不超过{maxSize}MB</p>
		</Dragger>
	);
};

export default AttachmentUpload;
