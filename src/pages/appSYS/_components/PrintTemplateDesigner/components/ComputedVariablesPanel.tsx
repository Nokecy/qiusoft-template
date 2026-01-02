/**
 * 计算变量编辑器面板
 */

import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Table,
  message,
  Card,
  Tooltip,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

export interface ComputedVariable {
  name: string;
  formula: string;
  description?: string;
}

export interface ComputedVariablesPanelProps {
  computedVariables: Record<string, ComputedVariable>;
  onUpdate: (computedVariables: Record<string, ComputedVariable>) => void;
}

export const ComputedVariablesPanel: React.FC<ComputedVariablesPanelProps> = ({
  computedVariables,
  onUpdate,
}) => {
  const [visible, setVisible] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();

  // 计算变量列表
  const variableList = Object.entries(computedVariables).map(([key, value]) => ({
    key,
    ...value,
  }));

  // 添加/编辑计算变量
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const newComputedVariables = { ...computedVariables };

      if (editingKey && editingKey !== values.name) {
        // 重命名：删除旧键
        delete newComputedVariables[editingKey];
      }

      newComputedVariables[values.name] = {
        name: values.name,
        formula: values.formula,
        description: values.description,
      };

      onUpdate(newComputedVariables);
      setVisible(false);
      setEditingKey(null);
      form.resetFields();
      message.success(editingKey ? '计算变量已更新' : '计算变量已添加');
    });
  };

  // 删除计算变量
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除计算变量"${key}"吗？`,
      onOk: () => {
        const newComputedVariables = { ...computedVariables };
        delete newComputedVariables[key];
        onUpdate(newComputedVariables);
        message.success('计算变量已删除');
      },
    });
  };

  // 编辑计算变量
  const handleEdit = (record: any) => {
    setEditingKey(record.key);
    form.setFieldsValue({
      name: record.name,
      formula: record.formula,
      description: record.description,
    });
    setVisible(true);
  };

  const columns = [
    {
      title: '变量名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: (
        <Space>
          公式
          <Tooltip title="使用Scriban表达式语法，如：{{ quantity * unitPrice }}">
            <InfoCircleOutlined style={{ color: '#1890ff' }} />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'formula',
      key: 'formula',
      ellipsis: true,
      render: (text: string) => (
        <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 3 }}>
          {text}
        </code>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => (
        <Space>
          <Button
            size="small"
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            size="small"
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="计算变量"
      extra={
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingKey(null);
            form.resetFields();
            setVisible(true);
          }}
        >
          添加变量
        </Button>
      }
      style={{ marginBottom: 16 }}
    >
      <Table
        columns={columns}
        dataSource={variableList}
        pagination={false}
        size="small"
      />

      <Modal
        title={editingKey ? '编辑计算变量' : '添加计算变量'}
        open={visible}
        onOk={handleSubmit}
        onCancel={() => {
          setVisible(false);
          setEditingKey(null);
          form.resetFields();
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="变量名"
            name="name"
            rules={[
              { required: true, message: '请输入变量名' },
              { pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/, message: '变量名只能包含字母、数字和下划线，且不能以数字开头' },
            ]}
            help="变量名只能包含字母、数字和下划线，且不能以数字开头"
          >
            <Input placeholder="例如: totalPrice" />
          </Form.Item>

          <Form.Item
            label={
              <Space>
                Scriban公式
                <Tooltip title="支持数学运算、字符串处理、条件判断等，如：{{ quantity * unitPrice }}">
                  <InfoCircleOutlined style={{ color: '#1890ff' }} />
                </Tooltip>
              </Space>
            }
            name="formula"
            rules={[{ required: true, message: '请输入计算公式' }]}
            help={
              <div>
                <div>示例：</div>
                <div>• 数学运算: {"{{ quantity * unitPrice }}"}</div>
                <div>• 字符串处理: {"{{ productCode | string.upcase }}"}</div>
                <div>• 条件判断: {"{{ if quantity > 100 }}批量{{ else }}零售{{ end }}"}</div>
              </div>
            }
          >
            <Input.TextArea
              rows={4}
              placeholder='例如: {{ quantity * unitPrice }}'
            />
          </Form.Item>

          <Form.Item
            label="描述（可选）"
            name="description"
          >
            <Input.TextArea
              rows={2}
              placeholder="描述该变量的用途和计算逻辑"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
