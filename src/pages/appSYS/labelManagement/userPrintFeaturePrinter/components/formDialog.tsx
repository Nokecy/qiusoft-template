import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';

const UserPrintFeaturePrinterFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, getRequest, setRequest } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        if (entityId) {
          const data = await getRequest({ id: entityId });
          form.setInitialValues(data);
        }
      });
    },
  };

  const portalId = `labelManagement.userPrintFeaturePrinter.${entityId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 800 }, portalId, () => {
            return (
              <FormLayout {...schema.form}>
                <SchemaField schema={schema.schema} />
              </FormLayout>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              return setRequest(values).then(() => {
                if (onAfterSubmit) onAfterSubmit();
                next(payload);
              });
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default UserPrintFeaturePrinterFormDialog;
