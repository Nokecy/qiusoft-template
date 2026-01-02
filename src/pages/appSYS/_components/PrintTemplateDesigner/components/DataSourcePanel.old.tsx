/**
 * 数据源配置面板
 */

import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Table,
  message,
  Tabs,
  Card,
} from 'antd';
import { PlusOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { DataSourceType, AtlDataSource } from '../types';
import { TemplateConverterTestDataSourceAsync } from '@/services/openApi/TemplateConverter';

export interface DataSourcePanelProps {
  dataSources: Record<string, AtlDataSource>;
  onUpdate: (dataSources: Record<string, AtlDataSource>) => void;
}

export const DataSourcePanel: React.FC<DataSourcePanelProps> = ({
  dataSources,
  onUpdate,
}) => {
  const [visible, setVisible] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();

  // 数据源列表
  const dataSourceList = Object.entries(dataSources).map(([dsKey, value]) => ({
    displayKey: dsKey, // 用于表格的key
    ...value,
  }));

  // 添加/编辑数据源
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const newDataSources = { ...dataSources };

      if (editingKey && editingKey !== values.key) {
        // 重命名：删除旧键
        delete newDataSources[editingKey];
      }

      // 处理配置对象：对于数组类型，需要解析 data 字段
      let configObject = { ...values.config };

      if (values.type === DataSourceType.Array && typeof configObject.data === 'string') {
        try {
          // 将字符串形式的JSON数组解析为真正的数组对象
          configObject.data = JSON.parse(configObject.data);
        } catch (e) {
          message.error('数组数据格式错误，请检查JSON格式');
          return;
        }
      }

      // 将配置对象序列化为JSON字符串
      const configJson = JSON.stringify(configObject);

      newDataSources[values.key] = {
        key: values.key,
        type: values.type,
        configJson: configJson,
        parameters: values.parameters || [],
      };

      onUpdate(newDataSources);
      setVisible(false);
      setEditingKey(null);
      form.resetFields();
      message.success(editingKey ? '数据源已更新' : '数据源已添加');
    });
  };

  // 删除数据源
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除数据源"${key}"吗？`,
      onOk: () => {
        const newDataSources = { ...dataSources };
        delete newDataSources[key];
        onUpdate(newDataSources);
        message.success('数据源已删除');
      },
    });
  };

  // 编辑数据源
  const handleEdit = (record: any) => {
    setEditingKey(record.displayKey);

    // 解析配置JSON字符串
    let config: any = {};
    try {
      config = JSON.parse(record.configJson || '{}');

      // 对于数组类型，将 data 数组转换为 JSON 字符串以便在 TextArea 中显示
      if (record.type === DataSourceType.Array && Array.isArray(config.data)) {
        config.data = JSON.stringify(config.data, null, 2);
      }
    } catch (e) {
      console.error('配置JSON解析失败:', e);
    }

    form.setFieldsValue({
      key: record.key,
      type: record.type,
      config: config,
      parameters: record.parameters || [],
    });
    setVisible(true);
  };

  // 测试数据源
  const handleTest = async (record: any) => {
    const hide = message.loading('正在测试数据源...', 0);
    try {
      // 构建正确的数据源对象，确保configJson是字符串
      const dataSourceRequest = {
        displayKey: record.key,
        key: record.key,
        type: record.type,
        configJson: record.configJson, // 已经是字符串，不需要再次转换
        parameters: record.parameters || []
      };

      const result = await TemplateConverterTestDataSourceAsync(
        { name: record.key },
        dataSourceRequest
      );

      if (result && result.success) {
        Modal.info({
          title: '测试成功',
          content: (
            <div>
              <p>数据源"{record.key}"测试通过</p>
              {result.sampleData && (
                <pre style={{
                  background: '#f5f5f5',
                  padding: 12,
                  borderRadius: 4,
                  maxHeight: 300,
                  overflow: 'auto',
                }}>
                  {JSON.stringify(result.sampleData, null, 2)}
                </pre>
              )}
            </div>
          ),
          width: 600,
        });
      } else {
        message.error(result?.errorMessage || '数据源测试失败');
      }
    } catch (error: any) {
      message.error(error.message || '数据源测试失败');
    } finally {
      hide();
    }
  };

  const columns = [
    {
      title: '标识',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: DataSourceType) => {
        const typeNames = {
          [DataSourceType.Array]: '数组',
          [DataSourceType.Sql]: 'SQL',
          [DataSourceType.Api]: 'API',
        };
        return typeNames[type] || '未知';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            size="small"
            type="link"
            icon={<PlayCircleOutlined />}
            onClick={() => handleTest(record)}
          >
            测试
          </Button>
          <Button
            size="small"
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.displayKey)}
          />
        </Space>
      ),
    },
  ];

  // 根据类型渲染配置表单
  const renderConfigForm = (type: DataSourceType) => {
    switch (type) {
      case DataSourceType.Array:
        return (
          <Form.Item label="数组数据" name={['config', 'data']} rules={[{ required: true }]}>
            <Input.TextArea
              rows={6}
              placeholder='[{"id": 1, "name": "示例数据"}]'
            />
          </Form.Item>
        );

      case DataSourceType.API:
        return (
          <>
            <Form.Item label="API地址" name={['config', 'url']} rules={[{ required: true }]}>
              <Input placeholder="https://api.example.com/data" />
            </Form.Item>
            <Form.Item label="请求方法" name={['config', 'method']} initialValue="GET">
              <Select>
                <Select.Option value="GET">GET</Select.Option>
                <Select.Option value="POST">POST</Select.Option>
                <Select.Option value="PUT">PUT</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="请求头" name={['config', 'headers']}>
              <Input.TextArea rows={3} placeholder='{"Authorization": "Bearer token"}' />
            </Form.Item>
            <Form.Item label="请求体" name={['config', 'body']}>
              <Input.TextArea rows={3} placeholder='{"key": "value"}' />
            </Form.Item>
          </>
        );

      case DataSourceType.SQL:
        return (
          <>
            <Form.Item label="连接字符串" name={['config', 'connectionString']} rules={[{ required: true }]}>
              <Input.TextArea rows={2} placeholder="Server=...;Database=...;" />
            </Form.Item>
            <Form.Item label="SQL查询" name={['config', 'query']} rules={[{ required: true }]}>
              <Input.TextArea rows={4} placeholder="SELECT * FROM table WHERE ..." />
            </Form.Item>
            <Form.Item label="参数" name={['config', 'parameters']}>
              <Input.TextArea rows={2} placeholder='{"@param1": "value1"}' />
            </Form.Item>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      title="数据源配置"
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
          添加数据源
        </Button>
      }
      style={{ marginBottom: 16 }}
    >
      <Table
        columns={columns}
        dataSource={dataSourceList}
        pagination={false}
        size="small"
      />

      <Modal
        title={editingKey ? '编辑数据源' : '添加数据源'}
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
            label="数据源标识"
            name="key"
            rules={[{ required: true, message: '请输入数据源标识' }]}
          >
            <Input placeholder="例如: products" />
          </Form.Item>

          <Form.Item
            label="数据源类型"
            name="type"
            rules={[{ required: true, message: '请选择数据源类型' }]}
          >
            <Select
              onChange={(value) => {
                // 切换类型时清空配置
                form.setFieldsValue({ config: {} });
              }}
            >
              <Select.Option value={DataSourceType.Array}>数组（静态数据）</Select.Option>
              <Select.Option value={DataSourceType.Api}>API（REST接口）</Select.Option>
              <Select.Option value={DataSourceType.Sql}>SQL（数据库查询）</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}>
            {({ getFieldValue }) => renderConfigForm(getFieldValue('type'))}
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
