/**
 * 物料表单页
 * 路由: /appPdm/PartManagement/Part/form?id={id}
 * 新建模式:无id参数
 * 编辑模式:有id参数
 *
 * 检出流程说明:
 * 1. 草稿状态(Draft)物料 - 可直接编辑，使用 PartUpdateAsync
 * 2. 已发布状态(Released)物料 - 需先检出，编辑草稿版本，使用 PartVersionUpdateDraftAsync
 * 3. 已检出物料 - 当前用户检出的可编辑草稿，其他用户检出的不可编辑
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, Spin, message, Alert, Modal, Input, Tag, Space, Tooltip, Result } from 'antd';
import { SaveOutlined, LockOutlined, UnlockOutlined, RollbackOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab, useModel, useAccess, Access } from 'umi';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import {
    PartGetAsync,
    PartCreateAsync,
    PartUpdateAsync,
    PartCheckOutAsync,
    PartCheckInAsync,
    PartUndoCheckOutAsync,
} from '@/services/pdm/Part';
import {
    PartVersionGetDraftAsync,
    PartVersionUpdateDraftAsync,
} from '@/services/pdm/PartVersion';
import { PartPermissions } from '@/pages/appPdm/_permissions';
import { PartCategoryAttributeGetByCategoryIdAsync } from '@/services/pdm/PartCategoryAttribute';
import PartCategoryTreeSelect from '../PartCategory/components/PartCategoryTreeSelect';
import ProductSeriesTreeSelect from '../ProductSeries/components/ProductSeriesTreeSelect';
import UnitSelect from '@/pages/appCommon/_utils/UnitSelect';
import MaterialComFromSelect from '@/pages/appCommon/_utils/MaterialComFromSelect';
import {
    buildAttributeFields,
    parseAttributeValues,
    serializeAttributeValues,
} from '../_utils/categoryAttributeHelper';

export const routeProps = {
    name: '物料表单',
};

const PartFormPage: React.FC = () => {
    const { id: partId, isActive, hasChanged } = useKeepAliveParams(
        '/appPdm/PartManagement/Part/form',
        ['id']
    );
    const isEdit = !!partId;
    const { initialState } = useModel('@@initialState');
    const currentUserId = initialState?.configuration?.currentUser?.id;
    const access = useAccess();

    // 获取动态 Schema（优先使用后端 Schema，否则使用内置）
    const {
        schema: baseSchema,
        formConfig,
        source: schemaSource,
        loading: schemaLoading,
        error: schemaError,
    } = useDynamicSchema('part:form');

    // 权限检查
    const canCheckOut = !!(access && (access[PartPermissions.CheckOut] ?? true));
    const canCheckIn = !!(access && (access[PartPermissions.CheckIn] ?? true));
    const canUndoCheckOut = !!(access && (access[PartPermissions.UndoCheckOut] ?? true));

    const SchemaField = useSchemaField({
        PartCategoryTreeSelect,
        ProductSeriesTreeSelect,
        UnitSelect,
        MaterialComFromSelect,
    });

    // 分类属性状态
    const [categoryAttributes, setCategoryAttributes] = useState<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]>([]);
    const [loadingAttributes, setLoadingAttributes] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    // 物料状态相关
    const [partData, setPartData] = useState<API.BurnAbpPdmPartManagementPartsDtosPartDto | null>(null);
    const [draftVersion, setDraftVersion] = useState<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto | null>(null);

    // 检出相关状态
    const [checkOutModalVisible, setCheckOutModalVisible] = useState(false);
    const [checkOutComment, setCheckOutComment] = useState('');
    const [checkOutLoading, setCheckOutLoading] = useState(false);

    // 编辑状态判断
    const lifecycleStatus = partData?.lifecycleStatus ?? 0;
    const isCheckedOut = partData?.isCheckedOut ?? false;
    const checkOutInfo = partData?.checkOutInfo;
    const isCurrentUserCheckedOut = checkOutInfo?.checkedOutUserId === currentUserId;
    const isDraft = lifecycleStatus === 0; // 草稿状态
    const isReleased = lifecycleStatus === 20; // 已发布状态

    // 判断编辑模式
    // editMode: 'direct' = 直接编辑Part, 'draft' = 编辑草稿版本
    const editMode = useMemo(() => {
        if (!isEdit) return 'direct'; // 新建模式
        if (isDraft) return 'direct'; // 草稿状态直接编辑
        if (isCheckedOut && isCurrentUserCheckedOut) return 'draft'; // 当前用户已检出，编辑草稿
        return 'none'; // 其他情况不可编辑
    }, [isEdit, isDraft, isCheckedOut, isCurrentUserCheckedOut]);

    // 是否需要先检出才能编辑
    const needCheckOut = isEdit && isReleased && !isCheckedOut;

    // 是否被其他用户检出
    const isOtherUserCheckedOut = isCheckedOut && !isCurrentUserCheckedOut;

    // 判断表单是否应该为只读模式
    const isFormReadOnly = editMode === 'none' || needCheckOut || isOtherUserCheckedOut;

    // 创建表单实例
    const form = useMemo(() => createForm({ validateFirst: true }), [partId]);

    // 加载分类属性
    const loadCategoryAttributes = useCallback(async (categoryId: string) => {
        if (!categoryId) {
            setCategoryAttributes([]);
            return;
        }

        setLoadingAttributes(true);
        try {
            const attrs = await PartCategoryAttributeGetByCategoryIdAsync({ categoryId });
            setCategoryAttributes(attrs || []);
        } catch (error) {
            message.error('加载分类属性失败');
            setCategoryAttributes([]);
        } finally {
            setLoadingAttributes(false);
        }
    }, []);

    // 将数据填充到表单（辅助函数，不作为依赖）
    const fillFormData = (formInstance: any, data: any, categoryId?: string) => {
        const attributeValues = parseAttributeValues(data.attributesJson);

        const initialValues: any = {
            id: data.id,
            '{value:productSeriesId,label:productSeriesName}': data.productSeriesId
                ? { value: data.productSeriesId, label: data.productSeriesName || '' }
                : undefined,
            '{value:categoryId,label:categoryName}': data.categoryId
                ? { value: data.categoryId, label: data.categoryName || '' }
                : undefined,
            partNumber: data.partNumber,
            outCode: data.outCode,
            drawingNumber: data.drawingNumber,
            description: data.description, // 物料描述
            '{value:unitCode,label:unitName}': data.unitCode
                ? { value: data.unitCode, label: data.unitName || '' }
                : undefined,
            specification: data.specification,
            isCritical: data.isCritical,
            '{value:comeFrom,label:comeFromName}': data.comeFrom
                ? { value: data.comeFrom, label: data.comeFromName || data.comeFrom }
                : undefined,
            eanCode: data.eanCode,
            upcCode: data.upcCode,
            engDescription: data.engDescription,
            outDescription: data.outDescription,
            outSpecification: data.outSpecification,
            versionReason: data.versionReason,
            ...attributeValues,
        };

        formInstance.setInitialValues(initialValues);

        // 加载分类属性
        const catId = categoryId || data.categoryId;
        if (catId) {
            loadCategoryAttributes(catId);
        }
    };

    // 动态设置表单只读模式
    useEffect(() => {
        if (isFormReadOnly) {
            form.setPattern('readPretty');
        } else {
            form.setPattern('editable');
        }
    }, [form, isFormReadOnly]);

    // 加载初始数据
    useEffect(() => {
        if (!isActive || !hasChanged) return;

        if (partId) {
            setLoading(true);
            PartGetAsync({ id: partId })
                .then(async (data) => {
                    setPartData(data);

                    // 如果已检出且是当前用户检出的，加载草稿版本数据
                    if (data.isCheckedOut && data.checkOutInfo?.checkedOutUserId === currentUserId) {
                        try {
                            const draft = await PartVersionGetDraftAsync({ partId: data.id! });
                            if (draft) {
                                setDraftVersion(draft);
                                // 使用草稿版本数据填充表单
                                fillFormData(form, {
                                    ...data,
                                    productSeriesId: draft.productSeriesId ?? data.productSeriesId,
                                    productSeriesName: draft.productSeriesName ?? data.productSeriesName,
                                    drawingNumber: draft.drawingNumber,
                                    description: draft.description,
                                    specification: draft.specification,
                                    unitCode: draft.unitCode,
                                    unitName: draft.unitName,
                                    categoryCode: draft.categoryCode,
                                    comeFrom: draft.comeFrom,
                                    eanCode: draft.eanCode,
                                    upcCode: draft.upcCode,
                                    engDescription: draft.engDescription,
                                    outDescription: draft.outDescription,
                                    outSpecification: draft.outSpecification,
                                    outCode: draft.outCode,
                                    isCritical: draft.isCritical,
                                    versionReason: draft.versionReason,
                                    // 属性值使用草稿版本的
                                    attributesJson: JSON.stringify(draft.attributeValues?.reduce((acc: any, attr: any) => {
                                        acc[attr.attributeCode] = attr.attributeValue;
                                        return acc;
                                    }, {})),
                                });
                            } else {
                                fillFormData(form, data);
                            }
                        } catch (error) {
                            console.error('加载草稿版本失败:', error);
                            fillFormData(form, data);
                        }
                    } else {
                        fillFormData(form, data);
                    }
                })
                .catch(() => {
                    message.error('加载数据失败');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, hasChanged, partId, currentUserId]);

    // 返回列表
    const handleBack = () => {
        const currentPath = window.location.pathname;
        history.push('/appPdm/PartManagement/Part');
        setTimeout(() => {
            closeTab(currentPath);
        }, 150);
    };

    // 检出操作
    const handleCheckOut = async () => {
        if (!partId) return;
        setCheckOutLoading(true);
        try {
            const draft = await PartCheckOutAsync({ id: partId }, { comment: checkOutComment });
            message.success('检出成功');
            setCheckOutModalVisible(false);
            setCheckOutComment('');

            // 刷新数据
            const updatedPart = await PartGetAsync({ id: partId });
            setPartData(updatedPart);
            setDraftVersion(draft);

            // 使用草稿版本数据填充表单
            fillFormData(form, {
                ...updatedPart,
                productSeriesId: draft.productSeriesId ?? updatedPart.productSeriesId,
                productSeriesName: draft.productSeriesName ?? updatedPart.productSeriesName,
                drawingNumber: draft.drawingNumber,
                description: draft.description,
                specification: draft.specification,
                unitCode: draft.unitCode,
                unitCode: draft.unitCode,
                categoryCode: draft.categoryCode,
                comeFrom: draft.comeFrom,
                eanCode: draft.eanCode,
                upcCode: draft.upcCode,
                engDescription: draft.engDescription,
                outDescription: draft.outDescription,
                outSpecification: draft.outSpecification,
                outCode: draft.outCode,
                isCritical: draft.isCritical,
                versionReason: draft.versionReason,
                attributesJson: JSON.stringify(draft.attributeValues?.reduce((acc: any, attr: any) => {
                    acc[attr.attributeCode] = attr.attributeValue;
                    return acc;
                }, {})),
            });
        } catch (error: any) {
            message.error(error?.message || '检出失败');
        } finally {
            setCheckOutLoading(false);
        }
    };

    // 检入操作
    const handleCheckIn = async () => {
        if (!partId) return;
        setCheckOutLoading(true);
        try {
            await PartCheckInAsync({ id: partId });
            message.success('检入成功');
            handleBack();
        } catch (error: any) {
            message.error(error?.message || '检入失败');
        } finally {
            setCheckOutLoading(false);
        }
    };

    // 撤销检出操作
    const handleUndoCheckOut = () => {
        if (!partId) return;
        Modal.confirm({
            title: '确认撤销检出',
            content: '撤销检出将删除所有草稿修改，恢复到已发布状态。确定要撤销吗？',
            okText: '确定撤销',
            okButtonProps: { danger: true },
            cancelText: '取消',
            onOk: async () => {
                setCheckOutLoading(true);
                try {
                    await PartUndoCheckOutAsync({ id: partId }, {});
                    message.success('撤销检出成功');
                    handleBack();
                } catch (error: any) {
                    message.error(error?.message || '撤销检出失败');
                } finally {
                    setCheckOutLoading(false);
                }
            },
        });
    };

    // 提交表单
    const handleSubmit = async () => {
        if (submitting) return;

        // 检查编辑权限
        if (editMode === 'none') {
            if (needCheckOut) {
                message.warning('请先检出物料后再编辑');
            } else if (isOtherUserCheckedOut) {
                message.error(`物料已被 ${checkOutInfo?.checkedOutUserName} 检出，无法编辑`);
            } else {
                message.error('当前状态无法编辑');
            }
            return;
        }

        try {
            setSubmitting(true);
            const values = await form.submit();

            const submitData: any = {
                productSeriesId: values.productSeriesId,
                partNumber: values.partNumber,
                outCode: values.outCode,
                drawingNumber: values.drawingNumber,
                description: values.description, // 物料描述
                specification: values.specification,
                isCritical: values.isCritical,
                eanCode: values.eanCode,
                upcCode: values.upcCode,
                engDescription: values.engDescription,
                outDescription: values.outDescription,
                outSpecification: values.outSpecification,
                versionReason: values.versionReason,
                categoryId: values.categoryId,
                categoryName: values.categoryName,
                unitCode: values.unitCode,
                unitName: values.unitName,
                comeFrom: values.comeFrom,
                comeFromName: values.comeFromName,
                attributesJson: serializeAttributeValues(values),
            };

            if (isEdit) {
                if (editMode === 'draft' && draftVersion?.id) {
                    // 编辑草稿版本 - 使用 PartVersionUpdateDraftAsync
                    const draftSubmitData: API.BurnAbpPdmPartManagementPartVersionsDtosUpdatePartVersionDto = {
                        productSeriesId: values.productSeriesId,
                        description: values.description,
                        specification: values.specification,
                        unitCode: values.unitCode,
                        unitCode: values.unitCode,
                        categoryCode: values.categoryCode,
                        comeFrom: values.comeFrom,
                        eanCode: values.eanCode,
                        upcCode: values.upcCode,
                        engDescription: values.engDescription,
                        outDescription: values.outDescription,
                        outSpecification: values.outSpecification,
                        outCode: values.outCode,
                drawingNumber: values.drawingNumber,
                        // 属性值需要转换格式
                        attributeValues: categoryAttributes.map(attr => ({
                            attributeCode: attr.attributeCode,
                            attributeValue: values[`attr_${attr.attributeCode}`] || '',
                        })),
                    };
                    await PartVersionUpdateDraftAsync({ id: draftVersion.id }, draftSubmitData);
                    message.success('草稿保存成功');
                } else {
                    // 直接编辑 Part
                    await PartUpdateAsync({ id: partId }, submitData);
                    message.success('更新成功');
                }
            } else {
                await PartCreateAsync(submitData);
                message.success('创建成功');
            }

            handleBack();
        } catch (error: any) {
            if (error?.errorFields) {
                message.error('请检查表单填写');
            } else {
                message.error(isEdit ? '保存失败' : '创建失败');
            }
        } finally {
            setSubmitting(false);
        }
    };

    // 动态构造表单 Schema - 基于动态 Schema 合并分类属性
    const schema: ISchema = useMemo(() => {
        const attributeFields = buildAttributeFields(categoryAttributes);
        const hasAttributes = Object.keys(attributeFields).length > 0;

        // 深拷贝基础 Schema
        const mergedSchema = JSON.parse(JSON.stringify(baseSchema));

        // 获取 grid 属性对象
        const gridProperties = mergedSchema.properties?.grid?.properties;
        if (!gridProperties) {
            return mergedSchema;
        }

        // 动态处理物料编码字段的状态
        if (gridProperties.col1?.properties?.partNumber) {
            const partNumberField = gridProperties.col1.properties.partNumber;
            partNumberField.required = isEdit;
            partNumberField['x-decorator-props'] = {
                ...partNumberField['x-decorator-props'],
                tooltip: !isEdit ? '保存后系统将自动生成物料编码' : undefined,
            };
            partNumberField['x-component-props'] = {
                ...partNumberField['x-component-props'],
                placeholder: !isEdit ? '保存后自动生成' : '请输入物料编码',
                disabled: !isEdit,
            };
            partNumberField['x-pattern'] = isEdit ? 'readPretty' : undefined;
        }

        // 动态处理物料分类字段的 onChange
        const categoryField = gridProperties.colCategory?.properties?.['{value:categoryId,label:categoryName}'];
        if (categoryField) {
            categoryField['x-component-props'] = {
                ...categoryField['x-component-props'],
                onChange: (value: any) => {
                    const categoryId = value?.value || value;
                    if (categoryId) {
                        loadCategoryAttributes(categoryId);
                    }
                },
            };
        }

        // 添加分类属性分隔线和动态字段
        if (hasAttributes) {
            gridProperties.divider_attributes = {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 4 },
                properties: {
                    divider: {
                        type: 'void',
                        'x-component': 'FormDivider',
                        'x-component-props': {
                            orientation: 'left',
                            children: '分类属性',
                            style: { marginTop: 5, marginBottom: 5 },
                        },
                    },
                },
            };
        }

        // 合并动态分类属性字段
        Object.assign(gridProperties, attributeFields);

        return mergedSchema;
    }, [baseSchema, categoryAttributes, isEdit, loadCategoryAttributes]);

    // 获取生命周期状态文本
    const getLifecycleText = (status: number) => {
        const statusMap: Record<number, string> = {
            0: '草稿',
            10: '审批中',
            20: '已发布',
            30: '已拒绝',
            40: '已作废',
            50: '已取消',
        };
        return statusMap[status] || '未知';
    };

    // 获取生命周期状态颜色
    const getLifecycleColor = (status: number) => {
        const colorMap: Record<number, string> = {
            0: 'default',
            10: 'processing',
            20: 'success',
            30: 'error',
            40: 'default',
            50: 'warning',
        };
        return colorMap[status] || 'default';
    };

    // 渲染检出状态提示
    const renderCheckOutAlert = () => {
        if (!isEdit || !partData) return null;

        // 已检出且是当前用户
        if (isCheckedOut && isCurrentUserCheckedOut) {
            return (
                <Alert
                    message={
                        <Space>
                            <LockOutlined />
                            <span>您已检出此物料，正在编辑草稿版本</span>
                            <Tag color="blue">版本: {draftVersion?.version || '-'}</Tag>
                        </Space>
                    }
                    description={
                        <div style={{ fontSize: 12, color: '#666' }}>
                            <Space split={<span style={{ color: '#d9d9d9' }}>|</span>}>
                                <span><ClockCircleOutlined /> 检出时间: {checkOutInfo?.checkedOutTime?.substring(0, 16) || '-'}</span>
                                {checkOutInfo?.checkOutComment && <span>备注: {checkOutInfo.checkOutComment}</span>}
                            </Space>
                        </div>
                    }
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                    action={
                        <Space direction="vertical" size={4}>
                            <Access accessible={canCheckIn}>
                                <Button size="small" icon={<UnlockOutlined />} onClick={handleCheckIn} loading={checkOutLoading}>
                                    检入
                                </Button>
                            </Access>
                            <Access accessible={canUndoCheckOut}>
                                <Button size="small" danger icon={<RollbackOutlined />} onClick={handleUndoCheckOut} loading={checkOutLoading}>
                                    撤销检出
                                </Button>
                            </Access>
                        </Space>
                    }
                />
            );
        }

        // 已发布但未检出 - 需要检出
        if (needCheckOut) {
            return (
                <Alert
                    message={
                        <Space>
                            <span>该物料已发布，需要检出后才能编辑</span>
                            <Tag color={getLifecycleColor(lifecycleStatus)}>{getLifecycleText(lifecycleStatus)}</Tag>
                        </Space>
                    }
                    description="检出后将创建新的草稿版本，您可以在草稿版本上进行修改。"
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                    action={
                        <Access accessible={canCheckOut}>
                            <Button type="primary" icon={<LockOutlined />} onClick={() => setCheckOutModalVisible(true)} loading={checkOutLoading}>
                                检出并编辑
                            </Button>
                        </Access>
                    }
                />
            );
        }

        // 被其他用户检出
        if (isOtherUserCheckedOut) {
            return (
                <Alert
                    message={
                        <Space>
                            <LockOutlined />
                            <span>物料已被其他用户检出，无法编辑</span>
                        </Space>
                    }
                    description={
                        <div style={{ fontSize: 12 }}>
                            <Space split={<span style={{ color: '#d9d9d9' }}>|</span>}>
                                <span><UserOutlined /> 检出人: {checkOutInfo?.checkedOutUserName || '-'}</span>
                                <span><ClockCircleOutlined /> 检出时间: {checkOutInfo?.checkedOutTime?.substring(0, 16) || '-'}</span>
                            </Space>
                        </div>
                    }
                    type="error"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            );
        }

        return null;
    };

    // 判断保存按钮是否可用
    const canSave = editMode !== 'none' && !needCheckOut && !isOtherUserCheckedOut;

    // Schema 加载中
    if (schemaLoading) {
        return (
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" tip="加载表单配置中..." />
            </div>
        );
    }

    // Schema 加载错误
    if (schemaError) {
        return (
            <div style={{ height: '100%', padding: '16px' }}>
                <Result
                    status="error"
                    title="表单配置加载失败"
                    subTitle={schemaError.message}
                    extra={[
                        <Button key="back" onClick={handleBack}>
                            返回列表
                        </Button>,
                    ]}
                />
            </div>
        );
    }

    return (
        <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
            <Card
                headStyle={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    backgroundColor: '#fff',
                }}
                title={
                    <Space>
                        <span>{isEdit ? '编辑物料' : '创建物料'}</span>
                        {isEdit && partData && (
                            <>
                                <Tag>{partData.partNumber}</Tag>
                                <Tag color={getLifecycleColor(lifecycleStatus)}>{getLifecycleText(lifecycleStatus)}</Tag>
                                {editMode === 'draft' && <Tag color="blue">编辑草稿</Tag>}
                            </>
                        )}
                        {schemaSource === 'backend' && (
                            <Tooltip title="使用后端动态配置">
                                <Tag color="green">动态</Tag>
                            </Tooltip>
                        )}
                    </Space>
                }
            >
                {renderCheckOutAlert()}

                <Spin spinning={loading || loadingAttributes || checkOutLoading} tip={loading ? '加载中...' : loadingAttributes ? '加载分类属性中...' : '处理中...'}>
                    <FormProvider form={form}>
                        <FormLayout {...formConfig}>
                            <SchemaField schema={schema} />
                        </FormLayout>
                    </FormProvider>
                </Spin>
            </Card>

            <ToolBar>
                <Button onClick={handleBack} disabled={submitting || checkOutLoading}>
                    返回
                </Button>
                {canSave && (
                    <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmit} loading={submitting} disabled={checkOutLoading}>
                        {editMode === 'draft' ? '保存草稿' : '保存'}
                    </Button>
                )}
            </ToolBar>

            {/* 检出对话框 */}
            <Modal
                title="检出物料"
                open={checkOutModalVisible}
                onOk={handleCheckOut}
                onCancel={() => {
                    setCheckOutModalVisible(false);
                    setCheckOutComment('');
                }}
                confirmLoading={checkOutLoading}
                okText="确定检出"
                cancelText="取消"
            >
                <Alert
                    message="检出说明"
                    description="检出将创建一个新的草稿版本并锁定物料，在此期间其他用户无法编辑该物料。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
                <Input.TextArea
                    placeholder="请输入检出备注（可选）"
                    value={checkOutComment}
                    onChange={(e) => setCheckOutComment(e.target.value)}
                    rows={3}
                    maxLength={500}
                    showCount
                />
            </Modal>
        </div>
    );
};

export default PartFormPage;
