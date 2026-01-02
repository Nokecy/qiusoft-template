import {
  WorkdayConfigureCreateAsync,
  WorkdayConfigureGetAsync,
  WorkdayConfigureUpdateAsync,
} from '@/services/openApi/WorkdayConfigure';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';

const WorkdayConfigureFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, children } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        // 如果是编辑模式，加载数据
        if (entityId) {
          const workdayConfigure = await WorkdayConfigureGetAsync({ id: entityId });
          form.setInitialValues(workdayConfigure);
        }
      });
    },
  };

  const portalId = `workdayConfigure${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={async () => {
          const formDialog = FormDialog({ title, width: 1200 }, portalId, () => {
            return (
              <FormLayout {...schema.form}>
                <SchemaField schema={schema.schema} />
              </FormLayout>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              if (!values.id) {
                return WorkdayConfigureCreateAsync(values).then(() => {
                  if (onAfterSubmit) onAfterSubmit();
                  next(payload);
                });
              } else {
                return WorkdayConfigureUpdateAsync({ id: values.id }, values).then(() => {
                  if (onAfterSubmit) onAfterSubmit();
                  next(payload);
                });
              }
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        {children || title}
      </Button>
    </FormDialog.Portal>
  );
};

export default WorkdayConfigureFormDialog;
