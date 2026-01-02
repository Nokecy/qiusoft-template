/**
 * 数据表单弹窗组件
 * 智能选择表单：优先使用 FormSchema，降级动态生成
 */
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSchemaField } from 'umi';
import {
  DynamicDataGetAsync,
  DynamicDataCreateAsync,
  DynamicDataUpdateAsync,
} from '@/services/openApi/DynamicData';
import { FormilySchemaGetSchemaAsync } from '@/services/openApi/FormilySchema';
import { generateFormilySchema, generateFormConfig } from '../_utils/formGenerator';

interface DataFormDialogProps {
  entityId?: string;
  applicationName: string;
  primaryEntity?: any;
  title: string;
  buttonProps?: Record<string, any>;
  onAfterSubmit?: () => void;
  children?: React.ReactNode;
}

const DataFormDialog: React.FC<DataFormDialogProps> = (props) => {
  const {
    entityId,
    applicationName,
    primaryEntity,
    title,
    buttonProps,
    onAfterSubmit,
    children,
  } = props;
  const [loading, setLoading] = useState(false);
  const [formSchema, setFormSchema] = useState<any>(null);

  const SchemaField = useSchemaField({});

  // 加载表单 Schema
  useEffect(() => {
    if (!applicationName) return;

    setLoading(true);

    // 优先尝试获取已发布的 FormSchema
    FormilySchemaGetSchemaAsync({
      applicationName,
      scenarioKey: 'default',
    })
      .then((data) => {
        if (data?.schema) {
          // 使用设计器表单
          setFormSchema({
            form: data.form || generateFormConfig(),
            schema: data.schema,
          });
        } else {
          // 降级：动态生成表单
          fallbackToGeneratedSchema();
        }
      })
      .catch(() => {
        // 出错时降级到动态生成
        fallbackToGeneratedSchema();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicationName, primaryEntity]);

  // 降级：根据实体字段动态生成表单
  const fallbackToGeneratedSchema = () => {
    if (primaryEntity?.fields && primaryEntity.fields.length > 0) {
      const generatedSchema = generateFormilySchema(primaryEntity.fields);
      setFormSchema({
        form: generateFormConfig(),
        schema: generatedSchema,
      });
    } else {
      // 没有字段定义，使用默认空表单
      setFormSchema({
        form: generateFormConfig(),
        schema: {
          type: 'object',
          properties: {},
        },
      });
    }
  };

  const formProps = {
    effects: () => {
      onFormInit((form) => {
        if (entityId) {
          DynamicDataGetAsync({ id: entityId, applicationName }).then((data) => {
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

  const portalId = `appCenterData${entityId || 'new'}_${applicationName}`;

  if (loading || !formSchema) {
    return (
      <Button type="primary" {...buttonProps} disabled={loading}>
        {loading ? <Spin size="small" /> : children}
      </Button>
    );
  }

  const formConfig = formSchema.form || generateFormConfig();
  const actualSchema = formSchema.schema;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={() => {
          const formDialog = FormDialog(
            { title, width: 800, destroyOnClose: true },
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
                  childrenData[key] = value;
                } else {
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
                          deleted: [],
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
