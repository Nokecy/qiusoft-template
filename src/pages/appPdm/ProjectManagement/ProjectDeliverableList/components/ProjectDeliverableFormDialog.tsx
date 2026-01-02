import { ProjectDeliverableCreateAsync, ProjectDeliverableUpdateAsync, ProjectDeliverableGetAsync } from '@/services/pdm/ProjectDeliverable';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';

const ProjectDeliverableFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({ UserSelect, ProjectSelect });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ProjectDeliverableGetAsync({ id: entityId }).then(res => {
            form.setInitialValues(res);
          });
        }
      });
    },
  };

  const portalId = `Pdm.ProjectManagement.ProjectDeliverable.${entityId || 'new'}`;
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
              if (!values.id) {
                return ProjectDeliverableCreateAsync(values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return ProjectDeliverableUpdateAsync({ id: values.id }, values)
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

export default ProjectDeliverableFormDialog;
