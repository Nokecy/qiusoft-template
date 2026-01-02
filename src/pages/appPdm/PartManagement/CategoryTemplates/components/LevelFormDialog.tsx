import {
  CategoryLevelTemplateAddLevelAsync,
  CategoryLevelTemplateUpdateLevelAsync,
} from '@/services/pdm/CategoryLevelTemplate';
import { FormDialog } from '@formily/antd-v5';
import { Button } from 'antd';
import React from 'react';
import { levelFormId, levelFormSchema } from './levelSchema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';

interface LevelFormDialogProps {
  templateId: number;
  entityId?: number;
  initialValues?: any;
  title?: string;
  buttonProps?: any;
  children?: React.ReactNode;
  onAfterSubmit?: () => void;
}

const LevelFormDialog: React.FC<LevelFormDialogProps> = (props) => {
  const { templateId, entityId, initialValues, title, buttonProps = {}, children, onAfterSubmit } = props;

  const schema = useFormSchema(levelFormId, levelFormSchema);
  const SchemaField = useSchemaField();

  const portalId = `Pdm.CategoryLevel.${templateId}.${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          // 在点击时捕获最新的 initialValues
          const currentInitialValues = initialValues;

          const formDialog = FormDialog(
            { title: title || (entityId ? '编辑层级' : '添加层级'), width: 480 },
            portalId,
            () => {
              return (
                <FormLayoutMode formId={levelFormId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              );
            }
          );

          formDialog
            .forOpen((payload, next) => {
              // 使用 forOpen 每次打开时设置最新的初始值
              if (entityId && currentInitialValues) {
                next({ initialValues: currentInitialValues });
              } else {
                next({
                  initialValues: {
                    isCodeParticipant: true,
                  },
                });
              }
            })
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              if (!entityId) {
                return CategoryLevelTemplateAddLevelAsync({ templateId }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return CategoryLevelTemplateUpdateLevelAsync({ templateId, levelId: entityId }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              }
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

export default LevelFormDialog;
