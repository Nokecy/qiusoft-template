/**
 * 撤销修订二次确认弹窗（高风险操作）
 * 
 * 用途：丢弃当前工作修订，回到"仅发布基线"状态
 * 效果：删除工作修订与工作区文件，不可恢复
 */
import React, { useState } from 'react';
import { Modal, Form, Input, Descriptions, Tag, Alert, message, Checkbox, Space } from 'antd';
import { ExclamationCircleFilled, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { DocumentLifecycleDiscardRevisionAsync } from '@/services/pdm/DocumentLifecycle';

const { TextArea } = Input;

export interface DiscardRevisionDialogProps {
    /** 是否显示 */
    visible: boolean;
    /** 文档信息 */
    document: {
        id: string;
        documentNumber: string;
        documentName: string;
        latestReleasedFullVersion?: string;
        currentRevisionFullVersion?: string;
        workingFileCount?: number;
        isCheckedOut?: boolean;
        checkOutInfo?: {
            checkOutUserName?: string;
        };
    };
    /** 关闭回调 */
    onClose: () => void;
    /** 成功回调 */
    onSuccess?: () => void;
}

const DiscardRevisionDialog: React.FC<DiscardRevisionDialogProps> = ({
    visible,
    document,
    onClose,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [confirmChecked1, setConfirmChecked1] = useState(false);
    const [confirmChecked2, setConfirmChecked2] = useState(false);

    const isConfirmValid = confirmChecked1 && confirmChecked2;

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // 校验确认文本
            if (values.confirmText !== document.documentNumber) {
                message.error('请输入正确的文档编号进行确认');
                return;
            }

            if (!isConfirmValid) {
                message.error('请勾选确认选项');
                return;
            }

            setLoading(true);

            await DocumentLifecycleDiscardRevisionAsync({
                id: document.id,
                reason: values.reason,
            });

            message.success(`已撤销修订：${document.documentNumber}（已回到发布基线）`);
            form.resetFields();
            setConfirmChecked1(false);
            setConfirmChecked2(false);
            onSuccess?.();
            onClose();
        } catch (error: any) {
            if (error?.errorFields) {
                // 表单校验错误
                return;
            }
            const errorMsg = error?.message || '撤销修订失败，请重试';
            if (errorMsg.includes('InApproval') || errorMsg.includes('审批中')) {
                message.error('当前修订状态不允许撤销（审批中），请先驳回/撤回');
            } else if (errorMsg.includes('Approved') || errorMsg.includes('已批准')) {
                message.error('当前修订状态不允许撤销（待发布），请先撤回或完成发布');
            } else {
                message.error(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setConfirmChecked1(false);
        setConfirmChecked2(false);
        onClose();
    };

    return (
        <Modal
            title={
                <Space>
                    <ExclamationCircleFilled style={{ color: '#ff4d4f' }} />
                    撤销当前修订并丢弃所有变更？
                </Space>
            }
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认撤销修订"
            okButtonProps={{ danger: true, disabled: !isConfirmValid }}
            cancelText="取消"
            confirmLoading={loading}
            width={560}
            destroyOnClose
        >
            <Alert
                type="error"
                showIcon
                icon={<ExclamationCircleFilled />}
                style={{ marginBottom: 16 }}
                message="高风险操作警告"
                description={
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                        <li>你将<strong>永久删除</strong>当前工作修订及其工作区文件（不可恢复）。</li>
                        <li>该操作会清空当前修订，回到"仅发布基线"的状态。</li>
                        <li><strong>不会影响</strong>已发布基线版本（仍可用）。</li>
                        <li>若当前处于检出锁定，将同时解除锁定。</li>
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
                <Descriptions.Item label="发布基线">
                    <Tag color="green">
                        {document.latestReleasedFullVersion || '未发布'}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="将被删除的工作修订">
                    <Tag icon={<DeleteOutlined />} color="red">
                        {document.currentRevisionFullVersion || '-'}（状态：Draft）
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="将被删除的工作区文件数">
                    <Tag icon={<FileOutlined />} color="orange">
                        {document.workingFileCount ?? '-'} 个文件
                    </Tag>
                </Descriptions.Item>
                {document.isCheckedOut && (
                    <Descriptions.Item label="锁定信息">
                        <Tag color="warning">
                            已检出（将同时解除锁定）- {document.checkOutInfo?.checkOutUserName}
                        </Tag>
                    </Descriptions.Item>
                )}
            </Descriptions>

            <Form form={form} layout="vertical">
                <Form.Item
                    name="confirmText"
                    label={`请输入文档编号 "${document.documentNumber}" 以确认`}
                    rules={[
                        { required: true, message: '请输入文档编号进行确认' },
                        {
                            validator: (_, value) => {
                                if (value && value !== document.documentNumber) {
                                    return Promise.reject(new Error('文档编号不匹配'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input placeholder={document.documentNumber} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 8 }}>
                    <Space direction="vertical">
                        <Checkbox
                            checked={confirmChecked1}
                            onChange={(e) => setConfirmChecked1(e.target.checked)}
                        >
                            我已理解该操作不可恢复
                        </Checkbox>
                        <Checkbox
                            checked={confirmChecked2}
                            onChange={(e) => setConfirmChecked2(e.target.checked)}
                        >
                            我确认放弃当前修订的全部文件与变更
                        </Checkbox>
                    </Space>
                </Form.Item>

                <Form.Item
                    name="reason"
                    label="撤销修订原因"
                    rules={[
                        { required: true, message: '请输入撤销修订原因' },
                        { min: 5, message: '原因至少5个字' },
                        { max: 200, message: '原因最多200个字' },
                    ]}
                >
                    <TextArea
                        rows={3}
                        placeholder="例如：误操作、变更方向取消、修订文件不再需要…"
                        showCount
                        maxLength={200}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DiscardRevisionDialog;
