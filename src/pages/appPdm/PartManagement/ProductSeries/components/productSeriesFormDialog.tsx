import { ProductSeriesCreateAsync, ProductSeriesUpdateAsync, ProductSeriesGetAsync } from '@/services/pdm/ProductSeries';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, Spin } from 'antd';
import React from 'react';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import ProductSeriesTreeSelect from './ProductSeriesTreeSelect';

const ProductSeriesFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const { schema, formConfig, loading } = useDynamicSchema('productSeries:form');
  const SchemaField = useSchemaField({ ProductSeriesTreeSelect });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ProductSeriesGetAsync({ id: entityId }).then(res => {
            form.setInitialValues(res);
          });
        }
      });
    },
  };

  const portalId = `Pdm.PartManagement.ProductSeries.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
            if (loading) {
              return <Spin tip="加载表单配置中..." />;
            }
            return (
              <FormLayout {...formConfig}>
                <SchemaField schema={schema} />
              </FormLayout>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              if (!values.id) {
                return ProductSeriesCreateAsync(values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return ProductSeriesUpdateAsync({ id: values.id }, values)
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

export default ProductSeriesFormDialog;
