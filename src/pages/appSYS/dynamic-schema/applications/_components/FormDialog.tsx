/**
 * 动态应用管理 - 表单对话框组件
 */
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import {
  DynamicApplicationGetAsync,
  DynamicApplicationCreateAsync,
  DynamicApplicationUpdateAsync,
} from '@/services/openApi/DynamicApplication';
import { formId, formSchema } from './schema';

interface ApplicationFormDialogProps {
  entityId?: string;
  title: string;
  buttonProps?: Record<string, any>;
  onAfterSubmit?: () => void;
  children?: React.ReactNode;
}

const ApplicationFormDialog: React.FC<ApplicationFormDialogProps> = (props) => {
  const { entityId, title, buttonProps, onAfterSubmit, children } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit((form) => {
        if (entityId) {
          DynamicApplicationGetAsync({ id: entityId }).then((data) => {
            form.setInitialValues(data);
          });
        }
      });
    },
  };

  const portalId = `dynamicApplication${entityId || 'new'}`;

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

              if (!entityId) {
                // 创建
                return DynamicApplicationCreateAsync({
                  name: values.name,
                  displayName: values.displayName,
                  description: values.description,
                  icon: values.icon,
                  displayOrder: values.displayOrder || 0,
                  workflowEnabled: values.workflowEnabled || false,
                  workflowName: values.workflowEnabled ? values.workflowName : undefined,
                })
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
                return DynamicApplicationUpdateAsync(
                  { id: entityId },
                  {
                    name: values.name,
                    displayName: values.displayName,
                    description: values.description,
                    icon: values.icon,
                    displayOrder: values.displayOrder || 0,
                    workflowEnabled: values.workflowEnabled || false,
                    workflowName: values.workflowEnabled ? values.workflowName : undefined,
                  }
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

export default ApplicationFormDialog;
