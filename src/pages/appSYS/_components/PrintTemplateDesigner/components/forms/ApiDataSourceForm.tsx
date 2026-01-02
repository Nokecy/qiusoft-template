/**
 * API类型数据源配置表单
 */

import React from 'react';
import {
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Button,
  Space,
  Card,
  Alert,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AtlDataSource } from '../../types';

export interface ApiDataSourceFormProps {
  value?: AtlDataSource;
  onChange?: (value: Partial<AtlDataSource>) => void;
}

export const ApiDataSourceForm: React.FC<ApiDataSourceFormProps> = ({
  value,
  onChange,
}) => {
  const [form] = Form.useForm();

  // 初始化表单值
  React.useEffect(() => {
    const initialValues = {
      url: value?.url || value?.apiEndpoint || '',  // 兼容旧字段
      method: value?.method || value?.httpMethod || 'GET',  // 兼容旧字段
      headers: value?.headers
        ? typeof value.headers === 'string'
          ? value.headers
          : JSON.stringify(value.headers, null, 2)
        : '',
      auth: value?.auth || undefined,
      timeoutSeconds: value?.timeoutSeconds ?? 30,
      body: value?.body || '',
      contentType: value?.contentType || 'application/json',
      parameters: value?.parameters || [],
      cache: {
        enabled: value?.cache?.enabled ?? true,
        ttlSeconds: value?.cache?.ttlSeconds ?? 300,
      },
    };

    form.setFieldsValue(initialValues);
  }, [value, form]);

  // 监听表单变化
  const handleValuesChange = (_: any, allValues: any) => {
    onChange?.(allValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <Alert
        message="提示"
        description="配置REST API数据源，系统将在运行时调用API获取数据"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Form.Item
        label="API端点"
        name="url"
        rules={[
          { required: true, message: '请输入API地址' },
          {
            type: 'url',
            message: '请输入有效的URL格式（如: https://api.example.com/data）',
          },
        ]}
      >
        <Input placeholder="https://api.example.com/data" />
      </Form.Item>

      <Form.Item
        label="请求方法"
        name="method"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="GET">GET</Select.Option>
          <Select.Option value="POST">POST</Select.Option>
          <Select.Option value="PUT">PUT</Select.Option>
          <Select.Option value="DELETE">DELETE</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="请求头（JSON格式）" name="headers">
        <Input.TextArea
          rows={4}
          placeholder={'{\n  "Authorization": "Bearer token",\n  "Content-Type": "application/json"\n}'}
          style={{
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          }}
        />
      </Form.Item>

      <Form.Item
        label="超时时间"
        name="timeoutSeconds"
        tooltip="请求超时时间，单位：秒"
      >
        <InputNumber
          min={1}
          max={300}
          addonAfter="秒"
          style={{ width: '100%' }}
          placeholder="30"
        />
      </Form.Item>

      {/* 当请求方法为 POST/PUT 时显示请求体和内容类型 */}
      <Form.Item noStyle shouldUpdate={(prev, curr) => prev.method !== curr.method}>
        {({ getFieldValue }) => {
          const method = getFieldValue('method');
          return (method === 'POST' || method === 'PUT') ? (
            <>
              <Form.Item
                label="内容类型"
                name="contentType"
              >
                <Select placeholder="application/json">
                  <Select.Option value="application/json">application/json</Select.Option>
                  <Select.Option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</Select.Option>
                  <Select.Option value="multipart/form-data">multipart/form-data</Select.Option>
                  <Select.Option value="text/plain">text/plain</Select.Option>
                  <Select.Option value="application/xml">application/xml</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="请求体" name="body">
                <Input.TextArea
                  rows={4}
                  placeholder='{"key": "value"}'
                  style={{
                    fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
                    fontSize: 13,
                  }}
                />
              </Form.Item>
            </>
          ) : null;
        }}
      </Form.Item>

      {/* 认证配置 */}
      <Card size="small" title="认证配置（可选）" style={{ marginBottom: 16 }}>
        <Form.Item
          label="认证类型"
          name={['auth', 'type']}
        >
          <Select placeholder="选择认证类型" allowClear>
            <Select.Option value="Bearer">Bearer Token</Select.Option>
            <Select.Option value="Basic">Basic 认证</Select.Option>
            <Select.Option value="ApiKey">API Key</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, curr) =>
            prev.auth?.type !== curr.auth?.type
          }
        >
          {({ getFieldValue }) => {
            const authType = getFieldValue(['auth', 'type']);

            if (authType === 'Bearer') {
              return (
                <Form.Item
                  label="Token"
                  name={['auth', 'token']}
                  rules={[{ required: true, message: '请输入Token' }]}
                >
                  <Input.Password placeholder="请输入Bearer Token" />
                </Form.Item>
              );
            }

            if (authType === 'Basic') {
              return (
                <>
                  <Form.Item
                    label="用户名"
                    name={['auth', 'username']}
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input placeholder="用户名" />
                  </Form.Item>
                  <Form.Item
                    label="密码"
                    name={['auth', 'password']}
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password placeholder="密码" />
                  </Form.Item>
                </>
              );
            }

            if (authType === 'ApiKey') {
              return (
                <>
                  <Form.Item
                    label="API Key"
                    name={['auth', 'apiKey']}
                    rules={[{ required: true, message: '请输入API Key' }]}
                  >
                    <Input.Password placeholder="请输入API Key" />
                  </Form.Item>
                  <Form.Item
                    label="API Key 头名称"
                    name={['auth', 'apiKeyHeader']}
                    rules={[{ required: true, message: '请输入头名称' }]}
                  >
                    <Input placeholder="例如: X-API-Key" />
                  </Form.Item>
                </>
              );
            }

            return null;
          }}
        </Form.Item>
      </Card>

      {/* 参数配置 */}
      <Card size="small" title="请求参数" style={{ marginBottom: 16 }}>
        <Form.List name="parameters">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: '参数名必填' }]}
                    noStyle
                  >
                    <Input placeholder="参数名" style={{ width: 150 }} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'type']}
                    initialValue="string"
                    noStyle
                  >
                    <Select style={{ width: 120 }}>
                      <Select.Option value="string">字符串</Select.Option>
                      <Select.Option value="number">数字</Select.Option>
                      <Select.Option value="boolean">布尔</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'defaultValue']}
                    noStyle
                  >
                    <Input placeholder="默认值" style={{ width: 150 }} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'required']}
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch checkedChildren="必需" unCheckedChildren="可选" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                添加参数
              </Button>
            </>
          )}
        </Form.List>
      </Card>

      {/* 缓存配置 */}
      <Card size="small" title="缓存配置">
        <Form.Item
          label="启用缓存"
          name={['cache', 'enabled']}
          valuePropName="checked"
          tooltip="启用后将缓存API响应，减少重复请求"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, curr) =>
            prev.cache?.enabled !== curr.cache?.enabled
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(['cache', 'enabled']) && (
              <Form.Item
                label="缓存时间"
                name={['cache', 'ttlSeconds']}
                rules={[{ required: true, message: '请输入缓存时间' }]}
              >
                <InputNumber
                  min={0}
                  max={86400}
                  addonAfter="秒"
                  style={{ width: '100%' }}
                  placeholder="300"
                />
              </Form.Item>
            )
          }
        </Form.Item>
      </Card>
    </Form>
  );
};
