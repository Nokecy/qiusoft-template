/**
 * 字段表单对话框
 * 用于创建/编辑动态字段定义
 */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  message,
  Spin,
  Row,
  Col,
} from 'antd';
import {
  DynamicApplicationAddFieldAsync,
  DynamicApplicationUpdateFieldAsync,
} from '@/services/openApi/DynamicApplication';

interface FieldFormDialogProps {
  applicationId: string;
  entityId: string;
  fieldData?: any; // 编辑时传入
  onSuccess?: () => void;
  trigger: React.ReactNode;
}

// 字段数据类型选项
const dataTypeOptions = [
  { label: 'String (字符串)', value: 0 },
  { label: 'Int (整数)', value: 1 },
  { label: 'Long (长整数)', value: 2 },
  { label: 'Decimal (小数)', value: 3 },
  { label: 'Boolean (布尔)', value: 4 },
  { label: 'DateTime (日期时间)', value: 5 },
  { label: 'Guid (唯一标识)', value: 6 },
  { label: 'Enum (枚举)', value: 7 },
  { label: 'Json (JSON对象)', value: 8 },
  { label: 'Text (长文本)', value: 9 },
  { label: 'Binary (二进制)', value: 10 },
  { label: 'Double (双精度)', value: 11 },
  { label: 'Float (单精度)', value: 12 },
  { label: 'Byte (字节)', value: 13 },
  { label: 'Short (短整数)', value: 14 },
  { label: 'Reference (引用)', value: 15 },
];

// UI 组件类型选项
const uiComponentOptions = [
  { label: 'Input (文本框)', value: 'Input' },
  { label: 'TextArea (多行文本)', value: 'TextArea' },
  { label: 'NumberPicker (数字输入)', value: 'NumberPicker' },
  { label: 'Select (下拉选择)', value: 'Select' },
  { label: 'Switch (开关)', value: 'Switch' },
  { label: 'DatePicker (日期选择)', value: 'DatePicker' },
  { label: 'DateTimePicker (日期时间)', value: 'DateTimePicker' },
  { label: 'Radio (单选)', value: 'Radio.Group' },
  { label: 'Checkbox (多选)', value: 'Checkbox.Group' },
  { label: 'Upload (文件上传)', value: 'Upload' },
];

// 索引类型选项
const indexTypeOptions = [
  { label: '无索引', value: 0 },
  { label: '普通索引', value: 1 },
  { label: '唯一索引', value: 2 },
  { label: '全文索引', value: 3 },
];

const FieldFormDialog: React.FC<FieldFormDialogProps> = ({
  applicationId,
  entityId,
  fieldData,
  onSuccess,
  trigger,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataType, setDataType] = useState<number>(0);

  const isEdit = !!fieldData;

  // 打开对话框时设置表单值
  useEffect(() => {
    if (visible && fieldData) {
      const values = {
        name: fieldData.name,
        displayName: fieldData.displayName,
        description: fieldData.description,
        dataType: fieldData.dataType ?? 0,
        uiComponent: fieldData.uiComponent || 'Input',
        maxLength: fieldData.maxLength,
        precision: fieldData.precision,
        scale: fieldData.scale,
        isRequired: fieldData.isRequired ?? false,
        defaultValue: fieldData.defaultValue,
        indexType: fieldData.indexType ?? 0,
        displayOrder: fieldData.displayOrder ?? 0,
      };
      form.setFieldsValue(values);
      setDataType(fieldData.dataType ?? 0);
    } else if (visible && !fieldData) {
      form.resetFields();
      setDataType(0);
    }
  }, [visible, fieldData, form]);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  // 数据类型变化时，自动匹配 UI 组件
  const handleDataTypeChange = (value: number) => {
    setDataType(value);
    const componentMap: Record<number, string> = {
      0: 'Input',      // String
      1: 'NumberPicker', // Int
      2: 'NumberPicker', // Long
      3: 'NumberPicker', // Decimal
      4: 'Switch',     // Boolean
      5: 'DateTimePicker', // DateTime
      6: 'Input',      // Guid
      7: 'Select',     // Enum
      8: 'TextArea',   // Json
      9: 'TextArea',   // Text
      10: 'Upload',    // Binary
      11: 'NumberPicker', // Double
      12: 'NumberPicker', // Float
      13: 'NumberPicker', // Byte
      14: 'NumberPicker', // Short
      15: 'Select',    // Reference
    };
    form.setFieldValue('uiComponent', componentMap[value] || 'Input');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (isEdit) {
        // 更新字段
        await DynamicApplicationUpdateFieldAsync(
          { applicationId, entityId, fieldId: fieldData.id },
          {
            name: values.name,
            displayName: values.displayName,
            dataType: values.dataType,
            uiComponent: values.uiComponent,
            maxLength: values.maxLength,
            precision: values.precision,
            scale: values.scale,
            isRequired: values.isRequired,
            defaultValue: values.defaultValue,
            indexType: values.indexType,
            displayOrder: values.displayOrder,
          }
        );
        message.success('更新字段成功');
      } else {
        // 创建字段
        await DynamicApplicationAddFieldAsync(
          { applicationId, entityId },
          {
            name: values.name,
            displayName: values.displayName,
            dataType: values.dataType,
            uiComponent: values.uiComponent,
            maxLength: values.maxLength,
            precision: values.precision,
            scale: values.scale,
            isRequired: values.isRequired,
            displayOrder: values.displayOrder,
          }
        );
        message.success('创建字段成功');
      }

      handleClose();
      onSuccess?.();
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }
      message.error(isEdit ? '更新字段失败' : '创建字段失败');
    } finally {
      setLoading(false);
    }
  };

  // 是否显示字符串相关选项
  const showStringOptions = dataType === 0 || dataType === 9;
  // 是否显示数值相关选项
  const showNumberOptions = dataType === 3 || dataType === 11 || dataType === 12;

  return (
    <>
      <span onClick={handleOpen}>{trigger}</span>
      <Modal
        title={isEdit ? '编辑字段' : '新建字段'}
        open={visible}
        onOk={handleSubmit}
        onCancel={handleClose}
        confirmLoading={loading}
        destroyOnClose
        width={600}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              dataType: 0,
              uiComponent: 'Input',
              isRequired: false,
              indexType: 0,
              displayOrder: 0,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="字段名"
                  rules={[
                    { required: true, message: '请输入字段名' },
                    { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能包含字母、数字和下划线，且以字母开头' },
                  ]}
                >
                  <Input placeholder="如: orderNo, productName" disabled={isEdit} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="displayName"
                  label="显示名称"
                  rules={[{ required: true, message: '请输入显示名称' }]}
                >
                  <Input placeholder="如: 订单编号, 产品名称" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dataType"
                  label="数据类型"
                  rules={[{ required: true, message: '请选择数据类型' }]}
                >
                  <Select
                    options={dataTypeOptions}
                    onChange={handleDataTypeChange}
                    disabled={isEdit}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="uiComponent"
                  label="UI组件"
                  rules={[{ required: true, message: '请选择UI组件' }]}
                >
                  <Select options={uiComponentOptions} />
                </Form.Item>
              </Col>
            </Row>

            {showStringOptions && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="maxLength" label="最大长度">
                    <InputNumber min={1} max={4000} style={{ width: '100%' }} placeholder="字符串最大长度" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="indexType" label="索引类型">
                    <Select options={indexTypeOptions} />
                  </Form.Item>
                </Col>
              </Row>
            )}

            {showNumberOptions && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="precision" label="精度">
                    <InputNumber min={1} max={38} style={{ width: '100%' }} placeholder="总位数" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="scale" label="小数位">
                    <InputNumber min={0} max={10} style={{ width: '100%' }} placeholder="小数位数" />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="defaultValue" label="默认值">
                  <Input placeholder="字段默认值" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="displayOrder" label="排序">
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="isRequired" label="必填" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description" label="描述">
              <Input.TextArea rows={2} placeholder="字段描述信息" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default FieldFormDialog;
