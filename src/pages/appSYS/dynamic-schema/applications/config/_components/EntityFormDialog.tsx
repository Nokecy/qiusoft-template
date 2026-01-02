/**
 * 实体表单对话框
 * 用于创建/编辑动态实体定义
 */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Spin,
} from 'antd';
import {
  DynamicApplicationAddEntityAsync,
  DynamicApplicationUpdateEntityAsync,
} from '@/services/openApi/DynamicApplication';

interface EntityFormDialogProps {
  applicationId: string;
  entityData?: any; // 编辑时传入
  onSuccess?: () => void;
  trigger: React.ReactNode;
}

// 实体角色选项
const entityRoleOptions = [
  { label: '主表', value: 0 },       // Primary - 每个应用只能有一个
  { label: '从表', value: 1 },       // Detail - 依附于主表
  { label: '子从表', value: 2 },     // SubDetail - 依附于从表
  { label: '关联表', value: 3 },     // Association - 多对多关系中间表
];

// 存储模式选项
const storageModeOptions = [
  { label: '混合模式', value: 0 },   // Hybrid - 常用字段物理列 + JSON ExtraProperties
  { label: '纯JSON', value: 1 },     // JsonOnly - 所有字段存 JSON
  { label: '纯物理列', value: 2 },   // PhysicalOnly - 所有字段映射为物理列
];

const EntityFormDialog: React.FC<EntityFormDialogProps> = ({
  applicationId,
  entityData,
  onSuccess,
  trigger,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const isEdit = !!entityData;

  // 打开对话框时设置表单值
  useEffect(() => {
    if (visible && entityData) {
      form.setFieldsValue({
        name: entityData.name,
        displayName: entityData.displayName,
        description: entityData.description,
        role: entityData.role ?? 0,
        storageMode: entityData.storageMode ?? 0,
        displayOrder: entityData.displayOrder ?? 0,
      });
    } else if (visible && !entityData) {
      form.resetFields();
    }
  }, [visible, entityData, form]);

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

      if (isEdit) {
        // 更新实体
        await DynamicApplicationUpdateEntityAsync(
          { applicationId, entityId: entityData.id },
          {
            name: values.name,
            displayName: values.displayName,
            description: values.description,
            role: values.role,
            storageMode: values.storageMode,
          }
        );
        message.success('更新实体成功');
      } else {
        // 创建实体
        await DynamicApplicationAddEntityAsync(
          { applicationId },
          {
            name: values.name,
            displayName: values.displayName,
            role: values.role,
            storageMode: values.storageMode,
          }
        );
        message.success('创建实体成功');
      }

      handleClose();
      onSuccess?.();
    } catch (error: any) {
      if (error?.errorFields) {
        // 表单校验失败
        return;
      }
      message.error(isEdit ? '更新实体失败' : '创建实体失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={handleOpen}>{trigger}</span>
      <Modal
        title={isEdit ? '编辑实体' : '新建实体'}
        open={visible}
        onOk={handleSubmit}
        onCancel={handleClose}
        confirmLoading={loading}
        destroyOnClose
        width={500}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              role: 0,
              storageMode: 0,
              displayOrder: 0,
            }}
          >
            <Form.Item
              name="name"
              label="实体标识"
              rules={[
                { required: true, message: '请输入实体标识' },
                { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能包含字母、数字和下划线，且以字母开头' },
              ]}
              extra="唯一标识，用于系统内部引用"
            >
              <Input placeholder="如: Order, Product" disabled={isEdit} />
            </Form.Item>

            <Form.Item
              name="displayName"
              label="显示名称"
              rules={[{ required: true, message: '请输入显示名称' }]}
            >
              <Input placeholder="如: 订单, 产品" />
            </Form.Item>

            <Form.Item name="description" label="描述">
              <Input.TextArea rows={2} placeholder="实体描述信息" />
            </Form.Item>

            <Form.Item
              name="role"
              label="实体角色"
              rules={[{ required: true, message: '请选择实体角色' }]}
            >
              <Select options={entityRoleOptions} />
            </Form.Item>

            <Form.Item
              name="storageMode"
              label="存储模式"
              rules={[{ required: true, message: '请选择存储模式' }]}
              extra="混合模式: 常用字段物理列 + JSON扩展; 纯JSON: 所有字段存JSON; 纯物理列: 所有字段映射为数据库列"
            >
              <Select options={storageModeOptions} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default EntityFormDialog;
