import React, { useRef, useCallback, useMemo } from 'react';
import { Button, message, Tag, Space, Spin } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    StarOutlined,
    StarFilled,
    EditOutlined,
} from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import DeleteConfirm from '@/components/deleteConfirm';
import {
    LlmConfigGetListAsync,
    LlmConfigGetAsync,
    LlmConfigCreateAsync,
    LlmConfigUpdateAsync,
    LlmConfigDeleteAsync,
    LlmConfigSetAsDefaultAsync,
} from '@/services/dataCopilot/LlmConfig';
import { DataCopilotPermissions } from '../_permissions';

/** LLM 提供商枚举 */
const llmProviderEnum = [
    { label: 'Azure OpenAI', value: 2, color: '#0078D4' },
    { label: 'OpenAI', value: 1, color: '#10a37f' },
    { label: 'DeepSeek', value: 3, color: '#1890ff' },
    { label: 'Ollama', value: 5, color: '#666' },
];

/** LLM 配置表单对话框组件 */
const LlmConfigFormDialog: React.FC<{
    entityId?: string;
    title: string;
    onAfterSubmit?: () => void;
    children?: React.ReactNode;
    buttonProps?: any;
}> = ({ entityId, title, onAfterSubmit, children, buttonProps }) => {
    const { schema, formConfig, loading } = useDynamicSchema('dataCopilot:llmConfig');
    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    LlmConfigGetAsync({ id: entityId }).then((res) => {
                        form.setInitialValues(res);
                    });
                } else {
                    form.setInitialValues({
                        isActive: true,
                        provider: 2,
                        temperature: 0.0,
                        maxTokens: 4096,
                    });
                }
            });
        },
    };

    const portalId = `dataCopilot.llmConfig.${entityId || 'new'}`;

    return (
        <FormDialog.Portal id={portalId}>
            <Button
                type="primary"
                onClick={() => {
                    const formDialog = FormDialog({ title, width: 600 }, portalId, () => {
                        if (loading) {
                            return <Spin tip="加载表单配置中..." />;
                        }
                        return (
                            <FormLayout {...formConfig} labelCol={6} wrapperCol={18}>
                                <SchemaField schema={schema} />
                            </FormLayout>
                        );
                    });

                    formDialog
                        .forConfirm((payload, next) => {
                            const values: any = payload.values;
                            if (!values.id) {
                                return LlmConfigCreateAsync(values)
                                    .then(() => {
                                        message.success('创建成功');
                                        onAfterSubmit?.();
                                    })
                                    .then(() => next(payload));
                            } else {
                                return LlmConfigUpdateAsync({ id: values.id }, values)
                                    .then(() => {
                                        message.success('更新成功');
                                        onAfterSubmit?.();
                                    })
                                    .then(() => next(payload));
                            }
                        })
                        .open(formProps);
                }}
                {...buttonProps}
            >
                {children}
            </Button>
        </FormDialog.Portal>
    );
};

/** LLM 配置管理页面 */
const LlmConfigsPage: React.FC = () => {
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    /** 刷新列表 */
    const onRefresh = useCallback(() => {
        gridRef.current?.onRefresh();
    }, []);

    /** 删除配置 */
    const handleDelete = useCallback(
        async (ids: string[]) => {
            for (const id of ids) {
                await LlmConfigDeleteAsync({ id });
            }
            message.success('删除成功');
            onRefresh();
        },
        [onRefresh],
    );

    /** 设为默认 */
    const handleSetDefault = useCallback(
        async (record: any) => {
            await LlmConfigSetAsDefaultAsync({ id: record.id });
            message.success('已设为默认配置');
            onRefresh();
        },
        [onRefresh],
    );

    /** 列定义 */
    const columnDefs: any = useMemo(
        () => [
            { field: 'name', headerName: '配置名称', width: 200 },
            {
                field: 'provider',
                headerName: '提供商',
                width: 140,
                valueEnum: llmProviderEnum,
                cellRenderer: (params: any) => {
                    const item = llmProviderEnum.find((e) => e.value === params.value);
                    return item ? <Tag color={item.color}>{item.label}</Tag> : params.value;
                },
            },
            { field: 'modelName', headerName: '模型名称', width: 180, hideInSearch: true },
            {
                field: 'temperature',
                headerName: '温度',
                width: 80,
                hideInSearch: true,
            },
            {
                field: 'maxTokens',
                headerName: '最大 Token',
                width: 100,
                hideInSearch: true,
            },
            {
                field: 'isDefault',
                headerName: '默认',
                width: 80,
                hideInSearch: true,
                cellRenderer: (params: any) =>
                    params.value ? (
                        <StarFilled style={{ color: '#faad14', fontSize: 16 }} />
                    ) : (
                        <StarOutlined style={{ color: '#d9d9d9', fontSize: 16 }} />
                    ),
            },
            {
                field: 'isActive',
                headerName: '状态',
                width: 100,
                hideInSearch: true,
                cellRenderer: (params: any) =>
                    params.value ? (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            启用
                        </Tag>
                    ) : (
                        <Tag color="default">禁用</Tag>
                    ),
            },
            {
                field: 'creationTime',
                headerName: '创建时间',
                width: 180,
                hideInSearch: true,
                initialSort: 'desc' as const,
            },
            {
                field: 'actions',
                headerName: '操作',
                width: 160,
                pinned: 'right',
                sortable: false,
                filter: false,
                cellRenderer: (params: any) => (
                    <Space size="small">
                        <Access accessible={!!access[DataCopilotPermissions.LlmConfigs.Edit]}>
                            <LlmConfigFormDialog
                                entityId={params.data.id}
                                title="编辑配置"
                                onAfterSubmit={onRefresh}
                                buttonProps={{ type: 'link', size: 'small', icon: <EditOutlined /> }}
                            />
                        </Access>
                        <Access accessible={!!access[DataCopilotPermissions.LlmConfigs.SetDefault]}>
                            {!params.data.isDefault && (
                                <Button type="link" size="small" onClick={() => handleSetDefault(params.data)}>
                                    设为默认
                                </Button>
                            )}
                        </Access>
                        <Access accessible={!!access[DataCopilotPermissions.LlmConfigs.Delete]}>
                            <DeleteConfirm onConfirm={() => handleDelete([params.data.id])}>
                                <Button type="link" size="small" danger icon={<DeleteOutlined />} />
                            </DeleteConfirm>
                        </Access>
                    </Space>
                ),
            },
        ],
        [access, onRefresh, handleSetDefault, handleDelete],
    );

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle="LLM 配置管理"
            gridKey="dataCopilot-llmConfigs"
            request={async (params: any) => {
                const data = await LlmConfigGetListAsync({
                    MaxResultCount: params.maxResultCount,
                    SkipCount: params.skipCount,
                    Sorting: params.sorter,
                });
                return {
                    success: true,
                    data: data.items || [],
                    total: data.totalCount || 0,
                };
            }}
            columnDefs={columnDefs}
            toolBarRender={() => [
                <Access key="create" accessible={!!access[DataCopilotPermissions.LlmConfigs.Create]}>
                    <LlmConfigFormDialog title="新建配置" onAfterSubmit={onRefresh}>
                        <PlusOutlined /> 新建配置
                    </LlmConfigFormDialog>
                </Access>,
            ]}
        />
    );
};

export default LlmConfigsPage;

export const routeProps = {
    name: 'LLM 配置',
};
