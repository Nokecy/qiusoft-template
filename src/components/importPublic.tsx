import { Alert, Button, message, Modal, Upload } from 'antd';
import { InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import React from 'react';
import { useBoolean } from 'ahooks';
import { downloadBlob } from '@/_utils';
import { request } from 'umi';

const Import = (props: any) => {
	const { onAfterSubmit, title, downUrl, uploadUrl, children, id, icon, type, onRealSuccess, method } = props;
	const [visible, { setTrue, setFalse }] = useBoolean(false);
	return (
		<>
			<Button icon={icon || <CloudUploadOutlined />} type={type || 'default'} onClick={setTrue}>
				{children || '导入'}
			</Button>

			<Modal title={`批量导入${title}`} open={visible} onCancel={setFalse} destroyOnClose>
				<Alert
					message={
						<span>
							点击下载{' '}
							<a
								onClick={() => {
									if (downUrl) {
										downloadBlob(downUrl, `批量上传${title}模版.xlsx`);
									} else {
										message.error('暂无模版');
									}
								}}
							>
								模版
							</a>
						</span>
					}
					type={'info'}
				/>

				<Upload.Dragger
					style={{ marginTop: 10 }}
					multiple={false}
					action={id && id.length > 0 ? `${uploadUrl}?id=${id || ''}` : `${uploadUrl}`}
					customRequest={({ action,
						file,
						headers,
						onError,
						onProgress,
						onSuccess,
						withCredentials }) => {
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
							message.success('导入成功');
							setFalse();
							if (onAfterSubmit) onAfterSubmit(info.file.response);
						}
						// if (info.file.status === 'error') {
						// 	Modal.info({
						// 		title: '导入失败,原因如下:',
						// 		closable: true,
						// 		width: 1000,
						// 		content: info?.file?.response?.error?.message,
						// 	});
						// }
					}}
				>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>单击或拖动文件到该区域上传</p>
				</Upload.Dragger>
			</Modal >
		</>
	);
};

export default Import;