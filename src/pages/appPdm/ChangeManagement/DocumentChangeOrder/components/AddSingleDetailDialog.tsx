/**
 * 文档变更单 - 单个明细添加对话框
 * 支持文档选择，自动带出物料信息
 */
import React, { useRef } from 'react';
import { FormDialog } from '@formily/antd-v5';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { useSchemaField } from 'umi';
import { createForm } from '@formily/core';
import { message } from 'antd';
import { DocumentSelect } from '@/pages/appPdm/_formWidgets/DocumentSelect';
import { DocumentGetAsync } from '@/services/pdm/Document';

interface AddSingleDetailDialogProps {
  onAdd: (detail: any) => void;
}

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

// Schema 定义
const createSchema = (form: any): ISchema => ({
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': formLayout,
      properties: {
        // ========== 文档信息区域 ==========
        '{value:documentId,label:documentNumber}': {
          type: 'string',
          title: '文档编码',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'DocumentSelect',
          'x-component-props': {
            placeholder: '请选择文档',
            labelInValue: true,
            onChange: async (value: any) => {
              if (value?.value) {
                try {
                  // 查询文档详情，自动带出物料信息
                  const doc = await DocumentGetAsync({ id: value.value });

                  // 自动填充字段
                  form.setFieldState('documentName', (state: any) => {
                    state.value = doc.documentName || '';
                  });
                  form.setFieldState('documentType', (state: any) => {
                    state.value = doc.documentTypeName || '';
                  });
                  form.setFieldState('currentVersion', (state: any) => {
                    state.value = doc.version || '';
                  });

                  if (doc.primaryPartLink) {
                    form.setFieldState('partCode', (state: any) => {
                      state.value = doc.primaryPartLink.partNumber || '';
                    });
                    form.setFieldState('partDrawingNumber', (state: any) => {
                      state.value = doc.primaryPartLink.drawingNumber || '';
                    });
                    form.setFieldState('partName', (state: any) => {
                      state.value = doc.primaryPartLink.partName || '';
                    });
                    form.setFieldState('partDescription', (state: any) => {
                      state.value = doc.primaryPartLink.partDescription || doc.primaryPartLink.partName || '';
                    });
                  }
                } catch (error) {
                  message.error('查询文档信息失败');
                }
              }
            },
          },
        },
        documentName: {
          type: 'string',
          title: '文档名称',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        documentType: {
          type: 'string',
          title: '文档类型',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        currentVersion: {
          type: 'string',
          title: '当前版本',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },


        // ========== 物料信息区域 ==========
        partCode: {
          type: 'string',
          title: '物料编码',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        partDrawingNumber: {
          type: 'string',
          title: '物料图号',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出（必填）',
            readOnly: true,
          },
        },
        partName: {
          type: 'string',
          title: '物料名称',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        partDescription: {
          type: 'string',
          title: '物料描述',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '自动带出（必填）',
            readOnly: true,
            rows: 2,
          },
        },

        // ========== 变更信息区域 ==========
        isUpgradeRequired: {
          type: 'boolean',
          title: '需否升级',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          'x-component-props': {
            checkedChildren: '是',
            unCheckedChildren: '否',
          },
        },
        versionAfterUpgrade: {
          type: 'string',
          title: '升级后版本',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入升级后版本',
          },
          'x-reactions': {
            dependencies: ['isUpgradeRequired'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === true}}',
              },
            },
          },
        },
        internalStorage: {
          type: 'string',
          title: '内部库存',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入内部库存',
          },
        },
        externalStorage: {
          type: 'string',
          title: '外部库存',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入外部库存',
          },
        },
        productHandlingOpinion: {
          type: 'string',
          title: '制品处理意见',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '请输入制品处理意见',
            rows: 2,
          },
        },
        relatedOrderNumber: {
          type: 'string',
          title: '关联单号',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入关联单号',
          },
        },
        changeAfterDescription: {
          type: 'string',
          title: '更改说明',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '请输入更改说明',
            rows: 2,
          },
        },
      },
    },
  },
});

/**
 * 打开单个明细添加对话框
 */
export const openAddSingleDetailDialog = (props: AddSingleDetailDialogProps) => {
  const SchemaField = useSchemaField({
    DocumentSelect,
  });

  // 在外部创建form实例，这样可以在schema中访问
  const formInstance = createForm({ validateFirst: true });
  const schema = createSchema(formInstance);

  const dialog = FormDialog(
    {
      title: '新增文档变更明细',
      width: 800,
    },
    () => (
      <FormLayout {...formLayout}>
        <SchemaField schema={schema} />
      </FormLayout>
    )
  );

  dialog
    .forConfirm(async (payload, next) => {
      const values = await payload.submit();

      // 校验必填字段
      if (!values.documentId) {
        message.error('请选择文档');
        throw new Error('文档编码不能为空');
      }

      if (!values.partDrawingNumber) {
        message.error('物料图号不能为空（请选择包含物料信息的文档）');
        throw new Error('物料图号不能为空');
      }

      if (!values.partDescription) {
        message.error('物料描述不能为空（请选择包含物料信息的文档）');
        throw new Error('物料描述不能为空');
      }

      // 构造明细数据
      const detail = {
        rowId: `row_${Date.now()}`,
        documentId: values.documentId || '',
        documentNumber: values.documentNumber || '',
        documentName: values.documentName || '',
        documentDescription: '', // 文档描述字段
        documentType: values.documentType || '',
        currentVersion: values.currentVersion || '',
        partCode: values.partCode || '',
        partDrawingNumber: values.partDrawingNumber || '',
        partName: values.partName || '',
        partDescription: values.partDescription || '',
        beforeChangeFileId: '', // 变更前文件ID
        afterChangeFileName: '', // 变更后文件名称
        afterChangeFileDescription: '', // 变更后文件描述
        isUpgradeRequired: values.isUpgradeRequired || false,
        versionAfterUpgrade: values.versionAfterUpgrade || '',
        internalStorage: values.internalStorage || '',
        externalStorage: values.externalStorage || '',
        productHandlingOpinion: values.productHandlingOpinion || '',
        changeAfterDescription: values.changeAfterDescription || '',
        relatedOrderNumber: values.relatedOrderNumber || '',
        changeAfterFile: [], // 初始化为空数组,稍后在表格中上传
      };

      props.onAdd(detail);
      next(values);
    })
    .open();
};

export default openAddSingleDetailDialog;
