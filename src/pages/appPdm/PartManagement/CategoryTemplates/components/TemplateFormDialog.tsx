import {
  CategoryLevelTemplateCreateAsync,
  CategoryLevelTemplateUpdateAsync,
  CategoryLevelTemplateGetAsync,
} from '@/services/pdm/CategoryLevelTemplate';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { templateFormId, templateFormSchema } from './templateSchema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';

interface TemplateFormDialogProps {
  entityId?: number;
  title?: string;
  buttonProps?: any;
  children?: React.ReactNode;
  onAfterSubmit?: () => void;
}

const TemplateFormDialog: React.FC<TemplateFormDialogProps> = (props) => {
  const { entityId, title, buttonProps = {}, children, onAfterSubmit } = props;

  const schema = useFormSchema(templateFormId, templateFormSchema);
  const SchemaField = useSchemaField();

  const formProps = {
    effects: () => {
      onFormInit((form) => {
        if (entityId) {
          CategoryLevelTemplateGetAsync({ id: entityId }).then((res) => {
            form.setInitialValues(res);
          });
        } else {
          form.setInitialValues({
            defaultSeparator: '-',
            isActive: true,
          });
        }
      });
    },
  };

  const portalId = `Pdm.CategoryTemplates.${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog(
            { title: title || (entityId ? '编辑模板' : '新建模板'), width: 520 },
            portalId,
            () => {
              return (
                <FormLayoutMode formId={templateFormId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              );
            }
          );

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              if (!values.id) {
                return CategoryLevelTemplateCreateAsync(values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return CategoryLevelTemplateUpdateAsync({ id: values.id }, values)
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
        {children}
      </Button>
    </FormDialog.Portal>
  );
};

export default TemplateFormDialog;
