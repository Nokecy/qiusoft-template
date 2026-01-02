import { DocumentObsolescenceRequestCreateAsync } from '@/services/pdm/DocumentObsolescenceRequest';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange, onFieldMount, onFieldInputValueChange } from '@formily/core';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useSchemaField } from 'umi';
import {
  FormItem,
  Input,
  FormGrid,
  Select,
  DatePicker,
} from '@formily/antd-v5';
import { DocumentGetListAsync, DocumentGetVersionListAsync } from '@/services/pdm/Document';
import { obsolescenceReasonTypeEnum } from '../_enums';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';

interface CreateObsolescenceRequestDialogProps {
  onAfterSubmit?: () => void;
  buttonProps?: any;
  children?: React.ReactNode;
}

const CreateObsolescenceRequestDialog: React.FC<CreateObsolescenceRequestDialogProps> = (props) => {
  const { onAfterSubmit, buttonProps, children } = props;
  const SchemaField = useSchemaField({ UserSelect });

  const handleOpenDialog = async () => {
    const portalId = `Pdm.DocumentObsolescenceRequest.Create`;

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
            documentNumber: {
              type: 'string',
              title: '文档编码',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-display': 'hidden',
            },
            documentName: {
              type: 'string',
              title: '文档名称',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-display': 'hidden',
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
              'x-component': 'Select',
              'x-component-props': {
                placeholder: '请先选择文档',
                showSearch: true,
                filterOption: true,
                disabled: true,
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
            //   type: 'string',
            //   title: '替代文档',
            //   'x-decorator': 'FormItem',
            //   'x-component': 'Select',
            //   'x-component-props': {
            //     placeholder: '请选择替代文档（可选）',
            //     showSearch: true,
            //     filterOption: false,
            //     allowClear: true,
            //   },
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
    const formDialog = FormDialog({ title: '创建作废申请', width: 600 }, portalId, () => {
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
          form.setInitialValues({});
        });

        // 文档字段挂载时加载初始数据
        onFieldMount('layout.documentId', async (field) => {
          field.loading = true;
          try {
            await loadDocuments(field);
          } finally {
            field.loading = false;
          }
        });

        // 替代文档字段挂载时加载初始数据
        onFieldMount('layout.replacementDocumentId', async (field) => {
          field.loading = true;
          try {
            await loadDocuments(field);
          } finally {
            field.loading = false;
          }
        });

        // 监听搜索输入
        let searchTimer: any = null;
        onFieldInputValueChange('layout.documentId', async (field) => {
          // 如果字段已有值（用户刚选择），不重新加载数据
          if (field.value) {
            return;
          }

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

        // 监听替代文档搜索输入
        let replacementSearchTimer: any = null;
        onFieldInputValueChange('layout.replacementDocumentId', async (field) => {
          // 如果字段已有值（用户刚选择），不重新加载数据
          if (field.value) {
            return;
          }

          clearTimeout(replacementSearchTimer);
          replacementSearchTimer = setTimeout(async () => {
            field.loading = true;
            try {
              await loadDocuments(field);
            } finally {
              field.loading = false;
            }
          }, 300);
        });

        // 监听文档选择变化，自动填充文档编码和名称，并加载版本列表
        onFieldValueChange('layout.documentId', async (field) => {
          const form = field.form;
          const documentId = field.value;

          // 获取版本字段
          const versionField = form.query('layout.documentVersion').take();

          if (documentId && field.dataSource && field.dataSource.length > 0) {
            const selectedDoc = field.dataSource.find((doc: any) => doc.value === documentId);
            if (selectedDoc) {
              form.setFieldState('layout.documentNumber', (state) => {
                state.value = selectedDoc.documentNumber;
              });
              form.setFieldState('layout.documentName', (state) => {
                state.value = selectedDoc.documentName;
              });
            }

            // 加载版本列表
            if (versionField) {
              versionField.loading = true;
              try {
                const versionResult = await DocumentGetVersionListAsync({
                  Filter: `documentId = ${documentId}`,
                  MaxResultCount: 100,
                });

                const versionOptions = (versionResult.items || []).map((item: any) => ({
                  label: `${item.version || ''}${item.revision || ''} - ${item.state === 40 ? '已发布' : item.state === 20 ? '待审批' : item.state === 10 ? '草稿' : '未知'}`,
                  value: `${item.version || ''}${item.revision || ''}`,
                }));

                versionField.dataSource = versionOptions;
                versionField.setComponentProps({
                  disabled: false,
                  placeholder: versionOptions.length > 0 ? '请选择文档版本' : '暂无版本'
                });

                // 如果只有一个版本，自动选中
                if (versionOptions.length === 1) {
                  versionField.value = versionOptions[0].value;
                } else {
                  // 清空之前选择的版本
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
            // 清空版本字段并禁用
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
      },
    };

    formDialog
      .forConfirm(async (payload, next) => {
        const values: any = payload.values;

        try {
          const hide = message.loading('正在创建申请...', 0);

          await DocumentObsolescenceRequestCreateAsync({
            title: values.title,
            description: values.description,
            documentId: values.documentId,
            documentNumber: values.documentNumber,
            documentName: values.documentName,
            documentVersion: values.documentVersion,
            effectiveDate: values.effectiveDate,
            reasonType: values.reasonType,
            reasonDescription: values.reasonDescription,
            replacementDocumentId: values.replacementDocumentId,
            impactScope: values.impactScope,
            // UserSelect 使用 labelInValue 格式，从中提取 code 和 name
            assignedToUserCode: values.assignedToUserId?.value,
            assignedToUserName: values.assignedToUserId?.label,
          });

          hide();
          message.success('创建成功');

          if (onAfterSubmit) {
            onAfterSubmit();
          }

          next(payload);
        } catch (error: any) {
          console.error('创建失败:', error);
          message.error(error?.message || '创建失败,请重试');
          throw error;
        }
      })
      .open(formProps);
  };

  const portalId = `Pdm.DocumentObsolescenceRequest.Create`;

  return (
    <FormDialog.Portal id={portalId}>
      {children ? (
        <div onClick={handleOpenDialog}>{children}</div>
      ) : (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenDialog}
          {...buttonProps}
        >
          创建申请
        </Button>
      )}
    </FormDialog.Portal>
  );
};

export default CreateObsolescenceRequestDialog;
