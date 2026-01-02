/**
 * 强制解锁二次确认弹窗
 * 
 * 用途：管理员强制解除他人的检出锁
 * 效果：只解除锁，不删除工作修订
 */
import React, { useState } from 'react';
import { Modal, Form, Input, Descriptions, Tag, Alert, message } from 'antd';
import { LockOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { DocumentLifecycleForceUnlockAsync } from '@/services/pdm/DocumentLifecycle';
import dayjs from 'dayjs';

const { TextArea } = Input;

export interface ForceUnlockDialogProps {
    /** 是否显示 */
    visible: boolean;
    /** 文档信息 */
    document: {
        id: string;
        documentNumber: string;
        documentName: string;
        checkOutInfo?: {
            checkOutUserName?: string;
            checkOutTime?: string;
            expireAt?: string;
        };
        currentRevisionFullVersion?: string;
    };
    /** 关闭回调 */
    onClose: () => void;
    /** 成功回调 */
    onSuccess?: () => void;
}

const ForceUnlockDialog: React.FC<ForceUnlockDialogProps> = ({
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

            await DocumentLifecycleForceUnlockAsync({
                id: document.id,
                reason: values.reason,
            });

            message.success(`已强制解锁：${document.documentNumber}（工作修订已保留）`);
            form.resetFields();
            onSuccess?.();
            onClose();
        } catch (error: any) {
            if (error?.errorFields) {
                // 表单校验错误
                return;
            }
            message.error(error?.message || '强制解锁失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    const formatDate = (date?: string) => {
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-';
    };

    return (
        <Modal
            title="强制解锁文档？"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认解锁"
            cancelText="取消"
            confirmLoading={loading}
            width={520}
            destroyOnClose
        >
            <Alert
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
                message="操作说明"
                description={
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                        <li>你将解除该文档的检出锁，允许其他人继续编辑当前工作修订。</li>
                        <li><strong>不会删除</strong>当前工作修订与工作区文件。</li>
                        <li><strong>不会影响</strong>已发布基线版本（仍可按发布版本使用/下载）。</li>
                        <li>若检出人仍在编辑，可能产生并发冲突或重复修改风险。</li>
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
                    <strong>{document.documentNumber}</strong> / {document.documentName}
                </Descriptions.Item>
                <Descriptions.Item label="当前检出人">
                    <Tag icon={<UserOutlined />} color="orange">
                        {document.checkOutInfo?.checkOutUserName || '-'}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="检出时间">
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {formatDate(document.checkOutInfo?.checkOutTime)}
                </Descriptions.Item>
                <Descriptions.Item label="到期时间">
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {formatDate(document.checkOutInfo?.expireAt)}
                </Descriptions.Item>
                <Descriptions.Item label="当前工作修订">
                    <Tag icon={<LockOutlined />} color="blue">
                        {document.currentRevisionFullVersion || '-'}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>

            <Form form={form} layout="vertical">
                <Form.Item
                    name="reason"
                    label="强制解锁原因"
                    rules={[
                        { required: true, message: '请输入强制解锁原因' },
                        { min: 5, message: '原因至少5个字' },
                        { max: 200, message: '原因最多200个字' },
                    ]}
                >
                    <TextArea
                        rows={3}
                        placeholder="例如：检出人离线/离职、超时未处理、紧急修复需接管…"
                        showCount
                        maxLength={200}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ForceUnlockDialog;
