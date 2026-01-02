import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
    Card, Button, Space, Alert, message, Popconfirm, Spin,
    Tag, Modal, Form, Input, Empty, Select, Drawer, Divider, Checkbox
} from 'antd';
import {
    PlusOutlined, DeleteOutlined, EditOutlined,
    CarryOutOutlined, SettingOutlined
} from '@ant-design/icons';
import { AgGridPlus } from '@nokecy/qc-ui';
import { useRequest } from 'ahooks';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {
    DocumentAuthorizationGetTemplateListAsync,
    DocumentAuthorizationCreateTemplateAsync,
    DocumentAuthorizationUpdateTemplateAsync,
    DocumentAuthorizationDeleteTemplateAsync,
    DocumentAuthorizationApplyTemplateToLibraryAsync,
} from '@/services/pdm/DocumentAuthorization';
import { DocumentLibraryGetListAsync } from '@/services/pdm/DocumentLibrary';
import { IdentityRoleProGetListAsync } from '@/services/openApi/IdentityRolePro';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import { OrganizationUnitGetTreeListAsync } from '@/services/openApi/OrganizationUnit';
import {
    PrincipalTypes,
    PrincipalTypeLabels,
    PrincipalTypeOptions,
    PermissionEffects,
    PermissionEffectLabels,
    PermissionEffectOptions,
    PermissionActionLabels,
    TemplateApplyModeOptions,
    PermissionActionGroups,
    DefaultReadOnlyActions,
} from '../constants';

const { TextArea } = Input;

interface TemplateEntry {
    key?: string;
    principalType?: number;
    principalKey?: string;
    action?: number;
    effect?: number;
    inheritToChildren?: boolean;
}

interface TemplateData {
    id?: string;
    name?: string;
    description?: string;
    isEnabled?: boolean;
    entries?: TemplateEntry[];
}

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
            onSearch={(value) => run(value)}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.userName,
                label: `${item.userName} / ${item.name || ''}`,
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

/** 文档库选择组件 */
const LibrarySelect: React.FC<any> = (props) => {
    const { data, loading, run } = useRequest(
        async (filter?: string) => {
            const res = await DocumentLibraryGetListAsync({
                Filter: filter,
                SkipCount: 0,
                MaxResultCount: 100,
            } as any);
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
            onSearch={(value) => run(value)}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.id,
                label: item.libraryName || item.libraryCode,
            }))}
        />
    );
};

/** 授权模板Tab组件 */
const TemplateTab: React.FC = () => {
    const gridRef = useRef<any>();

    // 状态
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState<TemplateData | undefined>();
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [applyTemplateId, setApplyTemplateId] = useState<string>();
    const [applying, setApplying] = useState(false);
    const [saving, setSaving] = useState(false);

    // 明细项编辑状态
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [detailTemplate, setDetailTemplate] = useState<TemplateData | undefined>();
    const [detailEntries, setDetailEntries] = useState<TemplateEntry[]>([]);
    const [entryDrawerOpen, setEntryDrawerOpen] = useState(false);
    const [editEntry, setEditEntry] = useState<TemplateEntry | undefined>();
    const [selectedActions, setSelectedActions] = useState<number[]>([]);
    const [principalType, setPrincipalType] = useState<number>(PrincipalTypes.Role);
    const [savingDetail, setSavingDetail] = useState(false);

    const [form] = Form.useForm();
    const [applyForm] = Form.useForm();
    const [entryForm] = Form.useForm();

    // 加载模板列表
    const loadTemplates = useCallback(async () => {
        setLoading(true);
        try {
            const data = await DocumentAuthorizationGetTemplateListAsync();
            setTemplates((data || []).map((item: any) => ({
                ...item,
                entries: item.entries || [],
            })));
        } catch (error) {
            console.error('加载模板失败:', error);
            message.error('加载模板列表失败');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTemplates();
    }, [loadTemplates]);

    // AgGrid 列定义
    const columnDefs: any[] = useMemo(() => [
        {
            field: 'name',
            headerName: '模板名称',
            width: 200,
        },
        {
            field: 'description',
            headerName: '描述',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'entries',
            headerName: '规则数',
            width: 100,
            cellRenderer: (params: any) => {
                const count = params.value?.length || 0;
                return <Tag color="blue">{count} 条</Tag>;
            },
        },
        {
            field: 'isEnabled',
            headerName: '状态',
            width: 80,
            cellRenderer: (params: any) => (
                <Tag color={params.value !== false ? 'green' : 'default'}>
                    {params.value !== false ? '启用' : '禁用'}
                </Tag>
            ),
        },
        {
            field: 'action',
            headerName: '操作',
            width: 240,
            pinned: 'right',
            filter: false,
            sortable: false,
            cellRenderer: (params: any) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        icon={<SettingOutlined />}
                        onClick={() => handleOpenDetail(params.data)}
                    >
                        明细
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(params.data)}
                    >
                        编辑
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        icon={<CarryOutOutlined />}
                        onClick={() => handleApply(params.data)}
                    >
                        应用
                    </Button>
                    <Popconfirm
                        title="确定删除此模板？"
                        onConfirm={() => handleDelete(params.data)}
                    >
                        <Button type="link" size="small" danger icon={<DeleteOutlined />}>
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ], []);

    // 新增模板
    const handleAdd = () => {
        setEditData(undefined);
        form.resetFields();
        setEditModalOpen(true);
    };

    // 编辑模板
    const handleEdit = (record: TemplateData) => {
        setEditData(record);
        form.setFieldsValue({
            name: record.name,
            description: record.description,
        });
        setEditModalOpen(true);
    };

    // 删除模板
    const handleDelete = async (record: TemplateData) => {
        if (!record.id) return;
        try {
            await DocumentAuthorizationDeleteTemplateAsync({ templateId: record.id });
            message.success('删除成功');
            loadTemplates();
        } catch (error) {
            console.error('删除失败:', error);
            message.error('删除失败');
        }
    };

    // 保存模板基本信息
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            if (editData?.id) {
                await DocumentAuthorizationUpdateTemplateAsync(
                    { templateId: editData.id },
                    {
                        name: values.name,
                        description: values.description,
                        entries: editData.entries?.map(e => ({
                            principalType: e.principalType as any,
                            principalKey: e.principalKey,
                            action: e.action as any,
                            effect: e.effect as any,
                            inheritToChildren: e.inheritToChildren,
                        })),
                    }
                );
                message.success('更新成功');
            } else {
                await DocumentAuthorizationCreateTemplateAsync({
                    name: values.name,
                    description: values.description,
                    entries: [],
                });
                message.success('创建成功');
            }

            setEditModalOpen(false);
            loadTemplates();
        } catch (error) {
            console.error('保存失败:', error);
            message.error('保存失败');
        } finally {
            setSaving(false);
        }
    };

    // 打开明细编辑
    const handleOpenDetail = (record: TemplateData) => {
        setDetailTemplate(record);
        // 为每一行生成一个相对平稳且唯一的标识，用于 AgGrid 的 getRowId
        setDetailEntries((record.entries || []).map((e, i) => ({
            ...e,
            key: e.key || `entry-${record.id}-${e.principalKey}-${e.action}-${i}`,
        })));
        setDetailDrawerOpen(true);
    };

    // 新增明细项
    const handleAddEntry = () => {
        setEditEntry(undefined);
        entryForm.resetFields();
        entryForm.setFieldsValue({
            principalType: PrincipalTypes.Role,
            effect: PermissionEffects.Allow,
            inheritToChildren: true,
        });
        setPrincipalType(PrincipalTypes.Role);
        setSelectedActions([...DefaultReadOnlyActions]);
        setEntryDrawerOpen(true);
    };

    // 删除明细项
    const handleDeleteEntry = (entry: TemplateEntry) => {
        setDetailEntries(prev => prev.filter(e => e.key !== entry.key));
    };

    // 保存明细项
    const handleSaveEntry = async () => {
        try {
            const values = await entryForm.validateFields();

            if (selectedActions.length === 0) {
                message.warning('请至少选择一个动作');
                return;
            }

            const principalKeys = Array.isArray(values.principalKey)
                ? values.principalKey
                : [values.principalKey];

            const newEntries: TemplateEntry[] = [];
            for (const principalKey of principalKeys) {
                for (const action of selectedActions) {
                    newEntries.push({
                        key: `new-${Date.now()}-${Math.random()}`,
                        principalType: values.principalType,
                        principalKey: principalKey,
                        action,
                        effect: values.effect,
                        inheritToChildren: values.inheritToChildren,
                    });
                }
            }

            setDetailEntries(prev => [...prev, ...newEntries]);
            setEntryDrawerOpen(false);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    // 保存明细到服务器
    const handleSaveDetail = async () => {
        if (!detailTemplate?.id) return;

        setSavingDetail(true);
        try {
            await DocumentAuthorizationUpdateTemplateAsync(
                { templateId: detailTemplate.id },
                {
                    name: detailTemplate.name,
                    description: detailTemplate.description,
                    entries: detailEntries.map(e => ({
                        principalType: e.principalType as any,
                        principalKey: e.principalKey,
                        action: e.action as any,
                        effect: e.effect as any,
                        inheritToChildren: e.inheritToChildren,
                    })),
                }
            );

            message.success('保存成功');
            setDetailDrawerOpen(false);
            loadTemplates();
        } catch (error) {
            console.error('保存失败:', error);
            message.error('保存失败');
        } finally {
            setSavingDetail(false);
        }
    };

    // 明细表格列定义
    const entryColumnDefs: any[] = useMemo(() => [
        {
            field: 'principalType',
            headerName: '主体类型',
            width: 100,
            cellRenderer: (params: any) => {
                if (params.value === undefined || params.value === null) return '-';
                return PrincipalTypeLabels[params.value] || `未知(${params.value})`;
            },
        },
        {
            field: 'principalKey',
            headerName: '主体',
            width: 150,
            cellRenderer: (params: any) => params.value || '-',
        },
        {
            field: 'action',
            headerName: '动作',
            width: 120,
            cellRenderer: (params: any) => {
                if (params.value === undefined || params.value === null) return '-';
                return PermissionActionLabels[params.value] || `未知(${params.value})`;
            },
        },
        {
            field: 'effect',
            headerName: '效果',
            width: 80,
            cellRenderer: (params: any) => {
                if (params.value === undefined || params.value === null) return '-';
                const isAllow = params.value === PermissionEffects.Allow;
                return <Tag color={isAllow ? 'green' : 'red'}>{isAllow ? '允许' : '拒绝'}</Tag>;
            },
        },
        {
            field: 'inheritToChildren',
            headerName: '继承',
            width: 80,
            cellRenderer: (params: any) => (
                <Tag color={params.value ? 'blue' : 'default'}>{params.value ? '是' : '否'}</Tag>
            ),
        },
        {
            field: 'entryAction',
            headerName: '操作',
            width: 80,
            pinned: 'right',
            filter: false,
            sortable: false,
            cellRenderer: (params: any) => (
                <Popconfirm
                    title="确定删除此规则？"
                    onConfirm={() => handleDeleteEntry(params.data)}
                >
                    <Button type="link" size="small" danger>删除</Button>
                </Popconfirm>
            ),
        },
    ], []);

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

    // 应用模板
    const handleApply = (record: TemplateData) => {
        setApplyTemplateId(record.id);
        applyForm.resetFields();
        setApplyModalOpen(true);
    };

    // 执行应用
    const handleApplyConfirm = async () => {
        try {
            const values = await applyForm.validateFields();
            setApplying(true);

            await DocumentAuthorizationApplyTemplateToLibraryAsync({
                templateId: applyTemplateId,
                libraryId: values.libraryId,
                mode: values.mode,
            });

            message.success('模板应用成功');
            setApplyModalOpen(false);
        } catch (error) {
            console.error('应用失败:', error);
            message.error('模板应用失败');
        } finally {
            setApplying(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 280px)', minHeight: 500 }}>
            <Alert
                message="授权模板说明"
                description="授权模板可以预定义一组ACL规则，然后快速应用到文档库，支持完全替换、合并、追加三种模式。"
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
            />

            <div style={{ flex: 1 }}>
                <AgGridPlus
                    gridRef={gridRef}
                    headerTitle="授权模板列表"
                    gridKey="appPdm.DocumentManagement.DocumentAuthorization.Template"
                    rowData={templates}
                    loading={loading}
                    columnDefs={columnDefs}
                    search={false}
                    pagination={false}
                    getRowId={(params) => params.data?.id}
                    toolBarRender={() => [
                        <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                            新建模板
                        </Button>,
                        <Button key="refresh" onClick={loadTemplates}>
                            刷新
                        </Button>,
                    ]}
                />
            </div>

            {/* 编辑模板Modal */}
            <Modal
                title={editData?.id ? '编辑模板' : '新建模板'}
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                onOk={handleSave}
                confirmLoading={saving}
                width={500}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        name="name"
                        label="模板名称"
                        rules={[{ required: true, message: '请输入模板名称' }]}
                    >
                        <Input placeholder="输入模板名称..." />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                    >
                        <TextArea rows={3} placeholder="输入模板描述（可选）..." />
                    </Form.Item>
                </Form>
            </Modal>

            {/* 模板明细Drawer */}
            <Drawer
                title={`模板明细 - ${detailTemplate?.name || ''}`}
                open={detailDrawerOpen}
                onClose={() => setDetailDrawerOpen(false)}
                width={800}
                footer={
                    <Space style={{ float: 'right' }}>
                        <Button onClick={() => setDetailDrawerOpen(false)}>取消</Button>
                        <Button type="primary" onClick={handleSaveDetail} loading={savingDetail}>
                            保存明细
                        </Button>
                    </Space>
                }
            >
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEntry}>
                        新增规则
                    </Button>
                </div>

                <AgGridPlus
                    rowData={detailEntries}
                    columnDefs={entryColumnDefs}
                    search={false}
                    pagination={false}
                    domLayout="autoHeight"
                    getRowId={(params) => params.data?.key}
                />
            </Drawer>

            {/* 新增规则Drawer */}
            <Drawer
                title="新增规则"
                open={entryDrawerOpen}
                onClose={() => setEntryDrawerOpen(false)}
                width={520}
                footer={
                    <Space style={{ float: 'right' }}>
                        <Button onClick={() => setEntryDrawerOpen(false)}>取消</Button>
                        <Button type="primary" onClick={handleSaveEntry}>
                            添加规则
                        </Button>
                    </Space>
                }
            >
                <Form form={entryForm} layout="vertical">
                    <Form.Item
                        name="principalType"
                        label="主体类型"
                        rules={[{ required: true, message: '请选择主体类型' }]}
                    >
                        <Select
                            options={PrincipalTypeOptions}
                            onChange={(value) => {
                                setPrincipalType(value);
                                entryForm.setFieldValue('principalKey', undefined);
                            }}
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
                                                onChange={(e: CheckboxChangeEvent) => {
                                                    if (e.target.checked) {
                                                        setSelectedActions(prev => [...prev, action.value]);
                                                    } else {
                                                        setSelectedActions(prev => prev.filter(a => a !== action.value));
                                                    }
                                                }}
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
                        <Select options={PermissionEffectOptions} />
                    </Form.Item>

                    <Form.Item
                        name="inheritToChildren"
                        valuePropName="checked"
                    >
                        <Checkbox>继承到子节点</Checkbox>
                    </Form.Item>
                </Form>
            </Drawer>

            {/* 应用模板Modal */}
            <Modal
                title="应用模板到文档库"
                open={applyModalOpen}
                onCancel={() => setApplyModalOpen(false)}
                onOk={handleApplyConfirm}
                confirmLoading={applying}
                width={500}
            >
                <Form form={applyForm} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        name="libraryId"
                        label="目标文档库"
                        rules={[{ required: true, message: '请选择目标文档库' }]}
                    >
                        <LibrarySelect placeholder="搜索并选择文档库..." />
                    </Form.Item>
                    <Form.Item
                        name="mode"
                        label="应用模式"
                        rules={[{ required: true, message: '请选择应用模式' }]}
                        initialValue={1}
                    >
                        <Select
                            options={TemplateApplyModeOptions.map(o => ({
                                value: o.value,
                                label: `${o.label} - ${o.description}`,
                            }))}
                        />
                    </Form.Item>
                    <Alert
                        message="应用模式说明"
                        description={
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                <li><strong>完全替换</strong>：删除库现有的所有ACL规则，使用模板规则</li>
                                <li><strong>合并</strong>：保留现有规则，与模板规则合并（相同主体+动作的规则会被模板覆盖）</li>
                                <li><strong>追加</strong>：在现有规则基础上追加模板规则（不去重）</li>
                            </ul>
                        }
                        type="warning"
                        showIcon
                    />
                </Form>
            </Modal>
        </div>
    );
};

export default TemplateTab;
