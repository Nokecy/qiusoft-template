/**
 * 打印设置模板验证对话框
 * 根据打印功能的动态属性构建业务数据表单,调用智能匹配接口验证模板
 */

import React, { useState } from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useFormSchema, useSchemaField } from 'umi';
import { Button, message, ButtonProps, Table, Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { LabelPrintFeatureDefinitionGetPropertySchemaAsync } from '@/services/openApi/LabelPrintFeatureDefinition';
import { LabelPrintDefinitionMatchTemplateAsync } from '@/services/openApi/LabelPrintDefinition';

interface ValidateTemplateDialogProps {
  printFeatureCode: string;
  printFeatureName?: string;
  labelTypeCode: string;
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
}

const ValidateTemplateDialog: React.FC<ValidateTemplateDialogProps> = ({
  printFeatureCode,
  printFeatureName,
  labelTypeCode,
  buttonProps,
  children,
}) => {
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const [resultsVisible, setResultsVisible] = useState(false);
  const portalId = `validateTemplate-${printFeatureCode}`;

  // 根据动态属性构建表单Schema
  const buildFormSchema = (properties: any[]) => {
    const schemaProperties: any = {};

    properties.forEach((prop) => {
      const fieldConfig: any = {
        type: prop.type === 1 || prop.type === 2 ? 'number' : 'string',
        title: prop.displayName || prop.name,
        'x-decorator': 'FormItem',
        required: prop.required,
      };

      // 根据属性类型设置组件 (0=String, 1=Int, 2=Decimal, 3=Boolean, 4=DateTime, 5=Enum)
      switch (prop.type) {
        case 0: // String
          fieldConfig['x-component'] = 'Input';
          break;
        case 1: // Int
          fieldConfig['x-component'] = 'NumberPicker';
          fieldConfig['x-component-props'] = { precision: 0, style: { width: '100%' } };
          break;
        case 2: // Decimal
          fieldConfig['x-component'] = 'NumberPicker';
          fieldConfig['x-component-props'] = { precision: 2, style: { width: '100%' } };
          break;
        case 3: // Boolean
          fieldConfig['x-component'] = 'Switch';
          fieldConfig.type = 'boolean';
          break;
        case 4: // DateTime
          fieldConfig['x-component'] = 'DatePicker';
          fieldConfig['x-component-props'] = {
            showTime: true,
            style: { width: '100%' }
          };
          break;
        case 5: // Enum
          fieldConfig['x-component'] = 'Select';
          // 枚举值从 enumValues (JSON格式) 中解析
          if (prop.enumValues) {
            try {
              const enumOptions = JSON.parse(prop.enumValues);
              fieldConfig.enum = enumOptions;
            } catch (e) {
              console.error('解析枚举值失败:', e);
            }
          }
          break;
        default:
          fieldConfig['x-component'] = 'Input';
      }

      // 设置默认值 (defaultValue是JSON格式)
      if (prop.defaultValue) {
        try {
          fieldConfig.default = JSON.parse(prop.defaultValue);
        } catch (e) {
          fieldConfig.default = prop.defaultValue;
        }
      }

      // 添加说明
      if (prop.description) {
        fieldConfig['x-decorator-props'] = {
          tooltip: prop.description,
        };
      }

      schemaProperties[prop.name] = fieldConfig;
    });

    return {
      form: {
        labelCol: 6,
        wrapperCol: 16,
        labelAlign: 'left' as const,
      },
      schema: {
        type: 'object',
        properties: schemaProperties,
      },
    };
  };

  const handleValidate = async () => {
    // 检查 labelTypeCode 是否为空
    if (!labelTypeCode) {
      message.error('标签类型编码不能为空，请确认打印设置数据是否完整');
      console.error('ValidateTemplateDialog: labelTypeCode 为空', {
        printFeatureCode,
        printFeatureName,
        labelTypeCode,
      });
      return;
    }

    // 获取属性模式
    const hide = message.loading('正在加载属性定义...', 0);

    try {
      const schema = await LabelPrintFeatureDefinitionGetPropertySchemaAsync({
        feature: printFeatureCode,
      });

      hide();

      if (!schema || !schema.properties || schema.properties.length === 0) {
        message.warning('该打印功能没有定义属性,无法进行验证');
        return;
      }

      // 只保留静态属性（过滤掉动态属性）
      const staticProperties = schema.properties.filter((prop: any) => !prop.isDynamic);

      if (staticProperties.length === 0) {
        message.warning('该打印功能没有定义静态属性,无法进行验证');
        return;
      }

      // 构建动态表单Schema（仅使用静态属性）
      const dynamicSchema = buildFormSchema(staticProperties);

      // 创建临时组件用于FormDialog
      const ValidateForm = () => {
        const SchemaField = useSchemaField({});
        return (
          <FormLayout {...dynamicSchema.form}>
            <SchemaField schema={dynamicSchema.schema} />
          </FormLayout>
        );
      };

      const formDialog = FormDialog(
        {
          title: `${printFeatureName || printFeatureCode} - 验证模板匹配`,
          width: 800,
        },
        portalId,
        () => <ValidateForm />
      );

      formDialog
        .forConfirm(async (payload, next) => {
          const values = payload.values;

          // 构建业务数据对象
          const businessData: Record<string, any> = {};
          Object.keys(values).forEach((key) => {
            if (values[key] !== undefined && values[key] !== null) {
              businessData[key] = values[key];
            }
          });

          const validateHide = message.loading('正在匹配模板...', 0);

          try {
            // 构建 API 调用参数
            const apiParams = {
              printFeature: printFeatureCode,
              labelTypeCode: labelTypeCode,
              businessData: businessData,
            };

            // 调试日志
            console.log('MatchTemplate API 调用参数:', apiParams);

            const results = await LabelPrintDefinitionMatchTemplateAsync(apiParams);

            validateHide();

            if (!results || results.length === 0) {
              message.warning('未找到匹配的打印模板');
            } else {
              message.success(`成功匹配到 ${results.length} 个模板`);
              setMatchResults(results);
              setResultsVisible(true);
            }

            next(payload);
          } catch (error: any) {
            validateHide();
            message.error(`模板匹配失败: ${error.message || '未知错误'}`);
            console.error('模板匹配失败:', error);
          }
        })
        .open({
          effects: () => {
            onFormInit(async (form) => {
              // 设置默认值（仅静态属性）
              const initialValues: any = {};
              staticProperties.forEach((prop) => {
                if (prop.defaultValue) {
                  try {
                    initialValues[prop.name!] = JSON.parse(prop.defaultValue);
                  } catch (e) {
                    initialValues[prop.name!] = prop.defaultValue;
                  }
                }
              });
              form.setInitialValues(initialValues);
            });
          },
        });
    } catch (error: any) {
      hide();
      message.error(`加载属性定义失败: ${error.message || '未知错误'}`);
      console.error('加载属性定义失败:', error);
    }
  };

  // 匹配结果表格列定义
  const resultColumns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      width: 60,
      align: 'center' as const,
      fixed: 'left' as const,
      sorter: (a: any, b: any) => (a.order || 0) - (b.order || 0),
      defaultSortOrder: 'ascend' as const,
    },
    {
      title: '打印模板编码',
      dataIndex: 'labelPrintTemplateId',
      key: 'labelPrintTemplateId',
      width: 280,
      ellipsis: true,
    },
    {
      title: '打印模板名称',
      dataIndex: 'labelPrintTemplateName',
      key: 'labelPrintTemplateName',
      width: 180,
      ellipsis: true,
    },
    {
      title: '标签分类',
      dataIndex: 'labelCategoryName',
      key: 'labelCategoryName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '标签类型',
      dataIndex: 'labelTypeName',
      key: 'labelTypeName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '模板尺寸',
      key: 'size',
      width: 100,
      align: 'center' as const,
      render: (_, record: any) =>
        `${record.labelPrintTemplateWidth || 0}×${record.labelPrintTemplateHeight || 0}`,
    },
    {
      title: '打印份数',
      dataIndex: 'printQuantity',
      key: 'printQuantity',
      width: 90,
      align: 'center' as const,
    },
  ];

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        icon={<CheckCircleOutlined />}
        {...buttonProps}
        onClick={handleValidate}
      >
        {children || '验证模板'}
      </Button>

      {/* 匹配结果对话框 */}
      <Modal
        title={
          <div>
            <span>模板匹配结果</span>
            <span style={{ marginLeft: 16, fontSize: 14, color: '#666', fontWeight: 'normal' }}>
              共匹配到 {matchResults.length} 个打印定义（按排序升序）
            </span>
          </div>
        }
        open={resultsVisible}
        onCancel={() => setResultsVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setResultsVisible(false)}>
            关闭
          </Button>,
        ]}
        width={1200}
        destroyOnClose
      >
        {matchResults.length > 0 ? (
          <Table
            columns={resultColumns}
            dataSource={matchResults}
            rowKey="labelPrintTemplateId"
            pagination={false}
            size="small"
            scroll={{ x: 1050 }}
            bordered
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            未找到匹配的打印模板
          </div>
        )}
      </Modal>
    </FormDialog.Portal>
  );
};

export default ValidateTemplateDialog;
