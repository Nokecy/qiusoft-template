/**
 * ParameterMappingEditor 组件
 *
 * 数据源参数映射配置编辑器
 * - 支持从模板参数、其他数据源字段引用
 * - 智能提示可用的参数和字段
 * - 实时验证映射配置
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Tooltip,
  Alert,
  AutoComplete,
  Typography,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type {
  ParameterMappingEditorProps,
  ParameterMappingTableRow,
  ParameterMappingFormData,
  ReferenceSuggestion,
} from './types';
import {
  ParameterReferenceType,
  type ParameterMapping,
  PARAMETER_REFERENCE_SYNTAX,
  isTemplateParameterReference,
  isDataSourceFieldReference,
  isScribanExpression,
  extractParameterName,
  extractDataSourceReference,
} from '../../types/dataSourceParameter';
import './style.less';

const { Text } = Typography;

/**
 * 引用类型选项
 */
const REFERENCE_TYPE_OPTIONS = [
  { label: '模板参数', value: ParameterReferenceType.TemplateParameter },
  { label: '其他数据源', value: ParameterReferenceType.DataSourceField },
  { label: 'Scriban表达式', value: ParameterReferenceType.Expression },
  { label: '静态值', value: ParameterReferenceType.StaticValue },
];

/**
 * 检测引用表达式的类型
 */
function detectReferenceType(expression: string): ParameterReferenceType | null {
  if (!expression) return null;

  if (isTemplateParameterReference(expression)) {
    return ParameterReferenceType.TemplateParameter;
  }

  if (isDataSourceFieldReference(expression)) {
    return ParameterReferenceType.DataSourceField;
  }

  if (isScribanExpression(expression)) {
    return ParameterReferenceType.Expression;
  }

  return ParameterReferenceType.StaticValue;
}

/**
 * 验证引用表达式
 */
function validateReferenceExpression(
  expression: string,
  type: ParameterReferenceType,
  availableParams: string[],
  availableDataSources: Array<{ name: string; fields?: string[] }>
): { valid: boolean; error?: string; warnings?: string[] } {
  const warnings: string[] = [];

  if (!expression) {
    return { valid: false, error: '引用表达式不能为空' };
  }

  switch (type) {
    case ParameterReferenceType.TemplateParameter: {
      const paramName = extractParameterName(expression);
      if (!paramName) {
        return { valid: false, error: '无效的模板参数引用格式,应为 $parameters.xxx' };
      }
      if (!availableParams.includes(paramName)) {
        return { valid: false, error: `模板参数 "${paramName}" 不存在` };
      }
      break;
    }

    case ParameterReferenceType.DataSourceField: {
      const ref = extractDataSourceReference(expression);
      if (!ref) {
        return { valid: false, error: '无效的数据源引用格式,应为 $dataSources.xxx.yyy' };
      }
      const dataSource = availableDataSources.find((ds) => ds.name === ref.dataSourceName);
      if (!dataSource) {
        return { valid: false, error: `数据源 "${ref.dataSourceName}" 不存在` };
      }
      if (dataSource.fields && !dataSource.fields.some((f) => ref.fieldPath.startsWith(f))) {
        warnings.push(`字段路径 "${ref.fieldPath}" 可能不存在于数据源 "${ref.dataSourceName}" 中`);
      }
      break;
    }

    case ParameterReferenceType.Expression: {
      if (!expression.startsWith('{{') || !expression.endsWith('}}')) {
        return { valid: false, error: 'Scriban表达式必须使用 {{...}} 包裹' };
      }
      const content = expression.slice(2, -2).trim();
      if (!content) {
        return { valid: false, error: 'Scriban表达式内容不能为空' };
      }
      warnings.push('Scriban表达式的语法正确性需要在运行时验证');
      break;
    }

    case ParameterReferenceType.StaticValue: {
      // 静态值始终有效
      break;
    }

    default:
      return { valid: false, error: '未知的引用类型' };
  }

  return { valid: true, warnings: warnings.length > 0 ? warnings : undefined };
}

/**
 * 生成引用路径建议
 */
function generateSuggestions(
  referenceType: ParameterReferenceType,
  availableParams: string[],
  availableDataSources: Array<{ name: string; fields?: string[] }>
): ReferenceSuggestion[] {
  const suggestions: ReferenceSuggestion[] = [];

  switch (referenceType) {
    case ParameterReferenceType.TemplateParameter:
      availableParams.forEach((param) => {
        suggestions.push({
          label: `$parameters.${param}`,
          value: `$parameters.${param}`,
          type: ParameterReferenceType.TemplateParameter,
          description: `引用模板参数: ${param}`,
        });
      });
      break;

    case ParameterReferenceType.DataSourceField:
      availableDataSources.forEach((ds) => {
        if (ds.fields && ds.fields.length > 0) {
          ds.fields.forEach((field) => {
            suggestions.push({
              label: `$dataSources.${ds.name}.${field}`,
              value: `$dataSources.${ds.name}.${field}`,
              type: ParameterReferenceType.DataSourceField,
              description: `引用数据源 ${ds.name} 的字段: ${field}`,
            });
          });
        } else {
          suggestions.push({
            label: `$dataSources.${ds.name}.`,
            value: `$dataSources.${ds.name}.`,
            type: ParameterReferenceType.DataSourceField,
            description: `数据源: ${ds.name}`,
          });
        }
      });
      break;

    case ParameterReferenceType.Expression:
      suggestions.push(
        {
          label: '{{ expression }}',
          value: '{{ }}',
          type: ParameterReferenceType.Expression,
          description: 'Scriban表达式',
        },
        {
          label: '{{ $parameters.xxx }}',
          value: '{{ $parameters. }}',
          type: ParameterReferenceType.Expression,
          description: '引用模板参数的表达式',
        },
        {
          label: '{{ $dataSources.xxx.yyy }}',
          value: '{{ $dataSources. }}',
          type: ParameterReferenceType.Expression,
          description: '引用数据源字段的表达式',
        }
      );
      break;

    case ParameterReferenceType.StaticValue:
      suggestions.push(
        { label: '0', value: '0', type: ParameterReferenceType.StaticValue, description: '数值: 0' },
        { label: '""', value: '""', type: ParameterReferenceType.StaticValue, description: '空字符串' },
        { label: 'true', value: 'true', type: ParameterReferenceType.StaticValue, description: '布尔: true' },
        { label: 'false', value: 'false', type: ParameterReferenceType.StaticValue, description: '布尔: false' }
      );
      break;
  }

  return suggestions;
}

/**
 * ParameterMappingEditor 组件
 */
export const ParameterMappingEditor: React.FC<ParameterMappingEditorProps> = ({
  dataSourceId,
  dataSourceParameters,
  parameterMappings,
  availableTemplateParameters,
  availableDataSources,
  onUpdate,
  onRemove,
  readonly = false,
  loading = false,
  className,
  style,
}) => {
  const [form] = Form.useForm<ParameterMappingFormData>();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingParameterName, setEditingParameterName] = useState<string | null>(null);
  const [selectedReferenceType, setSelectedReferenceType] = useState<ParameterReferenceType>(
    ParameterReferenceType.TemplateParameter
  );

  // 生成表格数据
  const tableData: ParameterMappingTableRow[] = useMemo(() => {
    return dataSourceParameters.map((paramName) => {
      const expression = parameterMappings[paramName] || '';
      const refType = detectReferenceType(expression);
      const validation =
        expression && refType
          ? validateReferenceExpression(expression, refType, availableTemplateParameters, availableDataSources)
          : { valid: false };

      return {
        key: paramName,
        parameterName: paramName,
        referenceType: refType,
        referenceExpression: expression,
        valid: validation.valid,
        error: validation.error,
        warnings: validation.warnings,
      };
    });
  }, [dataSourceParameters, parameterMappings, availableTemplateParameters, availableDataSources]);

  // 生成智能提示选项
  const suggestions = useMemo(
    () => generateSuggestions(selectedReferenceType, availableTemplateParameters, availableDataSources),
    [selectedReferenceType, availableTemplateParameters, availableDataSources]
  );

  /**
   * 添加/编辑参数映射
   */
  const handleEdit = useCallback(
    (record: ParameterMappingTableRow) => {
      setEditingParameterName(record.parameterName);
      const refType = record.referenceType || ParameterReferenceType.TemplateParameter;
      setSelectedReferenceType(refType);
      form.setFieldsValue({
        parameterName: record.parameterName,
        referenceType: refType,
        referenceExpression: record.referenceExpression,
      });
      setEditModalVisible(true);
    },
    [form]
  );

  /**
   * 删除参数映射
   */
  const handleDelete = useCallback(
    (paramName: string) => {
      onRemove?.(paramName);
      message.success(`参数映射 "${paramName}" 已删除`);
    },
    [onRemove]
  );

  /**
   * 保存参数映射
   */
  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields();

      // 验证引用表达式
      const validation = validateReferenceExpression(
        values.referenceExpression,
        values.referenceType,
        availableTemplateParameters,
        availableDataSources
      );

      if (!validation.valid) {
        Modal.error({
          title: '参数映射验证失败',
          content: validation.error,
        });
        return;
      }

      const mapping: ParameterMapping = {
        sourceParameterName: values.parameterName,
        referenceExpression: values.referenceExpression,
        referenceType: values.referenceType,
        description: values.description,
        fallbackValue: values.fallbackValue,
        enabled: true,
      };

      onUpdate?.(values.parameterName, mapping);
      message.success(`参数映射 "${values.parameterName}" 已保存`);

      setEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('保存参数映射失败:', error);
    }
  }, [form, availableTemplateParameters, availableDataSources, onUpdate]);

  /**
   * 引用类型变化处理
   */
  const handleReferenceTypeChange = useCallback(
    (type: ParameterReferenceType) => {
      setSelectedReferenceType(type);
      // 根据类型设置默认表达式
      let defaultExpression = '';
      switch (type) {
        case ParameterReferenceType.TemplateParameter:
          defaultExpression = '$parameters.';
          break;
        case ParameterReferenceType.DataSourceField:
          defaultExpression = '$dataSources.';
          break;
        case ParameterReferenceType.Expression:
          defaultExpression = '{{ }}';
          break;
        case ParameterReferenceType.StaticValue:
          defaultExpression = '';
          break;
      }
      form.setFieldValue('referenceExpression', defaultExpression);
    },
    [form]
  );

  /**
   * 表格列定义
   */
  const columns: ColumnsType<ParameterMappingTableRow> = useMemo(
    () => [
      {
        title: '参数名',
        dataIndex: 'parameterName',
        key: 'parameterName',
        width: 150,
        render: (name: string) => (
          <Text strong code>
            {name}
          </Text>
        ),
      },
      {
        title: '引用类型',
        dataIndex: 'referenceType',
        key: 'referenceType',
        width: 120,
        render: (type: ParameterReferenceType | null) => {
          if (!type) return <Text type="secondary">未配置</Text>;
          const typeOption = REFERENCE_TYPE_OPTIONS.find((opt) => opt.value === type);
          const colorMap = {
            [ParameterReferenceType.TemplateParameter]: 'blue',
            [ParameterReferenceType.DataSourceField]: 'green',
            [ParameterReferenceType.Expression]: 'orange',
            [ParameterReferenceType.StaticValue]: 'default',
          };
          return <Tag color={colorMap[type]}>{typeOption?.label || type}</Tag>;
        },
      },
      {
        title: '引用路径',
        dataIndex: 'referenceExpression',
        key: 'referenceExpression',
        ellipsis: true,
        render: (expr: string, record) => {
          if (!expr) {
            return <Text type="secondary">未配置</Text>;
          }

          const icon = record.valid ? (
            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} />
          ) : (
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />
          );

          const content = (
            <Space>
              {icon}
              <Text code ellipsis style={{ maxWidth: 300 }}>
                {expr}
              </Text>
            </Space>
          );

          if (record.error || (record.warnings && record.warnings.length > 0)) {
            const title = (
              <div>
                {record.error && <div style={{ color: '#ff4d4f' }}>错误: {record.error}</div>}
                {record.warnings?.map((w, idx) => (
                  <div key={idx} style={{ color: '#faad14' }}>
                    警告: {w}
                  </div>
                ))}
              </div>
            );
            return <Tooltip title={title}>{content}</Tooltip>;
          }

          return content;
        },
      },
      {
        title: '操作',
        key: 'actions',
        width: 120,
        fixed: 'right',
        render: (_, record) => (
          <Space size="small">
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} disabled={readonly}>
              {record.referenceExpression ? '编辑' : '配置'}
            </Button>
            {record.referenceExpression && (
              <Button
                type="link"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.parameterName)}
                disabled={readonly}
              >
                删除
              </Button>
            )}
          </Space>
        ),
      },
    ],
    [readonly, handleEdit, handleDelete]
  );

  // 统计信息
  const stats = useMemo(() => {
    const total = dataSourceParameters.length;
    const configured = tableData.filter((row) => row.referenceExpression).length;
    const valid = tableData.filter((row) => row.valid).length;
    const invalid = tableData.filter((row) => row.referenceExpression && !row.valid).length;
    return { total, configured, valid, invalid };
  }, [dataSourceParameters, tableData]);

  return (
    <div className={`parameter-mapping-editor ${className || ''}`} style={style}>
      <div className="parameter-mapping-editor-header">
        <Space>
          <Typography.Title level={5} style={{ margin: 0 }}>
            数据源参数映射 - {dataSourceId}
          </Typography.Title>
          <Text type="secondary">
            ({stats.configured}/{stats.total} 已配置
            {stats.invalid > 0 && <Text type="danger"> | {stats.invalid} 错误</Text>})
          </Text>
        </Space>
      </div>

      {/* 验证错误提示 */}
      {stats.invalid > 0 && (
        <Alert
          type="error"
          message="存在参数映射错误"
          description={
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {tableData
                .filter((row) => !row.valid && row.error)
                .map((row) => (
                  <li key={row.key}>
                    参数 <Text code>{row.parameterName}</Text>: {row.error}
                  </li>
                ))}
            </ul>
          }
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Table<ParameterMappingTableRow>
        columns={columns}
        dataSource={tableData}
        loading={loading}
        pagination={false}
        scroll={{ x: 800 }}
        size="small"
        locale={{
          emptyText: '此数据源没有参数需要配置',
        }}
      />

      {/* 参数映射编辑模态框 */}
      <Modal
        title={`配置参数映射 - ${editingParameterName}`}
        open={editModalVisible}
        onOk={handleSave}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        width={700}
        okText="保存"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="参数名称" name="parameterName">
            <Input disabled />
          </Form.Item>

          <Form.Item label="引用类型" name="referenceType" rules={[{ required: true, message: '请选择引用类型' }]}>
            <Select placeholder="选择引用类型" onChange={handleReferenceTypeChange}>
              {REFERENCE_TYPE_OPTIONS.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="引用路径"
            name="referenceExpression"
            rules={[{ required: true, message: '请输入引用表达式' }]}
            tooltip={
              <div>
                <div>• 模板参数: $parameters.xxx</div>
                <div>• 数据源字段: $dataSources.xxx.yyy</div>
                <div>• Scriban表达式: {'{{ expression }}'}</div>
                <div>• 静态值: 直接输入值</div>
              </div>
            }
          >
            <AutoComplete
              placeholder="输入或选择引用路径"
              options={suggestions.map((s) => ({
                label: s.label,
                value: s.value,
              }))}
              filterOption={(inputValue, option) =>
                option?.label?.toString().toLowerCase().includes(inputValue.toLowerCase()) || false
              }
            />
          </Form.Item>

          <Form.Item label="映射说明" name="description">
            <Input.TextArea placeholder="简要说明此映射的用途" rows={2} />
          </Form.Item>

          <Form.Item label="默认值(失败时)" name="fallbackValue">
            <Input placeholder="当引用失败时使用的默认值" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParameterMappingEditor;
