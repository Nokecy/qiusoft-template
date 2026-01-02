/**
 * 序列号规则数据源配置对话框
 * 支持Array、API、SQL三种数据源类型配置
 */

import React from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useFormSchema, useSchemaField } from 'umi';
import { Button, message, ButtonProps } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import {
  BnrDataSourceConfigGetByRuleNameAsync,
  BnrDataSourceConfigCreateAsync,
  BnrDataSourceConfigUpdateAsync,
} from '@/services/openApi/BnrDataSourceConfig';
import { dataSourceConfigSchema } from './dataSourceConfigSchema';

interface DataSourceConfigDialogProps {
  ruleName: string;
  ruleDisplayName?: string;
  onAfterSubmit?: () => void;
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
}

const DataSourceConfigDialog: React.FC<DataSourceConfigDialogProps> = ({
  ruleName,
  ruleDisplayName,
  onAfterSubmit,
  buttonProps,
  children,
}) => {
  const formId = 'bnrManagement.dataSourceConfig';
  const schema = useFormSchema(formId, dataSourceConfigSchema);
  const SchemaField = useSchemaField({});

  const portalId = `dataSourceConfig-${ruleName}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        icon={<DatabaseOutlined />}
        {...buttonProps}
        onClick={async () => {
          // 检查是否已存在配置
          let existingConfig: any = null;
          let isEditMode = false;

          try {
            existingConfig = await BnrDataSourceConfigGetByRuleNameAsync({
              ruleName,
            });
            isEditMode = !!existingConfig;
          } catch (error) {
            // 配置不存在,创建模式
            isEditMode = false;
          }

          const formProps = {
            effects: () => {
              onFormInit(async (form) => {
                if (isEditMode && existingConfig) {
                  // 编辑模式: 回显数据
                  const initialValues: any = {
                    dataSourceType: existingConfig.dataSourceType,
                    failureMode: existingConfig.failureMode,
                    CacheDuration: existingConfig.cacheDuration ?? 300,
                  };

                  // 根据类型设置对应字段
                  switch (existingConfig.dataSourceType) {
                    case 'array':
                      if (existingConfig.arrayData) {
                        initialValues.ArrayData = existingConfig.arrayData;
                      }
                      break;

                    case 'api':
                      initialValues.Url = existingConfig.url;
                      break;

                    case 'sql':
                      initialValues.ConnectionString = existingConfig.connectionString;
                      initialValues.Query = existingConfig.query;
                      break;
                  }

                  // 属性映射字段
                  if (existingConfig.propertyMapping) {
                    initialValues.PropertyMapping = JSON.stringify(
                      existingConfig.propertyMapping,
                      null,
                      2
                    );
                  }

                  form.setInitialValues(initialValues);
                } else {
                  // 创建模式,设置默认值
                  form.setInitialValues({
                    dataSourceType: 'array',
                    failureMode: 'useDefault',
                    CacheDuration: 300,
                  });
                }
              });
            },
          };

          const formDialog = FormDialog(
            {
              title: `${ruleDisplayName || ruleName} - ${isEditMode ? '编辑' : '配置'}数据源`,
              width: 800,
            },
            portalId,
            () => {
              return (
                <FormLayout {...schema.form}>
                  <SchemaField schema={schema.schema} />
                </FormLayout>
              );
            }
          );

          formDialog
            .forConfirm(async (payload, next) => {
              const values: any = payload.values;

              // 构建请求数据 - 匹配后端DTO
              const requestData: any = {
                RuleName: ruleName,
                DataSourceType: values.dataSourceType,
                FailureMode: values.failureMode || 'useDefault',
                CacheDuration: values.CacheDuration ?? 300,
              };

              // 根据数据源类型设置对应字段
              switch (values.dataSourceType) {
                case 'array':
                  if (!values.ArrayData) {
                    message.error('请输入数组数据');
                    return;
                  }
                  // ArrayData 字段直接传递字符串
                  requestData.ArrayData = values.ArrayData;
                  break;

                case 'api':
                  if (!values.Url) {
                    message.error('请输入API地址');
                    return;
                  }
                  requestData.Url = values.Url;
                  break;

                case 'sql':
                  if (!values.ConnectionString) {
                    message.error('请输入数据库连接字符串');
                    return;
                  }
                  if (!values.Query) {
                    message.error('请输入SQL查询语句');
                    return;
                  }
                  requestData.ConnectionString = values.ConnectionString;
                  requestData.Query = values.Query;
                  break;

                default:
                  message.error('请选择数据源类型');
                  return;
              }

              // 处理属性映射JSON字段
              if (values.PropertyMapping) {
                try {
                  requestData.PropertyMapping = JSON.parse(values.PropertyMapping);
                } catch (e) {
                  message.error('属性映射JSON格式错误');
                  return;
                }
              }

              const hide = message.loading(isEditMode ? '正在更新...' : '正在创建...', 0);

              try {
                if (isEditMode) {
                  // 更新
                  await BnrDataSourceConfigUpdateAsync(
                    { id: existingConfig.id },
                    requestData
                  );
                  message.success('更新成功');
                } else {
                  // 创建
                  await BnrDataSourceConfigCreateAsync(requestData);
                  message.success('创建成功');
                }

                if (onAfterSubmit) {
                  onAfterSubmit();
                }

                next(payload);
              } catch (error: any) {
                message.error(
                  isEditMode
                    ? `更新失败: ${error.message || '未知错误'}`
                    : `创建失败: ${error.message || '未知错误'}`
                );
                console.error('数据源配置失败:', error);
              } finally {
                hide();
              }
            })
            .open(formProps);
        }}
      >
        {children}
      </Button>
    </FormDialog.Portal>
  );
};

export default DataSourceConfigDialog;
