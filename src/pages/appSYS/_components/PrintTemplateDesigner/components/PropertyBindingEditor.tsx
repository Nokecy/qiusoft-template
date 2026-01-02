/**
 * PropertyBindingEditor - 属性绑定编辑器组件（增强版）
 * 支持三种绑定模式：Static（静态值）、DataPath（数据路径）、Expression（表达式）
 * 包含实时验证、智能提示、预览等功能
 */

import React, { useMemo, useState } from 'react';
import {
  Input,
  InputNumber,
  Switch,
  Space,
  Typography,
  AutoComplete,
  Select,
  Card,
  Alert,
  Form,
  Tooltip,
  Button,
  Collapse,
  Divider,
} from 'antd';
import { InfoCircleOutlined, FunctionOutlined, EyeOutlined } from '@ant-design/icons';
import { BindingMode, PropertyBinding } from '../types';
import { validatePropertyBinding, type BindingValidationResult } from '../utils/bindingValidator';

const { TextArea } = Input;
const { Text } = Typography;

/**
 * PropertyBindingEditor组件属性
 */
export interface PropertyBindingEditorProps {
  /** 绑定值 */
  value?: PropertyBinding;
  /** 值变化回调 */
  onChange?: (value: PropertyBinding) => void;
  /** 值类型（用于Static模式显示对应的输入组件） */
  valueType?: 'string' | 'number' | 'boolean';
  /** 数据源对象（用于DataPath模式的自动完成提示） */
  dataSources?: Record<string, any>;
  /** 是否显示格式化输入 */
  showFormat?: boolean;
  /** 是否显示回退值配置 */
  showFallback?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示预览 */
  showPreview?: boolean;
  /** 示例数据（用于预览） */
  sampleData?: Record<string, any>;
}

/**
 * 数据路径选项接口（增强版）
 */
interface DataPathOption {
  value: string;
  label: string;
  type: string;
  description?: string;
}

/**
 * 从数据源对象中提取所有可用的数据路径（增强版）
 */
const extractDataPaths = (
  obj: any,
  prefix = '',
  maxDepth = 5,
  currentDepth = 0
): DataPathOption[] => {
  if (!obj || typeof obj !== 'object' || currentDepth >= maxDepth) {
    return [];
  }

  const paths: DataPathOption[] = [];

  Object.keys(obj).forEach((key) => {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    const valueType = Array.isArray(value) ? 'array' : typeof value;

    paths.push({
      value: fullPath,
      label: fullPath,
      type: valueType,
      description: `类型: ${valueType}`,
    });

    // 递归提取嵌套对象的路径
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      paths.push(...extractDataPaths(value, fullPath, maxDepth, currentDepth + 1));
    }
  });

  return paths;
};

/**
 * 常用函数列表 - 按分类组织
 */
const COMMON_FUNCTIONS = {
  字符串函数: [
    { value: 'upper(', label: 'upper(text)', description: '转换为大写' },
    { value: 'lower(', label: 'lower(text)', description: '转换为小写' },
    { value: 'trim(', label: 'trim(text)', description: '去除首尾空格' },
    { value: 'substring(', label: 'substring(text, start, length)', description: '截取子字符串' },
    { value: 'replace(', label: 'replace(text, old, new)', description: '替换字符串' },
    { value: 'concat(', label: 'concat(text1, text2, ...)', description: '拼接字符串' },
    { value: 'length(', label: 'length(text)', description: '获取长度' },
  ],
  条件与逻辑: [
    { value: 'if(', label: 'if(condition, trueValue, falseValue)', description: '条件判断' },
    { value: 'and(', label: 'and(condition1, condition2, ...)', description: '逻辑与' },
    { value: 'or(', label: 'or(condition1, condition2, ...)', description: '逻辑或' },
    { value: 'not(', label: 'not(condition)', description: '逻辑非' },
  ],
  日期时间: [
    { value: 'now()', label: 'now()', description: '获取当前时间' },
    { value: 'format(', label: 'format(value, format)', description: '格式化数值/日期' },
    { value: 'year(', label: 'year(date)', description: '获取年份' },
    { value: 'month(', label: 'month(date)', description: '获取月份' },
    { value: 'day(', label: 'day(date)', description: '获取日期' },
  ],
  数学运算: [
    { value: 'round(', label: 'round(number, decimals)', description: '四舍五入' },
    { value: 'ceil(', label: 'ceil(number)', description: '向上取整' },
    { value: 'floor(', label: 'floor(number)', description: '向下取整' },
    { value: 'abs(', label: 'abs(number)', description: '绝对值' },
    { value: 'sum(', label: 'sum(num1, num2, ...)', description: '求和' },
  ],
};

/**
 * 格式化模板
 */
const FORMAT_TEMPLATES = [
  { label: '货币格式', value: '¥{0:F2}' },
  { label: '百分比', value: '{0:P2}' },
  { label: '日期(年月日)', value: '{0:yyyy-MM-dd}' },
  { label: '日期时间', value: '{0:yyyy-MM-dd HH:mm:ss}' },
  { label: '时间', value: '{0:HH:mm:ss}' },
  { label: '两位小数', value: '{0:F2}' },
  { label: '千分位', value: '{0:N0}' },
];

/**
 * 预览表达式结果
 */
const previewExpressionResult = (expression: string, data: any): string => {
  try {
    // 简单的预览实现（实际应该调用后端API）
    if (!expression || !data) {
      return '无法预览：缺少表达式或数据';
    }

    // 这里只是一个示例，实际应该使用真实的表达式引擎
    let preview = expression;

    // 替换简单的数据路径引用
    const dataPathPattern = /\b([a-zA-Z_][\w.]*)\b/g;
    preview = preview.replace(dataPathPattern, (match) => {
      const value = getValueByPath(match, data);
      return value !== undefined ? String(value) : match;
    });

    return preview;
  } catch (error) {
    return `预览错误: ${(error as Error).message}`;
  }
};

/**
 * 根据路径获取数据值
 */
const getValueByPath = (path: string, data: any): any => {
  const parts = path.split('.');
  let current = data;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current;
};

/**
 * PropertyBindingEditor组件
 */
export const PropertyBindingEditor: React.FC<PropertyBindingEditorProps> = ({
  value,
  onChange,
  valueType = 'string',
  dataSources,
  showFormat = true,
  showFallback = true,
  disabled = false,
  showPreview = true,
  sampleData,
}) => {
  const [showFunctionHelper, setShowFunctionHelper] = useState(false);

  // 提取数据路径选项（增强版）
  const dataPathOptions = useMemo(() => {
    if (!dataSources) return [];
    return extractDataPaths(dataSources);
  }, [dataSources]);

  // 验证当前绑定
  const validationResult: BindingValidationResult | null = useMemo(() => {
    if (!value) return null;
    return validatePropertyBinding(value, valueType);
  }, [value, valueType]);

  // 当前绑定模式
  const mode = value?.mode ?? BindingMode.Static;

  /**
   * 模式变化处理
   */
  const handleModeChange = (newMode: BindingMode) => {
    const newValue: PropertyBinding = {
      mode: newMode,
      staticValue: newMode === BindingMode.Static ? (valueType === 'boolean' ? false : '') : undefined,
      dataPath: newMode === BindingMode.DataPath ? '' : undefined,
      expression: newMode === BindingMode.Expression ? '' : undefined,
      format: value?.format,
      fallbackValue: value?.fallbackValue,
      description: value?.description,
    };
    onChange?.(newValue);
  };

  /**
   * 静态值变化处理
   */
  const handleStaticValueChange = (newStaticValue: any) => {
    onChange?.({
      mode: BindingMode.Static,
      staticValue: newStaticValue,
      dataPath: value?.dataPath,
      expression: value?.expression,
      format: value?.format,
      fallbackValue: value?.fallbackValue,
      description: value?.description,
    });
  };

  /**
   * 数据路径变化处理
   */
  const handleDataPathChange = (newDataPath: string) => {
    onChange?.({
      ...value!,
      dataPath: newDataPath,
    });
  };

  /**
   * 表达式变化处理
   */
  const handleExpressionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.({
      ...value!,
      expression: e.target.value,
    });
  };

  /**
   * 格式化字符串变化处理
   */
  const handleFormatChange = (newFormat: string) => {
    onChange?.({
      ...value!,
      format: newFormat || undefined,
    });
  };

  /**
   * 回退值变化处理
   */
  const handleFallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({
      ...value!,
      fallbackValue: e.target.value || undefined,
    });
  };

  /**
   * 插入函数到表达式
   */
  const handleInsertFunction = (funcValue: string) => {
    const currentExpr = value?.expression || '';
    onChange?.({
      ...value!,
      expression: currentExpr + funcValue,
    });
  };

  /**
   * 渲染静态值输入组件
   */
  const renderStaticValueInput = () => {
    switch (valueType) {
      case 'number':
        return (
          <InputNumber
            value={value?.staticValue as number}
            onChange={handleStaticValueChange}
            disabled={disabled}
            style={{ width: '100%' }}
            placeholder="请输入数字"
          />
        );
      case 'boolean':
        return (
          <Switch
            checked={value?.staticValue as boolean}
            onChange={handleStaticValueChange}
            disabled={disabled}
          />
        );
      case 'string':
      default:
        return (
          <Input
            value={value?.staticValue as string}
            onChange={(e) => handleStaticValueChange(e.target.value)}
            disabled={disabled}
            placeholder="请输入静态值"
          />
        );
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      {/* 绑定模式选择 */}
      <Form.Item label="绑定模式">
        <Select
          value={mode}
          onChange={handleModeChange}
          disabled={disabled}
          style={{ width: '100%' }}
          options={[
            { value: BindingMode.Static, label: '静态值' },
            { value: BindingMode.DataPath, label: '数据路径' },
            { value: BindingMode.Expression, label: '表达式' },
          ]}
        />
      </Form.Item>

      {/* 根据模式显示不同的输入组件 */}
      {mode === BindingMode.Static && (
        <Form.Item
          label="静态值"
          validateStatus={validationResult?.isValid ? 'success' : 'error'}
          help={
            validationResult && !validationResult.isValid
              ? validationResult.errors[0]
              : validationResult?.warnings[0]
          }
        >
          {renderStaticValueInput()}
        </Form.Item>
      )}

      {mode === BindingMode.DataPath && (
        <Form.Item
          label="数据路径"
          validateStatus={validationResult?.isValid ? 'success' : 'error'}
          help={
            validationResult && !validationResult.isValid
              ? validationResult.errors[0]
              : validationResult?.warnings[0]
          }
        >
          <AutoComplete
            value={value?.dataPath}
            onChange={handleDataPathChange}
            options={dataPathOptions.map((opt) => ({
              value: opt.value,
              label: (
                <Space>
                  <Text>{opt.label}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    ({opt.type})
                  </Text>
                </Space>
              ),
            }))}
            disabled={disabled}
            placeholder="例如：order.customerName 或 product.code"
            style={{ width: '100%' }}
          />
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
            <InfoCircleOutlined /> 使用点号分隔的路径访问嵌套数据，例如：order.customer.name
          </Text>
        </Form.Item>
      )}

      {mode === BindingMode.Expression && (
        <>
          <Form.Item
            label={
              <Space>
                <span>表达式</span>
                <Tooltip title="查看可用函数">
                  <Button
                    type="link"
                    size="small"
                    icon={<FunctionOutlined />}
                    onClick={() => setShowFunctionHelper(!showFunctionHelper)}
                  >
                    函数帮助
                  </Button>
                </Tooltip>
              </Space>
            }
            validateStatus={validationResult?.isValid ? 'success' : 'error'}
            help={
              validationResult && !validationResult.isValid
                ? validationResult.errors[0]
                : validationResult?.warnings[0]
            }
          >
            <TextArea
              value={value?.expression}
              onChange={handleExpressionChange}
              disabled={disabled}
              placeholder="例如：upper(customer.name) 或 if(quantity > 10, '批量', '零售')"
              rows={4}
            />
            <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
              <InfoCircleOutlined /> 支持函数调用和条件判断
            </Text>
          </Form.Item>

          {/* 函数帮助器 */}
          {showFunctionHelper && (
            <Card
              size="small"
              title="常用函数"
              extra={
                <Button
                  type="link"
                  size="small"
                  onClick={() => setShowFunctionHelper(false)}
                >
                  收起
                </Button>
              }
              style={{ marginBottom: 8 }}
            >
              <Collapse
                bordered={false}
                defaultActiveKey={Object.keys(COMMON_FUNCTIONS)}
                style={{ background: 'transparent' }}
                items={Object.entries(COMMON_FUNCTIONS).map(([category, functions]) => ({
                  key: category,
                  label: (
                    <Text strong>
                      {category} ({functions.length})
                    </Text>
                  ),
                  children: (
                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                      {functions.map((func) => (
                        <Button
                          key={func.value}
                          size="small"
                          onClick={() => handleInsertFunction(func.value)}
                          disabled={disabled}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            height: 'auto',
                            padding: '8px 12px',
                            background: '#fafafa',
                          }}
                        >
                          <Space direction="vertical" size={0} style={{ width: '100%' }}>
                            <Text strong style={{ fontSize: 13 }}>{func.label}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {func.description}
                            </Text>
                          </Space>
                        </Button>
                      ))}
                    </Space>
                  ),
                }))}
              />
            </Card>
          )}

          {/* 表达式预览 */}
          {showPreview && value?.expression && sampleData && (
            <Card
              size="small"
              title={
                <Space>
                  <EyeOutlined />
                  <span>预览</span>
                </Space>
              }
            >
              <Alert
                message="表达式预览"
                description={
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {previewExpressionResult(value.expression, sampleData)}
                  </pre>
                }
                type="info"
              />
              <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
                注意: 这是基于示例数据的预览，实际结果可能不同
              </Text>
            </Card>
          )}
        </>
      )}

      {/* 格式化字符串（可选） */}
      {showFormat && mode !== BindingMode.Static && (
        <Form.Item
          label={
            <span>
              格式化 <Text type="secondary">(可选)</Text>
            </span>
          }
        >
          <Space.Compact style={{ width: '100%' }}>
            <Input
              value={value?.format}
              onChange={(e) => handleFormatChange(e.target.value)}
              disabled={disabled}
              placeholder="例如：yyyy-MM-dd 或 {0:F2}"
              style={{ flex: 1 }}
            />
            <Select
              style={{ width: 140 }}
              placeholder="快捷模板"
              onChange={handleFormatChange}
              disabled={disabled}
              options={FORMAT_TEMPLATES}
            />
          </Space.Compact>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
            <InfoCircleOutlined /> 用于格式化数字、日期等
          </Text>
        </Form.Item>
      )}

      {/* 回退值（可选） */}
      {showFallback && mode !== BindingMode.Static && (
        <Form.Item
          label={
            <span>
              回退值 <Text type="secondary">(可选)</Text>
            </span>
          }
        >
          <Input
            value={value?.fallbackValue}
            onChange={handleFallbackChange}
            disabled={disabled}
            placeholder="当绑定失败时使用的默认值"
          />
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
            <InfoCircleOutlined /> 当数据路径不存在或表达式执行失败时，将使用此回退值
          </Text>
        </Form.Item>
      )}

      {/* 验证结果摘要 */}
      {validationResult && (validationResult.errors.length > 0 || validationResult.warnings.length > 0) && (
        <Alert
          type={validationResult.isValid ? 'warning' : 'error'}
          message={validationResult.isValid ? '存在警告' : '验证失败'}
          description={
            <Space direction="vertical" size="small">
              {validationResult.errors.map((error, index) => (
                <Text key={`error-${index}`} type="danger">
                  • {error}
                </Text>
              ))}
              {validationResult.warnings.map((warning, index) => (
                <Text key={`warning-${index}`} type="warning">
                  • {warning}
                </Text>
              ))}
            </Space>
          }
          showIcon
        />
      )}
    </Space>
  );
};

export default PropertyBindingEditor;
