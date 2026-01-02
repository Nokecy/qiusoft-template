/**
 * 文档作废申请表单页
 * 路由: /appPdm/DocumentManagement/DocumentObsolescenceRequest/form?id={id}
 * 新建模式：无id参数
 * 编辑模式：有id参数
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm, onFormInit, onFieldMount, onFieldInputValueChange, onFieldValueChange } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, FormGrid, FormItem, Input, Select, DatePicker } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import {
    DocumentObsolescenceRequestGetAsync,
    DocumentObsolescenceRequestCreateAsync,
    DocumentObsolescenceRequestUpdateAsync,
    DocumentObsolescenceRequestSubmitAsync,
} from '@/services/pdm/DocumentObsolescenceRequest';
import { DocumentGetListAsync, DocumentGetVersionListAsync } from '@/services/pdm/Document';
import { obsolescenceReasonTypeEnum } from './_enums';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import dayjs from 'dayjs';

export const routeProps = {
    name: '文档作废申请表单',
};

const DocumentObsolescenceRequestFormPage: React.FC = () => {
    const { id: requestId, isActive, hasChanged } = useKeepAliveParams(
        '/appPdm/DocumentManagement/DocumentObsolescenceRequest/form',
        ['id']
    );
    const isEdit = !!requestId;

    const SchemaField = useSchemaField({
        UserSelect,
        FormGrid,
        FormItem,
        Input,
        Select,
        DatePicker,
    });

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    // 加载文档列表
    const loadDocuments = async (field: any) => {
        const searchValue = field.inputValue || '';

        try {
            const result = await DocumentGetListAsync({
                Filter: searchValue ? `${searchValue} PublishState=1` : 'PublishState=1',
                MaxResultCount: 100,
                SkipCount: 0,
            } as any);

            // 过滤掉草稿状态的文档(status=0为草稿)
            const documents = (result.items || [])
                .filter((item: any) => item.status !== 0)
                .map((item: any) => ({
                    label: `${item.documentNumber} - ${item.documentName || ''}`,
                    value: item.id,
                    documentNumber: item.documentNumber,
                    documentName: item.documentName,
                }));

            field.dataSource = documents;
        } catch (error) {
            console.error('加载文档列表失败:', error);
            field.dataSource = [];
        }
    };

    // 创建表单实例
    const form = useMemo(
        () =>
            createForm({
                validateFirst: true,
                effects: () => {
                    onFormInit((form) => {
                        if (!isEdit) {
                            form.setInitialValues({});
                        }
                    });

                    // 新建模式下：文档字段挂载时加载初始数据
                    if (!isEdit) {
                        onFieldMount('layout.grid.col1.documentId', async (field) => {
                            field.loading = true;
                            try {
                                await loadDocuments(field);
                            } finally {
                                field.loading = false;
                            }
                        });

                        // 监听搜索输入
                        let searchTimer: any = null;
                        onFieldInputValueChange('layout.grid.col1.documentId', async (field) => {
                            if (field.value) return;
                            clearTimeout(searchTimer);
                            searchTimer = setTimeout(async () => {
                                field.loading = true;
                                try {
                                    await loadDocuments(field);
                                } finally {
                                    field.loading = false;
                                }
                            }, 300);
                        });

                        // 监听文档选择变化
                        onFieldValueChange('layout.grid.col1.documentId', async (field) => {
                            const form = field.form;
                            const documentId = field.value;
                            const versionField = form.query('layout.grid.col1.documentVersion').take();

                            if (documentId && field.dataSource && field.dataSource.length > 0) {
                                const selectedDoc = field.dataSource.find((doc: any) => doc.value === documentId);
                                if (selectedDoc) {
                                    form.setFieldState('layout.grid.hidden.documentNumber', (state) => {
                                        state.value = selectedDoc.documentNumber;
                                    });
                                    form.setFieldState('layout.grid.hidden.documentName', (state) => {
                                        state.value = selectedDoc.documentName;
                                    });
                                }

                                // 加载版本列表
                                if (versionField) {
                                    versionField.loading = true;
                                    try {
                                        const versionResult = await DocumentGetVersionListAsync({
                                            Filter: `documentId = ${documentId},publishStatus=1`,
                                            MaxResultCount: 100,
                                        });

                                        const versionOptions = (versionResult.items || []).map((item: any) => ({
                                            label: `${item.version || ''}${item.revision || ''}`,
                                            value: `${item.version || ''}${item.revision || ''}`,
                                        }));

                                        versionField.dataSource = versionOptions;
                                        versionField.setComponentProps({
                                            disabled: false,
                                            placeholder: versionOptions.length > 0 ? '请选择文档版本' : '暂无版本'
                                        });

                                        if (versionOptions.length === 1) {
                                            versionField.value = versionOptions[0].value;
                                        } else {
                                            versionField.value = undefined;
                                        }
                                    } catch (error) {
                                        console.error('加载版本列表失败:', error);
                                        versionField.dataSource = [];
                                        versionField.setComponentProps({
                                            disabled: true,
                                            placeholder: '加载版本失败'
                                        });
                                    } finally {
                                        versionField.loading = false;
                                    }
                                }
                            } else {
                                if (versionField) {
                                    versionField.dataSource = [];
                                    versionField.value = undefined;
                                    versionField.setComponentProps({
                                        disabled: true,
                                        placeholder: '请先选择文档'
                                    });
                                }
                            }
                        });
                    }
                }
            }),
        [requestId, isEdit]
    );

    // 加载初始数据 (编辑模式)
    useEffect(() => {
        if (!isActive || !hasChanged) return;

        if (requestId) {
            setLoading(true);
            DocumentObsolescenceRequestGetAsync({ id: requestId })
                .then(data => {
                    const initialValues: any = {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        documentId: data.documentId, // 编辑模式下可能用来显示，但主要用documentInfo
                        documentInfo: `${data.documentNumber} - ${data.documentName || ''}`,
                        documentVersion: data.documentVersion,
                        effectiveDate: data.effectiveDate ? dayjs(data.effectiveDate) : null,
                        reasonType: data.reasonType,
                        reasonDescription: data.reasonDescription,
                        replacementDocumentId: data.replacementDocumentId,
                        impactScope: data.impactScope,
                        assignedToUserId: data.assignedToUserCode
                            ? { value: data.assignedToUserCode, label: data.assignedToUserName }
                            : null,
                    };

                    form.setInitialValues(initialValues);
                })
                .catch(() => {
                    message.error('加载数据失败');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            form.reset();
        }
    }, [isActive, hasChanged, requestId, form]);

    // 返回列表
    const handleBack = (needRefresh: boolean = false) => {
        const currentPath = `${history.location.pathname}${history.location.search || ''}`;
        const targetPath = needRefresh
            ? '/appPdm/DocumentManagement/DocumentObsolescenceRequest?refresh=true'
            : '/appPdm/DocumentManagement/DocumentObsolescenceRequest';
        history.push(targetPath);
        setTimeout(() => {
            closeTab(currentPath);
        }, 150);
    };

    // 保存数据
    const saveData = async () => {
        const values = await form.submit();

        const submitData: any = {
            title: values.title,
            description: values.description,
            effectiveDate: values.effectiveDate,
            reasonType: values.reasonType,
            reasonDescription: values.reasonDescription,
            replacementDocumentId: values.replacementDocumentId,
            impactScope: values.impactScope,
            assignedToUserCode: values.assignedToUserId?.value,
            assignedToUserName: values.assignedToUserId?.label,
        };

        if (isEdit) {
            // 编辑模式下文挡信息通常不可变，但如果API允许，可以传。
            // 这里假设编辑时不修改文档本身，只修改申请信息
            // 注意：EditObsolescenceRequestDialog 中 update 也是传了 documentVersion，但它是 Input
            submitData.documentVersion = values.documentVersion;
            await DocumentObsolescenceRequestUpdateAsync({ id: requestId }, submitData);
        } else {
            submitData.documentId = values.documentId;
            submitData.documentNumber = values.documentNumber;
            submitData.documentName = values.documentName;
            submitData.documentVersion = values.documentVersion;
            await DocumentObsolescenceRequestCreateAsync(submitData);
        }
    };

    // 保存按钮
    const handleSave = async () => {
        setSubmitting(true);
        try {
            await saveData();
            message.success('保存成功');
            handleBack(true);
        } catch (error: any) {
            if (error.message && !error.message.includes('不能为空')) {
                message.error(error.message || '保存失败');
            }
        } finally {
            setSubmitting(false);
        }
    };

    // 保存并提交按钮
    const handleSaveAndSubmit = async () => {
        setSubmitting(true);
        try {
            await saveData();
            if (isEdit) {
                await DocumentObsolescenceRequestSubmitAsync({ id: requestId });
            } else {
                message.warning('新建申请需先保存后才能提交(目前流程如此)');
                // 如果后端支持新建直接返回ID，这里可以改进。此处暂时保持保守逻辑。
                // 或者先 Create 拿到 ID 再 Submit。create 接口通常返回 DTO。
                // 假设 CreateAsync 返回 Dto
                return;
            }
            message.success('提交成功');
            handleBack(true);
        } catch (error: any) {
            if (error.message && !error.message.includes('不能为空')) {
                message.error(error.message || '操作失败');
            }
        } finally {
            setSubmitting(false);
        }
    };

    // Schema定义
    const schema: ISchema = {
        type: 'object',
        properties: {
            layout: {
                type: 'void',
                'x-component': 'FormLayout',
                'x-component-props': {
                    labelCol: 6,
                    wrapperCol: 18,
                    labelWidth: 120,
                },
                properties: {
                    grid: {
                        type: 'void',
                        'x-component': 'FormGrid',
                        'x-component-props': {
                            maxColumns: 2,
                            strictAutoFit: true,
                            columnGap: 24,
                        },
                        properties: {
                            // 隐藏字段
                            hidden: {
                                type: 'void',
                                'x-component': 'FormGrid.GridColumn',
                                'x-component-props': { gridSpan: 2, style: { display: 'none' } },
                                properties: {
                                    documentNumber: {
                                        type: 'string',
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                    },
                                    documentName: {
                                        type: 'string',
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                    },
                                },
                            },
                            // 第一行：标题
                            col_title: {
                                type: 'void',
                                'x-component': 'FormGrid.GridColumn',
                                'x-component-props': { gridSpan: 2 },
                                properties: {
                                    title: {
                                        type: 'string',
                                        title: '申请标题',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-component-props': {
                                            placeholder: '请输入申请标题',
                                            maxLength: 200,
                                        },
                                    },
                                },
                            },
                            // 第二行：申请说明
                            col_desc: {
                                type: 'void',
                                'x-component': 'FormGrid.GridColumn',
                                'x-component-props': { gridSpan: 2 },
                                properties: {
                                    description: {
                                        type: 'string',
                                        title: '申请说明',
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input.TextArea',
                                        'x-component-props': {
                                            placeholder: '请输入申请说明（可选）',
                                            rows: 2,
                                            maxLength: 1000,
                                        },
                                    },
                                },
                            },
                            // 第三行：文档选择 (Create模式)
                            col1: {
                                type: 'void',
                                'x-component': 'FormGrid.GridColumn',
                                'x-component-props': { gridSpan: 1 },
                                'x-visible': !isEdit,
                                properties: {
                                    documentId: {
                                        type: 'string',
                                        title: '作废文档',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Select',
                                        'x-component-props': {
                                            placeholder: '请选择要作废的文档',
                                            showSearch: true,
                                            filterOption: false,
                                        },
                                    },
                                    documentVersion: {
                                        type: 'string',
                                        title: '文档版本号',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Select',
                                        'x-component-props': {
                                            placeholder: '请先选择文档',
                                            showSearch: true,
                                            filterOption: true,
                                            disabled: true,
                                        },
                                    },
                                },
                            },
                            // 第三行：文档信息 (Edit模式)
                            col1_edit: {
                                type: 'void',
                                'x-component': 'FormGrid.GridColumn',
                                'x-component-props': { gridSpan: 1 },
                                'x-visible': isEdit,
                                properties: {
                                    documentInfo: {
                                        type: 'string',
                                        title: '作废文档',
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-component-props': {
                                            disabled: true,
                                        },
                                    },
                                    documentVersion: { // Edit模式下为只读或文本框
                                        type: 'string',
                                        title: '文档版本号',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-component-props': {
                                            disabled: true, // 建议禁用，不建议修改版本
                                        },
                                    },
                                },

                            },
                            // 右侧列
                            col2: {
                                type: 'void',
                                'x-component': 'FormGrid.GridColumn',
                                'x-component-props': { gridSpan: 1 },
                                properties: {
                                    effectiveDate: {
                                        type: 'string',
                                        title: '失效时间',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'DatePicker',
                                        'x-component-props': {
                                            placeholder: '请选择失效时间',
                                            showTime: true,
                                            format: 'YYYY-MM-DD HH:mm:ss',
                                            style: { width: '100%' },
                                        },
                                    },
                                    reasonType: {
                                        type: 'number',
                                        title: '作废原因类型',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Select',
                                        'x-component-props': {
                                            placeholder: '请选择作废原因类型',
                                        },
                                        enum: obsolescenceReasonTypeEnum.map((item) => ({
                                            label: item.label,
                                            value: item.value,
                                        })),
                                    },
                                    assignedToUserId: {
                                        type: 'string',
                                        title: '处理人',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'UserSelect',
                                        'x-component-props': {
                                            placeholder: '请选择处理人',
                                            labelInValue: true,
                                            labelField: 'name',
                                            valueField: 'userName',
                                        },
                                    },
                                },
                            },
                            // 详细说明
                            col_reason: {
                                type: 'void',
                                'x-component': 'FormGrid.GridColumn',
                                'x-component-props': { gridSpan: 2 },
                                properties: {
                                    reasonDescription: {
                                        type: 'string',
                                        title: '详细说明',
                                        required: true,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input.TextArea',
                                        'x-component-props': {
                                            placeholder: '请输入作废详细说明',
                                            rows: 4,
                                            maxLength: 500,
                                        },
                                    },
                                    impactScope: {
                                        type: 'string',
                                        title: '影响范围',
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input.TextArea',
                                        'x-component-props': {
                                            placeholder: '请输入影响范围（可选）',
                                            rows: 3,
                                            maxLength: 500,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    return (
        <Spin spinning={loading}>
            <Card
                title={isEdit ? '编辑文档作废申请' : '新建文档作废申请'}
                extra={
                    <ToolBar>
                        <Button icon={<ArrowLeftOutlined />} onClick={() => handleBack(false)}>
                            返回
                        </Button>
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            loading={submitting}
                            onClick={handleSave}
                        >
                            保存
                        </Button>
                        {/* 暂时隐藏新建时的提交按钮，因为需要先保存获取ID。或者可以优化为Save后Submit */}
                        {isEdit && (
                            <Button
                                type="primary"
                                icon={<SendOutlined />}
                                loading={submitting}
                                onClick={handleSaveAndSubmit}
                            >
                                保存并提交
                            </Button>
                        )}
                    </ToolBar>
                }
            >
                <FormProvider form={form}>
                    <SchemaField schema={schema} />
                </FormProvider>
            </Card>
        </Spin>
    );
};

export default DocumentObsolescenceRequestFormPage;
