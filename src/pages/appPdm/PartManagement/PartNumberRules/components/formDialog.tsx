import React from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { message, Button, Spin } from 'antd';
import {
  PdmPartNumberRuleDefinitionCreateAsync,
  PdmPartNumberRuleDefinitionUpdateAsync,
} from '@/services/pdm/PdmPartNumberRuleDefinition';
import { BnrRuleDefinitionGetPropertiesByRuleNameAsync } from '@/services/openApi/BnrRuleDefinition';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

interface PartNumberRuleFormDialogProps {
  title?: string;
  entityId?: string;
  data?: any;
  operationType?: 'edit' | 'add';
  onAfterSubmit?: () => void;
  isView?: boolean;
  buttonProps?: any;
}

const PartNumberRuleFormDialog: React.FC<PartNumberRuleFormDialogProps> = (props) => {
  const { title, entityId, data, operationType, onAfterSubmit, isView = false, buttonProps } = props;

  const { schema, formConfig, loading } = useDynamicSchema('partNumberRules:form');

  // 使用 React.useRef 存储属性选项,确保在组件生命周期内共享
  const propertyOptionsRef = React.useRef<Array<{ label: string; value: string }>>([]);

  const SchemaField = useSchemaField({});

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        try {
          // 调用 BNR API 获取 Pdm.PartNumber 规则可用的属性列表
          const properties = await BnrRuleDefinitionGetPropertiesByRuleNameAsync({
            ruleName: 'Pdm.PartNumber',
          });

          // 转换为下拉选项格式并存储到 ref
          propertyOptionsRef.current = properties.map((prop: any) => ({
            label: prop.displayName,
            value: prop.name,
          }));

          console.log('✅ 属性选项加载完成:', propertyOptionsRef.current);

          // 保存到表单状态,供 schema 使用
          form.setState((state) => {
            state.propertyOptions = propertyOptionsRef.current;
          });

          if (data) {
            // 数据回显：处理 items 中的 content 字段
            // 为每一行自动生成唯一 id，因为后端不传递 id 属性
            const formData = {
              ...data,
              items: data.items?.map((item: any, index: number) => ({
                ...item,
                // 自动生成唯一 _id，使用时间戳+索引确保唯一性（Formily ArrayTable 使用 _id 作为行标识）
                _id: `${Date.now()}-${index}`,
                // 当 type=9(属性) 时，将 content 复制到 contentCopy 用于下拉选择
                contentCopy: item.type === 9 ? item.content : undefined,
              })),
            };

            form.setValues(formData);

            // 查看模式：设置所有字段为只读
            if (isView) {
              form.setPattern('readPretty');
            }

          } else {
            // 新建时设置默认值
            form.setInitialValues({
              active: true,
              isDefault: false,
            });
          }
        } catch (error) {
          message.error('加载数据失败');
          console.error('Failed to load data:', error);
        }
      });
    },
  };

  const portalId = `appPdm.PartNumberRule.${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        {...buttonProps}
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
            .forConfirm(async (payload, next) => {
              if (isView) {
                next(payload);
                return;
              }

              const hide = message.loading('正在提交...', 0);
              try {
                const values = payload.values;

                // 数据转换：处理 items 中的 contentCopy 字段
                const submitData = {
                  ...values,
                  items: values.items?.map((item: any) => ({
                    ...item,
                    // 当 type=9(属性) 时，使用 contentCopy 作为 content 提交
                    content: item.type === 9 ? item.contentCopy : item.content,
                  })),
                };

                if (operationType === 'edit') {
                  await PdmPartNumberRuleDefinitionUpdateAsync({ id: data.id }, submitData);
                  message.success('更新成功');
                } else {
                  await PdmPartNumberRuleDefinitionCreateAsync(submitData);
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

export default PartNumberRuleFormDialog;
