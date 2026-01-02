/**
 * 签入确认弹窗
 *
 * 用途：解除检出锁定，允许其他用户继续操作
 * 效果：解除锁定，工作修订保留为草稿，需后续提交审批
 */
import React, { useState } from 'react';
import { Modal, Form, Input, Descriptions, Tag, Alert, message, Space } from 'antd';
import { UnlockOutlined, FileTextOutlined, ClockCircleOutlined, EditOutlined } from '@ant-design/icons';
import { DocumentLifecycleCheckInAsync } from '@/services/pdm/DocumentLifecycle';
import dayjs from 'dayjs';

const { TextArea } = Input;

export interface CheckInDialogProps {
    /** 是否显示 */
    visible: boolean;
    /** 文档信息 */
    document: {
        id: string;
        documentNumber: string;
        documentName: string;
        currentRevisionFullVersion?: string;
        workingFileCount?: number;
        checkOutInfo?: {
            checkedOutTime?: string;
        };
    };
    /** 关闭回调 */
    onClose: () => void;
    /** 成功回调 */
    onSuccess?: () => void;
}

const CheckInDialog: React.FC<CheckInDialogProps> = ({
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

            await DocumentLifecycleCheckInAsync({
                id: document.id,
                comment: values.comment,
            });

            message.success(`已签入：${document.documentNumber}（已解除锁定，请提交审批）`);
            form.resetFields();
            onSuccess?.();
            onClose();
        } catch (error: any) {
            if (error?.errorFields) {
                // 表单校验错误
                return;
            }
            const errorMsg = error?.message || '签入失败，请重试';
            if (errorMsg.includes('只能签入自己') || errorMsg.includes('OtherUser')) {
                message.error('只能签入自己检出的文档');
            } else if (errorMsg.includes('未处于检出状态') || errorMsg.includes('NotCheckedOut')) {
                message.error('文档未处于检出状态，请刷新');
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

    const formatDate = (date?: string) => {
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-';
    };

    return (
        <Modal
            title="签入文档？"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认签入"
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
                        <li>签入将解除检出锁定，其他有权限的用户可以继续操作此文档。</li>
                        <li><strong>工作修订（草稿）将保留</strong>，但不会自动提交审批。</li>
                        <li>签入后，请进一步"提交审批"以推进发布流程。</li>
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
                <Descriptions.Item label="当前工作修订">
                    <Tag icon={<EditOutlined />} color="blue">
                        {document.currentRevisionFullVersion || '-'}（状态：Draft）
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="签出时间">
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {formatDate(document.checkOutInfo?.checkedOutTime)}
                </Descriptions.Item>
                <Descriptions.Item label="工作区文件数">
                    <Tag color="default">
                        {document.workingFileCount ?? '-'} 个文件
                    </Tag>
                </Descriptions.Item>
            </Descriptions>

            <Alert
                type="warning"
                showIcon
                icon={<UnlockOutlined />}
                style={{ marginBottom: 16 }}
                message="下一步提示"
                description="签入后，文档仍为草稿状态，请记得提交审批以推进发布流程。"
            />

            <Form form={form} layout="vertical">
                <Form.Item
                    name="comment"
                    label="签入备注（可选）"
                    rules={[
                        { max: 200, message: '备注最多200个字' },
                    ]}
                >
                    <TextArea
                        rows={2}
                        placeholder="例如：已完成图纸修改、待审批…"
                        showCount
                        maxLength={200}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CheckInDialog;
