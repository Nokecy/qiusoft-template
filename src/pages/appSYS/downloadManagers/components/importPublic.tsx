import { Button, message, Modal, Upload, Select, Form, Space, Input } from 'antd';
import { InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useBoolean } from 'ahooks';
import { request } from 'umi';

interface ClientImportProps {
	onAfterSubmit?: (response?: any) => void;
	title?: string;
	uploadUrl: string;
	fileType?: 'PdaApk' | 'PrinterClient';
	id?: string;
	icon?: React.ReactNode;
	method?: 'POST' | 'PUT';
	onRealSuccess?: (response?: any) => void;
	showAppSelector?: boolean; // 是否显示应用选择器
}

// 应用类型配置
const APP_TYPES = [
	{ label: 'PDA客户端 (Android)', value: 'PdaApk' },
	{ label: '打印客户端 (Windows)', value: 'PrinterClient' },
	{ label: '自定义应用', value: 'Custom' }
];

const ClientImport: React.FC<ClientImportProps> = (props) => {
	const {
		onAfterSubmit,
		title = '上传客户端',
		uploadUrl,
		fileType,
		id,
		icon,
		method = 'POST',
		onRealSuccess,
		showAppSelector = true
	} = props;
	const [visible, { setTrue, setFalse }] = useBoolean(false);
	const [selectedApp, setSelectedApp] = useState<string>(fileType || 'PdaApk');
	const [force, setForce] = useState<boolean>(true);
	const [customAppName, setCustomAppName] = useState<string>('');
	const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

	// 处理应用类型选择
	const handleAppTypeChange = (value: string) => {
		setSelectedApp(value);
		setIsCustomMode(value === 'Custom');
		if (value !== 'Custom') {
			setCustomAppName(''); // 切换回预定义类型时清空自定义名称
		}
	};

	// 计算最终的应用名称
	const getFinalAppName = (): string => {
		return isCustomMode ? customAppName : selectedApp;
	};

	// 验证自定义应用名称
	const validateCustomAppName = (): boolean => {
		if (isCustomMode) {
			const trimmedName = customAppName.trim();
			if (!trimmedName) {
				message.warning('请输入应用名称');
				return false;
			}
			if (trimmedName.length < 2 || trimmedName.length > 50) {
				message.warning('应用名称长度应在 2-50 个字符之间');
				return false;
			}
		}
		return true;
	};

	return (
		<>
			<Button icon={icon || <CloudUploadOutlined />} type='primary' onClick={setTrue}>
				{title}
			</Button>

			<Modal
				title={title}
				open={visible}
				onCancel={setFalse}
				destroyOnClose
				footer={null}
				width={600}
			>
				{showAppSelector && !fileType && (
					<Form layout="vertical" style={{ marginBottom: 16 }}>
						<Form.Item label="选择应用类型" required>
							<Select
								value={selectedApp}
								onChange={handleAppTypeChange}
								options={APP_TYPES}
								style={{ width: '100%' }}
							/>
						</Form.Item>
						{isCustomMode && (
							<Form.Item
								label="应用名称"
								required
								tooltip="应用名称用于文件分类管理,长度 2-50 字符"
							>
								<Input
									placeholder="请输入应用名称 (如: MobileApp, DesktopClient)"
									value={customAppName}
									onChange={(e) => setCustomAppName(e.target.value)}
									maxLength={50}
									showCount
								/>
							</Form.Item>
						)}
						<Form.Item label="强制覆盖">
							<Select
								value={force}
								onChange={setForce}
								options={[
									{ label: '是（覆盖已存在的文件）', value: true },
									{ label: '否（保留已存在的文件）', value: false }
								]}
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</Form>
				)}

				<Upload.Dragger
					style={{ marginTop: 10 }}
					multiple={false}
					beforeUpload={() => {
						// 上传前验证自定义应用名称
						return validateCustomAppName();
					}}
					action={
						id && id.length > 0
							? `${uploadUrl}?AppName=${getFinalAppName()}&Force=${force}&id=${id}`
							: `${uploadUrl}?AppName=${getFinalAppName()}&Force=${force}`
					}
					customRequest={({ action,
						file,
						headers,
						onError,
						onProgress,
						onSuccess,
						withCredentials }) => {
						// 再次验证,确保安全
						if (!validateCustomAppName()) {
							onError && onError(new Error('请输入有效的应用名称'));
							return;
						}
						const formData = new FormData();
						formData.append('file', file); // 将文件添加到 FormData 中
						request(action, {
							method: method || 'POST',
							data: formData,
							headers,
							onUploadProgress: ({ total, loaded }) => {
								// 进行上传进度输出，更加直观
								//@ts-ignore
								onProgress && onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
							},
						}).then(response => {
							//@ts-ignore
							onSuccess && onSuccess(response, file);
							onRealSuccess && onRealSuccess(response)
						})
							.catch(onError);
					}}
					onChange={info => {
						if (info.file.status === 'done') {
							message.success('上传成功');
							setFalse();
							if (onAfterSubmit) onAfterSubmit(info.file.response);
						} else if (info.file.status === 'error') {
							message.error('上传失败: ' + (info?.file?.response?.error?.message || '未知错误'));
						}
					}}
				>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>单击或拖动文件到该区域上传</p>
					<p className='ant-upload-hint'>
						{showAppSelector && !fileType
							? isCustomMode
								? `将上传到: 自定义应用${customAppName ? ` (${customAppName})` : ''}`
								: `将上传到: ${APP_TYPES.find(t => t.value === selectedApp)?.label}`
							: '支持单个文件上传，适合小于10MB的文件'
						}
					</p>
				</Upload.Dragger>
			</Modal>
		</>
	);
};

export default ClientImport;