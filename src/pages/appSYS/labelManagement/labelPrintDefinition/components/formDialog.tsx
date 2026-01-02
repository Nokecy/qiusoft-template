import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';

const LabelPrintDefinitionFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, getRequest, createRequest, updateRequest } =
    props;

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

  const portalId = `labelManagement.labelPrintDefinition.${entityId}`;

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
              if (!values.id) {
                return createRequest(values).then(() => {
                  if (onAfterSubmit) onAfterSubmit();
                  next(payload);
                });
              } else {
                return updateRequest({ id: values?.id }, values).then(() => {
                  if (onAfterSubmit) onAfterSubmit();
                  next(payload);
                });
              }
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

export default LabelPrintDefinitionFormDialog;
