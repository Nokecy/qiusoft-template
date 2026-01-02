import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { DocumentUpdateWorkingAsync } from '@/services/pdm/Document';

const { TextArea } = Input;

// 密级选项
const securityLevelOptions = [
    { label: '公开', value: 0 },
    { label: '内部', value: 1 },
    { label: '机密', value: 2 },
    { label: '绝密', value: 3 },
];

export interface EditWorkingDocumentDialogProps {
    visible: boolean;
    document: {
        id: string;
        documentNumber: string;
        documentName: string;
        description?: string;
        keywords?: string;
        securityLevel?: number;
    };
    onClose: () => void;
    onSuccess: () => void;
}

const EditWorkingDocumentDialog: React.FC<EditWorkingDocumentDialogProps> = ({
    visible,
    document,
    onClose,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    // 弹窗打开时初始化表单
    useEffect(() => {
        if (visible && document) {
            form.setFieldsValue({
                documentName: document.documentName,
                description: document.description,
                keywords: document.keywords,
                securityLevel: document.securityLevel ?? 1,
                changeDescription: '',
            });
        }
    }, [visible, document, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            await DocumentUpdateWorkingAsync(
                { id: document.id },
                {
                    documentName: values.documentName,
                    description: values.description,
                    keywords: values.keywords,
                    securityLevel: values.securityLevel,
                    changeDescription: values.changeDescription,
                }
            );

            message.success('保存成功');
            onSuccess();
            onClose();
        } catch (error: any) {
            if (error?.errorFields) {
                // 表单验证错误
                return;
            }
            message.error(error?.message || '保存失败');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={`编辑文档 - ${document?.documentNumber || ''}`}
            open={visible}
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={loading}
            width={600}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                preserve={false}
            >
                <Form.Item
                    name="documentName"
                    label="文档名称"
                    rules={[
                        { required: true, message: '请输入文档名称' },
                        { max: 256, message: '文档名称不能超过256个字符' },
                    ]}
                >
                    <Input placeholder="请输入文档名称" />
                </Form.Item>

                <Form.Item
                    name="securityLevel"
                    label="密级"
                    rules={[{ required: true, message: '请选择密级' }]}
                >
                    <Select
                        placeholder="请选择密级"
                        options={securityLevelOptions}
                    />
                </Form.Item>

                <Form.Item
                    name="keywords"
                    label="关键词"
                    rules={[{ max: 500, message: '关键词不能超过500个字符' }]}
                >
                    <Input placeholder="请输入关键词，多个关键词用逗号分隔" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="描述"
                    rules={[{ max: 2000, message: '描述不能超过2000个字符' }]}
                >
                    <TextArea
                        placeholder="请输入描述"
                        rows={3}
                        showCount
                        maxLength={2000}
                    />
                </Form.Item>

                <Form.Item
                    name="changeDescription"
                    label="变更说明"
                    extra="记录本次修订的变更内容"
                    rules={[{ max: 2000, message: '变更说明不能超过2000个字符' }]}
                >
                    <TextArea
                        placeholder="请输入变更说明"
                        rows={3}
                        showCount
                        maxLength={2000}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditWorkingDocumentDialog;
