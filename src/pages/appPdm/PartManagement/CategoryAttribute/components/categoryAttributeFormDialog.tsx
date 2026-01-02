import { PartCategoryAttributeCreateAsync, PartCategoryAttributeUpdateAsync } from '@/services/pdm/PartCategoryAttribute';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, Spin } from 'antd';
import React from 'react';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

interface Props {
  entityId?: string;
  title: string;
  buttonProps?: any;
  onAfterSubmit?: () => void;
  categoryId?: string;
  categoryName?: string;
  record?: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto;
}

const CategoryAttributeFormDialog: React.FC<Props> = ({ entityId, title, buttonProps, onAfterSubmit, categoryId, categoryName, record, children }) => {
  const { schema, formConfig, loading } = useDynamicSchema('categoryAttribute:form');
  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (record) {
          // 将 optionsJson 字符串转换为 optionsList 数组
          let optionsList: any[] = [];
          if (record.optionsJson) {
            try {
              optionsList = JSON.parse(record.optionsJson);
            } catch (e) {
              console.error('解析 optionsJson 失败:', e);
            }
          }
          form.setInitialValues({ ...record, optionsList, categoryName });
        } else if (categoryId) {
          form.setInitialValues({ categoryId, categoryName });
        }
      });
    },
  };

  const portalId = `Pdm.PartManagement.CategoryAttribute.${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title, width: 1200 }, portalId, () => {
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

              // 将 optionsList 数组转换为 optionsJson 字符串
              if (values.optionsList && Array.isArray(values.optionsList) && values.optionsList.length > 0) {
                values.optionsJson = JSON.stringify(values.optionsList);
              } else {
                values.optionsJson = null;
              }
              // 删除临时字段
              delete values.optionsList;

              if (!values.categoryId && categoryId) {
                values.categoryId = categoryId;
              }

              if (!values.id) {
                return PartCategoryAttributeCreateAsync(values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => next(payload));
              } else {
                return PartCategoryAttributeUpdateAsync({ id: values.id }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => next(payload));
              }
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

export default CategoryAttributeFormDialog;

