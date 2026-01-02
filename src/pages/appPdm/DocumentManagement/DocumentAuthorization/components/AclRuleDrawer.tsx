import React, { useState, useEffect } from 'react';
import { Drawer, Form, Select, Checkbox, Radio, Button, Space, Divider, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRequest } from 'ahooks';
import { IdentityRoleProGetListAsync } from '@/services/openApi/IdentityRolePro';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import { OrganizationUnitGetTreeListAsync } from '@/services/openApi/OrganizationUnit';
import {
    PrincipalTypes,
    PrincipalTypeOptions,
    PermissionEffects,
    PermissionEffectOptions,
    PermissionActionGroups,
    DefaultReadOnlyActions,
} from '../constants';
import type { AclEntry } from './AclRuleTable';

const { Option } = Select;

/** 角色选择组件 */
const RoleSelect: React.FC<any> = (props) => {
    const { data, loading, run } = useRequest(
        async (filter?: string) => {
            const res = await IdentityRoleProGetListAsync({
                Filter: filter,
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
            filterOption={false}
            loading={loading}
            labelInValue
            onSearch={(value) => run(value)}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.name,
                label: item.name,
            }))}
        />
    );
};

/** 用户选择组件 */
const UserSelect: React.FC<any> = (props) => {
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
            filterOption={false}
            loading={loading}
            labelInValue
            onSearch={(value) => run(value)}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.id,
                label: item.name || item.userName,
            }))}
        />
    );
};

/** 部门选择组件 */
const OrgSelect: React.FC<any> = (props) => {
    const { data, loading, run } = useRequest(
        async () => {
            const res = await OrganizationUnitGetTreeListAsync({});
            // 展平树形数据为列表
            const flatten = (items: any[]): any[] => {
                return items.flatMap(item => [
                    item,
                    ...(item.children ? flatten(item.children) : [])
                ]);
            };
            return flatten(res.items || []);
        },
        { manual: true }
    );

    return (
        <Select
            {...props}
            showSearch
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            loading={loading}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.code,
                label: item.title || item.displayName,
            }))}
        />
    );
};

interface AclRuleDrawerProps {
    /** 是否显示 */
    open: boolean;
    /** 关闭回调 */
    onClose: () => void;
    /** 保存回调 */
    onSave: (entries: AclEntry[]) => void;
    /** 编辑的条目（新增时为空） */
    editEntry?: AclEntry;
    /** 适用资源名称 */
    resourceName?: string;
    /** 是否库级别（影响"继承到子节点"选项） */
    isLibraryLevel?: boolean;
}

/** ACL规则编辑Drawer */
const AclRuleDrawer: React.FC<AclRuleDrawerProps> = ({
    open,
    onClose,
    onSave,
    editEntry,
    resourceName,
    isLibraryLevel = true,
}) => {
    const [form] = Form.useForm();
    const [principalType, setPrincipalType] = useState<number>(PrincipalTypes.Role);
    const [selectedActions, setSelectedActions] = useState<number[]>([]);

    const isEditMode = !!editEntry;

    // 初始化表单
    useEffect(() => {
        if (open) {
            if (editEntry) {
                form.setFieldsValue({
                    principalType: editEntry.principalType,
                    // labelInValue 格式：{ value, label }
                    principalKey: { value: editEntry.principalKey, label: editEntry.principalName || editEntry.principalKey },
                    effect: editEntry.effect,
                    inheritToChildren: editEntry.inheritToChildren ?? true,
                });
                setPrincipalType(editEntry.principalType || PrincipalTypes.Role);
                setSelectedActions(editEntry.action ? [editEntry.action] : []);
            } else {
                form.resetFields();
                form.setFieldsValue({
                    principalType: PrincipalTypes.Role,
                    effect: PermissionEffects.Allow,
                    inheritToChildren: true,
                });
                setPrincipalType(PrincipalTypes.Role);
                setSelectedActions([...DefaultReadOnlyActions]);
            }
        }
    }, [open, editEntry, form]);

    // 主体类型变化
    const handlePrincipalTypeChange = (value: number) => {
        setPrincipalType(value);
        form.setFieldValue('principalKey', undefined);
    };

    // 动作组全选/取消
    const handleGroupCheckAll = (groupKey: string, checked: boolean) => {
        const group = (PermissionActionGroups as any)[groupKey];
        if (!group) return;

        const groupActionValues = group.actions.map((a: any) => a.value);
        if (checked) {
            setSelectedActions(prev => [...new Set([...prev, ...groupActionValues])]);
        } else {
            setSelectedActions(prev => prev.filter(a => !groupActionValues.includes(a)));
        }
    };

    // 单个动作变化
    const handleActionChange = (actionValue: number, checked: boolean) => {
        if (checked) {
            setSelectedActions(prev => [...prev, actionValue]);
        } else {
            setSelectedActions(prev => prev.filter(a => a !== actionValue));
        }
    };

    // 检查组是否全选
    const isGroupAllChecked = (groupKey: string) => {
        const group = (PermissionActionGroups as any)[groupKey];
        if (!group) return false;
        return group.actions.every((a: any) => selectedActions.includes(a.value));
    };

    // 检查组是否部分选中
    const isGroupIndeterminate = (groupKey: string) => {
        const group = (PermissionActionGroups as any)[groupKey];
        if (!group) return false;
        const checkedCount = group.actions.filter((a: any) => selectedActions.includes(a.value)).length;
        return checkedCount > 0 && checkedCount < group.actions.length;
    };

    // 提交
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            if (selectedActions.length === 0) {
                message.warning('请至少选择一个动作');
                return;
            }

            // principalKey 可能是数组（多选 labelInValue 格式）或单个值
            const principalItems = Array.isArray(values.principalKey)
                ? values.principalKey
                : [values.principalKey];

            // 生成ACL条目：每个主体 × 每个动作 = 一条规则
            const entries: AclEntry[] = [];
            for (const item of principalItems) {
                // labelInValue 模式下 item 为 { value, label } 对象
                const principalKey = typeof item === 'object' ? item.value : item;
                const principalName = typeof item === 'object' ? item.label : item;
                for (const action of selectedActions) {
                    entries.push({
                        principalType: values.principalType,
                        principalKey: principalKey,
                        principalName: principalName,
                        action,
                        effect: values.effect,
                        inheritToChildren: isLibraryLevel ? values.inheritToChildren : false,
                    });
                }
            }

            onSave(entries);
            onClose();
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    return (
        <Drawer
            title={isEditMode ? '编辑规则' : '新增规则'}
            open={open}
            onClose={onClose}
            width={520}
            footer={
                <Space style={{ float: 'right' }}>
                    <Button onClick={onClose}>取消</Button>
                    <Button type="primary" onClick={handleSubmit}>
                        保存
                    </Button>
                </Space>
            }
        >
            {resourceName && (
                <div style={{ marginBottom: 16, color: '#666' }}>
                    适用资源：<strong>{resourceName}</strong>
                </div>
            )}

            <Form form={form} layout="vertical">
                <Form.Item
                    name="principalType"
                    label="主体类型"
                    rules={[{ required: true, message: '请选择主体类型' }]}
                >
                    <Radio.Group
                        options={PrincipalTypeOptions}
                        onChange={(e) => handlePrincipalTypeChange(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="principalKey"
                    label="主体"
                    rules={[{ required: true, message: '请选择主体' }]}
                >
                    {principalType === PrincipalTypes.Role && (
                        <RoleSelect mode="multiple" placeholder="搜索并选择角色..." />
                    )}
                    {principalType === PrincipalTypes.User && (
                        <UserSelect mode="multiple" placeholder="搜索并选择用户..." />
                    )}
                    {principalType === PrincipalTypes.OU && (
                        <OrgSelect mode="multiple" placeholder="搜索并选择部门..." />
                    )}
                </Form.Item>

                <Form.Item label="动作" required>
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: 6, padding: 12 }}>
                        {Object.entries(PermissionActionGroups).map(([key, group]) => (
                            <div key={key} style={{ marginBottom: 12 }}>
                                <Checkbox
                                    checked={isGroupAllChecked(key)}
                                    indeterminate={isGroupIndeterminate(key)}
                                    onChange={(e: CheckboxChangeEvent) => handleGroupCheckAll(key, e.target.checked)}
                                    style={{ fontWeight: 600 }}
                                >
                                    {group.label}
                                </Checkbox>
                                <div style={{ marginLeft: 24, marginTop: 8 }}>
                                    {group.actions.map(action => (
                                        <Checkbox
                                            key={action.value}
                                            checked={selectedActions.includes(action.value)}
                                            onChange={(e: CheckboxChangeEvent) => handleActionChange(action.value, e.target.checked)}
                                            style={{ marginRight: 16, marginBottom: 8 }}
                                        >
                                            {action.label}
                                        </Checkbox>
                                    ))}
                                </div>
                                <Divider style={{ margin: '8px 0' }} />
                            </div>
                        ))}
                    </div>
                </Form.Item>

                <Form.Item
                    name="effect"
                    label="效果"
                    rules={[{ required: true, message: '请选择效果' }]}
                >
                    <Radio.Group options={PermissionEffectOptions} />
                </Form.Item>

                {isLibraryLevel && (
                    <Form.Item
                        name="inheritToChildren"
                        valuePropName="checked"
                    >
                        <Checkbox>继承到子节点</Checkbox>
                    </Form.Item>
                )}
            </Form>
        </Drawer>
    );
};

export default AclRuleDrawer;
