/**
 * 测试打印对话框组件 - 模板设计器专用
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Form, Select, InputNumber, message, Input, Switch, DatePicker, Divider } from 'antd';
import { PrinterClientGetPrintersAsync, PrinterClientPrintAsync } from '@/services/openApi/PrinterClient';
import { TemplateConverterConvertAsync } from '@/services/openApi/TemplateConverter';
import { normalizeTemplateElements } from '../utils';
import type { AtlTemplate, PrintTemplateType, AtlTemplateWithParameters } from '../types';
import type { TemplateParameter, ParameterType } from '../types/parameter';
import dayjs from 'dayjs';

interface TestPrintDialogProps {
  open: boolean;
  template: AtlTemplate;
  targetLanguage: PrintTemplateType;
  onClose: () => void;
}

/**
 * 测试打印对话框组件
 * 用于在设计器中测试打印模板
 */
export const TestPrintDialog: React.FC<TestPrintDialogProps> = ({
  open,
  template,
  targetLanguage,
  onClose
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [printers, setPrinters] = useState<any[]>([]);
  const [loadingPrinters, setLoadingPrinters] = useState(false);

  // 提取模板参数
  const templateParameters = useMemo(() => {
    const extTemplate = template as AtlTemplateWithParameters;
    if (!extTemplate.parameters) return [];
    return Object.values(extTemplate.parameters) as TemplateParameter[];
  }, [template]);

  // 是否有参数需要输入
  const hasParameters = templateParameters.length > 0;

  // 加载打印机列表
  useEffect(() => {
    if (open) {
      loadPrinters();
      // 重置表单并设置参数默认值
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
      form.setFieldsValue({
        printQuantity: 1,
        ...parameterDefaults,
      });
    }
  }, [open, templateParameters]);

  const loadPrinters = async () => {
    setLoadingPrinters(true);
    try {
      const result = await PrinterClientGetPrintersAsync({
        PageSize: 100,
        Filter: '',
        MaxResultCount: 100,
        SkipCount: 0,
      });

      console.log('加载打印机结果:', result);

      if (result && result.items) {
        // 检查打印机的在线状态字段
        console.log('打印机列表:', result.items);

        // 显示所有打印机,并标注在线状态
        const allPrinters = result.items.map(p => ({
          ...p,
          // 检查不同的在线状态字段
          online: p.isOnline || p.client?.isOnline || false
        }));

        // 优先显示在线的打印机
        const sortedPrinters = allPrinters.sort((a, b) => {
          if (a.online && !b.online) return -1;
          if (!a.online && b.online) return 1;
          return 0;
        });

        setPrinters(sortedPrinters);

        if (sortedPrinters.length === 0) {
          message.warning('没有可用的打印机');
        }
      }
    } catch (error) {
      message.error('加载打印机列表失败');
      console.error('加载打印机失败:', error);
    } finally {
      setLoadingPrinters(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

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

      console.log('[测试打印] 参数值:', parameterValues);

      // 1. 转换模板为打印机指令
      const hide = message.loading('正在转换模板...', 0);

      try {
        // 使用统一的工具函数规范化 elementType
        const templateCopy = normalizeTemplateElements(template);

        const convertResult = await TemplateConverterConvertAsync({
          template: templateCopy as any,
          targetLanguage: targetLanguage,
          data: parameterValues, // 传递参数值
        });

        hide();

        if (!convertResult || !convertResult.printerCode) {
          message.error('模板转换失败');
          return;
        }

        // 2. 发送打印任务
        const printHide = message.loading('正在发送打印任务...', 0);

        try {
          await PrinterClientPrintAsync(
            { printerId: values.printerId },
            {
              url: convertResult.printerCode,
              isTest: false,
              testPage: true,
              printQuantity: values.printQuantity || 1,
              width: template.canvas.width,
              height: template.canvas.height,
            }
          );

          message.success('测试打印任务已发送');
          onClose();
        } catch (error) {
          message.error('发送打印任务失败');
          console.error('打印失败:', error);
        } finally {
          printHide();
        }
      } catch (error) {
        hide();
        message.error('模板转换失败');
        console.error('转换失败:', error);
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="测试打印"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      width={500}
      okText="打印"
      cancelText="取消"
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          printQuantity: 1,
        }}
      >
        <Form.Item
          name="printerId"
          label="选择打印机"
          rules={[{ required: true, message: '请选择打印机' }]}
        >
          <Select
            placeholder="请选择打印机"
            loading={loadingPrinters}
            options={printers.map(p => ({
              label: `${p.displayName || p.name}${p.online ? ' (在线)' : ' (离线)'}`,
              value: p.id,
              disabled: !p.online,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="printQuantity"
          label="打印数量"
          rules={[{ required: true, message: '请输入打印数量' }]}
        >
          <InputNumber min={1} max={100} style={{ width: '100%' }} />
        </Form.Item>

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

        <Form.Item label="模板信息">
          <div style={{ fontSize: 13, color: '#666' }}>
            <div>模板名称: {template.metadata?.name || '未命名'}</div>
            <div>尺寸: {template.canvas.width}mm × {template.canvas.height}mm</div>
            <div>DPI: {template.canvas.dpi}</div>
            <div>目标语言: {
              targetLanguage === 5 ? 'Report' :
              targetLanguage === 10 ? 'ZPL' :
              targetLanguage === 15 ? 'EPL' :
              targetLanguage === 20 ? 'CPCL' :
              targetLanguage === 25 ? 'TSPL' : '未知'
            }</div>
            {hasParameters && (
              <div style={{ marginTop: 8, color: '#1890ff' }}>
                包含 {templateParameters.length} 个参数
              </div>
            )}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TestPrintDialog;
