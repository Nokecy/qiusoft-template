/**
 * 关系表单对话框
 * 用于创建/编辑实体之间的关系定义
 */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  Spin,
  Row,
  Col,
  Alert,
} from 'antd';
import { DynamicApplicationAddRelationAsync } from '@/services/openApi/DynamicApplication';

interface RelationFormDialogProps {
  applicationId: string;
  entities: any[]; // 可用的实体列表
  relationData?: any; // 编辑时传入
  onSuccess?: () => void;
  trigger: React.ReactNode;
}

// 关系类型选项
const relationTypeOptions = [
  { label: '一对一 (1:1)', value: 0 },
  { label: '一对多 (1:N)', value: 1 },
  { label: '多对多 (M:N)', value: 2 },
];

// 级联删除行为选项
const cascadeDeleteOptions = [
  { label: '无操作 (No Action)', value: 0, description: '删除主表记录时不影响关联记录' },
  { label: '级联删除 (Cascade)', value: 1, description: '删除主表记录时自动删除关联记录' },
  { label: '设为空 (Set Null)', value: 2, description: '删除主表记录时将关联字段设为空' },
  { label: '限制删除 (Restrict)', value: 3, description: '存在关联记录时禁止删除主表记录' },
];

const RelationFormDialog: React.FC<RelationFormDialogProps> = ({
  applicationId,
  entities,
  relationData,
  onSuccess,
  trigger,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const isEdit = !!relationData;

  // 打开对话框时设置表单值
  useEffect(() => {
    if (visible && relationData) {
      form.setFieldsValue({
        relationName: relationData.name,
        displayName: relationData.displayName,
        sourceEntityId: relationData.sourceEntityId,
        targetEntityId: relationData.targetEntityId,
        relationType: relationData.relationType ?? 1,
        cascadeDeleteBehavior: relationData.cascadeDeleteBehavior ?? 0,
        description: relationData.description,
      });
    } else if (visible && !relationData) {
      form.resetFields();
    }
  }, [visible, relationData, form]);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // 创建关系（暂不支持编辑）
      await DynamicApplicationAddRelationAsync(
        { applicationId },
        {
          relationName: values.relationName,
          displayName: values.displayName,
          sourceEntityId: values.sourceEntityId,
          targetEntityId: values.targetEntityId,
          relationType: values.relationType,
          cascadeDeleteBehavior: values.cascadeDeleteBehavior,
        }
      );
      message.success('创建关系成功');

      handleClose();
      onSuccess?.();
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }
      message.error('创建关系失败');
    } finally {
      setLoading(false);
    }
  };

  // 构建实体选项
  const entityOptions = entities.map((entity) => ({
    label: entity.displayName || entity.name,
    value: entity.id,
  }));

  return (
    <>
      <span onClick={handleOpen}>{trigger}</span>
      <Modal
        title={isEdit ? '编辑关系' : '新建关系'}
        open={visible}
        onOk={handleSubmit}
        onCancel={handleClose}
        confirmLoading={loading}
        destroyOnClose
        width={600}
      >
        <Spin spinning={loading}>
          <Alert
            message="关系说明"
            description="关系定义了实体之间的关联方式。源实体是主表，目标实体是从表。例如：订单(源) -> 订单明细(目标) 是一对多关系。"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              relationType: 1,
              cascadeDeleteBehavior: 0,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="relationName"
                  label="关系名称"
                  rules={[
                    { required: true, message: '请输入关系名称' },
                    { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能包含字母、数字和下划线，且以字母开头' },
                  ]}
                  extra="用于代码中引用关系"
                >
                  <Input placeholder="如: OrderDetails, ProductCategories" disabled={isEdit} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="displayName"
                  label="显示名称"
                  rules={[{ required: true, message: '请输入显示名称' }]}
                >
                  <Input placeholder="如: 订单明细, 产品分类" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="sourceEntityId"
                  label="源实体 (主表)"
                  rules={[{ required: true, message: '请选择源实体' }]}
                >
                  <Select
                    options={entityOptions}
                    placeholder="选择源实体"
                    showSearch
                    optionFilterProp="label"
                    disabled={isEdit}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="targetEntityId"
                  label="目标实体 (从表)"
                  rules={[{ required: true, message: '请选择目标实体' }]}
                >
                  <Select
                    options={entityOptions}
                    placeholder="选择目标实体"
                    showSearch
                    optionFilterProp="label"
                    disabled={isEdit}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="relationType"
                  label="关系类型"
                  rules={[{ required: true, message: '请选择关系类型' }]}
                >
                  <Select options={relationTypeOptions} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cascadeDeleteBehavior"
                  label="级联删除"
                  rules={[{ required: true, message: '请选择级联删除行为' }]}
                >
                  <Select>
                    {cascadeDeleteOptions.map((opt) => (
                      <Select.Option key={opt.value} value={opt.value}>
                        <div>
                          <div>{opt.label}</div>
                          <div style={{ fontSize: 12, color: '#999' }}>{opt.description}</div>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description" label="描述">
              <Input.TextArea rows={2} placeholder="关系描述信息" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default RelationFormDialog;
