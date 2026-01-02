import {
  CalendarDefinitionCreateAsync,
  CalendarDefinitionGetAsync,
  CalendarDefinitionUpdateAsync,
} from '@/services/openApi/CalendarDefinition';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';

const CalendarDefinitionFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, children } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        // 如果是编辑模式，加载数据
        if (entityId) {
          const calendarDefinition = await CalendarDefinitionGetAsync({ id: entityId });
          form.setInitialValues(calendarDefinition);
        }
      });
    },
  };

  const portalId = `calendarDefinition${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={async () => {
          const formDialog = FormDialog({ title, width: 600 }, portalId, () => {
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
                return CalendarDefinitionCreateAsync(values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                    next(payload);
                  })
                  .catch(() => {
                    // 静默处理错误，不显示错误提示
                  });
              } else {
                return CalendarDefinitionUpdateAsync({ id: values.id }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                    next(payload);
                  })
                  .catch(() => {
                    // 静默处理错误，不显示错误提示
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

export default CalendarDefinitionFormDialog;
