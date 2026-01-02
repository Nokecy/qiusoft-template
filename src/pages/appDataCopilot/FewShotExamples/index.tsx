import React, { useRef, useCallback, useMemo } from 'react';
import { Button, message, Tag, Space, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import DeleteConfirm from '@/components/deleteConfirm';
import {
    FewShotExampleGetListAsync,
    FewShotExampleGetAsync,
    FewShotExampleCreateAsync,
    FewShotExampleUpdateAsync,
    FewShotExampleDeleteAsync,
} from '@/services/dataCopilot/FewShotExample';
import { DataCopilotPermissions } from '../_permissions';

/** Few-Shot 示例表单对话框组件 */
const FewShotExampleFormDialog: React.FC<{
    entityId?: string;
    title: string;
    onAfterSubmit?: () => void;
    children: React.ReactNode;
    buttonProps?: any;
}> = ({ entityId, title, onAfterSubmit, children, buttonProps }) => {
    const { schema, formConfig, loading } = useDynamicSchema('dataCopilot:fewShotExample');
    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    FewShotExampleGetAsync({ id: entityId }).then((res) => {
                        form.setInitialValues(res);
                    });
                } else {
                    form.setInitialValues({
                        isActive: true,
                    });
                }
            });
        },
    };

    const portalId = `dataCopilot.fewShotExample.${entityId || 'new'}`;

    return (
        <FormDialog.Portal id={portalId}>
            <Button
                type="primary"
                onClick={() => {
                    const formDialog = FormDialog({ title, width: 700 }, portalId, () => {
                        if (loading) {
                            return <Spin tip="加载表单配置中..." />;
                        }
                        return (
                            <FormLayout {...formConfig} labelCol={4} wrapperCol={20}>
                                <SchemaField schema={schema} />
                            </FormLayout>
                        );
                    });

                    formDialog
                        .forConfirm((payload, next) => {
                            const values: any = payload.values;
                            if (!values.id) {
                                return FewShotExampleCreateAsync(values)
                                    .then(() => {
                                        message.success('创建成功');
                                        onAfterSubmit?.();
                                    })
                                    .then(() => next(payload));
                            } else {
                                return FewShotExampleUpdateAsync({ id: values.id }, values)
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

/** Few-Shot 示例管理页面 */
const FewShotExamplesPage: React.FC = () => {
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    /** 刷新列表 */
    const onRefresh = useCallback(() => {
        gridRef.current?.onRefresh();
    }, []);

    /** 删除示例 */
    const handleDelete = useCallback(
        async (ids: string[]) => {
            for (const id of ids) {
                await FewShotExampleDeleteAsync({ id });
            }
            message.success('删除成功');
            onRefresh();
        },
        [onRefresh],
    );

    /** 列定义 */
    const columnDefs: any = useMemo(
        () => [
            {
                field: 'naturalLanguageQuery',
                headerName: '自然语言问题',
                width: 300,
                cellRenderer: (params: any) => (
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {params.value}
                    </div>
                ),
            },
            {
                field: 'sqlQuery',
                headerName: 'SQL 查询',
                width: 350,
                hideInSearch: true,
                cellRenderer: (params: any) => (
                    <code style={{ fontSize: 12, color: '#666' }}>
                        {params.value?.substring(0, 60)}...
                    </code>
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
                width: 120,
                pinned: 'right',
                sortable: false,
                filter: false,
                cellRenderer: (params: any) => (
                    <Space size="small">
                        <Access accessible={!!access[DataCopilotPermissions.FewShotExamples.Edit]}>
                            <FewShotExampleFormDialog
                                entityId={params.data.id}
                                title="编辑示例"
                                onAfterSubmit={onRefresh}
                                buttonProps={{ type: 'link', size: 'small' }}
                            >
                                编辑
                            </FewShotExampleFormDialog>
                        </Access>
                    </Space>
                ),
            },
        ],
        [access, onRefresh],
    );

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle="示例管理"
            gridKey="dataCopilot-fewShotExamples"
            request={async (params: any) => {
                const data = await FewShotExampleGetListAsync({
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
                <Access key="create" accessible={!!access[DataCopilotPermissions.FewShotExamples.Create]}>
                    <FewShotExampleFormDialog title="新建示例" onAfterSubmit={onRefresh}>
                        <PlusOutlined /> 新建示例
                    </FewShotExampleFormDialog>
                </Access>,
                <Access key="delete" accessible={!!access[DataCopilotPermissions.FewShotExamples.Delete]}>
                    <DeleteConfirm
                        onConfirm={() => {
                            const selectedRows = (gridRef.current as any)?.getSelectedRows() || [];
                            if (selectedRows.length === 0) {
                                message.warning('请先选择要删除的数据');
                                return;
                            }
                            handleDelete(selectedRows.map((r: any) => r.id));
                        }}
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            删除
                        </Button>
                    </DeleteConfirm>
                </Access>,
            ]}
        />
    );
};

export default FewShotExamplesPage;

export const routeProps = {
    name: '示例管理',
};
