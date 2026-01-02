import { Alert, Button, message, Modal, Upload, UploadFile } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useBoolean } from 'ahooks';
import { downloadBlob } from '@/_utils';
import { request, serverUrl } from 'umi';
import * as XLSX from 'xlsx';
import { AgGridPlus } from '@nokecy/qc-ui';

interface ImportProps {
	onAfterSubmit?: (response: any) => void;
	title: string;
	downUrl: string;
	uploadUrl: string;
	children?: React.ReactNode;
	id?: string;
}

const ImportLook: React.FC<ImportProps> = ({ onAfterSubmit, title, downUrl, uploadUrl, children, id }) => {
	const [visible, { setTrue, setFalse }] = useBoolean(false);
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [columnDefs, setColumnDefs] = useState<any[]>([]);
	const [rowData, setRowData] = useState<any[]>([]);

	// 解析 Excel 文件
	const handleFileParse = (file: File) => {
		const reader = new FileReader();
		reader.onload = (event: any) => {
			const data = new Uint8Array(event?.target?.result);
			const workbook = XLSX.read(data, { type: 'array' });
			const sheetName = workbook.SheetNames[0];
			const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

			const headers: any = worksheet[0]; // 第一行作为表头
			const dataRows: any = worksheet.slice(1); // 剩余行作为数据

			// 生成 columnDefs 和 rowData
			setColumnDefs(headers.map((header: string) => ({ headerName: header, field: header })));
			setRowData(
				dataRows.map((row: any[]) =>
					row.reduce((acc, cell, i) => {
						acc[headers[i]] = cell !== undefined ? cell : '空属性'; // 空值处理
						return acc;
					}, {})
				)
			);
		};
		reader.readAsArrayBuffer(file);
	};

	// 上传前的处理函数
	const beforeUpload = (file: UploadFile) => {
		handleFileParse(file as unknown as File); // 转换类型以适应 FileReader
		setFileList([file]); // 只允许上传一个文件
		return false; // 阻止自动上传
	};

	// 处理上传逻辑
	const handleUpload = () => {
		if (fileList.length === 0) {
			return message.error('请先选择文件');
		}

		const formData = new FormData();
		formData.append('file', fileList[0] as any);

		request(uploadUrl, {
			method: 'POST',
			data: formData,
		}).then((response) => {
			clearModal()
			if (onAfterSubmit) onAfterSubmit(response);
		});
	};

	// 清除模态框数据
	const clearModal = () => {
		setFalse();
		setFileList([]);
		setRowData([]);
		setColumnDefs([]);
	};

	return (
		<>
			<Button onClick={setTrue}>{children || '导入'}</Button>

			<Modal
				title={`批量导入${title}`}
				width={880}
				open={visible}
				onOk={handleUpload}
				okText="确认导入"
				onCancel={clearModal}
				destroyOnClose
			>
				<Alert
					message={
						<span>
							点击下载{' '}
							<a
								onClick={() => downloadBlob(downUrl, `批量上传${title}模版.xlsx`)}
							>
								模版
							</a>
						</span>
					}
					type="info"
				/>

				{rowData.length > 0 && (
					<AgGridPlus
						style={{ height: 360, marginTop: 10 }}
						gridKey="fileTable"
						hideTool
						search={false}
						dataSource={rowData}
						columnDefs={columnDefs}
						pagination={false}
					/>
				)}

				<Upload.Dragger
					style={{ marginTop: 10 }}
					multiple={false}
					beforeUpload={beforeUpload}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">单击或拖动文件到该区域上传</p>
				</Upload.Dragger>
			</Modal>
		</>
	);
};

export default ImportLook;
