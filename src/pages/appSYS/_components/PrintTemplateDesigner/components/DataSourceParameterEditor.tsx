/**
 * 数据源参数编辑器组件
 * 用于配置数据源的输入参数(名称、类型、必填、默认值、描述)
 */

import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Switch,
  Space,
  Empty,
  Tag,
  Tooltip,
  message,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 参数类型枚举(匹配后端DataSourceParameter.ParameterType)
export enum ParameterType {
  String = 'String',
  Int32 = 'Int32',
  Decimal = 'Decimal',
  Boolean = 'Boolean',
}

// 参数类型显示配置
const PARAMETER_TYPE_OPTIONS = [
  { label: '字符串', value: ParameterType.String, icon: '📝' },
  { label: '整数', value: ParameterType.Int32, icon: '🔢' },
  { label: '小数', value: ParameterType.Decimal, icon: '💰' },
  { label: '布尔值', value: ParameterType.Boolean, icon: '✓' },
];

// 数据源参数接口(匹配后端DataSourceParameter模型)
export interface DataSourceParameter {
  name: string;              // 参数名称
  parameterType: ParameterType;  // 参数类型
  isRequired: boolean;       // 是否必填
  defaultValue?: string;     // 默认值
  description?: string;      // 参数描述
}

export interface DataSourceParameterEditorProps {
  value?: DataSourceParameter[];
  onChange?: (parameters: DataSourceParameter[]) => void;
}

export const DataSourceParameterEditor: React.FC<DataSourceParameterEditorProps> = ({
  value = [],
  onChange,
}) => {
  const [parameters, setParameters] = useState<DataSourceParameter[]>(value);
  const [editingKey, setEditingKey] = useState<string>('');

  // 参数名验证规则
  const validateParameterName = (name: string): { valid: boolean; error?: string } => {
    if (!name.trim()) {
      return { valid: false, error: '参数名不能为空' };
    }

    // 只能包含字母、数字、下划线,且不能以数字开头
    const nameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    if (!nameRegex.test(name)) {
      return { valid: false, error: '参数名只能包含字母、数字、下划线,且不能以数字开头' };
    }

    // 检查重复
    const duplicates = parameters.filter(p => p.name === name).length;
    if (duplicates > 1) {
      return { valid: false, error: '参数名已存在' };
    }

    return { valid: true };
  };

  // 添加参数
  const handleAdd = () => {
    const newParameter: DataSourceParameter = {
      name: `param${parameters.length + 1}`,
      parameterType: ParameterType.String,
      isRequired: false,
      defaultValue: '',
      description: '',
    };

    const newParameters = [...parameters, newParameter];
    setParameters(newParameters);
    onChange?.(newParameters);
    setEditingKey(newParameter.name);
  };

  // 删除参数
  const handleDelete = (name: string) => {
    const newParameters = parameters.filter(p => p.name !== name);
    setParameters(newParameters);
    onChange?.(newParameters);
    message.success('参数已删除');
  };

  // 更新参数字段
  const handleFieldChange = (
    name: string,
    field: keyof DataSourceParameter,
    value: any
  ) => {
    const newParameters = parameters.map(p => {
      if (p.name === name) {
        // 如果是修改参数名,需要验证
        if (field === 'name') {
          const validation = validateParameterName(value);
          if (!validation.valid) {
            message.error(validation.error);
            return p;
          }
        }

        return { ...p, [field]: value };
      }
      return p;
    });

    setParameters(newParameters);
    onChange?.(newParameters);
  };

  // 表格列定义
  const columns: ColumnsType<DataSourceParameter> = [
    {
      title: (
        <Space>
          <span>参数名</span>
          <Tooltip title="只能包含字母、数字、下划线,且不能以数字开头">
            <InfoCircleOutlined style={{ color: '#1890ff', fontSize: 12 }} />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (text: string, record: DataSourceParameter) => (
        <Input
          value={text}
          placeholder="参数名"
          onChange={(e) => handleFieldChange(text, 'name', e.target.value)}
          onBlur={() => {
            const validation = validateParameterName(text);
            if (!validation.valid) {
              message.error(validation.error);
            }
          }}
          style={{
            borderColor: validateParameterName(text).valid ? undefined : '#ff4d4f',
          }}
        />
      ),
    },
    {
      title: '类型',
      dataIndex: 'parameterType',
      key: 'parameterType',
      width: 140,
      render: (type: ParameterType, record: DataSourceParameter) => (
        <Select
          value={type}
          onChange={(value) => handleFieldChange(record.name, 'parameterType', value)}
          style={{ width: '100%' }}
        >
          {PARAMETER_TYPE_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <Space>
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </Space>
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: (
        <Tooltip title="必填参数在使用时必须提供值">
          <Space>
            <span>必填</span>
            <InfoCircleOutlined style={{ color: '#1890ff', fontSize: 12 }} />
          </Space>
        </Tooltip>
      ),
      dataIndex: 'isRequired',
      key: 'isRequired',
      width: 80,
      align: 'center',
      render: (isRequired: boolean, record: DataSourceParameter) => (
        <Switch
          checked={isRequired}
          onChange={(checked) => handleFieldChange(record.name, 'isRequired', checked)}
          checkedChildren="是"
          unCheckedChildren="否"
        />
      ),
    },
    {
      title: (
        <Tooltip title="非必填参数的默认值">
          <Space>
            <span>默认值</span>
            <InfoCircleOutlined style={{ color: '#1890ff', fontSize: 12 }} />
          </Space>
        </Tooltip>
      ),
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      width: 150,
      render: (defaultValue: string, record: DataSourceParameter) => (
        <Input
          value={defaultValue}
          placeholder={record.isRequired ? '必填参数无默认值' : '可选'}
          disabled={record.isRequired}
          onChange={(e) => handleFieldChange(record.name, 'defaultValue', e.target.value)}
        />
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (description: string, record: DataSourceParameter) => (
        <Input.TextArea
          value={description}
          placeholder="参数描述(可选)"
          autoSize={{ minRows: 1, maxRows: 3 }}
          onChange={(e) => handleFieldChange(record.name, 'description', e.target.value)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      align: 'center',
      fixed: 'right',
      render: (_: any, record: DataSourceParameter) => (
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.name)}
          title="删除参数"
        />
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 头部操作栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#262626' }}>
            参数配置
          </span>
          <span style={{ marginLeft: 8, fontSize: 12, color: '#8c8c8c' }}>
            ({parameters.length} 个参数)
          </span>
        </div>
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          添加参数
        </Button>
      </div>

      {/* 参数列表表格 */}
      {parameters.length > 0 ? (
        <Table
          columns={columns}
          dataSource={parameters}
          rowKey="name"
          pagination={false}
          size="small"
          bordered
          scroll={{ x: 'max-content' }}
        />
      ) : (
        <Empty
          description="暂无参数，点击右上角按钮添加"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}

      {/* 参数占位符预览 */}
      {parameters.length > 0 && (
        <div
          style={{
            padding: 16,
            background: '#f5f5f5',
            borderRadius: 6,
            border: '1px solid #d9d9d9',
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#595959' }}>
            参数占位符预览
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {parameters.map((param) => {
              const typeOption = PARAMETER_TYPE_OPTIONS.find(
                opt => opt.value === param.parameterType
              );
              return (
                <Tooltip
                  key={param.name}
                  title={
                    <div>
                      <div>类型: {typeOption?.label}</div>
                      {param.description && <div>描述: {param.description}</div>}
                      {param.isRequired && <div style={{ color: '#ff4d4f' }}>必填参数</div>}
                      {!param.isRequired && param.defaultValue && (
                        <div>默认值: {param.defaultValue}</div>
                      )}
                    </div>
                  }
                >
                  <Tag
                    color={param.isRequired ? 'error' : 'success'}
                    style={{
                      fontSize: 13,
                      padding: '6px 12px',
                      cursor: 'help',
                      fontFamily: '"Courier New", monospace',
                    }}
                  >
                    <Space size={4}>
                      <span>{typeOption?.icon}</span>
                      <span style={{ fontWeight: 600 }}>{`{{${param.name}}}`}</span>
                    </Space>
                  </Tag>
                </Tooltip>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
