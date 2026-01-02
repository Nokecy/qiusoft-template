import React from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { message, Button, Spin } from 'antd';
import {
  PartCategoryRuleMappingCreateAsync,
  PartCategoryRuleMappingUpdateAsync,
} from '@/services/pdm/PartCategoryRuleMapping';
import PartCategoryTreeSelect from '../../PartCategory/components/PartCategoryTreeSelect';
import RuleDefinitionSelect from './RuleDefinitionSelect';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

interface PartCategoryRuleMappingFormDialogProps {
  title?: string;
  entityId?: string;
  data?: any;
  operationType?: 'edit' | 'add';
  onAfterSubmit?: () => void;
  isView?: boolean;
  buttonProps?: any;
}

const PartCategoryRuleMappingFormDialog: React.FC<PartCategoryRuleMappingFormDialogProps> = (props) => {
  const { title, entityId, data, operationType, onAfterSubmit, isView = false, buttonProps } = props;

  const { schema, formConfig, loading } = useDynamicSchema('partCategoryRuleMapping:form');

  const SchemaField = useSchemaField({
    PartCategoryTreeSelect,
    RuleDefinitionSelect,
  });

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        try {
          if (data) {
            // 数据回显
            form.setInitialValues({
              categoryId: data.categoryId,
              ruleDefinitionId: data.ruleDefinitionId,
              priority: data.priority,
            });

            // 查看模式：设置所有字段为只读
            if (isView) {
              form.setPattern('readPretty');
            }
          }
        } catch (error) {
          message.error('加载数据失败');
          console.error('Failed to load data:', error);
        }
      });
    },
  };

  const portalId = `appPdm.PartCategoryRuleMapping.${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        {...buttonProps}
        onClick={() => {
          const formDialog = FormDialog({ title, width: 600 }, portalId, () => {
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
            .forConfirm(async (payload, next) => {
              if (isView) {
                next(payload);
                return;
              }

              const hide = message.loading('正在提交...', 0);
              try {
                const values = payload.values;

                if (operationType === 'edit') {
                  await PartCategoryRuleMappingUpdateAsync({ id: data.id }, values);
                  message.success('更新成功');
                } else {
                  await PartCategoryRuleMappingCreateAsync(values);
                  message.success('创建成功');
                }

                if (onAfterSubmit) {
                  onAfterSubmit();
                }
                next(payload);
              } catch (error) {
                message.error('操作失败，请重试');
                console.error('Submit failed:', error);
              } finally {
                hide();
              }
            })
            .open(formProps);
        }}
      >
        {buttonProps?.children || buttonProps?.title}
      </Button>
    </FormDialog.Portal>
  );
};

export default PartCategoryRuleMappingFormDialog;
