import {
    DocumentObsolescenceRequestGetAsync,
    DocumentObsolescenceRequestUpdateAsync,
} from '@/services/pdm/DocumentObsolescenceRequest';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange, onFieldMount, onFieldInputValueChange } from '@formily/core';
import { Button, message, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React from 'react';
import { useSchemaField } from 'umi';
import {
    FormItem,
    Input,
    FormGrid,
    Select,
    DatePicker,
} from '@formily/antd-v5';
import { DocumentGetListAsync } from '@/services/pdm/Document';
import { obsolescenceReasonTypeEnum } from '../_enums';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import dayjs from 'dayjs';

interface EditObsolescenceRequestDialogProps {
    id: string;
    onAfterSubmit?: () => void;
    buttonProps?: any;
    children?: React.ReactNode;
}

const EditObsolescenceRequestDialog: React.FC<EditObsolescenceRequestDialogProps> = (props) => {
    const { id, onAfterSubmit, buttonProps, children } = props;
    const SchemaField = useSchemaField({ UserSelect });

    const handleOpenDialog = async () => {
        const portalId = `Pdm.DocumentObsolescenceRequest.Edit.${id}`;

        // 加载申请详情
        const hide = message.loading('正在加载申请详情...', 0);
        let requestData: any = null;
        try {
            requestData = await DocumentObsolescenceRequestGetAsync({ id });
        } catch (error) {
            hide();
            message.error('加载申请详情失败');
            return;
        }
        hide();

        // Schema定义
        const schema = {
            type: 'object',
            properties: {
                layout: {
                    type: 'void',
                    'x-component': 'FormGrid',
                    'x-component-props': {
                        maxColumns: 1,
                        strictAutoFit: true,
                    },
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
                        description: {
                            type: 'string',
                            title: '申请说明',
                            'x-decorator': 'FormItem',
                            'x-component': 'Input.TextArea',
                            'x-component-props': {
                                placeholder: '请输入申请说明（可选）',
                                rows: 3,
                                maxLength: 1000,
                            },
                        },
                        documentVersion: {
                            type: 'string',
                            title: '文档版本号',
                            required: true,
                            'x-decorator': 'FormItem',
                            'x-component': 'Input',
                            'x-component-props': {
                                placeholder: '请输入文档版本号',
                                maxLength: 50,
                            },
                        },
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
                        // replacementDocumentId 字段已隐藏
                        // replacementDocumentId: {
                        //     type: 'string',
                        //     title: '替代文档',
                        //     'x-decorator': 'FormItem',
                        //     'x-component': 'Select',
                        //     'x-component-props': {
                        //         placeholder: '请选择替代文档（可选）',
                        //         showSearch: true,
                        //         filterOption: false,
                        //         allowClear: true,
                        //     },
                        // },
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
            },
        };

        // 加载文档列表
        const loadDocuments = async (field: any) => {
            const searchValue = field.inputValue || '';

            try {
                const result = await DocumentGetListAsync({
                    Filter: searchValue,
                    MaxResultCount: 100,
                    SkipCount: 0,
                });

                // 过滤掉草稿状态的文档(status=0为草稿)
                const documents = (result.items || [])
                    .filter((item: any) => item.status !== 0)
                    .map((item: any) => ({
                        label: `${item.documentNumber} - ${item.documentName || ''} (${item.currentVersion || 'v1.0'})`,
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

        // 打开对话框
        const formDialog = FormDialog({ title: '编辑作废申请', width: 600 }, portalId, () => {
            return (
                <FormLayout labelCol={6} wrapperCol={18}>
                    <SchemaField schema={schema} />
                </FormLayout>
            );
        });

        // 表单初始化
        const formProps = {
            effects: () => {
                onFormInit((form) => {
                    // 设置初始值
                    form.setInitialValues({
                        documentInfo: `${requestData.documentNumber} - ${requestData.documentName || ''}`,
                        title: requestData.title,
                        description: requestData.description,
                        documentVersion: requestData.documentVersion,
                        effectiveDate: requestData.effectiveDate ? dayjs(requestData.effectiveDate) : null,
                        reasonType: requestData.reasonType,
                        reasonDescription: requestData.reasonDescription,
                        replacementDocumentId: requestData.replacementDocumentId,
                        impactScope: requestData.impactScope,
                        // 如果有处理人，设置为 labelInValue 格式
                        assignedToUserId: requestData.assignedToUserCode
                            ? { value: requestData.assignedToUserCode, label: requestData.assignedToUserName }
                            : null,
                    });
                });

                // 替代文档字段已隐藏，以下代码已注释
                // onFieldMount('layout.replacementDocumentId', async (field) => {
                //     field.loading = true;
                //     try {
                //         await loadDocuments(field);
                //     } finally {
                //         field.loading = false;
                //     }
                // });

                // let replacementSearchTimer: any = null;
                // onFieldInputValueChange('layout.replacementDocumentId', async (field) => {
                //     if (field.value) {
                //         return;
                //     }
                //     clearTimeout(replacementSearchTimer);
                //     replacementSearchTimer = setTimeout(async () => {
                //         field.loading = true;
                //         try {
                //             await loadDocuments(field);
                //         } finally {
                //             field.loading = false;
                //         }
                //     }, 300);
                // });
            },
        };

        formDialog
            .forConfirm(async (payload, next) => {
                const values: any = payload.values;

                try {
                    const hide = message.loading('正在保存申请...', 0);

                    await DocumentObsolescenceRequestUpdateAsync(
                        { id },
                        {
                            title: values.title,
                            description: values.description,
                            documentVersion: values.documentVersion,
                            effectiveDate: values.effectiveDate,
                            reasonType: values.reasonType,
                            reasonDescription: values.reasonDescription,
                            replacementDocumentId: values.replacementDocumentId,
                            impactScope: values.impactScope,
                            // UserSelect 使用 labelInValue 格式，从中提取 code 和 name
                            assignedToUserCode: values.assignedToUserId?.value,
                            assignedToUserName: values.assignedToUserId?.label,
                        }
                    );

                    hide();
                    message.success('保存成功');

                    if (onAfterSubmit) {
                        onAfterSubmit();
                    }

                    next(payload);
                } catch (error: any) {
                    console.error('保存失败:', error);
                    message.error(error?.message || '保存失败,请重试');
                    throw error;
                }
            })
            .open(formProps);
    };

    const portalId = `Pdm.DocumentObsolescenceRequest.Edit.${id}`;

    return (
        <FormDialog.Portal id={portalId}>
            {children ? (
                <div onClick={handleOpenDialog}>{children}</div>
            ) : (
                <Button
                    type="link"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={handleOpenDialog}
                    {...buttonProps}
                >
                    编辑
                </Button>
            )}
        </FormDialog.Portal>
    );
};

export default EditObsolescenceRequestDialog;
