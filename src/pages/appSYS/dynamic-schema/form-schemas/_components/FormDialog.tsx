/**
 * 表单设计管理 - 表单对话框组件
 */
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { Button, message } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { FormSchemaCreateAsync } from '@/services/openApi/FormSchema';
import { ScenarioSelector } from '@/pages/appSYS/_components/DynamicSchema';
import { formId, formSchema } from './schema';

interface FormSchemaFormDialogProps {
  title: string;
  buttonProps?: Record<string, any>;
  onAfterSubmit?: () => void;
  children?: React.ReactNode;
}

const FormSchemaFormDialog: React.FC<FormSchemaFormDialogProps> = (props) => {
  const { title, buttonProps, onAfterSubmit, children } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({ ScenarioSelector });

  const portalId = 'formSchemaCreate';

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

              return FormSchemaCreateAsync({
                sourceType: values.sourceType,
                scenarioKey: values.scenarioKey || 'default',
                schemaJson: values.schemaJson || '{}',
                remark: values.remark,
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
            })
            .open();
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    </FormDialog.Portal>
  );
};

export default FormSchemaFormDialog;
