/**
 * Array类型数据源配置表单
 */

import React from 'react';
import { Form, Input, Card, Descriptions, Alert } from 'antd';
import { AtlDataSource } from '../../types';

export interface ArrayDataSourceFormProps {
  value?: AtlDataSource;
  onChange?: (value: Partial<AtlDataSource>) => void;
}

export const ArrayDataSourceForm: React.FC<ArrayDataSourceFormProps> = ({
  value,
  onChange,
}) => {
  const [form] = Form.useForm();

  // 初始化表单值
  React.useEffect(() => {
    const dataJson = value?.data
      ? JSON.stringify(value.data, null, 2)
      : value?.dataJson || '[\n  {"id": 1, "name": "示例数据"}\n]';

    console.log('ArrayDataSourceForm - 初始化 dataJson:', dataJson);
    form.setFieldsValue({ dataJson });
  }, [value, form]);

  // 监听表单变化
  const handleValuesChange = (_: any, allValues: any) => {
    console.log('ArrayDataSourceForm - allValues:', allValues);
    onChange?.(allValues);
  };

  // 解析数据以获取预览信息
  const getDataPreview = () => {
    const dataStr = form.getFieldValue('dataJson');
    if (!dataStr) return null;

    try {
      const data = JSON.parse(dataStr);
      if (!Array.isArray(data)) {
        return { error: '数据必须是数组格式' };
      }

      const recordCount = data.length;
      const fields = recordCount > 0 ? Object.keys(data[0]) : [];

      return {
        recordCount,
        fields: fields.join(', '),
        firstRecord: recordCount > 0 ? data[0] : null,
      };
    } catch (error) {
      return { error: 'JSON格式错误' };
    }
  };

  const preview = getDataPreview();

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <Alert
        message="提示"
        description="输入JSON格式的数组数据，每个元素代表一条记录"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Form.Item
        label="数组数据"
        name="dataJson"
        rules={[
          { required: true, message: '请输入JSON数组数据' },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              try {
                const parsed = JSON.parse(value);
                if (!Array.isArray(parsed)) {
                  return Promise.reject(new Error('数据必须是JSON数组格式'));
                }
                if (parsed.length === 0) {
                  return Promise.reject(new Error('数组不能为空'));
                }
                return Promise.resolve();
              } catch {
                return Promise.reject(new Error('JSON格式错误'));
              }
            },
          },
        ]}
      >
        <Input.TextArea
          rows={12}
          placeholder='[{"id": 1, "name": "示例"}]'
          style={{
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          }}
        />
      </Form.Item>

      {/* 数据预览 */}
      {preview && !preview.error && (
        <Card size="small" title="数据预览" style={{ marginTop: -8 }}>
          <Descriptions column={2} size="small">
            <Descriptions.Item label="记录数">
              {preview.recordCount}
            </Descriptions.Item>
            <Descriptions.Item label="字段">
              {preview.fields || '-'}
            </Descriptions.Item>
          </Descriptions>

          {preview.firstRecord && (
            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 4, fontWeight: 500 }}>
                第一条记录：
              </div>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: 8,
                  borderRadius: 4,
                  margin: 0,
                  fontSize: 12,
                }}
              >
                {JSON.stringify(preview.firstRecord, null, 2)}
              </pre>
            </div>
          )}
        </Card>
      )}

      {preview?.error && (
        <Alert
          message="数据格式错误"
          description={preview.error}
          type="error"
          showIcon
        />
      )}
    </Form>
  );
};
