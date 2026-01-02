import React, { useState, useCallback } from 'react';
import { Button, Modal, message, Transfer, Spin } from 'antd';
import type { TransferProps } from 'antd';
import { UserGetListAsync } from '@/services/openApi/User';
import {
    OrganizationUnitAddUsersToOrganizationUnit,
    OrganizationUnitGetUserListByOrganizationId,
} from '@/services/openApi/OrganizationUnit';

interface AddMemberModalProps {
    organizationUnitId: string;
    buttonProps?: any;
    onConfirm?: () => void;
    children?: React.ReactNode;
}

interface UserItem {
    key: string;
    title: string;
    description: string;
    disabled?: boolean;
}

const AddMemberModal: React.FC<AddMemberModalProps> = props => {
    const { organizationUnitId, buttonProps, onConfirm, children } = props;

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [dataSource, setDataSource] = useState<UserItem[]>([]);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    // 加载用户数据
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            // 获取所有用户
            const allUsersRes = await UserGetListAsync({
                MaxResultCount: 1000,
            });

            // 获取部门现有成员
            const existingMembersRes = await OrganizationUnitGetUserListByOrganizationId({
                organizationId: organizationUnitId,
            });
            const existingMemberIds = new Set((existingMembersRes.items || []).map(u => u.id));

            // 转换为 Transfer 数据格式
            const users: UserItem[] = (allUsersRes.items || []).map(user => ({
                key: user.id!,
                title: user.name || user.userName || '',
                description: user.userName || '',
                disabled: existingMemberIds.has(user.id), // 已在部门中的用户禁用
            }));

            setDataSource(users);
            // 默认选中已有成员
            setTargetKeys(Array.from(existingMemberIds) as string[]);
        } catch (error) {
            message.error('加载用户数据失败');
        } finally {
            setLoading(false);
        }
    }, [organizationUnitId]);

    // 打开弹窗
    const handleOpen = useCallback(() => {
        setVisible(true);
        loadData();
    }, [loadData]);

    // 关闭弹窗
    const handleClose = useCallback(() => {
        setVisible(false);
        setDataSource([]);
        setTargetKeys([]);
    }, []);

    // 穿梭框变化
    const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
        setTargetKeys(newTargetKeys as string[]);
    };

    // 提交
    const handleSubmit = useCallback(async () => {
        // 筛选出新增的用户ID（排除已禁用的）
        const existingDisabledKeys = dataSource.filter(d => d.disabled).map(d => d.key);
        const newUserIds = targetKeys.filter(key => !existingDisabledKeys.includes(key));

        if (newUserIds.length === 0) {
            message.info('没有选择新成员');
            handleClose();
            return;
        }

        setSubmitting(true);
        try {
            await OrganizationUnitAddUsersToOrganizationUnit({
                userIds: newUserIds,
                organizationUnitId: organizationUnitId,
            });
            message.success(`成功添加 ${newUserIds.length} 名成员`);
            handleClose();
            if (onConfirm) onConfirm();
        } catch (error: any) {
            message.error(error?.message || '添加成员失败');
        } finally {
            setSubmitting(false);
        }
    }, [targetKeys, dataSource, organizationUnitId, onConfirm, handleClose]);

    // 自定义渲染项
    const renderItem = (item: UserItem) => {
        return (
            <span>
                {item.title}
                {item.description && item.description !== item.title && (
                    <span style={{ color: '#999', marginLeft: 8 }}>({item.description})</span>
                )}
            </span>
        );
    };

    return (
        <>
            <Button type="primary" onClick={handleOpen} {...buttonProps}>
                {children}
            </Button>

            <Modal
                title="添加成员"
                open={visible}
                onCancel={handleClose}
                onOk={handleSubmit}
                confirmLoading={submitting}
                width={700}
                destroyOnClose
            >
                <Spin spinning={loading}>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                        <Transfer
                            dataSource={dataSource}
                            titles={['可选用户', '已选用户']}
                            targetKeys={targetKeys}
                            onChange={handleChange}
                            render={renderItem}
                            showSearch
                            filterOption={(inputValue, item) =>
                                item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
                                item.description.toLowerCase().includes(inputValue.toLowerCase())
                            }
                            listStyle={{
                                width: 280,
                                height: 400,
                            }}
                            locale={{
                                itemUnit: '人',
                                itemsUnit: '人',
                                searchPlaceholder: '搜索用户',
                            }}
                        />
                    </div>
                </Spin>
            </Modal>
        </>
    );
};

export default AddMemberModal;
