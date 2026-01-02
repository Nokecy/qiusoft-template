/**
 * SQL类型数据源配置表单
 */

import React from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  Card,
  Select,
  Alert,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AtlDataSource, DatabaseType } from '../../types';

export interface SqlDataSourceFormProps {
  value?: AtlDataSource;
  onChange?: (value: Partial<AtlDataSource>) => void;
}

export const SqlDataSourceForm: React.FC<SqlDataSourceFormProps> = ({
  value,
  onChange,
}) => {
  const [form] = Form.useForm();

  // 初始化表单值
  React.useEffect(() => {
    const initialValues = {
      databaseType: value?.databaseType ?? DatabaseType.SqlServer,
      connectionString: value?.connectionString || '',
      query: value?.query || '',
      parameters: value?.parameters || [],
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
        description="配置SQL数据源，系统将连接数据库执行查询获取数据"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Form.Item
        label="数据库类型"
        name="databaseType"
        rules={[{ required: true, message: '请选择数据库类型' }]}
        tooltip="选择您要连接的数据库类型"
      >
        <Select placeholder="请选择数据库类型">
          <Select.Option value={DatabaseType.SqlServer}>SQL Server</Select.Option>
          <Select.Option value={DatabaseType.MySql}>MySQL</Select.Option>
          <Select.Option value={DatabaseType.PostgreSql}>PostgreSQL</Select.Option>
          <Select.Option value={DatabaseType.Sqlite}>SQLite</Select.Option>
          <Select.Option value={DatabaseType.Oracle}>Oracle</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="连接字符串"
        name="connectionString"
        rules={[{ required: true, message: '请输入数据库连接字符串' }]}
        tooltip="示例: Server=localhost;Database=mydb;User Id=sa;Password=***;"
      >
        <Input.TextArea
          rows={3}
          placeholder="Server=localhost;Database=mydb;User Id=sa;Password=***;"
          style={{
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          }}
        />
      </Form.Item>

      <Form.Item
        label="SQL查询"
        name="query"
        rules={[{ required: true, message: '请输入SQL查询语句' }]}
        tooltip="支持参数化查询，使用@参数名的方式定义参数"
      >
        <Input.TextArea
          rows={8}
          placeholder={'SELECT * FROM products\nWHERE category = @category\n  AND stock > @minStock'}
          style={{
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          }}
        />
      </Form.Item>

      {/* SQL参数配置 */}
      <Card size="small" title="查询参数">
        <Alert
          message="参数说明"
          description="定义SQL查询中使用的参数，参数名需要以@开头"
          type="info"
          showIcon
          style={{ marginBottom: 12 }}
        />

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
                    rules={[
                      { required: true, message: '参数名必填' },
                      {
                        pattern: /^@\w+$/,
                        message: '参数名必须以@开头且只包含字母数字下划线',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="@参数名"
                      style={{ width: 150 }}
                    />
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
                      <Select.Option value="datetime">日期时间</Select.Option>
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

      <Alert
        message="安全提示"
        description="请妥善保管数据库连接字符串，避免泄露敏感信息。建议使用参数化查询防止SQL注入。"
        type="warning"
        showIcon
        style={{ marginTop: 16 }}
      />
    </Form>
  );
};
