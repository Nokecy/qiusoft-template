import React, { useMemo } from 'react';
import { Button, message } from 'antd';
import { FormDialog, FormItem, FormLayout, Input, TreeSelect } from '@formily/antd-v5';
import { onFormInit, isField } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { useIntl } from 'umi';
import {
    OrganizationUnitGetAsync,
    OrganizationUnitCreateAsync,
    OrganizationUnitUpdateAsync,
    OrganizationUnitGetTreeListAsync,
} from '@/services/openApi/OrganizationUnit';

interface OrgUnitFormModalProps {
    entityId?: string;
    parentId?: string;
    buttonProps?: any;
    onConfirm?: () => void;
    children?: React.ReactNode;
}

// 转换树形数据为 TreeSelect 格式
const transformToTreeSelectData = (data: API.BurnAbpIdentityProOrganizationUnitTreeDto[]): any[] => {
    return data.map(item => ({
        value: item.id,
        title: item.title,
        key: item.key || item.id,
        children: item.children ? transformToTreeSelectData(item.children) : undefined,
    }));
};

const OrgUnitFormModal: React.FC<OrgUnitFormModalProps> = props => {
    const { entityId, parentId, buttonProps, onConfirm, children } = props;
    const intl = useIntl();

    const SchemaField = useMemo(
        () =>
            createSchemaField({
                components: {
                    FormItem,
                    Input,
                    TreeSelect,
                },
            }),
        []
    );

    const formProps = {
        effects: () => {
            onFormInit(async form => {
                // 加载部门树作为父级选择项
                try {
                    const treeRes = await OrganizationUnitGetTreeListAsync({});
                    const treeData = transformToTreeSelectData(treeRes.items || []);
                    const parentIdField = form.query('parentId').take();
                    if (isField(parentIdField)) {
                        parentIdField.setDataSource(treeData);
                    }
                } catch (error) {
                    console.error('加载部门树失败:', error);
                }

                // 编辑模式：加载现有数据
                if (entityId) {
                    try {
                        const entity = await OrganizationUnitGetAsync({ id: entityId });
                        form.setInitialValues({
                            id: entity.id,
                            displayName: entity.displayName,
                            parentId: entity.parentId,
                            code: entity.code,
                        });
                    } catch (error) {
                        message.error('加载部门信息失败');
                    }
                } else if (parentId) {
                    // 新建子部门模式：设置默认父级
                    form.setInitialValues({
                        parentId: parentId,
                    });
                }
            });
        },
    };

    const PortalId = `orgUnit${entityId || 'new'}`;
    const dialogTitle = entityId ? '编辑部门' : '新建部门';

    const handleClick = () => {
        const formDialog = FormDialog({ title: dialogTitle, width: 520 }, PortalId, form => {
            return (
                <FormLayout labelWidth={80} feedbackLayout="terse">
                    <SchemaField>
                        <SchemaField.String
                            title="部门名称"
                            required
                            name="displayName"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-component-props={{ placeholder: '请输入部门名称' }}
                        />

                        <SchemaField.String
                            title="上级部门"
                            name="parentId"
                            x-decorator="FormItem"
                            x-component="TreeSelect"
                            x-component-props={{
                                placeholder: '请选择上级部门（不选则为顶级部门）',
                                allowClear: true,
                                treeDefaultExpandAll: true,
                                showSearch: true,
                                treeNodeFilterProp: 'title',
                            }}
                        />
                    </SchemaField>
                </FormLayout>
            );
        });

        formDialog
            .forConfirm(async (payload, next) => {
                const values: any = payload.values;
                const hide = message.loading('正在保存...', 0);
                try {
                    if (!values.id) {
                        // 创建
                        await OrganizationUnitCreateAsync({
                            displayName: values.displayName,
                            parentId: values.parentId,
                        });
                        message.success('创建成功');
                    } else {
                        // 更新
                        await OrganizationUnitUpdateAsync({
                            id: values.id,
                            displayName: values.displayName,
                            parentId: values.parentId,
                            code: values.code,
                        });
                        message.success('更新成功');
                    }
                    next(payload);
                    if (onConfirm) onConfirm();
                } catch (error: any) {
                    message.error(error?.message || '保存失败');
                } finally {
                    hide();
                }
            })
            .open(formProps);
    };

    return (
        <FormDialog.Portal id={PortalId}>
            <Button type="primary" onClick={handleClick} {...buttonProps}>
                {children}
            </Button>
        </FormDialog.Portal>
    );
};

export default OrgUnitFormModal;
