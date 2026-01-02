/**
 * 扩展字段管理 - 表单对话框组件
 */
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import {
  HostEntityGetExtensionFieldAsync,
  HostEntityAddExtensionFieldAsync,
  HostEntityUpdateExtensionFieldAsync,
} from '@/services/openApi/HostEntity';
import { formId, formSchema } from './schema';

interface ExtensionFieldFormDialogProps {
  hostEntityId: string;
  fieldId?: string;
  title: string;
  buttonProps?: Record<string, any>;
  onAfterSubmit?: () => void;
  children?: React.ReactNode;
}

const ExtensionFieldFormDialog: React.FC<ExtensionFieldFormDialogProps> = (props) => {
  const { hostEntityId, fieldId, title, buttonProps, onAfterSubmit, children } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit((form) => {
        if (fieldId) {
          HostEntityGetExtensionFieldAsync({ hostEntityId, fieldId }).then((data) => {
            form.setInitialValues(data);
          });
        }
      });
    },
  };

  const portalId = `extensionField${hostEntityId}${fieldId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={() => {
          const formDialog = FormDialog(
            { title, width: 560 },
            portalId,
            () => (
              <FormLayout {...schema.form}>
                <SchemaField schema={schema.schema} />
              </FormLayout>
            )
          );

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              const fieldData = {
                name: values.name,
                displayName: values.displayName,
                description: values.description,
                dataType: values.dataType,
                maxLength: values.maxLength,
                precision: values.precision,
                scale: values.scale,
                isRequired: values.isRequired || false,
                defaultValue: values.defaultValue,
                indexType: values.indexType,
                sortOrder: values.sortOrder || 0,
              };

              if (!fieldId) {
                // 创建
                return HostEntityAddExtensionFieldAsync({ hostEntityId }, fieldData)
                  .then(() => {
                    message.success('创建成功');
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => next(payload))
                  .catch((error) => {
                    message.error('创建失败: ' + (error.message || '未知错误'));
                    throw error;
                  });
              } else {
                // 更新
                return HostEntityUpdateExtensionFieldAsync(
                  { hostEntityId, fieldId },
                  fieldData
                )
                  .then(() => {
                    message.success('更新成功');
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => next(payload))
                  .catch((error) => {
                    message.error('更新失败: ' + (error.message || '未知错误'));
                    throw error;
                  });
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

export default ExtensionFieldFormDialog;
