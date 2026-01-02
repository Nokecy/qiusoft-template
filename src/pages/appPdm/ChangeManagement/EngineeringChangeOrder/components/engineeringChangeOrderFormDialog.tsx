import {
  EngineeringChangeOrderCreateAsync,
  EngineeringChangeOrderGetAsync,
  EngineeringChangeOrderUpdateAsync,
} from '@/services/pdm/EngineeringChangeOrder';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';

interface Props {
  entityId?: string;
  title: string;
  buttonProps?: any;
  onAfterSubmit?: () => void;
}

const EngineeringChangeOrderFormDialog: React.FC<Props> = ({ entityId, title, buttonProps, onAfterSubmit, children }) => {
  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          EngineeringChangeOrderGetAsync({ id: entityId }).then(res => {
            form.setInitialValues({
              id: res.id,
              title: res.title,
              description: res.description,
              reasonCategory: res.reason?.category,
              reasonDescription: res.reason?.description,
              urgencyLevel: res.urgencyLevel,
              riskLevel: res.riskLevel,
              changeCategory: res.changeCategory,
              affectsInterchangeability: res.affectsInterchangeability,
            } as any);
          });
        }
      });
    },
  };

  const portalId = `Pdm.ChangeManagement.EngineeringChangeOrder.${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title, width: 760 }, portalId, () => (
            <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
              <SchemaField schema={schema.schema} />
            </FormLayoutMode>
          ));

          formDialog
            .forConfirm((payload, next) => {
              const values = payload.values;
              if (!values.id) {
                const createPayload: API.BurnAbpPdmChangeManagementCreateEngineeringChangeOrderDto = {
                  title: values.title,
                  description: values.description,
                  reasonCategory: values.reasonCategory,
                  reasonDescription: values.reasonDescription,
                  urgencyLevel: values.urgencyLevel,
                  riskLevel: values.riskLevel,
                  changeCategory: values.changeCategory,
                  affectsInterchangeability: values.affectsInterchangeability,
                } as any;
                return EngineeringChangeOrderCreateAsync(createPayload)
                  .then(() => {
                    onAfterSubmit && onAfterSubmit();
                  })
                  .then(() => next(payload));
              }

              const updatePayload: API.BurnAbpPdmChangeManagementUpdateEngineeringChangeOrderDto = {
                title: values.title,
                description: values.description,
                reasonCategory: values.reasonCategory,
                reasonDescription: values.reasonDescription,
                urgencyLevel: values.urgencyLevel,
                riskLevel: values.riskLevel,
                changeCategory: values.changeCategory,
              };
              return EngineeringChangeOrderUpdateAsync({ id: values.id }, updatePayload)
                .then(() => {
                  onAfterSubmit && onAfterSubmit();
                })
                .then(() => next(payload));
            })
            .open(formProps as any);
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    </FormDialog.Portal>
  );
};

export default EngineeringChangeOrderFormDialog;

