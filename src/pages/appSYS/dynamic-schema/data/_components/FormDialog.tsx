/**
 * 动态数据管理 - 表单对话框组件
 * 支持三层嵌套主从表结构
 */
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, createForm, Form } from '@formily/core';
import { Button, message, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSchemaField } from 'umi';
import {
  DynamicDataGetAsync,
  DynamicDataCreateAsync,
  DynamicDataUpdateAsync,
} from '@/services/openApi/DynamicData';
import { FormilySchemaGetSchemaAsync } from '@/services/openApi/FormilySchema';

interface DataFormDialogProps {
  entityId?: string;
  applicationName: string;
  title: string;
  buttonProps?: Record<string, any>;
  onAfterSubmit?: () => void;
  children?: React.ReactNode;
}

const DataFormDialog: React.FC<DataFormDialogProps> = (props) => {
  const { entityId, applicationName, title, buttonProps, onAfterSubmit, children } = props;
  const [loading, setLoading] = useState(false);
  const [formSchema, setFormSchema] = useState<any>(null);

  const SchemaField = useSchemaField({});

  // 加载 Formily Schema
  useEffect(() => {
    if (applicationName) {
      setLoading(true);
      FormilySchemaGetSchemaAsync({
        applicationName,
        scenarioKey: 'default',
      })
        .then((data) => {
          console.log('[DataFormDialog] API 返回数据:', data);

          // API 直接返回 { form, schema, version, name, displayName } 结构
          if (data?.schema) {
            setFormSchema({
              form: data.form || { labelCol: 6, wrapperCol: 18 },
              schema: data.schema,
            });
            console.log('[DataFormDialog] Schema 加载成功');
          } else {
            console.warn('[DataFormDialog] API 返回的 schema 为空');
          }
        })
        .catch((err) => {
          console.error('[DataFormDialog] 加载表单Schema失败:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [applicationName]);

  const formProps = {
    effects: () => {
      onFormInit((form) => {
        if (entityId) {
          DynamicDataGetAsync({ id: entityId, applicationName }).then((data) => {
            // 将返回的数据设置为表单初始值
            const initialValues: Record<string, any> = {};
            // 主表数据
            if (data.data) {
              Object.assign(initialValues, data.data);
            }
            // 扩展属性
            if (data.extraProperties) {
              Object.assign(initialValues, data.extraProperties);
            }
            // 子表数据
            if (data.children) {
              Object.entries(data.children).forEach(([key, items]) => {
                initialValues[key] = (items as any[])?.map((item: any) => ({
                  ...item.data,
                  ...item.extraProperties,
                }));
              });
            }
            form.setInitialValues(initialValues);
          });
        }
      });
    },
  };

  const portalId = `dynamicData${entityId || 'new'}_${applicationName}`;

  if (loading || !formSchema) {
    return (
      <Button type="primary" {...buttonProps} disabled={loading}>
        {loading ? <Spin size="small" /> : children}
      </Button>
    );
  }

  // 解析Schema的form配置
  const formConfig = formSchema.form || {
    labelCol: 6,
    wrapperCol: 18,
    feedbackLayout: 'none',
  };

  // 获取实际的表单 schema
  const actualSchema = formSchema.schema;

  console.log('[DataFormDialog] formConfig:', formConfig);
  console.log('[DataFormDialog] actualSchema:', actualSchema);

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={() => {
          const formDialog = FormDialog(
            { title, width: 1000, destroyOnClose: true },
            portalId,
            () => (
              <FormLayout {...formConfig}>
                <SchemaField schema={actualSchema} />
              </FormLayout>
            )
          );

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              // 分离主表数据和子表数据
              const mainData: Record<string, any> = {};
              const childrenData: Record<string, any[]> = {};

              Object.entries(values).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                  // 子表数据
                  childrenData[key] = value;
                } else {
                  // 主表数据
                  mainData[key] = value;
                }
              });

              if (!entityId) {
                // 创建
                return DynamicDataCreateAsync(
                  { applicationName },
                  {
                    data: mainData,
                    children: Object.entries(childrenData).reduce(
                      (acc, [key, items]) => {
                        acc[key] = items.map((item) => ({ data: item }));
                        return acc;
                      },
                      {} as Record<string, any[]>
                    ),
                  }
                )
                  .then(() => {
                    message.success('创建成功');
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => next(payload))
                  .catch((error) => {
                    message.error('创建失败: ' + (error.message || '未知错误'));
                    throw error;
                  });
              } else {
                // 更新
                return DynamicDataUpdateAsync(
                  { id: entityId, applicationName },
                  {
                    data: mainData,
                    children: Object.entries(childrenData).reduce(
                      (acc, [key, items]) => {
                        acc[key] = {
                          created: items.filter((item) => !item.id).map((item) => ({ data: item })),
                          updated: items
                            .filter((item) => item.id)
                            .map((item) => ({ id: item.id, data: item })),
                          deleted: [], // 需要追踪删除的项目
                        };
                        return acc;
                      },
                      {} as Record<string, any>
                    ),
                  }
                )
                  .then(() => {
                    message.success('更新成功');
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => next(payload))
                  .catch((error) => {
                    message.error('更新失败: ' + (error.message || '未知错误'));
                    throw error;
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

export default DataFormDialog;
