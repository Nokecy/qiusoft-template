/**
 * 签出确认弹窗
 *
 * 用途：基于最新发布版本创建工作修订并加锁
 * 效果：创建草稿修订，锁定文档，不影响已发布基线
 */
import React, { useState } from 'react';
import { Modal, Form, Input, Descriptions, Tag, Alert, message, Space } from 'antd';
import { LockOutlined, FileTextOutlined, BranchesOutlined } from '@ant-design/icons';
import { DocumentLifecycleCheckOutAsync } from '@/services/pdm/DocumentLifecycle';

const { TextArea } = Input;

export interface CheckOutDialogProps {
    /** 是否显示 */
    visible: boolean;
    /** 文档信息 */
    document: {
        id: string;
        documentNumber: string;
        documentName: string;
        latestReleasedFullVersion?: string;
    };
    /** 关闭回调 */
    onClose: () => void;
    /** 成功回调 */
    onSuccess?: () => void;
}

const CheckOutDialog: React.FC<CheckOutDialogProps> = ({
    visible,
    document,
    onClose,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            await DocumentLifecycleCheckOutAsync({
                id: document.id,
                comment: values.comment,
            });

            message.success(`已签出：${document.documentNumber}（已创建工作修订，已发布基线不受影响）`);
            form.resetFields();
            onSuccess?.();
            onClose();
        } catch (error: any) {
            if (error?.errorFields) {
                // 表单校验错误
                return;
            }
            const errorMsg = error?.message || '签出失败，请重试';
            if (errorMsg.includes('已被他人检出') || errorMsg.includes('CheckedOut')) {
                message.error('文档已被他人检出，请刷新后重试');
            } else if (errorMsg.includes('存在工作修订') || errorMsg.includes('CurrentRevision')) {
                message.error('当前已存在工作修订，不允许再次签出');
            } else if (errorMsg.includes('未发布') || errorMsg.includes('Unreleased')) {
                message.error('仅已发布文档可签出');
            } else {
                message.error(errorMsg);
            }
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
            title="签出文档？"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认签出"
            cancelText="取消"
            confirmLoading={loading}
            width={520}
            destroyOnClose
        >
            <Alert
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
                message="操作说明"
                description={
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                        <li>你将基于最新发布版本（{document.latestReleasedFullVersion || '-'}）创建工作修订（草稿）。</li>
                        <li>工作修订创建后，文档将被锁定，其他用户无法同时编辑。</li>
                        <li><strong>已发布基线版本不受影响</strong>，其他用户仍可按发布版本使用/下载。</li>
                        <li>签出后你可以修改工作区文件，完成后需签入解除锁定。</li>
                    </ul>
                }
            />

            <Descriptions
                bordered
                size="small"
                column={1}
                style={{ marginBottom: 16 }}
            >
                <Descriptions.Item label="文档">
                    <Space>
                        <FileTextOutlined />
                        <strong>{document.documentNumber}</strong> / {document.documentName}
                    </Space>
                </Descriptions.Item>
                <Descriptions.Item label="基于版本">
                    <Tag icon={<BranchesOutlined />} color="green">
                        {document.latestReleasedFullVersion || '最新发布版本'}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="将要创建">
                    <Tag icon={<LockOutlined />} color="blue">
                        新草稿修订（Working Draft）
                    </Tag>
                </Descriptions.Item>
            </Descriptions>

            <Form form={form} layout="vertical">
                <Form.Item
                    name="comment"
                    label="签出备注（可选）"
                    rules={[
                        { max: 200, message: '备注最多200个字' },
                    ]}
                >
                    <TextArea
                        rows={2}
                        placeholder="例如：修改图纸尺寸、更新技术参数…"
                        showCount
                        maxLength={200}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CheckOutDialog;
