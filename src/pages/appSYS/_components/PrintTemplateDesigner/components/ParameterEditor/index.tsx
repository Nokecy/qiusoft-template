/**
 * ParameterEditor 组件
 *
 * 模板参数列表编辑器,提供参数的增删改查功能
 * - 支持所有参数类型的编辑
 * - 实时验证参数配置
 * - 显示验证错误和警告
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
  Switch,
  InputNumber,
  Tag,
  Tooltip,
  Alert,
  Popconfirm,
  Typography,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { ParameterEditorProps, ParameterTableRow, ParameterFormData, ParameterEditMode } from './types';
import { ParameterType, type TemplateParameter, getDefaultParameterValue } from '../../types/parameter';
import { validateParameter } from '../../utils/validators/parameterValidators';
import './style.less';

const { Text } = Typography;

/**
 * 参数类型选项
 */
const PARAMETER_TYPE_OPTIONS = [
  { label: '字符串', value: ParameterType.String },
  { label: '整数', value: ParameterType.Int },
  { label: '长整数', value: ParameterType.Long },
  { label: '双精度', value: ParameterType.Double },
  { label: '布尔', value: ParameterType.Bool },
  { label: '日期时间', value: ParameterType.DateTime },
  { label: '数组', value: ParameterType.Array },
];

/**
 * 生成约束条件摘要文本
 */
function generateConstraintsSummary(parameter: TemplateParameter): string | undefined {
  const { constraints } = parameter;
  if (!constraints) return undefined;

  const parts: string[] = [];

  // 数值约束
  if (constraints.min !== undefined) parts.push(`最小: ${constraints.min}`);
  if (constraints.max !== undefined) parts.push(`最大: ${constraints.max}`);

  // 字符串约束
  if (constraints.minLength !== undefined) parts.push(`最小长度: ${constraints.minLength}`);
  if (constraints.maxLength !== undefined) parts.push(`最大长度: ${constraints.maxLength}`);
  if (constraints.pattern) parts.push(`匹配: ${constraints.pattern}`);

  // 数组约束
  if (constraints.minItems !== undefined) parts.push(`最小项数: ${constraints.minItems}`);
  if (constraints.maxItems !== undefined) parts.push(`最大项数: ${constraints.maxItems}`);
  if (constraints.itemType) parts.push(`项类型: ${constraints.itemType}`);

  // 枚举约束
  if (constraints.enum && constraints.enum.length > 0) {
    parts.push(`枚举: [${constraints.enum.slice(0, 3).join(', ')}${constraints.enum.length > 3 ? '...' : ''}]`);
  }

  return parts.length > 0 ? parts.join(', ') : undefined;
}

/**
 * 将参数字典转换为表格行数据
 */
function parametersToTableRows(parameters: Record<string, TemplateParameter>): ParameterTableRow[] {
  return Object.entries(parameters).map(([name, param]) => ({
    key: name,
    name: param.name,
    type: param.type,
    required: param.required,
    defaultValue: param.defaultValue,
    constraintsSummary: generateConstraintsSummary(param),
    description: param.description,
    label: param.label,
    rawParameter: param,
  }));
}

/**
 * 将表单数据转换为参数对象
 */
function formDataToParameter(formData: ParameterFormData): TemplateParameter {
  const constraints: any = {};

  // 构建约束条件
  if (formData.min !== undefined) constraints.min = formData.min;
  if (formData.max !== undefined) constraints.max = formData.max;
  if (formData.pattern) constraints.pattern = formData.pattern;
  if (formData.minLength !== undefined) constraints.minLength = formData.minLength;
  if (formData.maxLength !== undefined) constraints.maxLength = formData.maxLength;
  if (formData.minItems !== undefined) constraints.minItems = formData.minItems;
  if (formData.maxItems !== undefined) constraints.maxItems = formData.maxItems;
  if (formData.itemType) constraints.itemType = formData.itemType;
  if (formData.enum && formData.enum.length > 0) constraints.enum = formData.enum;
  if (formData.enumLabels && formData.enumLabels.length > 0) constraints.enumLabels = formData.enumLabels;

  const parameter: any = {
    name: formData.name,
    type: formData.type,
    required: formData.required,
    description: formData.description,
    label: formData.label,
    group: formData.group,
    order: formData.order,
    placeholder: formData.placeholder,
    helpText: formData.helpText,
  };

  // 添加约束条件(如果有)
  if (Object.keys(constraints).length > 0) {
    parameter.constraints = constraints;
  }

  // 添加默认值
  if (formData.defaultValue !== undefined && formData.defaultValue !== null) {
    parameter.defaultValue = formData.defaultValue;
  } else if (formData.required) {
    // 必填参数必须有默认值
    parameter.defaultValue = getDefaultParameterValue(formData.type);
  }

  return parameter;
}

/**
 * 将参数对象转换为表单数据
 */
function parameterToFormData(parameter: TemplateParameter): ParameterFormData {
  const formData: ParameterFormData = {
    name: parameter.name,
    type: parameter.type,
    required: parameter.required,
    defaultValue: parameter.defaultValue,
    description: parameter.description,
    label: parameter.label,
    group: parameter.group,
    order: parameter.order,
    placeholder: parameter.placeholder,
    helpText: parameter.helpText,
  };

  // 提取约束条件
  if (parameter.constraints) {
    const c = parameter.constraints;
    if (c.min !== undefined) formData.min = c.min;
    if (c.max !== undefined) formData.max = c.max;
    if (c.pattern) formData.pattern = c.pattern;
    if (c.minLength !== undefined) formData.minLength = c.minLength;
    if (c.maxLength !== undefined) formData.maxLength = c.maxLength;
    if (c.minItems !== undefined) formData.minItems = c.minItems;
    if (c.maxItems !== undefined) formData.maxItems = c.maxItems;
    if (c.itemType) formData.itemType = c.itemType;
    if (c.enum) formData.enum = c.enum;
    if (c.enumLabels) formData.enumLabels = c.enumLabels;
  }

  return formData;
}

/**
 * ParameterEditor 组件
 */
export const ParameterEditor: React.FC<ParameterEditorProps> = ({
  parameters,
  onAdd,
  onUpdate,
  onRemove,
  readonly = false,
  loading = false,
  className,
  style,
}) => {
  const [form] = Form.useForm<ParameterFormData>();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editMode, setEditMode] = useState<ParameterEditMode>('add');
  const [editingParameterName, setEditingParameterName] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ParameterType>(ParameterType.String);

  // 转换为表格行数据
  const tableData = useMemo(() => parametersToTableRows(parameters), [parameters]);

  // 验证结果缓存
  const validationResults = useMemo(() => {
    const results: Record<string, any> = {};
    Object.entries(parameters).forEach(([name, param]) => {
      results[name] = validateParameter(param);
    });
    return results;
  }, [parameters]);

  /**
   * 打开添加参数模态框
   */
  const handleAdd = useCallback(() => {
    setEditMode('add');
    setEditingParameterName(null);
    setSelectedType(ParameterType.String);
    form.resetFields();
    form.setFieldsValue({
      name: '',
      type: ParameterType.String,
      required: false,
    });
    setEditModalVisible(true);
  }, [form]);

  /**
   * 打开编辑参数模态框
   */
  const handleEdit = useCallback(
    (record: ParameterTableRow) => {
      setEditMode('edit');
      setEditingParameterName(record.name);
      setSelectedType(record.type);
      const formData = parameterToFormData(record.rawParameter);
      form.setFieldsValue(formData);
      setEditModalVisible(true);
    },
    [form]
  );

  /**
   * 删除参数
   */
  const handleDelete = useCallback(
    (name: string) => {
      onRemove?.(name);
      message.success(`参数 "${name}" 已删除`);
    },
    [onRemove]
  );

  /**
   * 保存参数(添加或更新)
   */
  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const parameter = formDataToParameter(values);

      // 验证参数配置
      const validationResult = validateParameter(parameter);
      if (!validationResult.valid) {
        Modal.error({
          title: '参数配置验证失败',
          content: (
            <div>
              {validationResult.errors.map((err, idx) => (
                <div key={idx}>• {err.message}</div>
              ))}
            </div>
          ),
        });
        return;
      }

      if (editMode === 'add') {
        // 检查参数名是否重复
        if (parameters[values.name]) {
          message.error(`参数名 "${values.name}" 已存在`);
          return;
        }
        onAdd?.(parameter);
        message.success(`参数 "${values.name}" 已添加`);
      } else {
        onUpdate?.(editingParameterName!, parameter);
        message.success(`参数 "${values.name}" 已更新`);
      }

      setEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('保存参数失败:', error);
    }
  }, [form, editMode, editingParameterName, parameters, onAdd, onUpdate]);

  /**
   * 参数类型变化处理
   */
  const handleTypeChange = useCallback(
    (type: ParameterType) => {
      setSelectedType(type);
      // 根据类型设置默认值
      const defaultValue = getDefaultParameterValue(type);
      form.setFieldValue('defaultValue', defaultValue);
    },
    [form]
  );

  /**
   * 表格列定义
   */
  const columns: ColumnsType<ParameterTableRow> = useMemo(
    () => [
      {
        title: '参数名',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        render: (name: string) => {
          const validation = validationResults[name];
          const hasError = validation && !validation.valid;
          const hasWarning = validation && validation.warnings && validation.warnings.length > 0;

          return (
            <Space>
              <Text strong code>
                {name}
              </Text>
              {hasError && (
                <Tooltip title={validation.errors.map((e: any) => e.message).join('; ')}>
                  <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                </Tooltip>
              )}
              {hasWarning && (
                <Tooltip title={validation.warnings.map((w: any) => w.message).join('; ')}>
                  <WarningOutlined style={{ color: '#faad14' }} />
                </Tooltip>
              )}
            </Space>
          );
        },
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: (type: ParameterType) => {
          const typeOption = PARAMETER_TYPE_OPTIONS.find((opt) => opt.value === type);
          return <Tag color="blue">{typeOption?.label || type}</Tag>;
        },
      },
      {
        title: '必填',
        dataIndex: 'required',
        key: 'required',
        width: 80,
        align: 'center',
        render: (required: boolean) =>
          required ? (
            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />
          ) : (
            <Text type="secondary">-</Text>
          ),
      },
      {
        title: '默认值',
        dataIndex: 'defaultValue',
        key: 'defaultValue',
        width: 150,
        render: (value: any) => {
          if (value === undefined || value === null) {
            return <Text type="secondary">-</Text>;
          }
          const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
          return (
            <Tooltip title={displayValue}>
              <Text ellipsis style={{ maxWidth: 120, display: 'inline-block' }}>
                {displayValue}
              </Text>
            </Tooltip>
          );
        },
      },
      {
        title: '约束条件',
        dataIndex: 'constraintsSummary',
        key: 'constraints',
        ellipsis: true,
        render: (summary?: string) =>
          summary ? (
            <Tooltip title={summary}>
              <Text type="secondary" ellipsis>
                {summary}
              </Text>
            </Tooltip>
          ) : (
            <Text type="secondary">-</Text>
          ),
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        render: (desc?: string) => (desc ? <Text ellipsis>{desc}</Text> : <Text type="secondary">-</Text>),
      },
      {
        title: '操作',
        key: 'actions',
        width: 120,
        fixed: 'right',
        render: (_, record) => (
          <Space size="small">
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} disabled={readonly}>
              编辑
            </Button>
            <Popconfirm
              title="确定删除此参数吗?"
              description={`参数 "${record.name}" 删除后无法恢复`}
              onConfirm={() => handleDelete(record.name)}
              okText="确定"
              cancelText="取消"
              disabled={readonly}
            >
              <Button type="link" size="small" danger icon={<DeleteOutlined />} disabled={readonly}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [validationResults, readonly, handleEdit, handleDelete]
  );

  /**
   * 渲染约束条件表单项
   */
  const renderConstraintFields = () => {
    switch (selectedType) {
      case ParameterType.Int:
      case ParameterType.Long:
      case ParameterType.Double:
        return (
          <>
            <Form.Item label="最小值" name="min">
              <InputNumber style={{ width: '100%' }} placeholder="不限制" />
            </Form.Item>
            <Form.Item label="最大值" name="max">
              <InputNumber style={{ width: '100%' }} placeholder="不限制" />
            </Form.Item>
          </>
        );

      case ParameterType.String:
        return (
          <>
            <Form.Item label="最小长度" name="minLength">
              <InputNumber min={0} style={{ width: '100%' }} placeholder="不限制" />
            </Form.Item>
            <Form.Item label="最大长度" name="maxLength">
              <InputNumber min={0} style={{ width: '100%' }} placeholder="不限制" />
            </Form.Item>
            <Form.Item label="正则表达式" name="pattern">
              <Input placeholder="例: ^[A-Za-z0-9]+$" />
            </Form.Item>
          </>
        );

      case ParameterType.Array:
        return (
          <>
            <Form.Item label="最小项数" name="minItems">
              <InputNumber min={0} style={{ width: '100%' }} placeholder="不限制" />
            </Form.Item>
            <Form.Item label="最大项数" name="maxItems">
              <InputNumber min={0} style={{ width: '100%' }} placeholder="不限制" />
            </Form.Item>
            <Form.Item label="数组项类型" name="itemType">
              <Select placeholder="选择数组项类型" allowClear>
                {PARAMETER_TYPE_OPTIONS.filter((opt) => opt.value !== ParameterType.Array).map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`parameter-editor ${className || ''}`} style={style}>
      <div className="parameter-editor-header">
        <Space>
          <Typography.Title level={5} style={{ margin: 0 }}>
            模板参数配置
          </Typography.Title>
          <Text type="secondary">({tableData.length} 个参数)</Text>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} disabled={readonly || loading}>
          添加参数
        </Button>
      </div>

      {/* 验证错误提示 */}
      {Object.values(validationResults).some((r) => !r.valid) && (
        <Alert
          type="error"
          message="存在参数配置错误"
          description={
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {Object.entries(validationResults)
                .filter(([_, r]) => !r.valid)
                .flatMap(([name, r]) =>
                  r.errors.map((err: any, idx: number) => (
                    <li key={`${name}-${idx}`}>
                      参数 <Text code>{name}</Text>: {err.message}
                    </li>
                  ))
                )}
            </ul>
          }
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Table<ParameterTableRow>
        columns={columns}
        dataSource={tableData}
        loading={loading}
        pagination={false}
        scroll={{ x: 1000 }}
        size="small"
        locale={{
          emptyText: '暂无参数,点击"添加参数"按钮开始配置',
        }}
      />

      {/* 参数编辑模态框 */}
      <Modal
        title={editMode === 'add' ? '添加参数' : '编辑参数'}
        open={editModalVisible}
        onOk={handleSave}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText="保存"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            label="参数名称"
            name="name"
            rules={[
              { required: true, message: '请输入参数名称' },
              { pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/, message: '参数名称只能包含字母、数字和下划线,且不能以数字开头' },
            ]}
          >
            <Input placeholder="例: userId" disabled={editMode === 'edit'} />
          </Form.Item>

          <Form.Item label="参数类型" name="type" rules={[{ required: true, message: '请选择参数类型' }]}>
            <Select placeholder="选择参数类型" onChange={handleTypeChange}>
              {PARAMETER_TYPE_OPTIONS.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="是否必填" name="required" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>

          <Form.Item label="默认值" name="defaultValue">
            {selectedType === ParameterType.Bool ? (
              <Switch checkedChildren="true" unCheckedChildren="false" />
            ) : selectedType === ParameterType.Int || selectedType === ParameterType.Long || selectedType === ParameterType.Double ? (
              <InputNumber style={{ width: '100%' }} placeholder="请输入默认值" />
            ) : selectedType === ParameterType.Array ? (
              <Input.TextArea placeholder='例: ["item1", "item2"]' rows={3} />
            ) : (
              <Input placeholder="请输入默认值" />
            )}
          </Form.Item>

          <Form.Item label="显示标签" name="label">
            <Input placeholder="用于UI显示的标签" />
          </Form.Item>

          <Form.Item label="参数描述" name="description">
            <Input.TextArea placeholder="参数的详细说明" rows={2} />
          </Form.Item>

          {/* 约束条件 */}
          {renderConstraintFields()}

          <Form.Item label="参数分组" name="group">
            <Input placeholder="用于UI中对参数分组" />
          </Form.Item>

          <Form.Item label="显示顺序" name="order">
            <InputNumber min={0} style={{ width: '100%' }} placeholder="数值越小越靠前" />
          </Form.Item>

          <Form.Item label="提示信息" name="placeholder">
            <Input placeholder="输入框的占位符文本" />
          </Form.Item>

          <Form.Item label="帮助文本" name="helpText">
            <Input.TextArea placeholder="详细的帮助说明" rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParameterEditor;
