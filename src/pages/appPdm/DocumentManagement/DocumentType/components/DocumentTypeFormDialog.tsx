import { DocumentTypeCreateAsync, DocumentTypeUpdateAsync, DocumentTypeGetAsync } from '@/services/pdm/DocumentType';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';

const DocumentTypeFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField();

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          DocumentTypeGetAsync({ id: entityId }).then(res => {
            // 如果 fileExtensions 是字符串，转换为数组供 Select tags 模式使用
            if (res.fileExtensions && typeof res.fileExtensions === 'string') {
              res.fileExtensions = res.fileExtensions.split(',').map((ext: string) => ext.trim()).filter(Boolean);
            }
            form.setInitialValues(res);
          });
        }
      });
    },
  };

  const portalId = `Pdm.DocumentManagement.DocumentType.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
            return (
              <>
                <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              </>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              // 如果 fileExtensions 是数组，转换为逗号分隔的字符串供后端使用
              if (values.fileExtensions && Array.isArray(values.fileExtensions)) {
                values.fileExtensions = values.fileExtensions.join(',');
              }

              if (!values.id) {
                return DocumentTypeCreateAsync(values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return DocumentTypeUpdateAsync({ id: values.id }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
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

export default DocumentTypeFormDialog;
