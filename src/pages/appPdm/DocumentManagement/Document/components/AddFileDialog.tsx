import React, { useState } from 'react';
import { Modal, Form, Select, message, Alert } from 'antd';
import FileUploadWithChunks from './FileUploadWithChunks';
import { DocumentFileAddFileAsync } from '@/services/pdm/DocumentFile';

// 文件角色枚举
enum DocumentFileRole {
    Primary = 0,    // 主文档
    Secondary = 1,  // 次要文档
}

// 文件角色选项
const fileRoleOptions = [
    { label: '主文档', value: DocumentFileRole.Primary },
    { label: '次要文档', value: DocumentFileRole.Secondary },
];

export interface AddFileDialogProps {
    visible: boolean;
    documentId: string;
    documentNumber?: string;
    onClose: () => void;
    onSuccess: () => void;
}

const AddFileDialog: React.FC<AddFileDialogProps> = ({
    visible,
    documentId,
    documentNumber,
    onClose,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            if (!uploadedFiles || uploadedFiles.length === 0) {
                message.warning('请先上传文件');
                return;
            }

            // 检查文件是否上传完成
            const pendingFiles = uploadedFiles.filter(f => f.status !== 'done');
            if (pendingFiles.length > 0) {
                message.warning('请等待文件上传完成');
                return;
            }

            setLoading(true);

            // 逐个添加文件
            for (const file of uploadedFiles) {
                if (!file.uploadId) {
                    message.error(`文件 ${file.name || file.fileName} 上传信息不完整`);
                    continue;
                }

                await DocumentFileAddFileAsync(
                    { documentId },
                    {
                        uploadId: file.uploadId,
                        fileRole: values.fileRole,
                    }
                );
            }

            message.success(`成功添加 ${uploadedFiles.length} 个文件`);
            handleClose();
            onSuccess();
        } catch (error: any) {
            if (error?.errorFields) {
                return;
            }
            message.error(error?.message || '添加文件失败');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        form.resetFields();
        setUploadedFiles([]);
        onClose();
    };

    const handleFileChange = (files: any[]) => {
        setUploadedFiles(files);
    };

    return (
        <Modal
            title={`添加文件 - ${documentNumber || ''}`}
            open={visible}
            onOk={handleSubmit}
            onCancel={handleClose}
            confirmLoading={loading}
            width={600}
            destroyOnClose
            okText="添加"
            cancelText="取消"
        >
            <Alert
                message="提示"
                description="上传的文件将添加到当前工作修订中，签入发布后生效。"
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
            />

            <Form
                form={form}
                layout="vertical"
                initialValues={{ fileRole: DocumentFileRole.Secondary }}
                preserve={false}
            >
                <Form.Item
                    name="fileRole"
                    label="文件角色"
                    rules={[{ required: true, message: '请选择文件角色' }]}
                >
                    <Select
                        placeholder="请选择文件角色"
                        options={fileRoleOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="选择文件"
                    required
                    extra="支持多文件上传，文件大小不超过100MB"
                >
                    <FileUploadWithChunks
                        value={uploadedFiles}
                        onChange={handleFileChange}
                        maxCount={10}
                        inline={false}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFileDialog;
