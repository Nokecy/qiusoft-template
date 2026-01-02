/**
 * 动态属性表单对话框组件
 */

import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';

interface DynamicPropertyFormDialogProps {
  feature: string; // 功能编码
  entityId?: string;
  title: string;
  mode: 'create' | 'edit';
  buttonProps?: any;
  onAfterSubmit?: () => void;
  getRequest?: (params: any) => Promise<any>;
  createRequest?: (data: any) => Promise<any>;
  updateRequest?: (params: any, data: any) => Promise<any>;
  children?: React.ReactNode;
}

const DynamicPropertyFormDialog: React.FC<DynamicPropertyFormDialogProps> = (props) => {
  const {
    feature,
    entityId,
    title,
    mode,
    buttonProps,
    onAfterSubmit,
    getRequest,
    createRequest,
    updateRequest,
  } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField();

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        if (mode === 'edit' && entityId && getRequest) {
          try {
            const data = await getRequest({ id: entityId });

            // 处理enumValues字段,转换为JSON字符串
            if (data.enumValues && typeof data.enumValues === 'object') {
              data.enumValues = JSON.stringify(data.enumValues);
            }

            form.setInitialValues(data);
          } catch (error: any) {
            console.error('加载动态属性失败:', error);
            message.error(error?.message || '加载数据失败');
          }
        } else if (mode === 'create') {
          // 新建模式,设置功能编码
          form.setInitialValues({
            feature,
          });
        }
      });
    },
  };

  const portalId = `labelManagement.dynamicProperty.${entityId || 'create'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={() => {
          const formDialog = FormDialog({ title, width: 800 }, portalId, () => {
            return (
              <FormLayout {...schema.form}>
                <SchemaField schema={schema.schema} />
              </FormLayout>
            );
          });

          formDialog
            .forConfirm(async (payload, next) => {
              try {
                const values: any = payload.values;

                // 处理enumValues字段
                if (values.enumValues) {
                  try {
                    // 验证并解析JSON
                    values.enumValues = JSON.parse(values.enumValues);
                  } catch (e) {
                    message.error('枚举值格式错误,必须是有效的JSON');
                    return;
                  }
                } else if (values.propertyType === 'enum') {
                  message.error('枚举类型必须设置枚举值');
                  return;
                }

                // 处理defaultValue字段,根据类型转换
                if (values.defaultValue !== undefined && values.defaultValue !== null && values.defaultValue !== '') {
                  switch (values.propertyType) {
                    case 'int':
                      values.defaultValue = parseInt(values.defaultValue, 10);
                      if (isNaN(values.defaultValue)) {
                        message.error('整数类型的默认值必须是有效的整数');
                        return;
                      }
                      break;
                    case 'decimal':
                      values.defaultValue = parseFloat(values.defaultValue);
                      if (isNaN(values.defaultValue)) {
                        message.error('小数类型的默认值必须是有效的数字');
                        return;
                      }
                      break;
                    case 'boolean':
                      values.defaultValue = values.defaultValue === 'true' || values.defaultValue === true;
                      break;
                    // dateTime和string保持字符串格式
                  }
                } else {
                  // 空值处理
                  delete values.defaultValue;
                }

                if (mode === 'create') {
                  // 新增
                  if (createRequest) {
                    await createRequest(values);
                    message.success('创建成功');
                  }
                } else {
                  // 更新
                  if (updateRequest) {
                    await updateRequest({ id: values.id }, values);
                    message.success('更新成功');
                  }
                }

                // 刷新列表
                if (onAfterSubmit) onAfterSubmit();

                // 关闭对话框
                return next(payload);
              } catch (error: any) {
                console.error('保存动态属性失败:', error);
                message.error(error?.message || '保存失败');
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

export default DynamicPropertyFormDialog;
