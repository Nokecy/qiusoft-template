/**
 * 转换参数输入对话框组件
 * 用于在转换打印机语言时输入模板参数
 */

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, DatePicker, Divider, message } from 'antd';
import type { AtlTemplateWithParameters } from '../types';
import type { TemplateParameter } from '../types/parameter';
import dayjs from 'dayjs';

interface ConvertParamsDialogProps {
  open: boolean;
  template: AtlTemplateWithParameters;
  onConfirm: (parameterValues: Record<string, any>) => void;
  onClose: () => void;
}

/**
 * 转换参数输入对话框组件
 */
export const ConvertParamsDialog: React.FC<ConvertParamsDialogProps> = ({
  open,
  template,
  onConfirm,
  onClose
}) => {
  const [form] = Form.useForm();

  // 提取模板参数
  const templateParameters = React.useMemo(() => {
    if (!template.parameters) return [];
    return Object.values(template.parameters) as TemplateParameter[];
  }, [template.parameters]);

  // 是否有参数需要输入
  const hasParameters = templateParameters.length > 0;

  // 初始化表单默认值
  useEffect(() => {
    if (open) {
      const parameterDefaults: Record<string, any> = {};
      templateParameters.forEach(param => {
        if (param.defaultValue !== undefined && param.defaultValue !== null) {
          // 处理日期类型的默认值
          if (param.type === 'Date' && typeof param.defaultValue === 'string') {
            parameterDefaults[`param_${param.name}`] = dayjs(param.defaultValue);
          } else {
            parameterDefaults[`param_${param.name}`] = param.defaultValue;
          }
        }
      });

      form.resetFields();
      form.setFieldsValue(parameterDefaults);
    }
  }, [open, templateParameters, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // 收集参数值
      const parameterValues: Record<string, any> = {};
      templateParameters.forEach(param => {
        const fieldName = `param_${param.name}`;
        if (values[fieldName] !== undefined) {
          let paramValue = values[fieldName];

          // 处理日期类型：转换为ISO字符串
          if (param.type === 'Date' && dayjs.isDayjs(paramValue)) {
            paramValue = paramValue.toISOString();
          }

          parameterValues[param.name] = paramValue;
        }
      });

      console.log('[转换参数] 参数值:', parameterValues);

      // 调用确认回调
      onConfirm(parameterValues);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title="输入模板参数"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      width={500}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
      >
        {/* 提示信息 */}
        {hasParameters && (
          <div style={{ marginBottom: 16, color: '#666' }}>
            请为模板提供参数值以进行转换
          </div>
        )}

        {/* 参数输入区域 */}
        {hasParameters && (
          <>
            <Divider>模板参数</Divider>
            {templateParameters.map(param => {
              const fieldName = `param_${param.name}`;
              const isRequired = param.constraints?.required ?? false;

              // 根据参数类型渲染不同的输入组件
              let inputComponent: React.ReactNode;

              switch (param.type) {
                case 'String':
                  inputComponent = (
                    <Input
                      placeholder={`请输入${param.displayName || param.name}`}
                      maxLength={param.constraints?.maxLength}
                    />
                  );
                  break;

                case 'Number':
                case 'Integer':
                  inputComponent = (
                    <InputNumber
                      placeholder={`请输入${param.displayName || param.name}`}
                      min={param.constraints?.min}
                      max={param.constraints?.max}
                      precision={param.type === 'Integer' ? 0 : undefined}
                      style={{ width: '100%' }}
                    />
                  );
                  break;

                case 'Boolean':
                  inputComponent = (
                    <Switch
                      checkedChildren="是"
                      unCheckedChildren="否"
                    />
                  );
                  break;

                case 'Date':
                  inputComponent = (
                    <DatePicker
                      placeholder={`请选择${param.displayName || param.name}`}
                      format="YYYY-MM-DD"
                      style={{ width: '100%' }}
                    />
                  );
                  break;

                case 'DateTime':
                  inputComponent = (
                    <DatePicker
                      showTime
                      placeholder={`请选择${param.displayName || param.name}`}
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ width: '100%' }}
                    />
                  );
                  break;

                default:
                  inputComponent = (
                    <Input placeholder={`请输入${param.displayName || param.name}`} />
                  );
              }

              return (
                <Form.Item
                  key={param.name}
                  name={fieldName}
                  label={param.displayName || param.name}
                  rules={[
                    {
                      required: isRequired,
                      message: `请输入${param.displayName || param.name}`,
                    },
                  ]}
                  extra={param.description}
                  valuePropName={param.type === 'Boolean' ? 'checked' : 'value'}
                >
                  {inputComponent}
                </Form.Item>
              );
            })}
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ConvertParamsDialog;
