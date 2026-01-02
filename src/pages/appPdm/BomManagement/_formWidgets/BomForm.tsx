/**
 * BOM 新建/编辑表单 - Formily Schema 模式
 */

import React, { useCallback } from 'react';
import { Modal, message, Spin } from 'antd';
import { createForm } from '@formily/core';
import { FormProvider, FormConsumer } from '@formily/react';
import { useSchemaField } from 'umi';
import type { ISchema } from '@formily/json-schema';
import type { BurnAbpPdmBomManagementBomsBomDto } from '@/services/pdm/typings';
import { BomCreateAsync } from '@/services/pdm/Bom';

interface BomFormProps {
  visible: boolean;
  data?: BurnAbpPdmBomManagementBomsBomDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const BomForm: React.FC<BomFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const SchemaField = useSchemaField({});

  const form = React.useMemo(
    () =>
      createForm({
        validateFirst: true,
        initialValues: data || {},
      }),
    [data, visible]
  );

  // BOM 表单 Schema
  const bomSchema: ISchema = {
    type: 'object',
    properties: {
      materialCode: {
        type: 'string',
        title: '物料编码',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入物料编码',
          disabled: !!data, // 编辑时禁用
        },
        'x-validator': [
          { required: true, message: '请输入物料编码' },
          { pattern: /^[A-Z0-9]+$/, message: '只能包含大写字母和数字' },
        ],
      },
      materialName: {
        type: 'string',
        title: '物料名称',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入物料名称',
        },
        'x-validator': [{ required: true, message: '请输入物料名称' }],
      },
      materialDescription: {
        type: 'string',
        title: '物料描述',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 3,
          placeholder: '请输入物料描述',
        },
      },
      topMaterialCode: {
        type: 'string',
        title: '顶层物料',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '默认为自身',
        },
      },
      '{value:engineerCode,label:engineerName}': {
        type: 'string',
        title: '负责工程师',
        'x-decorator': 'FormItem',
        'x-component': 'UserSelect',
        'x-component-props': {
          labelInValue: true,
          placeholder: '请选择工程师',
        },
        'x-validator': [{ required: true, message: '请选择工程师' }],
      },
      status: {
        type: 'number',
        title: '状态',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          options: [
            { label: '草稿', value: 0 },
            { label: '激活', value: 5 },
          ],
        },
        default: 0,
      },
      remark: {
        type: 'string',
        title: '备注',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 2,
          placeholder: '请输入备注信息',
        },
      },
    },
  };

  // 提交表单
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const values = await form.submit();

      if (data?.id) {
        // 编辑 - 暂未实现编辑 API，请根据后端提供的接口进行补充
        // await BomUpdateAsync({
        //   id: data.id,
        //   ...values,
        // });
        message.success('编辑功能开发中');
      } else {
        // 新建
        await BomCreateAsync(values);
        message.success('创建成功');
      }

      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交失败，请检查表单');
    } finally {
      setLoading(false);
    }
  }, [form, data, onSuccess, onClose]);

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      title={data ? '编辑 BOM' : '新建 BOM'}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={700}
      okText="保存"
      cancelText="取消"
    >
      <Spin spinning={loading}>
        <FormProvider form={form}>
          <SchemaField schema={bomSchema} />
          <FormConsumer>
            {() => {
              return null;
            }}
          </FormConsumer>
        </FormProvider>
      </Spin>
    </Modal>
  );
};

export { BomForm };
export default BomForm;
