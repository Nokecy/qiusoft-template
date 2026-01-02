import {
  HolidaySetCreateAsync,
  HolidaySetGetAsync,
  HolidaySetUpdateAsync,
} from '@/services/openApi/HolidaySet';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';

const HolidaySetFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, children } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        // 如果是编辑模式，加载数据
        if (entityId) {
          const holidaySet = await HolidaySetGetAsync({ id: entityId });
          // 转换日期格式
          if (holidaySet.items) {
            holidaySet.items = holidaySet.items.map((item: any) => ({
              ...item,
              startDate: item.startDate ? dayjs(item.startDate) : undefined,
              endDate: item.endDate ? dayjs(item.endDate) : undefined,
            }));
          }
          form.setInitialValues(holidaySet);
        }
      });
    },
  };

  const portalId = `holidaySet${entityId || 'new'}`;

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
              // 转换日期格式
              if (values.items) {
                values.items = values.items.map((item: any) => ({
                  ...item,
                  startDate: item.startDate ? dayjs(item.startDate).format('YYYY-MM-DD') : '',
                  endDate: item.endDate ? dayjs(item.endDate).format('YYYY-MM-DD') : '',
                }));
              }
              if (!values.id) {
                return HolidaySetCreateAsync(values).then(() => {
                  if (onAfterSubmit) onAfterSubmit();
                  next(payload);
                });
              } else {
                return HolidaySetUpdateAsync({ id: values.id }, values).then(() => {
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

export default HolidaySetFormDialog;
