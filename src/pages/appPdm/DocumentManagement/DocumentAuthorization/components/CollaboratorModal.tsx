import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, DatePicker, Radio, Alert, Space } from 'antd';
import { useRequest } from 'ahooks';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import { CollaborationRoleOptions, CollaborationRoles } from '../constants';
import dayjs from 'dayjs';

/** 用户选择组件 */
const UserSelectField: React.FC<any> = (props) => {
    const { data, loading, run } = useRequest(
        async (filter?: string) => {
            const res = await IdentityUserProGetListAsync({
                Filter: filter ? `(name=*${filter}) | (userName=*${filter})` : '',
                SkipCount: 0,
                MaxResultCount: 100,
            });
            return res.items || [];
        },
        { manual: true }
    );

    return (
        <Select
            {...props}
            showSearch
            placeholder="搜索并选择用户..."
            filterOption={false}
            loading={loading}
            onSearch={(value) => run(value)}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.userName,
                label: `${item.userName} / ${item.name || ''}`,
            }))}
        />
    );
};

export interface CollaboratorData {
    id?: string;
    documentId?: string;
    userId?: string;
    userName?: string;
    role?: number;
    expireTime?: string;
    isEnabled?: boolean;
}

interface CollaboratorModalProps {
    /** 是否显示 */
    open: boolean;
    /** 关闭回调 */
    onClose: () => void;
    /** 保存回调 */
    onSave: (data: CollaboratorData) => void;
    /** 编辑的数据（新增时为空） */
    editData?: CollaboratorData;
    /** 文档ID */
    documentId?: string;
    /** 确认按钮加载状态 */
    confirmLoading?: boolean;
}

/** 协作者编辑Modal */
const CollaboratorModal: React.FC<CollaboratorModalProps> = ({
    open,
    onClose,
    onSave,
    editData,
    documentId,
    confirmLoading = false,
}) => {
    const [form] = Form.useForm();
    const isEditMode = !!editData?.id;

    // 初始化表单
    useEffect(() => {
        if (open) {
            if (editData) {
                form.setFieldsValue({
                    userId: editData.userId,
                    role: editData.role,
                    expireTime: editData.expireTime ? dayjs(editData.expireTime) : null,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({
                    role: CollaborationRoles.Reader,
                });
            }
        }
    }, [open, editData, form]);

    // 获取角色描述
    const getRoleDescription = (role: number) => {
        const option = CollaborationRoleOptions.find(o => o.value === role);
        return option?.description || '';
    };

    // 提交
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const data: CollaboratorData = {
                id: editData?.id,
                documentId: documentId,
                userId: values.userId,
                role: values.role,
                expireTime: values.expireTime ? values.expireTime.toISOString() : undefined,
                isEnabled: true,
            };

            onSave(data);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    return (
        <Modal
            title={isEditMode ? '编辑协作者' : '新增协作者'}
            open={open}
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            width={500}
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Form.Item
                    name="userId"
                    label="用户"
                    rules={[{ required: true, message: '请选择用户' }]}
                >
                    <UserSelectField disabled={isEditMode} />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="协作角色"
                    rules={[{ required: true, message: '请选择协作角色' }]}
                >
                    <Radio.Group>
                        <Space direction="vertical">
                            {CollaborationRoleOptions.map(option => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                    <span style={{ color: '#999', marginLeft: 8, fontSize: 12 }}>
                                        - {option.description}
                                    </span>
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="expireTime"
                    label="过期时间"
                    extra="留空表示永久有效"
                >
                    <DatePicker
                        showTime
                        placeholder="选择过期时间（可选）"
                        style={{ width: '100%' }}
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                    />
                </Form.Item>

                <Alert
                    type="info"
                    showIcon
                    message="协作者权限说明"
                    description={
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                            <li><strong>编辑协作者</strong>：默认除发布外全部动作（不含授权管理）</li>
                            <li><strong>评审协作者</strong>：默认只读权限</li>
                            <li><strong>只读协作者</strong>：默认只读权限</li>
                        </ul>
                    }
                />
            </Form>
        </Modal>
    );
};

export default CollaboratorModal;
